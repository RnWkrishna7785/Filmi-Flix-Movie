import React, { useContext, useState, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { FavoriteContext } from '../context/FavoriteContext';
import MovieCard from '../components/common/MovieCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Play, Info, Heart, Star, Flame, Award, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBackdropUrl } from '../utils/imageHelper';

export const HomePage = () => {
  const {
    movies,
    trending,
    topRated,
    popular,
    categories,
    loading,
    openTrailer,
  } = useContext(MovieContext);
  
  const { toggleFavorite, isMovieFavorited } = useContext(FavoriteContext);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroMovies =
    trending.length > 0
      ? trending.slice(0, 5)
      : movies.length > 0
      ? movies.slice(0, 5)
      : [];

  useEffect(() => {
    if (heroMovies.length === 0) return;
    const sliderInterval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 10000);

    return () => clearInterval(sliderInterval);
  }, [heroMovies.length]);

  if (loading) {
    return (
      <div className="space-y-12">
        <SkeletonLoader type="hero" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <SkeletonLoader type="row" count={3} />
        </div>
      </div>
    );
  }

  const activeHero = heroMovies[heroIndex];

  return (
    <div className="space-y-16 pb-20 select-none">
      
      {/* 1. Dynamic Auto Slider Hero Banner */}
      {activeHero && (
        <div className="relative w-full h-[65vh] md:h-[82vh] overflow-hidden flex items-end">
          
          {/* Backdrop Image Artwork */}
          <div className="absolute inset-0 z-0">
            <img
              src={getBackdropUrl(activeHero.backdrop)}
              alt={activeHero.title}
              className="w-full h-full object-cover transform scale-100 transition-transform duration-1000"
            />
            {/* Glassy gradients vignette panels */}
            <div className="absolute inset-0 bg-gradient-to-r from-brandDark via-brandDark/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-black/30 z-10"></div>
          </div>

          {/* Slide detail parameters */}
          <div className="max-w-4xl mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-20 w-full">
            <div className="space-y-4 md:space-y-6">
              
              {/* Category tag */}
              <div className="flex items-center space-x-3 text-xs font-bold font-outfit tracking-wide text-primary">
                <span className="bg-primary/20 border border-primary/30 px-2.5 py-1 rounded-md">
                  TRENDING
                </span>
                {activeHero.genre && activeHero.genre.length > 0 && (
                  <span className="text-gray-300 font-medium">
                    {activeHero.genre.slice(0, 3).join(' • ')}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-outfit text-white tracking-tight uppercase leading-none drop-shadow-md">
                {activeHero.title}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 max-w-2xl drop-shadow-sm font-light">
                {activeHero.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {activeHero.trailerUrl && (
                  <button
                    onClick={() => openTrailer(activeHero.trailerUrl)}
                    className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-outfit font-bold shadow-neon-red hover:shadow-lg transition-all focus:outline-none"
                  >
                    <Play className="h-4 w-4 fill-white pl-0.5" />
                    <span>PLAY TRAILER</span>
                  </button>
                )}

                <Link
                  to={`/movie/${activeHero._id || activeHero.tmdbId}`}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-lg font-outfit font-semibold backdrop-blur-md transition-all focus:outline-none"
                >
                  <Info className="h-4 w-4" />
                  <span>MORE INFO</span>
                </Link>

                <button
                  onClick={() => toggleFavorite(activeHero._id || activeHero.tmdbId)}
                  className={`p-3 rounded-lg border transition-all focus:outline-none ${
                    isMovieFavorited(activeHero._id || activeHero.tmdbId)
                      ? 'bg-primary text-white border-transparent'
                      : 'bg-white/5 border-white/10 hover:bg-white/15 text-white'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isMovieFavorited(activeHero._id || activeHero.tmdbId) ? 'fill-white' : ''
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* Dots controller indicator */}
          <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center space-x-2">
            {heroMovies.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  i === heroIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>

        </div>
      )}

      {/* Movie categories & Rows */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 relative z-20">
        
        {/* 2. Genre Categories Strip */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-2">
            <span className="h-6 w-1 bg-primary rounded-full"></span>
            <span>BROWSE BY CATEGORY</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/movies?genre=${encodeURIComponent(cat.slug)}`}
                className="bg-brandDark-card border border-white/5 hover:border-primary/45 hover:bg-primary/5 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl font-outfit text-sm font-semibold transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* 3. ROW: Director's Creations (MVC local CRUD movies!) */}
        {movies.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
              <Flame className="h-5 w-5 text-primary animate-pulse" />
              <span>DIRECTOR'S CUT</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((m) => (
                <MovieCard key={m._id} movie={m} />
              ))}
            </div>
          </section>
        )}

        {/* 4. ROW: Trending Blockbusters (TMDB aggregated) */}
        {trending.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>TRENDING BLOCKBUSTERS</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trending.slice(0, 6).map((m) => (
                <MovieCard key={m._id || m.tmdbId} movie={m} />
              ))}
            </div>
          </section>
        )}

        {/* 5. ROW: Top Rated Cinema (TMDB aggregated) */}
        {topRated.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span>TOP RATED CINEMA</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {topRated.slice(0, 6).map((m) => (
                <MovieCard key={m._id || m.tmdbId} movie={m} />
              ))}
            </div>
          </section>
        )}

        {/* 6. ROW: Popular Blockbusters (TMDB aggregated) */}
        {popular.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
              <HeartHandshake className="h-5 w-5 text-blue-500" />
              <span>POPULAR BLOCKBUSTERS</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {popular.slice(0, 6).map((m) => (
                <MovieCard key={m._id || m.tmdbId} movie={m} />
              ))}
            </div>
          </section>
        )}

      </div>
      
    </div>
  );
};

export default HomePage;
