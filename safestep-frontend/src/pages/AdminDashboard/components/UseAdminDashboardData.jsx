import { useCallback, useEffect, useState } from "react"
import { API_BASE_URL, getAuthHeaders } from "../../../utils/api"

function UseAdminDashboardData() {
  const [structures, setStructures] = useState([])
  const [caratteristiche, setCaratteristiche] = useState([])
  const [latestReviews, setLatestReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [usersCount, setUsersCount] = useState(0)
  const [savedCount, setSavedCount] = useState(0)
  const [totalReviewsCount, setTotalReviewsCount] = useState(0)

  const fetchStructures = async () => {
    try {
      setLoading(true)

      let response = await fetch(`${API_BASE_URL}/strutture`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/strutture/categoria/TERME`, {
          headers: getAuthHeaders(),
        })
      }

      if (!response.ok) {
        throw new Error("Errore nel recupero delle strutture")
      }

      const data = await response.json()
      setStructures(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Errore caricamento strutture:", error)
      alert("Errore nel caricamento delle strutture")
      setStructures([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCaratteristiche = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/caratteristiche`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Errore nel recupero delle caratteristiche")
      }

      const data = await response.json()
      setCaratteristiche(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Errore caricamento caratteristiche:", error)
      setCaratteristiche([])
    }
  }

  const fetchUsersCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/utenti/count`, {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const data = await response.json()
        setUsersCount(data.count || 0)
      } else {
        setUsersCount(0)
      }
    } catch (error) {
      console.error("Errore caricamento numero utenti:", error)
      setUsersCount(0)
    }
  }

  const fetchSavedCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/strutture-salvate`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Errore nel recupero delle strutture salvate")
      }

      const data = await response.json()
      setSavedCount(Array.isArray(data) ? data.length : 0)
    } catch (error) {
      console.error("Errore caricamento salvataggi:", error)
      setSavedCount(0)
    }
  }

  const fetchReviewsData = async () => {
    try {
      let structuresResponse = await fetch(`${API_BASE_URL}/strutture`, {
        headers: getAuthHeaders(),
      })

      if (!structuresResponse.ok) {
        structuresResponse = await fetch(
          `${API_BASE_URL}/strutture/categoria/TERME`,
          {
            headers: getAuthHeaders(),
          },
        )
      }

      if (!structuresResponse.ok) {
        throw new Error("Errore nel recupero strutture per recensioni")
      }

      const structuresData = await structuresResponse.json()
      const safeStructures = Array.isArray(structuresData) ? structuresData : []

      const reviewResponses = await Promise.all(
        safeStructures.map(async (structure) => {
          try {
            const response = await fetch(
              `${API_BASE_URL}/recensioni/struttura/${structure.idStruttura}`,
              {
                headers: getAuthHeaders(),
              },
            )

            if (!response.ok) {
              return []
            }

            const reviews = await response.json()

            return Array.isArray(reviews)
              ? reviews.map((review) => ({
                  ...review,
                  strutturaNome: structure.nome,
                  strutturaId: structure.idStruttura,
                }))
              : []
          } catch (error) {
            console.error(
              "Errore caricamento recensioni struttura:",
              structure.idStruttura,
              error,
            )
            return []
          }
        }),
      )

      const allReviews = reviewResponses.flat()

      allReviews.sort((a, b) => {
        const dateA = new Date(a.dataAggiornamento || a.dataCreazione || 0)
        const dateB = new Date(b.dataAggiornamento || b.dataCreazione || 0)
        return dateB - dateA
      })

      setTotalReviewsCount(allReviews.length)
      setLatestReviews(allReviews.slice(0, 20))
    } catch (error) {
      console.error("Errore caricamento recensioni admin:", error)
      setTotalReviewsCount(0)
      setLatestReviews([])
    }
  }

  const refreshDashboardData = useCallback(async () => {
    await Promise.all([
      fetchStructures(),
      fetchCaratteristiche(),
      fetchUsersCount(),
      fetchSavedCount(),
      fetchReviewsData(),
    ])
  }, [])

  useEffect(() => {
    refreshDashboardData()
  }, [refreshDashboardData])

  return {
    structures,
    caratteristiche,
    latestReviews,
    loading,
    usersCount,
    savedCount,
    totalReviewsCount,
    refreshDashboardData,
  }
}

export default UseAdminDashboardData
