// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `DONT-TOUCH-doctor-site_${name}`);

// Base tables
export const users = createTable('users', {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

export const loginAttempts = createTable("login_attempts", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  ip: text("ip").notNull(),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  success: integer("success").notNull(), // 0 or 1
});

// Book entries (formerly blog entries)
export const bookEntries = createTable("book_entries", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  turkishTitle: text("turkish_title").notNull(),
  englishTitle: text("english_title").notNull(),
  author: text("author").notNull(),
  coverImage: text("cover_image").notNull(),
  linkToBook: text("link_to_book").notNull(),
  minutesToRead: integer("minutes_to_read").notNull(),
  turkishContent: text("turkish_content").notNull(),
  englishContent: text("english_content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

// Blog entries (formerly announcement entries)
export const blogEntries = createTable("blog_entries", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  turkishTitle: text("turkish_title").notNull(),
  englishTitle: text("english_title").notNull(),
  author: text("author").notNull(),
  coverImage: text("cover_image").notNull(),
  category: text("category").notNull(),
  keywords: text("keywords").notNull(),
  minutesToRead: integer("minutes_to_read").notNull(),
  turkishContent: text("turkish_content").notNull(),
  englishContent: text("english_content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

// Complementary Medicine entries
export const complementaryEntries = createTable("complementary_entries", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  turkishTitle: text("turkish_title").notNull(),
  englishTitle: text("english_title").notNull(),
  author: text("author").notNull(),
  coverImage: text("cover_image").notNull(),
  turkishContent: text("turkish_content").notNull(),
  englishContent: text("english_content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

// Orthopedics entries
export const orthopedicsEntries = createTable("orthopedics_entries", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  turkishTitle: text("turkish_title").notNull(),
  englishTitle: text("english_title").notNull(),
  author: text("author").notNull(),
  coverImage: text("cover_image").notNull(),
  turkishContent: text("turkish_content").notNull(),
  englishContent: text("english_content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

// Announcement entries
export const announcementEntries = createTable("announcement_entries", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  turkishTitle: text("turkish_title").notNull(),
  englishTitle: text("english_title").notNull(),
  turkishContent: text("turkish_content").notNull(),
  englishContent: text("english_content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

export const videoEntries = createTable("video_entries", {
  id: uuid("id").primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
  turkishTitle: text("turkish_title").notNull(),
  englishTitle: text("english_title").notNull(),
  turkishDescription: text("turkish_description").notNull(),
  englishDescription: text("english_description").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
});

