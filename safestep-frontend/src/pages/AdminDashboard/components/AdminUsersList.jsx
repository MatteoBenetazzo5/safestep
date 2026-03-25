import "../styles/AdminUsersList.css"

function AdminUsersList({ users = [] }) {
  return (
    <div className="admin-users-card">
      <div className="admin-users-header">
        <h2>Utenti registrati</h2>
        <p>Qui puoi vedere gli utenti creati nel sistema.</p>
      </div>

      {users.length === 0 ? (
        <p className="admin-users-empty">Nessun utente trovato.</p>
      ) : (
        <div className="admin-users-list">
          {users.map((user, index) => {
            const initial =
              user?.nomeVisualizzato?.charAt(0)?.toUpperCase() || "U"

            return (
              <div
                key={user.idUtente || user.id || user.email || index}
                className="admin-user-item"
              >
                <div className="admin-user-avatar">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.nomeVisualizzato || "Utente"}
                    />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>

                <div className="admin-user-info">
                  <h4>{user.nomeVisualizzato || "Utente senza nome"}</h4>
                  <p>{user.email || "Email non disponibile"}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminUsersList
