import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { AUTH } from '../api/endpoints';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('filmiflix_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await api.get(AUTH.PROFILE);
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Failed to restore profile session:', error.message);
          logoutSilently();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post(AUTH.LOGIN, { email, password });
      
      if (response.data.success) {
        const { token: jwtToken, user: userData } = response.data;
        localStorage.setItem('filmiflix_token', jwtToken);
        setToken(jwtToken);
        setUser(userData);
        toast.success(`Welcome back, ${userData.name}! 🎬`);
        return { success: true, user: userData };
      }
      
      return { success: false, message: 'Authentication failed.' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await api.post(AUTH.REGISTER, { name, email, password });
      
      if (response.data.success) {
        const { token: jwtToken, user: userData } = response.data;
        localStorage.setItem('filmiflix_token', jwtToken);
        setToken(jwtToken);
        setUser(userData);
        toast.success(`Welcome to Filmiflix, ${userData.name}! 🎉`);
        return { success: true, user: userData };
      }
      
      return { success: false, message: 'Registration failed.' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed. Try again.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('filmiflix_token');
    setToken(null);
    setUser(null);
    toast.success('Signed out safely. See you soon! 👋');
  };

  const logoutSilently = () => {
    localStorage.removeItem('filmiflix_token');
    setToken(null);
    setUser(null);
  };

  const updateLocalFavorites = (favorites) => {
    setUser((prev) => (prev ? { ...prev, favorites } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateLocalFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
