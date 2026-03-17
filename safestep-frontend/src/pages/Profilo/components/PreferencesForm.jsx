import "../styles/PreferencesForm.css"

function PreferencesForm({
  preferenceForm,
  caratteristiche,
  onChange,
  onSubmit,
  savingPreference,
}) {
  return (
    <div className="profile-side-card">
      <h3>Preferenze accessibilità</h3>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Caratteristica</label>
          <select
            name="caratteristicaId"
            value={preferenceForm.caratteristicaId}
            onChange={onChange}
            className="form-control"
          >
            <option value="">Seleziona una caratteristica</option>
            {caratteristiche.map((caratteristica) => (
              <option
                key={caratteristica.idCaratteristiche}
                value={caratteristica.idCaratteristiche}
              >
                {caratteristica.etichetta}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Livello preferenza</label>
          <select
            name="livelloPreferenza"
            value={preferenceForm.livelloPreferenza}
            onChange={onChange}
            className="form-control"
          >
            <option value="IMPORTANTE">IMPORTANTE</option>
            <option value="UTILE">UTILE</option>
            <option value="OPZIONALE">OPZIONALE</option>
          </select>
        </div>

        <button
          type="submit"
          className="profile-gradient-button"
          disabled={savingPreference}
        >
          {savingPreference ? "Aggiunta..." : "Aggiungi preferenza"}
        </button>
      </form>
    </div>
  )
}

export default PreferencesForm
