import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import "../styles/components/NavigationBar.css"
import logo from "../assets/logos/SAFESTEP_LOGO.png"

function NavigationBar() {
  return (
    <Navbar expand="lg" className="safestep-navbar">
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
          <img src={logo} alt="SafeStep logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* MENU */}
          <Nav className="mx-auto navbar-menu">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/terme">
              Esplora
            </Nav.Link>

            <Nav.Link as={NavLink} to="/preferiti">
              Preferiti
            </Nav.Link>

            <Nav.Link as={NavLink} to="/menu">
              Menu
            </Nav.Link>
          </Nav>

          {/* SEARCH + PROFILO */}
          <div className="navbar-right">
            <div className="navbar-search">
              <i className="bi bi-search"></i>
              <input placeholder="Search" />
            </div>

            <NavLink to="/login" className="navbar-profile">
              <i className="bi bi-person-fill"></i>
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
