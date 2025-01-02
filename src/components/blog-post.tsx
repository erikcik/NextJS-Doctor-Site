import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from 'lucide-react'

interface BlogPostProps {
  title: string
  description: string
  image: string
  category: string
  date: string
  readTime: string
  href: string
  featured?: boolean
}

export function BlogPost({
  title,
  description,
  image,
  category,
  date,
  readTime,
  href,
  featured = false
}: BlogPostProps) {
  return (
    <Link href={href}>
      <Card className={`overflow-hidden transition-all hover:shadow-lg border-[#47afe2]/10 ${
        featured ? 'lg:flex' : ''
      }`}>
        <div className={`relative ${featured ? 'lg:w-1/2' : ''}`}>
          <div className={`relative ${featured ? 'h-full min-h-[300px]' : 'h-48'}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <Badge 
            className="absolute top-4 left-4 bg-[#47afe2] hover:bg-[#47afe2]/90"
          >
            {category}
          </Badge>
        </div>
        <div className={featured ? 'lg:w-1/2' : ''}>
          <CardHeader className="bg-gradient-to-r from-[#47afe2]/5 to-transparent">
            <h3 className={`${
              featured ? 'text-2xl' : 'text-xl'
            } font-semibold text-[#47afe2] hover:text-[#47afe2]/90 transition-colors`}>
              {title}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-3">{description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

