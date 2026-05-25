'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LeaderboardEntry {
  rank: number
  userId: string
  displayName: string
  wallet: number
  bank: number
  total: number
}

interface ShopItem {
  id: string
  name: string
  description?: string
  price?: number
  stock: number
  emoji?: string
  lore?: string
}

function formatBills(amount: number): string {
  if (!amount || amount <= 0) return `0 🪙`
  const oro = Math.floor(amount / 100)
  let rest = amount % 100
  const plata = Math.floor(rest / 50)
  const bronce = rest % 50
  const parts: string[] = []
  if (oro > 0) parts.push(`${oro} 🟡`)
  if (plata > 0) parts.push(`${plata} 🔘`)
  if (bronce > 0) parts.push(`${bronce} 🟤`)
  return parts.join(' ') || `0 🪙`
}

function getCategory(id: string): string {
  const n = parseInt(id)
  if (n >= 101 && n <= 110) return 'botin'
  if (n >= 201 && n <= 207) return 'utilidades'
  if (n >= 301 && n <= 304) return 'palenque'
  if (n >= 401 && n <= 408) return 'inversiones'
  if (n >= 501 && n <= 504) return 'interaccion'
  return 'otras'
}

function cleanEmoji(emoji?: string): string {
  if (!emoji) return '🏷️'
  if (emoji.startsWith('<')) return '🎁'
  return emoji
}

const CATEGORIES = [
  { id: 'botin', label: 'Botín y Cajas', emoji: '🎁' },
  { id: 'utilidades', label: 'Utilidades y Defensa', emoji: '🛠️' },
  { id: 'palenque', label: 'El Palenque', emoji: '🎲' },
  { id: 'inversiones', label: 'Inversiones', emoji: '🏪' },
  { id: 'interaccion', label: 'Interacción', emoji: '💬' },
]

const COMMANDS = [
  {
    category: 'Economía',
    emoji: '💰',
    commands: [
      { name: 'balance / bal', desc: 'Revisa tu saldo y estadísticas.' },
      { name: 'deposit / dep', desc: 'Deposita monedas al banco.' },
      { name: 'withdraw / with', desc: 'Retira monedas del banco.' },
      { name: 'pay', desc: 'Transfiere monedas a otro usuario.' },
      { name: 'ecotop / top / lb', desc: 'Top 10 de usuarios más ricos.' },
      { name: 'shop / tienda', desc: 'Abre la tienda del servidor.' },
      { name: 'buy / comprar', desc: 'Compra un item.' },
      { name: 'inv / inventory', desc: 'Mira tu inventario.' },
    ],
  },
  {
    category: 'Ingresos',
    emoji: '💼',
    commands: [
      { name: 'work / trabajar', desc: 'Trabaja para ganar monedas. 15s cooldown.' },
      { name: 'crime / robar', desc: 'Crimen arriesgado. 1h cooldown.' },
      { name: 'slut', desc: 'Ganancia rápida. 2m cooldown. Bajo riesgo.' },
      { name: 'rob', desc: 'Roba a otro usuario. 1m cooldown.' },
    ],
  },
  {
    category: 'Apuestas',
    emoji: '🎲',
    commands: [
      { name: 'gamble', desc: 'Apuesta en el casino. 10s cooldown.' },
      { name: 'roulette', desc: 'Ruleta rusa. 30s cooldown.' },
      { name: 'blackjack', desc: 'Juega blackjack. 30s cooldown.' },
      { name: 'slot / slot-machine', desc: 'Tragaperras. 15s cooldown.' },
      { name: 'cock-fight / cf', desc: 'Pelea de gallos. 30s cooldown.' },
      { name: 'high-low', desc: 'Adivina si el siguiente número es mayor o menor. 15s cooldown.' },
    ],
  },
  {
    category: 'Tienda',
    emoji: '🛒',
    commands: [
      { name: 'use-item', desc: 'Usa un item de tu inventario.' },
    ],
  },
]

