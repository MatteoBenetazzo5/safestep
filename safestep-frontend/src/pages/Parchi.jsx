import { Link } from "react-router-dom"
import "../styles/pages/Parchi.css"
import parchihero from "../assets/images/PARCHI/parchihero.jpg"
import guideImage from "../assets/images/PARCHI/guideImage.jpg"
import cardImage1 from "../assets/images/PARCHI/cardImage1.jpg"
import cardImage2 from "../assets/images/PARCHI/cardImage2.jpg"
import cardImage3 from "../assets/images/PARCHI/cardImage3.jpg"
import cardImage4 from "../assets/images/PARCHI/cardImage4.jpg"
import cardImage5 from "../assets/images/PARCHI/cardImage5.jpg"
import cardImage6 from "../assets/images/PARCHI/cardImage6.jpg"

function Parchi() {
  const renderWheelchairs = (count) => {
    return (
      <div className="parchi-icons">
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

  const parchiPrincipali = [
    {
      id: 301,
      name: "Parco Giardino Sigurtà",
      city: "Valeggio sul Mincio",
      rating: 4.8,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 302,
      name: "Parco Iris",
      city: "Padova",
      rating: 4.6,
      accessibilityLevel: 5,
      image: cardImage2,
    },
    {
      id: 303,
      name: "Parco delle Acacie",
      city: "Ferrara",
      rating: 4.5,
      accessibilityLevel: 3,
      image: cardImage3,
    },
    {
      id: 304,
      name: "Parco nazionale dell'Asinara",
      city: "Sardegna",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage4,
    },
    {
      id: 308,
      name: "Parco Nazionale del Circeo",
      city: "Terracina",
      rating: 4.6,
      accessibilityLevel: 2,
      image: cardImage5,
    },
    {
      id: 309,
      name: "Parco nazionale dello Stelvio",
      city: "Alpi",
      rating: 4.5,
      accessibilityLevel: 3,
      image: cardImage6,
    },
  ]

  const parchiPopolari = [
    {
      id: 305,
      name: "Parco Giardino Sigurtà",
      city: "Valeggio sul Mincio",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 306,
      name: "Parco Iris",
      city: "Padova",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 307,
      name: "Parco nazionale dell'Asinara",
      city: "Sardegna",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage4,
    },
  ]

  return (
    <div className="parchi-page">
      <section
        className="parchi-hero"
        style={{ backgroundImage: `url(${parchihero})` }}
      >
        <div className="parchi-hero-overlay">
          <div className="parchi-hero-content">
            <h1>Parchi accessibili</h1>
            <p>
              Scopri e recensisci i migliori parchi accessibili per persone con
              disabilità
            </p>

            <div className="parchi-search-bar">
              <div className="parchi-search-input">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Cerca parchi accessibili" />
              </div>
              <button>Cerca</button>
            </div>

            <div className="parchi-filters-pill">
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

      <section className="parchi-main-section">
        <div className="parchi-main-header">
          <h2>I migliori parchi accessibili</h2>
        </div>

        <div className="parchi-scroll-area">
          <div className="parchi-main-layout">
            <div className="parchi-left-content">
              <div className="parchi-toolbar">
                <button className="toolbar-button">
                  <i className="bi bi-sliders"></i> Filtri
                </button>

                <div className="toolbar-dropdowns">
                  <button>Più votati</button>
                  <button>Vicino a me</button>
                </div>
              </div>

              <div className="parchi-grid">
                {parchiPrincipali.map((parco) => (
                  <Link
                    key={parco.id}
                    to="/home-place-detail"
                    className="parchi-card-link"
                  >
                    <div className="parchi-card">
                      <img src={parco.image} alt={parco.name} />
                      <div className="parchi-card-body">
                        <h3>{parco.name}</h3>
                        <p>{parco.city}</p>

                        <div className="parchi-card-footer">
                          {renderWheelchairs(parco.accessibilityLevel)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="parchi-right-content">
              <div className="parchi-guide-card">
                <h3>Guida all'accessibilità nei parchi</h3>
                <p>
                  Scopri i percorsi, gli ingressi e i servizi più utili per
                  vivere una giornata all'aperto senza ostacoli.
                </p>

                <Link
                  to="/parchi/guida-accessibilita"
                  className="parchi-guide-button-link"
                >
                  Scopri di più
                </Link>
              </div>

              <div className="parchi-guide-card image-card">
                <img src={guideImage} alt="Guida parchi accessibili" />
                <h3>Consigli per visitare i parchi</h3>
                <p>
                  Scopri i suggerimenti utili per organizzare la visita, capire
                  cosa controllare prima di partire e quali percorsi preferire.
                </p>

                <Link
                  to="/parchi/consigli-visita"
                  className="parchi-guide-button-link"
                >
                  Scopri di più
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="parchi-popular-section">
        <h2>
          I più popolari questa settimana: <span>Parchi e natura</span>
        </h2>

        <div className="parchi-popular-grid">
          {parchiPopolari.map((parco) => (
            <Link
              key={parco.id}
              to="/home-place-detail"
              className="parchi-card-link"
            >
              <div className="parchi-small-card">
                <img src={parco.image} alt={parco.name} />
                <div className="parchi-small-card-body">
                  <h3>{parco.name}</h3>
                  <p>{parco.city}</p>

                  <div className="parchi-card-footer">
                    {renderWheelchairs(parco.accessibilityLevel)}
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

export default Parchi
