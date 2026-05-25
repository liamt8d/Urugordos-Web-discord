'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useRef, useCallback } from 'react'

interface Project {
  title: string
  icon: string
  color: string
  desc: string
  details?: { label: string; value: string }[]
  note?: string
  href?: string
}

const projects: Project[] = [
  {
    title: 'Generación 2 de URUBOTS',
    icon: '🤖',
    color: '#6080c0',
    desc: 'Nueva versión de los bots de Urugordos con más funciones, mejor rendimiento y nueva experiencia.',
    details: [
      { label: 'Estado', value: 'Lanzado' },
      { label: 'Comandos', value: 'Moderación, niveles, economía, tickets' },
      { label: 'Lenguaje', value: 'JavaScript y Python' },
    ],
    note: 'Ya disponible en el servidor.',
  },
  {
    title: 'Urugordos WEB',
    icon: '🌐',
    color: '#b06040',
    desc: 'La plataforma web de la comunidad. Esta misma página, en constante evolución.',
    details: [
      { label: 'Framework', value: 'Next.js 15 con App Router' },
      { label: 'Frontend', value: 'React, TypeScript, CSS modules' },
      { label: 'Backend', value: 'API Routes, MongoDB, Discord Bot' },
    ],
    note: 'En mejora continua.',
  },
  {
    title: 'Más proyectos en camino',
    icon: '🚀',
    color: '#60b080',
    desc: 'Estamos trabajando en nuevas ideas para la comunidad. Pronto más novedades.',
    details: [
      { label: 'Sorteos', value: 'Sistema automatizado de sorteos' },
      { label: 'Eventos', value: 'Calendario y gestión de eventos' },
      { label: 'Estadísticas', value: 'Panel con métricas del servidor' },
    ],
    note: '¿Tienes una idea? Compártela con el staff.',
  },
  {
    title: 'Donar',
    icon: '❤️',
    color: '#d04060',
    desc: 'Apoya económicamente al proyecto y ayuda a mantener todo funcionando.',
    href: '/donar',
    note: 'Recompensas exclusivas por tu apoyo.',
  },
]

export default function ProyectosPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const heights = useRef<Record<number, number>>({})

  const measure = useCallback((i: number, el: HTMLDivElement | null) => {
    if (el) {
      heights.current[i] = el.scrollHeight
    }
  }, [])

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i)
  }, [])

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Proyectos</span>
            <h1>Proyectos</h1>
            <p>Proyectos de la comunidad Urugordos.</p>
          </div>
        </section>

        <section className="page-section">
          <div className="info-section">
            {projects.map((p, i) =>
              p.href ? (
                <a key={p.title} href={p.href} className="proyecto-card-link" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
                  <span className="proyecto-icon">{p.icon}</span>
                  <div className="proyecto-body">
                    <h3 className="proyecto-title" style={{ color: p.color }}>{p.title}</h3>
                    <p className="proyecto-desc">{p.desc}</p>
                    {p.note && <p className="proyecto-note">{p.note}</p>}
                  </div>
                  <span className="proyecto-arrow" style={{ color: p.color }}>→</span>
                </a>
              ) : (
                <div key={p.title} className="proyecto-card" style={{ borderColor: openIndex === i ? p.color : 'rgba(255,255,255,0.08)' }}>
                  <button onClick={() => toggle(i)} className="proyecto-btn">
                    <span className="proyecto-icon">{p.icon}</span>
                    <div className="proyecto-body">
                      <h3 className="proyecto-title" style={{ color: p.color }}>{p.title}</h3>
                      <p className="proyecto-desc">{p.desc}</p>
                      {p.note && openIndex !== i && <p className="proyecto-note">{p.note}</p>}
                    </div>
                    <span className="proyecto-chevron" style={{ color: p.color, fontSize: '1rem' }} data-open={openIndex === i}>▾</span>
                  </button>

                  <div className="proyecto-collapse" style={{
                    maxHeight: openIndex === i ? (heights.current[i] || 999) + 'px' : '0',
                    opacity: openIndex === i ? 1 : 0,
                  }}>
                    <div ref={el => measure(i, el)} className="proyecto-details">
                      {p.details?.map(d => (
                        <div key={d.label} className="proyecto-detail-row">
                          <span className="proyecto-detail-label">{d.label}</span>
                          <span className="proyecto-detail-value">{d.value}</span>
                        </div>
                      ))}
                      {p.note && <p className="proyecto-note-italic">{p.note}</p>}
                    </div>
                  </div>
                </div>
              )
            )}
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
