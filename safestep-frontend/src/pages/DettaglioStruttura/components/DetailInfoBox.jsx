import "../styles/DetailInfoBox.css"

function DetailInfoBox({
  structure,
  averageVote,
  accessibilita,
  reviews,
  selectedImage,
  placeholderImage,
  renderWheelchairs,
  renderStars,
}) {
  return (
    <>
      <div className="info-box">
        <h2>Informazioni</h2>

        <div className="map-placeholder">
          <i className="bi bi-geo-alt-fill"></i>
        </div>

        <p className="address-line">
          <i className="bi bi-geo-alt-fill"></i>
          {structure.indirizzo
            ? `${structure.indirizzo}, ${structure.citta || ""}`
            : structure.citta || "Indirizzo non disponibile"}
        </p>

        <div className="accessibility-block">
          <h3>Livello di accessibilità</h3>

          <div className="accessibility-rating-row">
            {renderWheelchairs()}
            {renderStars(Math.round(Number(averageVote)))}
            <span>{averageVote} / 5</span>
          </div>

          <ul className="accessibility-list">
            {accessibilita.length > 0 ? (
              accessibilita.map((item) => (
                <li key={item.idAccessibilita}>
                  <i className="bi bi-check-circle-fill"></i>
                  <strong>
                    {item.caratteristica?.etichetta || "Caratteristica"}
                  </strong>
                  {item.valore ? ` - ${item.valore}` : ""}
                  {item.nota ? ` (${item.nota})` : ""}
                </li>
              ))
            ) : (
              <li>
                <i className="bi bi-info-circle-fill"></i>
                Nessuna informazione di accessibilità disponibile
              </li>
            )}
          </ul>

          {structure.telefono && (
            <p className="detail-extra-row">
              <strong>Telefono:</strong> {structure.telefono}
            </p>
          )}

          {structure.paese && (
            <p className="detail-extra-row">
              <strong>Paese:</strong> {structure.paese}
            </p>
          )}
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="comments-box">
          <h2>Commentari ({reviews.length})</h2>

          <div className="comment-preview-card">
            <div className="comment-user-row">
              <div className="detail-mini-review-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <h4>{reviews[0]?.utente?.nomeVisualizzato || "Utente"}</h4>
                <p>{structure.citta || "Italia"}</p>
                <div className="mini-review-rating">
                  {renderWheelchairs(5)}
                  {renderStars(reviews[0]?.voto || 5)}
                </div>
              </div>
            </div>

            <img
              src={selectedImage || placeholderImage}
              alt="Anteprima recensione"
              className="comment-preview-image"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DetailInfoBox
