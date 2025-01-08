import { SiteHeader } from "@/components/site-header";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogPost } from "~/components/blog-post";
import Footer from "~/components/footer";
import { db } from "~/server/db";
import { blogEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { getExcerpt } from "~/utils/getExcerpt";
import { formatDate } from "~/lib/utils";
import { LocalizedTitle } from "~/components/localized-title";
import { Metadata } from "next";

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: locale === 'tr' ? 'Blog Yazıları | Ortopedi ve Travmatoloji' : 'Blog Posts | Orthopedics & Traumatology',
    description: locale === 'tr' 
      ? 'Ortopedi, travmatoloji ve tamamlayıcı tıp alanlarında en son araştırmalar ve bilgiler.'
      : 'Latest research and insights in orthopedics, traumatology, and complementary medicine.',
    alternates: {
      canonical: '/blog',
      languages: {
        'tr': '/tr/blog',
        'en': '/en/blog',
      },
    },
    openGraph: {
      title: locale === 'tr' ? 'Blog Yazıları' : 'Blog Posts',
      description: locale === 'tr' 
        ? 'Ortopedi ve tamamlayıcı tıp hakkında güncel bilgiler'
        : 'Latest updates on orthopedics and complementary medicine',
      images: [
        {
          url: '/og-blog.jpg',
          width: 1200,
          height: 630,
          alt: 'Blog Posts'
        }
      ],
    }
  };
};

export default async function BlogPage() {
  // Fetch all blog entries
  const entries = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt));

  // Split entries into featured and recent
  const featuredEntries = entries.slice(0, 2);
  const recentEntries = entries.slice(2, 5);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="font-display mb-4 text-4xl font-bold text-[#47afe2]">
            Medical Blog
          </h1>
          <p className="font-body mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore the latest research and insights in orthopedics,
            traumatology, and complementary medicine
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mx-auto mb-12 max-w-xl">
          <div className="relative">
            <Input
              placeholder="Search articles..."
              className="border-[#47afe2]/20 pl-10 focus:border-[#47afe2] focus:ring-[#47afe2]"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredEntries.map((entry) => (
            <BlogPost
              key={entry.id}
              featured
              title={
                <LocalizedTitle
                  turkishTitle={entry.turkishTitle}
                  englishTitle={entry.englishTitle}
                />
              }
              description={getExcerpt(entry.turkishContent, entry.englishContent)}
              image={entry.coverImage}
              category="Blog"
              date={formatDate(entry.createdAt)}
              readTime={`${entry.minutesToRead} min read`}
              href={`/blog/${entry.id}`}
              author={entry.author}
              linkToBook={entry.linkToBook}
            />
          ))}
        </div>

        {/* Recent Posts */}
        <div className="mb-12">
          <h2 className="font-display mb-8 text-2xl font-semibold text-[#47afe2]">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentEntries.map((entry) => (
              <BlogPost
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
                date={formatDate(entry.createdAt)}
                readTime={`${entry.minutesToRead} min read`}
                href={`/blog/${entry.id}`}
                author={entry.author}
                linkToBook={entry.linkToBook}
              />
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-[#47afe2] text-[#47afe2] hover:bg-[#47afe2] hover:text-white"
          >
            Load More Articles
          </Button>
        </div>
      </main>
    </div>
  );
}
