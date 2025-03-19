'use client';

import { Movie } from '@/services/tmdb';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import Navigation from './Navigation';

interface HomePageWrapperProps {
  initialMovies: Movie[];
}

export default function HomePageWrapper({ initialMovies }: HomePageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8 text-white">Popular Movies</h2>
          <MovieList initialMovies={initialMovies} />
        </div>
      </div>
    </div>
  );
} 