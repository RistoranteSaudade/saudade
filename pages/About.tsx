import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAboutPage } from '../lib/queries';
import SectionRenderer from '../components/sections/SectionRenderer';
import BookLink from '../components/BookLink';
import Seo from '../components/Seo';

const ABOUT_DESCRIPTION = 'La storia di Saudade: churrascaria brasiliana in Piazza Vittorio Veneto a Torino, dal 2019.';

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const About: React.FC = () => {
  const [sections, setSections] = useState<any[] | null>(null);

  useEffect(() => {
    if (!SANITY_ENABLED) return;
    fetchAboutPage()
      .then((data) => setSections(data?.sections || null))
      .catch(console.error);
  }, []);

  if (sections && sections.length > 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <Seo title="Chi Siamo | Saudade" description={ABOUT_DESCRIPTION} path="/about" image="/images/SAUDADE-148.jpg" />
        <SectionRenderer sections={sections} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Seo title="Chi Siamo | Saudade" description={ABOUT_DESCRIPTION} path="/about" image="/images/SAUDADE-148.jpg" />
      <div className="h-[45vh] relative overflow-hidden">
        <img
          src="/images/SAUDADE-148.jpg"
          alt="Ristorante Brasiliano"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center pt-16">
          <h1 className="font-serif text-6xl md:text-7xl text-white">Chi Siamo</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-12 pb-10 space-y-20 md:space-y-28">
        <section className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Il nome <span className="text-accent">Saudade</span>
          </h2>
          <p className="text-stone-300 font-light text-lg leading-relaxed">
            Saudade è una parola difficile da tradurre. Parla di mancanza e di affetto:
            il ricordo di un sapore, di una casa lontana, di una festa intorno al fuoco.
            L&apos;abbiamo scelta perché è quello che vogliamo farvi sentire a tavola.
            Un pezzo di Brasile che resta.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-5 text-white font-light leading-relaxed text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Dal 2019 in <span className="text-accent">Piazza Vittorio</span>
            </h2>
            <p className="text-lg text-stone-300">
              Siamo aperti sette giorni su sette nel cuore di Torino, dove la piazza è già una
              scena. Qui il Brasile guida come accogliamo, cuciniamo e facciamo stare a tavola.
            </p>
            <p className="text-lg text-stone-300">
              Chi passa una sera da noi spesso torna, per la carne e per il ritmo:
              lento, conviviale, senza fretta di chiudere il conto.
            </p>
          </div>
          <img
            src="/images/hero-environment.jpg"
            className="w-full h-[420px] md:h-[480px] object-cover"
            alt="Piazza Vittorio e Saudade"
          />
        </section>

        <section className="grid md:grid-cols-2 gap-14 items-center">
          <img
            src="/images/hero-server.jpg"
            className="w-full h-[420px] md:h-[480px] object-cover order-2 md:order-1"
            alt="Servizio alla spada"
          />
          <div className="space-y-5 text-white font-light leading-relaxed text-center md:text-left order-1 md:order-2">
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Il rituale del <span className="text-accent">rodizio</span>
            </h2>
            <p className="text-lg text-stone-300">
              Il rodizio è il cuore di Saudade. I churrasqueiros passano tra i tavoli con la spada,
              tagliano al momento, ascoltano, tornano. Nove carni selezionate, allevamenti grass fed,
              una selezione che segue stagione e disponibilità.
            </p>
            <p className="text-lg text-stone-300">
              Al tavolo restano il gesto e il tempo di stare insieme, senza un menù da spuntare
              in fretta.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-5 text-white font-light leading-relaxed text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Brace e <span className="text-accent">bar</span>
            </h2>
            <p className="text-lg text-stone-300">
              Accanto al rodizio c&apos;è la cucina brasiliana che conosciamo da casa:
              feijoada carioca, pão de queijo, empanadas. Sapori che tengono compagnia alla carne
              e aprono la strada alla sera.
            </p>
            <p className="text-lg text-stone-300">
              Al bar serviamo caipirinhas, cachaça e cocktail signature.
              Stessa convivialità, con il bicchiere in mano.
            </p>
          </div>
          <img
            src="/images/about-cocktails.jpg"
            className="w-full h-[420px] md:h-[480px] object-cover"
            alt="Cocktail Saudade"
          />
        </section>

        <section className="max-w-2xl mx-auto text-center space-y-8 pt-4">
          <p className="font-serif text-2xl md:text-3xl text-white italic leading-snug">
            In Brasile il cibo è una festa.
            <br />
            <span className="text-accent">Ogni festa inizia intorno al fuoco.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center min-w-[12rem] px-8 py-3.5 border border-accent text-white font-semibold tracking-wide uppercase text-sm hover:bg-white/10 transition-colors"
            >
              Vedi il menu
            </Link>
            <BookLink variant="primary">Prenota</BookLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
