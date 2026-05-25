'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  {
    id: 1,
    title: 'Convivencia y Respeto Mutuo',
    rules: [
      {
        label: 'Respeto Universal',
        text: 'Trata a todos los miembros con cortesía y respeto en todo momento. No se tolerarán ataques personales, acoso de ningún tipo, discriminación por raza, género, orientación sexual, religión o cualquier otra condición, ni lenguaje ofensivo, amenazante o difamatorio. Cualquier conflicto debe manejarse de forma madura y privada; si no es posible, contacta al staff.',
      },
      {
        label: 'Inclusión y Convivencia',
        text: 'Fomentamos un ambiente acogedor e inclusivo para todos. No excluyas a otros miembros, no realices bromas pesadas que puedan afectar la armonía del grupo, y evita comentarios o actitudes que hagan sentir incómodo a alguien. Todos merecen sentirse bienvenidos.',
      },
      {
        label: 'Privacidad (Doxing)',
        text: 'Queda estrictamente prohibido compartir información personal propia o de terceros sin su consentimiento explícito. Esto incluye nombres reales, edades, direcciones físicas, correos electrónicos, números de teléfono, fotografías personales, ubicación o cualquier dato que pueda identificar a una persona en el mundo real.',
      },
      {
        label: 'Cumplimiento de Discord',
        text: 'Es obligatorio cumplir con los Términos de Servicio y las Directrices de la Comunidad de Discord en todo momento. Debes tener al menos 13 años para estar en este servidor, según lo establecido por Discord. El incumplimiento de estas normas globales puede resultar en una sanción tanto del servidor como de Discord mismo.',
      },
      {
        label: 'Lenguaje y Modales',
        text: 'Mantén un lenguaje apropiado para un ambiente variado. Aunque no censuramos el uso de malas palabras con moderación, evita insultos directos, lenguaje excesivamente vulgar, comentarios de odio o cualquier forma de violencia verbal hacia otros miembros.',
      },
    ],
  },
  {
    id: 2,
    title: 'Normas de los Canales de Texto',
    rules: [
      {
        label: 'Idioma Oficial',
        text: 'La comunicación en los canales de texto debe ser exclusivamente en español. Esto garantiza que todos los miembros puedan entender y participar en las conversaciones. El uso de otros idiomas de forma prolongada puede resultar en una advertencia.',
      },
      {
        label: 'Prohibición de Enlaces',
        text: 'Por seguridad del servidor, no se permite el envío de enlaces (links) de ningún tipo, incluyendo acortadores, enlaces a otras webs, invitaciones a otros servidores de Discord, o cualquier URL externa. Está prohibido a menos que tengas el nivel requerido para hacerlo o estés en canales designados para ello, como los canales de reacción en dinámicas. Esta medida previene phishing, malware y publicidad no deseada.',
      },
      {
        label: 'Cero Spam y Flood',
        text: 'Evita el uso excesivo de mayúsculas (CAPS LOCK), emojis repetidos, muros de texto, mensajes cortos consecutivos (flood), cadenas de mensajes, o cualquier comportamiento que interrumpa la fluidez normal del chat. Tampoco está permitido enviar el mismo mensaje múltiples veces en diferentes canales.',
      },
      {
        label: 'Uso Apropiado de Canales',
        text: 'Mantén cada conversación en el canal correspondiente. No desvirtúes los temas principales de cada canal. Por ejemplo: sugerencias en #sugerencias, comandos en #comandos, memes en los canales designados para ello. El staff puede mover o eliminar mensajes fuera de lugar sin previo aviso.',
      },
      {
        label: 'Etiqueta de Menciones y Pings',
        text: 'No abuses del @mention. No etiquetes innecesariamente a miembros, roles o al Staff, especialmente si no es urgente. Al responder a mensajes antiguos, desactiva el ping si no es necesario. El uso excesivo de @everyone o @here sin autorización será sancionado. Si alguien te pide que dejes de etiquetarlo, respeta su solicitud.',
      },
      {
        label: 'Nombre de Usuario',
        text: 'Usa un nombre de usuario legible que permita identificarte fácilmente. No se permiten nombres con caracteres invisibles, excesivamente largos, que suplanten a otros miembros o al staff, o que contengan contenido ofensivo o inapropiado.',
      },
    ],
  },
  {
    id: 3,
    title: 'Normas de los Canales de Voz',
    rules: [
      {
        label: 'Calidad del Audio',
        text: 'Utiliza un micrófono adecuado y evita ruidos de fondo molestos como música alta, ventiladores, teclados mecánicos ruidosos o conversaciones paralelas. Si tienes mucho ruido ambiental, usa la opción "Pulsar para hablar" (Push to Talk) en lugar de activación de voz.',
      },
      {
        label: 'Turnos de Habla',
        text: 'Respeta a quien tiene la palabra. No interrumpas constantemente a otros miembros mientras están hablando. Las interrupciones repetitivas y deliberadas serán sancionadas. Si quieres aportar algo, espera tu turno o usa el chat de texto del canal.',
      },
      {
        label: 'Uso de Canales de Voz',
        text: 'Entra a los canales de voz destinados a la actividad que estés realizando. Por ejemplo, usa los canales de juegos específicos para jugar, no los canales generales. No te conectes a un canal de voz solo para molestar, reproducir sonidos inapropiados o interrumpir a otros. Respeta la actividad de cada sala.',
      },
      {
        label: 'Micrófono y Dispositivos',
        text: 'No uses dispositivos de audio defectuosos que generen ruido excesivo (feedback, eco, cortes constantes). Si tu equipo causa problemas recurrentes, el staff puede solicitar que soluciones el problema o que uses Push to Talk. Tampoco está permitido usar grabaciones o sonidos pre-grabados para molestar.',
      },
    ],
  },
  {
    id: 4,
    title: 'Contenido y Seguridad',
    rules: [
      {
        label: 'Ambiente SFW',
        text: 'Está prohibido compartir contenido NSFW (Not Safe For Work), incluyendo imágenes, videos, audios o textos de naturaleza sexual explícita, violencia gráfica, gore, o cualquier material que pueda ser considerado inapropiado para un público general. Esto aplica también a avatares, banners, nombres de usuario, estados personalizados y cualquier elemento visible del perfil.',
      },
      {
        label: 'Temas Controversiales',
        text: 'Evita discusiones sobre política, religión, drogas u otros temas altamente controversiales que puedan generar conflictos innecesarios. El servidor es un espacio de entretenimiento y convivencia, no un foro de debate. Las discusiones sobre estos temas serán cortadas y pueden resultar en sanciones si se vuelven problemáticas.',
      },
      {
        label: 'Publicidad y Autopromoción',
        text: 'La publicidad y autopromoción no autorizada están totalmente prohibidas. Esto incluye: enviar invitaciones a otros servidores de Discord, promocionar canales de YouTube, Twitch, redes sociales, productos, servicios o cualquier otro contenido externo sin autorización explícita del staff. Las colaboraciones deben ser coordinadas con la administración.',
      },
      {
        label: 'Integridad del Juego (Geometry Dash)',
        text: 'Se prohíbe estrictamente el uso de cualquier cheat, hack, modificación no autorizada o exploit que otorgue ventajas injustas en el gameplay o en las estadísticas de Geometry Dash u otros juegos relacionados con el servidor. Solo se permiten hacks cosméticos o modificaciones enfocadas en la creación de niveles.',
      },
      {
        label: 'Contenido Generado por IA',
        text: 'El contenido generado por inteligencia artificial debe ser claramente etiquetado como tal si se comparte en el servidor. No está permitido usar IA para suplantar a otros miembros, crear contenido engañoso o generar material inapropiado.',
      },
    ],
  },
  {
    id: 5,
    title: 'Autoridad y Moderación',
    rules: [
      {
        label: 'Identificación y Legibilidad',
        text: 'Usa un nombre de usuario legible, sin caracteres invisibles, símbolos excesivos o nombres excesivamente largos (más de 20 caracteres). Tu nombre debe permitir que los demás miembros te identifiquen fácilmente. No uses nombres que suplanten a miembros del staff o a figuras públicas.',
      },
      {
        label: 'Obediencia al Staff',
        text: 'Las decisiones de los moderadores son finales y deben ser respetadas. Si un moderador te da una advertencia, mute u otra sanción, acéptala y no discutas en el canal público. Si consideras que la decisión fue incorrecta, puedes apelar por los canales adecuados (tickets o formulario de apelación). No intentes actuar como Staff si no tienes el rol correspondiente.',
      },
      {
        label: 'Apelaciones y Quejas',
        text: 'Si tienes un problema con una sanción o con un miembro del Staff, no discutas en público. Utiliza el sistema de tickets en Discord o el formulario web de apelaciones. Las quejas públicas sobre decisiones de moderación serán ignoradas y pueden resultar en sanciones adicionales.',
      },
      {
        label: 'Sentido Común',
        text: 'Estas reglas no son exhaustivas ni cubren todas las situaciones posibles. El uso de vacíos legales o interpretaciones técnicas para causar problemas, molestar a otros miembros o evadir sanciones será sancionado bajo el criterio del Staff. Ante la duda, pregúntate si tu acción contribuye positivamente a la comunidad.',
      },
      {
        label: 'Reporte de Infracciones',
        text: 'Si ves a alguien rompiendo las reglas, repórtalo a un moderador de forma privada o abre un ticket. No intentes tomar la justicia por tu cuenta ni respondas con otra infracción. La colaboración de todos ayuda a mantener un ambiente saludable.',
      },
    ],
  },
]

