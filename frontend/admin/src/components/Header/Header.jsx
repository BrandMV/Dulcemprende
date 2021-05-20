import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { signout } from "../../actions";

const Header = () => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav style={{ marginLeft: "35rem" }}>
        <li className="nav-item">
          <span className="nav-link" onClick={logout} >Cerrar Sesión</span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () =>{
    return(
      <Nav style={{ marginLeft: "35rem" }}>
      {/* <Nav.Link href="#deets">Inciar Sesión</Nav.Link> */}
      <li className="nav-item">
        <NavLink to="signup" className="nav-link">
          Registrate
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="signin" className="nav-link">
          Iniciar Sesión
        </NavLink>
      </li>
    </Nav>
    )
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Panel de Administrador</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Panel de Administrador
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
  
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
