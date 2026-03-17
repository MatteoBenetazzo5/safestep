import "../styles/AdminTopbar.css"
function AdminTopbar({ nomeVisualizzato, email, avatar, initial }) {
  return (
    <header className="admin-topbar">
      <div>
        <h1>Benvenuto nell'area Admin!</h1>
        <p>
          {nomeVisualizzato} · {email}
        </p>
      </div>

      <div className="admin-user-pill">
        {avatar ? (
          <img
            src={avatar}
            alt={nomeVisualizzato}
            className="admin-user-image"
          />
        ) : (
          <div className="admin-user-avatar">{initial}</div>
        )}
      </div>
    </header>
  )
}

export default AdminTopbar
