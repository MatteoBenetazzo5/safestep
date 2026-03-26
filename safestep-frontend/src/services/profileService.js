import { API_BASE_URL, getAuthHeaders } from "../utils/api"

export const getUserById = async (idUtente) => {
  const response = await fetch(`${API_BASE_URL}/utenti/${idUtente}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Errore nel recupero utente")
  }

  return response.json()
}

export const getProfileByUserId = async (idUtente) => {
  const response = await fetch(`${API_BASE_URL}/profili/utente/${idUtente}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export const getPreferencesByUserId = async (idUtente) => {
  const response = await fetch(`${API_BASE_URL}/preferenze/utente/${idUtente}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

export const getSavedPlacesByUserId = async (idUtente) => {
  const response = await fetch(
    `${API_BASE_URL}/strutture-salvate/utente/${idUtente}`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) {
    return []
  }

  return response.json()
}

export const getCaratteristiche = async () => {
  const response = await fetch(`${API_BASE_URL}/caratteristiche`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

export const getCompleteProfileData = async (idUtente) => {
  const [
    utente,
    profilo,
    preferenze,
    savedPlaces,
    caratteristiche,
  ] = await Promise.all([
    getUserById(idUtente),
    getProfileByUserId(idUtente),
    getPreferencesByUserId(idUtente),
    getSavedPlacesByUserId(idUtente),
    getCaratteristiche(),
  ])

  return {
    utente,
    profilo,
    preferenze,
    savedPlaces,
    caratteristiche,
  }
}

export const updateUserById = async (idUtente, userData) => {
  const response = await fetch(`${API_BASE_URL}/utenti/${idUtente}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    let errorMessage = "Aggiornamento utente non riuscito"

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // messaggio di default
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

export const createProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/profili`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  })

  if (!response.ok) {
    let errorMessage = "Creazione profilo non riuscita"

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // messaggio di default
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

export const updateProfileById = async (idProfilo, profileData) => {
  const response = await fetch(`${API_BASE_URL}/profili/${idProfilo}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  })

  if (!response.ok) {
    let errorMessage = "Aggiornamento profilo non riuscito"

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // messaggio di default
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

export const createPreference = async (preferenceData) => {
  const response = await fetch(`${API_BASE_URL}/preferenze`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(preferenceData),
  })

  if (!response.ok) {
    let errorMessage = "Preferenza non aggiunta"

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // messaggio di default
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

export const deletePreferenceById = async (idPreferenza) => {
  const response = await fetch(`${API_BASE_URL}/preferenze/${idPreferenza}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    let errorMessage = "Eliminazione preferenza non riuscita"

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // messaggio di default
    }

    throw new Error(errorMessage)
  }

  return true
}

export const removeSavedPlaceByUserAndStructure = async (
  idUtente,
  idStruttura,
) => {
  const response = await fetch(
    `${API_BASE_URL}/strutture-salvate/utente/${idUtente}/struttura/${idStruttura}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) {
    let errorMessage = "Rimozione dai preferiti non riuscita"

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // messaggio di default
    }

    throw new Error(errorMessage)
  }

  return true
}