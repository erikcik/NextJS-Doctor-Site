'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useTranslations } from 'next-intl'
import { Link } from "~/i18n/routing"

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070',
    translationKey: 'orthopedic',
    href: '/orthopedics'
  },
  {
    url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=2070',
    translationKey: 'complementary',
    href: '/complementary-medicine'
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070',
    translationKey: 'personalized',
    href: '/about'
  }
]

export function CarouselComponent() {
  const t = useTranslations('Carousel')
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  )

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="relative h-[400px] w-full"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[400px] w-full">
              <div
                style={{ backgroundImage: `url(${slide.url})` }}
                className="w-full h-full bg-center bg-cover duration-500"
              >
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 font-display">
                      {t(`slides.${slide.translationKey}.title`)}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 font-body leading-relaxed">
                      {t(`slides.${slide.translationKey}.subtitle`)}
                    </p>
                    <Link href={slide.href}>
                      <Button size="lg" className="bg-tertiary hover:bg-tertiary/90 text-white text-lg px-8 py-3 font-body">
                        {t('learnMore')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white border-none h-12 w-12" />
      <CarouselNext className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white border-none h-12 w-12" />
    </Carousel>
  )
}

