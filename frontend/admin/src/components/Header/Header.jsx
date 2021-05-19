import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">Panel de Administrador</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">Panel de Administrador</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav style={{marginLeft: "35rem"}}>
            {/* <Nav.Link href="#deets">Inciar Sesión</Nav.Link> */}
            <li className="nav-item">
              <NavLink to="signup" className="nav-link">Registro de Administrador</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="signin" className="nav-link">
                Iniciar Sesión
              </NavLink>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
