import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <p>I am Root </p>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
