import { Link } from "react-router-dom"
import "../styles/pages/Parchi.css"
import termeHero from "../assets/images/terme-hero.jpg"
import cardImage1 from "../assets/images/terme-card-1.jpg"
import cardImage2 from "../assets/images/terme-card-2.jpg"
import cardImage3 from "../assets/images/terme-card-3.jpg"
import cardImage4 from "../assets/images/terme-card-4.jpg"
import guideImage from "../assets/images/guida-terme.jpg"

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
      name: "Parco Verde Inclusivo",
      city: "Verona",
      rating: 4.8,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 302,
      name: "Giardino Sereno",
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
      name: "Oasi Cittadina",
      city: "Parma",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage4,
    },
    {
      id: 308,
      name: "Parco del Fiume",
      city: "Mantova",
      rating: 4.6,
      accessibilityLevel: 2,
      image: cardImage1,
    },
    {
      id: 309,
      name: "Giardino delle Rose",
      city: "Bologna",
      rating: 4.5,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 310,
      name: "Parco Panorama Verde",
      city: "Trento",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage3,
    },
    {
      id: 311,
      name: "Area Relax Natura",
      city: "Udine",
      rating: 4.4,
      accessibilityLevel: 2,
      image: cardImage4,
    },
    {
      id: 312,
      name: "Parco del Lago",
      city: "Como",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 313,
      name: "Giardino del Sole",
      city: "Ravenna",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 314,
      name: "Parco Collina Aperta",
      city: "Perugia",
      rating: 4.5,
      accessibilityLevel: 2,
      image: cardImage3,
    },
    {
      id: 315,
      name: "Oasi Verde Urbana",
      city: "Milano",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage4,
    },
    {
      id: 316,
      name: "Parco dei Tigli",
      city: "Vicenza",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage1,
    },
    {
      id: 317,
      name: "Bosco Accessibile",
      city: "Brescia",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage2,
    },
  ]

  const parchiPopolari = [
    {
      id: 305,
      name: "Parco del Sole",
      city: "Ravenna",
      rating: 4.7,
      accessibilityLevel: 4,
      image: cardImage1,
    },
    {
      id: 306,
      name: "Bosco Urbano",
      city: "Brescia",
      rating: 4.6,
      accessibilityLevel: 3,
      image: cardImage2,
    },
    {
      id: 307,
      name: "Parco Panorama",
      city: "Trento",
      rating: 4.8,
      accessibilityLevel: 5,
      image: cardImage4,
    },
  ]

  return (
    <div className="parchi-page">
      <section
        className="parchi-hero"
        style={{ backgroundImage: `url(${termeHero})` }}
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
                    to={`/struttura/${parco.id}`}
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
              to={`/struttura/${parco.id}`}
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
