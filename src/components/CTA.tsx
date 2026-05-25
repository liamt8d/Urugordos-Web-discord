'use client'

import { useEffect, useState } from 'react'

const DISCORD_INVITE = 'DNpUmjEKfK'

export default function CTA() {
  const [memberCount, setMemberCount] = useState('Cargando...')

  useEffect(() => {
    async function updateCount() {
      try {
        const res = await fetch(`https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`)
        const data = await res.json()
        const count = data.approximate_member_count ?? data.guild?.approximate_member_count
        if (count) setMemberCount(`+${count.toLocaleString()} Miembros`)
      } catch {
        setMemberCount('+2591 Miembros')
      }
    }

    updateCount()
    const interval = setInterval(updateCount, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="cta-section">
      <h2 className="cta-title">🎉 ¡Forma parte de nuestra comunidad! 🎉</h2>
      <p className="cta-text">
        Conoce nuevas personas, comparte momentos únicos y disfruta de un espacio
        diseñado para relajarte, socializar y pasar un buen rato. ¡Estamos ansiosos
        por darte la bienvenida!
      </p>
      <a
        href={`https://discord.gg/${DISCORD_INVITE}`}
        target="_blank"
        rel="noreferrer"
        className="cta-btn"
      >
        {memberCount}
      </a>
    </section>
  )
}
