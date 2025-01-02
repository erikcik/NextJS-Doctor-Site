import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export function TestimonialsAnnouncements() {
  const testimonials = [
    {
      quote: "I want to thank you for your successful treatment. I am very happy with all my sincerity that he is one of the best doctors in Mersin. His scientific knowledge, from energy fields and cells to your interest and relevance...",
      name: "Canan YILMAZ",
      title: "1 year ago"
    },
    {
      quote: "Exceptional care and professionalism. The treatment methods are innovative and effective.",
      name: "Mehmet KAYA",
      title: "6 months ago"
    },
    // Add more testimonials to create a better scrolling effect
    {
      quote: "The attention to detail and personalized care is outstanding.",
      name: "Ayşe DEMIR",
      title: "3 months ago"
    },
    {
      quote: "Life-changing results. I couldn't be happier with my treatment.",
      name: "Ali YILDIZ",
      title: "2 months ago"
    }
  ];

  return (
    <div className="w-full">
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-8 w-full">
        <h2 className="text-3xl font-bold">What Did They Say?</h2>
        <div className="h-[450px] w-full mt-8">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="normal"
            className="max-w-full"
          />
        </div>
      </section>

      {/* Announcements Section */}
      
    </div>
  )
}

