import React, { useState } from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import useDashboard from '../../../hooks/useDashboard';

import { FaBox, FaShoppingCart, FaUsers, FaUserTie } from 'react-icons/fa';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const filterOptions = [
  { label: 'Today', value: 'today' },
  { label: '7 Days', value: 'week' },
  { label: '30 Days', value: 'month' },
];

const MyDashboard = () => {
  usePageTitle('Admin Dashboard');
  const { adminStats, role } = useDashboard();
  const [selectedFilter, setSelectedFilter] = useState('today');

  const pieData = [
    { name: 'Users', value: adminStats?.users?.total || 0 },
    { name: 'Managers', value: adminStats?.managersActive || 0 },
    { name: 'Orders', value: adminStats?.ordersThisMonth || 0 },
  ];

  const colorSet = ['#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>

        <select
          value={selectedFilter}
          onChange={e => setSelectedFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg bg-white dark:bg-white/10 shadow"
        >
          {filterOptions.map(f => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* ADMIN CARDS */}
      {role === 'admin' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-2xl">
            <StatCard
              title="Products Today"
              value={adminStats?.productStats?.today}
              icon={<FaBox size={30} />}
              iconBg="bg-blue-500"
            />

            <StatCard
              title="Products This Week"
              value={adminStats?.productStats?.week}
              icon={<FaBox size={30} />}
              iconBg="bg-indigo-500"
            />

            <StatCard
              title="Products This Month"
              value={adminStats?.productStats?.month}
              icon={<FaBox size={30} />}
              iconBg="bg-purple-500"
            />

            <StatCard
              title="Orders This Month"
              value={adminStats?.ordersThisMonth}
              icon={<FaShoppingCart size={30} />}
              iconBg="bg-green-500"
            />

            <StatCard
              title="New Users"
              value={adminStats?.users?.new}
              icon={<FaUsers size={30} />}
              iconBg="bg-orange-500"
            />

            <StatCard
              title="Total Users"
              value={adminStats?.users?.total}
              icon={<FaUsers size={30} />}
              iconBg="bg-amber-600"
            />

            <StatCard
              title="Active Managers"
              value={adminStats?.managersActive}
              icon={<FaUserTie size={30} />}
              iconBg="bg-teal-600"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
            <ChartContainer title="Monthly Orders">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={adminStats?.monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Orders Line Trend">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={adminStats?.monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#10b981"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Users vs Managers vs Orders">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={4}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={colorSet[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, iconBg }) => (
  <div className="bg-white shadow rounded-lg p-5 border hover:shadow-md transition flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value ?? 0}</h3>
    </div>

    <div
      className={`${iconBg} text-white p-4 rounded-full shadow flex items-center justify-center`}
    >
      {icon}
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-5 rounded-lg shadow border">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default MyDashboard;
