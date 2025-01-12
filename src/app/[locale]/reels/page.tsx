import { db } from "~/server/db";
import { videoEntries } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { LocalizedTitle } from "~/components/localized-title";
import { getTranslations } from 'next-intl/server';

export default async function ReelsPage({
  params,
}: {
  params: { locale: string };
}) {
  // Get translations using async getTranslations
  const t = await getTranslations('VideoReels');

  const videos = await db
    .select()
    .from(videoEntries)
    .orderBy(desc(videoEntries.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl">
          {t("title")}
          <div className="mx-auto mt-2 h-1 w-24 bg-blue-600" />
        </h2>
        <p className="mx-auto max-w-2xl text-gray-400">
          {t("subtitle")}
        </p>
      </div>

      {videos.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          {t('noVideos')}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-xl bg-gray-800"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.turkishTitle}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                  <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-blue-600/90 transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="mb-2 text-xl font-semibold text-white">
                  <LocalizedTitle
                    turkishTitle={video.turkishTitle}
                    englishTitle={video.englishTitle}
                  />
                </h3>
                <p className="line-clamp-2 text-sm text-gray-300">
                  {params.locale === "tr"
                    ? video.turkishDescription
                    : video.englishDescription}
                </p>
              </div>

              {/* Clickable Link */}
              <Link
                href={video.videoUrl}
                className="absolute inset-0 z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{t('watchVideo')}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 