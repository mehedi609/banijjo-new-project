import React from 'react';
import Footer from './footer';
import Header from './header';

const BaseLayout = ({ children, cartProductsInfo = [] }) => {
  return (
    <>
      <Header cartProductsInfo={cartProductsInfo} />

      {children}

      <Footer />
    </>
  );
};

export default BaseLayout;
