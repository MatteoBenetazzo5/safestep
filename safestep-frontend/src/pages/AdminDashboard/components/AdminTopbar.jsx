import "../styles/AdminTopbar.css"

function AdminTopbar({ nomeVisualizzato, email }) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <h1>Benvenuto nell'area Admin!</h1>
        <p>
          {nomeVisualizzato} · {email}
        </p>
      </div>
    </header>
  )
}

export default AdminTopbar
