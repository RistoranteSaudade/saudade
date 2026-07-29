import React from 'react';
import { Link } from 'react-router-dom';
import BookLink from '../components/BookLink';
import { useSiteData } from '../context/SiteDataContext';

type NotFoundProps = {
  title?: string;
  message?: string;
};

const NotFound: React.FC<NotFoundProps> = ({
  title = '404',
  message = 'Questa pagina non esiste.',
}) => {
  const { restaurantInfo: RESTAURANT_INFO } = useSiteData();
  return (
    <div className="min-h-[70vh] bg-secondary flex flex-col items-center justify-center text-center px-6 py-24">
      <title>Pagina non trovata | Saudade</title>
      <p className="font-serif text-accent text-6xl md:text-7xl mb-4 leading-none">{title}</p>
      <p className="text-stone-300 font-light mb-10 max-w-md">{message}</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
        <Link
          to="/"
          className="inline-flex items-center justify-center min-w-[14rem] px-8 py-4 bg-accent hover:brightness-95 text-black font-semibold tracking-wide uppercase text-sm transition-[filter]"
        >
          Torna alla home
        </Link>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center min-w-[14rem] px-8 py-4 border border-accent text-white font-semibold tracking-wide uppercase text-sm hover:bg-white/10 transition-colors"
        >
          Vedi il menu
        </Link>
        <BookLink variant="text">{RESTAURANT_INFO.bookingLabel}</BookLink>
      </div>
    </div>
  );
};

export default NotFound;
