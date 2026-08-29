import { marked } from 'marked';
import DOMPurify from 'dompurify';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  html: string;
};

export type BlogPostMeta = Omit<BlogPost, 'content' | 'html'>;

// Static manifest of all blog posts.
// New posts are added by creating a markdown file in src/blog/posts/
// and adding an import + entry here.
import airFreightRaw from './posts/the-future-of-air-freight.md?raw';
import customsRaw from './posts/navigating-global-customs.md?raw';
import sustainableRaw from './posts/sustainable-logistics.md?raw';
import oceanFreightRaw from './posts/ocean-freight-market-outlook.md?raw';

const RAW_POSTS: Record<string, string> = {
  'the-future-of-air-freight': airFreightRaw,
  'navigating-global-customs': customsRaw,
  'sustainable-logistics': sustainableRaw,
  'ocean-freight-market-outlook': oceanFreightRaw,
};

function parseFrontmatter(raw: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    return { frontmatter: {}, body: raw };
  }
  const fmBlock = fmMatch[1];
  const body = fmMatch[2];
  const frontmatter: Record<string, string> = {};
  for (const line of fmBlock.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line
      .slice(idx + 1)
      .trim()
      .replace(/^"(.*)"$/, '$1');
    frontmatter[key] = val;
  }
  return { frontmatter, body };
}

const POSTS: BlogPost[] = Object.entries(RAW_POSTS).map(([slug, raw]) => {
  const { frontmatter, body } = parseFrontmatter(raw);
  const html = DOMPurify.sanitize(marked.parse(body, { async: false }) as string);
  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || '',
    author: frontmatter.author || 'Meridian Editorial Team',
    category: frontmatter.category || 'General',
    excerpt: frontmatter.excerpt || '',
    image: frontmatter.image || '',
    content: body,
    html,
  };
});

POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(): BlogPostMeta[] {
  return POSTS.map(({ content: _c, html: _h, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit)
    .map(({ content: _c, html: _h, ...meta }) => meta);
}
