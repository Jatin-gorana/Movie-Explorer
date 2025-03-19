const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface MovieDetails extends Movie {
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: Array<{
    id: number;
    name: string;
    origin_country: string;
  }>;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface TVShowDetails extends TVShow {
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  production_companies: Array<{
    id: number;
    name: string;
    origin_country: string;
  }>;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TVShowsResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

class TMDBService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';
  private readonly imageBaseUrl: string = 'https://image.tmdb.org/t/p';

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) {
      throw new Error('TMDB API key is not configured');
    }
    this.apiKey = apiKey;
  }

  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    const response = await fetch(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    return response.json();
  }

  async searchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
    const response = await fetch(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    return response.json();
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await fetch(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    return response.json();
  }

  async getPopularTVShows(page: number = 1): Promise<TVShowsResponse> {
    const response = await fetch(
      `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch popular TV shows');
    }
    return response.json();
  }

  async getTVShowDetails(showId: number): Promise<TVShowDetails> {
    const response = await fetch(
      `${this.baseUrl}/tv/${showId}?api_key=${this.apiKey}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch TV show details');
    }
    return response.json();
  }

  getMoviePosterUrl(path: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
    return `${this.imageBaseUrl}/${size}${path}`;
  }

  getMovieBackdropUrl(path: string, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
    return `${this.imageBaseUrl}/${size}${path}`;
  }
}

export const tmdbService = new TMDBService(); 