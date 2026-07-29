import React from 'react';

const QuoteSection: React.FC<{ data: any }> = ({ data }) => (
  <div className="py-12 text-center max-w-3xl mx-auto border-y border-accent/40">
    <p className="font-serif text-2xl md:text-3xl italic text-accent">&ldquo;{data.quote}&rdquo;</p>
    {data.attribution && <p className="mt-4 text-stone-500 text-sm">{data.attribution}</p>}
  </div>
);

export default QuoteSection;
