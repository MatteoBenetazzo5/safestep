import { useEffect, useMemo, useRef, useState } from "react"
import "./styles/Parchi.css"
import parchiHero from "../../assets/images/PARCHI/parchihero.jpg"
import { getStruttureByCategoria } from "../../services/struttureService"
import { getStructureReviews } from "../../services/structureDetailService"
import ParchiCard from "./components/ParchiCard"
import ParchiSmallCard from "./components/ParchiSmallCard"
import ParchiGuideCards from "./components/ParchiGuideCards"
import {
  getRatingValue,
  hasAccessibilityInfo,
  hasCoordinates,
  getDistanceFromUser,
} from "../../services/termeHelpers"

function Parchi() {
  const [parchiPrincipali, setParchiPrincipali] = useState([])
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
    const loadParchi = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getStruttureByCategoria("PARCHI")

        const parchiConRating = await Promise.all(
          data.map(async (parco) => {
            try {
              const recensioni = await getStructureReviews(parco.idStruttura)

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
                ...parco,
                ratingMedio,
              }
            } catch (error) {
              console.error(
                "Errore recensioni parco:",
                parco.idStruttura,
                error,
              )

              return {
                ...parco,
                ratingMedio: 0,
              }
            }
          }),
        )

        console.log("PARCHI DATA", parchiConRating)
        setParchiPrincipali(parchiConRating)
      } catch (error) {
        console.error("Errore caricamento parchi:", error)
        setError("Non è stato possibile caricare i parchi.")
        setParchiPrincipali([])
      } finally {
        setLoading(false)
      }
    }

    loadParchi()
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

  const parchiFiltrati = useMemo(() => {
    if (!Array.isArray(parchiPrincipali)) return []

    let lista = [...parchiPrincipali]

    if (searchTerm.trim()) {
      const testoRicerca = searchTerm.toLowerCase()

      lista = lista.filter((parco) => {
        if (!parco) return false

        const nome = parco.nome?.toLowerCase() || ""
        const citta = parco.citta?.toLowerCase() || ""
        const descrizione = parco.descrizione?.toLowerCase() || ""

        return (
          nome.includes(testoRicerca) ||
          citta.includes(testoRicerca) ||
          descrizione.includes(testoRicerca)
        )
      })
    }

    if (soloAccessibili) {
      lista = lista.filter((parco) => hasAccessibilityInfo(parco))
    }

    if (soloConCoordinate) {
      lista = lista.filter((parco) => hasCoordinates(parco))
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
    parchiPrincipali,
    searchTerm,
    soloAccessibili,
    soloConCoordinate,
    ordinamento,
    posizioneUtente,
  ])

  const parchiPopolari = useMemo(() => {
    if (!Array.isArray(parchiFiltrati)) return []
    return parchiFiltrati.slice(0, 3)
  }, [parchiFiltrati])

  const renderWheelchairs = (parco) => {
    const ratingValue = getRatingValue(parco)
    const rating = Math.round(ratingValue)

    return (
      <div className="parchi-icons">
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

        <span className="parchi-rating-number">{ratingValue.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="parchi-page">
      <section
        className="parchi-hero"
        style={{ backgroundImage: `url(${parchiHero})` }}
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
                <input
                  type="text"
                  placeholder="Cerca parchi accessibili"
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

            <div className="parchi-filters-pill" ref={filtersRef}>
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
                <div className="parchi-filters-dropdown">
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

      <section className="parchi-main-section" ref={risultatiRef}>
        <div className="parchi-main-header">
          <h2>I migliori parchi accessibili</h2>
        </div>

        <div className="parchi-toolbar">
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
          <p className="parchi-feedback-message">Caricamento parchi...</p>
        )}

        {error && <p className="parchi-feedback-message">{error}</p>}

        {!loading && !error && parchiFiltrati.length === 0 && (
          <p className="parchi-feedback-message">
            Nessuna struttura parco trovata.
          </p>
        )}

        {!loading && !error && parchiFiltrati.length > 0 && (
          <div className="parchi-scroll-area">
            <div className="parchi-main-layout">
              <div className="parchi-left-content">
                <div className="parchi-grid">
                  {parchiFiltrati.map((parco) =>
                    parco ? (
                      <ParchiCard
                        key={parco.idStruttura}
                        parco={parco}
                        renderWheelchairs={renderWheelchairs}
                      />
                    ) : null,
                  )}
                </div>
              </div>

              <div className="parchi-right-content">
                <ParchiGuideCards />
              </div>
            </div>
          </div>
        )}
      </section>

      {!loading && !error && parchiPopolari.length > 0 && (
        <section className="parchi-popular-section">
          <h2>
            I più popolari questa settimana: <span>Parchi e natura</span>
          </h2>

          <div className="parchi-popular-grid">
            {parchiPopolari.map((parco) =>
              parco ? (
                <ParchiSmallCard
                  key={`popular-${parco.idStruttura}`}
                  parco={parco}
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

export default Parchi
