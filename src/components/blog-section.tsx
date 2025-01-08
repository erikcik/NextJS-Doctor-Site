'use client'

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getExcerpt } from "~/utils/getExcerpt";
import { LocalizedTitle } from "./localized-title";
import { HomeBlogPost } from "./home-blog-post";

interface BlogSectionProps {
  entries: {
    id: string;
    turkishTitle: string;
    englishTitle: string;
    turkishContent: string;
    englishContent: string;
    coverImage: string;
    author: string;
    minutesToRead: number | null;
    linkToBook?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}

export function BlogSection({ entries }: BlogSectionProps) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <section className="bg-gradient-to-br from-black to-blue-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-display text-white">
            {locale === 'tr' ? 'Blog' : 'Blog'}
          </h2>
          <Link href="/blog">
            <Button variant="outline" className="text-lg px-6 py-2 text-blue-900 border-white  hover:bg-white hover:text-blue-900 transition-colors">
              {locale === 'tr' ? 'Daha Fazla' : 'More'}
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.slice(0, 3).map((entry) => (
            <HomeBlogPost
              key={entry.id}
              title={
                <LocalizedTitle
                  turkishTitle={entry.turkishTitle}
                  englishTitle={entry.englishTitle}
                />
              }
              description={getExcerpt(entry.turkishContent, entry.englishContent)}
              image={entry.coverImage}
              category="Blog"
              date={entry.createdAt.toLocaleDateString()}
              readTime={`${entry.minutesToRead || 0} min`}
              href={`/blog/${entry.id}`}
              author={entry.author}
              linkToBook={entry.linkToBook}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

