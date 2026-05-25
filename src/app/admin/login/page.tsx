'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function LoginErrorHandler({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function LoginContent() {
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const errorCode = searchParams.get('error')
  useEffect(() => {
    if (errorCode === 'denied') setError('Inicio de sesión cancelado')
    else if (errorCode === 'not_member') setError('No eres miembro del servidor')
    else if (errorCode === 'not_admin') setError('No tienes permisos de administrador')
    else if (errorCode === 'oauth_failed') setError('Error con Discord OAuth')
    else {
      const errorParam = searchParams.get('error')
      if (errorParam) setError('Error: ' + errorParam)
    }
  }, [errorCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        sessionStorage.setItem('admin_token', data.token)
        window.location.href = '/admin'
      } else {
        setError(data.error || 'Contraseña incorrecta')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-card">
      <span className="login-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5ED76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="2rem" height="2rem"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </span>
      <h1>Panel Administrativo</h1>
      
      {error && <p className="login-error">{error}</p>}

      <div className="login-methods">
        <a href="/api/auth/discord" className="login-btn discord-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Iniciar sesión con Discord
        </a>
        
        <div className="login-divider">
          <span>o</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '⏳ Verificando...' : 'Ingresar →'}
          </button>
        </form>
      </div>
    </section>
  )
}

function LoginFallback() {
  return (
    <section className="login-card">
      <span className="login-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5ED76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="2rem" height="2rem"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </span>
      <h1>Panel Administrativo</h1>
      <p>Cargando...</p>
    </section>
  )
}

export default function AdminLoginPage() {
  return (
    <>
      <Header />
      <main className="login-page">
        <Suspense fallback={<LoginFallback />}>
          <LoginContent />
        </Suspense>
      </main>
      <Footer />
      <style>{`
        .login-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .discord-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #5865F2;
          color: white;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          transition: background 0.2s;
        }
        .discord-btn:hover {
          background: #4752C4;
        }
        .login-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #888;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #ddd;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
      `}</style>
    </>
  )
}