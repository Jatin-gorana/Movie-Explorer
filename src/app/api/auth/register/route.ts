import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth-utils";

// API route handler for user registration
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Register the new user
    const result = await registerUser(name, email, password);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 409 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      user: result.user
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
} 