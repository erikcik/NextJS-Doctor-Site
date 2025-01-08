import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string; id?: string } 
}): Promise<Metadata> {
  const locale = await params.locale;
  const id = params.id ? await params.id : undefined;

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
} 