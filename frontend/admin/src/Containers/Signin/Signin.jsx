import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Diseño/Layout";
import Input from "../../components/UI/Input/Input";


const Signin = () => {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Input
                label="Correo"
                placeholder="Correo"
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                label="Contraseña"
                placeholder="Contraseña"
                value=""
                type="password"
                onChange={() => {}}
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
