'use client';

import { useState, useEffect, useRef } from 'react';
import { Movie, tmdbService } from '@/services/tmdb';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce the query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle URL updates
  useEffect(() => {
    if (debouncedQuery !== (searchParams.get('query') || '')) {
      const params = new URLSearchParams(searchParams.toString());
      
      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      } else {
        params.delete('query');
      }
      
      router.push(`/?${params.toString()}`);
    }
  }, [debouncedQuery, router, searchParams]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search for results
  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await tmdbService.searchMovies(debouncedQuery);
        setResults(response.results.slice(0, 5)); // Show only top 5 results in dropdown
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (movie: Movie) => {
    setQuery(movie.title);
    setShowResults(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', movie.title);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setShowResults(true)}
          placeholder="Search movies..."
          className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          ) : (
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {showResults && (query.trim() || results.length > 0) && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-[80vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 p-2">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                  onClick={() => handleResultClick(movie)}
                >
                  <div className="w-12 h-18 relative mr-3">
                    <Image
                      src={tmdbService.getMoviePosterUrl(movie.poster_path, 'w92')}
                      alt={movie.title}
                      width={48}
                      height={72}
                      className="rounded object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No movies found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
} 