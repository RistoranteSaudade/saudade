import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import BookLink from './BookLink';

const Navbar: React.FC = () => {
  const { restaurantInfo: RESTAURANT_INFO } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { name: RESTAURANT_INFO.navHomeLabel, path: '/' },
    { name: RESTAURANT_INFO.navMenuLabel, path: '/menu' },
    { name: RESTAURANT_INFO.navAboutLabel, path: '/about' },
    { name: RESTAURANT_INFO.navGalleryLabel, path: '/galleria' },
    { name: RESTAURANT_INFO.navContactLabel, path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${scrolled || isOpen ? 'bg-black py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-1 flex items-center justify-start">
            <Link to="/" className="flex items-center">
              <img src="/logo-gold.png" alt="Saudade" className="h-8 md:h-9 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-sm tracking-wide uppercase whitespace-nowrap transition-colors ${
                  location.pathname === link.path ? 'text-accent' : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="hidden md:block">
              <BookLink variant="nav">{RESTAURANT_INFO.bookingLabel}</BookLink>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden p-2 text-stone-300 hover:text-white"
            >
              <span className="sr-only">Menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {createPortal(
        <>
          <div
            className={`fixed inset-0 bg-black/70 z-[99] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-black z-[100] transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center justify-between mb-12">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img src="/logo-gold.png" alt="Saudade" className="h-8 w-auto object-contain" />
                </Link>
                <button type="button" onClick={() => setIsOpen(false)} className="p-2 text-stone-400 hover:text-white">
                  <X className="h-7 w-7" />
                </button>
              </div>
              <div className="flex flex-col gap-6 mb-10">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-serif text-2xl transition-colors ${
                      location.pathname === link.path ? 'text-accent' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-accent/40 space-y-5">
                <BookLink variant="primary" className="w-full">{RESTAURANT_INFO.bookingLabel}</BookLink>
                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`}
                  className="block text-stone-400 hover:text-white transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
