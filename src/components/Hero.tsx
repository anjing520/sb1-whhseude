import { ArrowRight, PackageSearch, Globe2, ShieldCheck } from 'lucide-react';

type HeroProps = {
  onQuote: () => void;
};

const STATS = [
  { value: '120+', label: 'Countries served' },
  { value: '15K+', label: 'Shipments monthly' },
  { value: '99.4%', label: 'On-time delivery' },
];

export default function Hero({ onQuote }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2231744/pexels-photo-2231744.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
          alt="Aerial view of a cargo ship loaded with containers at port"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-900/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-semibold text-amber-300 ring-1 ring-white/15 animate-fade-in">
            <Globe2 className="h-4 w-4" />
            Global freight, moved with precision
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight animate-fade-up">
            Your cargo, delivered
            <span className="text-amber-400"> anywhere, on time.</span>
          </h1>
          <p
            className="mt-6 text-lg text-navy-100 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Meridian Logistics connects your business to the world with reliable
            air, ocean, and ground freight, seamless customs clearance, and
            smart warehousing built around your supply chain.
          </p>

          <div
            className="mt-9 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <button
              onClick={onQuote}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-4 text-base font-bold text-navy-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all hover:-translate-y-0.5"
            >
              Get a Quote
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur px-7 py-4 text-base font-bold text-white ring-1 ring-white/25 hover:bg-white/20 transition-all"
            >
              <PackageSearch className="h-5 w-5" />
              Track Shipment
            </a>
          </div>

          <div
            className="mt-14 grid grid-cols-3 gap-6 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="mt-1 text-sm text-navy-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden xl:flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-5 py-4 shadow-xl animate-fade-in">
        <span className="grid place-items-center h-11 w-11 rounded-xl bg-navy-900 text-amber-400">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div>
          <div className="text-sm font-bold text-navy-900">Fully insured freight</div>
          <div className="text-xs text-navy-500">End-to-end cargo protection</div>
        </div>
      </div>
    </section>
  );
}
