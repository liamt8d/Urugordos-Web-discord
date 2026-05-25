'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MegaMenu from './MegaMenu'

const pathTab: Record<string, { cat: 'Discord' | 'URUGODD' | 'Proyectos'; tab: number }> = {
  '/servidor': { cat: 'Discord', tab: 0 },
  '/proyectos': { cat: 'Proyectos', tab: 0 },
  '/donar': { cat: 'Proyectos', tab: 0 },
  '/eventos': { cat: 'Discord', tab: 1 },
  '/dinamicas': { cat: 'Discord', tab: 1 },
  '/sorteos': { cat: 'Discord', tab: 1 },
  '/economia': { cat: 'Discord', tab: 2 },
  '/roles': { cat: 'Discord', tab: 3 },
  '/roles/beneficios': { cat: 'Discord', tab: 3 },
  '/roles/beneficios/obtencion': { cat: 'Discord', tab: 3 },
  '/postular': { cat: 'Discord', tab: 4 },
  '/staff': { cat: 'Discord', tab: 4 },
  '/tickets': { cat: 'Discord', tab: 5 },
  '/apelar': { cat: 'Discord', tab: 5 },
  '/faq': { cat: 'Discord', tab: 5 },
  '/reglas': { cat: 'Discord', tab: 6 },
  '/informacion': { cat: 'Discord', tab: 6 },
  '/guias': { cat: 'Discord', tab: 6 },
  '/notificaciones': { cat: 'Discord', tab: 6 },
  '/urugodd': { cat: 'URUGODD', tab: 0 },
}

const DISCORD_INVITE = 'DNpUmjEKfK'

interface TabCard { href: string; label: string; img: string; desc: string }
interface TabLink { href: string; label: string; external?: boolean }
interface TabContent { cards: TabCard[]; links: TabLink[]; cta?: { href: string; label: string } }

const discordTabs = [
  { label: 'General' },
  { label: 'Comunidad' },
  { label: 'Entretenimiento' },
  { label: 'Roles' },
  { label: 'Staff' },
  { label: 'Soporte' },
  { label: 'Información' },
]

const discordTabContent: TabContent[] = [
  {
    cards: [
      { href: '/servidor', label: 'Sobre el servidor', img: '/cards/servidor.png', desc: 'Comunidad uruguaya de Discord.' },
      { href: `https://discord.gg/${DISCORD_INVITE}`, label: 'Unirse ahora', img: '/cards/unirse.png', desc: '+2.5K miembros activos.' },
    ],
    links: [{ href: `https://discord.gg/${DISCORD_INVITE}`, label: 'discord.gg/urugordos →', external: true }],
  },
  {
    cards: [
      { href: '/eventos', label: 'Eventos', img: '/cards/eventos.png', desc: 'Eventos y actividades del servidor.' },
      { href: '/dinamicas', label: 'Dinámicas', img: '/cards/dinamicas.png', desc: 'Actividades interactivas para todos.' },
      { href: '/sorteos', label: 'Sorteos', img: '/cards/sorteos.png', desc: 'Premios y sorteos exclusivos.' },
    ],
    links: [{ href: '/eventos', label: 'Y más →' }],
  },
  {
    cards: [
      { href: '/economia', label: 'Economía', img: '/cards/economia.png', desc: 'Sistema de economía del servidor.' },
    ],
    links: [{ href: '/economia', label: 'Próximamente →' }],
  },
  {
    cards: [
      { href: '/roles', label: 'Roles del servidor', img: '/cards/roles.png', desc: 'Gana roles subiendo de nivel.' },
      { href: '/roles/beneficios', label: 'Beneficios', img: '/cards/beneficios.png', desc: 'Ventajas de ser parte de la comunidad.' },
      { href: '/roles/beneficios/obtencion', label: 'Cómo obtener', img: '/cards/obtener.png', desc: 'Guía para conseguir roles.' },
    ],
    links: [{ href: '/postular', label: 'Más información' }],
  },
  {
    cards: [
      { href: '/postular', label: 'Postulaciones', img: '/cards/postulaciones.png', desc: 'Únete al equipo de staff.' },
      { href: '/staff', label: 'Ver Staff', img: '/cards/staff.png', desc: 'Conoce al equipo del servidor.' },
    ],
    links: [{ href: '/postular', label: 'Ir a postularse' }],
  },
  {
    cards: [
      { href: '/tickets', label: 'Sistema de Tickets', img: '/cards/TICKETS.png', desc: 'Abre un ticket para contactar al staff.' },
      { href: '/apelar', label: 'Apelaciones', img: '/cards/apelaciones.png', desc: 'Apela un ban o timeout.' },
      { href: '/faq', label: 'FAQ', img: '/cards/FAq.png', desc: 'Preguntas frecuentes.' },
    ],
    links: [{ href: '/tickets', label: 'Sistema de Tickets' }, { href: '/apelar', label: 'Apelar' }, { href: '/faq', label: 'FAQ' }],
    cta: { href: '/tickets', label: 'Ir al sistema de tickets →' },
  },
  {
    cards: [
      { href: '/reglas', label: 'Reglas', img: '/cards/reglas.png', desc: 'Normas del servidor.' },
      { href: '/informacion', label: 'Información del servidor', img: '/cards/INFORMACION.png', desc: 'Todo sobre Urugordos.' },
      { href: '/guias', label: 'Guías', img: '/cards/guias.png', desc: 'Guías del servidor.' },
      { href: '/notificaciones', label: 'Últimas notificaciones', img: '/cards/notificaciones.png', desc: 'Novedades del servidor.' },
    ],
    links: [{ href: '/reglas', label: 'Ver reglas' }, { href: '/informacion', label: 'Información' }, { href: '/guias', label: 'Guías' }, { href: '/notificaciones', label: 'Notificaciones' }],
  },
]

