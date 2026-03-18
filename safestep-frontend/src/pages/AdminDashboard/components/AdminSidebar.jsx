import "../styles/AdminSidebar.css"

function AdminSidebar({ handleLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-logo-icon">
          <i className="bi bi-shield-check"></i>
        </div>

        <div>
          <h2>SafeStep</h2>
          <p>Area Admin</p>
        </div>
      </div>

      <nav className="admin-sidebar-menu">
        <button className="admin-sidebar-link active">
          <i className="bi bi-house-door"></i>
          Dashboard
        </button>

        <button className="admin-sidebar-link">
          <i className="bi bi-building"></i>
          Gestione strutture
        </button>

        <button className="admin-sidebar-link">
          <i className="bi bi-people"></i>
          Gestione utenti
        </button>

        <button className="admin-sidebar-link">
          <i className="bi bi-card-text"></i>
          Gestione contenuti
        </button>
      </nav>

      <div className="admin-sidebar-box">
        <h3>Impostazioni sistema</h3>

        <button className="admin-sidebar-box-link">
          <i className="bi bi-grid"></i>
          Categorie
        </button>

        <button className="admin-sidebar-box-link">
          <i className="bi bi-tags"></i>
          Caratteristiche
        </button>

        <button className="admin-sidebar-box-link">
          <i className="bi bi-universal-access"></i>
          Accessibilità
        </button>
      </div>

      <button className="admin-sidebar-logout" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </aside>
  )
}

export default AdminSidebar
