'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ApelarPage() {
  const [form, setForm] = useState({
    userId: '',
    tipoSancion: '',
    motivoSancion: '',
    justificacion: '',
    evidencia: '',
  })
  const [imagenes, setImagenes] = useState<string[]>([])
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const agregarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          const dataUrl = ev.target?.result as string
          setImagenes(prev => [...prev, dataUrl])
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const quitarImagen = (index: number) => {
    const nuevas = [...imagenes]
    nuevas.splice(index, 1)
    setImagenes(nuevas)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!/^\d+$/.test(form.userId)) {
      setError('La ID de Discord debe ser solo números')
      return
    }

    setEnviando(true)

    try {
      const payload = {
        ...form,
        imagenes: imagenes,
      }
      const res = await fetch('/api/apelar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        setEnviado(true)
      } else {
        setError(data.error || 'Error al enviar apelación')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <>
        <Header />
        <main className="form-page">
          <div className="postulacion-form">
            <div className="exito">
              <span className="exito-icon">✅</span>
              <h2>¡Apelación enviada con éxito!</h2>
              <p>Tu apelación ha sido registrada. El equipo la revisará y te contactará si es necesario.</p>
              <a href="/" className="btn-nav btn-primary">Volver al inicio</a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="form-header">
          <a href="/" className="back-link" style={{ textAlign: 'center', display: 'block' }}>← Volver al inicio</a>
          <span className="form-icon">⚖️</span>
          <h1>Apelar una sanción</h1>
          <p className="form-desc">
            Si crees que tu sanción fue injusta o tienes pruebas que demuestren tu inocencia,
            este es el lugar para presentar una apelación. Explica tu situación con claridad
            y respeto y adjunta la información necesaria.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="postulacion-form">
          <div className="preguntas-list">
            <div className="pregunta-card">
              <div className="pregunta-header">
                <span className="pregunta-num">1</span>
                <div className="pregunta-texto">
                  <label>ID de Discord</label>
                  <span className="pregunta-desc">
                    La ID es únicamente numérica (ej. 293504726505357312).
                    Para obtener tu ID activa modo desarrollador en Ajustes de usuario → Avanzado.
                  </span>
                </div>
              </div>
              <input
                type="text"
                name="userId"
                value={form.userId}
                onChange={handleChange}
                className="login-input"
                placeholder="123456789012345678"
                style={{ textAlign: 'left' }}
                required
              />
            </div>

            <div className="pregunta-card">
              <div className="pregunta-header">
                <span className="pregunta-num">2</span>
                <div className="pregunta-texto">
                  <label>Tipo de sanción</label>
                  <span className="pregunta-desc">Especifica qué sanción apelas.</span>
                </div>
              </div>
              <select
                name="tipoSancion"
                value={form.tipoSancion}
                onChange={handleChange}
                className="motivo-input"
                style={{ width: '100%' }}
                required
              >
                <option value="">Selecciona un tipo...</option>
                <option value="baneo">🚫 Baneo</option>
                <option value="kickeo">👢 Kickeo</option>
                <option value="mute">🔇 Mute</option>
                <option value="warn">⚠️ Warn / Advertencia</option>
                <option value="otro">❓ Otro</option>
              </select>
            </div>

            <div className="pregunta-card">
              <div className="pregunta-header">
                <span className="pregunta-num">3</span>
                <div className="pregunta-texto">
                  <label>Motivo de la sanción</label>
                  <span className="pregunta-desc">
                    Explica brevemente los hechos, comenta tu caso incluyendo las infracciones
                    que cometiste y los avisos que recibiste. Trata de ser objetivo.
                  </span>
                </div>
              </div>
              <textarea
                name="motivoSancion"
                value={form.motivoSancion}
                onChange={handleChange}
                className="form-textarea"
                rows={4}
                placeholder="Describe los hechos..."
                required
              />
            </div>

            <div className="pregunta-card">
              <div className="pregunta-header">
                <span className="pregunta-num">4</span>
                <div className="pregunta-texto">
                  <label>Justificación para reconsiderar</label>
                  <span className="pregunta-desc">
                    Reconoce tus errores, cuéntanos por qué decidiste hacer esta apelación
                    y explica por qué deberíamos aceptarla.
                  </span>
                </div>
              </div>
              <textarea
                name="justificacion"
                value={form.justificacion}
                onChange={handleChange}
                className="form-textarea"
                rows={4}
                placeholder="¿Por qué deberíamos reconsiderar tu sanción?"
                required
              />
            </div>

            <div className="pregunta-card">
              <div className="pregunta-header">
                <span className="pregunta-num">5</span>
                <div className="pregunta-texto">
                  <label>Evidencia / enlace</label>
                  <span className="pregunta-desc">
                    Sube imágenes o pega enlaces. Las imágenes se muestran como miniaturas.
                  </span>
                </div>
              </div>
              <label className="file-upload-btn">
                📷 Subir imágenes
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={agregarImagen}
                  style={{ display: 'none' }}
                />
              </label>
              {imagenes.length > 0 && (
                <div className="preview-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {imagenes.map((src, i) => (
                    <div key={i} className="preview-item" style={{ position: 'relative', width: '4rem', height: '4rem' }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <button type="button" onClick={() => quitarImagen(i)} style={{ position: 'absolute', top: -6, right: -6, background: '#b06040', border: 'none', borderRadius: '50%', width: '1.25rem', height: '1.25rem', color: '#fff', cursor: 'pointer', fontSize: '0.7rem', lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <textarea
                name="evidencia"
                value={form.evidencia}
                onChange={handleChange}
                className="form-textarea"
                rows={3}
                placeholder="O pega enlaces a imágenes (opcional)"
              />
            </div>
          </div>

          {error && <p style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

          <div className="form-nav">
            <button type="submit" className="btn-nav btn-submit" disabled={enviando}>
              {enviando ? '⏳ Enviando...' : '📨 Enviar Apelación'}
            </button>
          </div>
        </form>

        <style>{`
          .file-upload-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 0.5rem;
            color: rgba(255,255,255,0.7);
            font-size: 0.85rem;
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s;
            margin-bottom: 0.75rem;
          }
          .file-upload-btn:hover {
            border-color: #b06040;
            background: rgba(176,96,64,0.1);
            color: #fff;
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
}
