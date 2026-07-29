import React, { useEffect, useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import BookLink from '../components/BookLink';
import { fetchContactPage, type SanityContactPage } from '../lib/queries';
import { imageUrl } from '../lib/sanity';

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const Contact: React.FC = () => {
  const { restaurantInfo: RESTAURANT_INFO } = useSiteData();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'spam'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState<SanityContactPage | null>(null);

  useEffect(() => {
    if (!SANITY_ENABLED) return;
    fetchContactPage().then(setPage).catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const date = formData.get('date') as string;

    if (!name || !phone || !date) {
      setErrorMessage('Compila nome, telefono e data.');
      setFormStatus('error');
      return;
    }

    if (formData.get('website')) {
      setFormStatus('success');
      return;
    }

    const lastSubmission = localStorage.getItem('last_submission');
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 30000) {
      setFormStatus('spam');
      return;
    }

    setFormStatus('submitting');
    setTimeout(() => {
      localStorage.setItem('last_submission', Date.now().toString());
      setFormStatus('success');
    }, 1500);
  };

  const fieldClass =
    'w-full bg-transparent border-b border-accent/40 focus:border-accent text-white py-3 px-0 focus:outline-none transition-colors placeholder:text-stone-600 font-light';

  return (
    <div className="min-h-screen bg-secondary">
      <title>Contatti | Saudade</title>
      <div className="h-[45vh] relative overflow-hidden">
        <img
          src={imageUrl(page?.heroImage, 1600, 900) || '/images/SAUDADE-37.jpg'}
          alt={page?.title || 'Contatti Saudade'}
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center pt-16">
          <h1 className="font-serif text-6xl md:text-7xl text-white">{page?.title || 'Contatti'}</h1>
        </div>
      </div>

      <div className="pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="w-full space-y-8 text-center lg:text-left">
              <h3 className="font-serif text-3xl text-accent">{page?.locationTitle || 'Dove siamo'}</h3>
              <div className="space-y-4">
                <p className="text-white font-light text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {RESTAURANT_INFO.address}
                </p>
                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`}
                  className="block text-stone-300 font-light hover:text-accent transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
                <p className="text-stone-400 font-light text-sm">{RESTAURANT_INFO.hours}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm uppercase tracking-wide text-accent hover:text-white transition-colors"
              >
                {page?.directionsLabel || 'Indicazioni'}
              </a>
            </div>

            <div className="border border-accent/40 p-8 space-y-4 w-full flex flex-col items-center lg:items-start">
              <h4 className="font-serif text-2xl text-accent">{page?.bookingTitle || 'Prenota'}</h4>
              <p className="text-stone-400 font-light text-sm">
                {page?.bookingBody || 'Per un tavolo subito, prenota online.'}
              </p>
              <BookLink variant="primary">Prenota</BookLink>
            </div>
          </div>

          <div className="lg:col-span-7 border border-accent/40 p-8 md:p-12">
            {formStatus === 'success' ? (
              <div className="text-center space-y-6 py-10">
                <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
                <h3 className="font-serif text-3xl text-white">{page?.successTitle || 'Messaggio inviato'}</h3>
                <p className="text-stone-400">{page?.successBody || 'Ti risponderemo al più presto.'}</p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="text-accent hover:text-white text-sm transition-colors"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <h3 className="font-serif text-3xl text-accent mb-2">{page?.formTitle || 'Scrivici'}</h3>
                  <p className="text-stone-500 text-sm font-light">{page?.formIntro || 'Rispondiamo il prima possibile.'}</p>
                </div>

                {formStatus === 'error' && (
                  <div className="p-4 border border-accent/40 text-accent text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                  </div>
                )}

                {formStatus === 'spam' && (
                  <div className="p-4 border border-accent/40 text-orange-400 text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Troppi messaggi. Riprova tra un minuto.
                  </div>
                )}

                <div className="hidden">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-accent text-xs uppercase tracking-wide">Nome</label>
                    <input name="name" required type="text" className={fieldClass} placeholder="Mario Rossi" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-accent text-xs uppercase tracking-wide">Telefono</label>
                    <input name="phone" required type="tel" className={fieldClass} placeholder="+39 ..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-accent text-xs uppercase tracking-wide">Data</label>
                    <input name="date" required type="date" className={fieldClass} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-accent text-xs uppercase tracking-wide">Persone</label>
                    <select name="guests" className={`${fieldClass} appearance-none cursor-pointer`}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n} className="bg-stone-900">
                          {n} {n === 1 ? 'persona' : 'persone'}
                        </option>
                      ))}
                      <option value="11+" className="bg-stone-900">11+ persone</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-accent text-xs uppercase tracking-wide">Messaggio</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border border-accent/40 focus:border-accent text-white p-4 focus:outline-none transition-colors placeholder:text-stone-600 font-light"
                    placeholder="Richieste particolari, intolleranze..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-accent hover:brightness-95 text-black font-semibold py-3.5 uppercase tracking-wide text-sm transition-[filter] flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    'Invio...'
                  ) : (
                    <>
                      Invia <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
