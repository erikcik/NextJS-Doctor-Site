import { motion } from "framer-motion";
import { AboutSection } from "@/components/about-section";
import { TreatmentCard } from "@/components/treatment-card";
import { TestimonialsAnnouncements } from "@/components/testimonials-announcements";
import { BlogSection } from "@/components/blog-section";
import { CarouselComponent } from "~/components/carousel";
import { Link } from "~/i18n/routing";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { db } from "~/server/db";
import {
  blogEntries,
  // complementaryEntries,  // Commented out
  orthopedicsEntries,
  announcementEntries,
  videoEntries,
  bookEntries,
} from "~/server/db/schema";
import { desc } from "drizzle-orm";

import MarkdownDisplay from "~/components/markdown-display";
import OrthopedicsShow from "~/components/orthopedics-show";
import { LocalizedTitle } from "~/components/localized-title";
// import ComplementaryShow from "~/components/complementary-show";  // Commented out
import { formatDate } from "~/lib/utils";
import { Play, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BackgroundGradientAnimation } from "~/components/ui/background-gradient-animation";
import { BookSection } from "~/components/book-section";

export default async function Home({ params }: { params: { locale: string } }) {
  const allBlogEntries = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt));

  // Commented out complementary entries fetch
  // const allComplementaryEntries = await db
  //   .select()
  //   .from(complementaryEntries)
  //   .orderBy(desc(complementaryEntries.createdAt));

  const allOrthopedicsEntries = await db
    .select()
    .from(orthopedicsEntries)
    .orderBy(desc(orthopedicsEntries.createdAt));

  const allAnnouncementEntries = await db
    .select()
    .from(announcementEntries)
    .orderBy(desc(announcementEntries.createdAt));

  const allVideoEntries = await db
    .select()
    .from(videoEntries)
    .orderBy(desc(videoEntries.createdAt));

  const allBookEntries = await db
    .select()
    .from(bookEntries)
    .orderBy(desc(bookEntries.createdAt));

  const t = await getTranslations("VideoReels");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: "Dr. Cüneyt Tamam",
            "@id": "https://drcuneyttamam.com/#physician",
            url: "https://drcuneyttamam.com",
            image: "https://drcuneyttamam.com/doctor-image.jpg",
            medicalSpecialty: [
              "Orthopedics",
              "Traumatology",
              // "Complementary Medicine",  // Commented out
            ],
            availableService: [
              {
                "@type": "MedicalProcedure",
                name: "Joint Replacement Surgery",
              },
              // Commented out complementary medicine services
              // {
              //   "@type": "MedicalTherapy",
              //   name: "Acupuncture",
              // },
              // {
              //   "@type": "MedicalTherapy",
              //   name: "Prolotherapy",
              // },
            ],
            memberOf: [
              {
                "@type": "Organization",
                name: "Turkish Medical Association",
              },
            ],
            workLocation: {
              "@type": "MedicalClinic",
              name: "Dr. Cüneyt Tamam Medical Practice",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "Mersin",
                addressRegion: "Mersin",
                postalCode: "33000",
                addressCountry: "TR",
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Medical Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "MedicalProcedure",
                    name: "Orthopedic Surgery",
                    description: "Comprehensive orthopedic surgical procedures",
                  },
                },
                // Commented out complementary medicine offer
                // {
                //   "@type": "Offer",
                //   itemOffered: {
                //     "@type": "MedicalTherapy",
                //     name: "Complementary Medicine",
                //     description:
                //       "Alternative and complementary medical treatments",
                //   },
                // },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen">
        <CarouselComponent />

        <main>
          <AboutSection />

          {/* Orthopedics Section */}
          <OrthopedicsShow entries={allOrthopedicsEntries} />

          {/* Complementary Medicine Section - Commented out */}
          {/* <ComplementaryShow entries={allComplementaryEntries} /> */}

          <section className=" my-32 mb-16 py-16">
            <div className="container mx-auto px-4">
              {/* Section Header */}
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl">
                  {t("title")}
                  <div className="mx-auto mt-2 h-1 w-24 bg-blue-600" />
                </h2>
                <p className="mx-auto max-w-2xl text-gray-400">
                  {t("subtitle")}
                </p>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {allVideoEntries.map((video) => (
                  <div
                    key={video.id}
                    className="group relative overflow-hidden rounded-xl bg-gray-800"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[9/16] w-full">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.turkishTitle}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                        <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-blue-600/90 transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        <LocalizedTitle
                          turkishTitle={video.turkishTitle}
                          englishTitle={video.englishTitle}
                        />
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-300">
                        {params.locale === "tr"
                          ? video.turkishDescription
                          : video.englishDescription}
                      </p>
                    </div>

                    {/* Clickable Link */}
                    <Link
                      href={video.videoUrl}
                      className="absolute inset-0 z-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Watch video</span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {allVideoEntries.length > 6 && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    className="border-white bg-transparent text-white hover:bg-white hover:text-black"
                    asChild
                  >
                    <Link href="/videos" className="flex items-center gap-2">
                      {t("viewAll")}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Book Section */}
          <BlogSection entries={allBlogEntries} />
          <BookSection entries={allBookEntries} />

          {/* Video Reels Section */}
        </main>
      </div>
    </>
  );
}
