"use client"

import Image from "next/image"
import Link from "next/link"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, Book } from 'lucide-react'
import { useParams } from "next/navigation"
import { GlareCard } from "@/components/ui/glare-card"

interface HomeBlogPostProps {
  title: React.ReactNode;
  description: {
    tr: string;
    en: string;
  };
  image: string;
  category: string;
  date: string;
  readTime: string;
  href: string;
  author: string;
  linkToBook?: string | null;
  featured?: boolean;
}

export function HomeBlogPost({
  title,
  description,
  image,
  category,
  date,
  readTime,
  href,
  author,
  linkToBook,
  featured = false
}: HomeBlogPostProps) {
  const params = useParams();
  const locale = (params?.locale ?? 'en') as keyof typeof description;

  return (
    <Link href={href}>
      <GlareCard className={`
        ${featured ? 'lg:flex lg:flex-col ' : ''} 
        flex flex-col aspect-[4/5]
        transition-all duration-300 hover:scale-[1.02]
      `}>
        <div className={`
          relative
          ${featured ? 'lg:h-1/2' : 'aspect-video'}
          w-full
        `}>
          <Image
            src={image}
            alt={typeof title === 'string' ? title : 'Blog Image'}
            fill
            className="object-cover rounded-t-[var(--radius)]"
            priority
          />
          <Badge 
            className="absolute top-4 left-4 bg-[#47afe2] hover:bg-[#47afe2]/90"
          >
            {category}
          </Badge>
        </div>

        <div className={`
          flex flex-col flex-1
          w-full p-6
        `}>
          <CardHeader className="px-0">
            <h3 className="text-xl font-semibold text-[#47afe2] hover:text-[#47afe2]/90 transition-colors line-clamp-2">
              {title}
            </h3>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <p className="text-muted-foreground line-clamp-2">
              {locale === 'tr' ? description.tr : description.en}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-auto">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              {linkToBook && (
                <div className="flex items-center gap-1">
                  <Book className="w-4 h-4" />
                  <a 
                    href={linkToBook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#47afe2]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {locale === 'tr' ? 'Kitaba Git' : 'View Book'}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </GlareCard>
    </Link>
  )
} 