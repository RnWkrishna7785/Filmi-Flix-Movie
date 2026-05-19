import tmdbService from '../services/tmdbService.js';

export const fetchTrending = async (req, res, next) => {
  try {
    const { media, time } = req.query;
    const movies = await tmdbService.fetchTrending(media || 'movie', time || 'week');
    return res.json({ success: true, count: movies.length, movies });
  } catch (error) {
    return next(error);
  }
};

export const fetchTopRated = async (req, res, next) => {
  try {
    const movies = await tmdbService.fetchTopRated();
    return res.json({ success: true, count: movies.length, movies });
  } catch (error) {
    return next(error);
  }
};

export const fetchPopular = async (req, res, next) => {
  try {
    const movies = await tmdbService.fetchPopular();
    return res.json({ success: true, count: movies.length, movies });
  } catch (error) {
    return next(error);
  }
};

export const fetchGenres = async (req, res, next) => {
  try {
    const genres = await tmdbService.fetchGenres();
    return res.json({ success: true, count: genres.length, genres });
  } catch (error) {
    return next(error);
  }
};

export const fetchMoviesByGenre = async (req, res, next) => {
  try {
    const { genreId } = req.params;
    if (!genreId) {
      return res.status(400).json({ success: false, message: 'Genre/Category ID is required' });
    }
    const movies = await tmdbService.fetchMoviesByGenre(genreId);
    return res.json({ success: true, count: movies.length, movies });
  } catch (error) {
    return next(error);
  }
};
