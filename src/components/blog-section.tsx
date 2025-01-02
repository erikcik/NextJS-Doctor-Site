import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BlogSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Blog</h2>
          <Button variant="outline">More</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=500"
                alt="Acupuncture"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Basic Acupuncture Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                In the world we live in currently, the field of practice called alternative medicine, especially acupuncture...
              </p>
              <Button variant="link" className="p-0">Read More →</Button>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=500"
                alt="Psychoneuro Immunology"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Psychoneuro Immunology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Psychoneuroimmunology studies the interaction between psychological processes and bodily functions...
              </p>
              <Button variant="link" className="p-0">Read More →</Button>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=500"
                alt="Neural Therapy"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Advanced Neural Therapy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Exploring the latest developments in neural therapy and its applications in modern medicine...
              </p>
              <Button variant="link" className="p-0">Read More →</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

