import { Metadata } from "next";
import { db } from "~/server/db";
import { blogEntries, announcementEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  // Fetch latest blog and announcement for dynamic meta description
  const [latestBlog] = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt))
    .limit(1);

  const [latestAnnouncement] = await db
    .select()
    .from(announcementEntries)
    .orderBy(desc(announcementEntries.createdAt))
    .limit(1);

  return {
    metadataBase: new URL('https://drcuneyttamam.com'),
    title: locale === 'tr' 
      ? 'Dr. Cüneyt Tamam | Ortopedi ve Travmatoloji Uzmanı' 
      : 'Dr. Cüneyt Tamam | Orthopedics & Traumatology Specialist',
    description: locale === 'tr'
      ? 'Ortopedi, travmatoloji ve tamamlayıcı tıp alanında uzman hekim. Modern ve geleneksel tedavi yöntemleriyle hastalarına özel çözümler sunar.'
      : 'Expert physician in orthopedics, traumatology, and complementary medicine. Offering personalized solutions with modern and traditional treatment methods.',
    keywords: [
      'orthopedics',
      'traumatology',
      'complementary medicine',
      'Dr. Cüneyt Tamam',
      'Mersin',
      'Turkey',
      'joint replacement',
      'sports medicine',
      'acupuncture'
    ],
    alternates: {
      canonical: '/',
      languages: {
        'tr': '/tr',
        'en': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: 'https://drcuneyttamam.com',
      title: 'Dr. Cüneyt Tamam',
      description: locale === 'tr'
        ? 'Ortopedi, Travmatoloji ve Tamamlayıcı Tıp Uzmanı'
        : 'Specialist in Orthopedics, Traumatology, and Complementary Medicine',
      siteName: 'Dr. Cüneyt Tamam',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Dr. Cüneyt Tamam'
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dr. Cüneyt Tamam',
      description: locale === 'tr'
        ? 'Ortopedi ve Tamamlayıcı Tıp Uzmanı'
        : 'Orthopedics and Complementary Medicine Specialist',
      images: ['/twitter-image.jpg'],
    },
    verification: {
      google: 'your-google-verification-code',
    }
  };
}; 