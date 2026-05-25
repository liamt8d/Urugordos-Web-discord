import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mod Guide',
  description: 'Guía para moderadores de Urugordos.',
}

export default function ModHomePage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="mod-header">
          <span className="mod-guide-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="2.5rem" height="2.5rem"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </span>
          <h1>Guía para moderadores</h1>
          <p className="mod-version">Mod Guide v1.0.0</p>
          <p className="mod-subtitle">Para ustedes, moderadores.</p>
        </section>

        <section className="mod-content">
          <div className="mod-card">
            <p>
              Bienvenido a la guía de moderación de Urugordos. En este espacio
              encontrarás toda la información necesaria para tu labor como moderador.
            </p>
            <p>
              Si no eres parte del equipo de moderación, ten en cuenta que esta es una guía,
              no una normativa. En todo momento la decisión recaerá sobre el moderador
              responsable.
            </p>
          </div>

          <div className="mod-links-grid">
            <a href="/moderacion/introduccion" className="mod-link-card">
              <span className="mod-link-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V7a2 2 0 0 1 4 0"/><path d="M11 9V5a2 2 0 0 1 4 0"/><path d="M15 7V4a2 2 0 0 1 4 0"/><path d="M17 11V9"/><path d="M3 13l1.5-3L7 11l1.5-3L10 13"/><path d="M3 13v5c0 3 5 4 9 4s9-1 9-4v-5"/></svg>
              </span>
              <span className="mod-link-title">Introducción</span>
              <span className="mod-link-arrow">→</span>
            </a>
            <a href="/moderacion/reglas" className="mod-link-card">
              <span className="mod-link-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16h16V4H4z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>
              </span>
              <span className="mod-link-title">Reglas</span>
              <span className="mod-link-arrow">→</span>
            </a>
            <a href="/moderacion/herramientas" className="mod-link-card">
              <span className="mod-link-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </span>
              <span className="mod-link-title">Herramientas</span>
              <span className="mod-link-arrow">→</span>
            </a>
          </div>

          <div className="mod-card mod-card-muted">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#6080c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.3rem" height="1.3rem"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6v7"/><path d="M9 9l3-3 3 3"/></svg>
              Guía</h3>
            <div className="mod-links-grid" style={{ marginTop: '0.75rem' }}>
              <a href="/moderacion/guia/tickets" className="mod-link-card">
                <span className="mod-link-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9z"/><path d="M8 12h8"/><path d="M10 9H8v6h2"/></svg>
                </span>
                <span className="mod-link-title">Tickets</span>
                <span className="mod-link-arrow">→</span>
              </a>
              <a href="/moderacion/guia/texto" className="mod-link-card">
                <span className="mod-link-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </span>
                <span className="mod-link-title">Texto</span>
                <span className="mod-link-arrow">→</span>
              </a>
              <a href="/moderacion/guia/voz" className="mod-link-card">
                <span className="mod-link-icon" style={{ background: '#6080c01a', color: '#6080c0' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </span>
                <span className="mod-link-title">Voz</span>
                <span className="mod-link-arrow">→</span>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}