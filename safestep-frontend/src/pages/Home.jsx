import "../styles/pages/Home.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import image4 from "../assets/images/image4.jpg"
import image5 from "../assets/images/image5.jpg"
import image6 from "../assets/images/image6.jpg"
import image7 from "../assets/images/image7.jpg"
import image8 from "../assets/images/image8.jpg"
import image9 from "../assets/images/image9.jpg"
import image10 from "../assets/images/image10.jpg"
import image11 from "../assets/images/image11.jpg"

function Home() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

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
      name: "Pizzeria Al Vesuvio",
      city: "Napoli",
      image: image1,
    },
    {
      id: 2,
      name: "Villa Borghese",
      city: "Roma",
      image: image2,
    },
    {
      id: 3,
      name: "Parco Sempione",
      city: "Milano",
      image: image3,
    },
    {
      id: 4,
      name: "Hotel Cristallo",
      city: "Cortina",
      image: image4,
    },
    {
      id: 5,
      name: "Terme Sensoriali",
      city: "Chianciano",
      image: image5,
    },
    {
      id: 6,
      name: "Ristorante Mare Blu",
      city: "Bari",
      image: image6,
    },
    {
      id: 7,
      name: "Parco degli Ulivi",
      city: "Lecce",
      image: image7,
    },
    {
      id: 8,
      name: "Hotel Olimpia",
      city: "Padova",
      image: image8,
    },
  ]

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    const searchLower = searchTerm.toLowerCase()
    const matchedCategory = categories.find(
      (cat) => cat.title.toLowerCase() === searchLower,
    )

    if (matchedCategory) {
      navigate(matchedCategory.path)
    } else {
      alert(`Nessuna categoria trovata per: "${searchTerm}"`)
    }
  }

  const infoCards = [
    {
      id: 1,
      title: "Cerca",
      text: "Trova locali e servizi accessibili vicino a te",
      icon: "bi-search",
      image: image9,
    },
    {
      id: 2,
      title: "Recensisci",
      text: "Lascia una valutazione sui luoghi accessibili che hai visitato",
      icon: "bi-universal-access-circle",
      image: image10,
    },
    {
      id: 3,
      title: "Condividi",
      text: "Aiuta gli altri condividendo informazioni utili e consigli",
      icon: "bi-chat-dots",
      image: image11,
    },
  ]

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1>Trova e recensisci locali accessibili</h1>
            <p className="home-hero-subtitle">
              Scopri e condividi i migliori luoghi accessibili per persone con
              disabilità
            </p>

            <div className="home-main-search">
              <div className="home-main-search-input">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Cerca luoghi accessibili (es: Terme, Ristoranti...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button onClick={handleSearch}>Cerca</button>
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
            <div
              key={place.id}
              className="place-card"
              onClick={() => navigate("/home-place-detail")}
              style={{ cursor: "pointer" }}
            >
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
