import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
