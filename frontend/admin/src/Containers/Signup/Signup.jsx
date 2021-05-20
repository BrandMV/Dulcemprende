import React, { useState } from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../actions'

const Signup = () => {

  

  const auth = useSelector(state => state.auth)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [contra, setContra] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const userSignup = (e) =>{
    e.preventDefault()
    const user = {
      nombre, apellido, correo, contra
    }

    dispatch(signup(user))
  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }

  if(user.loading){
    return <p>Loading...</p>
  }


  return (
    <Layout>
      <Container>
        { user.message }
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="Nombre"
                    placeholder="Nombre"
                    value={nombre}
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Apellidos"
                    placeholder="Apellidos"
                    value={apellido}
                    type="text"
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </Col>
              </Row>
              <Form.Group>
                <Input
                  label="Correo"
                  placeholder="Correo"
                  value={correo}
                  type="email"
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Input
                  label="Contraseña"
                  placeholder="Contraseña"
                  value={contra}
                  type="password"
                  onChange={(e) => setContra(e.target.value)}
                />
              </Form.Group>
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

export default Signup;
