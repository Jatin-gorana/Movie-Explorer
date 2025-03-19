'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Movie, tmdbService } from '@/services/tmdb';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const searchRef = useRef<HTMLDivElement>(null);

  // Update the URL when search query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }
    router.push(`?${params.toString()}`);
  }, [searchQuery, router, searchParams]);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout
    searchTimeout.current = setTimeout(async () => {
      try {
        const response = await tmdbService.searchMovies(searchQuery);
        setSuggestions(response.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-6 py-4 pl-14 text-lg rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
      />
      <svg
        className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Loading...</div>
          ) : (
            <ul className="py-2">
              {suggestions.map((movie) => (
                <li key={movie.id}>
                  <Link
                    href={`/movies/${movie.id}`}
                    className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
                  >
                    <div className="relative w-12 h-18 mr-3 flex-shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <div className="text-white font-medium">{movie.title}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(movie.release_date).getFullYear()}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 