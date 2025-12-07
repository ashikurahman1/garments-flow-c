import React from 'react';
import { NavLink } from 'react-router';
import GarmentsFlow from '../../assets/Garments-Flow.png';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconMail,
  IconPhoneCall,
  IconMapPin,
} from '@tabler/icons-react';

const Footer = () => {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/all-product', label: 'All Product' },
    { to: '/about-us', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  const supportLinks = [
    { to: '/faq', label: 'FAQ' },
    { to: '/shipping', label: 'Shipping' },
    { to: '/returns', label: 'Returns' },
    { to: '/terms', label: 'Terms & Privacy' },
  ];

  return (
    <footer className="bg-amber-900 text-white pt-14 pb-6">
      <div className="container mx-auto px-4">
        {/* Grid: 1 column on small, 4 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* 1. Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={GarmentsFlow}
                alt="Garments Flow Logo"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl lg:text-2xl font-semibold">
                Garments Flow
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-amber-50">
              High-quality garments and a smooth shopping experience — fast
              delivery, helpful support, and secure payments.
            </p>

            <div className="flex flex-col gap-2 text-amber-50 text-sm">
              <span className="flex items-center gap-2">
                <IconPhoneCall stroke={1.5} size={18} />
                +880 1845-684090
              </span>
              <span className="flex items-center gap-2">
                <IconMail stroke={1.5} size={18} />
                support@garmentsflow.com
              </span>
              <span className="flex items-center gap-2">
                <IconMapPin stroke={1.5} size={18} />
                Dhaka, Bangladesh
              </span>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-amber-50">
              {quickLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm hover:text-amber-300 transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="flex flex-col gap-2 text-amber-50">
              {supportLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm hover:text-amber-300 transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* 4. Social & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow & Newsletter</h3>

            <div className="flex gap-4 mb-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-amber-300"
              >
                <IconBrandFacebook stroke={1.5} size={24} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-amber-300"
              >
                <IconBrandInstagram stroke={1.5} size={24} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-amber-300"
              >
                <IconBrandLinkedin stroke={1.5} size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-amber-300">
                <IconBrandYoutube stroke={1.5} size={24} />
              </a>
            </div>

            <p className="text-sm text-amber-50 mb-3">
              Subscribe for updates & offers
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex items-center gap-2"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md px-3 py-2 text-amber-900 placeholder-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-100"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-amber-700 hover:bg-amber-600 text-white font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* bottom line */}
        <div className="border-t border-amber-700 mt-10 pt-4 text-center text-sm text-amber-200">
          © {new Date().getFullYear()} Garments Flow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
