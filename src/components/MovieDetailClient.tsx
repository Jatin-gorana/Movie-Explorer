'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MovieDetails, tmdbService } from '@/services/tmdb';
import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';

interface MovieDetailClientProps {
  movie: MovieDetails;
}

export default function MovieDetailClient({ movie }: MovieDetailClientProps) {
  const [backdropError, setBackdropError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteToggle = () => {
    if (isMovieFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  function formatRuntime(minutes?: number | null) {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  function formatMoney(amount?: number) {
    if (!amount || amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  return (
    <>
      {/* Backdrop */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        {movie.backdrop_path && !backdropError ? (
          <Image
            src={tmdbService.getMovieBackdropUrl(movie.backdrop_path)}
            alt={`${movie.title} backdrop`}
            fill
            className="object-cover"
            priority
            onError={() => setBackdropError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Image 
              src="/placeholder-backdrop.svg" 
              alt="Backdrop placeholder" 
              width={1280} 
              height={720} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row -mt-32 md:-mt-40 relative z-10 gap-8">
          {/* Movie poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg mx-auto md:mx-0" style={{ maxWidth: '300px' }}>
              <Image
                src={posterError ? '/placeholder-poster.svg' : tmdbService.getMoviePosterUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 300px"
                onError={() => setPosterError(true)}
              />
            </div>
            
            <button
              onClick={handleFavoriteToggle}
              className={`mt-4 flex items-center justify-center w-full py-2 px-4 rounded-md transition-colors ${
                isMovieFavorite
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
              }`}
            >
              <svg
                className="h-5 w-5 mr-2"
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
              {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          
          {/* Movie details */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-6 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {movie.title} <span className="text-gray-600 dark:text-gray-400 text-2xl">({new Date(movie.release_date).getFullYear()})</span>
            </h1>
            
            {movie.tagline && (
              <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-4">
                "{movie.tagline}"
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-6">
                <svg
                  className="h-5 w-5 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-900 dark:text-white">
                  {movie.vote_average.toFixed(1)} <span className="text-gray-600 dark:text-gray-400 text-sm">({movie.vote_count} votes)</span>
                </span>
              </div>
              <div className="mr-6">
                <span className="text-gray-900 dark:text-white">
                  {formatRuntime(movie.runtime)}
                </span>
              </div>
              <div>
                <span className="text-gray-900 dark:text-white">
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.overview}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Details</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className="text-gray-900 dark:text-white">{movie.status}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                    <span className="text-gray-900 dark:text-white">{formatMoney(movie.budget)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                    <span className="text-gray-900 dark:text-white">{formatMoney(movie.revenue)}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Production</h3>
                <div className="space-y-2">
                  {movie.production_companies && movie.production_companies.length > 0 ? (
                    movie.production_companies.map((company) => (
                      <div key={company.id} className="text-gray-700 dark:text-gray-300">
                        {company.name} {company.origin_country ? `(${company.origin_country})` : ''}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No production information available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 