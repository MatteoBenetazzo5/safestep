import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import "../styles/components/NavigationBar.css"
import logo from "../assets/logos/SAFESTEP_LOGO.png"
import {
  getAvatar,
  getNomeVisualizzato,
  isLoggedIn,
  logout,
} from "../utils/auth"

function NavigationBar() {
  const navigate = useNavigate()

  const logged = isLoggedIn()
  const avatar = getAvatar()
  const nomeVisualizzato = getNomeVisualizzato() || "U"
  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="navbar-overlay-wrapper">
      <Container className="navbar-overlay-container">
        <NavLink to="/" className="navbar-logo-side">
          <img src={logo} alt="SafeStep logo" />
        </NavLink>

        <div className="navbar-pill">
          <Navbar expand="lg" className="safestep-navbar">
            <Navbar.Toggle aria-controls="main-navbar" />

            <Navbar.Collapse id="main-navbar">
              <Nav className="navbar-menu">
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>

                <NavDropdown title="Esplora" id="explora-dropdown">
                  <NavDropdown.Item as={NavLink} to="/terme">
                    Terme
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/ristoranti">
                    Ristoranti
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/hotel">
                    Hotel
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/parchi">
                    Parchi
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={NavLink} to="/profilo">
                  Preferiti
                </Nav.Link>

                <Nav.Link as={NavLink} to="/admin">
                  Menu
                </Nav.Link>
              </Nav>

              <div className="navbar-right">
                <div className="navbar-search">
                  <i className="bi bi-search"></i>
                  <input placeholder="Search" />
                </div>

                {logged ? (
                  <div className="navbar-user-actions">
                    <button
                      className="navbar-logout-button"
                      onClick={handleLogout}
                    >
                      Esci
                    </button>

                    <NavLink
                      to="/profilo"
                      className="navbar-profile avatar-profile"
                    >
                      {avatar ? (
                        <img
                          src={avatar}
                          alt={nomeVisualizzato}
                          className="navbar-avatar-image"
                        />
                      ) : (
                        <span className="navbar-avatar-fallback">
                          {initial}
                        </span>
                      )}
                    </NavLink>
                  </div>
                ) : (
                  <NavLink to="/login" className="navbar-profile">
                    <i className="bi bi-person-fill"></i>
                  </NavLink>
                )}
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Container>
    </div>
  )
}

export default NavigationBar
