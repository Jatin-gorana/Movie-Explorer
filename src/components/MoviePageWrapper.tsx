'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import MovieDetailClient from '@/components/MovieDetailClient';
import { MovieDetails } from '@/services/tmdb';
import { useAuth } from '@/context/AuthContext';

interface MoviePageWrapperProps {
  movie: MovieDetails;
}

export default function MoviePageWrapper({ movie }: MoviePageWrapperProps) {
  const { status } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?returnUrl=' + encodeURIComponent('/movie/' + movie.id));
    }
  }, [status, router, movie.id]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-solid border-current border-r-transparent text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if unauthenticated (will redirect)
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Please log in to view movie details. Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  // Render movie details if authenticated
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetailClient movie={movie} />
      </Suspense>
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