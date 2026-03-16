import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getIdUtente } from "../utils/auth"
import { API_BASE_URL, getAuthHeaders } from "../utils/api"
import "../styles/pages/DettaglioStruttura.css"

function DettaglioStruttura() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idUtente = getIdUtente()

  const [structure, setStructure] = useState(null)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState("")
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [savingFavorite, setSavingFavorite] = useState(false)

  const [reviewForm, setReviewForm] = useState({
    voto: 5,
    testo: "",
  })
  const [sendingReview, setSendingReview] = useState(false)

  const placeholderImage =
    "https://via.placeholder.com/1200x700?text=SafeStep+Structure"

  const fetchStructureDetails = useCallback(async () => {
    try {
      setLoading(true)
      setError("")

      const requests = [
        fetch(`${API_BASE_URL}/strutture/${id}`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/immagini-struttura/struttura/${id}`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/recensioni/struttura/${id}`, {
          headers: getAuthHeaders(),
        }),
      ]

      if (idUtente) {
        requests.push(
          fetch(`${API_BASE_URL}/strutture-salvate/utente/${idUtente}`, {
            headers: getAuthHeaders(),
          }),
        )
      }

      const responses = await Promise.all(requests)

      const structureResponse = responses[0]
      const imagesResponse = responses[1]
      const reviewsResponse = responses[2]
      const savedResponse = responses[3]

      if (!structureResponse.ok) {
        throw new Error("Errore nel caricamento della struttura")
      }

      const structureData = await structureResponse.json()
      const imagesData = imagesResponse.ok ? await imagesResponse.json() : []
      const reviewsData = reviewsResponse.ok ? await reviewsResponse.json() : []

      setStructure(structureData)
      setImages(imagesData)
      setReviews(reviewsData)

      if (imagesData.length > 0) {
        setSelectedImage(imagesData[0].url)
      } else if (structureData.immagineCopertina) {
        setSelectedImage(structureData.immagineCopertina)
      } else {
        setSelectedImage(placeholderImage)
      }

      if (savedResponse && savedResponse.ok) {
        const savedData = await savedResponse.json()

        const alreadySaved = savedData.some(
          (item) => item.struttura?.idStruttura === structureData.idStruttura,
        )

        setIsSaved(alreadySaved)
      } else {
        setIsSaved(false)
      }
    } catch (error) {
      console.error("Errore caricamento dettaglio struttura:", error)
      setError("Non è stato possibile caricare questa struttura.")
    } finally {
      setLoading(false)
    }
  }, [id, idUtente, placeholderImage])

  useEffect(() => {
    fetchStructureDetails()
  }, [fetchStructureDetails])

  const handleToggleSaved = async () => {
    if (!idUtente) {
      alert("Devi effettuare il login per salvare una struttura.")
      navigate("/login")
      return
    }

    try {
      setSavingFavorite(true)

      if (isSaved) {
        const response = await fetch(
          `${API_BASE_URL}/strutture-salvate/utente/${idUtente}/struttura/${id}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
          },
        )

        if (!response.ok) {
          throw new Error("Errore nella rimozione dai preferiti")
        }

        setIsSaved(false)
        alert("Struttura rimossa dai preferiti.")
      } else {
        const response = await fetch(`${API_BASE_URL}/strutture-salvate`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            utenteId: Number(idUtente),
            strutturaId: Number(id),
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Errore salvataggio preferiti:", errorText)
          throw new Error("Errore nel salvataggio della struttura")
        }

        setIsSaved(true)
        alert("Struttura salvata nei preferiti.")
      }
    } catch (error) {
      console.error("Errore preferiti:", error)
      alert("Operazione non riuscita.")
    } finally {
      setSavingFavorite(false)
    }
  }

  const handleReviewChange = (e) => {
    const { name, value } = e.target

    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()

    if (!idUtente) {
      alert("Devi effettuare il login per lasciare una recensione.")
      navigate("/login")
      return
    }

    if (!reviewForm.testo.trim()) {
      alert("Scrivi un testo per la recensione.")
      return
    }

    try {
      setSendingReview(true)

      const response = await fetch(`${API_BASE_URL}/recensioni`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          strutturaId: Number(id),
          utenteId: Number(idUtente),
          voto: Number(reviewForm.voto),
          testo: reviewForm.testo.trim(),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore invio recensione:", errorText)
        alert(
          "Recensione non inviata. Potresti aver già recensito questa struttura.",
        )
        return
      }

      alert("Recensione inviata con successo!")

      setReviewForm({
        voto: 5,
        testo: "",
      })

      fetchStructureDetails()
    } catch (error) {
      console.error("Errore invio recensione:", error)
      alert("Errore durante l'invio della recensione.")
    } finally {
      setSendingReview(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("it-IT")
  }

  const allGalleryImages = useMemo(() => {
    const gallery = []

    if (structure?.immagineCopertina) {
      gallery.push({
        id: "cover",
        url: structure.immagineCopertina,
      })
    }

    images.forEach((image) => {
      if (image.url !== structure?.immagineCopertina) {
        gallery.push({
          id: image.idImmagineStruttura,
          url: image.url,
        })
      }
    })

    if (gallery.length === 0) {
      gallery.push({
        id: "placeholder",
        url: placeholderImage,
      })
    }

    return gallery
  }, [images, structure, placeholderImage])

  const averageVote =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + Number(review.voto || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "4.6"

  const voteDistribution = useMemo(() => {
    const counts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    }

    reviews.forEach((review) => {
      const vote = Number(review.voto)
      if (counts[vote] !== undefined) {
        counts[vote] += 1
      }
    })

    return [5, 4, 3, 2, 1].map((vote) => {
      const count = counts[vote]
      const percentage =
        reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0

      return {
        vote,
        percentage,
      }
    })
  }, [reviews])

  const renderWheelchairs = (count = 5) => {
    return (
      <span className="detail-wheelchairs">
        {Array.from({ length: count }).map((_, index) => (
          <i key={index} className="bi bi-person-wheelchair"></i>
        ))}
      </span>
    )
  }

  const renderStars = (vote) => {
    return (
      <span className="detail-stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <i
            key={index}
            className={index < vote ? "bi bi-star-fill" : "bi bi-star"}
          ></i>
        ))}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="structure-detail-page">
        <div className="structure-detail-container">
          <p className="detail-feedback">Caricamento struttura...</p>
        </div>
      </div>
    )
  }

  if (error || !structure) {
    return (
      <div className="structure-detail-page">
        <div className="structure-detail-container">
          <p className="detail-feedback">{error || "Struttura non trovata."}</p>

          <Link to="/terme" className="detail-back-link">
            Torna alle terme
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="structure-detail-page">
      <section
        className="detail-hero"
        style={{
          backgroundImage: `url(${selectedImage || structure.immagineCopertina || placeholderImage})`,
        }}
      >
        <div className="detail-hero-overlay">
          <div className="detail-hero-content">
            <div className="detail-breadcrumb">
              <button
                type="button"
                className="detail-breadcrumb-link"
                onClick={() => navigate(-1)}
              >
                Home
              </button>
              <i className="bi bi-chevron-right"></i>
              <span>{structure.nome}</span>
            </div>

            <h1>{structure.nome}</h1>

            <div className="detail-location-row">
              <span className="detail-location">
                <i className="bi bi-geo-alt-fill"></i>
                {structure.citta || "Località non disponibile"}
              </span>

              <span className="detail-category-badge">
                {structure.categoria || "Struttura"}
              </span>
            </div>

            <div className="detail-action-buttons">
              <button
                type="button"
                className="detail-btn light-btn"
                onClick={handleToggleSaved}
                disabled={savingFavorite}
              >
                <i className="bi bi-heart"></i>
                {savingFavorite ? "Attendi..." : isSaved ? "Salvata" : "Salva"}
              </button>

              {structure.sitoWeb ? (
                <a
                  href={structure.sitoWeb}
                  target="_blank"
                  rel="noreferrer"
                  className="detail-btn blue-btn detail-btn-link"
                >
                  Sito ufficiale
                </a>
              ) : (
                <button type="button" className="detail-btn blue-btn" disabled>
                  Sito ufficiale
                </button>
              )}

              <button type="button" className="detail-btn circle-btn">
                <i className="bi bi-send-fill"></i>
              </button>

              <button type="button" className="detail-btn green-btn">
                Indicazioni
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="structure-detail-container">
        <section className="detail-top-layout">
          <div className="detail-gallery-column">
            <div className="detail-main-image-card">
              <img
                src={selectedImage || placeholderImage}
                alt={structure.nome}
                className="detail-main-image"
              />

              <div className="detail-gallery-counter">
                1 / {allGalleryImages.length}
              </div>
            </div>

            <div className="detail-thumbnails">
              {allGalleryImages.slice(0, 3).map((image) => (
                <button
                  key={image.id}
                  type="button"
                  className={`detail-thumbnail-button ${
                    selectedImage === image.url ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img src={image.url} alt="Anteprima struttura" />
                </button>
              ))}
            </div>
          </div>

          <aside className="detail-side-column">
            <div className="detail-rating-card">
              <h3>Valutazioni e recensioni</h3>

              <div className="detail-big-rating">
                <div className="detail-rating-main">
                  {renderWheelchairs()}
                  <span className="rating-number">{averageVote} / 5</span>
                </div>
              </div>

              <div className="rating-bars">
                {voteDistribution.map((item) => (
                  <div key={item.vote} className="rating-bar-row">
                    <span>{item.vote}</span>

                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>

                    <span>{item.percentage}%</span>
                  </div>
                ))}
              </div>

              <button type="button" className="follow-button">
                Segui il rilievo
              </button>
            </div>

            {reviews.length > 0 && (
              <div className="detail-mini-review-card">
                <div className="detail-mini-review-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div className="detail-mini-review-content">
                  <div className="detail-mini-review-top">
                    <h4>{reviews[0]?.utente?.nomeVisualizzato || "Utente"}</h4>
                    <p>{structure.citta || "Italia"}</p>
                  </div>

                  <div className="mini-review-rating">
                    {renderWheelchairs()}
                    <span>{reviews[0]?.voto || 5}.0 / 5</span>
                    <i className="bi bi-check-circle-fill verified-icon"></i>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>

        <section className="detail-bottom-layout">
          <div className="detail-info-column">
            <div className="info-box">
              <h2>Informazioni</h2>

              <div className="map-placeholder">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <p className="address-line">
                <i className="bi bi-geo-alt-fill"></i>
                {structure.indirizzo
                  ? `${structure.indirizzo}, ${structure.citta || ""}`
                  : structure.citta || "Indirizzo non disponibile"}
              </p>

              <div className="accessibility-block">
                <h3>Livello di accessibilità</h3>

                <div className="accessibility-rating-row">
                  {renderWheelchairs()}
                  {renderStars(Math.round(Number(averageVote)))}
                  <span>{averageVote} / 5</span>
                </div>

                <ul className="accessibility-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Piscina con accesso facilitato
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Camere attrezzate
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Bagni spaziosi
                  </li>
                </ul>

                {structure.telefono && (
                  <p className="detail-extra-row">
                    <strong>Telefono:</strong> {structure.telefono}
                  </p>
                )}

                {structure.paese && (
                  <p className="detail-extra-row">
                    <strong>Paese:</strong> {structure.paese}
                  </p>
                )}
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="comments-box">
                <h2>Commentari ({reviews.length})</h2>

                <div className="comment-preview-card">
                  <div className="comment-user-row">
                    <div className="detail-mini-review-avatar">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <h4>
                        {reviews[0]?.utente?.nomeVisualizzato || "Utente"}
                      </h4>
                      <p>{structure.citta || "Italia"}</p>
                      <div className="mini-review-rating">
                        {renderWheelchairs(5)}
                        {renderStars(reviews[0]?.voto || 5)}
                      </div>
                    </div>
                  </div>

                  <img
                    src={selectedImage || placeholderImage}
                    alt="Anteprima recensione"
                    className="comment-preview-image"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="detail-reviews-column">
            <div className="review-form-box">
              <h2>Valutazioni e recensioni</h2>
              <p>Condividi la tua esperienza con questo luogo!</p>

              {!idUtente ? (
                <div className="review-login-box">
                  <p>Effettua il login per scrivere una recensione.</p>

                  <button
                    type="button"
                    className="review-submit-button"
                    onClick={() => navigate("/login")}
                  >
                    Vai al login
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleReviewSubmit}
                  className="review-input-card"
                >
                  <div className="review-user-header">
                    <div className="review-user-info">
                      <div className="detail-mini-review-avatar big-avatar">
                        <i className="bi bi-person-fill"></i>
                      </div>

                      <div>
                        <h4>La tua recensione</h4>
                        <div className="review-vote-selector">
                          <label htmlFor="voto">Voto</label>
                          <select
                            id="voto"
                            name="voto"
                            value={reviewForm.voto}
                            onChange={handleReviewChange}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="button" className="upload-photo-button">
                      <i className="bi bi-camera-fill"></i>
                      Carica foto
                    </button>
                  </div>

                  <textarea
                    name="testo"
                    value={reviewForm.testo}
                    onChange={handleReviewChange}
                    placeholder="Scrivi la tua recensione"
                  ></textarea>

                  <div className="review-form-footer">
                    <div className="review-upload-preview"></div>

                    <div className="review-actions">
                      <button type="button">
                        <i className="bi bi-circle-fill"></i>
                      </button>

                      <button type="button">
                        <i className="bi bi-hand-thumbs-up-fill"></i>
                      </button>

                      <button
                        type="submit"
                        className="review-submit-button"
                        disabled={sendingReview}
                      >
                        {sendingReview
                          ? "Invio in corso..."
                          : "Invia recensione"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div className="reviews-list-box">
              <div className="reviews-pagination">
                <button type="button" className="active-page">
                  1
                </button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button">...</button>
                <button type="button">5</button>
              </div>

              {reviews.length === 0 ? (
                <div className="review-card">
                  <p className="detail-feedback">
                    Ancora nessuna recensione per questa struttura.
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <article key={review.idRecensione} className="review-card">
                    <div className="review-card-header">
                      <div className="review-card-user">
                        <div className="detail-mini-review-avatar big-avatar">
                          <i className="bi bi-person-fill"></i>
                        </div>

                        <div>
                          <div className="review-name-row">
                            <h4>
                              {review.utente?.nomeVisualizzato || "Utente"}
                            </h4>
                            <span>{structure.citta || "Italia"}</span>
                          </div>

                          <div className="mini-review-rating">
                            {renderWheelchairs()}
                            {renderStars(review.voto || 5)}
                          </div>
                        </div>
                      </div>

                      <div className="review-donations">
                        {formatDate(review.dataCreazione)}
                      </div>
                    </div>

                    <p className="review-text">{review.testo}</p>

                    <img
                      src={selectedImage || placeholderImage}
                      alt="Recensione struttura"
                      className="review-image"
                    />

                    <div className="review-bottom-row">
                      <button type="button">
                        <i className="bi bi-hand-thumbs-up"></i>
                        56
                      </button>

                      <button type="button">Rispondi</button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DettaglioStruttura
