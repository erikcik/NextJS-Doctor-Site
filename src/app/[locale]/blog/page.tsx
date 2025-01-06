import { SiteHeader } from "@/components/site-header";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogPost } from "~/components/blog-post";
import Footer from "~/components/footer";

export default function BlogPage() {
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
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <BlogPost
            featured
            title="Basic Acupuncture Points"
            description="A comprehensive guide to understanding the fundamental acupuncture points and their significance in traditional medicine. Learn about the most important points and their therapeutic applications."
            image="/placeholder.svg?height=400&width=600"
            category="Complementary Medicine"
            date="January 2, 2025"
            readTime="8 min read"
            href="/blog/basic-acupuncture-points"
          />
          <BlogPost
            featured
            title="Psychoneuro Immunology"
            description="Explore the fascinating intersection of psychology, neurology, and immunology. Discover how mental states influence physical health and immune system function."
            image="/placeholder.svg?height=400&width=600"
            category="Research"
            date="January 1, 2025"
            readTime="10 min read"
            href="/blog/psychoneuro-immunology"
          />
        </div>

        {/* Recent Posts */}
        <div className="mb-12">
          <h2 className="font-display mb-8 text-2xl font-semibold text-[#47afe2]">
            Recent Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogPost
              title="Advances in Arthroscopic Surgery"
              description="Latest developments in minimally invasive surgical techniques for joint conditions."
              image="/placeholder.svg?height=300&width=400"
              category="Orthopedics"
              date="December 30, 2024"
              readTime="6 min read"
              href="/blog/advances-arthroscopic-surgery"
            />
            <BlogPost
              title="Stem Cell Therapy in Orthopedics"
              description="Understanding the role of stem cells in regenerative medicine and orthopedic treatments."
              image="/placeholder.svg?height=300&width=400"
              category="Research"
              date="December 28, 2024"
              readTime="7 min read"
              href="/blog/stem-cell-therapy"
            />
            <BlogPost
              title="Neural Therapy Fundamentals"
              description="An introduction to neural therapy and its applications in pain management."
              image="/placeholder.svg?height=300&width=400"
              category="Complementary Medicine"
              date="December 25, 2024"
              readTime="5 min read"
              href="/blog/neural-therapy-fundamentals"
            />
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
