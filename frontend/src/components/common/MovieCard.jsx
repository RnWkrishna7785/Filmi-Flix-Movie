import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Star } from 'lucide-react';
import { FavoriteContext } from '../../context/FavoriteContext';
import { MovieContext } from '../../context/MovieContext';
import { getPosterUrl } from '../../utils/imageHelper';

export const MovieCard = ({ movie }) => {
  const { toggleFavorite, isMovieFavorited } = useContext(FavoriteContext);
  const { openTrailer } = useContext(MovieContext);

  const isFavorited = isMovieFavorited(movie._id || movie.tmdbId);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie._id || movie.tmdbId);
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openTrailer(movie.trailerUrl);
  };

  return (
    <div
      className="relative group overflow-hidden rounded-xl bg-brandDark-card border border-white/5 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-neon-red aspect-[2/3] select-none"
    >
      {/* Absolute star rating badge */}
      <div
        className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[10px] font-bold text-yellow-500 px-2 py-1 rounded-md flex items-center space-x-1 z-20"
      >
        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
        <span>{movie.rating ? movie.rating.toFixed(1) : '7.0'}</span>
      </div>

      {/* Heart bookmark shortcut button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md border transition-all z-20 focus:outline-none ${
          isFavorited
            ? 'bg-primary text-white border-transparent'
            : 'bg-black/60 text-white border-white/10 hover:bg-primary/20'
        }`}
      >
        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-white' : ''}`} />
      </button>

      {/* Navigation detail link */}
      <Link to={`/movie/${movie._id || movie.tmdbId}`} className="block h-full w-full">
        {/* Cover Artwork image */}
        <img
          src={getPosterUrl(movie.poster)}
          alt={movie.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover info gradient layout */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10"
        >
          <h3 className="text-sm font-bold font-outfit text-white leading-snug line-clamp-1">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[10px] text-gray-400 font-medium">
              {movie.genre && movie.genre.length > 0
                ? movie.genre.slice(0, 2).join(' • ')
                : 'Featured'}
            </span>
            
            {/* Quick Play Trigger widget */}
            {movie.trailerUrl && (
              <button
                onClick={handlePlayClick}
                className="h-7 w-7 flex items-center justify-center bg-primary hover:bg-primary-hover text-white rounded-full transition-all focus:outline-none shadow-neon-red"
              >
                <Play className="h-3 w-3 fill-white pl-0.5" />
              </button>
            )}
          </div>
        </div>
      </Link>

    </div>
  );
};

export default MovieCard;
