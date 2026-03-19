import { useEffect, useMemo, useRef, useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import "../styles/components/NavigationBar.css"
import logo from "../assets/logos/SAFESTEP_LOGO.png"
import { API_BASE_URL, getAuthHeaders } from "../utils/api"

import {
  getAvatar,
  getNomeVisualizzato,
  getRuolo,
  isLoggedIn,
  logout,
} from "../utils/auth"

function NavigationBar() {
  const navigate = useNavigate()

  const logged = isLoggedIn()
  const avatar = getAvatar()
  const nomeVisualizzato = getNomeVisualizzato() || "U"
  const ruolo = getRuolo()

  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  const [searchTerm, setSearchTerm] = useState("")
  const [termeList, setTermeList] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const searchRef = useRef(null)

  useEffect(() => {
    const fetchTerme = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/strutture/categoria/TERME`,
          {
            headers: getAuthHeaders(),
          },
        )

        if (!response.ok) {
          throw new Error("Errore nel recupero delle terme")
        }

        const data = await response.json()
        setTermeList(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Errore caricamento ricerca navbar:", error)
        setTermeList([])
      }
    }

    fetchTerme()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const risultatiRicerca = useMemo(() => {
    if (!searchTerm.trim()) return []

    const testoRicerca = searchTerm.toLowerCase()

    return termeList
      .filter((terma) => {
        if (!terma) return false

        const nome = terma.nome?.toLowerCase() || ""
        const citta = terma.citta?.toLowerCase() || ""
        const descrizione = terma.descrizione?.toLowerCase() || ""

        return (
          nome.includes(testoRicerca) ||
          citta.includes(testoRicerca) ||
          descrizione.includes(testoRicerca)
        )
      })
      .slice(0, 6)
  }, [searchTerm, termeList])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleResultClick = (idStruttura) => {
    setShowSearchResults(false)
    setSearchTerm("")
    navigate(`/struttura/${idStruttura}`)
  }

  const handleSearchFocus = () => {
    if (searchTerm.trim()) {
      setShowSearchResults(true)
    }
  }

  const profileRoute = ruolo === "ADMIN" ? "/admin" : "/profilo"

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
              </Nav>

              <div className="navbar-right">
                <div className="navbar-search" ref={searchRef}>
                  <i className="bi bi-search"></i>
                  <input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowSearchResults(true)
                    }}
                    onFocus={handleSearchFocus}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && risultatiRicerca.length > 0) {
                        handleResultClick(risultatiRicerca[0].idStruttura)
                      }
                    }}
                  />

                  {showSearchResults && searchTerm.trim() && (
                    <div className="navbar-search-dropdown">
                      {risultatiRicerca.length > 0 ? (
                        risultatiRicerca.map((terma) => (
                          <button
                            key={terma.idStruttura}
                            type="button"
                            className="navbar-search-result"
                            onClick={() => handleResultClick(terma.idStruttura)}
                          >
                            <img
                              src={
                                terma.immagineCopertina ||
                                "https://via.placeholder.com/120x80?text=SafeStep"
                              }
                              alt={terma.nome || "Struttura"}
                              className="navbar-search-result-image"
                            />

                            <div className="navbar-search-result-body">
                              <h6>{terma.nome || "Nome non disponibile"}</h6>
                              <p>{terma.citta || "Città non disponibile"}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="navbar-search-empty">
                          Nessuna terme trovata
                        </div>
                      )}
                    </div>
                  )}
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
                      to={profileRoute}
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
