import { tmdbService } from '@/services/tmdb';
import MovieList from '@/components/MovieList';

export default async function MoviesPage() {
  const movies = await tmdbService.getPopularMovies();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Popular Movies
      </h1>
      <MovieList movies={movies} />
    </div>
  );
} 