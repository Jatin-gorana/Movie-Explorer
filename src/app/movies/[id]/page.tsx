import { tmdbService } from '@/services/tmdb';
import MovieDetailClient from '@/components/MovieDetailClient';
import { notFound } from 'next/navigation';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  try {
    const movie = await tmdbService.getMovieDetails(parseInt(params.id));
    return <MovieDetailClient movie={movie} />;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    notFound();
  }
} 