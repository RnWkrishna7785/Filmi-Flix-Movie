import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import TVShowsPage from '../pages/TVShowsPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import FavoritesPage from '../pages/FavoritesPage';
import ProfilePage from '../pages/ProfilePage';

import AdminOverview from '../pages/admin/AdminOverview';
import ManageMovies from '../pages/admin/ManageMovies';
import ManageUsers from '../pages/admin/ManageUsers';

export const AppRoutes = () => {
  return (
    <Routes>
      
      {/* Non-authenticated login and register screens */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Standard Public Layout Views */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="tv-shows" element={<TVShowsPage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        <Route path="search" element={<SearchResultsPage />} />

        {/* Auth Restricted Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Director Panel Layout Views (Requires role === admin) */}
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="movies" element={<ManageMovies />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>

      {/* Wildcard Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
