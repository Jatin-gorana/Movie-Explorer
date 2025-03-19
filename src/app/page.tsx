import { Suspense } from 'react';
import MovieList from '@/components/MovieList';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import { tmdbService } from '@/services/tmdb';
import HomePageWrapper from '@/components/HomePageWrapper';

// This function is executed at build time on the server
export async function generateMetadata() {
  return {
    title: 'Movie Explorer - Popular Movies',
    description: 'Explore the most popular movies from TMDB',
  };
}

// This function runs at build time on the server or during revalidation
export async function fetchPopularMovies() {
  try {
    return await tmdbService.getPopularMovies(1);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

export default async function Home() {
  // Fetch initial popular movies at build time
  const initialData = await fetchPopularMovies();

  // Use the client wrapper component
  return <HomePageWrapper initialMovies={initialData.results} />;
}
