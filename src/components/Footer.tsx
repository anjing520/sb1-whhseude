import { Ship, Phone, Mail, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

const LINKS = {
  Services: ['Air Freight', 'Ocean Freight', 'Customs Clearance', 'Warehousing'],
  Company: ['About Us', 'Industries', 'Blog', 'Careers'],
  Support: ['Track Shipment', 'Get a Quote', 'Contact', 'FAQ'],
};

const SOCIAL = [Linkedin, Facebook, Twitter];

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy-950 text-navy-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-amber-500 text-navy-950">
                <Ship className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <span className="text-xl font-extrabold text-white">
                Meridian<span className="text-amber-500">Logistics</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed max-w-sm">
              Connecting businesses to the world with reliable air, ocean, and
              ground freight, customs clearance, and smart warehousing since 2008.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-400" />
                <a href="tel:0085288552299" className="hover:text-white transition-colors">
                  00852-88552299
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-400" />
                <a href="mailto:hello@meridianlogistics.com" className="hover:text-white transition-colors">
                  hello@meridianlogistics.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Unit 12, Kwai Chung Logistics Park, Hong Kong</span>
              </div>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {title}
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#home" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Meridian Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL.map((Icon, i) => (
              <a
                key={i}
                href="#home"
                className="grid place-items-center h-10 w-10 rounded-lg bg-white/5 text-navy-200 hover:bg-amber-500 hover:text-navy-950 transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
