import { SiteHeader } from "@/components/site-header";
import { Navigation } from "@/components/navigation";
import { TreatmentCard } from "@/components/treatment-card";
import Footer from "~/components/footer";
import { db } from "~/server/db";
import { orthopedicsEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { LocalizedTitle } from "~/components/localized-title";
import { getExcerpt } from "~/utils/getExcerpt";

export default async function OrthopedicsPage() {
  // Fetch all orthopedics entries
  const entries = await db
    .select()
    .from(orthopedicsEntries)
    .orderBy(desc(orthopedicsEntries.createdAt));

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Orthopedics Treatments
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry) => (
            <TreatmentCard
              key={entry.id}
              title={
                <LocalizedTitle
                  turkishTitle={entry.turkishTitle}
                  englishTitle={entry.englishTitle}
                />
              }
              description={getExcerpt(entry.turkishContent, entry.englishContent)}
              imageSrc={entry.coverImage}
              author={entry.author}
              learnMoreHref={`/orthopedics/${entry.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
