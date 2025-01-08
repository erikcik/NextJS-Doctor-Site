import { db } from "~/server/db";
import { blogEntries } from "~/server/db/schema";
import { eq, ne, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LocalizedTitle } from "~/components/localized-title";
import MarkdownDisplay from "~/components/markdown-display";
import { formatDate } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Book } from "lucide-react";
import { getExcerpt } from "~/utils/getExcerpt";

export default async function BlogEntryPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  // Fetch the current entry
  const [entry] = await db
    .select()
    .from(blogEntries)
    .where(eq(blogEntries.id, params.id));

  if (!entry) {
    notFound();
  }

  // Fetch other entries for the sidebar (excluding current entry)
  const relatedEntries = await db
    .select()
    .from(blogEntries)
    .where(ne(blogEntries.id, params.id))
    .orderBy(desc(blogEntries.createdAt))
    .limit(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
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
            "articleBody": params.locale === 'tr' ? entry.turkishContent : entry.englishContent,
            "wordCount": entry.minutesToRead! * 200, // Approximate words based on reading time
            "timeRequired": `PT${entry.minutesToRead}M`,
            ...(entry.linkToBook && {
              "isBasedOn": {
                "@type": "Book",
                "url": entry.linkToBook
              }
            })
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="">
          {/* Hero Header Section */}
          <div className="mb-12 grid grid-cols-1 gap-8 border-b pb-8 md:grid-cols-2 md:items-center">
            {/* Text Content */}
            <div className="order-2 text-center md:order-1 md:text-left">
              <div className="mb-4 text-sm font-medium text-blue-600">Blog Post</div>
              <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                <LocalizedTitle
                  turkishTitle={entry.turkishTitle}
                  englishTitle={entry.englishTitle}
                />
              </h1>
              
              {/* Metadata row */}
              <div className="flex flex-col items-center gap-4 md:items-start">
                {/* Author info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(entry.author)}`} 
                      alt={entry.author} 
                    />
                    <AvatarFallback>
                      {entry.author.split(" ").map(word => word[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-foreground">{entry.author}</span>
                    <time className="text-sm text-muted-foreground">{formatDate(entry.createdAt)}</time>
                  </div>
                </div>

                {/* Reading info */}
                <div className="flex items-center divide-x divide-gray-200">
                  {entry.minutesToRead && (
                    <div className="flex items-center gap-2 pr-4">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{entry.minutesToRead} min read</span>
                    </div>
                  )}
                  {entry.linkToBook && (
                    <a
                      href={entry.linkToBook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 pl-4 text-blue-600 hover:text-blue-700"
                    >
                      <Book className="h-4 w-4" />
                      <span className="text-sm">View Book</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={entry.coverImage}
                  alt={entry.turkishTitle}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Main Content and Sidebar */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-slate max-w-none">
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
                    Related Articles
                  </h2>
                  <div className="space-y-4">
                    {relatedEntries.map((relatedEntry) => (
                      <Link
                        key={relatedEntry.id}
                        href={`/blog/${relatedEntry.id}`}
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
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{relatedEntry.author}</span>
                              {relatedEntry.minutesToRead && (
                                <>
                                  <span>•</span>
                                  <span>{relatedEntry.minutesToRead} min read</span>
                                </>
                              )}
                            </div>
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
      </div>
    </>
  );
} 