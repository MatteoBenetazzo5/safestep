import "../styles/AdminStructureCard.css"

function AdminStructureCard({ structure, onOpen, onEdit, onDelete }) {
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
            <p>{structure.citta}</p>
          </div>

          <div className="admin-structure-stars">★★★★★</div>
        </div>

        <div className="admin-structure-rating">
          <span>{structure.categoria}</span>
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
