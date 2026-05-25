'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sorteos = [
  {
    id: 'nitro',
    title: 'SORTEO DISCORD NITRO',
    desc: 'Gana un Discord Nitro totalmente gratis.',
    img: '/cards/discordnitro.png',
    accent: '#f477d5',
    badge: 'ACTIVO',
    modal: {
      title: 'SORTEO DISCORD NITRO',
      desc: 'Buenas tardes muchachoooss, espero que se encuentren 10/10.',
      body: 'En agradecimiento al apoyo que le están dando al servidor queremos hacer el primer sorteo de un <strong>DISCORD NITRO</strong> para los más activos.',
      subtitle: '❓ ¿Cómo participo en el sorteo?',
      rules: [
        'Para participar en el sorteo primero deberán llegar al <strong>NIVEL 30</strong> en canales de voz, es decir, hay que meterse en llamada para farmear XP.',
      ],
      note: 'Así de fácil pueden ganar un Discord Nitro <strong>TOTALMENTE GRATIS</strong>. <em>(El sorteo se hará cuando 10 personas lleguen al nivel requerido).</em>',
    },
  },
]

type SorteoId = 'nitro'

export default function SorteosPage() {
  const [selected, setSelected] = useState<SorteoId | null>(null)
  const sorteo = selected ? sorteos.find((s) => s.id === selected) : null

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [selected])

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Sorteos</span>
            <h1>Sorteos del Servidor</h1>
            <p>Premios y sorteos exclusivos para la comunidad.</p>
          </div>
        </section>

        <section className="sorteos-grid">
          {sorteos.map((s) => (
            <button
              key={s.id}
              className="sorteo-card"
              style={{ '--accent': s.accent } as React.CSSProperties}
              onClick={() => setSelected(s.id as SorteoId)}
            >
              <div className="sorteo-card-img-wrap">
                <img src={s.img} alt="" className="sorteo-card-img" />
              </div>
              <div className="sorteo-card-body">
                <span className="sorteo-card-badge" style={{ background: s.accent }}>{s.badge}</span>
                <h3 className="sorteo-card-title">{s.title}</h3>
                <p className="sorteo-card-desc">{s.desc}</p>
              </div>
            </button>
          ))}
        </section>

        <p className="sorteos-more">Más sorteos en camino</p>

        {sorteo && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-content" style={{ '--accent': sorteo.accent } as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <img src={sorteo.img} alt="" className="modal-img" />
              <h2 className="modal-title">{sorteo.modal.title}</h2>
              <p className="modal-desc">{sorteo.modal.desc}</p>
              <p className="modal-body" dangerouslySetInnerHTML={{ __html: sorteo.modal.body }} />
              <h3 className="modal-subtitle">{sorteo.modal.subtitle}</h3>
              <ul className="modal-rules">
                {sorteo.modal.rules.map((r, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: r }} />
                ))}
              </ul>
              <p className="modal-note" dangerouslySetInnerHTML={{ __html: sorteo.modal.note }} />
            </div>
          </div>
        )}
      </main>
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
        .sorteos-grid {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .sorteos-more {
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          opacity: 0.4;
          padding-bottom: 5rem;
          margin-top: -0.5rem;
        }
        .sorteo-card {
          display: flex;
          flex-direction: column;
          border-radius: 1rem;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          color: inherit;
          font: inherit;
          padding: 0;
          position: relative;
        }
        .sorteo-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0.6;
          transition: opacity 0.3s;
          z-index: 1;
        }
        .sorteo-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .sorteo-card:hover::before { opacity: 1; }
        .sorteo-card-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .sorteo-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .sorteo-card-body {
          padding: 1.25rem;
          flex: 1;
        }
        .sorteo-card-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .sorteo-card-title {
          font-family: 'Cinzel', serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: #fff;
        }
        .sorteo-card-desc {
          font-size: 0.85rem;
          opacity: 0.6;
          line-height: 1.5;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
          animation: modalFadeIn 0.2s ease;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          background: #1a1a1a;
          border-radius: 1rem;
          max-width: 480px;
          width: 100%;
          padding: 2rem;
          position: relative;
          border: 1px solid rgba(255,255,255,0.06);
          animation: modalScaleIn 0.25s ease;
          max-height: 90vh;
          overflow-y: auto;
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          border: none;
          background: rgba(255,255,255,0.06);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 2;
        }
        .modal-close:hover { background: rgba(255,255,255,0.12); }
        .modal-close svg { width: 1.2rem; height: 1.2rem; }
        .modal-img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .modal-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--accent);
        }
        .modal-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }
        .modal-body {
          font-size: 0.95rem;
          opacity: 0.85;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .modal-body strong { color: #fff; }
        .modal-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 1.25rem 0 0.75rem;
          color: #fff;
        }
        .modal-rules {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .modal-rules li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.5;
        }
        .modal-rules li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          margin-top: 0.5em;
        }
        .modal-rules li strong { color: #fff; }
        .modal-note {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.6;
          font-style: italic;
        }
        .modal-note strong { color: #fff; }
      `}</style>
    </>
  )
}
