'use client';

import { TVShow } from '@/services/tmdb';
import TVShowCard from './TVShowCard';

interface TVShowListProps {
  tvShows: TVShow[];
}

export default function TVShowList({ tvShows }: TVShowListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {tvShows.map((show) => (
        <TVShowCard key={show.id} show={show} />
      ))}
    </div>
  );
} 