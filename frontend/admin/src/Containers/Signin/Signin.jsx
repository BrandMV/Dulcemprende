import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Diseño/Layout";
import Input from "../../components/UI/Input/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [correo, setCorreo] = useState('')
  const [contra, setContra] = useState('')
  const [error, setError] = useState('')
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const userLogin = (e) => {

    e.preventDefault()

    const user = {
      correo, contra
    }

    dispatch(login(user))

  };

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Correo"
                placeholder="Correo"
                value={correo}
                type="email"
                onChange={(e) => setCorreo(e.target.value)}
              />

              <Input
                label="Contraseña"
                placeholder="Contraseña"
                value={contra}
                type="password"
                onChange={(e) => setContra(e.target.value)}
              />
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
