import "../styles/DetailReviewsList.css"

function DetailReviewsList({
  reviews,
  structure,
  selectedImage,
  placeholderImage,
  renderWheelchairs,
  formatDate,
  navigateToWorkInProgress,
}) {
  const getUserAvatar = (utente) => {
    return utente?.avatar || ""
  }

  return (
    <div className="reviews-list-box">
      <div className="reviews-pagination">
        <button type="button" className="active-page">
          1
        </button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">...</button>
        <button type="button">5</button>
      </div>

      {reviews.length === 0 ? (
        <div className="review-card">
          <p className="detail-feedback">
            Ancora nessuna recensione per questa struttura.
          </p>
        </div>
      ) : (
        reviews.map((review) => (
          <article key={review.idRecensione} className="review-card">
            <div className="review-card-header">
              <div className="review-card-user">
                <div className="detail-mini-review-avatar big-avatar">
                  {getUserAvatar(review.utente) ? (
                    <img
                      src={getUserAvatar(review.utente)}
                      alt={review.utente?.nomeVisualizzato || "Utente"}
                      className="detail-avatar-image"
                    />
                  ) : (
                    <i className="bi bi-person-fill"></i>
                  )}
                </div>

                <div>
                  <div className="review-name-row">
                    <h4>{review.utente?.nomeVisualizzato || "Utente"}</h4>
                    <span>{structure.citta || "Italia"}</span>
                  </div>

                  <div className="mini-review-rating">
                    {renderWheelchairs(review.voto || 5)}
                    <span>{Number(review.voto || 5).toFixed(1)} / 5</span>
                  </div>
                </div>
              </div>

              <div className="review-donations">
                {formatDate(review.dataCreazione)}
              </div>
            </div>

            <p className="review-text">{review.testo}</p>

            <img
              src={selectedImage || placeholderImage}
              alt="Recensione struttura"
              className="review-image"
            />

            <div className="review-bottom-row">
              <button type="button" onClick={navigateToWorkInProgress}>
                <i className="bi bi-hand-thumbs-up"></i>
                Mi piace
              </button>

              <button type="button" onClick={navigateToWorkInProgress}>
                Rispondi
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  )
}

export default DetailReviewsList
