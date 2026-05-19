import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ initialValue = '', onSearchChange, placeholder = 'Search movies, genres...' }) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md flex items-center">
      <Search className="absolute left-4 h-4 w-4 text-gray-500 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-brandDark-card text-gray-100 placeholder-gray-500 pl-11 pr-10 py-2 rounded-full border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-outfit text-sm"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
