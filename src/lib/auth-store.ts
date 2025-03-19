// This file provides a centralized place to store authentication users
// without exporting them directly from API routes

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Create a simple store to manage users
class AuthUsersStore {
  private users: User[] = [];

  // Set users array (called from NextAuth route)
  setUsers(users: User[]) {
    this.users = users;
  }

  // Get all users
  getUsers() {
    return this.users;
  }

  // Find user by email
  findUserByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  // Check if user exists
  userExists(email: string) {
    return this.users.some(user => user.email === email);
  }

  // Add user to the store
  addUser(user: User) {
    this.users.push(user);
    return user;
  }
}

// Export a singleton instance
export const authUsersStore = new AuthUsersStore(); 