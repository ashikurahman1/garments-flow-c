import React from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import useDashboard from '../../../hooks/useDashboard';

const MyDashboard = () => {
  usePageTitle('Dashboard');

  const { role, adminStats, managerStats, buyerStats } = useDashboard();
  // console.log(role);

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-2xl font-semibold">Welcome Back</h2>

      {/* ADMIN DASHBOARD */}
      {role === 'admin' && (
        <div className="grid grid-cols-3 gap-5">
          <Card title="Total Orders" value={adminStats.totalOrders} />
          <Card title="Total Products" value={adminStats.totalProducts} />
          <Card title="Total Users" value={adminStats.totalUsers} />

          {/* Recharts section */}
          <div className="col-span-3 bg-white shadow p-5 rounded-lg">
            Admin Order Statistics Chart Here
          </div>
        </div>
      )}

      {/* MANAGER DASHBOARD */}
      {role === 'manager' && (
        <div className="grid grid-cols-2 gap-5">
          <Card title="Pending Orders" value={managerStats.pendingOrders} />
          <Card title="Approved Orders" value={managerStats.approvedOrders} />
        </div>
      )}

      {/* BUYER DASHBOARD */}
      {role === 'buyer' && (
        <div className="grid grid-cols-2 gap-5">
          <Card
            title="All Products"
            value="See Products"
            onClick={() => (window.location.href = '/all-products')}
          />
          <Card title="Total My Orders" value={buyerStats.orderCount} />
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value, onClick }) => (
  <div
    className="bg-white shadow p-6 rounded-lg cursor-pointer"
    onClick={onClick}
  >
    <p className="text-lg font-semibold">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

export default MyDashboard;
