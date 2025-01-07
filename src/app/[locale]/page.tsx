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
  complementaryEntries,
  orthopedicsEntries,
  announcementEntries,
} from "~/server/db/schema";
import { desc } from "drizzle-orm";

import MarkdownDisplay from "~/components/markdown-display";
import OrthopedicsShow from "~/components/orthopedics-show";
import { LocalizedTitle } from "~/components/localized-title";
import ComplementaryShow from "~/components/complementary-show";
import { formatDate } from "~/lib/utils";

export default async function Home() {
  const allBlogEntries = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt));

  const allComplementaryEntries = await db
    .select()
    .from(complementaryEntries)
    .orderBy(desc(complementaryEntries.createdAt));

  const allOrthopedicsEntries = await db
    .select()
    .from(orthopedicsEntries)
    .orderBy(desc(orthopedicsEntries.createdAt));

  const allAnnouncementEntries = await db
    .select()
    .from(announcementEntries)
    .orderBy(desc(announcementEntries.createdAt));

  return (
    <>
      <div className="min-h-screen">
        <CarouselComponent />
        
        <main>
          <AboutSection />

          {/* Orthopedics Section */}
          <OrthopedicsShow entries={allOrthopedicsEntries} />

          {/* Complementary Medicine Section */}
          <ComplementaryShow entries={allComplementaryEntries} />

          <TestimonialsAnnouncements />ok
          <section className="mx-auto mt-12 w-full bg-[#47afe2] bg-opacity-50 px-4 py-8 lg:px-48">
            <h2 className="mb-8 font-display text-3xl font-bold">
              Announcements
            </h2>
            <div className="grid gap-6">
              {allAnnouncementEntries.slice(0, 3).map((announcement) => (
                <Card key={announcement.id} className="max-w-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600">
                      <LocalizedTitle
                        turkishTitle={announcement.turkishTitle}
                        englishTitle={announcement.englishTitle}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="prose prose-slate max-w-none">
                        <MarkdownDisplay
                          turkishContent={announcement.turkishContent}
                          englishContent={announcement.englishContent}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(announcement.createdAt)}
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/announcements/${announcement.id}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <BlogSection entries={allBlogEntries} />
        </main>
      </div>
    </>
  );
}
