import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@uploadthing/react/styles.css";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://drcuneyttamam.com'),
  title: {
    default: 'Dr. Cüneyt Tamam - Orthopedics & Traumatology Specialist',
    template: '%s | Dr. Cüneyt Tamam'
  },
  description: 'Expert orthopedics and traumatology specialist in Turkey. Providing advanced treatments in orthopedic surgery and complementary medicine.',
  keywords: ['orthopedics', 'traumatology', 'complementary medicine', 'Turkey', 'orthopedic surgery'],
  authors: [{ name: 'Dr. Cüneyt Tamam' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName: 'Dr. Cüneyt Tamam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
