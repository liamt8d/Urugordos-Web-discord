const reglas = [
  'Regla importante del servidor.',
  'Regla importante del servidor.',
  'Regla importante del servidor.',
  'Regla importante del servidor.',
  'Regla importante del servidor.',
]

export default function ReglasSection() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-badge">Reglas</span>
        <h2 className="section-title">Normativas del <span className="highlight">Servidor</span></h2>
        <p className="section-sub">Conoce las reglas básicas para convivir en armonía.</p>
      </div>
      <div className="reglas-grid">
        {reglas.map((r, i) => (
          <div key={i} className="regla-item">
            <span className="regla-num">{i + 1}</span>
            <p className="regla-texto">{r}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
