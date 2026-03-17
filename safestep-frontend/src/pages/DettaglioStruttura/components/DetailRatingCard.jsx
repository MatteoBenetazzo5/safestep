import "../styles/DetailRatingCard.css"

function DetailRatingCard({
  reviews,
  structure,
  averageVote,
  voteDistribution,
  renderWheelchairs,
}) {
  return (
    <aside className="detail-side-column">
      <div className="detail-rating-card">
        <h3>Valutazioni e recensioni</h3>

        <div className="detail-big-rating">
          <div className="detail-rating-main">
            {renderWheelchairs()}
            <span className="rating-number">{averageVote} / 5</span>
          </div>
        </div>

        <div className="rating-bars">
          {voteDistribution.map((item) => (
            <div key={item.vote} className="rating-bar-row">
              <span>{item.vote}</span>

              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>

              <span>{item.percentage}%</span>
            </div>
          ))}
        </div>

        <button type="button" className="follow-button">
          Segui il rilievo
        </button>
      </div>

      {reviews.length > 0 && (
        <div className="detail-mini-review-card">
          <div className="detail-mini-review-avatar">
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="detail-mini-review-content">
            <div className="detail-mini-review-top">
              <h4>{reviews[0]?.utente?.nomeVisualizzato || "Utente"}</h4>
              <p>{structure.citta || "Italia"}</p>
            </div>

            <div className="mini-review-rating">
              {renderWheelchairs()}
              <span>{reviews[0]?.voto || 5}.0 / 5</span>
              <i className="bi bi-check-circle-fill verified-icon"></i>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default DetailRatingCard