import { Metadata } from "next";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: locale === 'tr' ? 'İletişim | Dr. Cüneyt Tamam' : 'Contact | Dr. Cüneyt Tamam',
    description: locale === 'tr'
      ? 'Dr. Cüneyt Tamam ile iletişime geçin. Mersin\'de ortopedi ve travmatoloji uzmanı muayenehanesi.'
      : 'Contact Dr. Cüneyt Tamam. Orthopedics and traumatology specialist practice in Mersin, Turkey.',
    alternates: {
      canonical: '/contact',
      languages: {
        'tr': '/tr/contact',
        'en': '/en/contact',
      },
    },
    openGraph: {
      title: locale === 'tr' ? 'İletişim' : 'Contact',
      description: locale === 'tr'
        ? 'Dr. Cüneyt Tamam muayenehanesi iletişim bilgileri ve konum'
        : 'Contact information and location for Dr. Cüneyt Tamam\'s practice',
      type: 'website',
      url: 'https://drcuneyttamam.com/contact',
      images: [
        {
          url: '/office-location.jpg', // Add an image of your office or building
          width: 1200,
          height: 630,
          alt: 'Office Location'
        }
      ],
    }
  };
}; 