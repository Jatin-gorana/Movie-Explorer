'use client';

import { ThemeProvider } from "@/context/ThemeContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </ThemeProvider>
  );
} 