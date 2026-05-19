import React, { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import MovieCard from '../components/common/MovieCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favoritesList, loading } = useContext(FavoriteContext);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 space-y-10 select-none">
      
      {/* Title */}
      <div className="space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
          <Heart className="h-7 w-7 text-primary fill-primary animate-pulse" />
          <span>MY SAVED LIST</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-xl font-light font-outfit">
          Your bookmarked, cached, and favorite movies, customized or live tracked from TMDB.
        </p>
      </div>

      <hr className="border-white/5" />

      {/* Grid List */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <SkeletonLoader count={6} />
        </div>
      ) : favoritesList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {favoritesList.map((m) => (
            <MovieCard key={m._id || m.tmdbId} movie={m} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-20 bg-brandDark-card border border-white/5 rounded-2xl p-8 space-y-6 max-w-md mx-auto"
        >
          <div
            className="h-16 w-16 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center mx-auto shadow-neon-red"
          >
            <Heart className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-outfit text-white">Your List is Empty</h3>
            <p className="text-xs text-gray-500 font-light">
              Add custom exclusive movies or live trending masterpieces by tapping the heart icon on any card!
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-outfit font-bold shadow-neon-red transition-all text-sm focus:outline-none"
          >
            Start Browsing
          </Link>
        </div>
      )}

    </div>
  );
};

export default FavoritesPage;
