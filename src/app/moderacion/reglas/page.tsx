import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const reglasStaff = [
  { title: 'Trata siempre con respeto a los usuarios', detail: 'Mantén una actitud profesional y tranquila sin caer en provocaciones, incluso si no lo hacen contigo.' },
  { title: 'No compartas información confidencial del staff', detail: 'Lo que se discute entre staff debe permanecer privado.' },
  { title: 'No compartas recursos del servidor con otros', detail: 'Las herramientas y recursos son de uso exclusivo del staff.' },
  { title: 'Aplica advertencias progresivas antes de sancionar', detail: 'Usa advertencias primero, y solo sanciona si no hay mejora.' },
  { title: 'Prohibido abusar del poder', detail: 'No uses tu rol de staff para beneficio personal o injusto.' },
  { title: 'No sanciones a superiores, salvo abuso evidente', detail: 'Evita conflictos jerárquicos, reporta casos graves.' },
  { title: 'Si no sabes resolver algo, busca ayuda o informa al usuario', detail: 'No inventes respuestas. Es mejor consultar.' },
  { title: 'Prohibido el favoritismo', detail: 'Trata a todos por igual, sin preferencias.' },
  { title: 'Prohibido el modo invisible siendo staff', detail: 'Debes estar visible para que te contacten si es necesario.' },
  { title: 'Si te desconectas sin staff activo, avisa', detail: 'Asegura que siempre haya alguien para atender el servidor.' },
  { title: 'Puedes ser staff en otros servidores si no afecta aquí', detail: 'Ten compromiso, pero puedes tener otros roles si no interfieren.' },
  { title: 'Rechaza dudas/reportes inválidos y sanciona si insisten', detail: 'No permitas que insistan con reportes falsos o sin sentido.' },
]

const conducta = [
  { title: 'Sé amigable con los usuarios', detail: 'No hay excusa para ser grosero con ningún usuario en el servidor. La actitud de un staff debe ser ejemplar sin excepción.' },
  { title: 'No condescender ni dejar usuarios en el chat', detail: 'Como miembro del personal, debe mantener la compostura en todo momento, y tener paciencia con todo usuario que necesite ayuda.' },
  { title: 'Lenguaje obsceno', detail: 'Cualquier forma de comentario o lenguaje abusivo, racista o intimidante, resultará en una posible suspensión del equipo administrativo.' },
  { title: 'Predica con el ejemplo', detail: 'Ser parte del equipo no es excusa para romper o evadir la normativa. No se tolerará que un miembro del equipo incumpla la normativa.' },
  { title: 'No hay favoritismo, favores o amigos', detail: 'Bajo ninguna circunstancia se permite usar los poderes del puesto para ayudar o beneficiar a usuarios/amigos.' },
  { title: 'Guarda la compostura', detail: 'Está estrictamente prohibido comenzar una discusión pública con un usuario. Hacelo por privado, siempre de forma respetuosa.' },
]

export const metadata: Metadata = {
  title: 'Reglas del staff',
  description: 'Reglas y protocolo de conducta para moderadores.',
}

export default function ModReglasPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="mod-header">
          <a href="/moderacion" className="mod-back">← Mod Guide</a>
          <h1>Reglas del staff</h1>
        </section>

        <section className="mod-content">
          <div className="mod-card">
            <p>A continuación se presentan las reglas fundamentales que todo moderador debe cumplir. El incumplimiento de estas normas podría acarrear sanciones graves.</p>
          </div>

          <div className="mod-card">
            <h3 className="mod-rule-title">📜 Reglas del staff</h3>
            <ol className="mod-rule-list">
              {reglasStaff.map((r, i) => (
                <li key={i}><strong>{i + 1}.</strong> {r.title}.<br/><span className="mod-rule-detail">{r.detail}</span></li>
              ))}
            </ol>
          </div>

          <div className="mod-card">
            <h3 className="mod-rule-title">📋 Protocolo de conducta</h3>
            <ol className="mod-rule-list">
              {conducta.map((c, i) => (
                <li key={i}><strong>{i + 1}.</strong> {c.title}.<br/><span className="mod-rule-detail">{c.detail}</span></li>
              ))}
            </ol>
          </div>
        </section>

        <nav className="mod-nav-links">
          <a href="/moderacion/introduccion" className="mod-nav-link">← Introducción</a>
          <a href="/moderacion/herramientas" className="mod-nav-link">Siguiente →</a>
        </nav>
      </main>
      <Footer />
    </>
  )
}