import { Link } from "react-router-dom"
import "../styles/pages/Hotel.css"
import termehero from "../assets/images/HOTEL/termehero.jpg"
import guideImage from "../assets/images/HOTEL/guideImage.jpg"
import cardImage1 from "../assets/images/HOTEL/cardImage1.jpg"
import cardImage2 from "../assets/images/HOTEL/cardImage2.jpg"
import cardImage3 from "../assets/images/HOTEL/cardImage3.jpg"
import cardImage4 from "../assets/images/HOTEL/cardImage4.jpg"
import cardImage5 from "../assets/images/HOTEL/cardImage5.jpg"
import cardImage6 from "../assets/images/HOTEL/cardImage6.jpg"

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
      name: "Grand Hotel",
      city: "Rimini",
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
      name: "Hotel Bristol Palace",
      city: "Genova",
      rating: 4.7,
      accessibilityLevel: 3,
      image: cardImage5,
    },
    {
      id: 209,
      name: "DC Hotel International",
      city: "Padova",
      rating: 4.6,
      accessibilityLevel: 4,
      image: cardImage6,
    },
  ]

  const hotelPopolari = [
    {
      id: 205,
      name: "Grand Hotel",
      city: "Rimini",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 206,
      name: "Grand Hotel Relax",
      city: "Milano",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 207,
      name: "Hotel Panorama",
      city: "Torino",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage4,
    },
  ]

  return (
    <div className="hotel-page">
      <section
        className="hotel-hero"
        style={{ backgroundImage: `url(${termehero})` }}
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
                    to="/home-place-detail"
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
              to="/home-place-detail"
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
