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
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { userLogout, user } = useAuth();

  const { role, isLoading } = useRole();
  if (isLoading) return <LoadingSpinner />;

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
      confirmButtonColor: '#0ea5e9',
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
              confirmButtonColor: '#0ea5e9',
            });
          });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top bar for Mobile */}
      <div className="lg:hidden flex justify-between items-center bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 shadow-sm fixed top-0 w-full z-50">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <Link to="/dashboard" className="font-display">
            GarmentFlow
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted"
              >
                <IconMenu2 size={24} />
              </Button>
            </DrawerTrigger>
            <DrawerOverlay />
            <DrawerContent className="bg-background border-r border-border h-full w-[80vw] p-0 rounded-none sm:w-80">
              <div className="p-6 h-full flex flex-col">
                <DrawerTitle className="text-2xl font-bold font-display text-primary mb-8 px-2">
                  Dashboard
                </DrawerTitle>

                <nav className="flex flex-col gap-2 flex-1">
                  {filteredNavItems.map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`
                      }
                      onClick={() => setDrawerOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  ))}
                  
                  <button
                    className="mt-auto w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
                    onClick={() => {
                        setDrawerOpen(false);
                        handleLogout();
                    }}
                  >
                    <IconLogout size={20} /> Logout
                  </button>
                  
                  <Link to="/" onClick={() => setDrawerOpen(false)} className="mt-4 block w-full text-center py-3 bg-muted rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                     Back to Home
                  </Link>
                </nav>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="lg:flex sticky flex-1">
        {/* Permanent Sidebar for Desktop */}
        <aside className="hidden lg:flex lg:flex-col w-72 bg-card border-r border-border h-screen sticky top-0 left-0 p-6 overflow-y-auto">
          <Link to="/dashboard" className="mb-10 px-2 block">
            <h2 className="text-2xl font-bold font-display text-gradient">GarmentFlow</h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Dashboard</p>
          </Link>

          <nav className="flex flex-col gap-2 flex-1">
            
            {filteredNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group relative overflow-hidden ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                 {({ isActive }) => (
                    <>
                        <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                        <span className="relative z-10">{item.name}</span>
                        {isActive && <motion.div layoutId="activeSidebar" className="absolute inset-0 bg-primary z-0" />}
                    </>
                 )}
              </NavLink>
            ))}

            <div className="mt-auto pt-6 border-t border-border space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                  onClick={handleLogout}
                >
                  <IconLogout size={20} /> Logout
                </Button>
                 
                 <div className="flex items-center justify-between px-2 pt-2">
                    <ThemeToggle />
                    <Link to="/" className="text-xs font-semibold text-primary hover:underline">Return Home</Link>
                 </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col mt-16 lg:mt-0 min-h-screen bg-muted/20 relative overflow-x-hidden">
          
          {/* Dashboard Header - Contextual */}
          <div className="hidden lg:flex items-center justify-between px-8 py-6 bg-background/50 backdrop-blur-sm sticky top-0 z-30 border-b border-border/40">
            <div className="flex items-center gap-3 text-muted-foreground">
                <IconHome size={20} />
                <span className="text-sm">/</span>
                <span className="text-sm font-medium text-foreground capitalize">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="text-sm text-right hidden md:block">
                   <p className="font-bold text-foreground">{user?.displayName || 'User'}</p>
                   <p className="text-xs text-muted-foreground uppercase">{role}</p>
               </div>
               {user?.photoURL ? (
                 <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-primary/20" />
               ) : (
                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <IconUserCircle size={24} />
                 </div>
               )}
            </div>
          </div>

          <section className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </section>

          {/* Footer */}
          <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border/40 bg-background/50 backdrop-blur-sm">
            <p>
              © {new Date().getFullYear()} GarmentFlow. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
