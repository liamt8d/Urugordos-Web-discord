'use client'

import { useState, useEffect, useRef, useId } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const levels = [
  { level: 3, color: '#555555' },
  { level: 5, color: '#808080' },
  { level: 10, color: '#22c55e' },
  { level: 20, color: '#8B5CF6' },
  { level: 30, color: '#f1463f' },
  { level: 40, color: '#ec4899' },
  { level: 50, color: '#F5ED76' },
  { level: 60, color: '#f477d5' },
  { level: 70, color: '#8B5CF6' },
  { level: 80, color: '#f59e0b' },
  { level: 90, color: '#06b6d4' },
  { level: 100, color: '#F5ED76' },
]

const MAP_H = 1100
const CX = 200
const BRANCH_W = 140
const NODE_Y = (i: number) => (i / (levels.length - 1)) * MAP_H

const specialRoles = [
  { name: 'Nitro Booster', color: '#f477d5' },
  { name: 'Momero', color: '#fcc148' },
  { name: 'Artista', color: '#8B5CF6' },
  { name: 'GODD', color: '#F5ED76' },
  { name: 'Mil gordos', color: '#f477d5' },
  { name: 'OG', color: '#b06040' },
  { name: 'VIP', color: '#fcc148' },
  { name: 'YouTube Member', color: '#ff0000' },
]

const staffRoles = [
  { name: 'Owner', color: '#F5ED76', desc: 'Dueño del servidor y creador de contenido.' },
  { name: 'Manager', color: '#FF0000', desc: 'Gestión general del servidor y la comunidad.' },
  { name: 'Jefe de Moderación', color: '#FF0000', desc: 'Supervisa y coordina al equipo de moderación.' },
  { name: 'Administrador', color: '#00AAFF', desc: 'Administración y configuración del servidor.' },
  { name: 'Moderador', color: '#00AAFF', desc: 'Moderación del chat y canales de voz.' },
  { name: 'Trial MOD', color: '#55FF55', desc: 'Moderador en período de prueba.' },
  { name: 'Soporte Tickets', color: '#FFAA00', desc: 'Atención a tickets y soporte a la comunidad.' },
]

export default function RolesPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const clipId = useId()
  const [clipY, setClipY] = useState(0)
  const [clipH, setClipH] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const top = rect.top
      const visibleStart = Math.max(0, -top)
      const visibleEnd = Math.min(rect.height, viewH - top)
      setClipY(visibleStart)
      setClipH(Math.max(0, visibleEnd - visibleStart))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const branchX = (i: number) => i % 2 === 0 ? CX - BRANCH_W : CX + BRANCH_W

  const pathD = levels.reduce((acc, _, i) => {
    const y = NODE_Y(i)
    const bx = branchX(i)
    return acc + `M ${CX} ${y} L ${bx} ${y} `
  }, `M ${CX} 0 L ${CX} ${MAP_H} `)

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Roles</span>
            <h1>Roles del Servidor</h1>
            <p>Sube de nivel y desbloquea roles exclusivos.</p>
          </div>
        </section>

        {/* Concept map */}
        <section ref={sectionRef} className="map-section">
          <h2 className="map-title">Niveles de Experiencia</h2>
          <p className="map-desc">Gana XP en canales de voz y chat para subir de nivel.</p>
          <div className="map-container" style={{ height: MAP_H }}>
            <svg className="map-lines" viewBox={`0 0 400 ${MAP_H}`} preserveAspectRatio="none">
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y={clipY} width="400" height={clipH} />
                </clipPath>
              </defs>
              <path d={pathD} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <path d={pathD} fill="none" stroke="#b06040" strokeWidth="2.5" clipPath={`url(#${clipId})`} strokeLinecap="round" />
            </svg>
            {levels.map((lvl, i) => {
              const side = i % 2 === 0 ? 'left' : 'right'
              return (
                <div key={lvl.level} className={`map-node ${side}`} style={{ top: `${(i / (levels.length - 1)) * 100}%` }}>
                  <div className="map-diamond" style={{ borderColor: lvl.color, '--glow': lvl.color } as React.CSSProperties}>
                    <span className="map-lvl" style={{ color: lvl.color }}>{lvl.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <a href="/roles/beneficios" className="map-link">Ver beneficios por nivel →</a>
        </section>

        {/* Special roles */}
        <section className="map-section">
          <h2 className="map-title">Roles Especiales</h2>
          <p className="map-desc">Roles exclusivos con permisos únicos.</p>
          <div className="special-grid">
            {specialRoles.map((r) => (
              <div key={r.name} className="special-card" style={{ '--accent': r.color } as React.CSSProperties}>
                <span className="special-dot" style={{ backgroundColor: r.color }} />
                <span className="special-name">{r.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Staff roles */}
        <section className="map-section">
          <h2 className="map-title">Roles del Staff</h2>
          <p className="map-desc">El equipo que mantiene el servidor funcionando.</p>
          <div className="staff-list">
            {staffRoles.map((r) => (
              <div key={r.name} className="staff-row" style={{ '--accent': r.color } as React.CSSProperties}>
                <div className="staff-bar" />
                <div className="staff-row-info">
                  <span className="staff-row-name">{r.name}</span>
                  <span className="staff-row-desc">{r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
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

        .map-section {
          max-width: 48rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
          text-align: center;
        }
        .map-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .map-desc {
          font-size: 1rem;
          opacity: 0.6;
          margin-bottom: 3rem;
          line-height: 1.5;
        }
        .map-container {
          position: relative;
          max-width: 400px;
          margin: 0 auto;
        }
        .map-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .map-node {
          position: absolute;
          transform: translateY(-50%);
          z-index: 2;
        }
        .map-node.left {
          left: 0;
        }
        .map-node.right {
          right: 0;
        }
        .map-diamond {
          width: 4rem;
          height: 4rem;
          border: 2px solid;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(20,26,33,0.9);
          transform: rotate(45deg);
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 0 0 0 transparent;
        }
        .map-diamond:hover {
          transform: rotate(45deg) scale(1.12);
          box-shadow: 0 0 20px var(--glow);
        }
        .map-lvl {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 1.1rem;
          transform: rotate(-45deg);
        }
        .map-link {
          display: block;
          text-align: center;
          margin-top: 2rem;
          color: #b06040;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .map-link:hover { opacity: 0.7; }

        .special-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          text-align: left;
        }
        @media (max-width: 640px) { .special-grid { grid-template-columns: 1fr; } }

        .special-card {
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .special-card:hover {
          border-color: var(--accent);
          background: rgba(255,255,255,0.06);
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
          font-size: 0.95rem;
        }
        .special-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .special-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .special-name {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .special-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .special-list li {
          position: relative;
          padding-left: 1rem;
          font-size: 0.8rem;
          opacity: 0.65;
          line-height: 1.4;
        }
        .special-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent);
        }

        .staff-list {
          display: flex;
          flex-direction: column;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .staff-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1.25rem;
          background: rgba(255,255,255,0.03);
          transition: background 0.2s;
        }
        .staff-row + .staff-row {
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .staff-row:hover {
          background: rgba(255,255,255,0.06);
        }
        .staff-bar {
          width: 4px;
          height: 1.8rem;
          border-radius: 2px;
          background: var(--accent);
          flex-shrink: 0;
        }
        .staff-row-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .staff-row-name {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .staff-row-desc {
          font-size: 0.85rem;
          opacity: 0.5;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 600px) {
          .staff-row-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.15rem;
          }
        }
      `}</style>
    </>
  )
}
