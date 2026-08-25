import { ArrowRight, Phone } from 'lucide-react';

type BottomCTAProps = {
  onQuote: () => void;
};

export default function BottomCTA({ onQuote }: BottomCTAProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7519251/pexels-photo-7519251.jpeg?auto=compress&cs=tinysrgb&h=800&w=1920"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/85" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Ready to move your freight?
        </h2>
        <p className="mt-4 text-lg text-navy-200 leading-relaxed max-w-2xl mx-auto">
          Get a tailored quote in minutes, or talk to a logistics specialist about
          your supply chain. We are ready when you are.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onQuote}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-4 text-base font-bold text-navy-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all hover:-translate-y-0.5"
          >
            Get a Quote
            <ArrowRight className="h-5 w-5" />
          </button>
          <a
            href="tel:0085288552299"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur px-7 py-4 text-base font-bold text-white ring-1 ring-white/25 hover:bg-white/20 transition-all"
          >
            <Phone className="h-5 w-5" />
            00852-88552299
          </a>
        </div>
      </div>
    </section>
  );
}
