import Movie from "../models/Movie.js";
import tmdbService from "../services/tmdbService.js";
import { validateMovieInput } from "../utils/validation.js";
import APIFeatures from "../utils/apiFeatures.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

const parseToArray = (val) => {
  if (val === undefined || val === null) return [];
  if (Array.isArray(val)) return val;
  if (typeof val !== "string") return [val];

  const s = val.trim();
  if (s.startsWith("[") || s.startsWith("{")) {
    try {
      const parsed = JSON.parse(s);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
    
    }
  }

  if (s.includes(",")) {
    return s
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }


  return s ? [s] : [];
};

export const getMovies = async (req, res, next) => {
  try {
    const resPerPage = Number(req.query.limit) || 20;
    const apiFeatures = new APIFeatures(Movie.find(), req.query)
      .search()
      .filter()
      .sort();

    let movies = await apiFeatures.query;
    const totalMovies = movies.length;

  
    apiFeatures.paginate(resPerPage);
    movies = await apiFeatures.query.clone();

    if (movies.length === 0 && !req.query.keyword) {
      try {
        console.log("🎬 Blending TMDB trending movies...");
        const tmdbMovies = await tmdbService.fetchTrending("movie", "week");
        return res.json({
          success: true,
          count: tmdbMovies.length,
          totalMovies: tmdbMovies.length,
          movies: tmdbMovies,
        });
      } catch (error) {
        console.error("⚠️ Could not blend TMDB movies:", error.message);
      }
    }

    return res.json({
      success: true,
      count: movies.length,
      totalMovies,
      movies,
    });
  } catch (error) {
    return next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    if (isObjectId) {
      const movie = await Movie.findById(id);
      if (movie) {
        return res.json({ success: true, movie });
      }
    }

    const tmdbIdNum = Number(id);
    if (!isNaN(tmdbIdNum)) {
      try {
        console.log(
          `🎬 Fetching movie details from TMDB with ID: ${tmdbIdNum}`,
        );
        const tmdbMovie = await tmdbService.fetchMovieDetails(tmdbIdNum);
        return res.json({ success: true, movie: tmdbMovie });
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: `Movie not found in database or TMDB: ${error.message}`,
        });
      }
    }

    const cachedMovie = await Movie.findOne({ tmdbId: id });
    if (cachedMovie) {
      return res.json({ success: true, movie: cachedMovie });
    }

    return res.status(404).json({ success: false, message: "Movie not found" });
  } catch (error) {
    return next(error);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      rating,
      releaseDate,
      duration,
      trailerUrl,
      cast,
      genre,
    } = req.body;
    let poster = req.body.poster; 

    const parsedGenre = parseToArray(genre);
    const parsedCast = parseToArray(cast);

    const { valid, errors } = validateMovieInput(
      title,
      description,
      poster,
      parsedGenre,
    );
    if (!valid) {
      return res
        .status(400)
        .json({ success: false, message: errors.join(", ") });
    }

    const movie = await Movie.create({
      title,
      description,
      poster,
      posterLocal: req.body.posterLocal || "",
      posterPublicId: req.body.posterPublicId || "",
      backdrop: req.body.backdrop || "",
      backdropLocal: req.body.backdropLocal || "",
      backdropPublicId: req.body.backdropPublicId || "",
      genre: parsedGenre,
      rating: rating ? Number(rating) : 0,
      releaseDate: releaseDate || "",
      duration: duration || "N/A",
      trailerUrl: trailerUrl || "",
      cast: parsedCast,
      isCustom: true,
    });

    return res.status(201).json({
      success: true,
      message: "Movie added successfully!",
      movie,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      rating,
      releaseDate,
      duration,
      trailerUrl,
      cast,
      genre,
    } = req.body;
    let poster = req.body.poster;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    if (poster) {
      movie.poster = poster;
      if (req.body.posterLocal) movie.posterLocal = req.body.posterLocal;
      if (req.body.posterPublicId)
        movie.posterPublicId = req.body.posterPublicId;
    }
    if (req.body.backdrop) {
      movie.backdrop = req.body.backdrop;
      if (req.body.backdropLocal) movie.backdropLocal = req.body.backdropLocal;
      if (req.body.backdropPublicId)
        movie.backdropPublicId = req.body.backdropPublicId;
    }

    if (title) movie.title = title;
    if (description) movie.description = description;
    if (rating !== undefined) movie.rating = Number(rating);
    if (releaseDate !== undefined) movie.releaseDate = releaseDate;
    if (duration !== undefined) movie.duration = duration;
    if (trailerUrl !== undefined) movie.trailerUrl = trailerUrl;

    if (genre) {
      movie.genre = parseToArray(genre);
    }
    if (cast) {
      movie.cast = parseToArray(cast);
    }

    await movie.save();

    return res.json({
      success: true,
      message: "Movie updated successfully!",
      movie,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    if (movie.posterPublicId) {
      try {
        await cloudinary.uploader.destroy(movie.posterPublicId);
        console.log("✅ Cloudinary poster deleted:", movie.posterPublicId);
      } catch (err) {
        console.warn("⚠️ Failed to delete Cloudinary poster:", err.message);
      }
    }
    if (movie.backdropPublicId) {
      try {
        await cloudinary.uploader.destroy(movie.backdropPublicId);
        console.log("✅ Cloudinary backdrop deleted:", movie.backdropPublicId);
      } catch (err) {
        console.warn("⚠️ Failed to delete Cloudinary backdrop:", err.message);
      }
    }

    if (movie.posterLocal) {
      try {
        const filename = path.basename(movie.posterLocal);
        const filePath = path.resolve("src", "uploads", "movies", filename);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.warn(
              "⚠️ Failed to remove local poster:",
              unlinkErr.message,
            );
          } else {
            console.log("🗑️ Local poster removed:", filePath);
          }
        });
      } catch (err) {
        console.warn("⚠️ Local poster deletion error:", err.message);
      }
    }

    if (movie.backdropLocal) {
      try {
        const filename = path.basename(movie.backdropLocal);
        const filePath = path.resolve("src", "uploads", "movies", filename);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.warn(
              "⚠️ Failed to remove local backdrop:",
              unlinkErr.message,
            );
          } else {
            console.log("🗑️ Local backdrop removed:", filePath);
          }
        });
      } catch (err) {
        console.warn("⚠️ Local backdrop deletion error:", err.message);
      }
    }

    await Movie.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Movie deleted successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

export const searchMovies = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }

    const localMovies = await Movie.find({
      title: { $regex: q, $options: "i" },
    });

    let tmdbMovies = [];
    try {
      tmdbMovies = await tmdbService.searchMovies(q);
    } catch (error) {
      console.error(
        "⚠️ TMDB search failed, serving local matches:",
        error.message,
      );
    }

    const combined = [...localMovies];
    const titles = new Set(localMovies.map((m) => m.title.toLowerCase()));

    tmdbMovies.forEach((m) => {
      if (!titles.has(m.title.toLowerCase())) {
        combined.push(m);
      }
    });

    return res.json({
      success: true,
      count: combined.length,
      movies: combined,
    });
  } catch (error) {
    return next(error);
  }
};
