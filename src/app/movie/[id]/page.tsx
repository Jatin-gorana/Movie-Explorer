import { notFound } from 'next/navigation';
import MoviePageWrapper from '@/components/MoviePageWrapper';
import { tmdbService } from '@/services/tmdb';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({ params }: MoviePageProps) {
  try {
    // Properly await the params object
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    const movieId = parseInt(id);
    if (isNaN(movieId) || movieId <= 0) {
      return {
        title: 'Movie Not Found',
      };
    }

    const movie = await tmdbService.getMovieDetails(movieId);
    
    return {
      title: `${movie.title} (${new Date(movie.release_date).getFullYear()}) - Movie Explorer`,
      description: movie.overview?.substring(0, 160) || 'No description available.',
    };
  } catch (_) {
    // Ignore the error and return default metadata
    return {
      title: 'Movie Details - Movie Explorer',
      description: 'View detailed information about movies.',
    };
  }
}

// Fetch movie data on the server
async function getMovieData(id: string) {
  try {
    const movieId = parseInt(id);
    if (isNaN(movieId) || movieId <= 0) {
      return null;
    }
    
    return await tmdbService.getMovieDetails(movieId);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export default async function MovieDetailPage({ params }: MoviePageProps) {
  // Properly await the params object
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const movie = await getMovieData(id);

  if (!movie) {
    notFound();
  }

  return <MoviePageWrapper movie={movie} />;
} 