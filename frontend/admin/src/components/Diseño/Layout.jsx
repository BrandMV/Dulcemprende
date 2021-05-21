import React from "react";
import Header from "../Header/Header";
import { Container, Row, Col, } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import './style.css'

const Layout = ({ children, sidebar }) => {
  return (
    <>
      <Header />
      {
        sidebar ?
        <Container fluid>
        <Row>
              <Col md={2} className="sidebar" >
                  <ul>
                      <li><NavLink exact to={`/`}>Inicio</NavLink></li>
                      <li><NavLink to={`/category`}>Categoria</NavLink></li>
                      <li><NavLink to={`/products`}>Productos</NavLink></li>
                      <li><NavLink to={`/orders`}>Ordenes</NavLink></li>
                  </ul>
              </Col>
              <Col md={10}  style={{marginLeft: 'auto', paddingTop: '60px'}}>
                {children}
              </Col>
          </Row>
        </Container>
        :
        children
      }
      
    </>
  );
};

export default Layout;
