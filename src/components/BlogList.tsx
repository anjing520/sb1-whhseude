import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Ship } from 'lucide-react';
import { getAllPosts } from '@/blog/blogLoader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type BlogListProps = {
  onQuote: () => void;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogList({ onQuote }: BlogListProps) {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white">
      <Header onQuote={onQuote} />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-bold uppercase tracking-widest text-amber-600">
              Meridian Blog
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
              Insights for global shippers
            </h1>
            <p className="mt-4 text-lg text-navy-500 leading-relaxed">
              Expert analysis, industry trends, and practical guidance on air
              freight, ocean shipping, customs, and the future of logistics.
            </p>
          </div>

          {featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="group mt-14 grid lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-navy-50 ring-1 ring-navy-100 hover:shadow-xl transition-all"
            >
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-navy-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl lg:text-3xl font-extrabold text-navy-900 group-hover:text-amber-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-navy-500 leading-relaxed">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-600">
                  Read article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-navy-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-navy-700">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-navy-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </div>
                    <h3 className="mt-2.5 text-lg font-bold text-navy-900 group-hover:text-amber-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-500 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-amber-600">
                      Read more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className="mt-20 text-center">
              <span className="grid place-items-center h-16 w-16 mx-auto rounded-2xl bg-navy-50 text-navy-300">
                <Ship className="h-8 w-8" />
              </span>
              <p className="mt-5 text-navy-500">No articles have been published yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
