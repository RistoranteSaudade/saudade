import React, { useEffect, useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import BookLink from '../components/BookLink';
import { fetchContactPage, type SanityContactPage } from '../lib/queries';
import { imageUrl } from '../lib/sanity';
import Seo from '../components/Seo';

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const Contact: React.FC = () => {
  const { restaurantInfo: RESTAURANT_INFO } = useSiteData();
  const [page, setPage] = useState<SanityContactPage | null>(null);

  useEffect(() => {
    if (!SANITY_ENABLED) return;
    fetchContactPage().then(setPage).catch(console.error);
  }, []);

  const mapsQuery = encodeURIComponent(RESTAURANT_INFO.address);

  return (
    <div className="min-h-screen bg-secondary">
      <Seo
        title="Contatti | Saudade"
        description="Prenota un tavolo da Saudade: indirizzo, telefono e orari del ristorante brasiliano in Piazza Vittorio Veneto, Torino."
        path="/contact"
        image="/images/SAUDADE-37.jpg"
      />
      <div className="h-[45vh] relative overflow-hidden">
        <img
          src={imageUrl(page?.heroImage, 1600, 900) || '/images/SAUDADE-37.jpg'}
          alt={page?.title || 'Contatti Saudade'}
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center pt-16">
          <h1 className="font-serif text-6xl md:text-7xl text-white">{page?.title || 'Contatti'}</h1>
        </div>
      </div>

      <div className="pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-10 max-w-lg mx-auto">
          <div className="w-full space-y-8">
            <h3 className="font-serif text-3xl text-accent">{page?.locationTitle || 'Dove siamo'}</h3>
            <div className="space-y-4">
              <p className="text-white font-light text-lg leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`}
                className="block text-stone-300 font-light hover:text-accent transition-colors"
              >
                {RESTAURANT_INFO.phone}
              </a>
              <p className="text-stone-400 font-light text-sm">{RESTAURANT_INFO.hours}</p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <h4 className="font-serif text-3xl text-accent">{page?.bookingTitle || 'Prenota'}</h4>
            <p className="text-stone-400 font-light">
              {page?.bookingBody || 'Per un tavolo subito, prenota online.'}
            </p>
            <BookLink variant="primary">Prenota</BookLink>
          </div>
        </div>

        <div className="mt-12 border border-accent/40 p-4 md:p-6 space-y-4">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <iframe
              title="Mappa Saudade"
              src={`https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm uppercase tracking-wide text-accent hover:text-white transition-colors"
          >
            {page?.directionsLabel || 'Ottieni indicazioni'}
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
