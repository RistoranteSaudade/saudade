import React from 'react';
import { urlFor } from '../../lib/sanity';
import { useSiteData } from '../../context/SiteDataContext';

const HeroSection: React.FC<{ data: any }> = ({ data }) => {
  const { externalLinks, restaurantInfo } = useSiteData();
  const { label, heading, backgroundImage, ctaLabel, ctaUrl } = data;
  const href = ctaUrl || externalLinks.book;
  const labelText = ctaLabel || restaurantInfo.bookingLabel;

  return (
    <div className="h-[45vh] relative overflow-hidden">
      {backgroundImage && (
        <img
          src={urlFor(backgroundImage).width(1920).url()}
          alt={heading}
          className="w-full h-full object-cover opacity-55"
        />
      )}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
        {label && <p className="text-accent text-sm mb-3">{label}</p>}
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-8">{heading}</h1>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3.5 bg-accent hover:brightness-95 text-black font-semibold tracking-wide uppercase text-sm transition-[filter]"
        >
          {labelText}
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
