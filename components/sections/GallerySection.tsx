import React from 'react';
import { urlFor } from '../../lib/sanity';

const GallerySection: React.FC<{ data: any }> = ({ data }) => {
  const { heading, images } = data;
  if (!images?.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-4">
      {heading && <h2 className="font-serif text-4xl text-white mb-10 text-center">{heading}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img: any, i: number) => (
          <img
            key={i}
            src={urlFor(img).width(600).height(600).fit('crop').url()}
            alt={`${heading || 'Galleria'} ${i + 1}`}
            className="w-full h-48 md:h-64 object-cover rounded-sm border border-accent/40"
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
