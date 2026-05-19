import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Favorite from '../models/Favorite.js';
import tmdbService from '../services/tmdbService.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    return res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const userId = req.user._id;

    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required to bookmark' });
    }

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(movieId);
    let movieDoc;

    if (isObjectId) {
      movieDoc = await Movie.findById(movieId);
    }

    if (!movieDoc) {
      const tmdbIdNum = Number(movieId);
      if (!isNaN(tmdbIdNum)) {
        movieDoc = await Movie.findOne({ tmdbId: tmdbIdNum });
        
        if (!movieDoc) {
          console.log(`🎬 Cache-on-favorite: Fetching TMDB movie ID ${tmdbIdNum} to cache in local MongoDB...`);
          try {
            const tmdbDetail = await tmdbService.fetchMovieDetails(tmdbIdNum);
            
            movieDoc = await Movie.create({
              title: tmdbDetail.title,
              description: tmdbDetail.description,
              poster: tmdbDetail.poster,
              backdrop: tmdbDetail.backdrop,
              genre: tmdbDetail.genre,
              rating: tmdbDetail.rating,
              releaseDate: tmdbDetail.releaseDate,
              duration: tmdbDetail.duration,
              trailerUrl: tmdbDetail.trailerUrl,
              cast: tmdbDetail.cast,
              tmdbId: tmdbIdNum,
              isCustom: false,
            });
          } catch (tmdbErr) {
            return res.status(404).json({
              success: false,
              message: `Could not fetch or cache TMDB movie: ${tmdbErr.message}`,
            });
          }
        }
      }
    }

    if (!movieDoc) {
      return res.status(404).json({ success: false, message: 'Movie not found in database or TMDB' });
    }

    const localMovieId = movieDoc._id;
    const user = await User.findById(userId);

    const isFavorited = user.favorites.includes(localMovieId);

    if (isFavorited) {
    
      user.favorites = user.favorites.filter((id) => id.toString() !== localMovieId.toString());
      await user.save();

      
      await Favorite.findOneAndDelete({ userId, movieId: localMovieId });

      return res.json({
        success: true,
        isFavorited: false,
        message: 'Movie removed from My List',
        favorites: user.favorites,
      });
    } else {
      
      user.favorites.push(localMovieId);
      await user.save();

      
      await Favorite.create({ userId, movieId: localMovieId });

      return res.json({
        success: true,
        isFavorited: true,
        message: 'Movie added to My List',
        favorites: user.favorites,
      });
    }
  } catch (error) {
    return next(error);
  }
};
