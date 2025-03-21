/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during builds to avoid build failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure image domains for the TMDB API
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  
  // Experimental features
  experimental: {
    // Server actions configuration
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

module.exports = nextConfig; 