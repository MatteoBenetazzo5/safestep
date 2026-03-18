import "../styles/AdminStats.css"

function AdminStats({ stats }) {
  return (
    <section className="admin-stats-grid">
      {stats.map((stat) => (
        <div key={stat.id} className={`admin-stat-card ${stat.tone || ""}`}>
          <div className="admin-stat-icon">
            <i className={`bi ${stat.icon}`}></i>
          </div>

          <div>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default AdminStats
