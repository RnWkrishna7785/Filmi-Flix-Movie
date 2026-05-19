import express from 'express';
import {
  fetchTrending,
  fetchTopRated,
  fetchPopular,
  fetchGenres,
  fetchMoviesByGenre,
} from '../controllers/tmdbController.js';

const router = express.Router();

router.get('/trending', fetchTrending);
router.get('/top-rated', fetchTopRated);
router.get('/popular', fetchPopular);
router.get('/genres', fetchGenres);
router.get('/genre/:genreId', fetchMoviesByGenre);

export default router;
