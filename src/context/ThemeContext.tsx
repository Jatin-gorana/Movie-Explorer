'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme on component mount
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Try to get theme from localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // If no saved theme, check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set the initial theme based on the above checks
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Apply initial theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);
  }, []);

  // Update the document class and localStorage when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 