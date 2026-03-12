import { Link } from "react-router-dom"
import "../styles/pages/Hotel.css"
import termeHero from "../assets/images/terme-hero.jpg"
import cardImage1 from "../assets/images/terme-card-1.jpg"
import cardImage2 from "../assets/images/terme-card-2.jpg"
import cardImage3 from "../assets/images/terme-card-3.jpg"
import cardImage4 from "../assets/images/terme-card-4.jpg"
import guideImage from "../assets/images/guida-terme.jpg"

function Hotel() {
  const hotelPrincipali = [
    {
      id: 201,
      name: "Hotel Aurora",
      city: "Mestre",
      rating: 4.6,
      image: cardImage1,
    },
    {
      id: 202,
      name: "Grand Hotel Relax",
      city: "Milano",
      rating: 4.7,
      image: cardImage2,
    },
    {
      id: 203,
      name: "Suite Comfort",
      city: "Firenze",
      rating: 4.5,
      image: cardImage3,
    },
    {
      id: 204,
      name: "Hotel Panorama",
      city: "Torino",
      rating: 4.8,
      image: cardImage4,
    },
  ]

  const hotelPopolari = [
    {
      id: 205,
      name: "Hotel Riviera",
      city: "Rimini",
      rating: 4.7,
      image: cardImage1,
    },
    {
      id: 206,
      name: "Resort del Lago",
      city: "Como",
      rating: 4.6,
      image: cardImage2,
    },
    {
      id: 207,
      name: "Hotel Centrale",
      city: "Roma",
      rating: 4.8,
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
                        <div className="hotel-icons">
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                        </div>

                        <div className="hotel-rating">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                          <span>{hotel.rating}</span>
                        </div>
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
              <button>Scopri di più</button>
            </div>

            <div className="hotel-guide-card image-card">
              <img src={guideImage} alt="Guida hotel accessibili" />
              <h3>Guida all'accessibilità negli hotel</h3>
              <p>
                Scopri i servizi più importanti da controllare prima di
                prenotare il tuo soggiorno.
              </p>
              <button>Scopri di più</button>
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
                    <div className="hotel-icons">
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                    </div>

                    <div className="hotel-rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                      <span>{hotel.rating}</span>
                    </div>
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
