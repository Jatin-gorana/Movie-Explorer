import { tmdbService } from '@/services/tmdb';
import TVShowList from '@/components/TVShowList';

export const metadata = {
  title: 'Popular TV Shows | Movie Explorer',
  description: 'Browse popular TV shows from around the world.',
};

export default async function TVShowsPage() {
  const { results: tvShows } = await tmdbService.getPopularTVShows();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Popular TV Shows</h1>
      <TVShowList tvShows={tvShows} />
    </div>
  );
} 