import "../styles/AdminNotesCard.css"

function AdminNotesCard() {
  return (
    <>
      <div className="admin-side-card">
        <h3>Ultime recensioni</h3>

        <div className="admin-side-list">
          <div className="admin-side-item">
            <div className="admin-side-avatar">M</div>
            <div>
              <h4>Marco</h4>
              <p>Hotel Terme Olympia</p>
              <span>Ultime recensioni demo</span>
            </div>
          </div>

          <div className="admin-side-item">
            <div className="admin-side-avatar">S</div>
            <div>
              <h4>Sara</h4>
              <p>Terme Sensoriali</p>
              <span>Contenuto demo lato layout</span>
            </div>
          </div>

          <div className="admin-side-item">
            <div className="admin-side-avatar">F</div>
            <div>
              <h4>Francesco</h4>
              <p>Parco Termale del Garda</p>
              <span>Contenuto demo lato layout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-side-card">
        <h3>Operazioni rapide</h3>

        <div className="admin-quick-actions">
          <button className="admin-quick-button">
            <i className="bi bi-plus-square"></i>
            Crea nuova struttura
          </button>

          <button className="admin-quick-button">
            <i className="bi bi-person-plus"></i>
            Aggiungi utente
          </button>

          <button className="admin-quick-button">
            <i className="bi bi-list-check"></i>
            Gestisci categorie
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminNotesCard
