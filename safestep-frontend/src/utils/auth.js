export const saveAuthData = (data) => {
  localStorage.setItem("token", data.accessToken)
  localStorage.setItem("idUtente", data.idUtente)
  localStorage.setItem("email", data.email)
  localStorage.setItem("nomeVisualizzato", data.nomeVisualizzato)
  localStorage.setItem("ruolo", data.ruolo)
  localStorage.setItem("avatar", data.avatar || "")
}

export const getToken = () => {
  return localStorage.getItem("token")
}

export const getIdUtente = () => {
  return localStorage.getItem("idUtente")
}

export const getRuolo = () => {
  return localStorage.getItem("ruolo")
}

export const getNomeVisualizzato = () => {
  return localStorage.getItem("nomeVisualizzato")
}

export const getEmail = () => {
  return localStorage.getItem("email")
}

export const getAvatar = () => {
  return localStorage.getItem("avatar")
}

export const isLoggedIn = () => {
  return !!localStorage.getItem("token")
}

export const isAdmin = () => {
  return localStorage.getItem("ruolo") === "ADMIN"
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("idUtente")
  localStorage.removeItem("email")
  localStorage.removeItem("nomeVisualizzato")
  localStorage.removeItem("ruolo")
  localStorage.removeItem("avatar")
}