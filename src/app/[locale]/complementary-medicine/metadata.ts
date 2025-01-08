import { Metadata } from "next";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: locale === 'tr' ? 'Tamamlayıcı Tıp Tedavileri | Dr. Cüneyt Tamam' : 'Complementary Medicine | Dr. Cüneyt Tamam',
    description: locale === 'tr'
      ? 'Akupunktur, ozon terapi, proloterapi ve diğer tamamlayıcı tıp tedavileri hakkında detaylı bilgi edinin.'
      : 'Learn about acupuncture, ozone therapy, prolotherapy, and other complementary medicine treatments.',
    alternates: {
      canonical: '/complementary-medicine',
      languages: {
        'tr': '/tr/complementary-medicine',
        'en': '/en/complementary-medicine',
      },
    },
    openGraph: {
      title: locale === 'tr' ? 'Tamamlayıcı Tıp Tedavileri' : 'Complementary Medicine Treatments',
      description: locale === 'tr'
        ? 'Modern tıp ile geleneksel tedavi yöntemlerinin birleşimi'
        : 'Integration of modern medicine with traditional treatment methods',
      type: 'website',
      url: 'https://drcuneyttamam.com/complementary-medicine',
    }
  };
}; 