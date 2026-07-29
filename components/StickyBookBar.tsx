import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import BookLink from './BookLink';
import { useSiteData } from '../context/SiteDataContext';

const StickyBookBar: React.FC = () => {
  const { restaurantInfo: RESTAURANT_INFO } = useSiteData();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-[#0a0a0a]/95 border-t border-accent/40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <BookLink
          variant="sticky"
          className="flex w-full items-center justify-center gap-2.5 py-4 text-[13px] tracking-[0.18em] pointer-events-auto"
        >
          <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} />
          {RESTAURANT_INFO.bookingLabel}
        </BookLink>
      </div>
    </div>
  );
};

export default StickyBookBar;
