import Link from 'next/link'
import { Flame } from 'lucide-react'

const footerLinks = {
  navigazione: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/#menu' },
    { label: 'Chi Siamo', href: '/#chi-siamo' },
    { label: 'Contatti', href: '/#contatti' },
  ],
  servizi: [
    { label: 'Prenota Tavolo', href: '/prenota' },
    { label: 'Ordina Asporto', href: '/asporto' },
    { label: 'Fiamma Card', href: '/#cashback' },
  ],
  legale: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Termini e Condizioni', href: '/termini' },
    { label: 'Cookie Policy', href: '/cookie' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                La Fiamma
              </span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              Autentica pizza napoletana dal 1985. Tradizione, passione e 
              ingredienti di prima qualità per un&apos;esperienza culinaria unica.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-semibold">10% Cashback su ogni ordine</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Navigazione</h4>
            <ul className="space-y-3">
              {footerLinks.navigazione.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Servizi</h4>
            <ul className="space-y-3">
              {footerLinks.servizi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Informazioni Legali</h4>
            <ul className="space-y-3">
              {footerLinks.legale.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/40 text-sm">
              © {new Date().getFullYear()} La Fiamma Pizzeria. Tutti i diritti riservati.
            </p>
            <p className="text-background/40 text-sm">
              P.IVA: IT12345678901 | Via Roma 123, 80100 Napoli (NA)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
