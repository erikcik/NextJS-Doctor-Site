import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Link } from "~/i18n/routing"

interface TreatmentCardProps {
  title: string
  description: string
  imageSrc: string
  learnMoreHref: string
}

export function TreatmentCard({ title, description, imageSrc, learnMoreHref }: TreatmentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-56">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base text-muted-foreground mb-4">{description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-tertiary border-tertiary hover:text-black  transition-colors duration-300"
          asChild
        >
          <Link href={learnMoreHref}>
            Learn More
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

