import { useEffect, useMemo, useRef, useState } from "react"
import "./styles/Terme.css"
import termeHero from "../../assets/images/TERME/termehero.jpg"
import { getStruttureByCategoria } from "../../services/struttureService"
import { getStructureReviews } from "../../services/structureDetailService"
import TermeCard from "./components/TermeCard"
import TermeSmallCard from "./components/TermeSmallCard"
import TermeGuideCards from "./components/TermeGuideCards"
import {
  getRatingValue,
  hasAccessibilityInfo,
  hasCoordinates,
  getDistanceFromUser,
} from "../../services/termeHelpers"

function Terme() {
  const [termePrincipali, setTermePrincipali] = useState([])
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
    const loadTerme = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getStruttureByCategoria("TERME")

        const termeConRating = await Promise.all(
          data.map(async (terma) => {
            try {
              const recensioni = await getStructureReviews(terma.idStruttura)

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
                ...terma,
                ratingMedio,
              }
            } catch (error) {
              console.error(
                "Errore recensioni terma:",
                terma.idStruttura,
                error,
              )

              return {
                ...terma,
                ratingMedio: 0,
              }
            }
          }),
        )

        console.log("TERME DATA", termeConRating)
        setTermePrincipali(termeConRating)
      } catch (error) {
        console.error("Errore caricamento terme:", error)
        setError("Non è stato possibile caricare le terme.")
        setTermePrincipali([])
      } finally {
        setLoading(false)
      }
    }

    loadTerme()
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

  const termeFiltrate = useMemo(() => {
    if (!Array.isArray(termePrincipali)) return []

    let lista = [...termePrincipali]

    if (searchTerm.trim()) {
      const testoRicerca = searchTerm.toLowerCase()

      lista = lista.filter((terma) => {
        if (!terma) return false

        const nome = terma.nome?.toLowerCase() || ""
        const citta = terma.citta?.toLowerCase() || ""
        const descrizione = terma.descrizione?.toLowerCase() || ""

        return (
          nome.includes(testoRicerca) ||
          citta.includes(testoRicerca) ||
          descrizione.includes(testoRicerca)
        )
      })
    }

    if (soloAccessibili) {
      lista = lista.filter((terma) => hasAccessibilityInfo(terma))
    }

    if (soloConCoordinate) {
      lista = lista.filter((terma) => hasCoordinates(terma))
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
    termePrincipali,
    searchTerm,
    soloAccessibili,
    soloConCoordinate,
    ordinamento,
    posizioneUtente,
  ])

  const termePopolari = useMemo(() => {
    if (!Array.isArray(termeFiltrate)) return []
    return termeFiltrate.slice(0, 3)
  }, [termeFiltrate])

  const renderWheelchairs = (terma) => {
    const ratingValue = getRatingValue(terma)
    const rating = Math.round(ratingValue)

    return (
      <div className="terme-card-accessibility">
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

        <span className="terme-rating-number">{ratingValue.toFixed(1)}</span>
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch()
                    }}
                  />
                </div>

                <button type="button" onClick={handleSearch}>
                  Cerca
                </button>
              </div>

              <div className="terme-filters-pill" ref={filtersRef}>
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
                  <div className="terme-filters-dropdown">
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
        </div>
      </section>

      <section className="terme-content-section" ref={risultatiRef}>
        <div className="terme-content-container">
          <div className="terme-section-title">
            <h2>Le migliori terme accessibili</h2>
          </div>

          <div className="terme-toolbar">
            <button
              type="button"
              className="terme-toolbar-main"
              onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            >
              <i className="bi bi-sliders"></i>
              Filtri
              <i className="bi bi-chevron-right"></i>
            </button>

            <div className="terme-toolbar-secondary">
              <button type="button" onClick={handleTopRated}>
                Più votati
                <i className="bi bi-chevron-down"></i>
              </button>

              <button type="button" onClick={handleNearby}>
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
            <div className="terme-scroll-area">
              <div className="terme-main-layout">
                <div className="terme-cards-column">
                  <div className="terme-grid">
                    {termeFiltrate.map((terma) =>
                      terma ? (
                        <TermeCard
                          key={terma.idStruttura}
                          terma={terma}
                          renderWheelchairs={renderWheelchairs}
                        />
                      ) : null,
                    )}
                  </div>
                </div>

                <TermeGuideCards />
              </div>
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
              {termePopolari.map((terma) =>
                terma ? (
                  <TermeSmallCard
                    key={`popular-${terma.idStruttura}`}
                    terma={terma}
                    renderWheelchairs={renderWheelchairs}
                  />
                ) : null,
              )}
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
