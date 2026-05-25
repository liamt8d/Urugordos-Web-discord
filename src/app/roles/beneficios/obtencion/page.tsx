'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ObtencionPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Obtención</span>
            <h1>¿Cómo obtener los roles?</h1>
            <p>Los niveles se obtienen mediante experiencia (XP) al participar en el servidor. Algunos roles especiales se otorgan por méritos, eventos o requisitos específicos.</p>
          </div>
        </section>

        <section className="obt-section">
          <div className="obt-card">
            <h2 className="obt-title">💬  Chat</h2>
            <p className="obt-desc">Ganas XP por cada mensaje que envías en canales de texto generales.</p>
            <ul className="obt-items">
              <li><strong>0-30 XP</strong> por mensaje (cooldown de 30 segundos).</li>
              <li>Los mensajes en canales de voz (chat de texto) también cuentan.</li>
            </ul>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">🔊  Voz</h2>
            <p className="obt-desc">Permanece en canales de voz para ganar XP por tiempo.</p>
            <ul className="obt-items">
              <li><strong>0-45 XP</strong> por cada minuto en un canal de voz.</li>
              <li>Necesitas estar al menos 5 minutos para que empiece a contar.</li>
            </ul>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">🎁  Eventos</h2>
            <p className="obt-desc">Participa en eventos del servidor para ganar XP extra.</p>
            <ul className="obt-items">
              <li>Eventos semanales y dinámicas otorgan bonificaciones de XP.</li>
              <li>Revisa el calendario de eventos para no perderte ninguno.</li>
            </ul>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">📈  Progresión</h2>
            <p className="obt-desc">Cada nivel requiere más XP que el anterior.</p>
            <ul className="obt-items">
              <li>Los niveles se desbloquean automáticamente al alcanzar el XP necesario.</li>
              <li>No puedes perder niveles — el XP acumulado nunca se reduce.</li>
              <li>Consulta todos los beneficios de cada nivel en <a href="/roles/beneficios" className="obt-link">Beneficios por Nivel</a>.</li>
            </ul>
          </div>
        </section>

        <div className="obt-divider"><span>Roles Especiales</span></div>

        <section className="obt-section">
          <div className="obt-card">
            <h2 className="obt-title">Nitro Booster</h2>
            <p className="obt-desc">Se obtiene al mejorar el servidor con Discord Nitro (potenciar el servidor).</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">Momero</h2>
            <p className="obt-desc">Otorgado por el bot @uruniveles al top 1 en reacciones de <a href="/dinamicas" className="obt-link">Memes Reacción</a>.</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">Artista</h2>
            <p className="obt-desc obt-none">Sin obtención por ahora.</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">OG</h2>
            <p className="obt-desc obt-none">No se sabe cómo obtener.</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">VIP</h2>
            <p className="obt-desc">Solo lo da <strong>Urugodd</strong>.</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">YouTube Member</h2>
            <p className="obt-desc">Se da a los miembros del canal de YouTube de Urugodd. Beneficios de hasta nivel 30 y <strong>x0.5 multiplicador de XP</strong>.</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">GODD</h2>
            <p className="obt-desc">Se da al tener la etiqueta del servidor.</p>
          </div>

          <div className="obt-card">
            <h2 className="obt-title">Mil gordos</h2>
            <p className="obt-desc obt-none">No se puede obtener. Se dio a todos al llegar a 1.000 usuarios en el servidor.</p>
          </div>
        </section>

        <div className="obt-back-wrap">
          <a href="/roles" className="obt-back">← Volver a Roles</a>
        </div>
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
        .obt-section {
          max-width: 48rem;
          margin: 0 auto;
          padding: 0 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .obt-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: border-color 0.25s, background 0.25s;
        }
        .obt-card:hover {
          border-color: #b06040;
          background: rgba(255,255,255,0.06);
        }
        .obt-title {
          font-family: 'Cinzel', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .obt-desc {
          font-size: 0.9rem;
          opacity: 0.6;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        .obt-items {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .obt-items li {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          opacity: 0.7;
          line-height: 1.5;
        }
        .obt-items li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #b06040;
        }
        .obt-link {
          color: #b06040;
          text-decoration: none;
          font-weight: 600;
        }
        .obt-link:hover {
          text-decoration: underline;
        }
        .obt-none {
          opacity: 0.4 !important;
          font-style: italic;
        }
        .obt-back-wrap {
          max-width: 48rem;
          margin: 0 auto;
          padding: 2rem 1rem 5rem;
          text-align: center;
        }
        .obt-back {
          color: #b06040;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .obt-back:hover { opacity: 0.7; }
        .obt-divider {
          max-width: 48rem;
          margin: 3rem auto 2rem;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .obt-divider::before,
        .obt-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .obt-divider span {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}
