import React, { useEffect, useMemo, useState } from 'react';
import { MenuItemType } from '../types';
import { useSiteData } from '../context/SiteDataContext';
import BookLink from '../components/BookLink';
import { fetchMenuPage, type SanityMenuPage } from '../lib/queries';
import { imageUrl } from '../lib/sanity';
import { buildCartaCategories, getDisplayArea } from '../lib/carta';
import CartaItemBlock from '../components/CartaItemBlock';
import Seo from '../components/Seo';

const TABS = [
  { id: 'carni', label: 'Le Carni' },
  { id: 'accompagnamenti', label: 'Accompagnamenti' },
  { id: 'dolci', label: 'Dolci' },
  { id: 'vini', label: 'Vini' },
  { id: 'cocktails', label: 'Cocktails' },
] as const;

type TabId = (typeof TABS)[number]['id'];
const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const Menu: React.FC = () => {
  const { menu } = useSiteData();
  const [menuPage, setMenuPage] = useState<SanityMenuPage | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('carni');

  useEffect(() => {
    if (!SANITY_ENABLED) return;
    fetchMenuPage().then(setMenuPage).catch(console.error);
  }, []);

  const visibleMenuItems = menu.filter((item) => getDisplayArea(item) === 'menu');
  const meatItems = visibleMenuItems.filter((item) => item.type === MenuItemType.MEAT);
  const sideItems = visibleMenuItems.filter((item) => item.type === MenuItemType.SIDES);
  const cartaCategories = useMemo(() => buildCartaCategories(menu), [menu]);
  const cartaCategory = cartaCategories.find((c) => c.id === activeTab);

  return (
    <div className="min-h-screen bg-secondary">
      <Seo
        title="Menu | Saudade"
        description="Scopri il menu di Saudade: rodizio brasiliano, carni selezionate, accompagnamenti, dolci, vini e cocktail a Torino."
        path="/menu"
        image="/images/SAUDADE-132.jpg"
      />
      <div className="h-[45vh] relative overflow-hidden">
        <img
          src={imageUrl(menuPage?.heroImage, 1600, 900) || '/images/SAUDADE-132.jpg'}
          alt={menuPage?.title || 'Il Nostro Menu'}
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-8">{menuPage?.title || 'Menu'}</h1>
          <BookLink variant="primary">Prenota</BookLink>
        </div>
      </div>

      <div className="pt-12 pb-10">
        <nav className="mb-10 px-4" aria-label="Categorie menu">
          <div className="max-w-5xl mx-auto overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex items-center gap-5 md:gap-8 md:justify-center snap-x snap-mandatory min-w-min md:min-w-0">
              {TABS.map((tab) => (
                <li key={tab.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                    className={`font-serif text-sm md:text-base uppercase whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-accent'
                        : 'text-stone-500 hover:text-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {activeTab === 'carni' && (
            <div className="space-y-16">
              {meatItems.map((item) => (
                <article key={item.id}>
                  <header className="mb-10 md:mb-14">
                    <div className="flex items-center justify-between gap-6 mb-6">
                      <h3 className="font-serif text-3xl md:text-4xl text-accent leading-none">{item.name}</h3>
                      <span className="font-serif text-3xl md:text-4xl text-white leading-none whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-stone-300 leading-relaxed font-light text-base md:text-lg">
                      {item.description}
                    </p>
                  </header>
                  {item.cuts && item.cuts.length > 0 && (
                    <div>
                      <p className="text-accent text-xs uppercase tracking-wide mb-6 md:mb-8 text-center">La selezione</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 md:gap-y-3">
                        {item.cuts.map((cut, i) => (
                          <li
                            key={i}
                            className="text-sm md:text-base text-stone-200 font-light py-3.5 md:py-1 border-b border-accent/40 text-center last:border-b-0 md:border-0 md:text-left md:flex md:gap-3 md:items-baseline"
                          >
                            <span className="hidden md:inline text-accent text-lg leading-none shrink-0" aria-hidden>
                              •
                            </span>
                            <span>{cut}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {activeTab === 'accompagnamenti' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-14">
                {sideItems.filter((item) => !item.isTraditionalSide).map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-2 pb-2">
                      <h3 className="text-xl font-serif text-accent">{item.name}</h3>
                      {item.price ? <span className="font-serif text-xl text-white ml-4 whitespace-nowrap">{item.price}</span> : null}
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{item.description}</p>
                  </div>
                ))}
              </div>
              {sideItems.some((item) => item.isTraditionalSide) && (
                <div className="border-t border-accent/40 pt-10">
                  <p className="text-accent text-xs uppercase tracking-wide mb-8 text-center">Accompagnamenti tradizionali</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {sideItems.filter((item) => item.isTraditionalSide).map((item) => (
                      <div key={item.id}>
                        <h3 className="text-xl font-serif text-accent mb-2 pb-2">{item.name}</h3>
                        <p className="text-stone-300 text-sm leading-relaxed font-light">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {cartaCategory && (
            <div className="space-y-16">
              {cartaCategory.sections.map((section) => (
                <div key={section.id}>
                  {cartaCategory.sections.length > 1 && (
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
          )}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-10 px-4">
          <p className="text-white text-xs">
            {menuPage?.allergyNote || 'Per allergie o intolleranze, avvisate il personale.'}
            <br />
            <span className="text-accent">{menuPage?.coverNote || 'Coperto €3,00.'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
