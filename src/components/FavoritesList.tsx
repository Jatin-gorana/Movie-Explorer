'use client';

import { useFavorites } from '@/contexts/FavoritesContext';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FavoritesList() {
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
    <>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400 mb-4">
            You haven&apos;t added any movies to your favorites yet.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-colors"
          >
            Explore Movies
          </Link>
        </div>
      )}
    </>
  );
} 