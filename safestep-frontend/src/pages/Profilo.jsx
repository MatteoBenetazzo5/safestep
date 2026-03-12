import { useNavigate } from "react-router-dom"
import {
  getAvatar,
  getEmail,
  getNomeVisualizzato,
  getRuolo,
  logout,
} from "../utils/auth"
import "../styles/pages/Profilo.css"

function Profilo() {
  const navigate = useNavigate()

  const nomeVisualizzato = getNomeVisualizzato() || "Utente"
  const email = getEmail() || "email@example.com"
  const ruolo = getRuolo() || "USER"
  const avatar = getAvatar()
  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  const accessibilityOptions = [
    { id: 1, icon: "bi-person-wheelchair", label: "Sedia a rotelle manuale" },
    { id: 2, icon: "bi-person-wheelchair", label: "Sedia a rotelle elettrica" },
    { id: 3, icon: "bi-person-standing", label: "Stampelle" },
    { id: 4, icon: "bi-universal-access", label: "Deambulatore" },
  ]

  const savedPlaces = [
    {
      id: 1,
      title: "Terme Sensoriali",
      city: "Abano Terme",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    },
  ]

  const backgroundOptions = [
    {
      id: 1,
      title: "Spiaggia",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Montagna",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Città",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="profile-page">
      <section className="profile-cover">
        <div className="profile-cover-overlay">
          <div className="profile-cover-content">
            <div className="profile-avatar-wrapper">
              {avatar ? (
                <img
                  src={avatar}
                  alt={nomeVisualizzato}
                  className="profile-avatar-image"
                />
              ) : (
                <div className="profile-avatar-fallback">{initial}</div>
              )}

              <div className="profile-avatar-badge">
                <i className="bi bi-universal-access-circle"></i>
              </div>
            </div>

            <div className="profile-user-text">
              <h1>{nomeVisualizzato}</h1>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-main">
        <aside className="profile-sidebar">
          <div className="profile-sidebar-card">
            <div className="profile-sidebar-user">
              <div className="profile-sidebar-icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <span>{nomeVisualizzato}</span>
            </div>

            <button className="profile-sidebar-link active">
              <i className="bi bi-gear"></i>
              Impostazioni
            </button>

            <button className="profile-sidebar-link">
              <i className="bi bi-bookmark-heart"></i>
              Luoghi salvati
            </button>

            <button className="profile-sidebar-link">
              <i className="bi bi-chat-left-text"></i>
              Le mie recensioni
            </button>

            <button
              className="profile-sidebar-link logout"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </aside>

        <div className="profile-content">
          <div className="profile-tabs">
            <button className="profile-tab active">Impostazioni</button>
            <button className="profile-tab">Luoghi salvati</button>
            <button className="profile-tab">Le mie recensioni</button>
          </div>

          <div className="profile-content-grid">
            <div className="profile-left-column">
              <div className="profile-card">
                <h2>Informazioni personali</h2>

                <div className="profile-form-group">
                  <label>Nome visualizzato</label>
                  <input type="text" value={nomeVisualizzato} readOnly />
                </div>

                <div className="profile-form-group">
                  <label>Email</label>
                  <input type="text" value={email} readOnly />
                </div>

                <div className="profile-form-group">
                  <label>Ruolo</label>
                  <input type="text" value={ruolo} readOnly />
                </div>

                <div className="profile-form-group">
                  <label>Cellulare</label>
                  <input type="text" placeholder="+39..." />
                </div>
              </div>

              <div className="profile-card">
                <div className="profile-section-header">
                  <h2>Preferenze di accessibilità</h2>
                </div>

                <div className="accessibility-cards">
                  {accessibilityOptions.map((option) => (
                    <div key={option.id} className="accessibility-card">
                      <i className={`bi ${option.icon}`}></i>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>

                <h3 className="profile-subtitle">Esigenze di accessibilità</h3>

                <div className="needs-grid">
                  <label>
                    <input type="checkbox" defaultChecked /> Rampe accessibili
                  </label>
                  <label>
                    <input type="checkbox" /> Bagno adattato
                  </label>
                  <label>
                    <input type="checkbox" /> Posti comodi al tavolo
                  </label>
                  <label>
                    <input type="checkbox" /> Parcheggio riservato
                  </label>
                  <label>
                    <input type="checkbox" /> Percorsi senza gradini
                  </label>
                  <label>
                    <input type="checkbox" /> Percorsi privi di barriere
                  </label>
                </div>

                <button className="profile-soft-button">
                  Aggiungi necessità
                </button>
              </div>

              <div className="profile-card">
                <h2>Personalizzazione profilo</h2>

                <div className="theme-row">
                  <span>Colore tema</span>
                  <div className="theme-dots">
                    <span className="dot blue"></span>
                    <span className="dot cyan"></span>
                    <span className="dot green"></span>
                  </div>
                </div>

                <div className="settings-list">
                  <button>
                    <i className="bi bi-lock"></i>
                    Modifica password
                    <span>›</span>
                  </button>

                  <button>
                    <i className="bi bi-bell"></i>
                    Gestisci notifiche
                    <span>›</span>
                  </button>

                  <button>
                    <i className="bi bi-shield-check"></i>
                    Privacy e sicurezza
                    <span>›</span>
                  </button>
                </div>

                <button className="profile-save-button">Salva modifiche</button>
              </div>
            </div>

            <div className="profile-right-column">
              <div className="profile-side-card">
                <img
                  src={savedPlaces[0].image}
                  alt={savedPlaces[0].title}
                  className="profile-side-image"
                />

                <div className="profile-side-body">
                  <h3>Luoghi salvati</h3>
                  <h4>{savedPlaces[0].title}</h4>
                  <p>{savedPlaces[0].city}</p>

                  <div className="profile-rating-row">
                    <div className="profile-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                    <span>{savedPlaces[0].rating}</span>
                  </div>

                  <button className="profile-gradient-button">
                    Visualizza tutti
                  </button>
                </div>
              </div>

              <div className="profile-side-card">
                <h3>Cambia sfondo</h3>

                <div className="background-grid">
                  {backgroundOptions.map((item) => (
                    <div key={item.id} className="background-card">
                      <img src={item.image} alt={item.title} />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>

                <div className="mini-review-card">
                  <div className="mini-review-avatar">{initial}</div>

                  <div className="mini-review-text">
                    <h4>Hotel Terme Olympia</h4>
                    <p>
                      Hotel accogliente e facilmente accessibile, perfetto per
                      un weekend rilassante.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profilo
