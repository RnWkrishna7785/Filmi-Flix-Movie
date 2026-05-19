import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { TMDB } from '../api/endpoints';
import MovieCard from '../components/common/MovieCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Tv } from 'lucide-react';

export const TVShowsPage = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${TMDB.TRENDING}?media=tv`);
        if (res.data.success) {
          const mappedTV = res.data.movies.map((tv) => ({
            ...tv,
            title: tv.name || tv.title,
            genre: tv.genre || ['Drama', 'TV Series'],
          }));
          setTvShows(mappedTV);
        }
      } catch (error) {
        console.error('Failed to load TV Series:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTV();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 space-y-10 select-none">
      
      {/* Title block */}
      <div className="space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
          <Tv className="h-7 w-7 text-primary animate-pulse" />
          <span>TRENDING TV SERIES</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-xl font-light">
          Browse active live worldwide popular shows and drama seasons tracked directly via TMDB.
        </p>
      </div>

      <hr className="border-white/5" />

      {/* Shows grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <SkeletonLoader count={12} />
        </div>
      ) : tvShows.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {tvShows.map((tv) => (
            <MovieCard key={tv._id || tv.tmdbId} movie={tv} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brandDark-card rounded-2xl border border-white/5 font-outfit text-gray-400">
          Sorry, no TV Series records resolved.
        </div>
      )}

    </div>
  );
};

export default TVShowsPage;
