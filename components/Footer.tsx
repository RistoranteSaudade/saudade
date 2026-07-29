import React from 'react';
import { Instagram, MapPin, Phone, Clock } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const Footer: React.FC = () => {
  const { restaurantInfo: RESTAURANT_INFO, externalLinks: EXTERNAL_LINKS } = useSiteData();
  return (
    <footer className="bg-black border-t border-accent/40 text-stone-400 py-12 mt-auto mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-serif text-2xl text-white">{RESTAURANT_INFO.name}</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              {RESTAURANT_INFO.footerTagline}
            </p>
            <a
              href={EXTERNAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Contatti</h4>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-4 w-4 text-accent shrink-0" />
              <span className="text-sm">{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <span className="text-sm">{RESTAURANT_INFO.phone}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Orari</h4>
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-4 w-4 text-accent shrink-0" />
              <span className="text-sm">{RESTAURANT_INFO.hours}</span>
            </div>
            <p className="text-xs text-stone-500">
              {RESTAURANT_INFO.footerHoursNote}
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-accent/40 text-center text-xs text-stone-600 flex flex-col items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Saudade Ristorante Brasiliano</span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.iubenda.com/privacy-policy/16571007"
              className="iubenda-white iubenda-noiframe iubenda-embed hover:text-accent transition-colors"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
            <span className="text-stone-700">·</span>
            <a
              href="https://www.iubenda.com/privacy-policy/16571007/cookie-policy"
              className="iubenda-white iubenda-noiframe iubenda-embed hover:text-accent transition-colors"
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
