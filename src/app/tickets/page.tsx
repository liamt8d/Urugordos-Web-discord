'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ticketTypes = [
  {
    emoji: '❓',
    label: 'Dudas Generales',
    value: 'dudas_generales',
    desc: 'Para usuarios nuevos que no entienden cómo funciona algo en el servidor, preguntas sobre bots, rangos, niveles, o cualquier otra duda.',
  },
  {
    emoji: '🚨',
    label: 'Reportar Usuario',
    value: 'reportar_usuario',
    desc: 'Para denunciar a alguien que insulta, hace spam, rompe reglas o usa trampas. Recuerda adjuntar capturas de pantalla.',
  },
  {
    emoji: '🐛',
    label: 'Reporte de Bugs / Errores',
    value: 'reporte_bugs',
    desc: 'Si un bot falla, hay errores en la configuración del servidor, o encuentras problemas técnicos.',
  },
  {
    emoji: '⚖️',
    label: 'Apelación de Sanciones',
    value: 'apelacion_sanciones',
    desc: 'Si fuiste baneado, muteado o expulsado y crees que fue un error o quieres pedir disculpas.',
  },
]

export default function TicketsPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Tickets</span>
            <h1>Sistema de Tickets</h1>
            <p>Comunícate con el staff de forma privada y organizada.</p>
          </div>
        </section>

        <section className="tkt-section">
          <div className="tkt-intro">
            <img
              src="/cards/tickets1.png"
              alt="Tickets"
              className="tkt-img"
            />
            <p className="tkt-desc">
              En el canal de tickets de Discord puedes ponerte en contacto con el staff para resolver
              cualquier situación. Solo tienes que seleccionar la categoría de tu problema y abrir una
              conversación privada.
            </p>
          </div>

          <h2 className="tkt-subtitle">Categorías disponibles</h2>

          <div className="tkt-grid">
            {ticketTypes.map(t => (
              <div key={t.value} className="tkt-card">
                <div className="tkt-card-header">
                  <span className="tkt-emoji">{t.emoji}</span>
                  <h3 className="tkt-card-title">{t.label}</h3>
                </div>
                <p className="tkt-card-desc">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="tkt-cta">
            <p>Para abrir un ticket, dirígete al canal de Discord y selecciona la opción que corresponda a tu caso.</p>
            <a
              href="https://discord.com/channels/1333180919112273993/1500961451836178604"
              target="_blank"
              rel="noreferrer"
              className="tkt-btn"
            >
              Ir al canal de tickets →
            </a>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        html { scrollbar-gutter: stable; }
        .hero-small h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .hero-badge {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tkt-section {
          max-width: 48rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
        }
        .tkt-intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .tkt-img {
          max-width: 100%;
          width: 500px;
          border-radius: 0.75rem;
        }
        .tkt-desc {
          font-size: 1rem;
          opacity: 0.65;
          line-height: 1.7;
          text-align: center;
          max-width: 36rem;
        }
        .tkt-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .tkt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .tkt-grid { grid-template-columns: 1fr; }
        }
        .tkt-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 1.25rem;
          transition: border-color 0.25s, background 0.25s;
        }
        .tkt-card:hover {
          border-color: #b06040;
          background: rgba(255,255,255,0.06);
        }
        .tkt-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .tkt-emoji {
          font-size: 1.5rem;
          line-height: 1;
        }
        .tkt-card-title {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
        }
        .tkt-card-desc {
          font-size: 0.85rem;
          opacity: 0.55;
          line-height: 1.5;
        }
        .tkt-cta {
          text-align: center;
          margin-top: 2.5rem;
          padding: 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
        }
        .tkt-cta p {
          font-size: 0.95rem;
          opacity: 0.6;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .tkt-btn {
          display: inline-block;
          padding: 0.75rem 2rem;
          background: #b06040;
          color: #fff;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .tkt-btn:hover {
          opacity: 0.85;
        }
      `}</style>
    </>
  )
}
