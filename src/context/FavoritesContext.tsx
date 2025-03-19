'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '@/services/tmdb';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { user, status } = useAuth();
  
  // Get the user-specific storage key
  const getFavoritesKey = () => {
    return user?.id ? `movieFavorites_${user.id}` : null;
  };

  // Load favorites from localStorage when user changes
  useEffect(() => {
    // Only load favorites if a user is authenticated
    if (status === 'authenticated' && user?.id) {
      const storageKey = getFavoritesKey();
      if (storageKey) {
        const storedFavorites = localStorage.getItem(storageKey);
        if (storedFavorites) {
          try {
            setFavorites(JSON.parse(storedFavorites));
          } catch (error) {
            console.error('Error parsing favorites from localStorage:', error);
            localStorage.removeItem(storageKey);
            setFavorites([]);
          }
        } else {
          // Initialize empty favorites for this user
          setFavorites([]);
        }
      }
    } else if (status === 'unauthenticated') {
      // Clear favorites when user is not authenticated
      setFavorites([]);
    }
  }, [user, status]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    const storageKey = getFavoritesKey();
    if (storageKey && status === 'authenticated') {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites, user, status]);

  const addFavorite = (movie: Movie) => {
    // Only add favorites if user is authenticated
    if (status !== 'authenticated') return;
    
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (movieId: number) => {
    // Only remove favorites if user is authenticated
    if (status !== 'authenticated') return;
    
    setFavorites((prevFavorites) => 
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavorite = (movieId: number) => {
    // Check if user is authenticated, if not return false
    if (status !== 'authenticated') return false;
    
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
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