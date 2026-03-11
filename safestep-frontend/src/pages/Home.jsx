import "../styles/pages/Home.css"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  const categories = [
    {
      id: 1,
      title: "Terme",
      icon: "bi-water",
      className: "category-card-blue",
      path: "/terme",
    },
    {
      id: 2,
      title: "Ristoranti",
      icon: "bi-fork-knife",
      className: "category-card-orange",
      path: "/ristoranti",
    },
    {
      id: 3,
      title: "Hotel",
      icon: "bi-building",
      className: "category-card-lightblue",
      path: "/hotel",
    },
    {
      id: 4,
      title: "Parchi",
      icon: "bi-tree",
      className: "category-card-green",
      path: "/parchi",
    },
  ]

  const nearbyPlaces = [
    {
      id: 1,
      name: "Hotel Aurora",
      city: "Napoli",
      image:
        "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4fa0?w=400&h=280&fit=crop",
    },
    {
      id: 2,
      name: "Terme di Abano",
      city: "Abano Terme",
      image:
        "https://images.unsplash.com/photo-1576092160399-112ba8d25d1d?w=400&h=280&fit=crop",
    },
    {
      id: 3,
      name: "Pizzeria Al Vesuvio",
      city: "Napoli",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=280&fit=crop",
    },
    {
      id: 4,
      name: "Villa Borghese",
      city: "Roma",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=280&fit=crop",
    },
    {
      id: 5,
      name: "Parco Sempione",
      city: "Milano",
      image:
        "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&h=280&fit=crop",
    },
    {
      id: 6,
      name: "Hotel Cristallo",
      city: "Cortina",
      image:
        "https://images.unsplash.com/photo-1551632786-de41ec16a21b?w=400&h=280&fit=crop",
    },
    {
      id: 7,
      name: "Terme Sensoriali",
      city: "Chianciano",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=280&fit=crop",
    },
    {
      id: 8,
      name: "Ristorante Mare Blu",
      city: "Bari",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop",
    },
    {
      id: 9,
      name: "Parco degli Ulivi",
      city: "Lecce",
      image:
        "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=400&h=280&fit=crop",
    },
    {
      id: 10,
      name: "Hotel Olimpia",
      city: "Padova",
      image:
        "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=280&fit=crop",
    },
  ]

  const infoCards = [
    {
      id: 1,
      title: "Cerca",
      text: "Trova locali e servizi accessibili vicino a te",
      icon: "bi-search",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Recensisci",
      text: "Lascia una valutazione sui luoghi accessibili che hai visitato",
      icon: "bi-universal-access-circle",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Condividi",
      text: "Aiuta gli altri condividendo informazioni utili e consigli",
      icon: "bi-chat-dots",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
  ]

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1>Trova e recensisci locali accessibili</h1>
            <p>
              Scopri e condividi i migliori luoghi accessibili per persone con
              disabilità
            </p>

            <div className="home-main-search">
              <div className="home-main-search-input">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Cerca luoghi accessibili" />
              </div>
              <button>Cerca</button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>Categorie popolari</h2>
          <span>
            Più popolare <i className="bi bi-chevron-right"></i>
          </span>
        </div>

        <div className="home-categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${category.className}`}
              onClick={() => navigate(category.path)}
              style={{ cursor: "pointer" }}
            >
              <i className={`bi ${category.icon}`}></i>
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-big-title">I più accessibili vicino a te</h2>

        <div className="home-carousel">
          {nearbyPlaces.map((place) => (
            <div key={place.id} className="place-card">
              <div className="place-card-image">
                {place.image ? (
                  <img src={place.image} alt={place.name} />
                ) : (
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                    <span>Immagine</span>
                  </div>
                )}
              </div>

              <div className="place-card-body">
                <h3>{place.name}</h3>
                <p>{place.city}</p>

                <div className="place-card-icons">
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-person-wheelchair"></i>
                  <span>4.5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-info-section">
        <div className="home-info-text">
          <h2>Scopri luoghi accessibili e condividi le tue esperienze</h2>
          <p>
            SafeStep ti aiuta a trovare locali, terme, ristoranti e parchi
            accessibili, consentendoti di aggiungere recensioni e valutare i
            luoghi in base al loro livello di accessibilità. Unisciti alla
            nostra community e contribuisci rendendo il mondo più accessibile
          </p>
        </div>

        <div className="home-info-cards">
          {infoCards.map((card) => (
            <div key={card.id} className="info-card">
              <div className="info-card-top">
                <i className={`bi ${card.icon}`}></i>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>

              <div className="info-card-image">
                {card.image ? (
                  <img src={card.image} alt={card.title} />
                ) : (
                  <div className="image-placeholder info-placeholder">
                    <i className="bi bi-image"></i>
                    <span>Immagine</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
