import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay,
  DrawerTitle,
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
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../hooks/useRole';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { userLogout } = useAuth();

  const { role, isLoading } = useRole();
  if (isLoading) return <LoadingSpinner />;
  // console.log(role);

  const navItems = [
    {
      name: 'Manage Users',
      path: '/dashboard/manage-users',
      icon: <IconUsers size={20} />,
      roles: ['admin'],
    },
    {
      name: 'All Products',
      path: '/dashboard/all-products',
      icon: <IconBox size={20} />,
      roles: ['admin'],
    },
    {
      name: 'All Orders',
      path: '/dashboard/all-orders',
      icon: <IconClipboardList size={20} />,
      roles: ['admin'],
    },

    // Managers
    {
      name: 'Add Product',
      path: '/dashboard/add-product',
      icon: <IconPlus size={20} />,
      roles: ['manager'],
    },
    {
      name: 'Manage Products',
      path: '/dashboard/manage-products',
      icon: <IconBox size={20} />,
      roles: ['manager'],
    },
    {
      name: 'Pending Orders',
      path: '/dashboard/pending-orders',
      icon: <IconClock size={20} />,
      roles: ['manager'],
    },
    {
      name: 'Approved Orders',
      path: '/dashboard/approved-orders',
      icon: <IconClipboardCheck size={20} />,
      roles: ['manager'],
    },
    // Buyer
    {
      name: 'My Orders',
      path: '/dashboard/my-orders',
      icon: <IconShoppingBag size={20} />,
      roles: ['buyer'],
    },
    {
      name: 'Track Order',
      path: '/dashboard/track-order',
      icon: <IconTruckDelivery size={20} />,
      roles: ['buyer'],
    },
    // Manager & Buyer
    {
      name: 'My Profile',
      path: '/dashboard/profile',
      icon: <IconUserCircle size={20} />,
      roles: ['admin', 'manager', 'buyer'],
    },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#92400E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
    }).then(result => {
      if (result.isConfirmed) {
        userLogout()
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              text: 'You have been successfully logged out.',
              showConfirmButton: false,
              timer: 1500,
              title: 'Logged Out!',
            }).then(() => {
              navigate('/');
            });
          })
          .catch(err => {
            Swal.fire({
              title: 'Logout Failed',
              text: 'Something went wrong. Please try again.',
              icon: 'error',
              confirmButtonColor: '#92400E',
            });
          });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-gradient">
      {/* Top bar for Mobile */}
      <div className="lg:hidden flex justify-between items-center bg-amber-800 text-white dark:text-black px-4 py-3 shadow-md fixed top-0 w-full">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Link to="/dashboard">
            <span>Garments Flow</span>
          </Link>
        </div>
        <div className="flex item-center justify-center">
          <ThemeToggle />
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="text-amber-800 border-white">
              <IconMenu2 size={20} />
            </Button>
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent className="bg-amber-800 text-white dark:text-black w-64 p-6">
            <DrawerTitle className="text-2xl font-bold mb-6">
              My Dashboard
            </DrawerTitle>

            <nav className="flex flex-col gap-3">
              {filteredNavItems.map(item => (
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
              <Button
                variant="outline"
                className="mt-10 w-full text-amber-800 border-white hover:bg-white hover:text-amber-800 flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <IconLogout size={18} /> Logout
              </Button>
              <div className="bg-linear-to-b from-amber-600  to-amber-900 p-2 text-center rounded-md mt-10 font-semibold ">
                <Link to="/">Go to Home Page</Link>
              </div>
            </nav>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="lg:flex">
        {/* Permanent Sidebar for Desktop */}
        <aside className="hidden lg:flex lg:flex-col md:w-64 bg-amber-800 text-white p-6">
          <Link to="/dashboard">
            <h2 className="text-2xl font-bold mb-6">Garments Flow</h2>
          </Link>

          <nav className="flex flex-col   gap-3 flex-1">
            <div className="flex item-center  justify-center">
              <ThemeToggle />
            </div>
            {filteredNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `dark:text-white flex items-center gap-2 p-2 rounded hover:bg-amber-700 ${
                    isActive ? 'bg-amber-700 font-semibold' : ''
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
            <Button
              variant="outline"
              className="mt-10 w-full border-white text-amber-800 dark:text-white hover:bg-white hover:text-amber-800 flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <IconLogout size={18} /> Logout
            </Button>
            <div className="bg-linear-to-b from-amber-600  to-amber-900 p-3 text-center rounded-md mt-10 font-semibold dark:text-white">
              <Link to="/">Go to Home Page</Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col mt-20 lg:mt-0 min-h-screen">
          <div className="hidden lg:flex items-center p-4 shadow-md">
            <Link
              to="/dashboard"
              className="text-amber-900 dark:text-amber-500 dark:text-amber-500 mr-5"
            >
              <IconHome size={30} />
            </Link>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-500 dark:text-amber-500 ">
              My Dashboard
            </h2>
          </div>
          <section className="min-h-screen ">
            <Outlet />
          </section>
          {/* Footer */}
          <footer className="  text-amber-900 dark:text-amber-500 dark:text-amber-500 p-3  text-center    shadow-inner ">
            <p className=" ">
              © {new Date().getFullYear()} Garments Flow. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
