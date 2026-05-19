import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { MOVIES, CATEGORIES, TMDB } from '../api/endpoints';
import toast from 'react-hot-toast';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [trailerUrl, setTrailerUrl] = useState('');
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchCategories(),
        fetchCustomMovies(),
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchPopularMovies(),
      ]);
    } catch (error) {
      console.error('⚠️ MovieContext fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get(CATEGORIES.GET_ALL);
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error('Failed to load categories:', error.message);
    }
  };

  const fetchCustomMovies = async () => {
    try {
      const res = await api.get(MOVIES.GET_ALL);
      if (res.data.success) {
        setMovies(res.data.movies);
      }
    } catch (error) {
      console.error('Failed to load custom movies:', error.message);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const res = await api.get(TMDB.TRENDING);
      if (res.data.success) {
        setTrending(res.data.movies);
      }
    } catch (error) {
      console.error('Failed to load TMDB trending movies:', error.message);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const res = await api.get(TMDB.TOP_RATED);
      if (res.data.success) {
        setTopRated(res.data.movies);
      }
    } catch (error) {
      console.error('Failed to load TMDB top rated movies:', error.message);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const res = await api.get(TMDB.POPULAR);
      if (res.data.success) {
        setPopular(res.data.movies);
      }
    } catch (error) {
      console.error('Failed to load TMDB popular movies:', error.message);
    }
  };

  const getMovieById = async (id) => {
    try {
      const res = await api.get(MOVIES.GET_ONE(id));
      if (res.data.success) {
        return res.data.movie;
      }
      return null;
    } catch (error) {
      console.error(`Failed to fetch movie ${id}:`, error.message);
      return null;
    }
  };

  const searchAllMovies = async (query) => {
    try {
      const res = await api.get(`${MOVIES.SEARCH}?q=${query}`);
      if (res.data.success) {
        return res.data.movies;
      }
      return [];
    } catch (error) {
      console.error('API search query error:', error.message);
      return [];
    }
  };

  const openTrailer = (url) => {
    if (!url) {
      toast.error('Sorry, a preview trailer is not available for this movie yet!');
      return;
    }
    setTrailerUrl(url);
    setIsTrailerOpen(true);
  };

  const closeTrailer = () => {
    setTrailerUrl('');
    setIsTrailerOpen(false);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        trending,
        topRated,
        popular,
        categories,
        loading,
        trailerUrl,
        isTrailerOpen,
        openTrailer,
        closeTrailer,
        fetchCustomMovies,
        getMovieById,
        searchAllMovies,
        fetchInitialData,
        fetchCategories,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
