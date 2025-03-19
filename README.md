# Movie Explorer

A modern web application for exploring and discovering movies, built with Next.js 14, React, TypeScript, and Tailwind CSS.


## Features

- **Server-Side Rendering (SSR)**: Fast initial page loads with server-rendered content
- **Static Site Generation (SSG)**: Pre-rendered pages for optimal performance
- **Responsive Design**: Beautiful UI that works on all device sizes
- **Dark Mode Support**: Toggle between light and dark themes
- **Authentication System**: User registration and login functionality
- **User-Specific Favorites**: Save and manage your favorite movies
- **Search Functionality**: Find movies with URL-based search parameters
- **Image Optimization**: Modern image formats and SVG placeholders
- **API Integration**: Connects to TMDB (The Movie Database) API

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **API**: TMDB (The Movie Database)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn package manager
- TMDB API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jatin-gorana/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
movie-explorer/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── favorites/    # Favorites page
│   │   ├── movie/        # Movie detail pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx      # Authentication context
│   │   ├── FavoritesContext.tsx # Favorites management
│   │   └── ThemeContext.tsx     # Theme management
│   ├── services/         # API service layer
│   └── types/            # TypeScript type definitions
└── package.json          # Project dependencies
```

## Authentication

The application uses NextAuth.js for authentication with a credentials provider. For demo purposes, we use an in-memory store, but in production, you should replace this with a proper database.

### Demo User

- **Email**: user@example.com
- **Password**: password

### User Registration

New users can register with:
- Name
- Email
- Password (minimum 6 characters)

## Theme Support

The application supports both light and dark modes, which can be toggled from the navigation bar. The theme preference is saved in localStorage.

## Favorites System

Logged-in users can add movies to their favorites list, which is:
- User-specific (tied to user account)
- Stored in localStorage (would use a database in production)
- Accessible from the favorites page

## API Integration

The application connects to TMDB API to fetch movie data. The integration is handled through a service layer in `src/services/tmdb.ts`.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) for the authentication solution
