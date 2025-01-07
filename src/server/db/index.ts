import { drizzle } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import postgres from 'postgres';
import * as schema from './schema';

// PostgreSQL configuration
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema: schema });

