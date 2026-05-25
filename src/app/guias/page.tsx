'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const guides = [
  {
    title: 'Moderación',
    desc: 'Guía completa para el equipo de moderación: introducción, reglas, herramientas, tickets, texto y voz.',
    href: '/moderacion',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    color: '#6080c0',
    status: 'ready' as const,
  },
  {
    title: 'Niveles y XP',
    desc: 'Cómo funciona el sistema de niveles, experiencia por mensaje y voz, y cómo subir de rango.',
    href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    color: '#b06040',
    status: 'soon' as const,
  },
  {
    title: 'Personalización',
    desc: 'Roles de color, canales opt-in y cómo adaptar el servidor a tu gusto.',
    href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    color: '#f477d5',
    status: 'soon' as const,
  },
  {
    title: 'Eventos y Dinámicas',
    desc: 'Participación en eventos del servidor, dinámicas semanales y sorteos.',
    href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    color: '#50c878',
    status: 'soon' as const,
  },
  {
    title: 'Convivencia',
    desc: 'Buenas prácticas, cultura del servidor y cómo aprovechar al máximo tu estadía.',
    href: '#',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    color: '#e8c840',
    status: 'soon' as const,
  },
]

export default function GuiasPage() {
  const [modal, setModal] = useState<string | null>(null)

  const close = useCallback(() => setModal(null), [])

  useEffect(() => {
    if (modal) {
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => { document.documentElement.style.overflow = '' }
  }, [modal])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Guías</span>
            <h1>Guías del Servidor</h1>
            <p>Toda la información que necesitas para disfrutar Urugordos al máximo.</p>
          </div>
        </section>

        <section className="guias-section">
          {guides.map((g) => (
            <a
              key={g.title}
              href={g.href}
              className="guias-card"
              style={{ '--g-color': g.color } as React.CSSProperties}
              onClick={g.status === 'soon' ? (e) => { e.preventDefault(); setModal(g.title) } : undefined}
            >
              <div className="guias-card-top">
                <span className="guias-icon" style={{ color: g.color, background: g.color + '1a' }}>
                  {g.icon}
                </span>
                <span className="guias-title">{g.title}</span>
                {g.status === 'soon' && <span className="guias-badge">Próximamente</span>}
              </div>
              <p className="guias-desc">{g.desc}</p>
              {g.status === 'ready' && <span className="guias-arrow">→</span>}
            </a>
          ))}
        </section>
      </main>

      {modal && (
        <div className="guias-overlay" onClick={close}>
          <div className="guias-modal" onClick={(e) => e.stopPropagation()}>
            <button className="guias-modal-x" onClick={close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="1.1rem" height="1.1rem"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <span className="guias-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </span>
            <span className="guias-modal-title">{modal}</span>
            <p className="guias-modal-desc">Esta guía se agregará pronto. ¡Mantente atento!</p>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        html { scrollbar-gutter: stable; }
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
        .guias-section {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
          gap: 1rem;
        }
        .guias-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s;
          position: relative;
        }
        .guias-card:hover {
          border-color: var(--g-color, #b06040);
          background: rgba(255,255,255,0.06);
        }
        .guias-card-top {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .guias-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .guias-icon svg {
          width: 1.2rem;
          height: 1.2rem;
        }
        .guias-title {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
          flex: 1;
        }
        .guias-badge {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--g-color, #b06040);
          border: 1px solid var(--g-color, #b06040);
          border-radius: 999px;
          padding: 0.15rem 0.5rem;
          opacity: 0.7;
        }
        .guias-desc {
          font-size: 0.8rem;
          opacity: 0.5;
          line-height: 1.6;
          margin: 0;
        }
        .guias-arrow {
          align-self: flex-end;
          color: var(--g-color, #b06040);
          font-weight: 700;
          opacity: 0.4;
          transition: opacity 0.2s;
        }
        .guias-card:hover .guias-arrow {
          opacity: 1;
        }
        .guias-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: guias-fade-in 0.2s ease;
        }
        .guias-modal {
          background: #1e2630;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
          padding: 2.5rem 2rem 2rem;
          max-width: 24rem;
          width: 100%;
          text-align: center;
          position: relative;
          animation: guias-modal-in 0.3s ease;
        }
        .guias-modal-x {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          border: none;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .guias-modal-x:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .guias-modal-icon {
          display: inline-flex;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: #b060401a;
          color: #b06040;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .guias-modal-icon svg {
          width: 1.5rem;
          height: 1.5rem;
        }
        .guias-modal-title {
          display: block;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .guias-modal-desc {
          font-size: 0.85rem;
          opacity: 0.5;
          line-height: 1.6;
          margin: 0;
        }
        @keyframes guias-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes guias-modal-in {
          from { opacity: 0; transform: scale(0.9) translateY(1rem); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}
