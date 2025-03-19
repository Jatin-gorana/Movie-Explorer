import { tmdbService } from '@/services/tmdb';
import HomePageWrapper from '@/components/HomePageWrapper';

// This function is executed at build time on the server
export async function generateMetadata() {
  return {
    title: 'Movie Explorer - Popular Movies',
    description: 'Explore the most popular movies from TMDB',
  };
}

export default async function Home() {
  // This function runs at build time on the server or during revalidation
  async function fetchPopularMovies() {
    try {
      return await tmdbService.getPopularMovies(1);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
  }

  // Fetch initial popular movies at build time
  const initialData = await fetchPopularMovies();

  // Use the client wrapper component
  return <HomePageWrapper initialMovies={initialData.results} />;
}
