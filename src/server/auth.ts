import { db } from "./db/index";
import { loginAttempts } from "./db/schema";
import { eq, and, gte } from "drizzle-orm";
import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 10 * 60 * 1000; // 10 minutes

// Use SHA-256 for password hashing (edge compatible)
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createToken(): Promise<string> {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('15m') // Token expires in 15 minutes
    .sign(new TextEncoder().encode(process.env.AUTH_SECRET))

  return token
}

export async function verifyAuth(token: string): Promise<boolean> {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET)
    )
    return true
  } catch {
    return false
  }
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  const windowStart = Date.now() - RATE_LIMIT_WINDOW;
  
  const attempts = await db
    .select()
    .from(loginAttempts)
    .where(
      and(
        eq(loginAttempts.ip, ip),
        gte(loginAttempts.timestamp, new Date(windowStart) ),
        eq(loginAttempts.success, 0)
      )
    );

  return attempts.length >= MAX_ATTEMPTS;
}

export async function recordLoginAttempt(
  ip: string, 
  userAgent: string | null, 
  success: boolean
) {
  await db.insert(loginAttempts).values({
    ip,
    userAgent,
    timestamp: new Date(),
    success: success ? 1 : 0,
  });
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const validUsername = process.env.ADMIN_USERNAME;
  const storedHash = process.env.ADMIN_PASSWORD;

  if (username !== validUsername) return false;
  
  const hashedPassword = await sha256(password);
  return hashedPassword === storedHash;
} 