'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeDebugger() {
  const { theme, toggleTheme } = useTheme();
  const [docTheme, setDocTheme] = useState<string>('');
  const [localStorageTheme, setLocalStorageTheme] = useState<string>('');

  // Check document and localStorage theme on mount and when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get theme from document classes
    const docClass = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setDocTheme(docClass);
    
    // Get theme from localStorage
    const storageTheme = localStorage.getItem('theme') || 'not set';
    setLocalStorageTheme(storageTheme);
    
    console.log({
      contextTheme: theme,
      documentClass: docClass,
      localStorageTheme: storageTheme
    });
  }, [theme]);

  // Force theme direct application
  const forceTheme = (newTheme: 'light' | 'dark') => {
    // Direct DOM manipulation
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    
    // Direct localStorage update
    localStorage.setItem('theme', newTheme);
    
    // Update state to reflect changes
    setDocTheme(newTheme);
    setLocalStorageTheme(newTheme);
    
    console.log(`Forced theme to: ${newTheme}`);
    window.location.reload(); // Force reload to ensure all components see the change
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Theme Debugger</h2>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="text-gray-700 dark:text-gray-300">Context Theme:</div>
        <div className="font-medium text-gray-900 dark:text-white">{theme}</div>
        
        <div className="text-gray-700 dark:text-gray-300">Document Class:</div>
        <div className="font-medium text-gray-900 dark:text-white">{docTheme}</div>
        
        <div className="text-gray-700 dark:text-gray-300">localStorage Theme:</div>
        <div className="font-medium text-gray-900 dark:text-white">{localStorageTheme}</div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={toggleTheme}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Toggle Theme (Context)
        </button>
        
        <button 
          onClick={() => forceTheme('light')} 
          className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded"
        >
          Force Light
        </button>
        
        <button 
          onClick={() => forceTheme('dark')}
          className="py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white rounded"
        >
          Force Dark
        </button>
      </div>
    </div>
  );
} 