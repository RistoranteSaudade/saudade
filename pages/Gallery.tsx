import React, { useEffect, useState, useCallback, useRef } from 'react';
import type { SanityGalleryImage } from '../lib/queries';
import { imageUrl } from '../lib/sanity';
import Seo from '../components/Seo';

const GalleryItem: React.FC<{
  img: SanityGalleryImage
  onClick: () => void
  aspectRatio: number
}> = ({ img, onClick, aspectRatio }) => {
  const [loaded, setLoaded] = useState(false);
  const src = imageUrl(img.image, 800);

  return (
    <figure
      className="break-inside-avoid cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden rounded bg-stone-800" style={{ aspectRatio }}>
        <div
          className={`absolute inset-0 animate-pulse bg-stone-800 transition-opacity transition-transform duration-300 transform-gpu ${
            loaded ? 'opacity-0 scale-100' : 'opacity-100 scale-[1.03]'
          }`}
          aria-hidden="true"
        />
        <img
          src={src}
          alt={img.alt}
          title={img.alt}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity transition-transform duration-300 transform-gpu group-hover:scale-[1.02] ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
          }`}
        />
      </div>

      {img.caption && (
        <figcaption className="mt-1 text-xs text-stone-400">{img.caption}</figcaption>
      )}
    </figure>
  );
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Gallery: React.FC = () => {
  const [title, setTitle] = useState('Galleria');
  const [seoDesc, setSeoDesc] = useState('');
  const [images, setImages] = useState<SanityGalleryImage[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const prevLightbox = useRef<number | null>(null);

  useEffect(() => {
    // ponytail: loads prebuild JSON from CDN — zero Sanity roundtrip at runtime
    fetch('/gallery-data.json')
      .then((r) => r.json())
      .then((data) => {
        if (data.title) setTitle(data.title);
        if (data.seoDescription) setSeoDesc(data.seoDescription);
        if (data.images) setImages(shuffle(data.images));
      })
      .catch(console.error);
  }, []);

  const closeLightbox = useCallback(() => { setLightbox(null); setLightboxLoaded(false); }, []);
  // reset loader when image changes
  useEffect(() => {
    if (lightbox !== prevLightbox.current) { setLightboxLoaded(false); prevLightbox.current = lightbox; }
  }, [lightbox]);
  const prev = useCallback(() => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, prev, next]);

  return (
    <div className="min-h-screen bg-secondary">
      <Seo
        title={`${title} | Saudade`}
        description={seoDesc || 'Foto del ristorante Saudade: ambienti, piatti e rodizio brasiliano a Torino.'}
        path="/galleria"
      />

      <section className="pt-28 pb-16 px-4">
        <h1 className="text-center font-serif text-4xl md:text-5xl text-accent mb-12">{title}</h1>


        <div className="max-w-7xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <GalleryItem
              key={i}
              img={img}
              onClick={() => setLightbox(i)}
              aspectRatio={img.aspectRatio ?? 1}
            />
          ))}
        </div>
      </section>

      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none cursor-pointer opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-150"
            onClick={closeLightbox}
            aria-label="Chiudi"
          >
            ×
          </button>
          {lightbox > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-150"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Precedente"
            >
              ‹
            </button>
          )}
          {lightbox < images.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-150"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Successiva"
            >
              ›
            </button>
          )}
          {!lightboxLoaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={imageUrl(images[lightbox].image, 1600)}
            alt={images[lightbox].alt}
            title={images[lightbox].alt}
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-300 ${lightboxLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLightboxLoaded(true)}
            onClick={(e) => e.stopPropagation()}
          />
          {images[lightbox].caption && (
            <p className="absolute bottom-6 text-center text-white text-sm">{images[lightbox].caption}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
