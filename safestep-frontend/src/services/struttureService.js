import { API_BASE_URL, getAuthHeaders } from "../utils/api"

export const getStruttureByCategoria = async (categoria) => {
  const response = await fetch(
    `${API_BASE_URL}/strutture/categoria/${categoria}`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) {
    throw new Error(`Errore nel recupero delle strutture ${categoria}`)
  }

  const data = await response.json()
  return Array.isArray(data) ? data : []
}