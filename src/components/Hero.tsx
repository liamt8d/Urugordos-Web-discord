const DISCORD_INVITE = 'DNpUmjEKfK'

export default function Hero() {
  return (
    <section className="hero">
      <img src="/banner/banner.png" alt="" className="hero-bg" />
      <div className="hero-bg-overlay" />
      <div className="hero-gradient-down" />
      <div className="hero-gradient-up" />
      <div className="hero-content">
        <img
          src="https://cdn.discordapp.com/icons/1333180919112273993/0102929ab7361612a72a94d2fdee3ca4.png?size=512"
          alt="UG icon" className="hero-icon-mobile icon-img" width={200} height={200}
        />
        <div>
          <div className="hero-text">
            <h1 className="hero-title">
              ¡Que esperas para unirte a <span className="highlight">Urugordos</span>!
            </h1>
            <p className="hero-description">
              La comunidad de Urugodd en Discord. Sumate y se parte. 🚀
            </p>
          </div>
          <div className="hero-buttons">
            <a href="/moderacion" className="btn btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.998 2l.032.002.086.005a1 1 0 0 1 .342.104l.105.062.097.076.016.015.247.21a11 11 0 0 0 7.189 2.537l.342-.01a1 1 0 0 1 1.005.717 13 13 0 0 1-9.208 16.25 1 1 0 0 1-.502 0 13 13 0 0 1-9.209-16.25 1 1 0 0 1 1.005-.717 11 11 0 0 0 7.791-2.75l.046-.036.053-.041a1 1 0 0 1 .217-.112l.075-.023.036-.01a1 1 0 0 1 .12-.022l.086-.005zm.002 2.296-.176.135a13 13 0 0 1-7.288 2.572l-.264.006-.064.31a11 11 0 0 0 1.064 7.175l.17.314a11 11 0 0 0 6.49 5.136l.068.019z" />
              </svg>
              ¡Nuestra Guía!
            </a>
            <a href={`https://discord.gg/${DISCORD_INVITE}`} target="_blank" rel="noreferrer" className="btn btn-discord">
              <svg viewBox="0 0 256 199" width="20" height="20" fill="currentColor">
                <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-26.587-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 26.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-26.587-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 26.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
              </svg>
              discord.gg/urugordos
            </a>
          </div>
        </div>
        <img
          src="https://cdn.discordapp.com/icons/1333180919112273993/0102929ab7361612a72a94d2fdee3ca4.png?size=512"
          alt="UG icon" className="hero-icon-desktop icon-img" width={300} height={300}
        />
      </div>
    </section>
  )
}
