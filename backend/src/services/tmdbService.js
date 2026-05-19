import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

class TMDBService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
  }

  async getRequest(endpoint, params = {}) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: 'en-US',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`TMDB service request error at ${endpoint}:`, error.message);
      throw error;
    }
  }

  async fetchTrending(mediaType = 'movie', timeWindow = 'week') {
    const data = await this.getRequest(`/trending/${mediaType}/${timeWindow}`);
    return this.formatMovies(data.results);
  }

  async fetchTopRated() {
    const data = await this.getRequest('/movie/top_rated');
    return this.formatMovies(data.results);
  }

  async fetchPopular() {
    const data = await this.getRequest('/movie/popular');
    return this.formatMovies(data.results);
  }

  async fetchMovieDetails(id) {
    const details = await this.getRequest(`/movie/${id}`);
    const credits = await this.getRequest(`/movie/${id}/credits`);
    const videos = await this.getRequest(`/movie/${id}/videos`);

    return this.formatSingleMovie(details, credits, videos);
  }

  async fetchGenres() {
    const data = await this.getRequest('/genre/movie/list');
    return data.genres;
  }

  async fetchMoviesByGenre(genreId) {
    const data = await this.getRequest('/discover/movie', { with_genres: genreId });
    return this.formatMovies(data.results);
  }

  async searchMovies(query) {
    const data = await this.getRequest('/search/movie', { query });
    return this.formatMovies(data.results);
  }

  formatMovies(movies) {
    return movies.map((m) => ({
      tmdbId: m.id,
      title: m.title || m.name,
      description: m.overview,
      poster: m.poster_path ? `${IMAGE_BASE_URL}/w500${m.poster_path}` : 'https://placehold.co/500x750?text=No+Poster',
      backdrop: m.backdrop_path ? `${IMAGE_BASE_URL}/original${m.backdrop_path}` : 'https://placehold.co/1280x720?text=No+Backdrop',
      genre: m.genre_ids || [], 
      rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 0,
      releaseDate: m.release_date || m.first_air_date || '',
      isCustom: false,
    }));
  }

  formatSingleMovie(details, credits, videos) {
    const trailer = videos.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube') || videos.results?.[0];
    
    return {
      tmdbId: details.id,
      title: details.title,
      description: details.overview,
      poster: details.poster_path ? `${IMAGE_BASE_URL}/w500${details.poster_path}` : 'https://placehold.co/500x750?text=No+Poster',
      backdrop: details.backdrop_path ? `${IMAGE_BASE_URL}/original${details.backdrop_path}` : 'https://placehold.co/1280x720?text=No+Backdrop',
      genre: details.genres?.map((g) => g.name) || [],
      rating: details.vote_average ? Number(details.vote_average.toFixed(1)) : 0,
      releaseDate: details.release_date || '',
      duration: details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : 'N/A',
      trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : '',
      cast: credits.cast?.slice(0, 10).map((c) => ({
        name: c.name,
        character: c.character,
        profilePath: c.profile_path ? `${IMAGE_BASE_URL}/w185${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`,
      })) || [],
      isCustom: false,
    };
  }
}

export default new TMDBService();
