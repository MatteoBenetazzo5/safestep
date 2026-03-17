import "../styles/AccessibilityProfileForm.css"

function AccessibilityProfileForm({
  profileForm,
  onChange,
  onSubmit,
  savingProfile,
}) {
  return (
    <div className="profile-side-card">
      <h3>Profilo accessibilità</h3>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Tipo mobilità</label>
          <input
            type="text"
            name="tipoMobilita"
            value={profileForm.tipoMobilita}
            onChange={onChange}
            className="form-control"
            placeholder="Es. Carrozzina manuale"
            required
          />
        </div>

        <div className="mb-3">
          <label>Note</label>
          <textarea
            name="note"
            value={profileForm.note}
            onChange={onChange}
            className="form-control"
            rows="4"
            placeholder="Scrivi eventuali esigenze personali"
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Colore tema</label>
          <input
            type="text"
            name="coloreTema"
            value={profileForm.coloreTema}
            onChange={onChange}
            className="form-control"
            placeholder="Es. azzurro, verde, lilla"
          />
        </div>

        <button
          type="submit"
          className="profile-gradient-button"
          disabled={savingProfile}
        >
          {savingProfile ? "Salvataggio..." : "Salva profilo"}
        </button>
      </form>
    </div>
  )
}

export default AccessibilityProfileForm
