import "../styles/AdminNotesCard.css"

function AdminNotesCard({
  latestReviews = [],
  onCreateStructure,
  onAddUser,
  onManageCategories,
  onShowStructuresWithAccessibility,
  onResetFilters,
  onOpenReview,
}) {
  const getInitial = (review) => {
    const name = review?.utente?.nomeVisualizzato || "U"
    return name.charAt(0).toUpperCase()
  }

  const getUserName = (review) => {
    return review?.utente?.nomeVisualizzato || "Utente"
  }

  const getReviewDate = (review) => {
    const rawDate = review?.dataAggiornamento || review?.dataCreazione

    if (!rawDate) return ""

    return new Date(rawDate).toLocaleDateString("it-IT")
  }

  return (
    <>
      <div className="admin-side-card">
        <h3>Ultime recensioni</h3>

        <div className="admin-side-list">
          {latestReviews.length === 0 ? (
            <p>Nessuna recensione trovata.</p>
          ) : (
            latestReviews.map((review) => (
              <button
                key={review.idRecensione}
                type="button"
                className="admin-side-item"
                onClick={() => onOpenReview && onOpenReview(review)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                }}
              >
                <div className="admin-side-avatar">{getInitial(review)}</div>

                <div>
                  <h4>{getUserName(review)}</h4>
                  <p>{review.strutturaNome || "Struttura"}</p>
                  <span>
                    {review.testo || "Recensione"}{" "}
                    {getReviewDate(review) ? `· ${getReviewDate(review)}` : ""}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="admin-side-card">
        <h3>Operazioni rapide</h3>

        <div className="admin-quick-actions">
          <button className="admin-quick-button" onClick={onCreateStructure}>
            <i className="bi bi-plus-square"></i>
            Crea nuova struttura
          </button>

          <button className="admin-quick-button" onClick={onAddUser}>
            <i className="bi bi-person-plus"></i>
            Aggiungi utente
          </button>

          <button className="admin-quick-button" onClick={onManageCategories}>
            <i className="bi bi-list-check"></i>
            Gestisci categorie
          </button>

          <button
            className="admin-quick-button"
            onClick={onShowStructuresWithAccessibility}
          >
            <i className="bi bi-universal-access"></i>
            Solo accessibili
          </button>

          <button className="admin-quick-button" onClick={onResetFilters}>
            <i className="bi bi-arrow-counterclockwise"></i>
            Reset filtri
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminNotesCard
