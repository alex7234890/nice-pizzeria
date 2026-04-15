import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { MenuPreview } from '@/components/menu-preview'
import { CashbackSection } from '@/components/cashback-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuPreview />
      <CashbackSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
