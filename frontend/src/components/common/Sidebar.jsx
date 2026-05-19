import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Home, Film, Tv, Heart, User, ShieldAlert, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import SearchBar from './SearchBar';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Drawer Container Panel */}
      <div
        className="fixed top-0 bottom-0 right-0 w-80 max-w-full bg-brandDark-card border-l border-white/5 py-6 px-6 flex flex-col justify-between shadow-2xl z-50 animate-float"
      >
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between pb-5 border-b border-white/5">
            <span className="text-xl font-black font-outfit tracking-tighter text-primary">
              F<span className="text-white font-normal font-sans text-lg">ILMIFLIX</span>
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-primary transition-colors p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search bar inside Mobile drawer */}
          <div className="my-5">
            <SearchBar placeholder="Search movies, genres..." onSearchChange={() => {}} />
          </div>

          {/* Navigation Items List */}
          <div className="flex flex-col space-y-3 font-outfit mt-4">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-4 text-gray-300 hover:text-primary transition-all py-2 ${
                  isActive ? 'text-primary font-semibold' : ''
                }`
              }
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/movies"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-4 text-gray-300 hover:text-primary transition-all py-2 ${
                  isActive ? 'text-primary font-semibold' : ''
                }`
              }
            >
              <Film className="h-5 w-5" />
              <span>Movies</span>
            </NavLink>

            <NavLink
              to="/tv-shows"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-4 text-gray-300 hover:text-primary transition-all py-2 ${
                  isActive ? 'text-primary font-semibold' : ''
                }`
              }
            >
              <Tv className="h-5 w-5" />
              <span>TV Shows</span>
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-4 text-gray-300 hover:text-primary transition-all py-2 ${
                  isActive ? 'text-primary font-semibold' : ''
                }`
              }
            >
              <Heart className="h-5 w-5" />
              <span>My List</span>
            </NavLink>

            {user && (
              <NavLink
                to="/profile"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-4 text-gray-300 hover:text-primary transition-all py-2 ${
                    isActive ? 'text-primary font-semibold' : ''
                  }`
                }
              >
                <User className="h-5 w-5" />
                <span>My Profile</span>
              </NavLink>
            )}

            {user && user.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-4 text-yellow-500 hover:text-yellow-400 transition-all py-2 border-t border-white/5 mt-2 ${
                    isActive ? 'text-yellow-400 font-semibold' : ''
                  }`
                }
              >
                <ShieldAlert className="h-5 w-5" />
                <span>Director Panel</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* Auth profile Footer action */}
        <div className="mt-auto">
          {user ? (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center space-x-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-lg border border-red-500/20 transition-all font-outfit font-semibold"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-white py-3 rounded-lg transition-all font-outfit font-bold shadow-neon-red text-center"
            >
              SIGN IN
            </Link>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
