import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { FavoriteContext } from '../context/FavoriteContext';
import Loader from '../components/common/Loader';
import { Play, Heart, Star, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { getPosterUrl, getBackdropUrl } from '../utils/imageHelper';
import { getYear } from '../utils/formatDate';

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const { getMovieById, openTrailer } = useContext(MovieContext);
  const { toggleFavorite, isMovieFavorited } = useContext(FavoriteContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getMovieById(id);
      if (data) {
        setMovie(data);
      } else {
        setMovie(null);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center bg-brandDark text-primary">
        <Loader size="large" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-outfit text-white">Movie Not Resolved</h2>
        <p className="text-gray-400">
          Sorry, we couldn't resolve details for this cinematic catalog record.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-outfit font-bold shadow-neon-red transition-all"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const isFavorited = isMovieFavorited(movie._id || movie.tmdbId);

  return (
    <div className="pb-20 select-none relative">
      
      {/* 1. Cinematic Backdrop Overlay */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] md:h-[75vh] z-0 overflow-hidden">
        <img
          src={getBackdropUrl(movie.backdrop)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Dark fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/40 to-black/55"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brandDark via-transparent to-brandDark"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-6 md:pt-16 space-y-12">
        
        {/* Return to previous slot */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white font-outfit text-sm bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        {/* 2. Parameters layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start pt-4">
          
          {/* Left Poster cover widget */}
          <div
            className="lg:col-span-4 max-w-sm mx-auto lg:max-w-none w-full shadow-2xl rounded-2xl overflow-hidden border border-white/10 relative group"
          >
            <img
              src={getPosterUrl(movie.poster)}
              alt={movie.title}
              className="w-full object-cover aspect-[2/3]"
            />
            {movie.trailerUrl && (
              <button
                onClick={() => openTrailer(movie.trailerUrl)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white focus:outline-none"
              >
                <div
                  className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-neon-red transform scale-75 group-hover:scale-100 transition-transform duration-300"
                >
                  <Play className="h-6 w-6 fill-white pl-1" />
                </div>
              </button>
            )}
          </div>

          {/* Right Parameters block */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Metadata badges row */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="bg-primary/20 border border-primary/30 text-primary text-xs font-bold font-outfit px-3 py-1 rounded-md"
              >
                {movie.isCustom ? 'EXCLUSIVE' : 'TMDB PREVIEW'}
              </span>

              {movie.releaseDate && (
                <span
                  className="flex items-center space-x-1 text-xs text-gray-400 font-semibold bg-white/5 border border-white/5 px-3 py-1 rounded-md font-outfit"
                >
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <span>{getYear(movie.releaseDate)}</span>
                </span>
              )}

              {movie.duration && (
                <span
                  className="flex items-center space-x-1 text-xs text-gray-400 font-semibold bg-white/5 border border-white/5 px-3 py-1 rounded-md font-outfit"
                >
                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                  <span>{movie.duration}</span>
                </span>
              )}

              <span
                className="flex items-center space-x-1 text-xs text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-md font-outfit"
              >
                <Star className="h-3.5 w-3.5 fill-yellow-500" />
                <span>{movie.rating ? movie.rating.toFixed(1) : '7.5'} / 10</span>
              </span>
            </div>

            {/* Title & description */}
            <div className="space-y-4">
              <h1
                className="text-3xl md:text-5xl font-black font-outfit text-white tracking-tight uppercase leading-tight"
              >
                {movie.title}
              </h1>
              {movie.genre && movie.genre.length > 0 && (
                <p className="text-sm font-semibold font-outfit text-gray-400 tracking-wide">
                  {movie.genre.join(' • ')}
                </p>
              )}
              <hr className="border-white/5" />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                {movie.description}
              </p>
            </div>

            {/* Play actions */}
            <div className="flex flex-wrap items-center gap-4">
              {movie.trailerUrl && (
                <button
                  onClick={() => openTrailer(movie.trailerUrl)}
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-outfit font-bold transition-all border border-white/10 focus:outline-none"
                >
                  <Play className="h-5 w-5 fill-white pl-0.5" />
                  <span>TRAILER</span>
                </button>
              )}

              {/* WATCH NOW BUTTON */}
              {(movie.tmdbId || movie.isCustom) && (
                <a
                  href={movie.tmdbId ? `https://vidsrc.xyz/embed/movie?tmdb=${movie.tmdbId}` : movie.trailerUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-outfit font-bold shadow-neon-red hover:shadow-lg transition-all focus:outline-none"
                >
                  <Play className="h-5 w-5 fill-white pl-0.5" />
                  <span>WATCH NOW</span>
                </a>
              )}

              <button
                onClick={() => toggleFavorite(movie._id || movie.tmdbId)}
                className={`flex items-center space-x-3 px-6 py-3.5 rounded-xl font-outfit font-semibold border transition-all focus:outline-none ${
                  isFavorited
                    ? 'bg-primary text-white border-transparent shadow-neon-red'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-white' : ''}`} />
                <span>{isFavorited ? 'REMOVE FROM LIST' : 'ADD TO MY LIST'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* 3. Cast Members list */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="space-y-6 pt-12 border-t border-white/5">
            <h2
              className="text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-2"
            >
              <span className="h-6 w-1 bg-primary rounded-full"></span>
              <span>CAST & ACTORS</span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movie.cast.map((actor, idx) => (
                <div
                  key={idx}
                  className="bg-brandDark-card border border-white/5 p-3 rounded-xl flex flex-col items-center text-center space-y-3 hover:border-white/10 transition-colors"
                >
                  <img
                    src={
                      actor.profilePath ||
                      'https://api.dicebear.com/7.x/initials/svg?seed=' +
                        encodeURIComponent(actor.name)
                    }
                    alt={actor.name}
                    className="h-20 w-20 rounded-full object-cover border border-white/10"
                    loading="lazy"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-bold font-outfit text-white leading-tight">
                      {actor.name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {actor.character || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default MovieDetailsPage;
