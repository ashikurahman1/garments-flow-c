import React from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import useDashboard from '../../../hooks/useDashboard';
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
} from 'react-icons/fa';
const MyDashboard = () => {
  usePageTitle('Dashboard');

  const { role, adminStats, managerStats, buyerStats } = useDashboard();
  // console.log(buyerStats);

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center  gap-5">
          <Card
            title="All Products"
            value="See Products"
            onClick={() => (window.location.href = '/all-products')}
            bgColor="bg-yellow-100"
            icon={<FaBox />}
            iconBg="bg-yellow-500"
          />
          <Card
            title="Total My Orders"
            value={buyerStats.orderCount || 0}
            bgColor="bg-indigo-100"
            icon={<FaShoppingCart />}
            iconBg="bg-indigo-500"
          />
        </div>
      )}
    </div>
  );
};

const Card = ({
  title,
  value,
  onClick,
  bgColor = 'bg-white',
  icon,
  iconBg = 'bg-gray-300',
}) => (
  <div
    className={`${bgColor} shadow p-6 rounded-lg cursor-pointer flex items-center gap-4`}
    onClick={onClick}
  >
    {icon && (
      <div
        className={`${iconBg} p-3 rounded-full text-white dark:text-black text-xl flex items-center justify-center`}
      >
        {icon}
      </div>
    )}
    <div className="dark:text-black">
      <p className="text-lg font-semibold">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  </div>
);

export default MyDashboard;
