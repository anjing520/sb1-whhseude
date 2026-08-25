import { Zap, BadgeDollarSign, Layers, Award } from 'lucide-react';

const ADVANTAGES = [
  {
    icon: Zap,
    title: 'Fast Response',
    desc: 'A dedicated account team answers within hours, so your shipments never wait on paperwork or approvals.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Pricing',
    desc: 'Clear, all-in quotes with no hidden surcharges. You always know exactly what you are paying for.',
  },
  {
    icon: Layers,
    title: 'Flexible Solutions',
    desc: 'Routes, modes, and schedules tailored to your cargo, budget, and deadlines, not a one-size template.',
  },
  {
    icon: Award,
    title: 'Proven Expertise',
    desc: 'Decades of supply chain experience across industries, backed by a global network of trusted partners.',
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-24 bg-navy-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Why Meridian
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy-900">
            Built on trust, speed, and total reliability
          </h2>
          <p className="mt-4 text-lg text-navy-500 leading-relaxed">
            The advantages that keep global brands and growing businesses shipping
            with us, year after year.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((a) => (
            <div
              key={a.title}
              className="group rounded-2xl bg-white p-7 ring-1 ring-navy-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <span className="grid place-items-center h-14 w-14 rounded-2xl bg-navy-900 text-amber-400 shadow-md transition-colors group-hover:bg-amber-500 group-hover:text-navy-950">
                <a.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{a.title}</h3>
              <p className="mt-2.5 text-sm text-navy-500 leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
