import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TestimonialsAnnouncements() {
  return (
    <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl font-bold mb-8">What Did They Say?</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="italic text-muted-foreground mb-2">
                  "I want to thank you for your successful treatment. I am very happy with all my sincerity that he is one of the best doctors in Mersin. His scientific knowledge, from energy fields and cells to your interest and relevance..."
                </p>
                <p className="text-sm font-semibold">- Canan YILMAZ</p>
                <p className="text-sm text-muted-foreground">1 year ago</p>
              </div>
              <div className="pb-4">
                <p className="italic text-muted-foreground mb-2">
                  "Exceptional care and professionalism. The treatment methods are innovative and effective."
                </p>
                <p className="text-sm font-semibold">- Mehmet KAYA</p>
                <p className="text-sm text-muted-foreground">6 months ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8">Announcements</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-red-600">
              IX. INTERNATIONAL CONGRESS OF NEURAL THERAPY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Congress Center: Hotel Name Here<br />
                Date: 17 - 20 June 2024
              </p>
              <div className="space-y-2">
                <p className="font-semibold">For detailed information, please contact:</p>
                <p className="text-sm text-muted-foreground">
                  Congress Organization:<br />
                  +90 (850) 333 33 33<br />
                  info@congress.com
                </p>
              </div>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

