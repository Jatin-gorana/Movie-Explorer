'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  status: 'loading',
  login: async () => ({ success: false, error: 'Auth context not initialized' }),
  register: async () => ({ success: false, error: 'Auth context not initialized' }),
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted) return { success: false, error: 'Component not mounted' };
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (!isMounted) return { success: false, error: 'Component not mounted' };
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      // Auto-login after successful registration
      const loginResult = await login(email, password);
      return loginResult;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    if (!isMounted) return;
    
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        status: status,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
} 