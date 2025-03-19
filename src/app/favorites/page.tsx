import { Metadata } from 'next';
import FavoritesList from '@/components/FavoritesList';

export const metadata: Metadata = {
  title: 'My Favorites | Movie Explorer',
  description: 'View your favorite movies and TV shows.',
};

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <FavoritesList />
    </div>
  );
} 