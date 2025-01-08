'use client'

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getExcerpt } from "~/utils/getExcerpt";
import { LocalizedTitle } from "./localized-title";
import Image from "next/image";
import { Book, Clock } from 'lucide-react';

interface BookSectionProps {
  entries: {
    id: string;
    turkishTitle: string;
    englishTitle: string;
    turkishContent: string;
    englishContent: string;
    coverImage: string;
    author: string;
    minutesToRead: number | null;
    linkToBook?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}

export function BookSection({ entries }: BookSectionProps) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold font-display text-gray-800">
            {locale === 'tr' ? 'Kitaplar' : 'Books'}
          </h2>
          <Link href="/books">
            <Button variant="outline" className="text-lg px-6 py-2 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white transition-colors">
              {locale === 'tr' ? 'Daha Fazla' : 'More'}
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {entries.slice(0, 3).map((entry, index) => (
            <div key={entry.id} className="group relative">
              <div className="absolute inset-0 bg-[#0ea5e9] rounded-lg transform rotate-2 transition-transform group-hover:rotate-0"></div>
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl z-10 transition-transform duration-300 ease-in-out transform group-hover:-translate-y-2">
                <div className="relative h-64 w-full">
                  <Image
                    src={entry.coverImage}
                    alt={locale === 'tr' ? entry.turkishTitle : entry.englishTitle}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800">
                    <LocalizedTitle
                      turkishTitle={entry.turkishTitle}
                      englishTitle={entry.englishTitle}
                    />
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {getExcerpt(entry.turkishContent, entry.englishContent)[locale as 'tr' | 'en']}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-[#0ea5e9]" />
                      {entry.minutesToRead || 0} min
                    </span>
                    <span>{entry.author}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0ea5e9] to-purple-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
              <Link href={`/books/${entry.id}`} className="absolute inset-0 z-20">
                <span className="sr-only">View book details</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

