export const AUTH = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
};

export const MOVIES = {
  GET_ALL: '/movies',
  GET_ONE: (id) => `/movies/${id}`,
  SEARCH: '/movies/search',
  CREATE: '/movies',
  UPDATE: (id) => `/movies/${id}`,
  DELETE: (id) => `/movies/${id}`,
};

export const CATEGORIES = {
  GET_ALL: '/categories',
  CREATE: '/categories',
  DELETE: (id) => `/categories/${id}`,
};

export const ADMIN = {
  DASHBOARD: '/admin/dashboard',
};

export const USERS = {
  GET_ALL: '/users',
  TOGGLE_FAVORITE: '/users/favorite',
};

export const TMDB = {
  TRENDING: '/tmdb/trending',
  TOP_RATED: '/tmdb/top-rated',
  POPULAR: '/tmdb/popular',
  GENRES: '/tmdb/genres',
  BY_GENRE: (id) => `/tmdb/genre/${id}`,
};
