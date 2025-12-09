import React from 'react';
import usePageTitle from '../../../hooks/usePageTitle';

const MyDashboard = () => {
  usePageTitle('Dashboard ');
  return (
    <div>
      <h2>Welcome Back Mr. Ashikur</h2>
    </div>
  );
};

export default MyDashboard;
