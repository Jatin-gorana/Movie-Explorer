const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  vote_count: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const tmdbService = {
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return response.json();
  },

  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    if (!query.trim()) {
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0
      };
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }

    return response.json();
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,similar`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    return response.json();
  },

  getMoviePosterUrl: (path: string | null, size: 'w92' | 'w500' | 'original' = 'w500'): string => {
    if (!path) return '/placeholder-poster.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },

  getMovieBackdropUrl: (path: string | null, size: 'w1280' | 'original' = 'w1280'): string => {
    if (!path) return '/placeholder-backdrop.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },
}; 