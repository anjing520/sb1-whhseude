import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Meridian took over our Asia-to-Europe lane and cut our transit delays to almost zero. The visibility we get now is a game changer.',
    name: 'Daniel Osei',
    role: 'Operations Director, NordRetail',
    avatar:
      'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    quote:
      'Customs used to be our biggest headache. Their brokerage team handles everything and our shipments clear faster than ever.',
    name: 'Marcus Lee',
    role: 'Founder, BrightGoods',
    avatar:
      'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    quote:
      'Transparent pricing and a team that actually picks up the phone. Meridian feels like an extension of our own logistics department.',
    name: 'Adrian Cole',
    role: 'Supply Chain Lead, Vantage',
    avatar:
      'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
];

const PARTNERS = ['GlobalTrade', 'PortLink', 'SkyCargo', 'TransOcean', 'FreightCo'];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Trusted worldwide
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy-900">
            What our clients say
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-navy-50 p-7 ring-1 ring-navy-100 hover:shadow-lg transition-shadow"
            >
              <Quote className="h-8 w-8 text-amber-500" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-navy-700 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <div className="font-bold text-navy-900">{t.name}</div>
                  <div className="text-sm text-navy-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 border-t border-navy-100 pt-10">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-navy-400">
            Powering shipments for leading brands
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="text-xl font-extrabold text-navy-300 hover:text-navy-500 transition-colors"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
