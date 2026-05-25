const eventos = [
  { titulo: 'Evento de prueba', descripcion: 'Descripción del evento próximo.', fecha: 'Próximamente', emoji: '🎮' },
  { titulo: 'Evento de prueba', descripcion: 'Descripción del evento próximo.', fecha: 'Próximamente', emoji: '🎉' },
  { titulo: 'Evento de prueba', descripcion: 'Descripción del evento próximo.', fecha: 'Próximamente', emoji: '🎤' },
]

export default function EventosSection() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-badge">Eventos</span>
        <h2 className="section-title">Próximos <span className="highlight">Eventos</span></h2>
        <p className="section-sub">Muy pronto tendremos novedades. Mantente atento.</p>
      </div>
      <div className="eventos-grid">
        {eventos.map((e, i) => (
          <div key={i} className="evento-card">
            <span className="evento-emoji">{e.emoji}</span>
            <h3 className="evento-titulo">{e.titulo}</h3>
            <p className="evento-desc">{e.descripcion}</p>
            <span className="evento-fecha">{e.fecha}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
