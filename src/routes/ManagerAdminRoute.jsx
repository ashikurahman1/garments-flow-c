import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import Forbidden from '../components/Forbidden/Forbidden';

const ManagerAdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading)
    return <span className="loading loading-bars"></span>;

  if (role !== 'manager' && role !== 'admin') {
    return <Forbidden />;
  }

  return children;
};

export default ManagerAdminRoute;
