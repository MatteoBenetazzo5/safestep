import "../styles/AdminSidebar.css"
function AdminSidebar({ handleLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">
          <i className="bi bi-shield-check"></i>
        </div>

        <div>
          <h2>SafeStep</h2>
          <p>Area Admin</p>
        </div>
      </div>

      <nav className="admin-menu">
        <button className="admin-menu-link active">
          <i className="bi bi-grid-1x2"></i>
          Dashboard
        </button>

        <button className="admin-menu-link">
          <i className="bi bi-building"></i>
          Gestione strutture
        </button>
      </nav>

      <button className="admin-logout-button" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </aside>
  )
}

export default AdminSidebar
