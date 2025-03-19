import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { getUsers, addUser } from "../[...nextauth]/route";

// In production, use a proper database instead of an in-memory store!

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    console.log(`Registration attempt for: ${email}`);
    
    // Validate input
    if (!name || !email || !password) {
      console.log("Registration failed: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const users = getUsers();
    console.log(`Current users before registration: ${JSON.stringify(users.map(u => ({ id: u.id, email: u.email })))}`);
    
    if (users.some(user => user.email === email)) {
      console.log(`Registration failed: User already exists - ${email}`);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const id = String(users.length + 1);
    const newUser = {
      id,
      name,
      email,
      password: hashedPassword,
    };
    
    // Add to "database"
    addUser(newUser);
    console.log(`User registered successfully: ${email} (${id})`);

    // Return success response without including password
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
} 