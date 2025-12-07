import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay,
} from '@/components/ui/drawer';
import {
  IconUsers,
  IconBox,
  IconClipboardList,
  IconMenu2,
  IconLogout,
  IconPlus,
  IconUserCircle,
  IconClock,
  IconClipboardCheck,
  IconHome,
  IconShoppingBag,
  IconTruckDelivery,
} from '@tabler/icons-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    {
      name: 'Manage Users',
      path: '/dashboard/manage-users',
      icon: <IconUsers size={20} />,
    },
    {
      name: 'All Products',
      path: '/dashboard/all-products',
      icon: <IconBox size={20} />,
    },
    {
      name: 'All Orders',
      path: '/dashboard/all-orders',
      icon: <IconClipboardList size={20} />,
    },

    // Managers
    {
      name: 'Add Product',
      path: '/dashboard/add-product',
      icon: <IconPlus size={20} />,
    },
    {
      name: 'Manage Products',
      path: '/dashboard/manage-products',
      icon: <IconBox size={20} />,
    },
    {
      name: 'Pending Orders',
      path: '/dashboard/pending-orders',
      icon: <IconClock size={20} />,
    },
    {
      name: 'Approved Orders',
      path: '/dashboard/approved-orders',
      icon: <IconClipboardCheck size={20} />,
    },
    // Buyer
    {
      name: 'My Orders',
      path: '/dashboard/my-orders',
      icon: <IconShoppingBag size={20} />,
    },
    {
      name: 'Track Order',
      path: '/dashboard/track-order',
      icon: <IconTruckDelivery size={20} />,
    },
    // Manager & Buyer
    {
      name: 'My Profile',
      path: '/dashboard/profile',
      icon: <IconUserCircle size={20} />,
    },
  ];

  const handleLogout = () => {
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-gradient">
      {/* Top bar for Mobile */}
      <div className="lg:hidden flex justify-between items-center bg-amber-800 text-white px-4 py-3 shadow-md fixed top-0 w-full">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Link to="/dashboard">
            <span>Garments Flow</span>
          </Link>
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="text-amber-800 border-white">
              <IconMenu2 size={20} />
            </Button>
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent className="bg-amber-800 text-white w-64 p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

            <nav className="flex flex-col gap-3">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-amber-700 ${
                      isActive ? 'bg-amber-700 font-semibold' : ''
                    }`
                  }
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <Button
              variant="outline"
              className="mt-6 w-full text-amber-800 border-white hover:bg-white hover:text-amber-800 flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <IconLogout size={18} /> Logout
            </Button>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="lg:flex">
        {/* Permanent Sidebar for Desktop */}
        <aside className="hidden lg:flex lg:flex-col md:w-64 bg-amber-800 text-white p-6">
          <Link to="/dashboard">
            <h2 className="text-2xl font-bold mb-6">Garments Flow</h2>
          </Link>

          <nav className="flex flex-col gap-3 flex-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-amber-700 ${
                    isActive ? 'bg-amber-700 font-semibold' : ''
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>

          <Button
            variant="outline"
            className="mt-6 w-full border-white text-amber-800 hover:bg-white hover:text-amber-800 flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <IconLogout size={18} /> Logout
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col mt-20 lg:mt-0 min-h-screen">
          <div className="hidden lg:flex items-center p-4 shadow-md">
            <Link to="/dashboard" className="text-amber-900 mr-5">
              <IconHome size={30} />
            </Link>
            <h2 className="text-2xl font-bold text-amber-900">
              Admin Dashboard
            </h2>
          </div>
          <section className=" ">
            <Outlet />
          </section>
          {/* Footer */}
          <footer className="   text-amber-900 text-right       shadow-inner ">
            <p className="py-3 fixed bottom-0 right-5 ">
              © {new Date().getFullYear()} Garments Flow. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