const INFO_SECTIONS = [
  {
    title: 'Sistema Monetario',
    icon: '💰',
    content: 'La economía se basa en el Urucoin. Cada 100 monedas equivalen a 1 Urucoin entero.',
    details: [
      { label: '🟡 Oro', value: '1 Oro = 1 Urucoin' },
      { label: '🔘 Plata', value: '1 Plata = 0.50 Urucoins' },
      { label: '🟤 Bronce', value: '1 Bronce = 0.01 Urucoins' },
    ],
  },
  {
    title: 'Cartera y Banco',
    icon: '🏦',
    content: 'Cartera para gastar, banco para guardar seguro. Usa !deposit y !withdraw para transferir.',
    details: [],
  },
  {
    title: 'Impuesto',
    icon: '📋',
    content: 'Cada 12 horas al usar !work se aplica un 2% sobre tu cartera.',
    details: [
      { label: 'Intervalo', value: 'Cada 12 horas' },
      { label: 'Porcentaje', value: '2% de la cartera' },
    ],
  },
  {
    title: 'Cooldowns',
    icon: '⏱️',
    content: 'Cada comando tiene un tiempo de espera antes de usarse de nuevo.',
    details: [
      { label: '!work', value: '15 segundos' },
      { label: '!slut', value: '2 minutos' },
      { label: '!crime', value: '1 hora' },
    ],
  },
]

