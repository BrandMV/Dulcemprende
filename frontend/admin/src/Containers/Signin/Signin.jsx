import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Diseño/Layout";
import Input from "../../components/UI/Input/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const userLogin = (e) => {

    e.preventDefault()

    const user = {
      email, password
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
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Contraseña"
                placeholder="Contraseña"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
