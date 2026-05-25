import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Urugordos',
  description: 'Comunidad de Urugodd en Discord. Sumate y se parte.',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
