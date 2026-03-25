import "../styles/pages/Register.css"
import backgroundImage from "../assets/images/bg-login.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../utils/api"

function Register() {
  const navigate = useNavigate()

  const [nomeVisualizzato, setNomeVisualizzato] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telefono, setTelefono] = useState("")
  const [avatar, setAvatar] = useState("")

  const handleRegister = async () => {
    try {
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
        const errorText = await response.text()
        console.error("Errore registrazione:", errorText)
        alert("Registrazione non riuscita")
        return
      }

      alert("Registrazione completata con successo!")
      navigate("/login")
    } catch (error) {
      console.error("Errore registrazione:", error)
      alert("Errore durante la registrazione")
    }
  }

  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="register-overlay">
        <div className="register-container">
          <div className="register-top-row">
            <button
              className="register-back-button"
              onClick={() => navigate("/login")}
            >
              <i className="bi bi-chevron-left"></i>
              Torna al login
            </button>
          </div>

          <div className="register-title">
            <h1>Crea il tuo account</h1>
            <p>Registrati per entrare nella community di SafeStep.</p>
          </div>

          <div className="register-card">
            <div className="register-icon-circle">
              <i className="bi bi-person-plus-fill"></i>
            </div>

            <h2>Registrazione</h2>
            <p>Compila i campi per creare un nuovo account.</p>

            <div className="register-input-wrapper">
              <i className="bi bi-person-fill"></i>
              <input
                type="text"
                placeholder="Nome visualizzato"
                value={nomeVisualizzato}
                onChange={(e) => setNomeVisualizzato(e.target.value)}
              />
            </div>

            <div className="register-input-wrapper">
              <i className="bi bi-envelope-fill"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="register-input-wrapper">
              <i className="bi bi-lock-fill"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="register-input-wrapper">
              <i className="bi bi-telephone-fill"></i>
              <input
                type="text"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="register-input-wrapper">
              <i className="bi bi-image-fill"></i>
              <input
                type="text"
                placeholder="Avatar URL (facoltativo)"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>

            <button className="register-button" onClick={handleRegister}>
              Registrati
            </button>

            <div
              className="register-login-link"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Hai già un account? Vai al login
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
