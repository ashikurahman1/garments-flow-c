import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
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
              setIsMobileMenu(false);
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

  if (loading) return <LoadingSpinner />;
  return (
    <header className="shadow p-3">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-3 lg:gap-15">
            <ul className="hidden lg:flex items-center gap-8 font-semibold">
              {menuLinks.map((link, i) => (
                <NavLink to={link.path} key={i}>
                  {link.name}{' '}
                </NavLink>
              ))}
            </ul>
            {user ? (
              <div className="space-x-2 flex">
                <Button
                  onClick={() => navigate(`/dashboard`)}
                  size="sm"
                  variant="primary"
                  className="bg-amber-900 text-white hover:opacity-90"
                >
                  <IconLayoutDashboard stroke={2} />
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  variant="primary"
                  className="bg-amber-950 text-white hover:opacity-90 hidden lg:flex"
                >
                  <IconLogin2 stroke={2} /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button
                    size="sm"
                    variant="primary"
                    className="bg-amber-900 text-white hover:opacity-90 cursor-pointer"
                  >
                    <IconLogin2 stroke={2} /> Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button
                    size="sm"
                    className="hidden lg:flex hover:opacity-90 cursor-pointer"
                  >
                    <IconUserEdit stroke={2} />
                    Register
                  </Button>
                </Link>
              </div>
            )}
            <div
              onClick={() => setIsMobileMenu(!isMobileMenu)}
              className="lg:hidden"
            >
              {isMobileMenu ? (
                <IconX stroke={2} size={30} />
              ) : (
                <IconMenu2 stroke={2} size={30} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenu && (
          <div
            className={`bg-amber-900/90 py-15 absolute  w-full h-screen flex flex-col items-center ${
              isMobileMenu ? 'top-15 left-0' : '-top-100 -left-100 '
            } transition-all delay-3000 duration-3000 z-1000 text-white`}
          >
            <ul className="lg:hidden flex flex-col items-center gap-8 font-semibold mb-10">
              <div className="w-10 h-10 bg-amber-900 flex items-center justify-center rounded-full overflow-hidden">
                <IconUser />
              </div>
              {menuLinks.map((link, i) => (
                <NavLink
                  to={link.path}
                  key={i}
                  onClick={() => setIsMobileMenu(false)}
                >
                  {link.name}{' '}
                </NavLink>
              ))}
            </ul>
            {user ? (
              <Button
                onClick={handleLogout}
                size="lg"
                variant="primary"
                className="bg-amber-950 text-white hover:opacity-90"
              >
                <IconLogin2 stroke={2} /> Logout
              </Button>
            ) : (
              <Link to="/register">
                <Button
                  onClick={() => setIsMobileMenu(false)}
                  size="sm"
                  className="lg:hidden hover:opacity-90 cursor-pointer"
                >
                  <IconUserEdit stroke={2} />
                  Register
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
