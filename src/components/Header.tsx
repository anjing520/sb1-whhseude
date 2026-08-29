import { useEffect, useState } from 'react';
import { Menu, X, Phone, ChevronDown, Ship } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'Services',
    href: '#services',
    children: [
      { label: 'Air Freight', href: '#services' },
      { label: 'Ocean Freight', href: '#services' },
      { label: 'Customs Clearance', href: '#services' },
      { label: 'Warehousing', href: '#services' },
    ],
  },
  { label: 'Industries', href: '#advantages' },
  {
    label: 'Solutions',
    href: '#process',
    children: [
      { label: 'Supply Chain Management', href: '#process' },
      { label: 'E-commerce Fulfillment', href: '#process' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '#footer' },
];

type HeaderProps = {
  onQuote: () => void;
};

export default function Header({ onQuote }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="bg-navy-950 text-navy-100 text-sm hidden sm:block">
        <div className="mx-auto max-w-7xl px-6 h-10 flex items-center justify-end gap-6">
          <a
            href="#footer"
            className="hover:text-white transition-colors font-medium"
          >
            Contact Us
          </a>
          <a
            href="tel:0085288552299"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span className="tabular-nums">00852-88552299</span>
          </a>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg shadow-navy-950/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-amber-500 text-navy-950 shadow-md shadow-amber-500/30 transition-transform group-hover:-rotate-6">
              <Ship className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${
                scrolled ? 'text-navy-900' : 'text-white'
              }`}
            >
              Meridian<span className="text-amber-500">Logistics</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    scrolled
                      ? 'text-navy-700 hover:text-navy-950 hover:bg-navy-50'
                      : 'text-navy-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </a>
                {item.children && openMenu === item.label && (
                  <div className="absolute left-0 top-full pt-2 w-60 animate-fade-in">
                    <div className="rounded-xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-navy-100 p-2">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2.5 rounded-lg text-sm font-medium text-navy-700 hover:bg-navy-50 hover:text-navy-950 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onQuote}
              className="hidden sm:inline-flex items-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-navy-950 shadow-md shadow-amber-500/30 hover:bg-amber-400 transition-all hover:-translate-y-0.5"
            >
              Get a Quote
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-navy-100 animate-fade-in">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-semibold text-navy-800 hover:bg-navy-50"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="ml-4 border-l border-navy-100 pl-3">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-navy-600 hover:bg-navy-50"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onQuote();
              }}
              className="mt-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950"
            >
              Get a Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
