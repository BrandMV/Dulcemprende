import React from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";

const Signup = () => {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label="Nombre"
                    placeholder="Nombre"
                    value=""
                    type="text"
                    onChange={() => {}}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Apellidos"
                    placeholder="Apellidos"
                    value=""
                    type="text"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Form.Group>
                <Input
                  label="Correo"
                  placeholder="Correo"
                  value=""
                  type="email"
                  onChange={() => {}}
                />
              </Form.Group>

              <Form.Group>
                <Input
                  label="Contraseña"
                  placeholder="Contraseña"
                  value=""
                  type="password"
                  onChange={() => {}}
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
