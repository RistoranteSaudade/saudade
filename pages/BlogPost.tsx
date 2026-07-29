import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug, SanityPost } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import PortableTextRenderer from '../components/sections/PortableTextRenderer';
import NotFound from './NotFound';

const BlogPost: React.FC = () => {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPostBySlug(slug)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-secondary" />;

  if (!post) {
    return <NotFound message="Questo articolo non esiste." />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <title>{post.title} | Saudade</title>
      {post.excerpt && <meta name="description" content={post.excerpt} />}
      {post.coverImage && (
        <div className="h-[45vh] relative overflow-hidden">
          <img
            src={urlFor(post.coverImage).width(1920).url()}
            alt={post.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-accent text-xs mb-4">
          {new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-10">{post.title}</h1>
        <div className="text-white font-light">
          <PortableTextRenderer value={post.body} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
