import React from 'react';
import { useSiteData } from '../context/SiteDataContext';

type BookLinkVariant = 'primary' | 'secondary' | 'text' | 'nav' | 'sticky';

const VARIANT_CLASS: Record<BookLinkVariant, string> = {
  primary:
    'inline-block px-8 py-3.5 bg-accent hover:brightness-95 text-black font-semibold tracking-wide uppercase text-sm text-center transition-[filter]',
  secondary:
    'inline-block px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold tracking-wide uppercase text-sm text-center border border-accent transition-colors',
  text:
    'inline-flex items-center gap-2 text-accent text-sm uppercase tracking-wide font-semibold hover:text-white transition-colors',
  nav:
    'px-5 py-2 bg-accent hover:brightness-95 text-black font-semibold text-xs tracking-wide uppercase inline-flex items-center gap-2 transition-[filter]',
  sticky:
    'block w-full text-center px-6 py-4 bg-accent hover:brightness-95 active:brightness-90 text-black font-semibold text-sm tracking-wide uppercase transition-[filter]',
};

type BookLinkProps = {
  children: React.ReactNode;
  variant?: BookLinkVariant;
  className?: string;
};

const BookLink: React.FC<BookLinkProps> = ({ children, variant = 'primary', className = '' }) => {
  const { externalLinks } = useSiteData();
  return (
    <a
      href={externalLinks.book}
      target="_blank"
      rel="noopener noreferrer"
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
    >
      {children}
    </a>
  );
};

export default BookLink;
