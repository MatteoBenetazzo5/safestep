import "../styles/pages/Login.css"
import logoSafeStep from "../assets/logos/SAFESTEP_LOGO.png"
import backgroundImage from "../assets/images/bg-login.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()

  const [nomeVisualizzato, setNomeVisualizzato] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telefono, setTelefono] = useState("")
  const [avatar, setAvatar] = useState("")

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeVisualizzato: nomeVisualizzato,
          email: email,
          password: password,
          telefono: telefono,
          avatar: avatar,
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
      console.error("Errore durante la registrazione:", error)
      alert("Errore durante la registrazione")
    }
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-overlay">
        <div className="login-topbar">
          <button
            className="login-top-button"
            onClick={() => navigate("/login")}
          >
            Torna al login <i className="bi bi-chevron-left ms-2"></i>
          </button>
        </div>

        <div className="login-container">
          <div className="login-logo">
            <img src={logoSafeStep} alt="SafeStep logo" />
          </div>

          <div className="login-title">
            <h1>Crea il tuo account</h1>
            <p>Registrati per entrare nella community di SafeStep.</p>
          </div>

          <div className="login-cards">
            <div
              className="login-card access-card"
              style={{ maxWidth: "520px", width: "100%" }}
            >
              <div className="login-icon-circle login-icon-circle-blue">
                <i className="bi bi-person-plus-fill"></i>
              </div>

              <h2>Registrazione</h2>
              <p>Compila i campi per creare un nuovo account.</p>

              <div className="login-input-wrapper">
                <i className="bi bi-person-fill"></i>
                <input
                  type="text"
                  placeholder="Nome visualizzato"
                  value={nomeVisualizzato}
                  onChange={(e) => setNomeVisualizzato(e.target.value)}
                />
              </div>

              <div className="login-input-wrapper">
                <i className="bi bi-envelope-fill"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="login-input-wrapper">
                <i className="bi bi-telephone-fill"></i>
                <input
                  type="text"
                  placeholder="Telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="login-input-wrapper">
                <i className="bi bi-image-fill"></i>
                <input
                  type="text"
                  placeholder="Avatar URL (facoltativo)"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>

              <button className="login-button" onClick={handleRegister}>
                Registrati
              </button>

              <div
                className="register-link"
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Hai già un account? Vai al login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
