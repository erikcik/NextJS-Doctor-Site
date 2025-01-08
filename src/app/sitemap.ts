import { MetadataRoute } from 'next'
import { db } from "~/server/db"
import { blogEntries, orthopedicsEntries, complementaryEntries, announcementEntries } from "~/server/db/schema"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic entries
  const blogs = await db.select().from(blogEntries)
  const orthopedics = await db.select().from(orthopedicsEntries)
  const complementary = await db.select().from(complementaryEntries)
  const announcements = await db.select().from(announcementEntries)

  // Static routes
  const staticRoutes = [
    {
      url: 'https://drcuneyttamam.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://drcuneyttamam.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://drcuneyttamam.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add other static routes
  ]

  // Dynamic routes
  const blogRoutes = blogs.map((blog) => ({
    url: `https://drcuneyttamam.com/blog/${blog.id}`,
    lastModified: blog.updatedAt || blog.createdAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const orthopedicsRoutes = orthopedics.map((entry) => ({
    url: `https://drcuneyttamam.com/orthopedics/${entry.id}`,
    lastModified: entry.updatedAt || entry.createdAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const complementaryRoutes = complementary.map((entry) => ({
    url: `https://drcuneyttamam.com/complementary-medicine/${entry.id}`,
    lastModified: entry.updatedAt || entry.createdAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const announcementRoutes = announcements.map((announcement) => ({
    url: `https://drcuneyttamam.com/announcements/${announcement.id}`,
    lastModified: announcement.updatedAt || announcement.createdAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...orthopedicsRoutes,
    ...complementaryRoutes,
    ...announcementRoutes,
  ]
} 