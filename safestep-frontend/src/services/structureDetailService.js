import { API_BASE_URL, getAuthHeaders } from "../utils/api"

export const getStructureById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/strutture/${id}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Errore nel caricamento della struttura")
  }

  return response.json()
}

export const getStructureImages = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/immagini-struttura/struttura/${id}`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) return []
  return response.json()
}

export const getStructureReviews = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/recensioni/struttura/${id}`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) return []
  return response.json()
}

export const getStructureAccessibilita = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/accessibilita/struttura/${id}`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) return []
  return response.json()
}

export const getSavedStructuresByUser = async (idUtente) => {
  const response = await fetch(
    `${API_BASE_URL}/strutture-salvate/utente/${idUtente}`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) return []
  return response.json()
}

export const getCompleteStructureDetails = async (id, idUtente) => {
  const requests = [
    getStructureById(id),
    getStructureImages(id),
    getStructureReviews(id),
    getStructureAccessibilita(id),
  ]

  if (idUtente) {
    requests.push(getSavedStructuresByUser(idUtente))
  }

  const results = await Promise.all(requests)

  return {
    struttura: results[0],
    immagini: results[1],
    recensioni: results[2],
    accessibilita: results[3],
    salvate: results[4] || [],
  }
}

export const addToFavorites = async (idUtente, idStruttura) => {
  const response = await fetch(`${API_BASE_URL}/strutture-salvate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      utenteId: idUtente,
      strutturaId: idStruttura,
    }),
  })

  if (!response.ok) {
    throw new Error("Errore nel salvataggio della struttura")
  }

  return true
}

export const removeFromFavorites = async (idUtente, idStruttura) => {
  const response = await fetch(
    `${API_BASE_URL}/strutture-salvate/utente/${idUtente}/struttura/${idStruttura}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) {
    throw new Error("Errore nella rimozione dai preferiti")
  }

  return true
}

export const createReview = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/recensioni`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reviewData),
  })

  if (!response.ok) {
    throw new Error("Recensione non inviata")
  }

  return true
}