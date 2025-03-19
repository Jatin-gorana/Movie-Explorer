'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, status } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Movie Explorer
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            
            {status === 'authenticated' && (
              <Link
                href="/favorites"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/favorites')
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Authentication Links */}
            {status === 'authenticated' ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-3">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/auth/login')
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            
            {status === 'authenticated' && (
              <Link
                href="/favorites"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/favorites')
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}

            {/* Authentication Links - Mobile */}
            {status === 'authenticated' ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300">
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/auth/login')
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 