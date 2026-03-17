import "../styles/SavedPlaces.css"

function SavedPlaces({ savedPlaces, onOpenStructure, onRemoveSavedPlace }) {
  return (
    <div className="profile-side-card">
      <h3>Luoghi salvati</h3>

      {savedPlaces.length === 0 ? (
        <p>Nessuna struttura salvata.</p>
      ) : (
        <div className="profile-saved-grid">
          {savedPlaces.map((item) => (
            <div key={item.idStrutturaSalvata} className="profile-saved-card">
              <img
                src={
                  item.struttura?.immagineCopertina ||
                  "https://via.placeholder.com/600x350?text=SafeStep"
                }
                alt={item.struttura?.nome || "Struttura"}
              />

              <div className="profile-saved-body">
                <h4>{item.struttura?.nome}</h4>
                <p>{item.struttura?.citta}</p>
                <p>{item.struttura?.categoria}</p>

                <div className="profile-saved-actions">
                  <button
                    className="profile-gradient-button"
                    onClick={() => onOpenStructure(item.struttura?.idStruttura)}
                  >
                    Apri
                  </button>

                  <button
                    className="profile-remove-button"
                    onClick={() =>
                      onRemoveSavedPlace(item.struttura?.idStruttura)
                    }
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedPlaces
