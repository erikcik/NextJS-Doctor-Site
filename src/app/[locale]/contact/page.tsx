"use client";
import { useTranslations } from 'next-intl'
import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { GoogleMap } from "@/components/google-map"
import { Toaster } from "~/components/ui/toaster"

export default function ContactPage() {
  const t = useTranslations()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Dr. Cüneyt Tamam",
            "@id": "https://drcuneyttamam.com",
            "url": "https://drcuneyttamam.com",
            "telephone": "+90 324 XXX XX XX", // Add your actual phone number
            "email": "contact@drcuneyttamam.com", // Add your actual email
            "description": "Orthopedics and Traumatology Specialist",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Your Street Address", // Add your actual address
              "addressLocality": "Mersin",
              "addressRegion": "Mersin",
              "postalCode": "33000", // Add your actual postal code
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.XXXXXX", // Add your actual coordinates
              "longitude": "34.XXXXXX"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
              }
            ],
            "medicalSpecialty": [
              "Orthopedics",
              "Traumatology",
              "Complementary Medicine"
            ],
            "availableService": [
              {
                "@type": "MedicalProcedure",
                "name": "Orthopedic Surgery"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Complementary Medicine Treatments"
              }
            ]
          })
        }}
      />

      <div className="min-h-screen">
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#47afe2] mb-4 font-display">
              {t('ContactPage.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              {t('ContactPage.subtitle')}
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg border border-[#47afe2]/10 mb-8">
            <GoogleMap />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </main>

        <Toaster />
      </div>
    </>
  )
}
