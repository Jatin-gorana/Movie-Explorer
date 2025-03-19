import { notFound } from 'next/navigation';
import { tmdbService } from '@/services/tmdb';
import TVShowDetailClient from '@/components/TVShowDetailClient';

interface TVShowPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TVShowPageProps) {
  try {
    const show = await tmdbService.getTVShowDetails(parseInt(params.id));
    return {
      title: `${show.name} | Movie Explorer`,
      description: show.overview,
    };
  } catch (error) {
    return {
      title: 'TV Show Not Found | Movie Explorer',
      description: 'The requested TV show could not be found.',
    };
  }
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  try {
    const show = await tmdbService.getTVShowDetails(parseInt(params.id));
    return <TVShowDetailClient show={show} />;
  } catch (error) {
    notFound();
  }
} 