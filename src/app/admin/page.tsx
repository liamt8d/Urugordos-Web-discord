'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const panels = [
  {
    href: '/admin/postulaciones',
    title: 'Postulaciones',
    desc: 'Gestiona las postulaciones del servidor',
    color: '#F5ED76',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="2.5rem" height="2.5rem"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>,
  },
  {
    href: '/admin/apelaciones',
    title: 'Apelaciones',
    desc: 'Revisa apelaciones de sanciones',
    color: '#5865F2',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="2.5rem" height="2.5rem"><path d="M12 2v20M6 6h12M6 18h12"/><path d="M18 6l-6 6-6-6"/><path d="M18 18l-6-6-6 6"/></svg>,
  },
]

export default function AdminPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const hasCookie = document.cookie.includes('discord_token=')
    const hasToken = sessionStorage.getItem('admin_token')
    if (!hasCookie && !hasToken) {
      router.replace('/admin/login')
    } else {
      setAuthed(true)
    }
  }, [router])

  const cerrarSesion = async (e: React.MouseEvent) => {
    e.preventDefault()
    sessionStorage.removeItem('admin_token')
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (!authed) return null

  return (
    <>
      <Header />
      <main className="admin-page">
        <section className="admin-admin-hub">
          <a href="/admin/login" className="logout-link" onClick={cerrarSesion} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="0.85rem" height="0.85rem"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Cerrar sesión</a>
          <h1 className="admin-hub-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#F5ED76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.8rem" height="1.8rem"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Panel Administrativo</h1>
          <p className="admin-hub-desc">Elige qué sección quieres gestionar.</p>

          <div className="admin-hub-grid">
            {panels.map((p) => (
              <a key={p.href} href={p.href} className="admin-hub-card" style={{ '--accent': p.color } as React.CSSProperties}>
                <span className="admin-hub-icon" style={{ background: 'transparent' }}>{p.icon}</span>
                <div>
                  <h2 className="admin-hub-card-title">{p.title}</h2>
                  <p className="admin-hub-card-desc">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}