import { useEffect, useMemo, useRef, useState } from "react"
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
  const [soloAccessibili, setSoloAccessibili] = useState(false)
  const [soloConCoordinate, setSoloConCoordinate] = useState(false)
  const [ordinamento, setOrdinamento] = useState("default")
  const [posizioneUtente, setPosizioneUtente] = useState(null)
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false)

  const risultatiRef = useRef(null)
  const filtersRef = useRef(null)

  useEffect(() => {
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
        setTermePrincipali(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Errore caricamento terme:", error)
        setError("Non è stato possibile caricare le terme.")
        setTermePrincipali([])
      } finally {
        setLoading(false)
      }
    }

    fetchTerme()
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

  const getRatingValue = (terma) => {
    if (!terma) return 0

    return Number(
      terma.ratingMedio ||
        terma.mediaVoti ||
        terma.mediaRecensioni ||
        terma.votoMedio ||
        terma.rating ||
        0,
    )
  }

  const hasAccessibilityInfo = (terma) => {
    if (!terma) return false

    if (terma.accessibile === true) return true
    if (terma.accessibilitaStruttura === true) return true
    if (terma.rampe === true) return true
    if (terma.parcheggioDisabili === true) return true
    if (terma.bagnoAccessibile === true) return true

    if (
      Array.isArray(terma.caratteristicheAccessibilita) &&
      terma.caratteristicheAccessibilita.length > 0
    ) {
      return true
    }

    if (Array.isArray(terma.accessibilita) && terma.accessibilita.length > 0) {
      return true
    }

    const noteDisabili = terma.noteDisabili?.trim() || ""
    const accessibilitaNote = terma.accessibilitaNote?.trim() || ""

    return Boolean(noteDisabili || accessibilitaNote)
  }

  const hasCoordinates = (terma) => {
    if (!terma) return false

    const latitudine = Number(terma.latitudine)
    const longitudine = Number(terma.longitudine)

    return !Number.isNaN(latitudine) && !Number.isNaN(longitudine)
  }

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

    const toRadians = (value) => {
      return (value * Math.PI) / 180
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const earthRadius = 6371

      const deltaLat = toRadians(lat2 - lat1)
      const deltaLon = toRadians(lon2 - lon1)

      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(deltaLon / 2) *
          Math.sin(deltaLon / 2)

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      return earthRadius * c
    }

    const getDistanceFromUser = (terma) => {
      if (!posizioneUtente || !terma) return Number.POSITIVE_INFINITY

      const latitudineStruttura = Number(terma.latitudine)
      const longitudineStruttura = Number(terma.longitudine)

      if (
        Number.isNaN(latitudineStruttura) ||
        Number.isNaN(longitudineStruttura)
      ) {
        return Number.POSITIVE_INFINITY
      }

      return calculateDistance(
        posizioneUtente.latitude,
        posizioneUtente.longitude,
        latitudineStruttura,
        longitudineStruttura,
      )
    }

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
      lista.sort((a, b) => getDistanceFromUser(a) - getDistanceFromUser(b))
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
    const accessibilitaPresente = hasAccessibilityInfo(terma)

    if (!accessibilitaPresente) {
      return (
        <div className="terme-card-accessibility">
          <i className="bi bi-person-wheelchair"></i>
        </div>
      )
    }

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

  const renderStars = (terma) => {
    const rating = getRatingValue(terma)
    const ratingDaMostrare = rating > 0 ? rating.toFixed(1) : "4.7"

    return (
      <div className="terme-card-rating">
        <span className="terme-stars">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
        </span>
        <span className="terme-rating-number">{ratingDaMostrare}</span>
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
                      if (e.key === "Enter") {
                        handleSearch()
                      }
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
            <div className="terme-main-layout">
              <div className="terme-cards-column">
                <div className="terme-grid">
                  {termeFiltrate.map((terma) => {
                    if (!terma) return null

                    return (
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
                            alt={terma.nome || "Struttura termale"}
                            className="terme-card-image"
                          />

                          <div className="terme-card-body">
                            <h3>{terma.nome || "Nome non disponibile"}</h3>
                            <p className="terme-card-city">
                              {terma.citta || "Città non disponibile"}
                            </p>

                            <div className="terme-card-bottom">
                              {renderWheelchairs(terma)}
                              {renderStars(terma)}
                            </div>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
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
              {termePopolari.map((terma) => {
                if (!terma) return null

                return (
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
                        alt={terma.nome || "Struttura termale"}
                        className="terme-small-card-image"
                      />

                      <div className="terme-small-card-body">
                        <h3>{terma.nome || "Nome non disponibile"}</h3>
                        <p className="terme-card-city">
                          {terma.citta || "Città non disponibile"}
                        </p>

                        <div className="terme-card-bottom">
                          {renderWheelchairs(terma)}
                          {renderStars(terma)}
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
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
