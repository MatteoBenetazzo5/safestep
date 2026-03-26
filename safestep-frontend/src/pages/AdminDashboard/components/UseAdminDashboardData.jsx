import { useCallback, useEffect, useState } from "react"
import {
  fetchCaratteristiche,
  fetchSavedStructures,
  fetchStructureAccessibilita,
  fetchStructureReviews,
  fetchStructuresWithFallback,
  fetchUsers,
  fetchUsersCount,
} from "../../../services/adminDashboardService"

function UseAdminDashboardData() {
  const [structures, setStructures] = useState([])
  const [caratteristiche, setCaratteristiche] = useState([])
  const [latestReviews, setLatestReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [usersCount, setUsersCount] = useState(0)
  const [users, setUsers] = useState([])
  const [savedCount, setSavedCount] = useState(0)
  const [totalReviewsCount, setTotalReviewsCount] = useState(0)

  const fetchStructures = async () => {
    try {
      setLoading(true)

      const response = await fetchStructuresWithFallback()

      if (!response.ok) {
        throw new Error("Errore nel recupero delle strutture")
      }

      const data = await response.json()
      const safeStructures = Array.isArray(data) ? data : []

      const structuresWithReviews = await Promise.all(
        safeStructures.map(async (structure) => {
          try {
            const [reviewsResponse, accessibilitaResponse] = await Promise.all([
              fetchStructureReviews(structure.idStruttura),
              fetchStructureAccessibilita(structure.idStruttura),
            ])

            const reviewsData = reviewsResponse.ok
              ? await reviewsResponse.json()
              : []

            const accessibilitaData = accessibilitaResponse.ok
              ? await accessibilitaResponse.json()
              : []

            return {
              ...structure,
              recensioni: Array.isArray(reviewsData) ? reviewsData : [],
              accessibilita: Array.isArray(accessibilitaData)
                ? accessibilitaData
                : [],
            }
          } catch (error) {
            console.error(
              "Errore caricamento dati struttura:",
              structure.idStruttura,
              error,
            )

            return {
              ...structure,
              recensioni: [],
              accessibilita: [],
            }
          }
        }),
      )

      setStructures(structuresWithReviews)
    } catch (error) {
      console.error("Errore caricamento strutture:", error)
      alert("Errore nel caricamento delle strutture")
      setStructures([])
    } finally {
      setLoading(false)
    }
  }

  const getCaratteristiche = async () => {
    try {
      const response = await fetchCaratteristiche()

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

  const getUsers = async () => {
    try {
      const response = await fetchUsers()

      if (!response.ok) {
        throw new Error("Errore nel recupero utenti")
      }

      const data = await response.json()
      const safeUsers = Array.isArray(data) ? data : []

      setUsers(safeUsers)
      setUsersCount(safeUsers.length)
    } catch (error) {
      console.error("Errore caricamento utenti:", error)
      setUsers([])
      setUsersCount(0)
    }
  }

  const getUsersCount = async () => {
    try {
      const countResponse = await fetchUsersCount()

      if (countResponse.ok) {
        const data = await countResponse.json()
        setUsersCount(Number(data.count) || 0)
        return
      }

      const usersResponse = await fetchUsers()

      if (!usersResponse.ok) {
        throw new Error("Errore nel recupero utenti")
      }

      const usersData = await usersResponse.json()
      setUsersCount(Array.isArray(usersData) ? usersData.length : 0)
    } catch (error) {
      console.error("Errore caricamento numero utenti:", error)
      setUsersCount(0)
    }
  }

  const getSavedCount = async () => {
    try {
      const response = await fetchSavedStructures()

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
      const structuresResponse = await fetchStructuresWithFallback()

      if (!structuresResponse.ok) {
        throw new Error("Errore nel recupero strutture per recensioni")
      }

      const structuresData = await structuresResponse.json()
      const safeStructures = Array.isArray(structuresData) ? structuresData : []

      const reviewResponses = await Promise.all(
        safeStructures.map(async (structure) => {
          try {
            const response = await fetchStructureReviews(structure.idStruttura)

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
      getCaratteristiche(),
      getUsers(),
      getUsersCount(),
      getSavedCount(),
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
    users,
    savedCount,
    totalReviewsCount,
    refreshDashboardData,
  }
}

export default UseAdminDashboardData
