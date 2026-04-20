import { useEffect, useMemo, useRef, useState } from "react"
import "./styles/Hotel.css"
import hotelHero from "../../assets/images/HOTEL/termehero.jpg"
import { getStruttureByCategoria } from "../../services/struttureService"
import { getStructureReviews } from "../../services/structureDetailService"
import HotelCard from "./components/HotelCard"
import HotelSmallCard from "./components/HotelSmallCard"
import HotelGuideCards from "./components/HotelGuideCards"
import {
  getRatingValue,
  hasAccessibilityInfo,
  hasCoordinates,
  getDistanceFromUser,
} from "../../services/termeHelpers"

function Hotel() {
  const [hotelPrincipali, setHotelPrincipali] = useState([])
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
    const loadHotel = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getStruttureByCategoria("HOTEL")

        const hotelConRating = await Promise.all(
          data.map(async (hotel) => {
            try {
              const recensioni = await getStructureReviews(hotel.idStruttura)

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
                ...hotel,
                ratingMedio,
              }
            } catch (error) {
              console.error(
                "Errore recensioni hotel:",
                hotel.idStruttura,
                error,
              )

              return {
                ...hotel,
                ratingMedio: 0,
              }
            }
          }),
        )

        console.log("HOTEL DATA", hotelConRating)
        setHotelPrincipali(hotelConRating)
      } catch (error) {
        console.error("Errore caricamento hotel:", error)
        setError("Non è stato possibile caricare gli hotel.")
        setHotelPrincipali([])
      } finally {
        setLoading(false)
      }
    }

    loadHotel()
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

  const hotelFiltrati = useMemo(() => {
    if (!Array.isArray(hotelPrincipali)) return []

    let lista = [...hotelPrincipali]

    if (searchTerm.trim()) {
      const testoRicerca = searchTerm.toLowerCase()

      lista = lista.filter((hotel) => {
        if (!hotel) return false

        const nome = hotel.nome?.toLowerCase() || ""
        const citta = hotel.citta?.toLowerCase() || ""
        const descrizione = hotel.descrizione?.toLowerCase() || ""

        return (
          nome.includes(testoRicerca) ||
          citta.includes(testoRicerca) ||
          descrizione.includes(testoRicerca)
        )
      })
    }

    if (soloAccessibili) {
      lista = lista.filter((hotel) => hasAccessibilityInfo(hotel))
    }

    if (soloConCoordinate) {
      lista = lista.filter((hotel) => hasCoordinates(hotel))
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
    hotelPrincipali,
    searchTerm,
    soloAccessibili,
    soloConCoordinate,
    ordinamento,
    posizioneUtente,
  ])

  const hotelPopolari = useMemo(() => {
    if (!Array.isArray(hotelFiltrati)) return []
    return hotelFiltrati.slice(0, 3)
  }, [hotelFiltrati])

  const renderWheelchairs = (hotel) => {
    const ratingValue = getRatingValue(hotel)
    const rating = Math.round(ratingValue)

    return (
      <div className="hotel-icons">
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

        <span className="hotel-rating-number">{ratingValue.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="hotel-page">
      <section
        className="hotel-hero"
        style={{ backgroundImage: `url(${hotelHero})` }}
      >
        <div className="hotel-hero-overlay">
          <div className="hotel-hero-content">
            <h1>Hotel accessibili</h1>
            <p>
              Scopri e recensisci i migliori hotel accessibili per persone con
              disabilità
            </p>

            <div className="hotel-search-bar">
              <div className="hotel-search-input">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Cerca hotel accessibili"
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

            <div className="hotel-filters-pill" ref={filtersRef}>
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
                <div className="hotel-filters-dropdown">
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

      <section className="hotel-main-section" ref={risultatiRef}>
        <div className="hotel-main-header">
          <h2>I migliori hotel accessibili</h2>
        </div>

        <div className="hotel-toolbar">
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
          <p className="hotel-feedback-message">Caricamento hotel...</p>
        )}

        {error && <p className="hotel-feedback-message">{error}</p>}

        {!loading && !error && hotelFiltrati.length === 0 && (
          <p className="hotel-feedback-message">
            Nessuna struttura hotel trovata.
          </p>
        )}

        {!loading && !error && hotelFiltrati.length > 0 && (
          <div className="hotel-scroll-area">
            <div className="hotel-main-layout">
              <div className="hotel-left-content">
                <div className="hotel-grid">
                  {hotelFiltrati.map((hotel) =>
                    hotel ? (
                      <HotelCard
                        key={hotel.idStruttura}
                        hotel={hotel}
                        renderWheelchairs={renderWheelchairs}
                      />
                    ) : null,
                  )}
                </div>
              </div>

              <div className="hotel-right-content">
                <HotelGuideCards />
              </div>
            </div>
          </div>
        )}
      </section>

      {!loading && !error && hotelPopolari.length > 0 && (
        <section className="hotel-popular-section">
          <h2>
            I più popolari questa settimana: <span>Hotel e soggiorni</span>
          </h2>

          <div className="hotel-popular-grid">
            {hotelPopolari.map((hotel) =>
              hotel ? (
                <HotelSmallCard
                  key={`popular-${hotel.idStruttura}`}
                  hotel={hotel}
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

export default Hotel
