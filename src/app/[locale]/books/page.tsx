import { db } from "~/server/db";
import { bookEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { LocalizedTitle } from "~/components/localized-title";
import Image from "next/image";
import Link from "next/link";
import { Book, Clock, User, ChevronRight } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getExcerpt } from "~/utils/getExcerpt";

export default async function BooksPage({ params: { locale } }: { params: { locale: 'tr' | 'en' } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('BooksPage');

  const entries = await db
    .select()
    .from(bookEntries)
    .orderBy(desc(bookEntries.createdAt));

  return (
    <div className="min-h-screen bg-black text-white py-16 pb-32">
      <div className="container mx-auto px-4 py-2">
        {/* Header Section with decorative elements */}
        <div className="relative  text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-white">
              {t('title')}
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-[#0ea5e9]"></div>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-6">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {entries.map((book, index) => (
            <div 
              key={book.id} 
              className={cn(
                "group relative",
                "transform transition-all duration-500 hover:scale-105 my-12"
              )}
            >
              <div className="absolute inset-0 bg-[#0ea5e9] rounded-lg transform rotate-3 transition-transform group-hover:rotate-0"></div>
              <div className="relative bg-black rounded-lg overflow-hidden shadow-xl z-10">
                {/* Book Cover Image with Overlay */}
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 z-10"/>
                  <Image
                    src={book.coverImage}
                    alt={locale === 'tr' ? book.turkishTitle : book.englishTitle}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#0ea5e9] text-black px-3 py-1 rounded-full text-sm font-bold z-20 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {book.minutesToRead} {t('minutesToRead')}
                  </div>
                </div>
                
                {/* Book Details with enhanced styling */}
                <div className="p-6 space-y-4">
                  {/* Title with decorative element */}
                  <h2 className="text-2xl font-bold leading-tight group-hover:text-[#0ea5e9] transition-colors">
                    <LocalizedTitle
                      turkishTitle={book.turkishTitle}
                      englishTitle={book.englishTitle}
                    />
                  </h2>
                  
                  {/* Author */}
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="h-5 w-5 text-[#0ea5e9]" />
                    <span className="font-medium">{book.author}</span>
                  </div>

                  {/* Add Book Excerpt */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {getExcerpt(book.turkishContent, book.englishContent)[locale]}
                    </p>
                  </div>
                  
                  {/* Reading Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#0ea5e9]" />
                      <span>{book.minutesToRead} {t('minutesToRead')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Book className="h-4 w-4 text-[#0ea5e9]" />
                      <span>{new Date(book.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                    </div>
                  </div>

                  {/* Action Buttons with enhanced styling */}
                  <div className="flex gap-4 pt-4">
                    <Button 
                      asChild 
                      className="flex-1 bg-[#0ea5e9] hover:bg-[#0ea5e9]/80 text-black transition-colors"
                    >
                      <Link href={`/${locale}/books/${book.id}`} className="flex items-center justify-center">
                        {t('readMore')}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="flex-1 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-black transition-colors"
                    >
                      <a 
                        href={book.linkToBook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Book className="h-5 w-5" />
                        {t('viewBook')}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-black border-2 border-[#0ea5e9] rounded-lg shadow-lg shadow-[#0ea5e9]/20">
              <Book className="h-16 w-16 text-[#0ea5e9] mx-auto mb-4" />
              <p className="text-2xl text-gray-400">No books available yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

