"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, Book } from 'lucide-react'
import { useParams } from "next/navigation"
import { GlareCard } from "@/components/ui/glare-card"

interface BlogPagePostProps {
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
}

export function BlogPagePost({
  title,
  description,
  image,
  category,
  date,
  readTime,
  href,
  author,
  linkToBook
}: BlogPagePostProps) {
  const params = useParams();
  const locale = (params?.locale ?? 'en') as keyof typeof description;

  return (
    <Link href={href}>
      <GlareCard className="flex h-auto transition-all duration-300 hover:scale-[1.02]">
        {/* Text content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="mb-3">
              <Badge className="bg-[#47afe2] hover:bg-[#47afe2]/90 text-sm">
                {category}
              </Badge>
            </div>
            
            <h3 className="text-xl font-semibold text-[#47afe2] hover:text-[#47afe2]/90 transition-colors mb-3 line-clamp-2">
              {title}
            </h3>
            
            <p className="text-base text-muted-foreground line-clamp-3 mb-4">
              {locale === 'tr' ? description.tr : description.en}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-auto">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              {linkToBook && (
                <div className="flex items-center gap-1.5">
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
          </div>
        </div>

        {/* Image container */}
        <div className="relative w-[240px] shrink-0">
          <Image
            src={image}
            alt={typeof title === 'string' ? title : 'Blog Image'}
            fill
            className="object-cover rounded-r-[var(--radius)]"
            priority
          />
        </div>
      </GlareCard>
    </Link>
  )
} 