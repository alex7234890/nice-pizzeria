'use client'

import { CreditCard, Percent, Gift, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
  {
    icon: CreditCard,
    step: '01',
    title: 'Richiedi la Carta',
    description: 'Richiedi gratuitamente la tua Nice Card direttamente in cassa o tramite il sito.',
  },
  {
    icon: Percent,
    step: '02',
    title: 'Accumula Cashback',
    description: 'Ad ogni pagamento, il 10% del totale viene caricato automaticamente sulla tua carta.',
  },
  {
    icon: Gift,
    step: '03',
    title: 'Usa il Credito',
    description: 'Alla tua prossima visita, usa il credito accumulato per pagare parte del conto.',
  },
]

export function CashbackSection() {
  return (
    <section id="cashback" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Programma Fedeltà Esclusivo</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Nice Card
          </h2>
          <p className="text-xl text-background/70 leading-relaxed">
            Ogni volta che mangi da noi, guadagni. Con la Nice Card ricevi il{' '}
            <span className="text-primary font-bold">10% di cashback</span> su ogni ordine.
          </p>
        </div>

        {/* Card Preview */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-3xl" />

            {/* Card */}
            <div className="relative w-80 md:w-96 h-52 md:h-60 bg-gradient-to-br from-primary via-primary to-accent rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-primary-foreground/80 text-xs uppercase tracking-widest">Carta Fedeltà</p>
                  <p className="text-primary-foreground text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Nice Pizza
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-primary-foreground/60 text-xs mb-1">Credito Disponibile</p>
                <p className="text-primary-foreground text-3xl font-bold">€ 24,50</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-primary-foreground/60 text-xs">**** **** **** 4582</p>
                  <p className="text-primary-foreground/60 text-xs">MARIO ROSSI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-8 hover:bg-background/10 transition-colors group"
            >
              {/* Step Number */}
              <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {item.step}
              </span>

              <item.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-background/60 leading-relaxed">{item.description}</p>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary/30">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/prenota">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/25"
            >
              Richiedi la Tua Nice Card
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-background/50 text-sm mt-4">
            Gratuita e senza impegno. Inizia a risparmiare oggi!
          </p>
        </div>
      </div>
    </section>
  )
}
