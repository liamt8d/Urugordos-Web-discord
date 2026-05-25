import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cómo moderar texto',
  description: 'Guía para moderar canales de texto en Urugordos.',
}

export default function ModTextoPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="mod-header">
          <a href="/moderacion" className="mod-back">← Mod Guide</a>
          <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6080c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.8rem" height="1.8rem"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Cómo moderar canales de texto</h1>
        </section>

        <section className="mod-content">
          <div className="mod-card">
            <h2>Básicos</h2>

            <h3>Cómo entrar al canal</h3>
            <p>Al entrar en el canal de texto, intenta saludar e iniciar un nuevo tema de conversación con los usuarios presentes. La presencia de un moderador reduce el número de infracciones.</p>

            <h3>Cómo dar una advertencia</h3>
            <p>Redacta un mensaje mencionando al usuario, indica con claridad la razón de la advertencia. Ejemplo:</p>
            <div className="mod-code">@usuario por favor, evita el envío de contenido inapropiado en el servidor.</div>

            <h3>Cómo y cuándo dar una sanción</h3>
            <p>Una sanción se otorga cuando el número de advertencias supera las 3, o cuando la infracción necesita una sanción de manera inmediata. Sigue siempre el protocolo de escalada progresiva.</p>
          </div>

          <div className="mod-card">
            <h3>Cómo ejecutar una sanción con Urubot</h3>
            <p>El equipo utiliza <strong>Urubot</strong> para dar sanciones mediante comandos de barra <code className="mc-code">/</code>. Formato:</p>
            <div className="mod-code">/warn usuario:@usuario razon:[Razón]</div>
            <div className="mod-code">/mute usuario:@usuario razon:[Razón] tiempo:[duración]</div>
            <div className="mod-code">/kick usuario:@usuario razon:[Razón]</div>
            <div className="mod-code">/ban usuario:@usuario razon:[Razón] tiempo:[opcional]</div>

            <h4 style={{ marginTop: '1rem' }}>Duraciones disponibles:</h4>
            <ul className="mod-proto-list" style={{ listStyle: 'none' }}>
              <li><strong>10m, 30m</strong> — minutos</li>
              <li><strong>1h, 3h, 12h</strong> — horas</li>
              <li><strong>1d, 7d, 28d</strong> — días</li>
            </ul>
          </div>

          <div className="mod-card">
            <h3>Comandos de gestión</h3>
            <div className="mod-code">/infracciones usuario — Ver historial de un usuario</div>
            <div className="mod-code">/infracciones moderador — Ver sanciones de un mod</div>
            <div className="mod-code">/infracciones servidor — Ver sanciones del servidor</div>
            <div className="mod-code">/unban usuario:@usuario razon:[Razón]</div>
            <div className="mod-code">/unmute usuario:@usuario razon:[Razón]</div>
            <p className="mod-note">Para quitar o editar una sanción: desde el panel de /infracciones usuario, usando los botones 🗑️ eliminar y ✏️ editar razón.</p>
          </div>

          <div className="mod-card">
            <h3>Acciones masivas (solo admins)</h3>
            <div className="mod-code">/massban — Baneo masivo (skippea staff y admins)</div>
            <div className="mod-code">/masskick — Expulsión masiva</div>
            <div className="mod-code">/massmute — Silencio masivo</div>
            <div className="mod-code">/massunban — Desbaneo masivo</div>
          </div>

          <div className="mod-card">
            <h3>Categoría de infracciones</h3>
            <p>Los delitos se dividen en 5 niveles de gravedad. Evalúa la intención del usuario antes de actuar.</p>

            <div className="mc-level" style={{ borderLeftColor: '#50c878' }}>
              <strong>Nivel 1 — Leves</strong><br/>
              <span className="mc-sub">Insultos leves, flood incontinuo, spam ligero, uso erróneo de salas, entorpecer conversaciones.</span><br/>
              <span className="mc-sub">Ruta: Aviso → Tempmute 5m → 15m → 12h → Kick → Ban</span>
            </div>
            <div className="mc-level" style={{ borderLeftColor: '#e8c840' }}>
              <strong>Nivel 2 — Moderadas</strong><br/>
              <span className="mc-sub">Insultos graves, flood continuo, acoso leve, molestar a propósito, discutir en público.</span><br/>
              <span className="mc-sub">Ruta: Aviso → Tempmute 15m → 12h → Kick → Ban</span>
            </div>
            <div className="mc-level" style={{ borderLeftColor: '#f47735' }}>
              <strong>Nivel 3 — Graves</strong><br/>
              <span className="mc-sub">Racismo, sexismo, acoso continuo, desafiar decisión de staff públicamente.</span><br/>
              <span className="mc-sub">Ruta: Aviso → Tempmute 12h → Kick → Ban</span>
            </div>
            <div className="mc-level" style={{ borderLeftColor: '#d04040' }}>
              <strong>Nivel 4 — Muy graves</strong><br/>
              <span className="mc-sub">Spam por MD, links de invitación en canales indebidos.</span><br/>
              <span className="mc-sub">Ruta: Kick → Ban</span>
            </div>
            <div className="mc-level" style={{ borderLeftColor: '#801020' }}>
              <strong>Nivel 5 — Extremas (Tolerancia cero)</strong><br/>
              <span className="mc-sub">Contenido explícito (sexual, gore, ilegal), raids, doxxing.</span><br/>
              <span className="mc-sub">Ruta: Ban permanente inmediato → Informe a Discord Trust &amp; Safety</span>
            </div>
          </div>

          <div className="mod-card">
            <h3>Modificadores por nivel/tiempo</h3>
            <p>El nivel/tiempo del usuario en el servidor modifica la ruta base de sanciones:</p>
            <ul className="mod-proto-list">
              <li><strong>Niveles 1~4 (Recién llegados):</strong> Se es más estricto. Se salta el primer paso del protocolo.</li>
              <li><strong>Niveles 5~9 (Usuarios regulares):</strong> El protocolo se sigue exactamente como está establecido.</li>
              <li><strong>Niveles 10~29 (Usuarios conocidos):</strong> Se añade un aviso extra (margen de error) antes de avanzar.</li>
              <li><strong>Niveles 30+ o Boosters/Premiums (Veteranos):</strong> Se añaden dos avisos extra antes de aplicar castigos severos.</li>
            </ul>
          </div>

          <div className="mod-card">
            <h3>Reincidencia y límites máximos</h3>
            <p>Además de la ruta por severidad, revisa el historial del usuario antes de sancionar:</p>
            <ul className="mod-proto-list">
              <li><strong>Faltas distintas:</strong> Se pueden aplicar hasta 3 warns (1 por regla rota). Al llegar al 3.er warn consecutivo → Mute de 7 días.</li>
              <li><strong>Reincidencia crónica en una misma norma:</strong> Si a pesar de la ruta base sigue rompiendo la misma norma, la sanción escala radicalmente: Aviso → Warn → Mute 7d → Ban 7d. Si vuelve a reincidir tras esto → Ban permanente.</li>
            </ul>
          </div>

          <div className="mod-card">
            <h3>Escalada progresiva</h3>
            <p>Para la misma infracción repetida:</p>
            <ol className="mod-proto-list">
              <li>Advertencia verbal (No requiere comando)</li>
              <li>Warn oficial → <code className="mc-code">/warn</code></li>
              <li>Mute corto → <code className="mc-code">/mute</code> 1h a 6h</li>
              <li>Mute medio → <code className="mc-code">/mute</code> 1d</li>
              <li>Mute largo → <code className="mc-code">/mute</code> 7d</li>
              <li>Tempban → <code className="mc-code">/ban</code> 7d</li>
              <li>Ban permanente → <code className="mc-code">/ban</code> (sin tiempo)</li>
            </ol>
          </div>

          <div className="mod-card">
            <h3>Cómo controlar canales alterados</h3>
            <ol className="mod-proto-list">
              <li>Identifica si hay otro moderador activo en el canal.</li>
              <li>Solicita ayuda si es necesario.</li>
              <li>Advierte en caso de ser necesario.</li>
              <li>Interactúa con los usuarios — tu presencia reduce infracciones.</li>
            </ol>
          </div>
        </section>

        <nav className="mod-nav-links">
          <a href="/moderacion" className="mod-nav-link">← Mod Guide</a>
          <a href="/moderacion/guia/voz" className="mod-nav-link">Siguiente →</a>
        </nav>
      </main>
      <Footer />
    </>
  )
}
