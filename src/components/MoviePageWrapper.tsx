'use client';

import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import MovieDetailClient from '@/components/MovieDetailClient';
import ProtectedContent from '@/components/ProtectedContent';
import { MovieDetails } from '@/services/tmdb';

interface MoviePageWrapperProps {
  movie: MovieDetails;
}

export default function MoviePageWrapper({ movie }: MoviePageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      
      <ProtectedContent>
        <Suspense fallback={<MovieDetailSkeleton />}>
          <MovieDetailClient movie={movie} />
        </Suspense>
      </ProtectedContent>
    </div>
  );
}

function MovieDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        {/* Backdrop skeleton */}
        <div className="w-full h-[300px] md:h-[400px] bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
        
        {/* Content skeleton */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster skeleton */}
          <div className="w-full md:w-1/3 lg:w-1/4 h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          
          {/* Details skeleton */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/2"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/4"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 