import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { ADMIN, MOVIES, USERS, CATEGORIES } from '../api/endpoints';
import { AuthContext } from './AuthContext';
import { MovieContext } from './MovieContext';
import { FavoriteContext } from './FavoriteContext';
import toast from 'react-hot-toast';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { favoritesList } = useContext(FavoriteContext);
  const { fetchCustomMovies, fetchCategories } = useContext(MovieContext);
  
  const [stats, setStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, favoritesList.length]);

  const fetchStats = async () => {
    if (!isAdmin) return;
    try {
      setLoading(true);
      const res = await api.get(ADMIN.DASHBOARD);
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Failed to load dashboard metrics:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!isAdmin) return;
    try {
      setLoading(true);
      const res = await api.get(USERS.GET_ALL);
      if (res.data.success) {
        setAdminUsers(res.data.users);
      }
    } catch (error) {
      console.error('Failed to retrieve user accounts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movieFormData) => {
    try {
      setLoading(true);
      const res = await api.post(MOVIES.CREATE, movieFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        toast.success(res.data.message || 'Movie created successfully! 🎬');
        fetchCustomMovies();
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add custom movie.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editMovie = async (id, movieFormData) => {
    try {
      setLoading(true);
      const res = await api.put(MOVIES.UPDATE(id), movieFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        toast.success(res.data.message || 'Movie updated successfully! ✍️');
        fetchCustomMovies();
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to edit custom movie.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    try {
      setLoading(true);
      const res = await api.delete(MOVIES.DELETE(id));
      if (res.data.success) {
        toast.success(res.data.message || 'Movie deleted successfully! 🗑️');
        fetchCustomMovies();
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete movie.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name) => {
    try {
      setLoading(true);
      const res = await api.post(CATEGORIES.CREATE, { name });
      if (res.data.success) {
        toast.success('Dynamic category seeded successfully! 🚀');
        if (fetchCategories) fetchCategories();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add category.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      const res = await api.delete(CATEGORIES.DELETE(id));
      if (res.data.success) {
        toast.success('Category deleted successfully! 🗑️');
        if (fetchCategories) fetchCategories();
        fetchStats();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete category.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        stats,
        adminUsers,
        loading,
        fetchStats,
        fetchUsers,
        addMovie,
        editMovie,
        deleteMovie,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
