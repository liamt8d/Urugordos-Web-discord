'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const targetFormatted = target.toLocaleString('es')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 5)
            setCount(Math.floor(eased * target))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const display = (() => {
    const s = count.toLocaleString('es')
    const diff = targetFormatted.length - s.length
    let result = ''
    for (let i = 0; i < targetFormatted.length; i++) {
      if (targetFormatted[i] === '.') {
        result += '.'
      } else {
        const ci = i - diff
        result += ci < 0 ? '0' : (s[ci] || '0')
      }
    }
    return result
  })()

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{display}</span>
}

const totalStats = 9130000 + 2700000 + 791000 + 247000 + 41000 + 6997
const totalVideos = 920 + 230 + 147 + 4

const projects = [
  { title: 'Si No Me Asusto te Baneo??', video: 'EKHcU-CDSR0' },
  { title: 'Si me rio Sufro Mucho', video: '9ckfam9elZY' },
  { title: 'Si No Me Asusto te Baneo 2??', video: 'p4BXgTKljPY' },
  { title: 'si no me da cringe te baneo ??', video: 'AgSD-hnu7pU' },
  { title: 'este juego me hizo odiar los arboles', video: 'XSkxFHf-syg' },
  { title: 'este juego esta re loco 2', video: 'dKexAsM0PuM' },
  { title: 'no puedo tener hijos por este juego 3', video: 'LajBVK_eZJY' },
  { title: 'GTA SA pero hay CAOS cada 30 segundos (Mod)', video: 'lD3aQUs7K7s' },
  { title: 'Casi Lo Pierdo Todo...', video: 'D6t98tqbeGc' },
  { title: 'Probando Dulces de MEXICO con la pocha', video: '7gHgvk1CpmE' },
  { title: 'Viendo los Disfraces de mis subs 2', video: 'PwIxboVWXV8' },
]

const redes = [
  { name: 'YouTube', handle: 'youtube.com/@Urugodd', desc: 'Producciones y desafíos', color: '#FF0000', url: 'https://youtube.com/@Urugodd' },
  { name: 'YouTube', handle: 'youtube.com/@urugoddos', desc: 'Crecimiento viral', color: '#FF0000', url: 'https://youtube.com/@urugoddos' },
  { name: 'YouTube', handle: 'youtube.com/@urugoddsito', desc: 'Archivo y reacciones', color: '#FF0000', url: 'https://youtube.com/@urugoddsito' },
  { name: 'YouTube', handle: 'youtube.com/@UrugoddCast', desc: 'Charlas extensas', color: '#FF0000', url: 'https://youtube.com/@UrugoddCast' },
  { name: 'Kick', handle: 'kick.com/urugodd', desc: 'Transmisiones en vivo actuales', color: '#53FC19', url: 'https://kick.com/urugodd' },
  { name: 'Twitch', handle: 'twitch.tv/urugodd', desc: 'Histórico de directos', color: '#9146FF', url: 'https://twitch.tv/urugodd' },
  { name: 'Instagram', handle: 'instagram.com/soyurugodd', desc: 'Marca personal y contacto', color: '#E4405F', url: 'https://instagram.com/soyurugodd' },
  { name: 'Twitter', handle: 'x.com/urugodd', desc: 'Comunicación y noticias', color: '#1DA1F2', url: 'https://x.com/urugodd' },
  { name: 'TikTok', handle: 'tiktok.com/@urugodd', desc: 'Video corto viral', color: '#000000', url: 'https://tiktok.com/@urugodd' },
  { name: 'Discord', handle: 'discord.gg/urugodd', desc: 'Comunidad y participación', color: '#5865F2', url: 'https://discord.gg/urugodd' },
  { name: 'WhatsApp', handle: 'WhatsApp', desc: 'Notificaciones directas', color: '#25D366', url: 'https://whatsapp.com/channel/0029Va8vcBzKAwEmmLGZ8U3G' },
  { name: 'Telegram', handle: 't.me/urugodd', desc: 'Difusión masiva', color: '#0088cc', url: 'https://t.me/urugodd' },
  { name: 'Reddit', handle: 'reddit.com/r/urugodd', desc: 'Foro comunitario', color: '#FF4500', url: 'https://reddit.com/r/urugodd' },
  { name: 'Email', handle: 'Urugoddcontact@gmail.com', desc: 'Contacto comercial', color: '#EA4335', url: 'mailto:Urugoddcontact@gmail.com' },
]

