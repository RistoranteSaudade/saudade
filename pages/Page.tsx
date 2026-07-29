import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageBySlug, SanityPage } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import SectionRenderer from '../components/sections/SectionRenderer';
import NotFound from './NotFound';
import Seo from '../components/Seo';

const Page: React.FC = () => {
  const { slug = '' } = useParams();
  const [page, setPage] = useState<SanityPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPageBySlug(slug)
      .then(setPage)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-secondary" />;

  if (!page) {
    return <NotFound message="Questa pagina non esiste." />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Seo
        title={`${page.seo?.metaTitle || page.title} | Saudade`}
        description={page.seo?.metaDescription || `${page.title} | Saudade, ristorante brasiliano a Torino.`}
        path={`/${slug}`}
        image={page.seo?.ogImage ? urlFor(page.seo.ogImage).width(1200).url() : undefined}
      />
      <SectionRenderer sections={page.sections} />
    </div>
  );
};

export default Page;
