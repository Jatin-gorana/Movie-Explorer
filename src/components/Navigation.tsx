'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">
            Movie Explorer
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            
            
            <Link
              href="/favorites"
              className={`text-sm font-medium transition-colors ${
                isActive('/favorites') ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 