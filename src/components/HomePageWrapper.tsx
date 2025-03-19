'use client';

import { Suspense } from 'react';
import MovieList from '@/components/MovieList';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import { Movie } from '@/services/tmdb';

interface HomePageWrapperProps {
  initialMovies: Movie[];
}

export default function HomePageWrapper({ initialMovies }: HomePageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Popular Movies
        </h1>
        
        <SearchBar />
        
        <Suspense 
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array(10).fill(0).map((_, index) => (
                <MovieCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          }
        >
          <MovieList initialMovies={initialMovies} />
        </Suspense>
      </div>
    </div>
  );
} 