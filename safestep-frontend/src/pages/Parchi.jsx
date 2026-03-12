import { Link } from "react-router-dom"
import "../styles/pages/Parchi.css"
import termeHero from "../assets/images/terme-hero.jpg"
import cardImage1 from "../assets/images/terme-card-1.jpg"
import cardImage2 from "../assets/images/terme-card-2.jpg"
import cardImage3 from "../assets/images/terme-card-3.jpg"
import cardImage4 from "../assets/images/terme-card-4.jpg"
import guideImage from "../assets/images/guida-terme.jpg"

function Parchi() {
  const parchiPrincipali = [
    {
      id: 301,
      name: "Parco Verde Inclusivo",
      city: "Verona",
      rating: 4.8,
      image: cardImage1,
    },
    {
      id: 302,
      name: "Giardino Sereno",
      city: "Padova",
      rating: 4.6,
      image: cardImage2,
    },
    {
      id: 303,
      name: "Parco delle Acacie",
      city: "Ferrara",
      rating: 4.5,
      image: cardImage3,
    },
    {
      id: 304,
      name: "Oasi Cittadina",
      city: "Parma",
      rating: 4.7,
      image: cardImage4,
    },
  ]

  const parchiPopolari = [
    {
      id: 305,
      name: "Parco del Sole",
      city: "Ravenna",
      rating: 4.7,
      image: cardImage1,
    },
    {
      id: 306,
      name: "Bosco Urbano",
      city: "Brescia",
      rating: 4.6,
      image: cardImage2,
    },
    {
      id: 307,
      name: "Parco Panorama",
      city: "Trento",
      rating: 4.8,
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
                        <div className="parchi-icons">
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                          <i className="bi bi-person-wheelchair"></i>
                        </div>

                        <div className="parchi-rating">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                          <span>{parco.rating}</span>
                        </div>
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
                Scopri i percorsi, gli ingressi e i servizi più utili per vivere
                una giornata all'aperto senza ostacoli.
              </p>
              <button>Scopri di più</button>
            </div>

            <div className="parchi-guide-card image-card">
              <img src={guideImage} alt="Guida parchi accessibili" />
              <h3>Guida all'accessibilità nei parchi</h3>
              <p>
                Scopri i percorsi, gli ingressi e i servizi più utili per vivere
                una giornata all'aperto senza ostacoli.
              </p>
              <button>Scopri di più</button>
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
                    <div className="parchi-icons">
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                      <i className="bi bi-person-wheelchair"></i>
                    </div>

                    <div className="parchi-rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                      <span>{parco.rating}</span>
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

export default Parchi
