import { db } from "~/server/db";
import { complementaryEntries } from "~/server/db/schema";
import { eq, ne, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LocalizedTitle } from "~/components/localized-title";
import MarkdownDisplay from "~/components/markdown-display";
import { formatDate } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getExcerpt } from "~/utils/getExcerpt";

export default async function ComplementaryEntryPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  // Fetch the current entry
  const [entry] = await db
    .select()
    .from(complementaryEntries)
    .where(eq(complementaryEntries.id, params.id));

  if (!entry) {
    notFound();
  }

  // Fetch other entries for the sidebar (excluding current entry)
  const relatedEntries = await db
    .select()
    .from(complementaryEntries)
    .where(ne(complementaryEntries.id, params.id))
    .orderBy(desc(complementaryEntries.createdAt))
    .limit(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "headline": params.locale === 'tr' ? entry.turkishTitle : entry.englishTitle,
            "image": entry.coverImage,
            "datePublished": entry.createdAt.toISOString(),
            "dateModified": entry.updatedAt?.toISOString(),
            "author": {
              "@type": "Person",
              "name": entry.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dr. Cüneyt Tamam",
              "logo": {
                "@type": "ImageObject",
                "url": "https://drcuneyttamam.com/logo.png"
              }
            },
            "description": getExcerpt(entry.turkishContent, entry.englishContent)[params.locale as 'tr' | 'en'],
            "specialty": "Complementary Medicine",
            "medicalAudience": "Patients",
            "mainContentOfPage": {
              "@type": "WebPageElement",
              "cssSelector": "article"
            }
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-slate max-w-none">
              {/* Header Section */}
              <div className="mb-8 border-b pb-6">
                <h1 className="mb-4 text-3xl font-bold">
                  <LocalizedTitle
                    turkishTitle={entry.turkishTitle}
                    englishTitle={entry.englishTitle}
                  />
                </h1>
                
                {/* Author and Date */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(entry.author)}`} 
                      alt={entry.author} 
                    />
                    <AvatarFallback>
                      {entry.author.split(" ").map(word => word[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{entry.author}</span>
                    <span>•</span>
                    <time>{formatDate(entry.createdAt)}</time>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-8">
                <MarkdownDisplay
                  turkishContent={entry.turkishContent}
                  englishContent={entry.englishContent}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="mb-4 text-lg font-semibold">
                  Related Treatments
                </h2>
                <div className="space-y-4">
                  {relatedEntries.map((relatedEntry) => (
                    <Link
                      key={relatedEntry.id}
                      href={`/complementary-medicine/${relatedEntry.id}`}
                      className="group block"
                    >
                      <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-slate-50">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={relatedEntry.coverImage}
                            alt={relatedEntry.turkishTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="line-clamp-2 font-medium group-hover:text-blue-600">
                            <LocalizedTitle
                              turkishTitle={relatedEntry.turkishTitle}
                              englishTitle={relatedEntry.englishTitle}
                            />
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {relatedEntry.author}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground/50 transition-colors group-hover:text-blue-600" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <h3 className="mb-2 font-medium">Cover Image</h3>
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={entry.coverImage}
                    alt={entry.turkishTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
} 