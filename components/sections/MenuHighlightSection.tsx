import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { urlFor } from '../../lib/sanity';

const MenuHighlightSection: React.FC<{ data: any }> = ({ data }) => {
  const { menu } = useSiteData();
  const { heading, category, limit } = data;

  const items = menu
    .filter(item => item.type === category)
    .slice(0, limit || undefined);

  if (!items.length) return null;

  return (
    <div className="max-w-5xl mx-auto px-4">
      {heading && <h2 className="font-serif text-4xl text-white mb-10 text-center">{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map(item => (
          <div key={item.id}>
            {item.image && (
              <img
                src={urlFor(item.image).width(640).height(400).fit('crop').url()}
                alt={item.name}
                className="w-full h-48 object-cover mb-4"
              />
            )}
            <div className="flex justify-between items-baseline mb-2 border-b border-accent/40 pb-2">
              <h3 className="text-xl font-serif text-white">{item.name}</h3>
              <span className="text-white whitespace-nowrap ml-4">{item.price}</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuHighlightSection;
