import { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, Ship } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/api/quote-requests`;

const API_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};
if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
  API_HEADERS['Authorization'] = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
  API_HEADERS['apikey'] = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

type QuoteModalProps = {
  open: boolean;
  onClose: () => void;
};

const SERVICES = [
  'Air Freight',
  'Ocean Freight',
  'Customs Clearance',
  'Warehousing',
  'Other',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: SERVICES[0],
  origin: '',
  destination: '',
  message: '',
};

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');

    let serverError = '';
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          service: form.service,
          origin: form.origin.trim(),
          destination: form.destination.trim(),
          message: form.message.trim(),
        }),
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        serverError =
          typeof data.error === 'string'
            ? data.error
            : 'Some details were missing or invalid. Please check your form.';
      } else {
        serverError = 'Something went wrong sending your request. Please try again.';
      }
    } catch {
      serverError = 'Network error. Please check your connection and try again.';
    }

    setStatus('error');
    setErrorMsg(serverError);
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setForm(EMPTY);
      setStatus('idle');
      setErrorMsg('');
    }, 200);
  };

  const inputClass =
    'w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none transition';
  const labelClass = 'block text-sm font-semibold text-navy-700 mb-1.5';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-fade-up">
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="p-10 text-center">
            <span className="grid place-items-center h-16 w-16 mx-auto rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold text-navy-900">
              Request received
            </h3>
            <p className="mt-3 text-navy-500 leading-relaxed">
              Thanks, {form.name.split(' ')[0] || 'there'}. Our team will review
              your shipment details and get back to you with a tailored quote
              shortly.
            </p>
            <button
              onClick={close}
              className="mt-7 rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-white hover:bg-navy-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-7 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-amber-500 text-navy-950">
                <Ship className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-navy-900">
                  Get a Quote
                </h3>
                <p className="text-sm text-navy-500">
                  Tell us about your shipment and we will be in touch.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="q-name">
                    Full name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="q-name"
                    required
                    value={form.name}
                    onChange={update('name')}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="q-email">
                    Email <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="q-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass}
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="q-phone">
                    Phone
                  </label>
                  <input
                    id="q-phone"
                    value={form.phone}
                    onChange={update('phone')}
                    className={inputClass}
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="q-company">
                    Company
                  </label>
                  <input
                    id="q-company"
                    value={form.company}
                    onChange={update('company')}
                    className={inputClass}
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="q-service">
                  Service needed <span className="text-amber-600">*</span>
                </label>
                <select
                  id="q-service"
                  value={form.service}
                  onChange={update('service')}
                  className={inputClass}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="q-origin">
                    Origin
                  </label>
                  <input
                    id="q-origin"
                    value={form.origin}
                    onChange={update('origin')}
                    className={inputClass}
                    placeholder="Shanghai, CN"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="q-destination">
                    Destination
                  </label>
                  <input
                    id="q-destination"
                    value={form.destination}
                    onChange={update('destination')}
                    className={inputClass}
                    placeholder="Rotterdam, NL"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="q-message">
                  Shipment details
                </label>
                <textarea
                  id="q-message"
                  rows={3}
                  value={form.message}
                  onChange={update('message')}
                  className={`${inputClass} resize-none`}
                  placeholder="Cargo type, weight, dimensions, timeline..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-bold text-navy-950 shadow-md shadow-amber-500/30 hover:bg-amber-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Request My Quote'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
