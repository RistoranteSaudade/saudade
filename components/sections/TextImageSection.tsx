import React from 'react';
import { urlFor } from '../../lib/sanity';
import PortableTextRenderer from './PortableTextRenderer';

const TextImageSection: React.FC<{ data: any }> = ({ data }) => {
  const { heading, body, image, imagePosition } = data;
  const imageOnLeft = imagePosition === 'left';

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <div className={`space-y-5 text-white font-light leading-relaxed ${imageOnLeft ? 'order-2' : 'order-2 md:order-1'}`}>
          {heading && <h2 className="font-serif text-3xl md:text-4xl text-white">{heading}</h2>}
          <PortableTextRenderer value={body} />
        </div>
        {image && (
          <div className={`h-[480px] w-full ${imageOnLeft ? 'order-1' : 'order-1 md:order-2'}`}>
            <img
              src={urlFor(image).width(900).height(1000).fit('crop').url()}
              className="w-full h-full object-cover"
              alt={heading || ''}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextImageSection;
