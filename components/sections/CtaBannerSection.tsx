import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';

const CtaBannerSection: React.FC<{ data: any }> = ({ data }) => {
  const { externalLinks, restaurantInfo } = useSiteData();
  const { heading, text, buttonLabel, buttonUrl } = data;
  const href = buttonUrl || externalLinks.book;
  const label = buttonLabel || restaurantInfo.bookingLabel;

  return (
    <div className="max-w-3xl mx-auto px-4 text-center py-16 border-y border-accent/40">
      <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{heading}</h2>
      {text && <p className="text-stone-300 font-light mb-8">{text}</p>}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3.5 bg-accent hover:brightness-95 text-black font-semibold tracking-wide uppercase text-sm transition-[filter]"
      >
        {label}
      </a>
    </div>
  );
};

export default CtaBannerSection;
