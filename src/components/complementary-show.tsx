"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TreatmentCard } from "./treatment-card";
import { useParams } from "next/navigation";
import { LocalizedTitle } from "./localized-title";
import { getExcerpt } from "~/utils/getExcerpt";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

type ComplementaryEntry = {
  id: string;
  turkishTitle: string;
  englishTitle: string;
  turkishContent: string;
  englishContent: string;
  coverImage: string;
  author: string;
  createdAt: Date;
  updatedAt: Date | null;
};

interface ComplementaryShowProps {
  entries: ComplementaryEntry[];
}

const minHeight = "min-h-[max(600px,100%)]";

const ComplementaryShow = ({ entries }: ComplementaryShowProps) => {
  const params = useParams();
  const locale = params?.locale as string;

  // Filter for specific IDs
  const specificIds = [
    '737a2b2d-fd2c-4fd1-98ec-6921ea3901ea',
    'da0108b9-c8b6-4662-abdc-c0d30c858af9'
  ];
  
  const filteredEntries = entries.filter(entry => specificIds.includes(entry.id));

  return (
    <div className="relative my-8 sm:my-12 md:my-16 w-full">
      <div className="absolute inset-0 w-full h-full">
        <BackgroundGradientAnimation
          gradientBackgroundStart="#0ea5e9"
          gradientBackgroundEnd="black"
          firstColor="18, 113, 255"
          secondColor="221, 74, 255"
          thirdColor="100, 220, 255"
          fourthColor="200, 50, 50"
          fifthColor="180, 180, 50"
          pointerColor="140, 100, 255"
          size="80%"
          blendingValue="hard-light"
          className="!absolute !w-full !h-full"
        />
      </div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 py-6 sm:py-8 md:py-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-white"
          >
            {locale === 'tr' ? 'Tamamlayıcı Tıp' : 'Complementary Medicine'}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TreatmentCard
                  title={
                    <LocalizedTitle
                      turkishTitle={entry.turkishTitle}
                      englishTitle={entry.englishTitle}
                    />
                  }
                  description={getExcerpt(entry.turkishContent, entry.englishContent)}
                  imageSrc={entry.coverImage}
                  author={entry.author}
                  learnMoreHref={`/complementary-medicine/${entry.id}`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6 sm:mt-8"
          >
            <Link
              href="/complementary-medicine"
              className="inline-block bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-black/50 transition-colors"
            >
              {locale === 'tr' ? 'Tümünü Gör' : 'View All'}
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ComplementaryShow;
