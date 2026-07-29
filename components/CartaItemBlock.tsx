import React, { useEffect, useState } from 'react';
import { CartaItem } from '../constants';
import { imageUrl } from '../lib/sanity';

const CartaItemBlock: React.FC<{ item: CartaItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const src = imageUrl(item.image as any, 1200);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div>
      {src ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full mb-4 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Ingrandisci ${item.name}`}
        >
          <img
            src={src}
            alt={item.name}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
        </button>
      ) : null}
      <div className="flex justify-between items-baseline mb-2 pb-2">
        <h3 className="text-xl font-serif text-accent pr-4">{item.name}</h3>
        <span className="font-serif text-xl text-white whitespace-nowrap">{item.price}</span>
      </div>
      {item.description ? (
        <p className="text-stone-300 text-sm leading-relaxed font-light">{item.description}</p>
      ) : null}

      {open && src ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 md:p-10"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none px-2"
            onClick={() => setOpen(false)}
            aria-label="Chiudi"
          >
            ×
          </button>
          <img
            src={src}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CartaItemBlock;
