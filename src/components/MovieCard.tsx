'use client';

import Image from 'next/image';
import { Movie } from '@/services/tmdb';
import { tmdbService } from '@/services/tmdb';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { status } = useAuth();
  const isMovieFavorite = isFavorite(movie.id);
  const [imageError, setImageError] = useState(false);
  const isAuthenticated = status === 'authenticated';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    if (isMovieFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link 
      href={`/movie/${movie.id}`}
      className="group block relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={imageError ? '/placeholder-poster.svg' : tmdbService.getMoviePosterUrl(movie.poster_path)}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          priority={false}
          onError={() => setImageError(true)}
        />
        
        {/* Authentication indicator */}
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-center px-4">
              <svg 
                className="h-8 w-8 mx-auto mb-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p className="text-white text-sm font-medium">Login to view details</p>
            </div>
          </div>
        )}
        
        {/* Favorite button - only show if authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            aria-label={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              className={`h-5 w-5 ${isMovieFavorite ? 'text-yellow-400' : 'text-white'}`} 
              fill={isMovieFavorite ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
              />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900 truncate dark:text-white">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>
      </div>
    </Link>
  );
} 