import "../styles/pages/Login.css"
import logoSafeStep from "../assets/logos/SAFESTEP_LOGO.png"
import backgroundImage from "../assets/images/bg-login.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../utils/api"
import { saveAuthData } from "../utils/auth"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok) {
        alert("Credenziali non valide")
        return
      }

      const data = await response.json()

      saveAuthData(data)

      if (data.ruolo === "ADMIN") {
        navigate("/admin")
      } else {
        navigate("/profilo")
      }
    } catch (error) {
      console.error("Errore login:", error)
      alert("Errore durante il login")
    }
  }

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-overlay">
        <div className="login-container">
          <div className="login-logo">
            <img src={logoSafeStep} alt="SafeStep logo" />
          </div>

          <div className="login-title">
            <h1>Benvenuto su SafeStep!</h1>
            <p>
              Per continuare, effettua il login oppure{" "}
              <strong>registrati</strong>.
            </p>
          </div>

          <div className="login-cards">
            <div className="login-card register-card">
              <div className="login-icon-circle">
                <i className="bi bi-person"></i>
              </div>

              <h2>Registrati</h2>
              <p>Crea un nuovo account.</p>

              <button
                className="login-button"
                onClick={() => navigate("/register")}
              >
                Registrati
              </button>
            </div>

            <div className="login-card access-card">
              <div className="login-icon-circle login-icon-circle-blue">
                <i className="bi bi-key-fill"></i>
              </div>

              <h2>Login</h2>
              <p>Accedi al tuo account.</p>

              <div className="login-input-wrapper">
                <i className="bi bi-envelope"></i>
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

              <div className="forgot-password">Password dimenticata?</div>

              <button className="login-button" onClick={handleLogin}>
                Login
              </button>

              <div
                className="register-link"
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer" }}
              >
                Non hai un account? Registrati!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
