'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface StaffMember {
  id: string
  name: string
  avatar: string | null
}

interface StaffRole {
  name: string
  id: number
  color: string | null
  members: StaffMember[]
}

export default function StaffPage() {
  const [roles, setRoles] = useState<StaffRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/staff')
      .then((res) => res.json())
      .then((data) => {
        if (data.roles) setRoles(data.roles)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Equipo</span>
            <h1>Nuestro Staff</h1>
            <p>Conoce a todo el equipo detrás de Urugordos.</p>
          </div>
        </section>

        <section className="staff-pyramid" style={{ padding: '0 1rem 5rem' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#606060', padding: '2rem 0' }}>Cargando staff…</p>
          ) : roles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#606060', padding: '2rem 0' }}>
              No hay staff sincronizado. Usa /staffsync en Discord.
            </p>
          ) : (
            roles.map((group) => {
              const color = group.color || '#b06040'
              return (
                <div key={group.id} className="staff-level">
                  <p className="staff-level-label" style={{ '--level-color': color } as React.CSSProperties}>
                    {group.name}
                  </p>
                  <div className="staff-level-cards">
                    {group.members.length === 0 ? (
                      <div className="staff-card staff-card--empty">
                        <p>—</p>
                      </div>
                    ) : (
                      group.members.map((m) => (
                        <div key={m.id} className="staff-card" style={{ '--card-color': color } as React.CSSProperties}>
                          <span aria-hidden="true" className="staff-card-corner staff-card-corner--tl" />
                          <span aria-hidden="true" className="staff-card-corner staff-card-corner--tr" />
                          <span aria-hidden="true" className="staff-card-corner staff-card-corner--bl" />
                          <span aria-hidden="true" className="staff-card-corner staff-card-corner--br" />
                          <img
                            src={m.avatar || '/assets/ugblanco.svg'}
                            alt={m.name}
                            className="staff-card-avatar"
                            loading="lazy"
                          />
                          <h3 className="staff-card-nombre">{m.name}</h3>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
