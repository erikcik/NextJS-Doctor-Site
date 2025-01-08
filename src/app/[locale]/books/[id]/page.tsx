import { db } from "~/server/db";
import { bookEntries } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LocalizedTitle } from "~/components/localized-title";
import MarkdownDisplay from "~/components/markdown-display";
import { formatDate } from "~/lib/utils";
import Image from "next/image";
import { Clock, Book, ChevronLeft, ChevronDown } from 'lucide-react';
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export default async function BookPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('BookPage');

  const [entry] = await db
    .select()
    .from(bookEntries)
    .where(eq(bookEntries.id, params.id));

  if (!entry) {
    notFound();
  }

  const content = params.locale === 'tr' ? entry.turkishContent : entry.englishContent;
  const previewContent = content.split('\n').slice(0, 3).join('\n'); // Get first 3 lines for preview

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <Link 
          href={`/${params.locale}/books`} 
          className="inline-flex items-center text-[#0ea5e9] hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t('backToBooks')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Book Cover */}
          <div className="md:col-span-1 relative">
            <div className="absolute inset-0 bg-[#0ea5e9] rounded-lg transform rotate-3 transition-transform group-hover:rotate-0"></div>
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-xl z-10">
              <Image
                src={entry.coverImage}
                alt={params.locale === 'tr' ? entry.turkishTitle : entry.englishTitle}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Book Details and Preview */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-white">
              <LocalizedTitle
                turkishTitle={entry.turkishTitle}
                englishTitle={entry.englishTitle}
              />
            </h1>

            <div className="space-y-4">
              <p className="text-2xl text-gray-400">
                {entry.author}
              </p>

              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#0ea5e9]" />
                  <span>{entry.minutesToRead} {t('minutesToRead')}</span>
                </div>
              </div>

              <Button 
                asChild 
                className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/80 text-black transition-colors"
              >
                <a 
                  href={entry.linkToBook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Book className="h-5 w-5" />
                  {t('viewBook')}
                </a>
              </Button>
            </div>

            {/* Content Preview */}
            <div className="mt-8 border-l-2 border-[#0ea5e9] pl-4">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-white">
                {t('preview')}
              </h2>
              <div className="prose prose-sm max-w-none prose-invert prose-headings:text-[#0ea5e9] prose-a:text-[#0ea5e9]">
                <MarkdownDisplay
                  turkishContent={previewContent}
                  englishContent={previewContent}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Book Content */}
        <div className="relative mt-16">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#0ea5e9]"></div>
          <div className="pl-6">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-white flex items-center">
              {t('fullContent')}
              <ChevronDown className="ml-2 h-6 w-6 text-[#0ea5e9]" />
            </h2>
            <div className="prose prose-lg max-w-none prose-invert prose-headings:text-[#0ea5e9] prose-a:text-[#0ea5e9]">
              <MarkdownDisplay
                turkishContent={entry.turkishContent}
                englishContent={entry.englishContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

