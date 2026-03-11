import { Link } from "react-router-dom"
import "../styles/pages/Terme.css"
import termeHero from "../assets/images/terme-hero.jpg"
import cardImage1 from "../assets/images/terme-card-1.jpg"
import cardImage2 from "../assets/images/terme-card-2.jpg"
import cardImage3 from "../assets/images/terme-card-3.jpg"
import cardImage4 from "../assets/images/terme-card-4.jpg"
import guideImage from "../assets/images/guida-terme.jpg"

function Terme() {
  const termePrincipali = [
    {
      id: 1,
      name: "Terme di Abano",
      city: "Abano Terme",
      rating: 4.7,
      image: cardImage1,
    },
    {
      id: 2,
      name: "Terme Sensoriali",
      city: "Chianciano Terme",
      rating: 4.6,
      image: cardImage2,
    },
    {
      id: 3,
      name: "Hotel Terme Olympia",
      city: "Montegrotto Terme",
      rating: 4.4,
      image: cardImage3,
    },
    {
      id: 4,
      name: "Terme di Sirmione",
      city: "Sirmione",
      rating: 4.8,
      image: cardImage4,
    },
  ]

  const termePopolari = [
    {
      id: 5,
      name: "Terme di Cristallo",
      city: "Montegrotto Terme",
      rating: 4.8,
      image: cardImage1,
    },
    {
      id: 6,
      name: "Hotel Terme Sole",
      city: "Battaglia Terme",
      rating: 4.7,
      image: cardImage2,
    },
    {
      id: 7,
      name: "Bagni Vecchi di Bormio",
      city: "Bormio",
      rating: 4.6,
      image: cardImage4,
    },
  ]

  return (
    <div className="terme-page">
      <section
        className="terme-hero"
        style={{ backgroundImage: `url(${termeHero})` }}
      >
        <div className="terme-hero-overlay">
          <div className="terme-hero-content">
            <h1>Terme accessibili</h1>
            <p>
              Scopri e recensisci le migliori terme accessibili per persone con
              disabilità
            </p>

            <div className="terme-search-bar">
              <div className="terme-search-input">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Cerca terme accessibili" />
              </div>
              <button>Cerca</button>
            </div>

            <div className="terme-filters-pill">
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

      <section className="terme-main-section">
        <div className="terme-main-header">
          <h2>Le migliori terme accessibili</h2>
        </div>

        <div className="terme-main-layout">
          <div className="terme-left-content">
            <div className="terme-toolbar">
              <button className="toolbar-button">
                <i className="bi bi-sliders"></i> Filtri
              </button>

              <div className="toolbar-dropdowns">
                <button>Più votati</button>
                <button>Vicino a me</button>
              </div>
            </div>

            <div className="terme-grid">
              {termePrincipali.map((terma) => (
                <Link
                  key={terma.id}
                  to={`/struttura/${terma.id}`}
                  className="terme-card-link"
                >
                  <div className="terme-card">
                    <img src={terma.image} alt={terma.name} />
                    <div className="terme-card-body">
                      <h3>{terma.name}</h3>
                      <p>{terma.city}</p>

                      <div className="terme-card-footer">
                        <div className="terme-icons">
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                        </div>

                        <div className="terme-rating">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                          <span>{terma.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="terme-right-content">
            <div className="terme-guide-card">
              <h3>Guida all'accessibilità nelle terme</h3>
              <p>
                Scopri di più sulle caratteristiche delle terme accessibili e
                leggi i nostri consigli per pianificare la tua visita.
              </p>
              <button>Scopri di più</button>
            </div>

            <div className="terme-guide-card image-card">
              <img src={guideImage} alt="Guida terme accessibili" />
              <h3>Guida all'accessibilità nelle terme</h3>
              <p>
                Scopri di più sulle caratteristiche delle terme accessibili e
                leggi i nostri consigli per pianificare la tua visita.
              </p>
              <button>Scopri di più</button>
            </div>
          </div>
        </div>
      </section>

      <section className="terme-popular-section">
        <h2>
          I più popolari questa settimana: <span>Terme e benessere</span>
        </h2>

        <div className="terme-popular-grid">
          {termePopolari.map((terma) => (
            <Link
              key={terma.id}
              to={`/struttura/${terma.id}`}
              className="terme-card-link"
            >
              <div className="terme-small-card">
                <img src={terma.image} alt={terma.name} />
                <div className="terme-small-card-body">
                  <h3>{terma.name}</h3>
                  <p>{terma.city}</p>

                  <div className="terme-card-footer">
                    <div className="terme-icons">
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                    </div>

                    <div className="terme-rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                      <span>{terma.rating}</span>
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

export default Terme
