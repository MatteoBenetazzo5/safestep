import { getToken } from "./auth"

export const API_BASE_URL = "http://localhost:3001"

export const getAuthHeaders = () => {
  const token = getToken()

  if (!token) {
    return {
      "Content-Type": "application/json",
    }
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}