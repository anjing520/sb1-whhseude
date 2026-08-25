import { ClipboardList, Truck, FileCheck2, PackageCheck } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Submit Requirements',
    desc: 'Tell us what you are shipping, where it needs to go, and when. We reply with a clear, tailored plan.',
  },
  {
    icon: Truck,
    step: '02',
    title: 'Arrange Transportation',
    desc: 'We book the optimal route and mode, coordinate pickup, and load your cargo for its journey.',
  },
  {
    icon: FileCheck2,
    step: '03',
    title: 'Customs & Tracking',
    desc: 'Our brokers handle clearance and compliance while you follow every milestone in real time.',
  },
  {
    icon: PackageCheck,
    step: '04',
    title: 'Delivery',
    desc: 'Your shipment arrives safely at its destination, on schedule, with proof of delivery confirmed.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-400">
            How it works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            A simple, four-step shipping process
          </h2>
          <p className="mt-4 text-lg text-navy-200 leading-relaxed">
            No confusion, no surprises. Here is exactly how we move your freight
            from request to delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-16 right-0 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
              )}
              <div className="relative flex items-center gap-4">
                <span className="grid place-items-center h-14 w-14 shrink-0 rounded-2xl bg-amber-500 text-navy-950 shadow-lg shadow-amber-500/20">
                  <s.icon className="h-7 w-7" />
                </span>
                <span className="text-5xl font-extrabold text-white/10">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2.5 text-sm text-navy-300 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
