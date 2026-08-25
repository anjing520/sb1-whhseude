import { Plane, Ship, FileCheck2, Warehouse, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Plane,
    title: 'Air Freight',
    desc: 'Priority and economy air cargo with fast transit times for time-critical shipments across every major route.',
    image:
      'https://images.pexels.com/photos/9749472/pexels-photo-9749472.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Ship,
    title: 'Ocean Freight',
    desc: 'Cost-effective FCL and LCL sea freight with reliable schedules and full container tracking worldwide.',
    image:
      'https://images.pexels.com/photos/6572432/pexels-photo-6572432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: FileCheck2,
    title: 'Customs Clearance',
    desc: 'Expert brokerage that keeps your goods moving, handling documentation, duties, and compliance end to end.',
    image:
      'https://images.pexels.com/photos/11146455/pexels-photo-11146455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    desc: 'Flexible storage, inventory management, and fulfillment from strategically located distribution centers.',
    image:
      'https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-600">
            What we do
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy-900">
            Complete logistics services, one trusted partner
          </h2>
          <p className="mt-4 text-lg text-navy-500 leading-relaxed">
            From the factory floor to the final mile, we move your freight across
            air, sea, and land with total visibility at every step.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl bg-navy-900 ring-1 ring-navy-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <span className="absolute top-4 left-4 grid place-items-center h-11 w-11 rounded-xl bg-amber-500 text-navy-950 shadow-lg">
                  <s.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-amber-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
                <p className="mt-2.5 text-sm text-navy-200 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
