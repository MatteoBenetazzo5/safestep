import "../styles/DetailHero.css"

function DetailHero({
  structure,
  selectedImage,
  placeholderImage,
  navigate,
  handleToggleSaved,
  savingFavorite,
  isSaved,
}) {
  return (
    <section
      className="detail-hero"
      style={{
        backgroundImage: `url(${selectedImage || structure.immagineCopertina || placeholderImage})`,
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
              <i className="bi bi-heart"></i>
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

            <button type="button" className="detail-btn circle-btn">
              <i className="bi bi-send-fill"></i>
            </button>

            <button type="button" className="detail-btn green-btn">
              Indicazioni
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailHero
