'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Movie, tmdbService } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import { useSearchParams } from 'next/navigation';

interface MovieListProps {
  initialMovies: Movie[];
}

export default function MovieList({ initialMovies }: MovieListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  // Reset and fetch movies when search query changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = searchQuery
          ? await tmdbService.searchMovies(searchQuery, 1)
          : await tmdbService.getPopularMovies(1);
        
        setMovies(response.results);
        setHasMore(response.total_pages > 1);
        setPage(1);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  // Fetch more movies when reaching the end of the list
  useEffect(() => {
    const fetchMoreMovies = async () => {
      if (page === 1 || !inView || loading || !hasMore) return;
      
      try {
        setLoading(true);
        const response = searchQuery
          ? await tmdbService.searchMovies(searchQuery, page)
          : await tmdbService.getPopularMovies(page);
        
        setMovies(prevMovies => [...prevMovies, ...response.results]);
        setHasMore(page < response.total_pages);
      } catch (error) {
        console.error('Error fetching more movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreMovies();
  }, [inView, loading, page, hasMore, searchQuery]);

  // Increment page when the user scrolls to the bottom and there are more pages
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, loading, hasMore]);

  if (movies.length === 0 && !loading) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-gray-600 dark:text-gray-400">No movies found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={ref} className="mt-8 flex justify-center">
        {loading && (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        )}
        {!hasMore && movies.length > 0 && (
          <p className="text-gray-600 dark:text-gray-400">
            No more movies to load
          </p>
        )}
      </div>
    </>
  );
} 