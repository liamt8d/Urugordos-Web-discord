import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos y actividades del servidor Urugordos.',
}

export default function EventosPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Eventos</span>
            <h1>Próximos Eventos</h1>
            <p>Lista completa de todos los eventos del servidor.</p>
          </div>
        </section>
        <section className="eventos-grid" style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem 5rem' }}>
          <div className="empty" style={{ textAlign: 'center', width: '100%' }}>Próximamente — Los eventos se listarán aquí.</div>
        </section>
      </main>
      <Footer />
      <style>{`
        .hero-small h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .hero-badge {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
      `}</style>
    </>
  )
}
