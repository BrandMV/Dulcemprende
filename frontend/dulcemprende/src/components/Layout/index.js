import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header';
import MenuHeader from '../MenuHeader';

const Layout = (props) => {
  return(
    <>
        <Header />
        <MenuHeader />
        {props.children}
        <Footer />
    </>
   )

 }

export default Layout