import React from 'react';
import PortableTextRenderer from './PortableTextRenderer';

const RichTextSection: React.FC<{ data: any }> = ({ data }) => (
  <div className="max-w-3xl mx-auto px-4 text-white font-light">
    <PortableTextRenderer value={data.body} />
  </div>
);

export default RichTextSection;
