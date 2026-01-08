import React, { useState } from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import useDashboard from '../../../hooks/useDashboard';
import { motion } from 'framer-motion';

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaCheckCircle,
} from 'react-icons/fa';

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
  { label: 'All Time', value: 'all' },
];

const MyDashboard = () => {
  usePageTitle('Dashboard');

  const { role, adminStats, managerStats, buyerStats } = useDashboard();
  const [selectedFilter, setSelectedFilter] = useState('today');

  // Premium colors
  const chartColors = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'];
  const textColor = '#64748b'; // muted foreground

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-3xl font-display font-bold text-gradient"
           >
             Analytics Overview
           </motion.h2>
           <p className="text-muted-foreground mt-1">
             Track your key performance metrics and business growth.
           </p>
        </div>
        
        <div className="flex bg-card border border-border rounded-lg p-1">
          {filterOptions.map(f => (
             <button
                key={f.value}
                onClick={() => setSelectedFilter(f.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                   selectedFilter === f.value 
                   ? 'bg-primary text-primary-foreground shadow-md' 
                   : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
             >
                {f.label}
             </button>
          ))}
        </div>
      </div>

      {/* ------------------ ADMIN DASHBOARD ------------------ */}
      {role === 'admin' && adminStats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Admin Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Products Today"
              value={adminStats?.productStats?.today}
              icon={<FaBox className="text-blue-500" size={24} />}
              trend="+12%"
              trendUp={true}
            />
            <StatCard
              title="Products This Week"
              value={adminStats?.productStats?.week}
              icon={<FaBox className="text-indigo-500" size={24} />}
              trend="+5%"
              trendUp={true}
            />
            <StatCard
              title="Products This Month"
              value={adminStats?.productStats?.month}
              icon={<FaBox className="text-purple-500" size={24} />}
              trend="-2%"
              trendUp={false}
            />
            <StatCard
              title="Orders This Month"
              value={adminStats?.ordersThisMonth}
              icon={<FaShoppingCart className="text-green-500" size={24} />}
              trend="+18%"
              trendUp={true}
            />
            <StatCard
              title="New Users"
              value={adminStats?.users?.new}
              icon={<FaUsers className="text-orange-500" size={24} />}
            />
            <StatCard
              title="Total Users"
              value={adminStats?.users?.total}
              icon={<FaUsers className="text-amber-600" size={24} />}
            />
            <StatCard
              title="Active Managers"
              value={adminStats?.managersActive}
              icon={<FaUserTie className="text-teal-600" size={24} />}
            />
          </div>

          {/* Admin Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Monthly Orders">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={adminStats?.monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="orders" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Growth Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={adminStats?.monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Platform Distribution">
              <div className="flex items-center justify-center h-[300px]">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                    <Pie
                        data={[
                        { name: 'Users', value: adminStats?.users?.total || 0 },
                        { name: 'Managers', value: adminStats?.managersActive || 0 },
                        { name: 'Orders', value: adminStats?.ordersThisMonth || 0 },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                    >
                        {Array.from({ length: 3 }).map((_, index) => (
                        <Cell key={index} fill={chartColors[index]} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none' }} />
                    </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </div>
        </motion.div>
      )}

      {/* ------------------ MANAGER DASHBOARD ------------------ */}
      {role === 'manager' && managerStats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Manager Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Pending Orders"
              value={managerStats?.pendingOrders}
              icon={<FaClipboardList className="text-amber-500" size={30} />}
            />
            <StatCard
              title="Approved Orders"
              value={managerStats?.approvedOrders}
              icon={<FaCheckCircle className="text-green-500" size={30} />}
            />
             <StatCard
              title="Total Products"
              value={managerStats?.totalProducts || 12} 
              icon={<FaBox className="text-blue-500" size={30} />}
            />
          </div>

          {/* Manager Pie Chart */}
          <ChartContainer title="Order Status Distribution">
            <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={[
                        {
                        name: 'Pending',
                        value: managerStats?.pendingOrders || 0,
                        },
                        {
                        name: 'Approved',
                        value: managerStats?.approvedOrders || 0,
                        },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={70}
                    paddingAngle={5}
                    label
                    >
                    <Cell fill="#f59e0b" stroke="none" />
                    <Cell fill="#10b981" stroke="none" />
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none' }} />
                </PieChart>
                </ResponsiveContainer>
            </div>
          </ChartContainer>
        </motion.div>
      )}

      {/* ----------------- BUYER DASHBOARD */}
      {role === 'buyer' && buyerStats && (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
            title="Total Orders"
            value={buyerStats?.orderCount}
            icon={<FaClipboardList className="text-primary" size={30} />}
            />
            <div className="glass-card p-6 flex items-center justify-center text-muted-foreground flex-col gap-2">
                <FaShoppingCart size={40} className="opacity-20" />
                <p>Start shopping to see more stats!</p>
            </div>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, trendUp }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150 origin-top-right">
        {icon}
    </div>
    
    <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-background/50 rounded-xl shadow-sm border border-white/20">
            {icon}
        </div>
        {trend && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {trend}
            </span>
        )}
    </div>
    
    <div>
      <h3 className="text-4xl font-bold font-display text-foreground tracking-tight">
        {value ?? 0}
      </h3>
      <p className="text-sm font-medium text-muted-foreground mt-1">{title}</p>
    </div>
  </motion.div>
);

const ChartContainer = ({ title, children }) => (
  <div className="glass-card p-6 flex flex-col h-full">
    <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-display text-foreground">{title}</h3>
        <button className="text-xs text-primary hover:underline">View Details</button>
    </div>
    <div className="flex-1 min-h-[100px]">
        {children}
    </div>
  </div>
);

export default MyDashboard;
