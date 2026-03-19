import { Link, Navigate, useParams } from "react-router-dom"
import "../styles/pages/ConsigliVisita.css"
import { getGuidePageData } from "../utils/guidePagesConfig"

function ConsigliVisita() {
  const { categoria } = useParams()

  const pageData = getGuidePageData(categoria)

  if (!pageData) {
    return <Navigate to="/terme" replace />
  }

  const { consigli, theme, backLabel, backPath } = pageData

  return (
    <div
      className="consigli-visita-page"
      style={{
        "--consigli-page-bg": theme.pageBg,
        "--consigli-hero-bg": theme.heroBg,
        "--consigli-label-bg": theme.badgeBg,
        "--consigli-label-text": theme.badgeText,
        "--consigli-title": theme.title,
        "--consigli-text": theme.text,
        "--consigli-primary-gradient": theme.primaryGradient,
        "--consigli-card-soft": theme.cardBgSoft,
        "--consigli-note-bg": theme.noteBg,
        "--consigli-question-bg": theme.questionBg,
        "--consigli-question-icon": theme.questionIcon,
        "--consigli-check-icon": theme.checkIcon,
      }}
    >
      <section className="consigli-visita-hero">
        <div className="consigli-visita-overlay">
          <div className="consigli-visita-content">
            <div className="consigli-visita-label">{consigli.heroLabel}</div>

            <h1>{consigli.heroTitle}</h1>

            <p>{consigli.heroText}</p>

            <Link to={backPath} className="consigli-visita-back-btn">
              {backLabel}
            </Link>
          </div>
        </div>
      </section>

      <main className="consigli-visita-container">
        <section className="consigli-visita-grid">
          <article className="consigli-visita-card">
            <h2>{consigli.firstCardTitle}</h2>

            <div className="consigli-visita-list">
              {consigli.firstCardItems.map((item, index) => (
                <div key={index} className="consigli-visita-list-item">
                  <i className="bi bi-check2-circle"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="consigli-visita-card">
            <h2>{consigli.secondCardTitle}</h2>

            <div className="consigli-visita-list">
              {consigli.secondCardItems.map((item, index) => (
                <div key={index} className="consigli-visita-list-item">
                  <i className="bi bi-check2-circle"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="consigli-visita-wide-card">
          <h2>{consigli.questionsTitle}</h2>
          <p>{consigli.questionsText}</p>

          <div className="consigli-visita-question-grid">
            {consigli.questions.map((item, index) => (
              <div key={index} className="consigli-visita-question-card">
                <i className="bi bi-question-circle-fill"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="consigli-visita-note-box">
          <h2>{consigli.noteTitle}</h2>
          <p>{consigli.noteText}</p>
        </section>
      </main>
    </div>
  )
}

export default ConsigliVisita
