'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const error = searchParams.get('error');
    let message = 'An authentication error occurred';

    if (error === 'CredentialsSignin') {
      message = 'Invalid email or password';
    } else if (error === 'AccessDenied') {
      message = 'You do not have permission to access this resource';
    } else if (error === 'CallbackRouteError') {
      message = 'There was a problem with the callback URL';
    } else if (error === 'OAuthSignin') {
      message = 'There was a problem signing in with the provider';
    } else if (error === 'OAuthCallback') {
      message = 'There was a problem during the OAuth callback';
    } else if (error === 'OAuthCreateAccount') {
      message = 'Could not create user account';
    } else if (error === 'EmailCreateAccount') {
      message = 'Could not create account with email';
    } else if (error === 'Callback') {
      message = 'Error in the OAuth callback';
    } else if (error === 'Configuration') {
      message = 'Server configuration error';
    }

    setErrorMessage(message);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <Link href="/">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white cursor-pointer">
              Movie Explorer
            </h2>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold text-red-600 dark:text-red-500">
            Authentication Error
          </h2>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Login
          </Link>
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 