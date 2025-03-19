'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '@/services/tmdb';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // Mark component as mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Load favorites from localStorage when component mounts
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !isMounted) return;
    
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem('movieFavorites');
        setFavorites([]);
      }
    } else {
      // Initialize empty favorites
      setFavorites([]);
    }
  }, [isMounted]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites, isMounted]);

  const addFavorite = (movie: Movie) => {
    setFavorites(prev => {
      if (prev.some(m => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 