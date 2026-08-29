import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, User, FileText } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/blog/blogLoader';
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

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogDetail({ onQuote }: BlogDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const allPosts = getAllPosts();

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

  return (
    <div className="min-h-screen bg-white">
      <Header onQuote={onQuote} />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Left sidebar: article list */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl bg-navy-50 ring-1 ring-navy-100 p-5">
                <div className="flex items-center gap-2 px-1 pb-3 border-b border-navy-100">
                  <FileText className="h-4 w-4 text-amber-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-navy-700">
                    All Articles
                  </h2>
                </div>
                <ul className="mt-3 space-y-1">
                  {allPosts.map((p) => {
                    const active = p.slug === post.slug;
                    return (
                      <li key={p.slug}>
                        <Link
                          to={`/blog/${p.slug}`}
                          className={`block rounded-lg px-3 py-3 transition-colors ${
                            active
                              ? 'bg-navy-900 text-white'
                              : 'hover:bg-navy-100 text-navy-700'
                          }`}
                        >
                          <div className={`text-sm font-bold leading-snug ${active ? 'text-white' : 'text-navy-900'}`}>
                            {p.title}
                          </div>
                          <div className={`mt-1 flex items-center gap-2 text-xs ${active ? 'text-navy-200' : 'text-navy-400'}`}>
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-700">
                              {p.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDateShort(p.date)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Right: article detail */}
            <article className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
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

              <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="mt-5 text-lg text-navy-500 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-7 rounded-2xl overflow-hidden max-h-[420px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="prose prose-lg prose-navy mt-10 max-w-none prose-headings:font-extrabold prose-headings:text-navy-900 prose-a:text-amber-600 prose-strong:text-navy-800 prose-blockquote:border-amber-400 prose-blockquote:text-navy-600"
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
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}