export default function UrugoddPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="ug-hero-section">
          <div className="ug-hero-banner-wrap">
            <div className="ug-hero-banner">
              <img src="/banner/urugoddbanner.png" alt="" className="ug-hero-img" />
              <div className="ug-hero-overlay" />
              <div className="ug-hero-gradient" />
            </div>
          </div>
          <div className="ug-hero-titles">
            <h1 className="ug-h1">URUGODD</h1>
            <h2 className="ug-h2">Creador de Contenido Uruguayo</h2>
          </div>
        </section>

        {/* Video + text */}
        <section className="ug-2col">
          <div className="ug-vid-box">
            <a href="https://youtu.be/XSkxFHf-syg" target="_blank" rel="noreferrer" className="ug-thumb-link">
              <img src="https://img.youtube.com/vi/XSkxFHf-syg/maxresdefault.jpg" alt="este juego me hizo odiar los arboles" className="ug-thumb-img" />
              <div className="ug-thumb-overlay">
                <svg viewBox="0 0 68 48" className="ug-play-btn"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>
              </div>
            </a>
          </div>
          <div className="ug-text-box">
            <h2 className="ug-section-title">
              Creo contenido<br />
              <span className="ug-green">Épico</span>
            </h2>
            <p className="ug-desc">Creador de contenido uruguayo. Gameplays, directos y eventos para toda la comunidad.</p>
            <a href="https://www.youtube.com/@Urugodd" target="_blank" rel="noreferrer" className="ug-link">Ver mi canal →</a>
          </div>
        </section>

        {/* Projects carousel */}
        <section className="ug-section-w" style={{ overflow: 'hidden' }}>
          <h2 className="ug-section-title" style={{ marginBottom: '2.5rem', paddingLeft: '1rem' }}>
            Mis <span className="ug-green">últimos videos</span>.
          </h2>
          <div className="ug-marquee">
            <div className="ug-marquee-track">
              {[...projects.slice(4), ...projects.slice(4)].map((p, i) => (
                <a key={`${p.video}-${i}`} href={`https://youtu.be/${p.video}`} target="_blank" rel="noreferrer" className="ug-card">
                  <img src={`https://img.youtube.com/vi/${p.video}/hqdefault.jpg`} alt="" loading="lazy" className="ug-card-img" />
                  <div className="ug-card-footer">
                    <p className="ug-card-title">{p.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About Urugodd */}
        <section className="ug-about">
          <div className="ug-about-inner">
            <div className="ug-about-img-wrap">
              <img src="/images/urugodd.png" alt="Urugodd" className="ug-about-img" />
            </div>
            <div className="ug-about-text">
              <h2 className="ug-section-title" style={{ marginBottom: '1rem' }}>
                Sobre <span className="ug-green">Urugodd</span>
              </h2>
              <p className="ug-about-bio">
                Streamer y creador de contenido uruguayo de YouTube y estrella de TikTok, conocido por sus videos de reacción y clips de juegos. Tiene más de 900.000 seguidores en TikTok.
              </p>
              <p className="ug-about-bio" style={{ fontSize: '1rem', marginTop: '-1rem' }}>
                Brandon Nahuel Monzón — El creador de contenido uruguayo Urugodd creó su canal principal de YouTube el 15 de noviembre de 2021.
              </p>
              <div className="ug-about-grid">
                <div className="ug-about-item">
                  <span className="ug-about-label">Nombre real</span>
                  <span className="ug-about-value">Brandon Nahuel Monzón</span>
                </div>
                <div className="ug-about-item">
                  <span className="ug-about-label">Cumpleaños</span>
                  <span className="ug-about-value">22 de octubre de 2000</span>
                </div>
                <div className="ug-about-item">
                  <span className="ug-about-label">Edad</span>
                  <span className="ug-about-value">25 años</span>
                </div>
                <div className="ug-about-item">
                  <span className="ug-about-label">Signo</span>
                  <span className="ug-about-value">Libra</span>
                </div>
                <div className="ug-about-item">
                  <span className="ug-about-label">Nacimiento</span>
                  <span className="ug-about-value">Canelones, Uruguay</span>
                </div>
                <div className="ug-about-item">
                  <span className="ug-about-label">YouTube</span>
                  <span className="ug-about-value">Desde noviembre 2021</span>
                </div>
              </div>
              <a href="https://www.youtube.com/@Urugodd" target="_blank" rel="noreferrer" className="ug-link" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                Ver su canal →
              </a>
            </div>
          </div>
        </section>

        {/* Mis Redes */}
        <section className="ug-section-w">
          <h2 className="ug-section-title" style={{ marginBottom: '2.5rem' }}>
            Mis <span className="ug-green">redes</span>.
          </h2>
          <div className="ug-redes-grid">
            {redes.map((r) => (
              <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="ug-redes-card" style={{ '--r-color': r.color } as React.CSSProperties}>
                <div className="ug-redes-icon" style={{ '--r-color': r.color, backgroundColor: r.color + '1a' } as React.CSSProperties}>
                  {r.name === 'YouTube' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                  {r.name === 'Kick' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.44 2H4.56C3.15 2 2 3.15 2 4.56v14.88C2 20.85 3.15 22 4.56 22h14.88c1.41 0 2.56-1.15 2.56-2.56V4.56C22 3.15 20.85 2 19.44 2zM17 16.5l-3.5-4.5 3.5-4.5h-3L10.5 12V7H8v10h2.5v-5l3.5 4.5H17z"/></svg>}
                  {r.name === 'Twitch' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.428l-3 3v-3H6.857V1.714h13.714Z"/></svg>}
                  {r.name === 'Instagram' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>}
                  {r.name === 'Twitter' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                  {r.name === 'TikTok' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>}
                  {r.name === 'Discord' && <svg viewBox="0 0 640 512" fill="currentColor"><path d="M524.531 69.836a1.5 1.5 0 0 0-.764-.7A485.065 485.065 0 0 0 404.081 32.03a1.816 1.816 0 0 0-1.923.91 337.461 337.461 0 0 0-14.9 30.6 447.848 447.848 0 0 0-134.426 0 309.541 309.541 0 0 0-15.135-30.6 1.89 1.89 0 0 0-1.924-.91A483.689 483.689 0 0 0 116.085 69.137a1.712 1.712 0 0 0-.788.676C39.068 183.651 18.186 294.69 28.43 404.354a2.016 2.016 0 0 0 .765 1.375A487.666 487.666 0 0 0 176.02 479.918a1.9 1.9 0 0 0 2.063-.676 348.2 348.2 0 0 0 30.039-48.815 1.86 1.86 0 0 0-1.019-2.588 321.173 321.173 0 0 1-45.868-21.853 1.885 1.885 0 0 1-.185-3.126c3.082-2.309 6.166-4.711 9.109-7.137a1.819 1.819 0 0 1 1.9-.256c96.229 43.917 200.41 43.917 295.5 0a1.812 1.812 0 0 1 1.924.233c2.944 2.426 6.027 4.851 9.132 7.16a1.884 1.884 0 0 1-.162 3.126 301.407 301.407 0 0 1-45.89 21.83 1.875 1.875 0 0 0-1 2.611 391.055 391.055 0 0 0 30.014 48.815 1.864 1.864 0 0 0 2.063.7A486.048 486.048 0 0 0 610.7 405.729a1.882 1.882 0 0 0 .765-1.352C623.729 277.594 590.933 167.465 524.531 69.836ZM222.491 337.58c-28.972 0-52.844-26.587-52.844-59.239S193.056 219.1 222.491 219.1c29.665 0 53.306 26.82 52.843 59.239C275.334 310.993 251.924 337.58 222.491 337.58Zm195.38 0c-28.971 0-52.843-26.587-52.843-59.239S388.437 219.1 417.871 219.1c29.667 0 53.307 26.82 52.844 59.239C470.715 310.993 447.538 337.58 417.871 337.58Z"/></svg>}
                  {r.name === 'WhatsApp' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>}
                  {r.name === 'Telegram' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>}
                  {r.name === 'Reddit' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.052 1.587a2.58 2.58 0 0 1 .068.595c0 2.874-3.124 5.203-6.972 5.203S6.23 16.172 6.23 13.292c0-.195.023-.39.068-.584a1.76 1.76 0 0 1-1.086-1.606c0-.968.786-1.754 1.754-1.754.498 0 .92.193 1.227.509 1.18-.85 2.818-1.409 4.622-1.487l.818-3.81a.267.267 0 0 1 .31-.212l3.18.598c.124-.297.412-.508.765-.508zm-6.07 7.262a1.001 1.001 0 0 0-.988.926c-.007.053-.01.107-.01.162 0 .55.446.998.998.998a1 1 0 0 0 .989-1.122 1.002 1.002 0 0 0-.989-.964zm3.142 0a1.001 1.001 0 0 0-1 .998 1 1 0 0 0 .242.66.997.997 0 0 0 .748.334 1 1 0 0 0 .999-.998 1 1 0 0 0-.989-.994zm-4.048 3.546c-.274.008-.516.144-.695.36a3.388 3.388 0 0 0-.542.822c-.325.634-.13 1.376.42 1.696a2.706 2.706 0 0 0 1.84.344c.963-.165 2.064-.065 3.11.14.343.068.696-.16.764-.513.069-.352-.15-.698-.504-.766-.92-.18-1.847-.264-2.663-.126-.835.14-1.694-.063-2.073-.44a.092.092 0 0 0-.015-.01c.254-.521.764-.88 1.358-.97a.57.57 0 0 0-.047-.002c-.36.003-.647.147-.883.34a.516.516 0 0 1-.07.057c-.31-.249-.46-.513-.375-.75.082-.22.33-.394.63-.42.661-.06 1.384.278 2.199.35l.004.001c.48.043 1.008-.276 1.178-.714.185-.476-.06-.997-.347-1.273h-.001c-.31-.299-.8-.478-1.375-.447-.571.032-1.352.248-2.205.626l-.015.007z"/></svg>}
                  {r.name === 'Email' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>}
                </div>
                <div className="ug-redes-info">
                  <span className="ug-redes-name">{r.name}</span>
                  <span className="ug-redes-handle">{r.handle}</span>
                  <span className="ug-redes-desc">{r.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Mis videos más destacados */}
        <section className="ug-section-w">
          <h2 className="ug-section-title" style={{ marginBottom: '2.5rem' }}>
            Mis videos más <span className="ug-green">destacados</span>.
          </h2>
          <div className="ug-feat2-wrap">
            <a href={`https://youtu.be/${projects[0].video}`} target="_blank" rel="noreferrer" className="ug-feat2-main">
              <img src={`https://img.youtube.com/vi/${projects[0].video}/maxresdefault.jpg`} alt="" loading="lazy" className="ug-feat2-img" />
              <div className="ug-feat2-gradient" />
              <div className="ug-feat2-info">
                <span className="ug-feat2-badge">Último video</span>
                <span className="ug-feat2-title">{projects[0].title}</span>
              </div>
            </a>
            <div className="ug-feat2-side">
              {projects.slice(1, 4).map((p) => (
                <a key={p.video} href={`https://youtu.be/${p.video}`} target="_blank" rel="noreferrer" className="ug-feat2-card">
                  <img src={`https://img.youtube.com/vi/${p.video}/hqdefault.jpg`} alt="" loading="lazy" className="ug-feat2-img" />
                  <div className="ug-feat2-gradient" />
                  <span className="ug-feat2-label">{p.title}</span>
                </a>
              ))}
              <a href="https://www.youtube.com/@Urugodd/videos" target="_blank" rel="noreferrer" className="ug-feat2-more">
                Ver más videos →
              </a>
            </div>
          </div>
        </section>

      {/* Stats */}
      <section className="stats-section">
        <h2 className="stats-title"><span className="ug-highlight">URUGODD</span> en <span className="ug-green">números</span></h2>
        <div className="stats-grid">
          <div className="stats-card">
            <span className="stats-card-value">
              <AnimatedCounter target={totalStats} duration={1800000} />
            </span>
            <span className="stats-card-label">seguidores en total</span>
          </div>
          <div className="stats-card">
            <span className="stats-card-value">
              <AnimatedCounter target={totalVideos} duration={1800000} />
            </span>
            <span className="stats-card-label">videos en total</span>
          </div>
        </div>
      </section>
      </main>
      <Footer />

      <style>{`
        .ug-hero-section {
          position: relative;
          padding-top: 3.5rem;
          margin-bottom: 2rem;
          background: #000;
        }
        .ug-hero-banner-wrap {
          margin-bottom: min(25vh, 40vw);
        }
        @media (min-width: 768px) {
          .ug-hero-section {
            margin-bottom: 4rem;
          }
          .ug-hero-banner-wrap {
            margin-bottom: min(15vh, 30vw);
          }
        }
        .ug-hero-banner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 100%;
          max-width: 100vw;
          top: 0;
          left: 0;
          height: min(50vh, 600px);
          z-index: 1;
          overflow: hidden;
        }
        .ug-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ug-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 1;
        }
        .ug-hero-gradient {
          position: absolute;
          display: block;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 25%;
          background: linear-gradient(to top, #141a21, transparent);
          pointer-events: none;
          z-index: 2;
        }
        .ug-gradient-strip {
          height: 4rem;
          background: linear-gradient(to bottom, transparent, #141a21);
        }
        .ug-hero-titles {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 1.25rem 0;
          position: relative;
          z-index: 10;
        }
        .ug-h1 {
          font-family: 'Fantasy Magist', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          text-align: center;
          color: #fff;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
          line-height: 1.2;
        }
        .ug-h2 {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.25rem, 3vw, 2rem);
          color: #fff;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .ug-green {
          background: linear-gradient(to bottom, #bcfe47, #05cc2a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ug-section-w {
          max-width: 1536px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
        }
        .ug-2col {
          max-width: 1536px;
          margin: -2rem auto 0;
          padding: 1.25rem 1.5rem 5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          align-items: center;
          position: relative;
          z-index: 3;
        }
        @media (min-width: 768px) {
          .ug-2col {
            grid-template-columns: 1fr 1fr;
            margin-top: 5rem;
          }
        }
        .ug-vid-box {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 0.75rem;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .ug-thumb-link {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }
        .ug-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ug-thumb-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          transition: background 0.2s;
        }
        .ug-thumb-link:hover .ug-thumb-overlay {
          background: rgba(0,0,0,0.45);
        }
        .ug-play-btn {
          width: 68px;
          height: 48px;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
          transition: transform 0.2s;
        }
        .ug-thumb-link:hover .ug-play-btn {
          transform: scale(1.1);
        }
        .ug-text-box {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: flex-start;
          padding: 0 1rem;
        }
        .ug-section-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .ug-desc {
          font-size: 1.25rem;
          opacity: 0.8;
          line-height: 1.6;
        }
        .ug-link {
          color: #22c55e;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
        }
        .ug-link:hover { opacity: 0.8; }
        .ug-marquee {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
        }
        .ug-marquee-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: ug-scroll 40s linear infinite;
        }
        .ug-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes ug-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ug-card {
          flex: 0 0 auto;
          width: min(320px, 70vw);
          border-radius: 0.5rem;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s;
          display: flex;
          flex-direction: column;
          min-height: 260px;
        }
        .ug-card:hover { transform: scale(1.02); }
        .ug-card-img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
        }
        .ug-card-footer {
          padding: 0.75rem;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255,255,255,0.1);
          flex: 1;
          display: flex;
          align-items: center;
        }
        .ug-card-title {
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          color: #fff;
          font-weight: 600;
        }
        .ug-about {
          max-width: 1536px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
        }
        .ug-about-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .ug-about-inner {
            grid-template-columns: 300px 1fr;
            gap: 4rem;
          }
        }
        @media (min-width: 1024px) {
          .ug-about-inner {
            grid-template-columns: 350px 1fr;
          }
        }
        .ug-about-img-wrap {
          width: 100%;
          max-width: 350px;
          margin: 0 auto;
          border-radius: 1rem;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.08);
          aspect-ratio: 1;
        }
        .ug-about-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ug-about-bio {
          font-size: 1.125rem;
          line-height: 1.7;
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        .ug-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        @media (min-width: 640px) {
          .ug-about-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .ug-about-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .ug-about-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.5;
        }
        .ug-about-value {
          font-size: 1rem;
          font-weight: 600;
        }
        .ug-redes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        @media (min-width: 640px) {
          .ug-redes-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .ug-redes-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1280px) {
          .ug-redes-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .ug-redes-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          text-decoration: none;
          color: inherit;
          transition: all 0.25s;
        }
        .ug-redes-card:hover {
          transform: scale(1.05);
          border-color: var(--r-color);
          background: var(--r-color) !important;
        }
        .ug-redes-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--r-color);
          transition: color 0.25s, background 0.25s;
        }
        .ug-redes-card:hover .ug-redes-icon {
          color: #fff;
          background: transparent;
        }
        .ug-redes-card:hover .ug-redes-name,
        .ug-redes-card:hover .ug-redes-handle,
        .ug-redes-card:hover .ug-redes-desc {
          color: #fff;
        }
        .ug-redes-icon svg {
          width: 1.35rem;
          height: 1.35rem;
        }
        .ug-redes-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .ug-redes-name {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          opacity: 0.5;
        }
        .ug-redes-handle {
          font-size: 0.925rem;
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ug-redes-desc {
          font-size: 0.75rem;
          opacity: 0.45;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ug-redes-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: inherit;
          transition: all 0.25s;
        }
        .ug-redes-card:hover {
          transform: scale(1.05);
          border-color: var(--r-color);
          background: var(--r-color) !important;
        }
        .ug-redes-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ug-redes-icon svg {
          width: 1.35rem;
          height: 1.35rem;
        }
        .ug-redes-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .ug-redes-name {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          opacity: 0.5;
        }
        .ug-redes-handle {
          font-size: 0.925rem;
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ug-redes-desc {
          font-size: 0.75rem;
          opacity: 0.45;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ug-feat2-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        @media (min-width: 768px) {
          .ug-feat2-wrap {
            grid-template-columns: 1.6fr 1fr;
          }
        }
        .ug-feat2-main {
          position: relative;
          border-radius: 0.625rem;
          overflow: hidden;
          display: flex;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(255,255,255,0.06);
          transition: transform 0.3s;
          aspect-ratio: 16/9;
        }
        .ug-feat2-main:hover {
          transform: scale(1.02);
        }
        .ug-feat2-main .ug-feat2-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ug-feat2-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%);
        }
        .ug-feat2-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .ug-feat2-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.7;
          font-weight: 600;
        }
        .ug-feat2-title {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 700;
          line-height: 1.3;
        }
        .ug-feat2-side {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ug-feat2-card {
          position: relative;
          border-radius: 0.5rem;
          overflow: hidden;
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(255,255,255,0.04);
          transition: transform 0.25s;
          aspect-ratio: 16/9;
        }
        @media (min-width: 768px) {
          .ug-feat2-side {
            height: 100%;
          }
          .ug-feat2-card {
            aspect-ratio: auto;
            flex: 1;
            min-height: 0;
          }
        }
        .ug-feat2-card:hover {
          transform: scale(1.03);
        }
        .ug-feat2-card .ug-feat2-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ug-feat2-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.3;
          color: #fff;
        }
        .ug-feat2-more {
          display: block;
          text-align: center;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: #22c55e;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        .ug-feat2-more:hover {
          background: rgba(255,255,255,0.06);
          color: #4ade80;
        }
        .stats-section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .stats-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          color: #fff;
        }
        .stats-title .ug-highlight {
          font-family: 'Fantasy Magist', serif;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 960px;
          margin: 0 auto;
        }
        .stats-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2.5rem 2rem;
          border-radius: 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .stats-card-value {
          font-family: 'Onest', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          background: linear-gradient(to bottom, #bcfe47, #05cc2a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .stats-card-label {
          color: #888;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
          .stats-card { padding: 2rem 1.5rem; }
        }
      `}</style>
      <style>{`
        body { background: #141a21 !important; }
        .radial-gradient-container { display: none; }
      `}</style>
    </>
  )
}
