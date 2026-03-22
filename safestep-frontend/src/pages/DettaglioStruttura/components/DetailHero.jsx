import "../styles/DetailHero.css"

function DetailHero({
  structure,
  heroImage,
  placeholderImage,
  navigate,
  handleToggleSaved,
  savingFavorite,
  isSaved,
}) {
  const hasCoordinates =
    structure?.latitudine !== null &&
    structure?.latitudine !== undefined &&
    structure?.longitudine !== null &&
    structure?.longitudine !== undefined

  const directionsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${structure.latitudine},${structure.longitudine}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        [
          structure?.nome,
          structure?.indirizzo,
          structure?.citta,
          structure?.paese,
        ]
          .filter(Boolean)
          .join(", "),
      )}`

  return (
    <section
      className="detail-hero"
      style={{
        backgroundImage: `url(${heroImage || placeholderImage})`,
      }}
    >
      <div className="detail-hero-overlay">
        <div className="detail-hero-content">
          <div className="detail-breadcrumb">
            <button
              type="button"
              className="detail-breadcrumb-link"
              onClick={() => navigate(-1)}
            >
              Home
            </button>
            <i className="bi bi-chevron-right"></i>
            <span>{structure.nome}</span>
          </div>

          <h1>{structure.nome}</h1>

          <div className="detail-location-row">
            <span className="detail-location">
              <i className="bi bi-geo-alt-fill"></i>
              {structure.citta || "Località non disponibile"}
            </span>

            <span className="detail-category-badge">
              {structure.categoria || "Struttura"}
            </span>
          </div>

          <div className="detail-action-buttons">
            <button
              type="button"
              className="detail-btn light-btn"
              onClick={handleToggleSaved}
              disabled={savingFavorite}
            >
              <i className={`bi ${isSaved ? "bi-heart-fill" : "bi-heart"}`}></i>
              {savingFavorite ? "Attendi..." : isSaved ? "Salvata" : "Salva"}
            </button>

            {structure.sitoWeb ? (
              <a
                href={structure.sitoWeb}
                target="_blank"
                rel="noreferrer"
                className="detail-btn blue-btn detail-btn-link"
              >
                Sito ufficiale
              </a>
            ) : (
              <button type="button" className="detail-btn blue-btn" disabled>
                Sito ufficiale
              </button>
            )}

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="detail-btn green-btn detail-btn-link"
            >
              Indicazioni
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailHero
