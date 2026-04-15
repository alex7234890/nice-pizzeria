import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Nice Pizza | San Miniato',
  description: 'Pizza in teglia artigianale a San Miniato. Ingredienti bio, birre artigianali e cocktail. Prenota il tuo tavolo o ordina da asporto.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
