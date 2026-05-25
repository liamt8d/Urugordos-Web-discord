'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const cards = [
  {
    id: 'videos',
    title: 'Videos Reacción',
    desc: 'Urugodd reacciona a videos de niveles de Geometry Dash.',
    img: '/cards/videosreaccion.png',
    accent: '#f1463f',
    modal: {
      title: 'Videos Reacción',
      desc: 'Durante el stream, Urugodd ve videos de niveles de Geometry Dash que la comunidad le recomienda y reacciona en vivo. Diversión asegurada viendo sus reacciones a los gameplays más locos.',
      rules: [
        'Manda tu video de GD en el canal de Discord durante el stream.',
        'Urugodd lo ve y reacciona en directo.',
        'Los mejores videos entran a la rotación del siguiente stream.',
      ],
    },
  },
  {
    id: 'memes',
    title: 'Memes Reacción',
    desc: 'Urugodd reacciona a los memes más divertidos del chat.',
    img: '/cards/memesreaccion.png',
    accent: '#fcc148',
    modal: {
      title: 'Memes Reacción',
      desc: 'Los memes que la comunidad comparte son mostrados en stream. Urugodd reacciona y el chat se vuelve loco.',
      rules: [
        'Comparte memes en el canal de Discord durante el stream.',
        'Urugodd los muestra en pantalla y reacciona.',
        'El meme más votado por el chat gana mención especial.',
      ],
    },
  },
  {
    id: 'tiktoks',
    title: 'TikToks Reacción',
    desc: 'Urugodd reacciona a los TikToks más virales del momento.',
    img: '/cards/tiktokreaccion.png',
    accent: '#4f5050',
    modal: {
      title: 'TikToks Reacción',
      desc: 'La comunidad comparte TikToks y Urugodd reacciona en vivo. Risas aseguradas con sus reacciones impredecibles.',
      rules: [
        'Comparte TikToks en el canal designado de Discord.',
        'Urugodd los reproduce en stream y reacciona.',
        'Los TikToks más épicos se repiten en streams futuros.',
      ],
    },
  },
  {
    id: 'norire',
    title: 'Si no me río te baneo',
    desc: 'Urugodd intenta no reírse mientras el chat le manda contenido.',
    img: '/cards/sinomeriotebaneo.png',
    accent: '#da4f5e',
    modal: {
      title: 'Si no me río te baneo',
      desc: 'El clásico desafío de los streams de Urugodd. El chat manda contenido y Urugodd debe aguantar la risa. Si se ríe, alguien se salva. Si no, alguien es baneado.',
      rules: [
        'El chat envía videos, memes o TikToks.',
        'Urugodd intenta no reírse viendo el contenido.',
        'Si se ríe: el que lo envió se salva del ban.',
        'Si no se ríe: el que lo envió es baneado del canal.',
      ],
    },
  },
]

type CardId = 'videos' | 'memes' | 'tiktoks' | 'norire'

export default function DinamicasPage() {
  const [selected, setSelected] = useState<CardId | null>(null)
  const card = selected ? cards.find((c) => c.id === selected) : null

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
            <span className="hero-badge">Dinámicas</span>
            <h1>Dinámicas de Stream</h1>
            <p>Las dinámicas que Urugodd hace en sus streams con la comunidad.</p>
          </div>
        </section>

        <section className="dinamicas-grid">
          {cards.map((c) => (
            <button
              key={c.id}
              className="dinamica-card"
              style={{ '--accent': c.accent } as React.CSSProperties}
              onClick={() => setSelected(c.id as CardId)}
            >
              <div className="dinamica-card-img-wrap">
                <img src={c.img} alt="" className="dinamica-card-img" />
              </div>
              <div className="dinamica-card-body">
                <h3 className="dinamica-card-title">{c.title}</h3>
                <p className="dinamica-card-desc">{c.desc}</p>
              </div>
            </button>
          ))}
        </section>

        <p className="dinamicas-more">Más dinámicas pronto</p>

        {card && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-content" style={{ '--accent': card.accent } as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <img src={card.img} alt="" className="modal-img" />
              <h2 className="modal-title" style={{ color: card.accent }}>{card.modal.title}</h2>
              <p className="modal-desc">{card.modal.desc}</p>
              <ul className="modal-rules">
                {card.modal.rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style>{`
        .dinamicas-more {
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          opacity: 0.4;
          padding-bottom: 5rem;
          margin-top: -2rem;
        }
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
        .dinamicas-grid {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .dinamicas-grid { grid-template-columns: 1fr; }
        }
        .dinamica-card {
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
        .dinamica-card::before {
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
        .dinamica-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .dinamica-card:hover::before {
          opacity: 1;
        }
        .dinamica-card-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .dinamica-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dinamica-card-body {
          padding: 1.25rem;
          flex: 1;
        }
        .dinamica-card-title {
          font-family: 'Cinzel', serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: #fff;
        }
        .dinamica-card-desc {
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
        }
        .modal-close:hover {
          background: rgba(255,255,255,0.12);
        }
        .modal-close svg {
          width: 1.2rem;
          height: 1.2rem;
        }
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
        }
        .modal-desc {
          font-size: 0.95rem;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .modal-rules {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .modal-rules li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85rem;
          opacity: 0.7;
          line-height: 1.4;
        }
        .modal-rules li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent, #b06040);
          flex-shrink: 0;
          margin-top: 0.45em;
        }
      `}</style>
    </>
  )
}
