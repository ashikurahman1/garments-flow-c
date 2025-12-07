import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { Button } from '@/components/ui/button';
import {
  IconLayoutDashboard,
  IconLogin2,
  IconMenu2,
  IconUserEdit,
  IconX,
} from '@tabler/icons-react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const user = false;
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
              <div>
                <Button
                  size="sm"
                  variant="primary"
                  className="bg-amber-900 text-white hover:opacity-90"
                >
                  <IconLayoutDashboard stroke={2} />
                  Dashboard
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
                size="lg"
                variant="primary"
                className="bg-amber-950 text-white hover:opacity-90"
              >
                <IconLogin2 stroke={2} /> Logout
              </Button>
            ) : (
              <Link to="/register">
                <Button
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
