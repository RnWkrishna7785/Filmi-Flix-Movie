import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { USERS } from '../api/endpoints';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { user, token, updateLocalFavorites } = useContext(AuthContext);
  const [favoritesList, setFavoritesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoritesDetail = async () => {
      if (token && user) {
        try {
          setLoading(true);
          const response = await api.get('/auth/profile');
          if (response.data.success) {
            setFavoritesList(response.data.user.favorites || []);
            updateLocalFavorites(response.data.user.favorites.map((f) => f._id));
          }
        } catch (error) {
          console.error('Failed to load favorites details:', error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setFavoritesList([]);
      }
    };

    fetchFavoritesDetail();
  }, [token, user?.favorites?.length]);

  const toggleFavorite = async (movieId) => {
    if (!token) {
      toast.error('You must register or log in to customize "My List"!');
      return false;
    }

    try {
      const response = await api.post(USERS.TOGGLE_FAVORITE, { movieId });
      if (response.data.success) {
        const { isFavorited, favorites } = response.data;
        updateLocalFavorites(favorites);
        
        if (isFavorited) {
          toast.success('Successfully added to My List! ❤️');
        } else {
          toast.success('Removed from My List! 💔');
        }
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update bookmarks list.';
      toast.error(msg);
      return false;
    }
  };

  const isMovieFavorited = (id) => {
    if (!user) return false;
    return favoritesList.some(
      (fav) =>
        fav._id === id ||
        fav.tmdbId === Number(id) ||
        (fav.tmdbId && fav.tmdbId.toString() === id.toString())
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoritesList,
        toggleFavorite,
        isMovieFavorited,
        loading,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
