import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { tipos } from '@/data/preguntas'

export const metadata: Metadata = {
  title: 'Postular',
  description: 'Únete al equipo de Urugordos.',
}

export default function PostularPage() {
  return (
    <>
      <Header />
      <main className="postular-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <a href="/" className="back-link" style={{ marginBottom: '1rem', display: 'block' }}>← Volver al inicio</a>
            <span className="hero-badge">📝 Postulaciones</span>
            <h1>Únete al equipo</h1>
            <p>Elige el rol al que quieres postularte. Son <strong>25 preguntas</strong> divididas en 3 secciones.</p>
          </div>
        </section>

        <section className="tipo-grid">
          {Object.values(tipos).map((tipo) => (
            <a href={`/postular/${tipo.clave}`} key={tipo.clave} className="tipo-card" style={{ '--accent': tipo.color } as React.CSSProperties}>
              <span className="tipo-icon">{tipo.icono}</span>
              <h2>{tipo.nombre}</h2>
              <p>{tipo.descripcion.split('\n\n')[0]}</p>
              <span className="tipo-cta" style={{ background: tipo.color }}>Comenzar →</span>
            </a>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