export default function EconomiaPage() {
  const [tab, setTab] = useState<'comandos' | 'leaderboard' | 'tienda' | 'info'>('comandos')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [shopItems, setShopItems] = useState<ShopItem[]>([])
  const [shopCat, setShopCat] = useState('botin')
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('/api/economia')
      .then(r => r.json())
      .then(data => {
        if (data.leaderboard) setLeaderboard(data.leaderboard)
        if (data.shop) setShopItems(data.shop)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredShop = shopItems.filter(i => getCategory(i.id) === shopCat)
  const isStockOk = (item: ShopItem) => item.stock === -1 || item.stock > 0

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Economía</span>
            <h1>Sistema de Economía</h1>
            <p>Monedas, tienda, apuestas y más del servidor.</p>
          </div>
        </section>

        <section className="eco-section">
          <div className={`eco-tabs${mounted ? ' loaded' : ''}`}>
            {(['comandos', 'leaderboard', 'tienda', 'info'] as const).map(t => (
              <button key={t} className={`eco-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                {t === 'comandos' && '📋 Comandos'}
                {t === 'leaderboard' && '🏆 Leaderboard'}
                {t === 'tienda' && '🛒 Tienda'}
                {t === 'info' && 'ℹ️ Info'}
              </button>
            ))}
          </div>

          <div className={`eco-content${mounted ? ' loaded' : ''}`}>
            {tab === 'comandos' && (
              <div className="eco-commands">
                {COMMANDS.map(cat => (
                  <div key={cat.category} className="eco-cmd-cat">
                    <h3 className="eco-cmd-cat-title">{cat.emoji} {cat.category}</h3>
                    <div className="eco-cmd-list">
                      {cat.commands.map(cmd => (
                        <div key={cmd.name} className="eco-cmd-item">
                          <code className="eco-cmd-name">!{cmd.name}</code>
                          <span className="eco-cmd-desc">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'leaderboard' && (
              <div className="eco-lb">
                {loading ? (
                  <div className="eco-loading">Cargando...</div>
                ) : leaderboard.length === 0 ? (
                  <div className="eco-empty">No hay datos aún.</div>
                ) : (
                  <>
                    <div className="eco-lb-table">
                      {leaderboard.map(u => (
                        <div key={u.userId} className={`eco-lb-row${u.rank <= 3 ? ` rank-${u.rank}` : ''}`}>
                          <span className="eco-lb-rank">{u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : `#${u.rank}`}</span>
                          <span className="eco-lb-name">{u.displayName || u.userId}</span>
                          <span className="eco-lb-amount">{formatBills(u.total)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="eco-lb-note">Top 10 usuarios más ricos del servidor.</p>
                  </>
                )}
              </div>
            )}

            {tab === 'tienda' && (
              <div className="eco-shop">
                {loading ? (
                  <div className="eco-loading">Cargando...</div>
                ) : (
                  <>
                    <div className="eco-shop-tabs">
                      {CATEGORIES.map(cat => (
                        <button key={cat.id} className={`eco-shop-tab${shopCat === cat.id ? ' active' : ''}`} onClick={() => setShopCat(cat.id)}>
                          {cat.emoji} {cat.label}
                        </button>
                      ))}
                    </div>
                    <div className="eco-shop-grid">
                      {filteredShop.filter(isStockOk).map(item => (
                        <div key={item.id} className="eco-shop-card">
                          <div className="eco-shop-card-header">
                            <span className="eco-shop-item-icon">{cleanEmoji(item.emoji)}</span>
                            <span className="eco-shop-item-name">{item.name}</span>
                          </div>
                          <p className="eco-shop-item-desc">{item.description || 'Sin descripción.'}</p>
                          {item.price != null && (
                            <p className="eco-shop-item-price">{formatBills(item.price)}</p>
                          )}
                          <p className="eco-shop-item-stock">
                            {item.stock === -1 ? '∞ Ilimitado' : `${item.stock} en stock`}
                          </p>
                          {item.lore && <p className="eco-shop-item-lore">"{item.lore}"</p>}
                        </div>
                      ))}
                      {filteredShop.filter(isStockOk).length === 0 && (
                        <div className="eco-empty">No hay items en esta categoría.</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {tab === 'info' && (
              <div className="eco-info-grid">
                {INFO_SECTIONS.map((section, i) => (
                  <div key={section.title} className="eco-info-card" style={{ animationDelay: `${i * 60}ms` }}>
                    <h3 className="eco-info-title">{section.icon} {section.title}</h3>
                    <p className="eco-info-text">{section.content}</p>
                    {section.details.length > 0 && (
                      <div className="eco-info-details">
                        {section.details.map(d => (
                          <div key={d.label} className="eco-info-detail-row">
                            <span>{d.label}</span>
                            <span>{d.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        html { scrollbar-gutter: stable; }
        .hero-small h1 { font-family: 'Cinzel', serif; font-size: clamp(2rem, 5vw, 3.5rem); }
        .hero-badge { font-family: 'Cinzel', serif; font-weight: 700; }

        .eco-section {
          max-width: 48rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
        }

        /* ── Tabs ─────────────────────────── */
        .eco-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .eco-tabs.loaded { opacity: 1; transform: translateY(0); }

        .eco-tab {
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Cinzel', serif;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .eco-tab:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.06);
        }
        .eco-tab.active {
          border-color: #b06040;
          background: rgba(176,96,64,0.1);
          color: #b06040;
        }

        /* ── Content ──────────────────────── */
        .eco-content {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .eco-content.loaded { opacity: 1; transform: translateY(0); }

        .eco-empty, .eco-loading {
          text-align: center;
          opacity: 0.5;
          padding: 3rem 0;
          font-size: 0.9rem;
        }

        /* ── Commands ─────────────────────── */
        .eco-cmd-cat { margin-bottom: 2rem; }
        .eco-cmd-cat-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #b06040;
          margin-bottom: 0.75rem;
        }
        .eco-cmd-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .eco-cmd-item {
          display: flex;
          gap: 1rem;
          align-items: baseline;
          padding: 0.7rem 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.5rem;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          animation: fadeSlideIn 0.4s ease both;
        }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(1) { animation-delay: 0ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(2) { animation-delay: 40ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(3) { animation-delay: 80ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(4) { animation-delay: 120ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(5) { animation-delay: 160ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(6) { animation-delay: 200ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(7) { animation-delay: 240ms; }
        .eco-cmd-cat:nth-child(1) .eco-cmd-item:nth-child(8) { animation-delay: 280ms; }
        .eco-cmd-cat:nth-child(2) .eco-cmd-item:nth-child(1) { animation-delay: 60ms; }
        .eco-cmd-cat:nth-child(2) .eco-cmd-item:nth-child(2) { animation-delay: 100ms; }
        .eco-cmd-cat:nth-child(2) .eco-cmd-item:nth-child(3) { animation-delay: 140ms; }
        .eco-cmd-cat:nth-child(2) .eco-cmd-item:nth-child(4) { animation-delay: 180ms; }
        .eco-cmd-cat:nth-child(3) .eco-cmd-item:nth-child(1) { animation-delay: 80ms; }
        .eco-cmd-cat:nth-child(3) .eco-cmd-item:nth-child(2) { animation-delay: 120ms; }
        .eco-cmd-cat:nth-child(3) .eco-cmd-item:nth-child(3) { animation-delay: 160ms; }
        .eco-cmd-cat:nth-child(3) .eco-cmd-item:nth-child(4) { animation-delay: 200ms; }
        .eco-cmd-cat:nth-child(3) .eco-cmd-item:nth-child(5) { animation-delay: 240ms; }
        .eco-cmd-cat:nth-child(3) .eco-cmd-item:nth-child(6) { animation-delay: 280ms; }
        .eco-cmd-cat:nth-child(4) .eco-cmd-item:nth-child(1) { animation-delay: 100ms; }
        .eco-cmd-item:hover {
          border-color: rgba(176,96,64,0.3);
          background: rgba(255,255,255,0.06);
          transform: translateX(4px);
        }
        .eco-cmd-name {
          font-family: monospace;
          font-size: 0.82rem;
          color: #6080c0;
          flex-shrink: 0;
          min-width: 13rem;
        }
        .eco-cmd-desc { font-size: 0.82rem; color: rgba(255,255,255,0.55); }

        /* ── Leaderboard ──────────────────── */
        .eco-lb-table { display: flex; flex-direction: column; gap: 0.35rem; max-width: 48rem; margin: 0 auto; }
        .eco-lb-row {
          display: grid;
          grid-template-columns: 3rem 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.5rem;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          animation: fadeSlideIn 0.4s ease both;
        }
        .eco-lb-row:nth-child(1) { animation-delay: 0ms; }
        .eco-lb-row:nth-child(2) { animation-delay: 60ms; }
        .eco-lb-row:nth-child(3) { animation-delay: 120ms; }
        .eco-lb-row:nth-child(4) { animation-delay: 180ms; }
        .eco-lb-row:nth-child(5) { animation-delay: 240ms; }
        .eco-lb-row:nth-child(6) { animation-delay: 300ms; }
        .eco-lb-row:nth-child(7) { animation-delay: 360ms; }
        .eco-lb-row:nth-child(8) { animation-delay: 420ms; }
        .eco-lb-row:nth-child(9) { animation-delay: 480ms; }
        .eco-lb-row:nth-child(10) { animation-delay: 540ms; }
        .eco-lb-row:hover {
          border-color: rgba(176,96,64,0.3);
          background: rgba(255,255,255,0.05);
          transform: translateX(4px);
        }
        .eco-lb-row.rank-1 { border-color: rgba(255,215,0,0.35); background: rgba(255,215,0,0.04); }
        .eco-lb-row.rank-2 { border-color: rgba(192,192,192,0.25); background: rgba(192,192,192,0.03); }
        .eco-lb-row.rank-3 { border-color: rgba(205,127,50,0.25); background: rgba(205,127,50,0.03); }
        .eco-lb-rank { font-size: 1.1rem; text-align: center; }
        .eco-lb-id { font-size: 0.82rem; color: rgba(255,255,255,0.3); font-family: monospace; }
        .eco-lb-amount { font-size: 0.88rem; color: #b06040; font-weight: 700; }
        .eco-lb-note { text-align: center; font-size: 0.78rem; opacity: 0.3; margin-top: 1rem; }

        /* ── Shop ─────────────────────────── */
        .eco-shop-tabs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .eco-shop-tab {
          padding: 0.4rem 0.9rem;
          border-radius: 0.4rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.5);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .eco-shop-tab:hover { border-color: rgba(255,255,255,0.15); color: #fff; }
        .eco-shop-tab.active { border-color: #b06040; background: rgba(176,96,64,0.1); color: #b06040; }
        .eco-shop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; max-width: 48rem; margin: 0 auto; }
        .eco-shop-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          padding: 1.1rem;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          animation: fadeSlideIn 0.4s ease both;
        }
        .eco-shop-card:nth-child(1) { animation-delay: 0ms; }
        .eco-shop-card:nth-child(2) { animation-delay: 60ms; }
        .eco-shop-card:nth-child(3) { animation-delay: 120ms; }
        .eco-shop-card:nth-child(4) { animation-delay: 180ms; }
        .eco-shop-card:nth-child(5) { animation-delay: 240ms; }
        .eco-shop-card:nth-child(6) { animation-delay: 300ms; }
        .eco-shop-card:nth-child(7) { animation-delay: 360ms; }
        .eco-shop-card:nth-child(8) { animation-delay: 420ms; }
        .eco-shop-card:hover {
          border-color: rgba(176,96,64,0.3);
          background: rgba(255,255,255,0.06);
          transform: translateY(-2px);
        }
        .eco-shop-card-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem; }
        .eco-shop-item-icon { font-size: 1.3rem; }
        .eco-shop-item-name { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #fff; }
        .eco-shop-item-desc { font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem; line-height: 1.5; }
        .eco-shop-item-price { font-size: 0.82rem; color: #b06040; font-weight: 600; margin-bottom: 0.2rem; }
        .eco-shop-item-stock { font-size: 0.72rem; color: rgba(255,255,255,0.28); }
        .eco-shop-item-lore { font-size: 0.75rem; color: rgba(255,255,255,0.3); font-style: italic; margin-top: 0.3rem; }

        /* ── Info ─────────────────────────── */
        .eco-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .eco-info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 1.25rem;
          animation: fadeSlideIn 0.4s ease both;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .eco-info-card:hover {
          border-color: rgba(176,96,64,0.3);
          background: rgba(255,255,255,0.05);
        }
        .eco-info-title { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: #b06040; margin-bottom: 0.4rem; }
        .eco-info-text { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.6; margin-bottom: 0.7rem; }
        .eco-info-details { display: flex; flex-direction: column; gap: 0.2rem; }
        .eco-info-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 0.82rem;
        }
        .eco-info-detail-row span:first-child { color: rgba(255,255,255,0.4); }
        .eco-info-detail-row span:last-child { color: rgba(255,255,255,0.65); }

        /* ── Mobile ───────────────────────── */
        @media (max-width: 600px) {
          .eco-cmd-list { grid-template-columns: 1fr; }
          .eco-cmd-item { flex-direction: column; gap: 0.2rem; }
          .eco-cmd-name { min-width: unset; }
          .eco-shop-grid { grid-template-columns: 1fr; }
          .eco-shop-tabs { gap: 0.25rem; }
          .eco-shop-tab { font-size: 0.72rem; padding: 0.3rem 0.65rem; }
          .eco-tabs { gap: 0.35rem; }
          .eco-tab { font-size: 0.75rem; padding: 0.4rem 0.8rem; }
          .eco-info-grid { grid-template-columns: 1fr; }
          .eco-lb-row { grid-template-columns: 2.5rem 1fr auto; gap: 0.5rem; padding: 0.6rem 0.85rem; }
        }
      `}</style>
    </>
  )
}