'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/services/tmdb';
import { tmdbService } from '@/services/tmdb';
import { useState } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link href={`/movies/${movie.id}`}>
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={tmdbService.getMoviePosterUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Favorite Button */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
            <button
              onClick={handleFavoriteClick}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                isFavorite(movie.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
} 