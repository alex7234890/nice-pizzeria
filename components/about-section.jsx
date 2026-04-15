'use client'

import Image from 'next/image'
import { Flame, Award, Clock, Users } from 'lucide-react'

const stats = [
  { icon: Flame, value: '40+', label: 'Anni di Esperienza' },
  { icon: Award, value: '100%', label: 'Ingredienti Freschi' },
  { icon: Clock, value: '90s', label: 'Cottura nel Forno' },
  { icon: Users, value: '50k+', label: 'Clienti Felici' },
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
                    alt="Interno del ristorante"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/pizza-making.jpg"
                    alt="Preparazione della pizza"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/hero-pizza.jpg"
                    alt="Pizza napoletana"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>1985</p>
              <p className="text-sm opacity-90">Anno di Fondazione</p>
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
              Passione per la Pizza Napoletana Autentica
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Da oltre quarant&apos;anni, La Fiamma porta sulle tavole dei nostri clienti 
              l&apos;autentico sapore della tradizione napoletana. Ogni pizza è un&apos;opera 
              d&apos;arte, preparata con amore e cotta nel nostro forno a legna.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Utilizziamo solo ingredienti di prima qualità: farina tipo 00, pomodori 
              San Marzano DOP, mozzarella di bufala campana e basilico fresco. La nostra 
              passione per la pizza si tramanda di generazione in generazione.
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
