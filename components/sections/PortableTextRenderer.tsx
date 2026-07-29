import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    h3: ({ children }) => <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-6 italic text-accent my-6">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="text-lg mb-4 last:mb-0">{children}</p>
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline hover:text-white transition-colors"
      >
        {children}
      </a>
    )
  }
};

const PortableTextRenderer: React.FC<{ value: any }> = ({ value }) => {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
};

export default PortableTextRenderer;
