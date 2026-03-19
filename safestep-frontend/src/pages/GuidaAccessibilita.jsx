import { Link, Navigate, useParams } from "react-router-dom"
import "../styles/pages/GuidaAccessibilita.css"
import { getGuidePageData } from "../utils/guidePagesConfig"

function GuidaAccessibilita() {
  const { categoria } = useParams()

  const pageData = getGuidePageData(categoria)

  if (!pageData) {
    return <Navigate to="/terme" replace />
  }

  const { guida, theme, label, backLabel, backPath } = pageData

  return (
    <div
      className="guida-accessibilita-page"
      style={{
        "--guide-page-bg": theme.pageBg,
        "--guide-hero-bg": theme.heroBg,
        "--guide-badge-bg": theme.badgeBg,
        "--guide-badge-text": theme.badgeText,
        "--guide-title": theme.title,
        "--guide-text": theme.text,
        "--guide-primary-gradient": theme.primaryGradient,
        "--guide-secondary-bg": theme.secondaryBg,
        "--guide-secondary-text": theme.secondaryText,
        "--guide-secondary-border": theme.secondaryBorder,
        "--guide-icon-bg": theme.iconBg,
        "--guide-icon-color": theme.iconColor,
        "--guide-highlight-bg": theme.highlightBg,
        "--guide-check-icon": theme.checkIcon,
      }}
    >
      <section className="guida-accessibilita-hero">
        <div className="guida-accessibilita-hero-content">
          <div className="guida-accessibilita-badge">{label}</div>

          <h1>{guida.heroTitle}</h1>
          <p>{guida.heroText}</p>

          <div className="guida-accessibilita-hero-actions">
            <Link to={backPath} className="guida-accessibilita-primary-btn">
              {backLabel}
            </Link>

            <a
              href="#cosa-controllare"
              className="guida-accessibilita-secondary-btn"
            >
              Vai alla guida
            </a>
          </div>
        </div>
      </section>

      <main className="guida-accessibilita-container">
        <section className="guida-accessibilita-intro-card">
          <div className="guida-accessibilita-intro-text">
            <h2>{guida.introTitle}</h2>

            {guida.introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="guida-accessibilita-intro-image">
            {guida.image ? (
              <img src={guida.image} alt={guida.imageAlt} />
            ) : (
              <div className="guida-accessibilita-image-placeholder">
                <i className="bi bi-image"></i>
                <span>Inserisci qui l'immagine della categoria</span>
              </div>
            )}
          </div>
        </section>

        <section id="cosa-controllare" className="guida-accessibilita-section">
          <div className="guida-accessibilita-section-header">
            <h2>{guida.checklistTitle}</h2>
            <p>{guida.checklistText}</p>
          </div>

          <div className="guida-accessibilita-checklist-grid">
            {guida.checklist.map((item, index) => (
              <div key={index} className="guida-accessibilita-check-card">
                <i className="bi bi-check-circle-fill"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="guida-accessibilita-section">
          <div className="guida-accessibilita-section-header">
            <h2>{guida.tipsTitle}</h2>
            <p>{guida.tipsText}</p>
          </div>

          <div className="guida-accessibilita-tips-grid">
            {guida.tips.map((tip, index) => (
              <article key={index} className="guida-accessibilita-tip-card">
                <div className="guida-accessibilita-tip-icon">
                  <i className={`bi ${tip.icon}`}></i>
                </div>

                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="guida-accessibilita-highlight-box">
          <h2>{guida.highlightTitle}</h2>
          <p>{guida.highlightText}</p>
        </section>
      </main>
    </div>
  )
}

export default GuidaAccessibilita
