"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, Book } from 'lucide-react'
import { useParams } from "next/navigation"
import { GlareCard } from "@/components/ui/glare-card"

interface BlogPostProps {
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

export function BlogPost({
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
}: BlogPostProps) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <Link href={href}>
      <GlareCard className={`${featured ? 'lg:flex' : ''}`}>
        <div className={`relative ${featured ? 'lg:w-1/2' : ''}`}>
          <div className={`relative ${featured ? 'h-full min-h-[300px]' : 'h-48'}`}>
            <Image
              src={image}
              alt={typeof title === 'string' ? title : 'Blog Image'}
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
            <p className="text-muted-foreground line-clamp-3">
              {locale === 'tr' ? description.tr : description.en}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

