import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAvatar, getIdUtente, getNomeVisualizzato } from "../../utils/auth"
import { API_BASE_URL, getAuthHeaders } from "../../utils/api"
import "./styles/DettaglioStrutturaLayout.css"
import DetailHero from "./components/DetailHero"
import DetailGallery from "./components/DetailGallery"
import DetailRatingCard from "./components/DetailRatingCard"
import DetailInfoBox from "./components/DetailInfoBox"
import DetailReviewForm from "./components/DetailReviewForm"
import DetailReviewsList from "./components/DetailReviewsList"

function DettaglioStruttura() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idUtente = getIdUtente()
  const avatarUtente = getAvatar()
  const nomeVisualizzatoUtente = getNomeVisualizzato()

  const [structure, setStructure] = useState(null)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState("")
  const [reviews, setReviews] = useState([])
  const [accessibilita, setAccessibilita] = useState([])
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
        fetch(`${API_BASE_URL}/accessibilita/struttura/${id}`, {
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
      const accessibilitaResponse = responses[3]
      const savedResponse = responses[4]

      if (!structureResponse.ok) {
        throw new Error("Errore nel caricamento della struttura")
      }

      const structureData = await structureResponse.json()
      const imagesData = imagesResponse.ok ? await imagesResponse.json() : []
      const reviewsData = reviewsResponse.ok ? await reviewsResponse.json() : []
      const accessibilitaData = accessibilitaResponse.ok
        ? await accessibilitaResponse.json()
        : []

      setStructure(structureData)
      setImages(imagesData)
      setReviews(reviewsData)
      setAccessibilita(accessibilitaData)

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

  const navigateToWorkInProgress = () => {
    navigate("/home-place-detail")
  }

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
            utenteId: idUtente,
            strutturaId: id,
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

  const heroImage = useMemo(() => {
    if (structure?.immagineCopertina) {
      return structure.immagineCopertina
    }

    if (images.length > 0) {
      return images[0].url
    }

    return placeholderImage
  }, [structure, images, placeholderImage])

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
          strutturaId: id,
          utenteId: idUtente,
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
      const rawVote = Number(review.voto)
      const normalizedVote = Math.round(rawVote)

      if (counts[normalizedVote] !== undefined) {
        counts[normalizedVote] += 1
      }
    })

    return [5, 4, 3, 2, 1].map((vote) => {
      const count = counts[vote]
      const percentage =
        reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0

      return {
        vote,
        count,
        percentage,
      }
    })
  }, [reviews])

  const renderWheelchairs = (vote = 0, interactive = false) => {
    const normalizedVote = Number(vote) || 0

    return (
      <span
        className={`detail-wheelchairs ${interactive ? "interactive" : ""}`}
      >
        {[1, 2, 3, 4, 5].map((item) => {
          let fillPercentage = 0

          if (normalizedVote >= item) {
            fillPercentage = 100
          } else if (normalizedVote >= item - 0.5) {
            fillPercentage = 50
          }

          return (
            <span key={item} className="wheelchair-rating-item">
              {interactive && (
                <>
                  <button
                    type="button"
                    className="wheelchair-hitbox wheelchair-hitbox-half"
                    onClick={() =>
                      setReviewForm((prev) => ({
                        ...prev,
                        voto: item - 0.5,
                      }))
                    }
                    aria-label={`Valuta ${item - 0.5}`}
                  ></button>

                  <button
                    type="button"
                    className="wheelchair-hitbox wheelchair-hitbox-full"
                    onClick={() =>
                      setReviewForm((prev) => ({
                        ...prev,
                        voto: item,
                      }))
                    }
                    aria-label={`Valuta ${item}`}
                  ></button>
                </>
              )}

              <span className="wheelchair-icon-base">
                <i className="bi bi-person-wheelchair"></i>
              </span>

              <span
                className="wheelchair-icon-fill"
                style={{ width: `${fillPercentage}%` }}
              >
                <i className="bi bi-person-wheelchair"></i>
              </span>
            </span>
          )
        })}
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
      <DetailHero
        structure={structure}
        heroImage={heroImage}
        placeholderImage={placeholderImage}
        navigate={navigate}
        handleToggleSaved={handleToggleSaved}
        savingFavorite={savingFavorite}
        isSaved={isSaved}
      />

      <main className="structure-detail-container">
        <section className="detail-top-layout">
          <DetailGallery
            structure={structure}
            selectedImage={selectedImage}
            placeholderImage={placeholderImage}
            allGalleryImages={allGalleryImages}
            setSelectedImage={setSelectedImage}
          />

          <DetailRatingCard
            reviews={reviews}
            structure={structure}
            averageVote={averageVote}
            voteDistribution={voteDistribution}
            renderWheelchairs={renderWheelchairs}
          />
        </section>

        <section className="detail-bottom-layout">
          <div className="detail-info-column">
            <DetailInfoBox
              structure={structure}
              averageVote={averageVote}
              accessibilita={accessibilita}
              reviews={reviews}
              selectedImage={selectedImage}
              placeholderImage={placeholderImage}
              renderWheelchairs={renderWheelchairs}
            />
          </div>

          <div className="detail-reviews-column">
            <DetailReviewForm
              idUtente={idUtente}
              navigate={navigate}
              reviewForm={reviewForm}
              handleReviewChange={handleReviewChange}
              handleReviewSubmit={handleReviewSubmit}
              sendingReview={sendingReview}
              renderWheelchairs={renderWheelchairs}
              avatarUtente={avatarUtente}
              nomeVisualizzatoUtente={nomeVisualizzatoUtente}
              navigateToWorkInProgress={navigateToWorkInProgress}
            />

            <DetailReviewsList
              reviews={reviews}
              structure={structure}
              selectedImage={selectedImage}
              placeholderImage={placeholderImage}
              renderWheelchairs={renderWheelchairs}
              formatDate={formatDate}
              navigateToWorkInProgress={navigateToWorkInProgress}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default DettaglioStruttura
