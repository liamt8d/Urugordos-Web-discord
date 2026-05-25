import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '404',
  description: 'Página no encontrada.',
}

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="nf-page">
        <section className="nf-section">
          <img src="/cards/404.png" alt="" className="nf-img" />
          <h1 className="nf-title">¡Ups! Página no encontrada</h1>
          <p className="nf-text">
            La página que buscas no existe o fue movida.
          </p>
          <a href="/" className="nf-btn">Volver al inicio</a>
        </section>
      </main>
      <Footer />

      <style>{`
        .nf-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
        .nf-section {
          text-align: center;
          max-width: 28rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .nf-img {
          width: 100%;
          max-width: 20rem;
          border-radius: 0.75rem;
        }
        .nf-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .nf-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
          margin: 0;
          line-height: 1.6;
        }
        .nf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.5rem;
          border-radius: 9999px;
          background: #b06040;
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: background 0.2s;
          font-family: 'Cinzel', serif;
        }
        .nf-btn:hover {
          background: #c07050;
        }

        @media (max-width: 480px) {
          .nf-title { font-size: 1.2rem; }
          .nf-text { font-size: 0.85rem; }
          .nf-img { max-width: 16rem; }
        }
      `}</style>
    </>
  )
}