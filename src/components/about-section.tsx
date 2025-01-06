"use client";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/routing";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { CardSpotlight } from "~/components/ui/card-spotlight";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('AboutSection');

  return (
    <section className="container relative mx-auto px-4 py-12">
      <BackgroundBeams />
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-primary font-display">
          {t('title')}
        </h2>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Image Column - Animate from right */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
            className="order-first lg:order-last lg:col-span-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="https://drcuneyttamam.com/wp-content/uploads/2023/02/hakkimda.png"
                alt="Dr. Cüneyt Tamam - Orthopedics and Traumatology Specialist"
                fill
                objectFit="contain"
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="order-last lg:order-first lg:col-span-7">
            {/* Introduction - Animate from left */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <CardSpotlight className="mb-4">
                <p className="text-lg leading-relaxed">
                  {t('introduction')}
                </p>
              </CardSpotlight>
            </motion.div>

            {/* Education & Experience Grid - Animate from top */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: 0.1,
                ease: "easeOut"
              }}
              className="mt-4 grid gap-8 md:grid-cols-2"
            >
              {/* Education */}
              <CardSpotlight>
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  {t('education.title')}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {t.raw('education.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardSpotlight>

              {/* Specialization */}
              <CardSpotlight>
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  {t('specialization.title')}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {t.raw('specialization.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardSpotlight>
            </motion.div>

            {/* Certifications - Animate from left */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              <CardSpotlight className="mt-4">
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  {t('certifications.title')}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {t.raw('certifications.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardSpotlight>
            </motion.div>

            {/* Button - Animate from bottom */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              <Link href="/about" className="w-full">
                <button className="w-full translate-y-4 rounded-lg bg-primary px-8 py-3 text-white transition-colors hover:bg-primary/90 md:w-auto">
                  {t('moreDetails')}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
