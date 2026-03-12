import { useNavigate } from "react-router-dom"
import { getAvatar, getEmail, getNomeVisualizzato, logout } from "../utils/auth"
import "../styles/pages/AdminDashboard.css"

function AdminDashboard() {
  const navigate = useNavigate()

  const nomeVisualizzato = getNomeVisualizzato() || "Admin"
  const email = getEmail() || "admin@safestep.com"
  const avatar = getAvatar()
  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  const stats = [
    { id: 1, icon: "bi-people-fill", number: "1,245", label: "Utenti" },
    { id: 2, icon: "bi-grid-1x2-fill", number: "158", label: "Strutture" },
    {
      id: 3,
      icon: "bi-chat-left-text-fill",
      number: "870",
      label: "Recensioni",
    },
    { id: 4, icon: "bi-heart-fill", number: "2,310", label: "Salvataggi" },
  ]

  const structures = [
    {
      id: 1,
      title: "Hotel Terme Olympia",
      city: "Montegrotto Terme",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Terme Sensoriali",
      city: "Abano Terme",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Parco Termale del Garda",
      city: "Colà di Lazise",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Terme di Saturnia",
      city: "Saturnia",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Terme Bagni Vecchi",
      city: "Bormio",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=500&fit=crop",
    },
    {
      id: 6,
      title: "Victoria Terme Hotel",
      city: "Tivoli Terme",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=500&fit=crop",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Marco",
      place: "Hotel Terme Olympia",
      text: "Ultime recensioni positive e struttura accessibile.",
    },
    {
      id: 2,
      name: "Sara",
      place: "Terme Sensoriali",
      text: "Percorso comodo e personale molto disponibile.",
    },
    {
      id: 3,
      name: "Francesco",
      place: "Parco Termale del Garda",
      text: "Area ben organizzata e ottima accessibilità.",
    },
    {
      id: 4,
      name: "Lisa",
      place: "Terme di Saturnia",
      text: "Hotel curato e accessi molto comodi.",
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="admin-page">
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

          <button className="admin-menu-link">
            <i className="bi bi-people"></i>
            Gestione utenti
          </button>

          <button className="admin-menu-link">
            <i className="bi bi-card-text"></i>
            Gestione contenuti
          </button>
        </nav>

        <div className="admin-system-box">
          <h3>Impostazioni sistema</h3>

          <button className="admin-system-link">Categorie</button>
          <button className="admin-system-link">Caratteristiche</button>
          <button className="admin-system-link">Accessibilità</button>
        </div>

        <button className="admin-logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </aside>

      <main className="admin-content">
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

        <section className="admin-stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="admin-stat-card">
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

        <section className="admin-filters-card">
          <div className="admin-search-row">
            <div className="admin-search-box">
              <i className="bi bi-search"></i>
              <input type="text" placeholder="Cerca per nome o per categoria" />
            </div>

            <button>Categorie</button>
            <button>Accessibilità</button>
            <button>Salvate</button>
            <button className="filter-main-button">Filtra</button>
          </div>
        </section>

        <section className="admin-main-grid">
          <div className="admin-left-column">
            <div className="admin-section-header">
              <h2>Gestione strutture termali</h2>
              <button className="admin-add-button">
                <i className="bi bi-plus-lg"></i>
                Aggiungi nuova struttura
              </button>
            </div>

            <div className="admin-cards-grid">
              {structures.map((structure) => (
                <div key={structure.id} className="admin-structure-card">
                  <img src={structure.image} alt={structure.title} />

                  <div className="admin-structure-body">
                    <h3>{structure.title}</h3>
                    <p>{structure.city}</p>

                    <div className="admin-structure-rating">
                      <span className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </span>
                      <span>{structure.rating}</span>
                    </div>

                    <div className="admin-card-actions">
                      <button className="edit-btn">Modifica</button>
                      <button className="delete-btn">Elimina</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-right-column">
            <div className="admin-side-card">
              <h3>Ultime recensioni</h3>

              <div className="admin-side-list">
                {reviews.map((review) => (
                  <div key={review.id} className="admin-side-item">
                    <div className="admin-side-avatar">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <h4>{review.name}</h4>
                      <strong>{review.place}</strong>
                      <p>{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-side-card">
              <h3>Operazioni rapide</h3>

              <button className="admin-quick-button">
                <i className="bi bi-plus-square"></i>
                Crea nuova struttura
              </button>

              <button className="admin-quick-button">
                <i className="bi bi-person-plus"></i>
                Aggiungi utente
              </button>

              <button className="admin-quick-button">
                <i className="bi bi-list-task"></i>
                Gestisci categorie
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
