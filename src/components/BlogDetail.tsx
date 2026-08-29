import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '@/blog/blogLoader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type BlogDetailProps = {
  onQuote: () => void;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogDetail({ onQuote }: BlogDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header onQuote={onQuote} />
        <main className="pt-40 pb-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h1 className="text-3xl font-extrabold text-navy-900">Article not found</h1>
            <p className="mt-4 text-navy-500">
              The article you are looking for may have been moved or removed.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-white hover:bg-navy-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-white">
      <Header onQuote={onQuote} />
      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-navy-500">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-navy-500">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-5 text-lg text-navy-500 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-5xl px-6">
          <div className="rounded-2xl overflow-hidden max-h-[480px]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-10 mx-auto max-w-3xl px-6">
          <div
            className="prose prose-lg prose-navy max-w-none prose-headings:font-extrabold prose-headings:text-navy-900 prose-a:text-amber-600 prose-strong:text-navy-800 prose-blockquote:border-amber-400 prose-blockquote:text-navy-600"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-12 rounded-2xl bg-navy-50 p-8 text-center ring-1 ring-navy-100">
            <h3 className="text-xl font-extrabold text-navy-900">
              Need help with your shipments?
            </h3>
            <p className="mt-2 text-navy-500">
              Get a tailored quote in minutes — our logistics team is ready to help.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-navy-950 shadow-md shadow-amber-500/30 hover:bg-amber-400 transition-all"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-navy-100 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-extrabold text-navy-900">Related articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ring-navy-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-bold text-amber-600">{r.category}</span>
                    <h3 className="mt-1.5 text-base font-bold text-navy-900 group-hover:text-amber-600 transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-500 leading-relaxed flex-1 line-clamp-2">
                      {r.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
