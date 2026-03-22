import { Link } from "react-router-dom"
import "../styles/pages/Hotel.css"
import termeHero from "../assets/images/terme-hero.jpg"
import cardImage1 from "../assets/images/terme-card-1.jpg"
import cardImage2 from "../assets/images/terme-card-2.jpg"
import cardImage3 from "../assets/images/terme-card-3.jpg"
import cardImage4 from "../assets/images/terme-card-4.jpg"
import guideImage from "../assets/images/guida-terme.jpg"

function Hotel() {
  const renderWheelchairs = (count) => {
    return (
      <div className="hotel-icons">
        {[1, 2, 3, 4, 5].map((item) => (
          <i
            key={item}
            className={`bi bi-person-wheelchair ${
              item <= count ? "is-active" : "is-muted"
            }`}
          ></i>
        ))}
      </div>
    )
  }

  const hotelPrincipali = [
    {
      id: 201,
      name: "Hotel Aurora",
      city: "Mestre",
      rating: 4.6,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 202,
      name: "Grand Hotel Relax",
      city: "Milano",
      rating: 4.7,
      accessibilityLevel: 5,
      image: cardImage2,
    },
    {
      id: 203,
      name: "Suite Comfort",
      city: "Firenze",
      rating: 4.5,
      accessibilityLevel: 4,
      image: cardImage3,
    },
    {
      id: 204,
      name: "Hotel Panorama",
      city: "Torino",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage4,
    },
    {
      id: 208,
      name: "Hotel Riviera Blu",
      city: "Rimini",
      rating: 4.7,
      accessibilityLevel: 3,
      image: cardImage1,
    },
    {
      id: 209,
      name: "Palace Comfort",
      city: "Roma",
      rating: 4.6,
      accessibilityLevel: 4,
      image: cardImage2,
    },
    {
      id: 210,
      name: "Residenza Serena",
      city: "Napoli",
      rating: 4.5,
      accessibilityLevel: 3,
      image: cardImage3,
    },
    {
      id: 211,
      name: "Hotel Giardino",
      city: "Bologna",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage4,
    },
    {
      id: 212,
      name: "Suite Centrale",
      city: "Genova",
      rating: 4.6,
      accessibilityLevel: 2,
      image: cardImage1,
    },
    {
      id: 213,
      name: "Resort del Sole",
      city: "Cagliari",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage2,
    },
    {
      id: 214,
      name: "Hotel del Porto",
      city: "Trieste",
      rating: 4.5,
      accessibilityLevel: 3,
      image: cardImage3,
    },
    {
      id: 215,
      name: "Dimora Accessibile",
      city: "Padova",
      rating: 4.7,
      accessibilityLevel: 5,
      image: cardImage4,
    },
    {
      id: 216,
      name: "Grand Stay Milano",
      city: "Milano",
      rating: 4.6,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 217,
      name: "Hotel Bella Vista",
      city: "Perugia",
      rating: 4.5,
      accessibilityLevel: 2,
      image: cardImage2,
    },
  ]

  const hotelPopolari = [
    {
      id: 205,
      name: "Hotel Riviera",
      city: "Rimini",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 206,
      name: "Resort del Lago",
      city: "Como",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 207,
      name: "Hotel Centrale",
      city: "Roma",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage4,
    },
  ]

  return (
    <div className="hotel-page">
      <section
        className="hotel-hero"
        style={{ backgroundImage: `url(${termeHero})` }}
      >
        <div className="hotel-hero-overlay">
          <div className="hotel-hero-content">
            <h1>Hotel accessibili</h1>
            <p>
              Scopri e recensisci i migliori hotel accessibili per persone con
              disabilità
            </p>

            <div className="hotel-search-bar">
              <div className="hotel-search-input">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Cerca hotel accessibili" />
              </div>
              <button>Cerca</button>
            </div>

            <div className="hotel-filters-pill">
              <span>
                <i className="bi bi-funnel-fill"></i> Filtri
              </span>
              <span>Tutti</span>
              <span>Più votati</span>
              <span>Vicino a me</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hotel-main-section">
        <div className="hotel-main-header">
          <h2>I migliori hotel accessibili</h2>
        </div>

        <div className="hotel-scroll-area">
          <div className="hotel-main-layout">
            <div className="hotel-left-content">
              <div className="hotel-toolbar">
                <button className="toolbar-button">
                  <i className="bi bi-sliders"></i> Filtri
                </button>

                <div className="toolbar-dropdowns">
                  <button>Più votati</button>
                  <button>Vicino a me</button>
                </div>
              </div>

              <div className="hotel-grid">
                {hotelPrincipali.map((hotel) => (
                  <Link
                    key={hotel.id}
                    to={`/struttura/${hotel.id}`}
                    className="hotel-card-link"
                  >
                    <div className="hotel-card">
                      <img src={hotel.image} alt={hotel.name} />
                      <div className="hotel-card-body">
                        <h3>{hotel.name}</h3>
                        <p>{hotel.city}</p>

                        <div className="hotel-card-footer">
                          {renderWheelchairs(hotel.accessibilityLevel)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hotel-right-content">
              <div className="hotel-guide-card">
                <h3>Guida all'accessibilità negli hotel</h3>
                <p>
                  Scopri i servizi più importanti da controllare prima di
                  prenotare il tuo soggiorno.
                </p>

                <Link
                  to="/hotel/guida-accessibilita"
                  className="hotel-guide-button-link"
                >
                  Scopri di più
                </Link>
              </div>

              <div className="hotel-guide-card image-card">
                <img src={guideImage} alt="Guida hotel accessibili" />
                <h3>Consigli per visitare gli hotel</h3>
                <p>
                  Scopri i suggerimenti utili per organizzare il soggiorno,
                  capire cosa controllare prima di prenotare e quali domande
                  fare alla struttura.
                </p>

                <Link
                  to="/hotel/consigli-visita"
                  className="hotel-guide-button-link"
                >
                  Scopri di più
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hotel-popular-section">
        <h2>
          I più popolari questa settimana: <span>Hotel e soggiorni</span>
        </h2>

        <div className="hotel-popular-grid">
          {hotelPopolari.map((hotel) => (
            <Link
              key={hotel.id}
              to={`/struttura/${hotel.id}`}
              className="hotel-card-link"
            >
              <div className="hotel-small-card">
                <img src={hotel.image} alt={hotel.name} />
                <div className="hotel-small-card-body">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.city}</p>

                  <div className="hotel-card-footer">
                    {renderWheelchairs(hotel.accessibilityLevel)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button className="chat-button">
          <i className="bi bi-chat-dots-fill"></i> Chatta con noi
        </button>
      </section>
    </div>
  )
}

export default Hotel
