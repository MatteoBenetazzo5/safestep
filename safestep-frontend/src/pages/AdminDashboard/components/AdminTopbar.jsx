import "../styles/AdminTopbar.css"

function AdminTopbar({ nomeVisualizzato, email, avatar, initial }) {
  const finalInitial = initial || (nomeVisualizzato ? nomeVisualizzato.charAt(0).toUpperCase() : "A")

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
          <div className="admin-topbar-avatar">{finalInitial}</div>
        )}
      </div>
    </header>
  )
}

export default AdminTopbar
