import NextAuth from "next-auth";

// Extend the built-in NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
} 