import { Play } from "lucide-react";

import Image from "next/image";
import { LocalizedTitle } from "./localized-title";
import Link from "next/link";

interface VideoCardProps {
  video: {
    id: string;
    turkishTitle: string;
    englishTitle: string;
    turkishDescription: string;
    englishDescription: string;
    videoUrl: string;
    thumbnailUrl: string;
  };
  locale: string;
}

export function VideoCard({ video, locale }: VideoCardProps) {
  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] w-full">
        <Image
          src={video.thumbnailUrl}
          alt={video.turkishTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
          <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          <LocalizedTitle
            turkishTitle={video.turkishTitle}
            englishTitle={video.englishTitle}
          />
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {locale === 'tr' 
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
        <span className="sr-only">Watch video</span>
      </Link>
    </div>
  );
} 