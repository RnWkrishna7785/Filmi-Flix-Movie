import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/common/MovieCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import api from '../api/axios';
import { TMDB } from '../api/endpoints';

export const MoviesPage = () => {
  const { movies: localMovies, categories, loading: contextLoading } = useContext(MovieContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenre = searchParams.get('genre') || '';

  const [genreMovies, setGenreMovies] = useState([]);
  const [loadingGenre, setLoadingGenre] = useState(false);

  useEffect(() => {
    const fetchGenreSpecific = async () => {
      if (!activeGenre) {
        setGenreMovies([]);
        return;
      }

      try {
        setLoadingGenre(true);
        const matchedCat = categories.find((c) => c.slug === activeGenre);
        if (matchedCat) {
          const filteredLocal = localMovies.filter((m) =>
            m.genre.some(
              (g) =>
                g.toLowerCase() === matchedCat.name.toLowerCase() ||
                g.toLowerCase() === matchedCat.slug.toLowerCase()
            )
          );

          const tmdbGenreIds = {
            action: 28,
            'sci-fi': 878,
            drama: 18,
            comedy: 35,
            horror: 27,
            thriller: 53,
            romance: 10749,
            animation: 16,
            fantasy: 14,
            crime: 80,
            mystery: 9648,
            family: 10751,
            adventure: 12,
            documentary: 99
          };

          let liveMovies = [];
          const genreId = tmdbGenreIds[activeGenre.toLowerCase()];
          
          if (genreId) {
            const res = await api.get(TMDB.BY_GENRE(genreId));
            if (res.data.success) {
              liveMovies = res.data.movies || [];
            }
          } else {
            const res = await api.get(`/movies/search?q=${matchedCat.name}`);
            if (res.data && res.data.success) {
              liveMovies = res.data.movies || [];
            }
          }

          const blended = [
            ...filteredLocal,
            ...liveMovies.filter(
              (lm) => !filteredLocal.some((fl) => fl.title.toLowerCase() === lm.title.toLowerCase())
            ),
          ];
          setGenreMovies(blended);
        }
      } catch (error) {
        console.error('Failed to load genre movies:', error.message);
      } finally {
        setLoadingGenre(false);
      }
    };

    fetchGenreSpecific();
  }, [activeGenre, categories, localMovies]);

  const handleGenreSelect = (slug) => {
    if (activeGenre === slug) {
      setSearchParams({});
    } else {
      setSearchParams({ genre: slug });
    }
  };

  const displayedMovies = activeGenre ? genreMovies : localMovies;
  const isLoading = contextLoading || loadingGenre;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 space-y-10 select-none">
      
      {/* Title Header */}
      <div className="space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-black font-outfit text-white tracking-tight">
          BROWSE CINEMA CATALOG
        </h1>
        <p className="text-sm text-gray-500 max-w-xl font-light">
          Browse specialized cinematic filters, dynamic categories, and exclusive locally created titles.
        </p>
      </div>

      {/* Filter tab bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-6">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-2.5 rounded-xl font-outfit text-sm font-semibold border transition-all focus:outline-none ${
            !activeGenre
              ? 'bg-primary border-transparent text-white'
              : 'bg-brandDark-card border-white/5 text-gray-300 hover:text-white'
          }`}
        >
          All Titles
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleGenreSelect(cat.slug)}
            className={`px-4 py-2.5 rounded-xl font-outfit text-sm font-semibold border transition-all focus:outline-none ${
              activeGenre === cat.slug
                ? 'bg-primary border-transparent text-white'
                : 'bg-brandDark-card border-white/5 text-gray-300 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Movie listings */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <SkeletonLoader count={12} />
        </div>
      ) : displayedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {displayedMovies.map((m) => (
            <MovieCard key={m._id || m.tmdbId} movie={m} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brandDark-card rounded-2xl border border-white/5 space-y-4">
          <p className="text-gray-400 font-outfit">
            No movies resolved under the "{activeGenre}" category.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-outfit font-bold shadow-neon-red transition-all focus:outline-none"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};

export default MoviesPage;
