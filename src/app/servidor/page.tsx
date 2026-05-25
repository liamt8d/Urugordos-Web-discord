import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Servidor',
  description: 'Todo lo que necesitas saber sobre Urugordos.',
}

const sections = [
  {
    title: 'Bienvenido',
    text: 'Urugordos es una comunidad de Discord creada por Urugodd. Un espacio para compartir, charlar y divertirse con gente de todo el mundo.',
  },
  {
    title: 'Normas',
    text: <>El servidor cuenta con reglas claras para mantener un ambiente respetuoso y agradable. Lee las reglas completas en <a href="/reglas" className="info-link">/reglas</a>.</>,
  },
  {
    title: 'Roles y Niveles',
    text: <>Gana experiencia chateando y en canales de voz para subir de nivel y desbloquear roles exclusivos. Consulta la guía en <a href="/roles" className="info-link">/roles</a>.</>,
  },
  {
    title: 'Eventos y Dinámicas',
    text: <>Participa de eventos, dinámicas y sorteos organizados por la comunidad. Toda la información en <a href="/eventos" className="info-link">/eventos</a>.</>,
  },
  {
    title: 'Staff',
    text: <>El equipo de moderación y administración vela por el buen funcionamiento del servidor. Conoce al staff en <a href="/staff" className="info-link">/staff</a>.</>,
  },
  {
    title: 'Soporte',
    text: <>Si tienes dudas o problemas, puedes abrir un ticket en <a href="/tickets" className="info-link">/tickets</a> o revisar las preguntas frecuentes en <a href="/faq" className="info-link">/faq</a>.</>,
  },
]

export default function ServidorPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Servidor</span>
            <h1>Sobre el servidor</h1>
            <p>Todo lo que necesitas saber sobre Urugordos.</p>
          </div>
        </section>

        <section className="page-section">
          <div className="info-section">
            {sections.map(s => (
              <div key={s.title} className="info-card">
                <h3 className="info-card-title">{s.title}</h3>
                <p className="info-card-text">{s.text}</p>
              </div>
            ))}
          </div>
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
        }
      `}</style>
    </>
  )
}