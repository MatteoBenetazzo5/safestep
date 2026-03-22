import "../styles/DetailRatingCard.css"

function DetailRatingCard({
  reviews,
  structure,
  averageVote,
  voteDistribution,
  renderWheelchairs,
}) {
  const getUserAvatar = (utente) => {
    return utente?.avatar || ""
  }

  return (
    <aside className="detail-side-column">
      <div className="detail-rating-card">
        <h3>Valutazioni e recensioni</h3>

        <div className="detail-big-rating">
          <div className="detail-rating-main">
            {renderWheelchairs(averageVote)}
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

              <span className="rating-count-label">
                {item.count} {item.count === 1 ? "voto" : "voti"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="detail-mini-review-card">
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

          <div className="detail-mini-review-content">
            <div className="detail-mini-review-top">
              <h4>{reviews[0]?.utente?.nomeVisualizzato || "Utente"}</h4>
              <p>{structure.citta || "Italia"}</p>
            </div>

            <div className="mini-review-rating">
              {renderWheelchairs(reviews[0]?.voto || 5)}
              <span>{Number(reviews[0]?.voto || 5).toFixed(1)} / 5</span>
              <i className="bi bi-check-circle-fill verified-icon"></i>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default DetailRatingCard
