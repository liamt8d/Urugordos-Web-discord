import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Introducción',
  description: '¿Qué es ser staff?',
}

export default function ModIntroduccionPage() {
  return (
    <>
      <Header />
      <main className="form-page">
        <section className="mod-header">
          <a href="/moderacion" className="mod-back">← Mod Guide</a>
          <h1>Introducción</h1>
        </section>

        <section className="mod-content">
          <div className="mod-card">
            <h2>¿Qué es ser staff?</h2>
            <p>
              El personal de moderación de la comunidad, conocido como el staff, tiene como principal propósito asegurar que tanto los jugadores como los usuarios vivan una experiencia que sea segura, justa y entretenida. Este grupo está integrado por una variedad de personas, cada una con diferentes funciones y deberes, que trabajan en conjunto para preservar el orden en el servidor y hacer cumplir las normas.
            </p>
            <p>
              Los integrantes del staff deben demostrar un comportamiento profesional, imparcial, respetuoso y justo en todo momento. Su papel no se limita únicamente a hacer cumplir las normas del servidor; también deben mediar en disputas entre usuarios, solucionar inconvenientes y fomentar un entorno positivo y seguro.
            </p>
            <p>Ten presente que es fundamental:</p>
            <ul className="mod-proto-list">
              <li>Respetar las normas establecidas.</li>
              <li>Actuar con claridad y justicia.</li>
              <li>Fomentar conductas apropiadas dentro de la comunidad.</li>
              <li>Colaborar con los demás miembros del staff.</li>
            </ul>
          </div>

          <div className="mod-card">
            <h3>Contacto</h3>
            <p>
              En el caso de que fuese necesario contactar con el encargado de mantenimiento de esta guía, sea por un error u otros, puede hacerlo a través del equipo de administración en el servidor.
            </p>
          </div>
        </section>

        <nav className="mod-nav-links">
          <a href="/moderacion" className="mod-nav-link">← Volver</a>
          <a href="/moderacion/reglas" className="mod-nav-link">Siguiente →</a>
        </nav>
      </main>
      <Footer />
    </>
  )
}