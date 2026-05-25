import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Herramientas',
  description: 'Herramientas para moderadores de Urugordos.',
}

const categorias = [
  {
    icon: '🤖',
    title: 'Urubot — Sistema de sanciones',
    desc: 'El bot utilizado para aplicar sanciones es Urubot con comandos de barra /.',
    links: [
      { label: '/warn — Advertir', url: '#' },
      { label: '/mute — Silenciar (10m, 30m, 1h, 3h, 12h, 1d, 7d, 28d)', url: '#' },
      { label: '/kick — Expulsar', url: '#' },
      { label: '/ban — Banear (vacío = permanente)', url: '#' },
      { label: '/unban — Desbanear', url: '#' },
      { label: '/unmute — Quitar silencio', url: '#' },
      { label: '/infracciones — Ver historial', url: '#' },
    ],
    note: 'Los comandos masivos (/massban, /masskick, /massmute, /massunban) son solo para admins.',
  },
  {
    icon: '🖼️',
    title: 'Reconocimiento de imágenes',
    desc: 'Para verificar si una imagen es robada o inapropiada:',
    links: [
      { label: 'Google Lens', url: 'https://lens.google.com' },
      { label: 'Google Images', url: 'https://images.google.com' },
      { label: 'Yandex Images', url: 'https://yandex.com/images/' },
    ],
    note: 'Se recomienda utilizar Yandex Images. Es la herramienta más avanzada con reconocimiento por IA.',
  },
  {
    icon: '🔗',
    title: 'Verificación de links',
    desc: 'Analiza enlaces sospechosos antes de abrirlos:',
    links: [
      { label: 'VirusTotal URL', url: 'https://www.virustotal.com/gui/home/url' },
      { label: 'Cloudflare Radar', url: 'https://radar.cloudflare.com/scan' },
    ],
  },
  {
    icon: '📎',
    title: 'Enlaces útiles',
    links: [
      { label: 'ToS de Discord', url: 'https://discord.com/terms' },
      { label: 'Discord Policy Hub', url: 'https://discord.com/safety-policies' },
      { label: 'Discord Community Guidelines', url: 'https://discord.com/guidelines' },
      { label: 'Cómo obtener un ID de Discord', url: 'https://support.discord.com/hc/es/articles/206346498' },
      { label: 'Markdown de Discord', url: 'https://support.discord.com/hc/es/articles/210298617' },
      { label: 'Hammertime (timestamps)', url: 'https://hammertime.cyou/es' },
    ],
  },
]

export default function ModHerramientasPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="mod-header">
          <a href="/moderacion" className="mod-back">← Mod Guide</a>
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6080c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.8rem" height="1.8rem"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Herramientas para moderadores</h1>
          <p className="mod-subtitle">
            ¡Hola moderador/a! Para hacer tu trabajo más fácil aquí tienes una recopilación de las herramientas que puedes utilizar en tu día a día.
          </p>
        </section>

        <section className="mod-content">
          {categorias.map((cat, i) => (
            <div key={i} className="mod-card">
              <h3 className="mod-rule-title">{cat.icon} {cat.title}</h3>
              {cat.desc && <p className="mod-card-p">{cat.desc}</p>}
              <ul className="mod-tool-list">
                {cat.links.map((link, j) => (
                  <li key={j}>
                    {link.url === '#' ? (
                      <span className="mod-tool-item">{link.label}</span>
                    ) : (
                      <a href={link.url} target="_blank" rel="noreferrer" className="mod-ext-link">
                        {link.label} →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {cat.note && <p className="mod-note">{cat.note}</p>}
            </div>
          ))}
        </section>

        <nav className="mod-nav-links">
          <a href="/moderacion/reglas" className="mod-nav-link">← Reglas</a>
          <a href="/moderacion" className="mod-nav-link">Volver al inicio →</a>
        </nav>
      </main>
      <Footer />
    </>
  )
}