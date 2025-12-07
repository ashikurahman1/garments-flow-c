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
} from '@tabler/icons-react';
import { NavLink, Outlet, useNavigate } from 'react-router';

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
  ];

  const handleLogout = () => {
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-gradient">
      {/* Top bar for Mobile */}
      <div className="md:hidden flex justify-between items-center bg-amber-800 text-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>Garments Flow</span>
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

      <div className="flex flex-1">
        {/* Permanent Sidebar for Desktop */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-amber-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">Garments Flow</h2>

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
        <main className="flex-1 flex flex-col">
          <div className="hidden md:flex p-4 shadow-md">
            <h2 className="text-2xl font-bold text-amber-900">
              Admin Dashboard
            </h2>
          </div>
          <section className="p-4">
            <Outlet />
          </section>
          {/* Footer */}
          <footer className="mt-auto  not-only: text-amber-900 text-center py-4 shadow-inner">
            © {new Date().getFullYear()} Garments Flow. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
