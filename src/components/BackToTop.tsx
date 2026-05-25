'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '2.75rem',
        height: '2.75rem',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(20,26,33,0.85)',
        color: '#b06040',
        fontSize: '1.3rem',
        cursor: 'pointer',
        zIndex: 999,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(0.75rem)',
        transition: 'opacity 0.25s, transform 0.25s',
        pointerEvents: show ? 'auto' : 'none',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
    >
      ↑
    </button>
  )
}
