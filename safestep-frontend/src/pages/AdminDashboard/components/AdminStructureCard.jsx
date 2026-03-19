import "../styles/AdminStructureCard.css"

function AdminStructureCard({ structure, onOpen, onEdit, onDelete }) {
  const reviews = Array.isArray(structure?.recensioni) ? structure.recensioni : []
  const accessibilita = Array.isArray(structure?.accessibilita)
    ? structure.accessibilita
    : []

  const averageVote =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + Number(review.voto || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0"

  const renderStars = () => {
    const roundedVote = Math.round(Number(averageVote))

    return Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        className={index < roundedVote ? "bi bi-star-fill" : "bi bi-star"}
      ></i>
    ))
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
          <div>
            <h3>{structure.nome}</h3>
            <p>{structure.citta || "Città non disponibile"}</p>
          </div>

          <div className="admin-structure-stars">{renderStars()}</div>
        </div>

        <div className="admin-structure-rating">
          <span>{structure.categoria}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "14px",
            fontSize: "0.85rem",
            color: "#617086",
          }}
        >
          <span>Stato: {structure.stato || "N/D"}</span>
          <span>Recensioni: {reviews.length}</span>
          <span>Accessibilità: {accessibilita.length}</span>
          <span>Voto medio: {averageVote}</span>
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
