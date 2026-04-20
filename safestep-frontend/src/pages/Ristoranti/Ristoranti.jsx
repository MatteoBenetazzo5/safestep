import { useEffect, useMemo, useRef, useState } from "react"
import "./styles/Ristoranti.css"
import ristorantiHero from "../../assets/images/RISTORANTI/ristorantihero.jpg"
import { getStruttureByCategoria } from "../../services/struttureService"
import { getStructureReviews } from "../../services/structureDetailService"
import RistorantiCard from "./components/RistorantiCard"
import RistorantiSmallCard from "./components/RistorantiSmallCard"
import RistorantiGuideCards from "./components/RistorantiGuideCards"
import {
  getRatingValue,
  hasAccessibilityInfo,
  hasCoordinates,
  getDistanceFromUser,
} from "../../services/termeHelpers"

function Ristoranti() {
  const [ristorantiPrincipali, setRistorantiPrincipali] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [soloAccessibili, setSoloAccessibili] = useState(false)
  const [soloConCoordinate, setSoloConCoordinate] = useState(false)
  const [ordinamento, setOrdinamento] = useState("default")
  const [posizioneUtente, setPosizioneUtente] = useState(null)
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false)

  const risultatiRef = useRef(null)
  const filtersRef = useRef(null)

  useEffect(() => {
    const loadRistoranti = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getStruttureByCategoria("RISTORANTI")

        const ristorantiConRating = await Promise.all(
          data.map(async (ristorante) => {
            try {
              const recensioni = await getStructureReviews(
                ristorante.idStruttura,
              )

              const recensioniSicure = Array.isArray(recensioni)
                ? recensioni
                : []

              const ratingMedio =
                recensioniSicure.length > 0
                  ? recensioniSicure.reduce(
                      (totale, recensione) =>
                        totale + Number(recensione.voto || 0),
                      0,
                    ) / recensioniSicure.length
                  : 0

              return {
                ...ristorante,
                ratingMedio,
              }
            } catch (error) {
              console.error(
                "Errore recensioni ristorante:",
                ristorante.idStruttura,
                error,
              )

              return {
                ...ristorante,
                ratingMedio: 0,
              }
            }
          }),
        )

        console.log("RISTORANTI DATA", ristorantiConRating)
        setRistorantiPrincipali(ristorantiConRating)
      } catch (error) {
        console.error("Errore caricamento ristoranti:", error)
        setError("Non è stato possibile caricare i ristoranti.")
        setRistorantiPrincipali([])
      } finally {
        setLoading(false)
      }
    }

    loadRistoranti()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFiltersDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const scrollToResults = () => {
    if (risultatiRef.current) {
      risultatiRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleSearch = () => {
    scrollToResults()
  }

  const handleResetFilters = () => {
    setSoloAccessibili(false)
    setSoloConCoordinate(false)
    setOrdinamento("default")
    setPosizioneUtente(null)
    setError("")
    setShowFiltersDropdown(false)
  }

  const handleTopRated = () => {
    setOrdinamento("rating")
    scrollToResults()
  }

  const handleNearby = () => {
    if (!navigator.geolocation) {
      setError("La geolocalizzazione non è supportata dal browser.")
      return
    }

    setError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosizioneUtente({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setOrdinamento("distance")
        scrollToResults()
      },
      () => {
        setError("Non è stato possibile recuperare la tua posizione.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const ristorantiFiltrati = useMemo(() => {
    if (!Array.isArray(ristorantiPrincipali)) return []

    let lista = [...ristorantiPrincipali]

    if (searchTerm.trim()) {
      const testoRicerca = searchTerm.toLowerCase()

      lista = lista.filter((ristorante) => {
        if (!ristorante) return false

        const nome = ristorante.nome?.toLowerCase() || ""
        const citta = ristorante.citta?.toLowerCase() || ""
        const descrizione = ristorante.descrizione?.toLowerCase() || ""

        return (
          nome.includes(testoRicerca) ||
          citta.includes(testoRicerca) ||
          descrizione.includes(testoRicerca)
        )
      })
    }

    if (soloAccessibili) {
      lista = lista.filter((ristorante) => hasAccessibilityInfo(ristorante))
    }

    if (soloConCoordinate) {
      lista = lista.filter((ristorante) => hasCoordinates(ristorante))
    }

    if (ordinamento === "rating") {
      lista.sort((a, b) => getRatingValue(b) - getRatingValue(a))
    }

    if (ordinamento === "distance" && posizioneUtente) {
      lista.sort((a, b) => {
        return (
          getDistanceFromUser(a, posizioneUtente) -
          getDistanceFromUser(b, posizioneUtente)
        )
      })
    }

    return lista
  }, [
    ristorantiPrincipali,
    searchTerm,
    soloAccessibili,
    soloConCoordinate,
    ordinamento,
    posizioneUtente,
  ])

  const ristorantiPopolari = useMemo(() => {
    if (!Array.isArray(ristorantiFiltrati)) return []
    return ristorantiFiltrati.slice(0, 3)
  }, [ristorantiFiltrati])

  const renderWheelchairs = (ristorante) => {
    const ratingValue = getRatingValue(ristorante)
    const rating = Math.round(ratingValue)

    return (
      <div className="ristoranti-icons">
        <i
          className={`bi bi-person-wheelchair ${rating >= 1 ? "is-active" : "is-muted"}`}
        ></i>
        <i
          className={`bi bi-person-wheelchair ${rating >= 2 ? "is-active" : "is-muted"}`}
        ></i>
        <i
          className={`bi bi-person-wheelchair ${rating >= 3 ? "is-active" : "is-muted"}`}
        ></i>
        <i
          className={`bi bi-person-wheelchair ${rating >= 4 ? "is-active" : "is-muted"}`}
        ></i>
        <i
          className={`bi bi-person-wheelchair ${rating >= 5 ? "is-active" : "is-muted"}`}
        ></i>

        <span className="ristoranti-rating-number">
          {ratingValue.toFixed(1)}
        </span>
      </div>
    )
  }

  return (
    <div className="ristoranti-page">
      <section
        className="ristoranti-hero"
        style={{ backgroundImage: `url(${ristorantiHero})` }}
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
                <input
                  type="text"
                  placeholder="Cerca ristoranti accessibili"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch()
                  }}
                />
              </div>
              <button type="button" onClick={handleSearch}>
                Cerca
              </button>
            </div>

            <div className="ristoranti-filters-pill" ref={filtersRef}>
              <button
                type="button"
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
              >
                <i className="bi bi-funnel-fill"></i>
                Filtri
                <i className="bi bi-chevron-down"></i>
              </button>

              <button type="button" onClick={handleResetFilters}>
                Tutti
                <i className="bi bi-chevron-down"></i>
              </button>

              <button type="button" onClick={handleTopRated}>
                Più votati
              </button>

              <button type="button" onClick={handleNearby}>
                Vicino a me
                <i className="bi bi-chevron-down"></i>
              </button>

              {showFiltersDropdown && (
                <div className="ristoranti-filters-dropdown">
                  <button
                    type="button"
                    onClick={() => setSoloAccessibili(!soloAccessibili)}
                  >
                    {soloAccessibili ? "✓ " : ""}
                    Solo accessibili
                  </button>

                  <button
                    type="button"
                    onClick={() => setSoloConCoordinate(!soloConCoordinate)}
                  >
                    {soloConCoordinate ? "✓ " : ""}
                    Solo con coordinate
                  </button>

                  <button type="button" onClick={handleTopRated}>
                    Ordina per voto
                  </button>

                  <button type="button" onClick={handleNearby}>
                    Ordina per vicinanza
                  </button>

                  <button type="button" onClick={handleResetFilters}>
                    Reset filtri
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="ristoranti-main-section" ref={risultatiRef}>
        <div className="ristoranti-main-header">
          <h2>I migliori ristoranti accessibili</h2>
        </div>

        <div className="ristoranti-toolbar">
          <button
            type="button"
            className="toolbar-button"
            onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
          >
            <i className="bi bi-sliders"></i> Filtri
          </button>

          <div className="toolbar-dropdowns">
            <button type="button" onClick={handleTopRated}>
              Più votati
            </button>
            <button type="button" onClick={handleNearby}>
              Vicino a me
            </button>
          </div>
        </div>

        {loading && (
          <p className="ristoranti-feedback-message">
            Caricamento ristoranti...
          </p>
        )}

        {error && <p className="ristoranti-feedback-message">{error}</p>}

        {!loading && !error && ristorantiFiltrati.length === 0 && (
          <p className="ristoranti-feedback-message">
            Nessuna struttura ristorante trovata.
          </p>
        )}

        {!loading && !error && ristorantiFiltrati.length > 0 && (
          <div className="ristoranti-scroll-area">
            <div className="ristoranti-main-layout">
              <div className="ristoranti-left-content">
                <div className="ristoranti-grid">
                  {ristorantiFiltrati.map((ristorante) =>
                    ristorante ? (
                      <RistorantiCard
                        key={ristorante.idStruttura}
                        ristorante={ristorante}
                        renderWheelchairs={renderWheelchairs}
                      />
                    ) : null,
                  )}
                </div>
              </div>

              <div className="ristoranti-right-content">
                <RistorantiGuideCards />
              </div>
            </div>
          </div>
        )}
      </section>

      {!loading && !error && ristorantiPopolari.length > 0 && (
        <section className="ristoranti-popular-section">
          <h2>
            I più popolari questa settimana: <span>Ristoranti e sapori</span>
          </h2>

          <div className="ristoranti-popular-grid">
            {ristorantiPopolari.map((ristorante) =>
              ristorante ? (
                <RistorantiSmallCard
                  key={`popular-${ristorante.idStruttura}`}
                  ristorante={ristorante}
                  renderWheelchairs={renderWheelchairs}
                />
              ) : null,
            )}
          </div>

          <button className="chat-button" type="button">
            <i className="bi bi-chat-dots-fill"></i> Chatta con noi
          </button>
        </section>
      )}
    </div>
  )
}

export default Ristoranti
