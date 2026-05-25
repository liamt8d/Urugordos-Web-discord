'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Postulacion {
  _id: string
  user_id: string
  user_name?: string
  tipo: string
  estado: string
  fecha: number | string
  respuestas?: { pregunta: string; respuesta: string }[]
  motivo_revision?: string
  revisor_id?: string
}

const tipoIcon: Record<string, string> = { staff: '🛡️', developer: '💻', disenador: '🎨', tickets: '🎫' }
const tipoNombre: Record<string, string> = { staff: 'Staff', developer: 'Developer', disenador: 'Diseñador', tickets: 'Tickets' }

function formatFecha(fecha: number | string): string {
  if (!fecha) return '—'
  if (typeof fecha === 'number') {
    const ms = fecha > 1e12 ? fecha : fecha * 1000
    return new Date(ms).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
  return new Date(fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export default function AdminPostulacionesPage() {
  const router = useRouter()
  const [docs, setDocs] = useState<Postulacion[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('')

  const token = getCookie('discord_token')

  const cargarPostulaciones = useCallback(async (estado = '') => {
    setLoading(true)
    try {
      const url = `/api/admin/postulaciones${estado ? `?estado=${estado}` : ''}`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setDocs(Array.isArray(data) ? data : [])
    } catch {
      setDocs([])
    } finally {
      setLoading(false)
    }
  }, [token, router])

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
      return
    }
    cargarPostulaciones(filtro)
  }, [token, router, filtro, cargarPostulaciones])

  const cambiarEstado = async (id: string, estado: string) => {
    const card = document.querySelector(`[data-id="${id}"]`)
    const motivoInput = card?.querySelector('.motivo-input-custom') as HTMLInputElement
    const motivo = motivoInput?.value || ''

    try {
      const res = await fetch('/api/admin/postulaciones', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, estado, motivo }),
      })
      if (res.ok) {
        cargarPostulaciones(filtro)
      } else {
        alert('Error al cambiar estado')
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const cerrarSesion = async (e: React.MouseEvent) => {
    e.preventDefault()
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <>
      <Header />
      <main className="admin-page">
        <section className="admin-header">
          <a href="/admin" className="logout-link" onClick={cerrarSesion} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="0.85rem" height="0.85rem"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Cerrar sesión</a>
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#F5ED76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.8rem" height="1.8rem"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>
            Panel de Postulaciones</h1>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <a href="/admin" className="filter-btn" style={{ textDecoration: 'none' }}>← Volver al panel</a>
            <a href="/admin/apelaciones" className="filter-btn" style={{ textDecoration: 'none' }}>⚖️ Ir a Apelaciones</a>
          </div>
          <div className="admin-filters">
            {['', 'en_espera', 'aceptada', 'rechazada', 'abandonada'].map((estado) => {
              const labels: Record<string, string> = { '': 'Todas', en_espera: '⏳ En espera', aceptada: '✅ Aceptadas', rechazada: '❌ Rechazadas', abandonada: '⏰ Abandonadas' }
              return (
                <button key={estado} className={`filter-btn ${filtro === estado ? 'active' : ''}`} onClick={() => setFiltro(estado)}>
                  {labels[estado]}
                </button>
              )
            })}
          </div>
        </section>

        <section className="admin-list">
          {loading ? (
            <div className="loading">Cargando postulaciones...</div>
          ) : docs.length === 0 ? (
            <div className="empty">No hay postulaciones para mostrar.</div>
          ) : (
            docs.map((doc) => (
              <div key={doc._id} className="postulacion-card" data-id={doc._id}>
                <div className="postulacion-header">
                  <div className="postulacion-info">
                    <span className="postulacion-user">{doc.user_name || doc.user_id}</span>
                    <span className="postulacion-id">{doc.user_id}</span>
                  </div>
                  <span className={`postulacion-badge estado-${doc.estado}`}>
                    {doc.estado === 'en_espera' ? '⏳' : doc.estado === 'aceptada' ? '✅' : doc.estado === 'rechazada' ? '❌' : '⏰'} {doc.estado.replace('_', ' ')}
                  </span>
                </div>
                <div className="postulacion-meta">
                  <span>{tipoIcon[doc.tipo] || '📋'} {tipoNombre[doc.tipo] || doc.tipo}</span>
                  <span>📅 {formatFecha(doc.fecha)}</span>
                  <span>👤 ID: {doc.user_id}</span>
                </div>
                {doc.respuestas && (
                  <details className="postulacion-respuestas">
                    <summary>Ver respuestas ({doc.respuestas.length})</summary>
                    <div className="respuestas-list">
                      {doc.respuestas.map((r, i) => (
                        <div key={i} className="respuesta-item">
                          <strong>{i + 1}. {r.pregunta}</strong>
                          <p>{r.respuesta || <em>Sin respuesta</em>}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
                {doc.estado === 'en_espera' ? (
                  <div className="postulacion-acciones">
                    <input type="text" className="motivo-input-custom" placeholder="Motivo (opcional)" />
                    <div className="acciones-btns">
                      <button className="btn-aceptar" onClick={() => cambiarEstado(doc._id, 'aceptada')}>✅ Aceptar</button>
                      <button className="btn-rechazar" onClick={() => cambiarEstado(doc._id, 'rechazada')}>❌ Rechazar</button>
                    </div>
                  </div>
                ) : doc.motivo_revision ? (
                  <div className="postulacion-motivo">
                    <strong>Motivo:</strong> {doc.motivo_revision}
                  </div>
                ) : null}
                {doc.revisor_id && (
                  <div className="postulacion-revision">Revisado por: {doc.revisor_id}</div>
                )}
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
