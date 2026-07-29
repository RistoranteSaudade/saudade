import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogPage, fetchPosts, SanityPost, type SanityBlogPage } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import Seo from '../components/Seo';

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<SanityBlogPage | null>(null);

  useEffect(() => {
    if (SANITY_ENABLED) {
      fetchBlogPage()
        .then(setPage)
        .catch(console.error);
    }
    fetchPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <Seo
        title="Blog | Saudade"
        description="Novità, eventi e storie dal ristorante brasiliano Saudade a Torino."
        path="/blog"
      />
      <div className="h-[45vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 font-serif text-6xl md:text-7xl text-white pt-16">
          {page?.title || 'Novità'}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {!loading && posts.length === 0 && (
          <p className="text-stone-400 text-center">{page?.emptyState || 'Nessun articolo pubblicato al momento.'}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {posts.map(post => (
            <Link key={post._id} to={`/blog/${post.slug}`} className="group block">
              {post.coverImage && (
                <img
                  src={urlFor(post.coverImage).width(800).height(500).fit('crop').url()}
                  alt={post.title}
                  className="w-full h-52 object-cover mb-4"
                />
              )}
              <p className="text-accent text-xs mb-2">
                {new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h2 className="font-serif text-2xl text-white group-hover:text-accent transition-colors mb-2">
                {post.title}
              </h2>
              {post.excerpt && <p className="text-stone-400 font-light text-sm">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
