import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SearchBar from './SearchBar';
import { Menu, LogOut, User as UserIcon, ShieldAlert, Heart } from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-brandDark/95 backdrop-blur-md border-b border-white/5 py-3 shadow-md'
          : 'bg-gradient-to-b from-black/85 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Left: Brand logo & links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 select-none">
            <span className="text-2xl font-black font-outfit tracking-tighter text-primary">
              F<span className="text-white font-normal font-sans tracking-wide text-xl">ILMIFLIX</span>
            </span>
          </Link>

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv-shows"
              className={({ isActive }) =>
                `hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              TV Shows
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              My List
            </NavLink>
          </div>
        </div>

        {/* Right side options */}
        <div className="flex items-center space-x-4">
          
          {/* Desktop Search Bar */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Auth details & ProfileDropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full p-0.5 transition-all"
              >
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/pixel-art/svg?seed=DirectorAdmin'}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border border-white/10 object-cover"
                />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>
                  <div
                    className="absolute right-0 mt-3 w-56 glassmorphism rounded-xl py-2 z-50 shadow-glass-inset animate-float origin-top-right"
                  >
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>My List</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-t border-white/5 mt-1"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        <span>Director Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left border-t border-white/5 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-md transition-colors font-outfit shadow-neon-red"
            >
              SIGN IN
            </Link>
          )}

          {/* Mobile Sidebar menu trigger */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-300 hover:text-primary p-2 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