const uruTabs = [
  { label: 'Streamer' },
  { label: 'Contenido' },
  { label: 'Redes' },
]

const uruTabContent: TabContent[] = [
  {
    cards: [
      { href: '/urugodd', label: 'Sobre Uru', img: '/cards/u.urugodd.png', desc: 'Streamer uruguayo y creador de contenido.' },
      { href: '/urugodd', label: 'Trayectoria', img: '/cards/u.trayectoria.png', desc: 'Su historia en el streaming.' },
    ],
    links: [{ href: '/urugodd', label: 'Conoce más sobre Uru' }],
  },
  {
    cards: [
      { href: '/urugodd', label: 'Últimos videos', img: '/cards/u.vides.png', desc: 'Contenido reciente en YouTube.' },
      { href: '/urugodd', label: 'Streams', img: '/cards/u.streams.png', desc: 'Próximos streams en YouTube.' },
    ],
    links: [{ href: '/urugodd', label: 'Ver todo el contenido' }],
  },
  {
    cards: [
      { href: '/urugodd', label: 'Redes sociales', img: '/cards/u.redes.png', desc: 'Todas las redes de Urugodd.' },
    ],
    links: [{ href: '/urugodd', label: 'Ver redes' }],
  },
]

const proyectoTabs = [{ label: 'General' }]

