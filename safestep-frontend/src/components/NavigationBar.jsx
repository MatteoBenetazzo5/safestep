import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

function NavigationBar() {
  return (
    <Navbar expand="lg" className="safestep-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          SafeStep
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/terme">
              Terme
            </Nav.Link>

            <Nav.Link as={NavLink} to="/parchi">
              Parchi
            </Nav.Link>

            <Nav.Link as={NavLink} to="/ristoranti">
              Ristoranti
            </Nav.Link>

            <Nav.Link as={NavLink} to="/hotel">
              Hotel
            </Nav.Link>

            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>

            <Nav.Link as={NavLink} to="/profilo">
              Profilo
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
