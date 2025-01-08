import { db } from "~/server/db";
import { blogEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { LocalizedTitle } from "~/components/localized-title";
import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, ChevronRight, User } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { cn } from "~/lib/utils";

export default async function BlogPage({ params: { locale } }: { params: { locale: 'tr' | 'en' } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('BlogPage');

  const entries = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            {t('title')}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((blog, index) => (
            <Link 
              key={blog.id} 
              href={`/${locale}/blog/${blog.id}`}
              className={cn(
                "group relative bg-white rounded-xl overflow-hidden",
                "transform-gpu transition-all duration-300 hover:-translate-y-1",
                "before:absolute before:inset-0 before:z-10 before:border before:border-black/5 before:rounded-xl",
                "after:absolute after:inset-0 after:z-0 after:translate-x-1 after:translate-y-1 after:bg-gradient-to-br after:from-blue-600/10 after:to-transparent after:rounded-xl",
                "shadow-sm hover:shadow-xl"
              )}
            >
              <article className="relative z-20">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"/>
                  <Image
                    src={blog.coverImage}
                    alt={locale === 'tr' ? blog.turkishTitle : blog.englishTitle}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge - Positioned over image */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm"
                  >
                    {blog.category}
                  </Badge>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <div className="relative mb-4">
                    <h2 className="text-xl font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      <LocalizedTitle
                        turkishTitle={blog.turkishTitle}
                        englishTitle={blog.englishTitle}
                      />
                    </h2>
                    <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-blue-600 transform origin-bottom transition-transform duration-300 group-hover:scale-y-110"/>
                  </div>

                  {/* Author and Reading Time */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{blog.minutesToRead} {t('minutesToRead')}</span>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.keywords.split(',').slice(0, 3).map((keyword, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs bg-transparent border-blue-600/20 text-blue-700"
                      >
                        {keyword.trim()}
                      </Badge>
                    ))}
                    {blog.keywords.split(',').length > 3 && (
                      <span className="text-xs text-muted-foreground">+{blog.keywords.split(',').length - 3} more</span>
                    )}
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center justify-end text-sm text-blue-600 font-medium group/link">
                    <span className="mr-2 group-hover/link:mr-3 transition-all">
                      {t('readMore')}
                    </span>
                    <ChevronRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {entries.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-white rounded-xl shadow-md">
              <Tag className="h-12 w-12 text-blue-600/50 mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                No blog posts available yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
