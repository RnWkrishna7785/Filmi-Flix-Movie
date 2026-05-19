import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../components/common/MovieCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import SearchBar from '../components/common/SearchBar';
import { Search } from 'lucide-react';

export const SearchResultsPage = () => {
  const { searchAllMovies } = useContext(MovieContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(rawQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setQuery(rawQuery);
  }, [rawQuery]);

  useEffect(() => {
    const executeSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setSearchParams({ q: debouncedQuery });
        
        const matched = await searchAllMovies(debouncedQuery);
        setResults(matched);
      } catch (error) {
        console.error('Search query operation error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    executeSearch();
  }, [debouncedQuery]);

  const handleSearchChange = (val) => {
    setQuery(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 space-y-10 select-none">
      
      {/* Title Block */}
      <div className="space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
          <Search className="h-7 w-7 text-primary animate-pulse" />
          <span>CINEMATIC MATRIX SEARCH</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-xl font-light">
          Search custom administrator creations and live tracked TMDB listings in real-time.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="flex justify-center md:justify-start max-w-lg">
        <SearchBar
          initialValue={query}
          onSearchChange={handleSearchChange}
          placeholder="Search movie title, genre, cast..."
        />
      </div>

      <hr className="border-white/5" />

      {/* Grid Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <SkeletonLoader count={12} />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-outfit">
            Resolved {results.length} cinematic records
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map((m) => (
              <MovieCard key={m._id || m.tmdbId} movie={m} />
            ))}
          </div>
        </div>
      ) : debouncedQuery.trim() ? (
        <div
          className="text-center py-20 bg-brandDark-card rounded-2xl border border-white/5 space-y-5 max-w-md mx-auto"
        >
          <div
            className="h-16 w-16 bg-white/5 border border-white/10 text-gray-500 rounded-full flex items-center justify-center mx-auto"
          >
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-outfit text-white">No Matches Resolved</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              We couldn't resolve matches for "{debouncedQuery}" in either custom database or TMDB index.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-brandDark-card rounded-2xl border border-white/5 font-outfit text-gray-500">
          Start typing in the search bar above to query movies dynamically.
        </div>
      )}

    </div>
  );
};

export default SearchResultsPage;
