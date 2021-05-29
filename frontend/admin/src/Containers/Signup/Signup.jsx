import React, { useState, useEffect } from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../actions'
const Signup = () => {

  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) =>{
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      email,
      password,
    };

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
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Apellidos"
                    placeholder="Apellidos"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Form.Group>
                <Input
                  label="Correo"
                  placeholder="Correo"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Input
                  label="Contraseña"
                  placeholder="Contraseña"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
