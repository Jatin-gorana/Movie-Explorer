'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TVShow } from '@/services/tmdb';
import { tmdbService } from '@/services/tmdb';
import { useState } from 'react';

interface TVShowCardProps {
  show: TVShow;
}

export default function TVShowCard({ show }: TVShowCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/tv/${show.id}`}>
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={tmdbService.getMoviePosterUrl(show.poster_path)}
            alt={show.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-75 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{show.name}</h3>
            <p className="text-sm text-gray-300 mb-2">
              {new Date(show.first_air_date).getFullYear()}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">★</span>
              <span>{show.vote_average.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-300 line-clamp-3">{show.overview}</p>
          </div>
        )}
      </div>
    </Link>
  );
} 