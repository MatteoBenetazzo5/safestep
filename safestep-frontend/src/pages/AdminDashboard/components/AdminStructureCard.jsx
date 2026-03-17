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
        <h3>{structure.nome}</h3>
        <p>{structure.citta}</p>

        <div className="admin-structure-rating">
          <span>{structure.categoria}</span>
        </div>

        <div className="admin-card-actions">
          <button className="edit-btn" onClick={onOpen}>
            Apri
          </button>

          <button className="edit-btn" onClick={onEdit}>
            Modifica
          </button>

          <button className="delete-btn" onClick={onDelete}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminStructureCard
