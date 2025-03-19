'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function Navigation() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Movie Explorer
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/favorites"
              className={`text-sm font-medium transition-colors ${
                pathname === '/favorites'
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Favorites ({favorites.length})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 