import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, checkRateLimit, recordLoginAttempt, createToken } from "~/server/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent");

    // Check rate limit
    const isRateLimited = await checkRateLimit(ip);
    if (isRateLimited) {
      return NextResponse.json(
        { message: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    const isValid = await validateCredentials(username, password);

    // Record the attempt
    await recordLoginAttempt(ip, userAgent, isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a session token
    const token = await createToken();

    // Set the session cookie with a more secure name
    const cookiesStore = await cookies()
    cookiesStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes in seconds // it needs to be 15 but for now it is 150 minutes
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    );
  }
} 