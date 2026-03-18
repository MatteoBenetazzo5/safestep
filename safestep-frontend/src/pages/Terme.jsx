import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { API_BASE_URL, getAuthHeaders } from "../utils/api"
import "../styles/pages/Terme.css"
import termeHero from "../assets/images/terme-hero.jpg"
import guideImage from "../assets/images/guida-terme.jpg"

function Terme() {
  const [termePrincipali, setTermePrincipali] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchTerme()
  }, [])

  const fetchTerme = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        `${API_BASE_URL}/strutture/categoria/TERME`,
        {
          headers: getAuthHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error("Errore nel recupero delle terme")
      }

      const data = await response.json()
      setTermePrincipali(data)
    } catch (error) {
      console.error("Errore caricamento terme:", error)
      setError("Non è stato possibile caricare le terme.")
    } finally {
      setLoading(false)
    }
  }

  const termeFiltrate = useMemo(() => {
    if (!searchTerm.trim()) return termePrincipali

    return termePrincipali.filter((terma) => {
      const nome = terma.nome?.toLowerCase() || ""
      const citta = terma.citta?.toLowerCase() || ""
      const descrizione = terma.descrizione?.toLowerCase() || ""
      const testoRicerca = searchTerm.toLowerCase()

      return (
        nome.includes(testoRicerca) ||
        citta.includes(testoRicerca) ||
        descrizione.includes(testoRicerca)
      )
    })
  }, [termePrincipali, searchTerm])

  const termePopolari = useMemo(() => {
    return [...termeFiltrate].slice(0, 3)
  }, [termeFiltrate])

  const renderWheelchairs = () => {
    return (
      <div className="terme-card-accessibility">
        <i className="bi bi-person-wheelchair"></i>
        <i className="bi bi-person-wheelchair"></i>
        <i className="bi bi-person-wheelchair"></i>
        <i className="bi bi-person-wheelchair"></i>
        <i className="bi bi-person-wheelchair"></i>
      </div>
    )
  }

  const renderStars = () => {
    return (
      <div className="terme-card-rating">
        <span className="terme-stars">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
        </span>
        <span className="terme-rating-number">4.7</span>
      </div>
    )
  }

  return (
    <div className="terme-page">
      <section
        className="terme-hero-section"
        style={{ backgroundImage: `url(${termeHero})` }}
      >
        <div className="terme-hero-overlay">
          <div className="terme-hero-inner">
            <div className="terme-hero-content">
              <h1>Terme accessibili</h1>
              <p>
                Scopri e recensisci le migliori terme accessibili per persone
                con disabilità
              </p>

              <div className="terme-search-box">
                <div className="terme-search-left">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    placeholder="Cerca terme accessibili"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button type="button">Cerca</button>
              </div>

              <div className="terme-filters-pill">
                <button type="button">
                  <i className="bi bi-funnel-fill"></i>
                  Filtri
                  <i className="bi bi-chevron-down"></i>
                </button>

                <button type="button">
                  Tutti
                  <i className="bi bi-chevron-down"></i>
                </button>

                <button type="button">Più votati</button>

                <button type="button">
                  Vicino a me
                  <i className="bi bi-chevron-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="terme-content-section">
        <div className="terme-content-container">
          <div className="terme-section-title">
            <h2>Le migliori terme accessibili</h2>
          </div>

          <div className="terme-toolbar">
            <button type="button" className="terme-toolbar-main">
              <i className="bi bi-sliders"></i>
              Filtri
              <i className="bi bi-chevron-right"></i>
            </button>

            <div className="terme-toolbar-secondary">
              <button type="button">
                Più votati
                <i className="bi bi-chevron-down"></i>
              </button>

              <button type="button">
                Vicino a me
                <i className="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>

          {loading && (
            <p className="terme-feedback-message">Caricamento terme...</p>
          )}

          {error && <p className="terme-feedback-message">{error}</p>}

          {!loading && !error && termeFiltrate.length === 0 && (
            <p className="terme-feedback-message">
              Nessuna struttura termale trovata.
            </p>
          )}

          {!loading && !error && termeFiltrate.length > 0 && (
            <div className="terme-main-layout">
              <div className="terme-cards-column">
                <div className="terme-grid">
                  {termeFiltrate.map((terma, index) => (
                    <Link
                      key={terma.idStruttura}
                      to={`/struttura/${terma.idStruttura}`}
                      className="terme-card-link"
                    >
                      <article className="terme-card">
                        <img
                          src={
                            terma.immagineCopertina ||
                            "https://via.placeholder.com/800x500?text=SafeStep"
                          }
                          alt={terma.nome}
                          className="terme-card-image"
                        />

                        <div className="terme-card-body">
                          <h3>{terma.nome}</h3>
                          <p className="terme-card-city">
                            {terma.citta || "Città non disponibile"}
                          </p>

                          <div className="terme-card-bottom">
                            {renderWheelchairs()}
                            {renderStars(index)}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="terme-side-column">
                <div className="terme-guide-card small-guide">
                  <h3>Guida all'accessibilità nelle terme</h3>
                  <p>
                    Scopri di più sulle caratteristiche delle terme accessibili
                    e leggi i nostri consigli per pianificare la tua visita.
                  </p>

                  <Link
                    to="/terme/guida-accessibilita"
                    className="terme-guide-button-link"
                  >
                    Scopri di più
                  </Link>
                </div>

                <div className="terme-guide-card image-guide">
                  <img src={guideImage} alt="Guida terme accessibili" />
                  <div className="terme-guide-card-body">
                    <h3>Consigli per visitare le terme</h3>
                    <p>
                      Leggi i suggerimenti utili per organizzare la visita,
                      capire cosa controllare prima di partire e quali domande
                      fare alla struttura.
                    </p>

                    <Link
                      to="/terme/consigli-visita"
                      className="terme-guide-button-link"
                    >
                      Scopri di più
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {!loading && !error && termePopolari.length > 0 && (
        <section className="terme-popular-section">
          <div className="terme-content-container">
            <h2 className="terme-popular-title">
              I più popolari questa settimana: <span>Terme e benessere</span>
            </h2>

            <div className="terme-popular-grid">
              {termePopolari.map((terma) => (
                <Link
                  key={`popular-${terma.idStruttura}`}
                  to={`/struttura/${terma.idStruttura}`}
                  className="terme-card-link"
                >
                  <article className="terme-small-card">
                    <img
                      src={
                        terma.immagineCopertina ||
                        "https://via.placeholder.com/800x500?text=SafeStep"
                      }
                      alt={terma.nome}
                      className="terme-small-card-image"
                    />

                    <div className="terme-small-card-body">
                      <h3>{terma.nome}</h3>
                      <p className="terme-card-city">
                        {terma.citta || "Città non disponibile"}
                      </p>

                      <div className="terme-card-bottom">
                        {renderWheelchairs()}
                        {renderStars()}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <button className="terme-chat-button" type="button">
        <i className="bi bi-chat-dots-fill"></i>
        Chatta con noi
      </button>
    </div>
  )
}

export default Terme
