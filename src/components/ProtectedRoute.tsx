'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth();
  const router = useRouter();
  const [mounting, setMounting] = useState(true);

  // Make sure we don't redirect during SSR or hydration
  useEffect(() => {
    setMounting(false);
  }, []);

  useEffect(() => {
    // Don't do anything during initialization
    if (mounting) return;
    
    // If authentication is still being checked, do nothing
    if (status === 'loading') return;

    // If not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router, mounting]);

  // Show loading state while checking authentication
  if (mounting || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-solid border-current border-r-transparent text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Verifying your account...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
} 