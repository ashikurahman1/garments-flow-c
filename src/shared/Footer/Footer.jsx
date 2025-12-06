import React from 'react';
import { NavLink } from 'react-router';
import GarmentsFlow from '../../assets/Garments-Flow.png';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src={GarmentsFlow} alt="Garments Flow Logo" className="w-10" />
            <h2 className="text-2xl font-semibold">Garments Flow</h2>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-amber-50 max-w-xs">
            We provide high-quality products and a smooth shopping experience.
            Your satisfaction is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-amber-50">
            <NavLink to="/" className="hover:text-white">
              Home
            </NavLink>
            <NavLink to="/all-product" className="hover:text-white">
              All Product
            </NavLink>
            <NavLink to="/about-us" className="hover:text-white">
              About Us
            </NavLink>
            <NavLink to="/contact" className="hover:text-white">
              Contact
            </NavLink>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Support</h3>
          <ul className="flex flex-col gap-2 text-amber-50">
            <li>Help Center</li>
            <li>Track Order</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-300">
              <IconBrandFacebook stroke={2} size={26} />
            </a>
            <a href="#" className="hover:text-amber-300">
              <IconBrandInstagram stroke={2} size={26} />
            </a>
            <a href="#" className="hover:text-amber-300">
              <IconBrandLinkedin stroke={2} size={26} />
            </a>
            <a href="#" className="hover:text-amber-300">
              <IconBrandYoutube stroke={2} size={26} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-amber-700 mt-12 pt-4 text-center text-sm text-amber-200">
        © {new Date().getFullYear()} Garments Flow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
