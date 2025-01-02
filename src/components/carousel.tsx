'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070',
    title: 'Advanced Orthopedic Care',
    subtitle: 'State-of-the-art treatments for your musculoskeletal health'
  },
  {
    url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=2070',
    title: 'Complementary Medicine',
    subtitle: 'Integrating traditional wisdom with modern science'
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070',
    title: 'Personalized Treatment Plans',
    subtitle: 'Tailored care for your unique health needs'
  }
]

export function CarouselComponent() {
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
                  <div className="text-center text-white px-4">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                    <Button size="lg" className="bg-tertiary hover:bg-tertiary/90 text-white text-lg px-8 py-3">
                      Learn More
                    </Button>
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

