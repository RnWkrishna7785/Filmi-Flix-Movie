import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MovieContext } from '../../context/MovieContext';
import Loader from '../../components/common/Loader';
import { Film, Users, Layers, Heart, Plus, ShieldAlert, Sparkles, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; 
    const increment = target / (duration / 16);
    
    if (target === 0) {
      setCount(0);
      return;
    }

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
};

export const AdminOverview = () => {
  const { stats, fetchStats, loading, addCategory, deleteCategory } = useContext(AdminContext);
  const { categories } = useContext(MovieContext);
  const [newGenre, setNewGenre] = useState('');
  const [addingGenre, setAddingGenre] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleAddGenreSubmit = async (e) => {
    e.preventDefault();
    if (!newGenre.trim()) return toast.error('Genre name field cannot be empty.');
    
    setAddingGenre(true);
    const success = await addCategory(newGenre.trim());
    if (success) {
      setNewGenre('');
      fetchStats();
    }
    setAddingGenre(false);
  };

  if (loading && !stats) {
    return (
      <div className="h-[50vh] flex items-center justify-center text-primary">
        <Loader size="large" />
      </div>
    );
  }

  const moviesCount = stats?.moviesCount || 0;
  const usersCount = stats?.usersCount || 0;
  const categoriesCount = stats?.categoriesCount || 0;
  const favoritesCount = stats?.favoritesCount || 0;

  return (
    <div className="space-y-10 select-none">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
            <Sparkles className="h-7 w-7 text-yellow-500 animate-pulse" />
            <span>DIRECTOR CONTROL DESK</span>
          </h1>
          <p className="text-xs text-gray-500 font-light font-outfit">
            Synchronized system intelligence mapping databases, custom creations, and bookmarked metrics.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Movies */}
        <div className="bg-brandDark-card border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-md relative overflow-hidden group hover:border-yellow-500/30 transition-all">
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider font-outfit">
              Total Movies
            </p>
            <h3 className="text-3xl font-black font-outfit text-white">
              <AnimatedCounter target={moviesCount} />
            </h3>
          </div>
          <div className="h-12 w-12 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center">
            <Film className="h-6 w-6" />
          </div>
        </div>

        {/* Users */}
        <div className="bg-brandDark-card border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-md relative overflow-hidden group hover:border-green-500/30 transition-all">
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider font-outfit">
              Registered Users
            </p>
            <h3 className="text-3xl font-black font-outfit text-white">
              <AnimatedCounter target={usersCount} />
            </h3>
          </div>
          <div className="h-12 w-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-brandDark-card border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-md relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider font-outfit">
              Active Categories
            </p>
            <h3 className="text-3xl font-black font-outfit text-white">
              <AnimatedCounter target={categoriesCount} />
            </h3>
          </div>
          <div className="h-12 w-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
            <Layers className="h-6 w-6" />
          </div>
        </div>

        {/* Bookmarks */}
        <div className="bg-brandDark-card border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-md relative overflow-hidden group hover:border-primary/30 transition-all">
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider font-outfit">
              Favorited Items
            </p>
            <h3 className="text-3xl font-black font-outfit text-white">
              <AnimatedCounter target={favoritesCount} />
            </h3>
          </div>
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Heart className="h-6 w-6 fill-primary" />
          </div>
        </div>

      </div>

      {/* Category Creation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        
        <div className="bg-brandDark-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-md">
          <div className="space-y-2 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold font-outfit text-white">Create New Category</h3>
            <p className="text-xs text-gray-500 font-light">
              Add specialized movie genres dynamically to live feed filters.
            </p>
          </div>

          <form onSubmit={handleAddGenreSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Genre Name</label>
              <input
                type="text"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="e.g. Science Fiction, Romance, Anime"
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={addingGenre}
              className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-outfit font-bold shadow-neon-red hover:shadow-lg transition-all focus:outline-none disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              <span>{addingGenre ? 'CREATING...' : 'ADD CATEGORY'}</span>
            </button>
          </form>
        </div>

        {/* Manage Categories */}
        <div className="bg-brandDark-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-md max-h-[380px] flex flex-col">
          <div className="space-y-2 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold font-outfit text-white">Manage Active Categories</h3>
            <p className="text-xs text-gray-500 font-light">
              Review and delete existing movie genre categories.
            </p>
          </div>
          
          <div className="overflow-y-auto pr-2 space-y-2 flex-grow custom-scrollbar">
            {categories && categories.length > 0 ? (
              categories.map(cat => (
                <div key={cat._id} className="flex items-center justify-between bg-brandDark border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors">
                  <span className="text-sm text-gray-300 font-outfit">{cat.name}</span>
                  <button
                    onClick={async () => {
                      if(window.confirm(`Are you sure you want to delete the "${cat.name}" category? 🗑️`)) {
                        await deleteCategory(cat._id);
                      }
                    }}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all focus:outline-none"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic text-center py-4">No custom categories found.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminOverview;
