import { API_BASE_URL } from "../utils/api"

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error("Credenziali non valide")
  }

  const data = await response.json()
  return data
}

export const registerUser = async ({
  nomeVisualizzato,
  email,
  password,
  telefono,
  avatar,
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeVisualizzato,
      email,
      password,
      telefono,
      avatar,
    }),
  })

  if (!response.ok) {
    let errorMessage = "Registrazione non riuscita"

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

  const data = await response.json()
  return data
}