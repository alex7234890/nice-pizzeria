'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Flame } from 'lucide-react'

const categories = ['Tutte', 'Classiche', 'Speciali', 'Vegetariane']

const pizzas = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Pomodoro San Marzano DOP, mozzarella di bufala, basilico fresco',
    price: '8,50',
    category: 'Classiche',
    popular: true,
  },
  {
    id: 2,
    name: 'Diavola',
    description: 'Pomodoro, mozzarella, salame piccante calabrese, olio al peperoncino',
    price: '10,00',
    category: 'Classiche',
    spicy: true,
  },
  {
    id: 3,
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola DOP, fontina valdostana, parmigiano 24 mesi',
    price: '11,50',
    category: 'Speciali',
    popular: true,
  },
  {
    id: 4,
    name: 'Ortolana',
    description: 'Pomodoro, mozzarella, verdure grigliate di stagione, origano',
    price: '10,50',
    category: 'Vegetariane',
    vegetarian: true,
  },
  {
    id: 5,
    name: 'Tartufo e Burrata',
    description: 'Crema di tartufo nero, burrata pugliese, rucola, scaglie di parmigiano',
    price: '14,00',
    category: 'Speciali',
    premium: true,
  },
  {
    id: 6,
    name: 'Marinara',
    description: 'Pomodoro San Marzano, aglio, origano, olio EVO',
    price: '7,00',
    category: 'Classiche',
    vegetarian: true,
  },
]

export function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState('Tutte')

  const filteredPizzas =
    activeCategory === 'Tutte'
      ? pizzas
      : pizzas.filter((pizza) => pizza.category === activeCategory)

  return (
    <section id="menu" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Le Nostre Pizze
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 text-balance"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Il Menu
          </h2>
          <p className="text-muted-foreground text-lg">
            Scopri le nostre pizze artigianali, preparate con ingredienti selezionati
            e cotte nel forno a legna a 450°C.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card text-muted-foreground hover:bg-card/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Pizza Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-border/50 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {pizza.name}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    {pizza.popular && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                        Popolare
                      </Badge>
                    )}
                    {pizza.spicy && (
                      <Badge variant="secondary" className="bg-red-100 text-red-600 text-xs">
                        Piccante
                      </Badge>
                    )}
                    {pizza.vegetarian && (
                      <Badge variant="secondary" className="bg-green-100 text-green-600 text-xs">
                        Vegetariana
                      </Badge>
                    )}
                    {pizza.premium && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-600 text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary">€{pizza.price}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pizza.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/asporto">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full"
            >
              Vedi Menu Completo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
