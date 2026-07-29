import React, { useEffect, useMemo, useState } from 'react';
import CartaItemBlock from '../components/CartaItemBlock';
import { useSiteData } from '../context/SiteDataContext';
import { buildCartaCategories } from '../lib/carta';
import { fetchCartaPage, type SanityCartaPage } from '../lib/queries';
import { imageUrl } from '../lib/sanity';
import Seo from '../components/Seo';

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const Carta: React.FC = () => {
  const { menu } = useSiteData();
  const [page, setPage] = useState<SanityCartaPage | null>(null);
  const categories = useMemo(() => buildCartaCategories(menu), [menu]);
  const [activeCategory, setActiveCategory] = useState('vini');
  const category = categories.find((c) => c.id === activeCategory) ?? categories[0];

  useEffect(() => {
    if (!SANITY_ENABLED) return;
    fetchCartaPage().then(setPage).catch(console.error);
  }, []);

  useEffect(() => {
    if (!category && categories[0]) setActiveCategory(categories[0].id);
  }, [category, categories]);

  return (
    <div className="min-h-screen bg-secondary">
      <Seo
        title="Carta | Saudade"
        description="La carta di Saudade: vini, distillati e cocktail selezionati per accompagnare il rodizio brasiliano a Torino."
        path="/carta"
        image="/images/SAUDADE-106.jpg"
      />
      <div className="h-[45vh] relative overflow-hidden">
        <img
          src={imageUrl(page?.heroImage, 1600, 900) || '/images/SAUDADE-106.jpg'}
          alt={page?.title || 'Carta Saudade'}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="font-serif text-6xl md:text-7xl text-white">
            {page?.title || 'Carta'}
          </h1>
        </div>
      </div>

      <div className="pt-12 pb-10">
        <nav className="mb-10 px-4" aria-label="Categorie carta">
          <div className="max-w-5xl mx-auto overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex items-center justify-center gap-5 md:gap-8 w-full">
              {categories.map((c) => (
                <li key={c.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(c.id)}
                    aria-current={activeCategory === c.id ? 'page' : undefined}
                    className={`font-serif text-sm md:text-base uppercase whitespace-nowrap transition-colors ${
                      activeCategory === c.id
                        ? 'text-accent'
                        : 'text-stone-500 hover:text-stone-200'
                    }`}
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-16">
          {category?.sections.map((section) => (
            <div key={section.id}>
              {category.sections.length > 1 && (
                <h2 className="font-serif text-2xl text-accent text-center mb-8">{section.title}</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {section.items.map((item) => (
                  <CartaItemBlock key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-10 px-4">
          <p className="text-white text-xs">
            {page?.footerNote || 'Disponibilità di etichette e distillati soggetta a variazioni.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carta;
