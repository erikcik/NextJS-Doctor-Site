import { Metadata } from "next";
import { db } from "~/server/db";
import { blogEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  // Fetch latest blog entry for dynamic description
  const [latestEntry] = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt))
    .limit(1);

  return {
    title: locale === 'tr' ? 'Blog | Dr. Cüneyt Tamam' : 'Medical Blog | Dr. Cüneyt Tamam',
    description: locale === 'tr'
      ? 'Ortopedi, travmatoloji ve tamamlayıcı tıp alanlarında güncel araştırmalar, tedavi yöntemleri ve uzman görüşleri.'
      : 'Latest research, treatment methods, and expert insights in orthopedics, traumatology, and complementary medicine.',
    alternates: {
      canonical: '/blog',
      languages: {
        'tr': '/tr/blog',
        'en': '/en/blog',
      },
    },
    openGraph: {
      title: locale === 'tr' ? 'Tıbbi Blog Yazıları' : 'Medical Blog Posts',
      description: locale === 'tr'
        ? 'Ortopedi ve tamamlayıcı tıp alanında güncel bilgiler ve araştırmalar'
        : 'Latest updates and research in orthopedics and complementary medicine',
      type: 'website',
      url: 'https://drcuneyttamam.com/blog',
      images: [
        {
          url: latestEntry?.coverImage || '/og-blog.jpg',
          width: 1200,
          height: 630,
          alt: 'Medical Blog'
        }
      ],
    }
  };
}; 