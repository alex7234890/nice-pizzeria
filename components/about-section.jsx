'use client'

import Image from 'next/image'
import { Leaf, Award, Beer, Utensils } from 'lucide-react'

const stats = [
  { icon: Leaf, value: '100%', label: 'Farine Bio' },
  { icon: Award, value: 'Top', label: 'Ingredienti Selezionati' },
  { icon: Beer, value: '10+', label: 'Birre Artigianali' },
  { icon: Utensils, value: 'Alta', label: 'Digeribilità' },
]

export function AboutSection() {
  return (
    <section id="chi-siamo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/restaurant-interior.jpg"
                    alt="Interno Nice Pizza San Miniato"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/pizza-making.jpg"
                    alt="Preparazione pizza in teglia"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/hero-pizza.jpg"
                    alt="Pizza in teglia Nice Pizza"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>Bio</p>
              <p className="text-sm opacity-90">Per Passione</p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              La Nostra Storia
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 text-balance"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Bio per Passione, Genuino per Missione
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Nice Pizza nasce a San Miniato con una missione chiara: portare una pizza
              in teglia contemporanea, croccante e altamente digeribile, realizzata con
              farine biologiche e ingredienti accuratamente selezionati.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Oltre alla pizza in teglia, proponiamo arancini gourmet, fritti selezionati,
              birre artigianali, cocktail in bottiglia e bevande italiane di qualità.
              Un locale dove gusto, genuinità e convivialità si incontrano nel cuore
              della Toscana.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-secondary rounded-xl">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
