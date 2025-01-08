import { Metadata } from "next";
import { db } from "~/server/db";
import { orthopedicsEntries } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function generateMetadata({ 
  params: { locale, id } 
}: { 
  params: { locale: string; id: string } 
}): Promise<Metadata> {
  // Fetch the entry
  const [entry] = await db
    .select()
    .from(orthopedicsEntries)
    .where(eq(orthopedicsEntries.id, id));

  if (!entry) {
    return {
      title: 'Not Found',
      description: 'The requested treatment could not be found'
    };
  }

  const title = locale === 'tr' ? entry.turkishTitle : entry.englishTitle;
  const content = locale === 'tr' ? entry.turkishContent : entry.englishContent;
  const description = content.substring(0, 155) + '...';

  return {
    title: `${title} | Dr. Cüneyt Tamam`,
    description: description,
    alternates: {
      canonical: `/orthopedics/${id}`,
      languages: {
        'tr': `/tr/orthopedics/${id}`,
        'en': `/en/orthopedics/${id}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: `https://drcuneyttamam.com/orthopedics/${id}`,
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