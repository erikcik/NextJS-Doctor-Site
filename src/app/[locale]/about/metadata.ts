import { Metadata } from "next";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: locale === 'tr' ? 'Hakkımda | Dr. Cüneyt Tamam' : 'About | Dr. Cüneyt Tamam',
    description: locale === 'tr'
      ? 'Ortopedi ve Travmatoloji Uzmanı Dr. Cüneyt Tamam\'ın profesyonel özgeçmişi ve uzmanlık alanları.'
      : 'Professional background and expertise of Dr. Cüneyt Tamam, Orthopedics and Traumatology Specialist.',
    alternates: {
      canonical: '/about',
      languages: {
        'tr': '/tr/about',
        'en': '/en/about',
      },
    }
  };
}; 