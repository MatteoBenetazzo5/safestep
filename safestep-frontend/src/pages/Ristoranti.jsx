import { Link } from "react-router-dom"
import "../styles/pages/Ristoranti.css"
import termehero from "../assets/images/RISTORANTI/ristorantihero.jpg"
import guideImage from "../assets/images/RISTORANTI/guideImage.jpg"
import cardImage1 from "../assets/images/RISTORANTI/cardImage1.jpg"
import cardImage2 from "../assets/images/RISTORANTI/cardImage2.jpg"
import cardImage3 from "../assets/images/RISTORANTI/cardImage3.jpg"
import cardImage4 from "../assets/images/RISTORANTI/cardImage4.jpg"
import cardImage5 from "../assets/images/RISTORANTI/cardImage5.jpg"
import cardImage6 from "../assets/images/RISTORANTI/cardImage6.jpg"

function Ristoranti() {
  const renderWheelchairs = (count) => {
    return (
      <div className="ristoranti-icons">
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

  const ristorantiPrincipali = [
    {
      id: 101,
      name: "Ristorante Laguna Blu",
      city: "Venezia",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 102,
      name: "Trattoria Il Gusto",
      city: "Padova",
      rating: 4.5,
      accessibilityLevel: 5,
      image: cardImage2,
    },
    {
      id: 103,
      name: "Bistrot Senza Barriere",
      city: "Verona",
      rating: 4.8,
      accessibilityLevel: 4,
      image: cardImage3,
    },
    {
      id: 104,
      name: "Osteria del Centro",
      city: "Treviso",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage4,
    },
    {
      id: 108,
      name: "Ristorante Mare Chiaro",
      city: "Rimini",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage5,
    },
    {
      id: 109,
      name: "Locanda Bella Vista",
      city: "Bergamo",
      rating: 4.4,
      accessibilityLevel: 2,
      image: cardImage6,
    },
  ]

  const ristorantiPopolari = [
    {
      id: 105,
      name: "Ristorante Laguna Blu",
      city: "Venezia",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage1,
    },
    {
      id: 106,
      name: "Trattoria Il Gusto",
      city: "Padova",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 107,
      name: "Osteria del Centro",
      city: "Treviso",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage4,
    },
  ]

  return (
    <div className="ristoranti-page">
      <section
        className="ristoranti-hero"
        style={{ backgroundImage: `url(${termehero})` }}
      >
        <div className="ristoranti-hero-overlay">
          <div className="ristoranti-hero-content">
            <h1>Ristoranti accessibili</h1>
            <p>
              Scopri e recensisci i migliori ristoranti accessibili per persone
              con disabilità
            </p>

            <div className="ristoranti-search-bar">
              <div className="ristoranti-search-input">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Cerca ristoranti accessibili" />
              </div>
              <button>Cerca</button>
            </div>

            <div className="ristoranti-filters-pill">
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

      <section className="ristoranti-main-section">
        <div className="ristoranti-main-header">
          <h2>I migliori ristoranti accessibili</h2>
        </div>

        <div className="ristoranti-scroll-area">
          <div className="ristoranti-main-layout">
            <div className="ristoranti-left-content">
              <div className="ristoranti-toolbar">
                <button className="toolbar-button">
                  <i className="bi bi-sliders"></i> Filtri
                </button>

                <div className="toolbar-dropdowns">
                  <button>Più votati</button>
                  <button>Vicino a me</button>
                </div>
              </div>

              <div className="ristoranti-grid">
                {ristorantiPrincipali.map((ristorante) => (
                  <Link
                    key={ristorante.id}
                    to="/home-place-detail"
                    className="ristoranti-card-link"
                  >
                    <div className="ristoranti-card">
                      <img src={ristorante.image} alt={ristorante.name} />
                      <div className="ristoranti-card-body">
                        <h3>{ristorante.name}</h3>
                        <p>{ristorante.city}</p>

                        <div className="ristoranti-card-footer">
                          {renderWheelchairs(ristorante.accessibilityLevel)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="ristoranti-right-content">
              <div className="ristoranti-guide-card">
                <h3>Guida all'accessibilità nei ristoranti</h3>
                <p>
                  Scopri cosa controllare prima di prenotare e trova locali più
                  comodi, inclusivi e facili da raggiungere.
                </p>

                <Link
                  to="/ristoranti/guida-accessibilita"
                  className="ristoranti-guide-button-link"
                >
                  Scopri di più
                </Link>
              </div>

              <div className="ristoranti-guide-card image-card">
                <img src={guideImage} alt="Guida ristoranti accessibili" />
                <h3>Consigli per visitare i ristoranti</h3>
                <p>
                  Leggi i suggerimenti utili per organizzare la visita, capire
                  cosa controllare prima di prenotare e quali domande fare al
                  locale.
                </p>

                <Link
                  to="/ristoranti/consigli-visita"
                  className="ristoranti-guide-button-link"
                >
                  Scopri di più
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ristoranti-popular-section">
        <h2>
          I più popolari questa settimana: <span>Ristoranti e sapori</span>
        </h2>

        <div className="ristoranti-popular-grid">
          {ristorantiPopolari.map((ristorante) => (
            <Link
              key={ristorante.id}
              to="/home-place-detail"
              className="ristoranti-card-link"
            >
              <div className="ristoranti-small-card">
                <img src={ristorante.image} alt={ristorante.name} />
                <div className="ristoranti-small-card-body">
                  <h3>{ristorante.name}</h3>
                  <p>{ristorante.city}</p>

                  <div className="ristoranti-card-footer">
                    {renderWheelchairs(ristorante.accessibilityLevel)}
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

export default Ristoranti
