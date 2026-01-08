import React from 'react';
import { NavLink } from 'react-router';
 
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
    { to: '/all-products', label: 'All Product' },
    { to: '/about-us', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  const supportLinks = [
    { to: '', label: 'FAQ' },
    { to: '', label: 'Shipping' },
    { to: '', label: 'Returns' },
    { to: '', label: 'Terms & Privacy' },
  ];

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 text-foreground transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Grid: 1 column on small, 4 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          {/* 1. Logo & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               
              <h2 className="text-2xl font-bold font-display text-primary">
                Garments Flow
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              High-quality garments and a smooth shopping experience — fast
              delivery, helpful support, and secure payments.
            </p>

            <div className="flex flex-col gap-3 text-muted-foreground text-sm">
              <span className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                <IconPhoneCall stroke={1.5} size={20} className="text-primary" />
                +880 1845-684090
              </span>
              <span className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                <IconMail stroke={1.5} size={20} className="text-primary" />
                support@garmentsflow.com
              </span>
              <span className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                <IconMapPin stroke={1.5} size={20} className="text-primary" />
                Dhaka, Bangladesh
              </span>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-display border-b border-primary/20 pb-2 inline-block">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              {quickLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.to}
                  className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-display border-b border-primary/20 pb-2 inline-block">Support</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              {supportLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.to}
                  className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* 4. Social & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-display border-b border-primary/20 pb-2 inline-block">Follow & Newsletter</h3>

            <div className="flex gap-4 mb-6">
              {[
                { href: 'https://facebook.com/ashikurrdev', Icon: IconBrandFacebook },
                { href: '#', Icon: IconBrandInstagram },
                { href: 'https://linkedin.com/in/ashikur-dev', Icon: IconBrandLinkedin },
                { href: '#', Icon: IconBrandYoutube }
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon stroke={1.5} size={20} />
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for updates & offers.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex flex-col gap-3"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md px-4 py-3 bg-muted/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="w-full btn-premium bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* bottom line */}
        <div className="border-t border-border mt-16 pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Garments Flow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