export default function ReglasPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Reglas</span>
            <h1>Normativas del Servidor</h1>
            <p>Normas extendidas — Reglas y lineamientos para convivir en Urugordos.</p>
          </div>
        </section>

        <section className="reglas-section">

          {sections.map(s => (
            <div key={s.id} className="reglas-card">
              <button className="reglas-header" onClick={() => setOpen(open === s.id ? null : s.id)}>
                <span className="reglas-num">{s.id}</span>
                <span className="reglas-title">{s.title}</span>
                <svg className={`reglas-arrow ${open === s.id ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="reglas-collapse" style={{ gridTemplateRows: open === s.id ? '1fr' : '0fr', paddingBottom: open === s.id ? '0.5rem' : '0' }}>
                <div className="reglas-body">
                  {s.rules.map((r, i) => (
                    <div key={i} className="reglas-rule">
                      <h4 className="reglas-label">▸ {r.label}</h4>
                      <p className="reglas-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="reglas-footer">
            <p>Si ves a alguien rompiendo estas reglas, repórtalo inmediatamente a un moderador o abre un <a href="/tickets" className="reglas-link">ticket</a>.</p>
            <p className="reglas-small">
              Más información en los{" "}
              <a href="https://discordapp.com/terms" target="_blank" rel="noreferrer" className="reglas-link">Términos de Servicio</a>
              {" "}y las{" "}
              <a href="https://discordapp.com/guidelines" target="_blank" rel="noreferrer" className="reglas-link">Directrices de la Comunidad</a>
              {" "}de Discord.
            </p>
            <p className="reglas-copy">URUGORDOS 2026</p>
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
        .reglas-section {
          max-width: 48rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .reglas-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
        }
        .reglas-card:hover {
          border-color: #b06040;
          background: rgba(255,255,255,0.06);
        }
        .reglas-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }
        .reglas-num {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #b06040;
          flex-shrink: 0;
          min-width: 1.5rem;
        }
        .reglas-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          flex: 1;
        }
        .reglas-arrow {
          width: 1.2rem;
          height: 1.2rem;
          opacity: 0.4;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .reglas-arrow.open { transform: rotate(180deg); }
        .reglas-collapse {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease, padding-bottom 0.35s ease;
          overflow: hidden;
        }
        .reglas-body {
          min-height: 0;
          padding: 0 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .reglas-rule {
          padding-left: 0.5rem;
          border-left: 2px solid rgba(176,96,64,0.3);
        }
        .reglas-label {
          font-family: 'Onest', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #b06040;
          margin-bottom: 0.25rem;
        }
        .reglas-text {
          font-size: 0.85rem;
          opacity: 0.6;
          line-height: 1.6;
        }
        .reglas-footer {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
        }
        .reglas-footer p {
          font-size: 0.9rem;
          opacity: 0.6;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        .reglas-link {
          color: #b06040;
          text-decoration: none;
          font-weight: 600;
        }
        .reglas-link:hover { text-decoration: underline; }
        .reglas-small {
          font-size: 0.8rem !important;
        }
        .reglas-copy {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem !important;
          opacity: 0.3 !important;
          letter-spacing: 0.1em;
          margin-top: 0.5rem !important;
        }
      `}</style>
    </>
  )
}
