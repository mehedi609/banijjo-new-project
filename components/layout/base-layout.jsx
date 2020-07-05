import React from 'react';
import Footer from './footer';
import Header from './header';
import { Head } from 'next/document';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};

export default BaseLayout;
