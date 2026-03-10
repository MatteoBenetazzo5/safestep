import "../styles/pages/Login.css"
import logoSafeStep from "../assets/logos/SAFESTEP_LOGO.png"
import backgroundImage from "../assets/images/bg-login.jpg"

function Login() {
  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-overlay">
        <div className="login-topbar">
          <button className="login-top-button">
            Accedi <i className="bi bi-chevron-down ms-2"></i>
          </button>
        </div>

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
            {/* REGISTRAZIONE */}
            <div className="login-card register-card">
              <div className="login-icon-circle">
                <i className="bi bi-person"></i>
              </div>

              <h2>Registrati</h2>
              <p>Crea un nuovo account.</p>

              <button className="login-button">Registrati</button>
            </div>

            {/* LOGIN */}
            <div className="login-card access-card">
              <div className="login-icon-circle login-icon-circle-blue">
                <i className="bi bi-key-fill"></i>
              </div>

              <h2>Login</h2>
              <p>Accedi al tuo account.</p>

              <div className="login-input-wrapper">
                <i className="bi bi-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>

              <div className="login-input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input type="password" placeholder="Password" />
              </div>

              <div className="forgot-password">Password dimenticata?</div>

              <button className="login-button">Login</button>

              <div className="register-link">
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
