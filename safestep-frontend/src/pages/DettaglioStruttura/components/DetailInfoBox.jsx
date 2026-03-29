import "../styles/DetailInfoBox.css"

function DetailInfoBox({
  structure,
  averageVote,
  accessibilita,
  reviews,
  selectedImage,
  placeholderImage,
  renderWheelchairs,
}) {
  const hasCoordinates =
    structure?.latitudine !== null &&
    structure?.latitudine !== undefined &&
    structure?.longitudine !== null &&
    structure?.longitudine !== undefined

  const mapSrc = hasCoordinates
    ? `https://www.google.com/maps?q=${structure.latitudine},${structure.longitudine}&z=15&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        [
          structure?.nome,
          structure?.indirizzo,
          structure?.citta,
          structure?.paese,
        ]
          .filter(Boolean)
          .join(", "),
      )}&z=15&output=embed`

  const getUserAvatar = (utente) => {
    return utente?.avatar || ""
  }

  return (
    <>
      <div className="info-box">
        <h2>Informazioni</h2>

        {structure?.descrizione && (
          <p className="detail-description">{structure.descrizione}</p>
        )}

        <div className="detail-map-box">
          <iframe
            src={mapSrc}
            title={`Mappa di ${structure.nome}`}
            className="detail-map-iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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
            {renderWheelchairs(averageVote)}
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
                {getUserAvatar(reviews[0]?.utente) ? (
                  <img
                    src={getUserAvatar(reviews[0]?.utente)}
                    alt={reviews[0]?.utente?.nomeVisualizzato || "Utente"}
                    className="detail-avatar-image"
                  />
                ) : (
                  <i className="bi bi-person-fill"></i>
                )}
              </div>

              <div>
                <h4>{reviews[0]?.utente?.nomeVisualizzato || "Utente"}</h4>
                <p>{structure.citta || "Italia"}</p>
                <div className="mini-review-rating">
                  {renderWheelchairs(reviews[0]?.voto || 5)}
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