const proyectoTabContent: TabContent[] = [
  {
    cards: [
      { href: '/proyectos', label: 'Proyectos', img: '/cards/proyectos.png', desc: 'Proyectos de la comunidad.' },
      { href: '/donar', label: 'Donar', img: '/cards/donar.png', desc: 'Apoya al proyecto con una donación.' },
    ],
    links: [
      { href: '/proyectos', label: 'Ver proyectos' },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileCategory, setMobileCategory] = useState<'Discord' | 'URUGODD' | 'Proyectos'>('Discord')
  const [mobileTab, setMobileTab] = useState(0)
  const currentPath = pathTab[pathname]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = useCallback((label: string) => {
    setActiveMenu(prev => prev === label ? null : label)
  }, [])

  const openMobile = () => {
    setMenuOpen(true)
    if (currentPath) {
      setMobileCategory(currentPath.cat)
      setMobileTab(currentPath.tab)
    } else {
      setMobileCategory('Discord')
      setMobileTab(0)
    }
    document.documentElement.style.overflow = 'hidden'
  }

  const closeMobile = () => {
    setMenuOpen(false)
    document.documentElement.style.overflow = ''
  }

  useEffect(() => {
    return () => { document.documentElement.style.overflow = '' }
  }, [])

  const currentContent = mobileCategory === 'Discord' ? discordTabContent : mobileCategory === 'URUGODD' ? uruTabContent : proyectoTabContent
  const currentTabs = mobileCategory === 'Discord' ? discordTabs : mobileCategory === 'URUGODD' ? uruTabs : proyectoTabs
  const currentColor = mobileCategory === 'Discord' ? '#5865F2' : mobileCategory === 'URUGODD' ? '#F5ED76' : '#60b080'
  const section = currentContent[mobileTab]
  const subtabsRef = useRef<HTMLDivElement>(null)

  const goTab = (i: number) => {
    const len = currentTabs.length
    if (len === 0) return
    const next = ((i % len) + len) % len
    setMobileTab(next)
    requestAnimationFrame(() => {
      subtabsRef.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    })
  }

  const renderCard = (card: { href: string; label: string; img: string; desc: string }) => (
    <Link key={card.href + card.label} href={card.href} className="mm-card" onClick={closeMobile}>
      <div className="mm-card-img" style={{ backgroundImage: `url(${card.img})` }} />
      <div className="mm-card-body">
        <h3 className="mm-card-title">{card.label}</h3>
        <p className="mm-card-desc">{card.desc}</p>
      </div>
    </Link>
  )

  return (
    <header className={`header${scrolled || activeMenu ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="header-inner">
        <nav className="header-nav">
          <a href="/" className={`header-nav-link${pathname === '/' ? ' active' : ''}`}>Inicio</a>
          <MegaMenu
            label="Proyectos"
            color="#60b080"
            isOpen={activeMenu === 'Proyectos'}
            onToggle={() => toggleMenu('Proyectos')}
            tabs={proyectoTabs}
            tabContent={proyectoTabContent}
            initialTab={currentPath?.cat === 'Proyectos' ? currentPath.tab : 0}
            isCurrentPage={currentPath?.cat === 'Proyectos'}
          />
          <MegaMenu
            label="Discord"
            color="#5865F2"
            isOpen={activeMenu === 'Discord'}
            onToggle={() => toggleMenu('Discord')}
            tabs={discordTabs}
            tabContent={discordTabContent}
            initialTab={currentPath?.cat === 'Discord' ? currentPath.tab : 0}
            isCurrentPage={currentPath?.cat === 'Discord'}
          />
          <MegaMenu
            label="URUGODD"
            color="#F5ED76"
            isOpen={activeMenu === 'Uru'}
            onToggle={() => toggleMenu('Uru')}
            tabs={uruTabs}
            tabContent={uruTabContent}
            initialTab={currentPath?.cat === 'URUGODD' ? currentPath.tab : 0}
            isCurrentPage={currentPath?.cat === 'URUGODD'}
          />
        </nav>

        <button className="header-hamburger" onClick={menuOpen ? closeMobile : openMobile} aria-label="Menú">
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>

        <a href="/" className="header-logo">
          <img src="/assets/ugblanco.svg" alt="UG" className="header-logo-img" />
          <span className="header-logo-title">URUGORDOS</span>
        </a>

        <div className="header-right">
          <a href={`https://discord.gg/${DISCORD_INVITE}`} target="_blank" rel="noreferrer" className="header-discord-btn">
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg>
            Discord
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="mm-overlay" onClick={closeMobile} />
      )}

      <div className={`mm-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mm-header">
          <a href="/" className="mm-logo" onClick={closeMobile}>
            <img src="/assets/ugblanco.svg" alt="UG" className="mm-logo-img" />
            <span className="mm-logo-title">URUGORDOS</span>
          </a>
          <button className="mm-close" onClick={closeMobile} aria-label="Cerrar menú">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mm-categories">
          <button
            className={`mm-cat-btn ${mobileCategory === 'Discord' ? 'active' : ''}`}
            style={mobileCategory === 'Discord' ? { color: '#5865F2', borderColor: '#5865F2' } : undefined}
            onClick={() => { setMobileCategory('Discord'); setMobileTab(0) }}
          >
            Discord
          </button>
          <button
            className={`mm-cat-btn ${mobileCategory === 'URUGODD' ? 'active' : ''}`}
            style={mobileCategory === 'URUGODD' ? { color: '#F5ED76', borderColor: '#F5ED76' } : undefined}
            onClick={() => { setMobileCategory('URUGODD'); setMobileTab(0) }}
          >
            URUGODD
          </button>
          <button
            className={`mm-cat-btn ${mobileCategory === 'Proyectos' ? 'active' : ''}`}
            style={mobileCategory === 'Proyectos' ? { color: '#60b080', borderColor: '#60b080' } : undefined}
            onClick={() => { setMobileCategory('Proyectos'); setMobileTab(0) }}
          >
            Proyectos
          </button>
        </div>

        <div className="mm-subtabs-wrap">
          <button
            className="mm-stab-btn mm-stab-prev"
            onClick={() => goTab(mobileTab - 1)}
            aria-label="Anterior"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="mm-subtabs" ref={subtabsRef}>
            {currentTabs.map((t, i) => (
              <button
                key={t.label}
                className={`mm-subtab ${mobileTab === i ? 'active' : ''}${currentPath?.cat === mobileCategory && currentPath?.tab === i ? ' current' : ''}`}
                style={mobileTab === i ? { color: currentColor, borderColor: currentColor } : currentPath?.cat === mobileCategory && currentPath?.tab === i ? { color: currentColor } : undefined}
                onClick={() => goTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            className="mm-stab-btn mm-stab-next"
            onClick={() => goTab(mobileTab + 1)}
            aria-label="Siguiente"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="mm-body" key={mobileCategory + '-' + mobileTab}>
          {section?.cards.map(renderCard)}

          {section?.links && (
            <div className="mm-links">
              {section.links.map(link =>
                link.external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="mm-link">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="mm-link" onClick={closeMobile}>
                    {link.label}
                  </Link>
                )
              )}
            </div>
          )}

          {section?.cta && (
            <a
              href={section.cta.href}
              className="mm-cta"
              style={{ color: currentColor, borderColor: currentColor }}
              onClick={closeMobile}
            >
              {section.cta.label}
            </a>
          )}
        </div>

        <div className="mm-footer">
          <a href={`https://discord.gg/${DISCORD_INVITE}`} target="_blank" rel="noreferrer" className="mm-discord" onClick={closeMobile}>
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg>
            Discord
          </a>
        </div>
      </div>
    </header>
  )
}