'use client';

import Image from 'next/image';
import { MovieDetails } from '@/services/tmdb';
import { tmdbService } from '@/services/tmdb';
import { useState } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface MovieDetailClientProps {
  movie: MovieDetails;
}

export default function MovieDetailClient({ movie }: MovieDetailClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={tmdbService.getMovieBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          onLoadingComplete={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={tmdbService.getMoviePosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">
                {movie.runtime} minutes
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">
                {movie.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">★</span>
              <span>{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Production Companies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-gray-800 p-4 rounded-lg"
                  >
                    <h3 className="font-medium">{company.name}</h3>
                    <p className="text-sm text-gray-400">{company.origin_country}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleFavoriteClick}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                isFavorite(movie.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 