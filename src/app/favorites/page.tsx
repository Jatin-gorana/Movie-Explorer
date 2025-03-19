'use client';

import { useFavorites } from '@/context/FavoritesContext';
import MovieCard from '@/components/MovieCard';
import Navigation from '@/components/Navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedContent from '@/components/ProtectedContent';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [isClient, setIsClient] = useState(false);
  
  // This ensures hydration completes before showing the favorites
  // since we're reading from localStorage which is client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return nothing during SSR
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <ProtectedContent>
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
            My Favorites
          </h1>
          
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't added any movies to your favorites yet.
              </p>
              <Link
                href="/"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Explore Movies
              </Link>
            </div>
          )}
        </div>
      </ProtectedContent>
    </div>
  );
} 