import { db } from "~/server/db";
import { blogEntries } from "~/server/db/schema";
import { eq, ne, desc, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LocalizedTitle } from "~/components/localized-title";
import MarkdownDisplay from "~/components/markdown-display";
import Image from "next/image";
import { Clock, Tag, User, ChevronRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function BlogPostPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('BlogPostPage');

  // Fetch the current blog post
  const [entry] = await db
    .select()
    .from(blogEntries)
    .where(eq(blogEntries.id, params.id));

  if (!entry) {
    notFound();
  }

  // Corrected query for related posts
  const relatedPosts = await db
    .select()
    .from(blogEntries)
    .where(
      and(
        eq(blogEntries.category, entry.category),
        ne(blogEntries.id, params.id)
      )
    )
    .orderBy(desc(blogEntries.createdAt))
    .limit(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header Section */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-md mb-8">
              {/* Title and Metadata Section - Moved above image */}
              <div className="relative p-8">
                <div className="relative mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    <LocalizedTitle
                      turkishTitle={entry.turkishTitle}
                      englishTitle={entry.englishTitle}
                    />
                  </h1>
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-600"/>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-gray-100 py-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{t('by')} {entry.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>{entry.minutesToRead} {t('minutesToRead')}</span>
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {entry.keywords.split(',').map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-transparent border-blue-600/20 text-blue-700"
                    >
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Hero Image - Adjusted aspect ratio */}
              <div className="relative aspect-[21/9] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"/>
                <Image
                  src={entry.coverImage}
                  alt={params.locale === 'tr' ? entry.turkishTitle : entry.englishTitle}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Category Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm"
                >
                  {entry.category}
                </Badge>
              </div>
            </div>

            {/* Main Content */}
            <div className={cn(
              "bg-white rounded-xl shadow-md p-8",
              "prose prose-lg max-w-none",
              "prose-headings:text-gray-900 prose-headings:font-bold",
              "prose-p:text-gray-700",
              "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700",
              "prose-strong:text-gray-900",
              "prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg",
              "prose-img:rounded-lg prose-img:shadow-md"
            )}>
              <MarkdownDisplay
                turkishContent={entry.turkishContent}
                englishContent={entry.englishContent}
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Related Posts Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 pb-2 border-b">
                  {t('relatedPosts')}
                </h2>
                <div className="space-y-6">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${params.locale}/blog/${post.id}`}
                      className="group block"
                    >
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.coverImage}
                            alt={params.locale === 'tr' ? post.turkishTitle : post.englishTitle}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        {/* Post Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                            <LocalizedTitle
                              turkishTitle={post.turkishTitle}
                              englishTitle={post.englishTitle}
                            />
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{post.minutesToRead} {t('minutesToRead')}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/50 transition-colors group-hover:text-blue-600" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{t('category')}</h2>
                <Badge variant="secondary" className="text-sm">
                  {entry.category}
                </Badge>
              </div>

              {/* Share Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{t('share')}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('copyLink')}
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 