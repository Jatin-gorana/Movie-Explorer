import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tmdbService, MovieDetails } from '@/services/tmdb';
import Navigation from '@/components/Navigation';
import MovieDetailClient from '@/components/MovieDetailClient';
import { notFound } from 'next/navigation';
import ProtectedContent from '@/components/ProtectedContent';
import MoviePageWrapper from '@/components/MoviePageWrapper';

interface MoviePageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: MoviePageProps) {
  try {
    const movieId = parseInt(params.id);
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
  } catch (error) {
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
  const movie = await getMovieData(params.id);

  if (!movie) {
    notFound();
  }

  return <MoviePageWrapper movie={movie} />;
} 