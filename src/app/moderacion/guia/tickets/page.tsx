import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tickets',
  description: 'Guía para atender tickets de soporte en Urugordos.',
}

export default function ModTicketsPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="mod-header">
          <a href="/moderacion" className="mod-back">← Mod Guide</a>
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6080c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.8rem" height="1.8rem"><path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9z"/><path d="M8 12h8"/><path d="M10 9H8v6h2"/></svg>
            Tickets</h1>
        </section>

        <section className="mod-content">
          <div className="mod-card">
            <h2>¿Qué es un ticket?</h2>
            <p>
              Un ticket es una herramienta dentro de nuestro servidor con la finalidad
              de conectar a los usuarios con el equipo de moderación y administración
              para resolver cualquier duda, reporte u obtener información.
            </p>
            <p>
              Estos tickets son canales temporales del servidor, son privados y seguros.
              Solo el equipo de moderación, administración y el usuario podrán ver el ticket.
            </p>
          </div>

          <div className="mod-card">
            <h3>Reglas de tickets para moderadores</h3>
            <p>
              Debemos atender los tickets de una manera profesional, en todo momento
              debemos tener formalidad y paciencia. No debemos ser secos o cortantes
              y podemos ser amistosos con los usuarios, pero siempre manteniendo el
              respeto y demostrando empatía por sus situaciones.
            </p>
            <p className="mod-warning">
              <strong>⚠️ Más vale prevenir que lamentar, evítense problemas innecesarios.</strong>
            </p>
            <p>
              Siempre en un ticket tenemos que guardar la confidencialidad de absolutamente
              toda la información del ticket. Por ningún motivo se pueden mostrar las
              evidencias de un ticket a otros usuarios del servidor.
            </p>
            <p className="mod-warning">
              <strong>🚫 No hagan nada estúpido y NO filtren información.</strong>
            </p>
            <p>
              En un ticket no siempre nos encontraremos a los usuarios de forma tranquila,
              usualmente pueden estar bastante alterados. En estos casos es importante
              tener paciencia. Si no están en sus cabales, releven el ticket a otro compañero.
            </p>
          </div>

          <div className="mod-card">
            <h3>Tipos de tickets</h3>

            <h4 style={{ color: '#b06040', marginTop: '1rem' }}>📋 Generales</h4>
            <p>Para resolver dudas sobre funciones o información de la comunidad.</p>

            <h4 style={{ color: '#b06040', marginTop: '1rem' }}>🚨 Reportes</h4>
            <p>Para reportar comportamientos inapropiados o violaciones a las reglas.</p>

            <h4 style={{ color: '#b06040', marginTop: '1rem' }}>⚖️ Apelaciones</h4>
            <p>Para apelar sanciones leves. El usuario debe presentar su caso y explicar por qué su sanción debería ser apelada.</p>
          </div>

          <div className="mod-card">
            <h3>Protocolo de atención</h3>
            <ol className="mod-proto-list">
              <li>Saluda al usuario y pregunta por su situación.</li>
              <li>Escucha con atención y analiza el caso.</li>
              <li>Responde con información clara y precisa.</li>
              <li>Si es necesario, pide más información o evidencias.</li>
              <li>Una vez resuelto, pregunta si necesita algo más.</li>
              <li>Cerrado el ticket, procede a eliminarlo si ya no es necesario.</li>
            </ol>
          </div>

        </section>

        <nav className="mod-nav-links">
          <a href="/moderacion" className="mod-nav-link">← Mod Guide</a>
          <a href="/moderacion/guia/texto" className="mod-nav-link">Siguiente →</a>
        </nav>
      </main>
      <Footer />
    </>
  )
}
