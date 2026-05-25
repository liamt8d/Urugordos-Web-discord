'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface MegaMenuProps {
  label: string
  color: string
  isOpen: boolean
  onToggle: () => void
  tabs: { label: string }[]
  tabContent: {
    cards: { href: string; label: string; img: string; desc: string }[]
    links: { href: string; label: string; external?: boolean }[]
    cta?: { href: string; label: string }
  }[]
  initialTab?: number
  isCurrentPage?: boolean
}

export default function MegaMenu({ label, color, isOpen, onToggle, tabs, tabContent, initialTab, isCurrentPage }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState(initialTab ?? 0)
  const [animating, setAnimating] = useState(false)
  const [visible, setVisible] = useState(false)
  const [tabFade, setTabFade] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
      setActiveTab(initialTab ?? 0)
      setTabFade(true)
    } else {
      setAnimating(false)
      const timeout = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen, initialTab])

  const switchTab = (i: number) => {
    if (i === activeTab) return
    setTabFade(false)
    setTimeout(() => {
      setActiveTab(i)
      setTabFade(true)
    }, 120)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && isOpen) {
        onToggle()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  return (
    <div ref={containerRef} className="megamenu-root">
      <button
        className={`megamenu-trigger${isOpen || isCurrentPage ? ' active' : ''}`}
        style={{ '--mm-color': color, color: isOpen ? color : isCurrentPage ? color : '#fff' } as React.CSSProperties}
        onClick={onToggle}
      >
        {label}
        <svg
          width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {visible && (
        <div
          className="megamenu-dropdown"
          style={{
            maxHeight: animating ? '600px' : '0',
            opacity: animating ? 1 : 0,
          }}
        >
          <div className="megamenu-inner">
            <div className="megamenu-tabs">
              {tabs.map((tab, i) => (
                <div
                  key={tab.label}
                  className={`megamenu-tab ${activeTab === i ? 'active' : ''}${initialTab === i ? ' current' : ''}`}
                  style={{ borderLeftColor: activeTab === i ? color : 'transparent' }}
                  onClick={() => switchTab(i)}
                >
                  {tab.label}
                </div>
              ))}

              {tabContent[activeTab]?.cta && (
                <div className={`megamenu-cta-section ${tabFade ? 'megamenu-content-visible' : 'megamenu-content-hidden'}`}>
                  <a
                    href={tabContent[activeTab].cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="megamenu-cta"
                    style={{ color }}
                  >
                    {tabContent[activeTab].cta.label}
                  </a>
                </div>
              )}

              <div className={`megamenu-links-section ${tabFade ? 'megamenu-content-visible' : 'megamenu-content-hidden'}`}>
                {tabContent[activeTab]?.links.map(link =>
                  link.external ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="megamenu-link">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className="megamenu-link" onClick={onToggle}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className={`megamenu-cards ${tabFade ? 'megamenu-content-visible' : 'megamenu-content-hidden'}`}>
              {tabContent[activeTab]?.cards.map(card => (
                <Link
                  key={card.href + card.label}
                  href={card.href}
                  className="megamenu-card"
                  onClick={onToggle}
                >
                  <div className="megamenu-card-img" style={{ backgroundImage: `url(${card.img})` }} />
                  <h3 className="megamenu-card-title">{card.label}</h3>
                  <p className="megamenu-card-desc">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
