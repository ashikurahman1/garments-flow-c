import React from 'react';

const RootLayouts = () => {
  return (
    <>
      <p>I am Root </p>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayouts;
