import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { BlogPost } from "~/components/blog-post"

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#47afe2] mb-4">
            Medical Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the latest research and insights in orthopedics, traumatology, and complementary medicine
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Input 
              placeholder="Search articles..." 
              className="pl-10 border-[#47afe2]/20 focus:border-[#47afe2] focus:ring-[#47afe2]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
        </div>

        {/* Featured Posts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
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
          <h2 className="text-2xl font-semibold text-[#47afe2] mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Contact Information</h3>
              <address className="text-sm text-gray-400 not-italic">
                123 Medical Plaza, Suite 100<br />
                Cityville, State 12345<br />
                Phone: (+90) 224 453 31 53<br />
                Email: info@drname.com
              </address>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Categories</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Orthopedics</a></li>
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Traumatology</a></li>
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Complementary Medicine</a></li>
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Subscribe</h3>
              <p className="text-sm text-gray-400 mb-4">Stay updated with our latest articles and research.</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700"
                />
                <Button className="bg-[#47afe2] hover:bg-[#47afe2]/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Dr. Name. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

