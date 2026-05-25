const faqs = [
  { pregunta: '¿Pregunta frecuente?', respuesta: 'Respuesta a la pregunta frecuente.' },
  { pregunta: '¿Pregunta frecuente?', respuesta: 'Respuesta a la pregunta frecuente.' },
  { pregunta: '¿Pregunta frecuente?', respuesta: 'Respuesta a la pregunta frecuente.' },
  { pregunta: '¿Pregunta frecuente?', respuesta: 'Respuesta a la pregunta frecuente.' },
]

export default function FAQSection() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-badge">FAQ</span>
        <h2 className="section-title">Preguntas <span className="highlight">Frecuentes</span></h2>
        <p className="section-sub">Respuestas a las dudas más comunes.</p>
      </div>
      <div className="faq-grid">
        {faqs.map((f, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-pregunta">{f.pregunta}</summary>
            <p className="faq-respuesta">{f.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
