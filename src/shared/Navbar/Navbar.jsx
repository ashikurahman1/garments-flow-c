import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import {motion} from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  IconLayoutDashboard,
  IconLogin2,
  IconMenu2,
  IconUser,
  IconUserEdit,
  IconX,
} from '@tabler/icons-react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const { user, loading, userLogout } = useAuth();

  const menuLinks = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/all-products',
      name: 'All-Products',
    },
    {
      path: '/about-us',
      name: 'About Us',
    },
    {
      path: '/contact',
      name: 'Contact',
    },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
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
              setIsMobileMenu(false);
            });
          })
          .catch(err => {
            Swal.fire({
              title: 'Logout Failed',
              text: 'Something went wrong. Please try again.',
              icon: 'error',
              confirmButtonColor: '#4f46e5',
            });
          });
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  return (
    <header className="fixed z-50 w-full top-0 glass border-b border-primary/5 transition-all duration-300">
      <nav className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          <Logo />
          
          <div className="flex items-center gap-6">
            <ul className="hidden lg:flex items-center gap-8 font-medium">
              {menuLinks.map((link, i) => (
                <NavLink 
                  to={link.path} 
                  key={i}
                  className={({ isActive }) => 
                    `relative px-1 py-2 text-sm uppercase tracking-wide transition-colors duration-300 
                    ${isActive ? 'text-primary font-bold' : 'text-neutral-600 dark:text-neutral-300 hover:text-primary'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              
              {user ? (
                <>
                  <Button
                    onClick={() => navigate(`/dashboard`)}
                    size="sm"
                    className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <IconLayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    size="sm"
                    variant="outline"
                    className="btn-premium border-destructive/20 text-destructive hover:bg-destructive/10"
                  >
                    <IconLogin2 className="w-4 h-4 mr-2" /> Logout
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" className="btn btn-outline hover:text-primary">
                      Login
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div
              onClick={() => setIsMobileMenu(!isMobileMenu)}
              className="lg:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-foreground"
            >
              {isMobileMenu ? (
                <IconX stroke={2} size={28} />
              ) : (
                <IconMenu2 stroke={2} size={28} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed min-h-screen inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${
            isMobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '80px' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8  ">
            {user && (
              <div className="flex flex-col items-center gap-4 mb-4">
                 <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-primary border-2 border-primary/20">
                  <IconUser size={32} />
                </div>
                <span className="font-semibold text-lg">{user.displayName || 'User'}</span>
              </div>
            )}

            <ul className="flex flex-col items-center gap-6 text-lg font-medium">
              {menuLinks.map((link, i) => (
                <NavLink
                  to={link.path}
                  key={i}
                  onClick={() => setIsMobileMenu(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </ul>

            <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
              <div className="flex justify-center mb-4">
                <ThemeToggle />
              </div>

              {user ? (
                <>
                  <Button
                    onClick={() => {
                      navigate(`/dashboard`);
                      setIsMobileMenu(false);
                    }}
                    className="w-full bg-primary"
                  >
                    <IconLayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <IconLogin2 className="w-4 h-4 mr-2" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsMobileMenu(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={() => setIsMobileMenu(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
