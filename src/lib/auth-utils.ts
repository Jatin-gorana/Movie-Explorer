import { getAuthUsers } from '@/app/api/auth/[...nextauth]/route';
import { hash } from 'bcryptjs';

// Access the users array from the NextAuth route
// Note: This is for demo purposes only, in a real app you would use a proper database
export function getUsersArray() {
  return getAuthUsers();
}

// Check if a user exists by email
export function userExists(email: string) {
  return getUsersArray().some(user => user.email === email);
}

// Register a new user
export async function registerUser(name: string, email: string, password: string) {
  if (userExists(email)) {
    return { success: false, error: 'User already exists' };
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create new user
  const id = String(getUsersArray().length + 1);
  const newUser = {
    id,
    name,
    email,
    password: hashedPassword,
  };
  
  // Add to users array
  getUsersArray().push(newUser);
  
  return { 
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }
  };
} 