'use client'

import { Card, CardContent } from "@/components/ui/card"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { useTranslations } from 'next-intl'

export function TestimonialsAnnouncements() {
  const t = useTranslations('Testimonials')
  
  const testimonials = t.raw('items')

  return (
    <div className="w-full">
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold font-display">
          {t('title')}
        </h2>
        <div className="h-[350px] md:h-[450px] w-full mt-8">
          <InfiniteMovingCards
            items={testimonials.map((item: any) => ({
              quote: item.quote,
              name: item.name,
              title: item.date
            }))}
            direction="left"
            speed="normal"
            className="max-w-full"
          />
        </div>
      </section>
    </div>
  )
}

