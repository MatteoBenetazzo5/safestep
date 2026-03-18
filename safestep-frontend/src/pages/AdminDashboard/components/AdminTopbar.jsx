import "../styles/AdminTopbar.css"

function AdminTopbar({ nomeVisualizzato, email, avatar, initial }) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <h1>Benvenuto nell'area Admin!</h1>
        <p>
          {nomeVisualizzato} · {email}
        </p>
      </div>

      <div className="admin-topbar-user">
        {avatar ? (
          <img
            src={avatar}
            alt={nomeVisualizzato}
            className="admin-topbar-image"
          />
        ) : (
          <div className="admin-topbar-avatar">{initial}</div>
        )}
      </div>
    </header>
  )
}

export default AdminTopbar
