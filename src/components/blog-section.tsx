import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GlareCard } from "@/components/ui/glare-card"

export function BlogSection() {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=500",
      title: "Basic Acupuncture Points",
      content: "In the world we live in currently, the field of practice called alternative medicine, especially acupuncture...",
      alt: "Acupuncture"
    },
    {
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=500",
      title: "Psychoneuro Immunology",
      content: "Psychoneuroimmunology studies the interaction between psychological processes and bodily functions...",
      alt: "Psychoneuro Immunology"
    },
    {
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=500",
      title: "Advanced Neural Therapy",
      content: "Exploring the latest developments in neural therapy and its applications in modern medicine...",
      alt: "Neural Therapy"
    }
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-display">Blog</h2>
          <Button variant="outline" className="text-lg px-6 py-2">More</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div className="flex justify-center" key={index}>
              <GlareCard className="bg-slate-900">
                <div className="h-full flex flex-col">
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-4 font-body">{post.title}</h3>
                    <p className="text-base text-gray-300 mb-6 flex-1 leading-relaxed">
                      {post.content}
                    </p>
                    <Button variant="link" className="p-0 text-white hover:text-gray-300">
                      Read More →
                    </Button>
                  </div>
                </div>
              </GlareCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

