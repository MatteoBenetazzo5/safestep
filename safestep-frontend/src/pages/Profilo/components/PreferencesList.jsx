import "../styles/PreferencesList.css"

function PreferencesList({ preferenze, onDeletePreference }) {
  return (
    <div className="profile-side-card">
      <h3>Preferenze salvate</h3>

      <div className="profile-preferences-list">
        {preferenze.length === 0 ? (
          <p>Nessuna preferenza salvata.</p>
        ) : (
          preferenze.map((item) => (
            <div key={item.idPreferenza} className="profile-preference-item">
              <div>
                <strong>
                  {item.caratteristica?.etichetta || "Caratteristica"}
                </strong>
                <p>{item.livelloPreferenza}</p>
              </div>

              <button
                className="profile-remove-button"
                onClick={() => onDeletePreference(item.idPreferenza)}
              >
                Elimina
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PreferencesList
