import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["DONT-TOUCH-doctor-site_*"],
} satisfies Config; 
