import "../styles/AdminStructureCard.css"

function AdminStructureCard({ structure, onOpen, onEdit, onDelete }) {
  const reviews = Array.isArray(structure?.recensioni)
    ? structure.recensioni
    : []
  const accessibilita = Array.isArray(structure?.accessibilita)
    ? structure.accessibilita
    : []

  const averageVote =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + Number(review.voto || 0), 0) /
        reviews.length
      : 0

  const formattedAverageVote = averageVote.toFixed(1)

  const renderWheelchairs = (vote) => {
    const safeVote = Math.max(0, Math.min(5, Number(vote) || 0))

    return (
      <div
        className="admin-wheelchairs"
        aria-label={`Valutazione ${safeVote} su 5`}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const fillPercentage =
            Math.max(0, Math.min(1, safeVote - index)) * 100

          return (
            <span key={index} className="admin-wheelchair-rating-item">
              <span className="admin-wheelchair-icon-base">
                <i className="bi bi-person-wheelchair"></i>
              </span>

              <span
                className="admin-wheelchair-icon-fill"
                style={{ width: `${fillPercentage}%` }}
              >
                <i className="bi bi-person-wheelchair"></i>
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div className="admin-structure-card">
      <img
        src={
          structure.immagineCopertina ||
          "https://via.placeholder.com/800x500?text=No+Image"
        }
        alt={structure.nome}
      />

      <div className="admin-structure-body">
        <div className="admin-structure-title-row">
          <div className="admin-structure-title-block">
            <h3>{structure.nome}</h3>
            <p>{structure.citta || "Città non disponibile"}</p>
          </div>

          <div className="admin-structure-accessibility-box">
            {renderWheelchairs(averageVote)}
            <span className="admin-structure-vote-text">
              {formattedAverageVote} / 5
            </span>
          </div>
        </div>

        <div className="admin-structure-rating">
          <span>{structure.categoria}</span>
        </div>

        <div className="admin-structure-meta">
          <span>Stato: {structure.stato || "N/D"}</span>
          <span>Recensioni: {reviews.length}</span>
          <span>Accessibilità: {accessibilita.length}</span>
          <span>Media: {formattedAverageVote}</span>
        </div>

        <div className="admin-card-actions">
          <button className="edit-btn" onClick={onEdit}>
            <i className="bi bi-pencil"></i>
            Modifica
          </button>

          <button className="delete-btn" onClick={onDelete}>
            <i className="bi bi-trash"></i>
            Elimina
          </button>
        </div>

        <button className="admin-open-link" onClick={onOpen}>
          Apri dettaglio
        </button>
      </div>
    </div>
  )
}

export default AdminStructureCard
