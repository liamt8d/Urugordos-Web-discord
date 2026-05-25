'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const levelBenefits = [
  { level: 3, color: '#6b7280', items: [] },
  { level: 5, color: '#9ca3af', items: [] },
  { level: 10, color: '#b06040', items: [
    'Permiso para cambiarte el apodo en el servidor.',
    'Adjuntar archivos e imágenes en canales generales.',
    'Enviar enlaces.',
  ]},
  { level: 20, color: '#f59e0b', items: [
    'Permiso para utilizar stickers externos.',
    'Crear hilos públicos.',
  ]},
  { level: 30, color: '#06b6d4', items: [
    'Permiso para utilizar emojis externos.',
    'Acceso a colores (canal de selección de colores).',
  ]},
  { level: 40, color: '#8B5CF6', items: [
    'Permiso para utilizar el panel de sonidos de otros servidores.',
    'Habilitar vídeo y retransmitir en canales de voz públicos.',
  ]},
  { level: 50, color: '#f477d5', items: [
    'Permiso para enviar GIFs directamente (sin enlace).',
    'Enviar notas de voz.',
  ]},
  { level: 60, color: '#10b981', items: [
    'Permiso para crear salas (canales de voz) privadas.',
    'Adjuntar multimedia y usar el chat de texto en esos canales de voz personalizados.',
  ]},
  { level: 70, color: '#f97316', items: [
    'Permiso para añadir reacciones a cualquier mensaje.',
    'Crear encuestas.',
    'Crear hilos privados.',
  ]},
  { level: 80, color: '#ec4899', items: [
    'Acceso a gradientes de color.',
  ]},
  { level: 90, color: '#60a5fa', items: [
    'Prioridad en la revisión de sugerencias.',
    'Acceso a canales premium / VIP.',
  ]},
  { level: 100, color: '#F5ED76', items: [
    'Separación en la barra de miembros.',
    'Todos los beneficios anteriores.',
    'Recompensa TOP (a definir por el staff).',
  ]},
]

const specialRoleBenefits = [
  { name: 'Nitro Booster', color: '#f477d5', items: [
    'Separación en la lista de miembros ("Boosters").',
    'Todos los permisos multimedia y de chat (equivalente a nivel 70).',
    'Acceso a canales exclusivos para Boosters.',
    'Rol de color personalizado bajo demanda.',
    'Crear rol custom.',
  ]},
  { name: 'Momero', color: '#fcc148', items: [
    'Permiso prioritario para usar GIFs, Stickers y Emojis externos.',
    'Permiso para usar el panel de sonidos.',
  ]},
  { name: 'Artista', color: '#8B5CF6', items: [
    'Permiso prioritario para adjuntar archivos e imágenes pesadas.',
    'Permiso para crear hilos públicos en canales de arte.',
    'Acceso a canal #galería-artistas.',
    'Enviar enlaces a sus portafolios.',
  ]},
  { name: 'YouTube Member', color: '#ff0000', items: [
    'Beneficios de hasta nivel 30.',
    'x0.5 multiplicador de XP.',
  ]},
]

export default function BeneficiosPage() {
  const [open, setOpen] = useState<string | number | null>(null)

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Beneficios</span>
            <h1>Beneficios por Nivel</h1>
            <p>Todo lo que desbloqueas al subir de nivel en el servidor.</p>
          </div>
        </section>

        <section className="benef-section">
          <div className="benef-list">
            {levelBenefits.map((b) => (
              <div key={b.level} className="benef-card" style={{ '--accent': b.color } as React.CSSProperties}>
                <button className="benef-header" onClick={() => setOpen(open === b.level ? null : b.level)}>
                  <span className="benef-level">{b.level}</span>
                  <svg className={`benef-arrow ${open === b.level ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div className="benef-collapse" style={{ gridTemplateRows: open === b.level ? '1fr' : '0fr', paddingBottom: open === b.level ? '0.5rem' : '0' }}>
                  <div className="benef-inner">
                    {b.items.length > 0 ? (
                      <ul className="benef-items">
                        {b.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="benef-none">Sin beneficios</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="benef-section" style={{ paddingTop: '2rem' }}>
          <h2 className="map-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Roles Especiales</h2>
          <div className="benef-list">
            {specialRoleBenefits.map((r) => (
              <div key={r.name} className="benef-card special" style={{ '--accent': r.color } as React.CSSProperties}>
                <button className="benef-header" onClick={() => setOpen(open === r.name ? null : r.name)}>
                  <span className="special-dot" style={{ backgroundColor: r.color }} />
                  <span className="special-name" style={{ flex: 1 }}>{r.name}</span>
                  <svg className={`benef-arrow ${open === r.name ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div className="benef-collapse" style={{ gridTemplateRows: open === r.name ? '1fr' : '0fr', paddingBottom: open === r.name ? '0.5rem' : '0' }}>
                  <div className="benef-inner">
                    <ul className="benef-items">
                      {r.items.map((item, i) => (
                        <li key={i} style={{ '--accent': r.color } as React.CSSProperties}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="benef-card special" style={{ '--accent': '#b06040' } as React.CSSProperties}>
              <button className="benef-header" onClick={() => setOpen(open === 'OG' ? null : 'OG')}>
                <span className="special-dot" style={{ backgroundColor: '#b06040' }} />
                <span className="special-name" style={{ flex: 1 }}>OG</span>
                <svg className={`benef-arrow ${open === 'OG' ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="benef-collapse" style={{ gridTemplateRows: open === 'OG' ? '1fr' : '0fr', paddingBottom: open === 'OG' ? '0.5rem' : '0' }}>
                <div className="benef-inner">
                  <ul className="benef-items">
                    <li>Permiso para cambiarte el apodo en el servidor.</li>
                    <li>Adjuntar archivos e imágenes en canales generales.</li>
                    <li>Enviar enlaces.</li>
                    <li>Permiso para utilizar stickers externos.</li>
                    <li>Crear hilos públicos.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="benef-card special" style={{ '--accent': '#fcc148' } as React.CSSProperties}>
              <button className="benef-header" onClick={() => setOpen(open === 'VIP' ? null : 'VIP')}>
                <span className="special-dot" style={{ backgroundColor: '#fcc148' }} />
                <span className="special-name" style={{ flex: 1 }}>VIP</span>
                <svg className={`benef-arrow ${open === 'VIP' ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="benef-collapse" style={{ gridTemplateRows: open === 'VIP' ? '1fr' : '0fr', paddingBottom: open === 'VIP' ? '0.5rem' : '0' }}>
                <div className="benef-inner">
                  <ul className="benef-items">
                    <li>Permiso para cambiarte el apodo en el servidor.</li>
                    <li>Adjuntar archivos e imágenes en canales generales.</li>
                    <li>Enviar enlaces.</li>
                    <li>Permiso para utilizar stickers externos.</li>
                    <li>Crear hilos públicos.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="benef-nav">
          <a href="/roles/beneficios/obtencion" className="benef-nav-link">¿Cómo obtener los roles?</a>
          <a href="/roles" className="benef-back">← Volver a Roles</a>
        </div>
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
        .benef-section {
          max-width: 48rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
        }
        .benef-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .benef-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .benef-card.special {
          border-color: var(--accent);
        }
        .benef-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }
        .benef-card:hover { background: rgba(255,255,255,0.06); }
        .benef-level {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
          flex-shrink: 0;
          min-width: 2.2rem;
        }
        .benef-name {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          flex: 1;
        }
        .benef-arrow {
          width: 1.2rem;
          height: 1.2rem;
          opacity: 0.4;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .benef-arrow.open { transform: rotate(180deg); }
        .benef-collapse {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
          overflow: hidden;
        }
        .benef-inner {
          min-height: 0;
          padding: 0 1.25rem;
        }
        .benef-items {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .benef-items li {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          opacity: 0.7;
          line-height: 1.5;
        }
        .benef-items li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent, #b06040);
        }
        .benef-none {
          font-size: 0.85rem;
          opacity: 0.4;
          font-style: italic;
        }
        .benef-desc {
          font-size: 0.9rem;
          opacity: 0.6;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        .special-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .special-name {
          font-family: 'Onest', sans-serif;
          font-weight: 600;
          font-size: 1rem;
        }
        .map-title {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #fff;
        }
        .benef-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
        }
        .benef-nav-link {
          color: #b06040;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .benef-nav-link:hover { opacity: 0.7; }
        .benef-back {
          color: #b06040;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .benef-back:hover { opacity: 0.7; }
      `}</style>
    </>
  )
}
