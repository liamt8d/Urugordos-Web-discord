interface Feature {
  color: string
  title: string
  description: string
}

const features: Feature[] = [
  { color: '#b06040', title: 'Calidad', description: 'Trabajamos continuamente para garantizar que nuestra comunidad sea un lugar de alta calidad, ideal para socializar y hacer amigos. 🌟' },
  { color: '#b06040', title: 'Eventos', description: 'Organizamos eventos únicos para celebrar diversas temáticas y ocasiones especiales. ¡No te los pierdas! 🎉' },
  { color: '#b06040', title: 'Soporte', description: 'Nuestro equipo de soporte siempre está dispuesto a ayudarte con cualquier problema o duda que tengas en el servidor. 🤝' },
  { color: '#b06040', title: 'Documentación', description: 'Accede a guías, normativas y recursos personalizados que te ayudarán a aprovechar al máximo nuestra comunidad mientras evitas inconvenientes. 📚' },
  { color: '#b06040', title: 'Roles', description: 'Gana roles al subir de nivel, mantente al día con notificaciones del servidor y canjea monedas por roles exclusivos. 🏆' },
  { color: '#b06040', title: 'Podcasts', description: 'Participa en los eventos de podcast, donde hablamos sobre temas interesantes y ¡anécdotas inolvidables! 🎙️' },
]

const icons: Record<string, string> = {
  'Calidad': 'M7 18v-11a2 2 0 0 1 2 -2h.5a.5 .5 0 0 0 .5 -.5a.5 .5 0 0 1 .5 -.5h3a.5 .5 0 0 1 .5 .5a.5 .5 0 0 0 .5 .5h.5a2 2 0 0 1 2 2v11a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2 M12.667 8l-2.667 4h4l-2.667 4',
  'Eventos': 'M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z M16 3l0 4 M8 3l0 4 M4 11l16 0 M8 15h2v2h-2z',
  'Soporte': 'M11.998 2l.032 .002l.086 .005a1 1 0 0 1 .342 .104l.105 .062l.097 .076l.016 .015l.247 .21a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.791 -2.75l.046 -.036l.053 -.041a1 1 0 0 1 .217 -.112l.075 -.023l.036 -.01a1 1 0 0 1 .12 -.022l.086 -.005zm.002 2.296l-.176 .135a13 13 0 0 1 -7.288 2.572l-.264 .006l-.064 .31a11 11 0 0 0 1.064 7.175l.17 .314a11 11 0 0 0 6.49 5.136l.068 .019z',
  'Documentación': 'M4 12h.01 M4 6h.01 M4 18h.01 M8 18h2 M8 12h2 M8 6h2 M14 6h6 M14 12h6 M14 18h6',
  'Roles': 'M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z',
  'Podcasts': 'M18.364 19.364a9 9 0 1 0 -12.728 0 M15.536 16.536a5 5 0 1 0 -7.072 0 M12 13m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
}

function getPaths(title: string): string[] {
  const d = icons[title]
  if (!d) return []
  return d.split(' M').map((p, i) => i === 0 ? p : 'M' + p)
}

export default function Features() {
  return (
    <section className="features-section" style={{ position: 'relative' }}>
      <div aria-hidden="true" className="features-separator" />
      <div aria-hidden="true" className="features-separator-glow" />
      <div className="deco-divider" aria-hidden="true">
        <span className="deco-divider-line left" />
        <span className="deco-divider-diamond" />
        <span className="deco-divider-line right" />
      </div>
      <div className="features-header">
        <h2 className="features-title">
          Nuestra<br /><span className="highlight">Comunidad</span>
        </h2>
        <p className="features-subtitle">
          Descubre más sobre cómo funciona nuestra comunidad y todo lo que te ofrecemos. ✨
        </p>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <span aria-hidden="true" className="feature-card-corner feature-card-corner--tl" />
            <span aria-hidden="true" className="feature-card-corner feature-card-corner--tr" />
            <span aria-hidden="true" className="feature-card-corner feature-card-corner--bl" />
            <span aria-hidden="true" className="feature-card-corner feature-card-corner--br" />
            <svg
              className="feature-icon"
              style={{ color: f.color, backgroundColor: `${f.color}33` }}
              width="48" height="48" viewBox="0 0 24 24"
              fill={f.title === 'Soporte' ? 'currentColor' : 'none'}
              stroke={f.title === 'Soporte' ? 'none' : 'currentColor'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              {getPaths(f.title).map((path, i) => (
                <path key={i} d={path} />
              ))}
            </svg>
            <div className="feature-text">
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
