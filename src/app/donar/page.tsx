import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Donar',
  description: 'Apoya al proyecto con una donación.',
}

export default function DonarPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Donaciones</span>
            <h1>Donar</h1>
            <p>Apoya al proyecto con una donación.</p>
          </div>
        </section>

        <section className="page-section">
          <div className="page-section-inner" style={{ maxWidth: '36rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '3rem 1rem' }}>
            <span style={{ fontSize: '3rem' }}>⏳</span>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: '#b06040', margin: 0 }}>Coming Soon</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '28rem', margin: '0 auto' }}>
              El sistema de donaciones está en desarrollo. Pronto podrás apoyar al proyecto y recibir recompensas exclusivas.
            </p>
            <a href="/proyectos" className="btn-nav" style={{ display: 'inline-block', marginTop: '1rem', alignSelf: 'center' }}>← Volver a proyectos</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
