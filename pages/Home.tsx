import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import BookLink from '../components/BookLink';
import { fetchHomePage, type SanityHomePage } from '../lib/queries';
import { imageUrl } from '../lib/sanity';
import Seo from '../components/Seo';

const STORY_VIDEOS = ['/videos/carne-2.mp4', '/videos/carne-1.mp4'] as const;
const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const heroSlides = [
  {
    image: "/images/hero-picanha.jpg",
    headline: "Rodizio",
    accent: "senza limiti",
    desc: "Nove carni alla spada, grass fed, servite dai nostri churrasqueiros."
  },
  {
    image: "/images/hero-sliced-meat.jpg",
    headline: "Tagli",
    accent: "selezionati",
    desc: "Picanha, Black Angus, Coupim, Bocconcino Saudade."
  },
  {
    image: "/images/hero-environment.jpg",
    headline: "Il cuore",
    accent: "del Brasile",
    desc: "Brace, cocktail e churrascaria in Piazza Vittorio Veneto, dal 2019."
  }
];

const Home: React.FC = () => {
  const { eventSettings: EVENT_SETTINGS } = useSiteData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [storyVideoIndex, setStoryVideoIndex] = useState(0);
  const [homePage, setHomePage] = useState<SanityHomePage | null>(null);

  useEffect(() => {
    if (!SANITY_ENABLED) return;
    fetchHomePage().then(setHomePage).catch(console.error);
  }, []);

  const slides = homePage?.heroSlides?.length
    ? homePage.heroSlides.map((slide) => ({
        image: imageUrl(slide.image, 1920, 1200) || '',
        headline: slide.headline,
        accent: slide.accent || '',
        desc: slide.description || ''
      }))
    : heroSlides;
  const storyVideos = homePage?.mobileStoryVideos?.length ? homePage.mobileStoryVideos : STORY_VIDEOS;
  const slide = slides[currentSlide] ?? slides[0];
  const churrascaria = homePage?.churrascariaSection;
  const rodizio = homePage?.rodizioSection;
  const piazza = homePage?.piazzaSection;
  const quoteBg = imageUrl(homePage?.quoteBackgroundImage, 1600, 900) || '/images/visual-breaker-marbling.jpg';

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTextVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <Seo
        title={homePage?.seoTitle || 'Saudade | Churrascaria Brasiliana a Torino'}
        description={homePage?.seoDescription || 'Rodizio brasiliano, feijoada e cocktail bar in Piazza Vittorio Veneto, Torino.'}
        path="/"
        image="/images/hero-picanha.jpg"
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-secondary">
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={s.image}
              alt={`Saudade ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setTextVisible(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setTextVisible(true);
                }, 400);
              }}
              className={`h-0.5 transition-all duration-300 ${index === currentSlide ? 'bg-accent w-10' : 'bg-white/40 w-4'}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1
            className={`font-serif text-5xl md:text-7xl text-white mb-6 leading-none transition-opacity duration-300 ${textVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {slide.headline}
            <br />
            <span className="text-accent italic">{slide.accent}</span>
          </h1>
          <p className={`text-white/85 text-lg font-light mb-10 max-w-xl mx-auto transition-opacity duration-300 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
            {slide.desc}
          </p>
          <BookLink variant="primary">Prenota il tavolo</BookLink>
        </div>
      </section>

      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-secondary">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            {homePage?.meaningHeading || <>Cosa significa <span className="text-accent italic">Saudade</span></>}
          </h2>
          <p className="text-stone-300 font-light text-lg leading-relaxed">
            {homePage?.meaningBody || `In portoghese parla di memoria e di voglia. Il sapore di un posto, l'odore di una tavola piena, la voglia di ritrovarli. A Torino portiamo il calore delle churrascarie del sud del Brasile, qui e adesso.`}
          </p>
        </div>
      </section>

      <section className="relative w-full h-[50vh] overflow-hidden bg-black md:hidden">
        <video
          key={storyVideos[storyVideoIndex]}
          className="absolute inset-0 w-full h-full object-cover"
          src={storyVideos[storyVideoIndex]}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
          onEnded={() => setStoryVideoIndex((i) => (i + 1) % storyVideos.length)}
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </section>

      <section className="pt-12 pb-16 md:py-24 bg-primary">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="order-2 md:order-1">
            <img
              src={imageUrl(churrascaria?.image, 900, 1100) || '/images/intro-grilled-meat.jpg'}
              alt="Carne alla brace"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              {churrascaria?.heading || <>La vera <span className="text-accent italic">churrascaria</span></>}
            </h2>
            <p className="text-stone-200 leading-relaxed font-light text-lg max-w-md">
              {churrascaria?.body || 'Qui il tempo si misura in passaggi di spada. Il churrasqueiro arriva al tavolo, taglia, ascolta, torna. Un rituale lento, fatto di brace, conversazione e piatti che restano finché non alzate la mano.'}
            </p>
            <p className="text-stone-300 leading-relaxed font-light max-w-md">
              {churrascaria?.secondaryBody || 'Dal 2019 siamo in Piazza Vittorio Veneto, nel cuore di Torino, con lo spirito del Brasile.'}
            </p>
            <BookLink variant="primary">Prenota</BookLink>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden group">
        <img
          src={imageUrl(rodizio?.image, 1600, 1000) || '/images/rodizio-hero.jpg'}
          alt="Il Rodizio Saudade"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 p-8 md:p-10 text-center md:text-left flex flex-col items-center md:items-start justify-center">
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">{rodizio?.heading || 'Il Rodizio'}</h3>
          <p className="text-stone-300 text-base leading-relaxed max-w-sm mb-6 font-light">
            {rodizio?.body || 'Nove carni alla spada, direttamente al vostro tavolo. Tagli grass fed da Argentina, Brasile e Uruguay, serviti come in churrascaria: senza lista da spuntare, solo il gesto e il gusto.'}
          </p>
          <BookLink variant="text">
            Prenota <ArrowRight className="h-4 w-4" />
          </BookLink>
        </div>
      </section>

      <section className="pt-12 pb-16 md:py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              {piazza?.heading || <>La sera in <span className="text-accent italic">Piazza Vittorio</span></>}
            </h2>
            <p className="text-stone-300 leading-relaxed font-light text-lg max-w-md">
              {piazza?.body || 'Quando la brace lascia spazio al bar, arrivano caipirinhas, cachaça e i nostri signature cocktail. La piazza fuori, la luce bassa dentro. Il pasto diventa serata, senza fretta di alzarsi.'}
            </p>
            {piazza?.secondaryBody ? (
              <p className="text-stone-300 leading-relaxed font-light max-w-md">{piazza.secondaryBody}</p>
            ) : null}
          </div>
          <img
            src={imageUrl(piazza?.image, 900, 1100) || '/images/piazza-vittorio.jpg'}
            alt="Piazza Vittorio Veneto"
            className="w-full h-[420px] md:h-[520px] object-cover"
          />
        </div>
      </section>

      {EVENT_SETTINGS.enabled && (
        <section className="pt-12 pb-16 md:py-24 bg-darkGreen border-t border-accent/40">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-accent text-sm mb-4">{EVENT_SETTINGS.date}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              {EVENT_SETTINGS.title}
            </h2>
            <p className="text-stone-300 text-lg leading-relaxed mb-10 font-light">
              {EVENT_SETTINGS.description}
            </p>
            <BookLink variant="primary">Prenota</BookLink>
          </div>
        </section>
      )}

      <section
        className="h-80 bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: `url("${quoteBg}")` }}
      >
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-white italic text-center leading-snug max-w-2xl">
            {homePage?.quoteText || 'La carne non è solo cibo,'} <span className="text-accent">{homePage?.quoteAccent || 'è convivialità.'}</span>
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
