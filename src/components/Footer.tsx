const DISCORD_INVITE = 'DNpUmjEKfK'

export default function Footer() {
  return (
    <footer className="footer">
      <div aria-hidden="true" className="footer-separator" />
      <div aria-hidden="true" className="footer-separator-glow" />

      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/assets/ugblanco.svg" alt="UG" className="footer-logo" />
          <span className="footer-brand-name">URUGORDOS</span>
        </div>


      </div>

      <nav className="footer-social" aria-label="Redes sociales">
        <a href={`https://discord.gg/${DISCORD_INVITE}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{ '--brand': '#5865F2' } as React.CSSProperties}>
          <svg viewBox="0 0 256 199" width="20" height="20" fill="currentColor">
            <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-26.587-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 26.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-26.587-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 26.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
          </svg>
          /urugordos
        </a>
        <a href="https://www.youtube.com/@Urugodd" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{ '--brand': '#ff0000' } as React.CSSProperties}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z" />
          </svg>
          @urugodd
        </a>
      </nav>

      <div className="footer-meta">
        <span className="footer-meta-item">Web patrocinada por <a href="https://www.youtube.com/@Urugodd" target="_blank" rel="noopener noreferrer">@urugodd</a></span>
        <span className="footer-meta-sep" aria-hidden="true">|</span>
        <span className="footer-meta-item">Hecho con ❤️ para todos</span>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-bottom-divider" aria-hidden="true">
          <span className="deco-divider-line left" />
          <span className="deco-divider-diamond" />
          <span className="deco-divider-line right" />
        </div>
        <p>© 2026 URUGORDOS. Todos los derechos reservados.</p>
        <p className="footer-dev">
          Desarrollado por{' '}
          <a href="https://ft8d.bio/" target="_blank" rel="noopener noreferrer">LIAM</a>
        </p>
      </div>
    </footer>
  )
}
