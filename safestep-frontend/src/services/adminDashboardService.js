import { API_BASE_URL, getAuthHeaders } from "../utils/api"

export const registerAdminUser = async (userFormData) => {
  return fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeVisualizzato: userFormData.nomeVisualizzato.trim(),
      email: userFormData.email.trim(),
      password: userFormData.password,
      telefono: userFormData.telefono.trim(),
      avatar: userFormData.avatar.trim(),
    }),
  })
}

export const fetchStructuresWithFallback = async () => {
  let response = await fetch(`${API_BASE_URL}/strutture`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    response = await fetch(`${API_BASE_URL}/strutture/categoria/TERME`, {
      headers: getAuthHeaders(),
    })
  }

  return response
}

export const fetchStructureReviews = async (idStruttura) => {
  return fetch(`${API_BASE_URL}/recensioni/struttura/${idStruttura}`, {
    headers: getAuthHeaders(),
  })
}

export const fetchStructureAccessibilita = async (idStruttura) => {
  return fetch(`${API_BASE_URL}/accessibilita/struttura/${idStruttura}`, {
    headers: getAuthHeaders(),
  })
}

export const fetchCaratteristiche = async () => {
  return fetch(`${API_BASE_URL}/caratteristiche`, {
    headers: getAuthHeaders(),
  })
}

export const fetchUsers = async () => {
  return fetch(`${API_BASE_URL}/utenti`, {
    headers: getAuthHeaders(),
  })
}

export const fetchUsersCount = async () => {
  return fetch(`${API_BASE_URL}/utenti/count`, {
    headers: getAuthHeaders(),
  })
}

export const fetchSavedStructures = async () => {
  return fetch(`${API_BASE_URL}/strutture-salvate`, {
    headers: getAuthHeaders(),
  })
}

export const uploadStructureImage = async (image) => {
  const data = new FormData()
  data.append("file", image)

  return fetch(`${API_BASE_URL}/upload/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  })
}

export const deleteAccessibilita = async (accessibilitaId) => {
  return fetch(`${API_BASE_URL}/accessibilita/${accessibilitaId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
}

export const updateAccessibilita = async (idAccessibilita, body) => {
  return fetch(`${API_BASE_URL}/accessibilita/${idAccessibilita}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
}

export const createAccessibilita = async (body) => {
  return fetch(`${API_BASE_URL}/accessibilita`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
}

export const createStructure = async (body) => {
  return fetch(`${API_BASE_URL}/strutture`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
}

export const updateStructure = async (editingId, body) => {
  return fetch(`${API_BASE_URL}/strutture/${editingId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
}

export const createStructureImage = async (body) => {
  return fetch(`${API_BASE_URL}/immagini-struttura`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
}

export const fetchAccessibilitaByStruttura = async (idStruttura) => {
  return fetch(`${API_BASE_URL}/accessibilita/struttura/${idStruttura}`, {
    headers: getAuthHeaders(),
  })
}

export const deleteStructure = async (idStruttura) => {
  return fetch(`${API_BASE_URL}/strutture/${idStruttura}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
}