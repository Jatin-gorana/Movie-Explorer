import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

// In a real app, this would be a database
// For now, we'll use localStorage simulation in Next.js server
const userStore = global as unknown as {
  users?: Array<{
    id: string;
    name: string;
    email: string;
    password: string;
  }>;
};

// Initialize the user store if it doesn't exist
if (!userStore.users) {
  userStore.users = [
    {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
      // Password: "password"
      password: "$2a$10$ICRpI./uJDlJuxA5s9rY6.RJhfS8Ffk.L3A0OvTxSao/d3tzS6w8G",
    },
  ];
  console.log("Initialized user store with demo user");
}

// Export users for access from the register route
export const getUsers = () => userStore.users || [];
export const addUser = (user: { id: string; name: string; email: string; password: string }) => {
  if (!userStore.users) {
    userStore.users = [];
  }
  userStore.users.push(user);
  console.log(`Added new user: ${user.email} (${user.id})`);
  console.log(`Current users: ${JSON.stringify(userStore.users.map(u => ({ id: u.id, email: u.email })))}`);
};

export const authOptions: NextAuthOptions = {
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
        console.log(`Available users: ${JSON.stringify(getUsers().map(u => ({ id: u.id, email: u.email })))}`);

        const user = getUsers().find((user) => user.email === credentials.email);
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
  debug: true, // Enable debug mode
};

// Create a NextAuth handler with the authOptions
const handler = NextAuth(authOptions);

// Export the handler for all HTTP methods
export { handler as GET, handler as POST }; 