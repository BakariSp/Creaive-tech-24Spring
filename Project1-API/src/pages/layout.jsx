import React from 'react';
// import Navbar from './Navbar'; // If you have a navbar component

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
