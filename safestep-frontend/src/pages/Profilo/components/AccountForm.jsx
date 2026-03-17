import "../styles/AccountForm.css"

function AccountForm({ userForm, onChange, onSubmit, savingUser }) {
  return (
    <div className="profile-side-card">
      <h3>Dati account</h3>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Nome visualizzato</label>
          <input
            type="text"
            name="nomeVisualizzato"
            value={userForm.nomeVisualizzato}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userForm.email}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Telefono</label>
          <input
            type="text"
            name="telefono"
            value={userForm.telefono}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={userForm.avatar}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="profile-gradient-button"
          disabled={savingUser}
        >
          {savingUser ? "Salvataggio..." : "Salva dati account"}
        </button>
      </form>
    </div>
  )
}

export default AccountForm
