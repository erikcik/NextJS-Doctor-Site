import { Metadata } from "next";
import { db } from "~/server/db";
import { blogEntries } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { getExcerpt } from "~/utils/getExcerpt";

export async function generateMetadata({ 
  params: { locale, id } 
}: { 
  params: { locale: string; id: string } 
}): Promise<Metadata> {
  // Fetch the entry
  const [entry] = await db
    .select()
    .from(blogEntries)
    .where(eq(blogEntries.id, id));

  if (!entry) {
    return {
      title: 'Not Found',
      description: 'The requested blog post could not be found'
    };
  }

  const title = locale === 'tr' ? entry.turkishTitle : entry.englishTitle;
  const excerpt = getExcerpt(entry.turkishContent, entry.englishContent);
  const description = excerpt[locale as 'tr' | 'en'].substring(0, 155) + '...';

  return {
    title: `${title} | Dr. Cüneyt Tamam Blog`,
    description: description,
    alternates: {
      canonical: `/blog/${id}`,
      languages: {
        'tr': `/tr/blog/${id}`,
        'en': `/en/blog/${id}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: `https://drcuneyttamam.com/blog/${id}`,
      images: [
        {
          url: entry.coverImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      authors: [entry.author],
      publishedTime: entry.createdAt.toISOString(),
      modifiedTime: entry.updatedAt?.toISOString(),
    }
  };
} 