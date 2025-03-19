'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 