'use client'

import { MapPin, Phone, Clock, Globe, Instagram, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Indirizzo',
    content: 'Via Leonardo Da Vinci, 4b — San Miniato (PI)',
    link: 'https://maps.app.goo.gl/nicepizzasanminiato',
  },
  {
    icon: Globe,
    title: 'Sito Web',
    content: 'nice.pizza',
    link: 'https://www.nice.pizza',
  },
  {
    icon: Clock,
    title: 'Orari',
    content: 'Mer–Dom: 12:00–14:30 / 18:30–22:30',
    note: 'Lunedì e Martedì chiusi',
  },
]

export function ContactSection() {
  return (
    <section id="contatti" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Vieni a Trovarci
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Contatti
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Siamo a San Miniato, nel cuore della Toscana. Vieni a scoprire la nostra
              pizza in teglia, birre artigianali e cocktail!
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                    {item.note && (
                      <p className="text-sm text-primary mt-1">{item.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="font-semibold text-foreground mb-4">Seguici sui Social</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/nice.drinknslice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram Nice Pizza"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/nice.drinknslice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Facebook Nice Pizza"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/prenota">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full">
                  Prenota Tavolo
                </Button>
              </Link>
              <Link href="/asporto">
                <Button variant="outline" className="font-semibold px-8 rounded-full">
                  Ordina Asporto
                </Button>
              </Link>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="bg-secondary rounded-2xl overflow-hidden h-full min-h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5!2d10.85!3d43.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Leonardo+Da+Vinci+4b+San+Miniato!5e0!3m2!1sit!2sit!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nice Pizza San Miniato"
              />
            </div>

            {/* Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-card rounded-xl p-4 shadow-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">Nice Pizza</p>
                  <p className="text-sm text-muted-foreground">Via Leonardo Da Vinci, 4b — San Miniato</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Nice+Pizza+San+Miniato+Via+Leonardo+Da+Vinci+4b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Indicazioni
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
