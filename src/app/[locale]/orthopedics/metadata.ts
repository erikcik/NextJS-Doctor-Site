import { Metadata } from "next";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: locale === 'tr' ? 'Ortopedi Tedavileri | Dr. Cüneyt Tamam' : 'Orthopedic Treatments | Dr. Cüneyt Tamam',
    description: locale === 'tr'
      ? 'Ortopedik cerrahi ve tedavi seçenekleri. Eklem replasmanı, artroskopi, spor yaralanmaları ve daha fazlası hakkında bilgi edinin.'
      : 'Explore orthopedic surgical and treatment options. Learn about joint replacement, arthroscopy, sports injuries, and more.',
    alternates: {
      canonical: '/orthopedics',
      languages: {
        'tr': '/tr/orthopedics',
        'en': '/en/orthopedics',
      },
    },
    openGraph: {
      title: locale === 'tr' ? 'Ortopedi Tedavileri' : 'Orthopedic Treatments',
      description: locale === 'tr'
        ? 'Kapsamlı ortopedik tedavi seçenekleri ve cerrahi prosedürler'
        : 'Comprehensive orthopedic treatment options and surgical procedures',
      type: 'website',
      url: 'https://drcuneyttamam.com/orthopedics',
    }
  };
}; 