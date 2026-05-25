'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getTipo, getSecciones } from '@/data/preguntas'
import type { Pregunta } from '@/data/preguntas'
import { useState, useCallback, useRef } from 'react'

export default function FormularioPage() {
  const { tipo } = useParams<{ tipo: string }>()
  const tipoData = getTipo(tipo)
  const secciones = tipoData ? getSecciones(tipoData.preguntas) : []
  const totalPreguntas = tipoData?.preguntas.length ?? 0
  const [currentSeccion, setCurrentSeccion] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleRespuesta = useCallback((globalIndex: number, value: string) => {
    setRespuestas(prev => ({ ...prev, [`respuesta-${globalIndex}`]: value }))
  }, [])

  const validarSeccion = useCallback((index: number): boolean => {
    const seccion = secciones[index]
    if (!seccion) return true
    for (let pi = 0; pi < seccion.preguntas.length; pi++) {
      const globalIndex = secciones.slice(0, index).reduce((acc, s) => acc + s.preguntas.length, 0) + pi
      const key = `respuesta-${globalIndex}`
      const isLast = globalIndex === totalPreguntas - 1
      if (!isLast && !respuestas[key]?.trim()) {
        alert(`Responde la pregunta ${globalIndex + 1}`)
        return false
      }
    }
    return true
  }, [secciones, respuestas, totalPreguntas])

  const mostrarSeccion = useCallback((index: number) => {
    setCurrentSeccion(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSiguiente = useCallback(() => {
    if (validarSeccion(currentSeccion)) {
      mostrarSeccion(currentSeccion + 1)
    }
  }, [currentSeccion, validarSeccion, mostrarSeccion])

  const handleAnterior = useCallback(() => {
    mostrarSeccion(currentSeccion - 1)
  }, [currentSeccion, mostrarSeccion])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    for (let i = 0; i < secciones.length; i++) {
      if (!validarSeccion(i)) {
        mostrarSeccion(i)
        return
      }
    }

    const userId = prompt('Ingresa tu ID de Discord (para identificar tu postulación):')
    if (!userId?.trim()) {
      alert('Necesitamos tu ID de Discord para continuar.')
      return
    }

    const userName = prompt('Ingresa tu nombre de usuario de Discord (ej: nombre#0000):') || ''

    const respuestasList = tipoData!.preguntas.map((p, i) => ({
      pregunta: p.pregunta,
      respuesta: respuestas[`respuesta-${i}`] || '',
    }))

    setEnviando(true)

    try {
      const res = await fetch('/api/postular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          userId: userId.trim(),
          userName: userName.trim(),
          respuestas: respuestasList,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setEnviado(true)
      } else {
        alert('Error: ' + (data.error || 'No se pudo enviar la postulación'))
      }
    } catch {
      alert('Error de conexión. Verifica que el servidor esté funcionando.')
    } finally {
      setEnviando(false)
    }
  }, [secciones, validarSeccion, mostrarSeccion, respuestas, tipoData, tipo])

  if (!tipoData) {
    return (
      <>
        <Header />
        <main className="form-page">
          <section className="form-header">
            <h1>❌ Tipo de postulación no válido</h1>
            <a href="/postular" className="back-link">← Elegir otro rol</a>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  if (enviado) {
    return (
      <>
        <Header />
        <main className="form-page">
          <form className="postulacion-form">
            <div className="exito">
              <span className="exito-icon">✅</span>
              <h2>¡Postulación enviada con éxito!</h2>
              <p>Tu postulación ha sido registrada. El equipo la revisará y te contactará si es necesario.</p>
              <a href="/" className="btn-nav btn-primary">Volver al inicio</a>
            </div>
          </form>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="form-page">
        <>
          <section className="form-header">
            <a href="/postular" className="back-link">← Volver</a>
            <span className="form-icon">{tipoData.icono}</span>
            <h1>Postulación: {tipoData.nombre}</h1>
            <p className="form-desc">{tipoData.descripcion.replace(/\*\*/g, '').split('\n').filter(l => l.trim()).join(' · ')}</p>
            <div className="form-meta">
              <span>📝 {totalPreguntas} preguntas</span>
              <span>📑 {secciones.length} secciones</span>
            </div>
          </section>

          <form ref={formRef} onSubmit={handleSubmit} className="postulacion-form">
            <div className="seccion-indicator">
              {secciones.map((s, i) => (
                <button type="button" key={i}
                  className={`seccion-btn ${i === currentSeccion ? 'active' : ''}`}
                  onClick={() => {
                    if (i > currentSeccion && !validarSeccion(currentSeccion)) return
                    mostrarSeccion(i)
                  }}>
                  <span className="seccion-num">{i + 1}</span>
                  <span className="seccion-label">{s.nombre.split('(')[0].trim()}</span>
                </button>
              ))}
            </div>

            {secciones.map((seccion, si) => (
              <div key={si} className="seccion-content" style={{ display: si === currentSeccion ? 'block' : 'none' }}>
                <div className="seccion-header">
                  <h2>{seccion.nombre}</h2>
                </div>

                <div className="preguntas-list">
                  {seccion.preguntas.map((p: Pregunta, pi: number) => {
                    const globalIndex = secciones.slice(0, si).reduce((acc, s) => acc + s.preguntas.length, 0) + pi
                    return (
                      <div key={globalIndex} className="pregunta-card">
                        <div className="pregunta-header">
                          <span className="pregunta-num">{globalIndex + 1}</span>
                          <div className="pregunta-texto">
                            <label>{p.pregunta}</label>
                            {p.descripcion && <span className="pregunta-desc">{p.descripcion}</span>}
                          </div>
                        </div>
                        <div className="pregunta-input">
                          {p.tipo === 'opcion' && p.opciones ? (
                            <div className="opciones-grid">
                              {p.opciones.map((op) => (
                                <label key={op} className={`opcion-label ${respuestas[`respuesta-${globalIndex}`] === op ? 'selected' : ''}`}>
                                  <input
                                    type="radio"
                                    name={`respuesta-${globalIndex}`}
                                    value={op}
                                    checked={respuestas[`respuesta-${globalIndex}`] === op}
                                    onChange={() => handleRespuesta(globalIndex, op)}
                                  />
                                  <span className="opcion-text">{op}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <textarea
                              className="form-textarea"
                              value={respuestas[`respuesta-${globalIndex}`] || ''}
                              onChange={(e) => handleRespuesta(globalIndex, e.target.value)}
                              rows={3}
                              placeholder="Escribe tu respuesta aquí..."
                            />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="form-nav">
              {currentSeccion > 0 && (
                <button type="button" className="btn-nav" onClick={handleAnterior}>← Anterior</button>
              )}
              {currentSeccion < secciones.length - 1 ? (
                <button type="button" className="btn-nav btn-primary" onClick={handleSiguiente}>Siguiente →</button>
              ) : (
                <button type="submit" className="btn-nav btn-submit" disabled={enviando}>
                  {enviando ? '⏳ Enviando...' : '📨 Enviar Postulación'}
                </button>
              )}
            </div>
          </form>
        </>
      </main>
      <Footer />
    </>
  )
}
