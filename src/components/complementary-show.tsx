"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TreatmentCard } from "./treatment-card";
import { useParams } from "next/navigation";
import { LocalizedTitle } from "./localized-title";
import { getExcerpt } from "~/utils/getExcerpt";

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

const ComplementaryShow = ({ entries }: ComplementaryShowProps) => {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8"
        >
          {locale === 'tr' ? 'Tamamlayıcı Tıp' : 'Complementary Medicine'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.slice(0, 3).map((entry) => (
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
          className="text-center mt-8"
        >
          <Link
            href="/complementary-medicine"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {locale === 'tr' ? 'Tümünü Gör' : 'View All'}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ComplementaryShow;
