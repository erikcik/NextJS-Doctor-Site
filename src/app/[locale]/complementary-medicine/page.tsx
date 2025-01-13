import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { TreatmentCard } from "@/components/treatment-card"
import Footer from "~/components/footer";
import { db } from "~/server/db";
import { complementaryEntries } from "~/server/db/schema";
import { desc, inArray } from "drizzle-orm";
import { LocalizedTitle } from "~/components/localized-title";
import { getExcerpt } from "~/utils/getExcerpt";

export default async function ComplementaryMedicinePage() {
  // Specific IDs we want to show
  const specificIds = [
    '737a2b2d-fd2c-4fd1-98ec-6921ea3901ea',
    'da0108b9-c8b6-4662-abdc-c0d30c858af9'
  ];

  // Fetch only the specific complementary medicine entries
  const entries = await db
    .select()
    .from(complementaryEntries)
    .where(inArray(complementaryEntries.id, specificIds))
    .orderBy(desc(complementaryEntries.createdAt));

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          <LocalizedTitle
            turkishTitle="Tamamlayıcı Tıp Tedavileri"
            englishTitle="Complementary Medicine Treatments"
          />
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
              learnMoreHref={`/complementary-medicine/${entry.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

