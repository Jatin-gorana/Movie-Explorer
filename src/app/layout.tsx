import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Discover and explore your favorite movies and TV shows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
