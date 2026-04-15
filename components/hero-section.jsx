'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown, Flame } from 'lucide-react'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-pizza.jpg"
          alt="Pizza napoletana dal forno a legna"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent/40 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-primary/50 rounded-full animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Flame className="w-4 h-4 text-primary" />
          <span className="text-white/90 text-sm font-medium">
            Autentica Pizza Napoletana
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-balance"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          La Fiamma
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/80 mb-4 font-light tracking-wide">
          Tradizione e Passione dal 1985
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Scopri il sapore autentico della pizza napoletana cotta nel forno a legna.
          Ogni ordine ti regala il 10% di cashback sulla tua carta fedeltà.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/prenota">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              Prenota un Tavolo
            </Button>
          </Link>
          <Link href="/asporto">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Ordina da Asporto
            </Button>
          </Link>
        </div>

        {/* Cashback Highlight */}
        <div className="mt-12 inline-flex items-center gap-3 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3">
          <span className="text-primary font-bold text-2xl">10%</span>
          <span className="text-white/90 text-sm">
            Cashback su ogni ordine con la tua Fiamma Card
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#chi-siamo" className="text-white/60 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  )
}
