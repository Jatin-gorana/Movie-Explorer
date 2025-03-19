import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

// In-memory user database for demo purposes only
// In a real app, this would be a proper database
// WARNING: This gets reset when the server restarts
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    // Password: "password"
    password: "$2a$10$ICRpI./uJDlJuxA5s9rY6.RJhfS8Ffk.L3A0OvTxSao/d3tzS6w8G",
  },
];

// NextAuth configuration options
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        console.log(`Trying to authenticate: ${credentials.email}`);
        
        const user = users.find(user => user.email === credentials.email);
        if (!user) {
          console.log(`User not found: ${credentials.email}`);
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          console.log(`Invalid password for user: ${credentials.email}`);
          return null;
        }

        console.log(`Successfully authenticated: ${user.email} (${user.id})`);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for all HTTP methods
export { handler as GET, handler as POST };

// For accessing in a non-route file (but not exported from the route itself)
export const getAuthUsers = () => users; 