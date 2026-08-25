import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  Building2,
  MapPin,
  Plane,
  Calendar,
  MessageSquare,
  Check,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Request = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  origin: string | null;
  destination: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ['new', 'reviewed', 'contacted', 'archived'];

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-100 text-amber-700 ring-amber-200',
  reviewed: 'bg-blue-100 text-blue-700 ring-blue-200',
  contacted: 'bg-green-100 text-green-700 ring-green-200',
  archived: 'bg-navy-100 text-navy-600 ring-navy-200',
};

export default function AdminQuoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [record, setRecord] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('new');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    (async () => {
      setLoading(true);
      setError('');
      const { data, error: queryError } = await supabase
        .from('quote_requests')
        .select(
          'id, name, email, phone, company, service, origin, destination, message, status, created_at',
        )
        .eq('id', id)
        .maybeSingle();

      if (!active) return;
      if (queryError || !data) {
        setError('Could not load this request.');
        console.error(queryError);
      } else {
        setRecord(data as Request);
        setStatus((data as Request).status);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const updateStatus = async (next: string) => {
    if (!record || saving) return;
    setSaving(true);
    setSaved(false);
    const { error: updateError } = await supabase
      .from('quote_requests')
      .update({ status: next })
      .eq('id', record.id);

    setSaving(false);
    if (updateError) {
      setError('Could not update status.');
      console.error(updateError);
      return;
    }
    setStatus(next);
    setRecord({ ...record, status: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div>
        <Link
          to="/admin/quote-requests"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to list
        </Link>
        <div className="mt-6 flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error || 'Request not found.'}</span>
        </div>
      </div>
    );
  }

  const fields = [
    { icon: Mail, label: 'Email', value: record.email },
    { icon: Phone, label: 'Phone', value: record.phone || '—' },
    { icon: Building2, label: 'Company', value: record.company || '—' },
    { icon: Plane, label: 'Service', value: record.service },
    { icon: MapPin, label: 'Origin', value: record.origin || '—' },
    { icon: MapPin, label: 'Destination', value: record.destination || '—' },
    { icon: Calendar, label: 'Received', value: formatDate(record.created_at) },
  ];

  return (
    <div>
      <Link
        to="/admin/quote-requests"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to list
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-navy-100 shadow-sm">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl font-extrabold text-navy-900">{record.name}</h1>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
                STATUS_STYLES[record.status] ?? STATUS_STYLES.new
              }`}
            >
              {record.status}
            </span>
          </div>

          <dl className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
                  <f.icon className="h-3.5 w-3.5" />
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-sm text-navy-800 break-words">{f.value}</dd>
              </div>
            ))}
          </dl>

          {record.message && (
            <div className="mt-8 border-t border-navy-100 pt-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
                <MessageSquare className="h-3.5 w-3.5" />
                Shipment details
              </div>
              <p className="mt-2 text-sm text-navy-800 leading-relaxed whitespace-pre-wrap">
                {record.message}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-navy-100 shadow-sm h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-500">
            Update status
          </h2>
          <div className="mt-4 space-y-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={saving}
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-60 ${
                  status === s
                    ? 'bg-navy-900 text-white'
                    : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                }`}
              >
                <span className="capitalize">{s}</span>
                {status === s && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
          {saving && (
            <p className="mt-3 text-xs text-navy-400 flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
            </p>
          )}
          {saved && !saving && (
            <p className="mt-3 text-xs text-green-600 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" /> Status updated
            </p>
          )}
          {error && (
            <p className="mt-3 text-xs text-red-600 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" /> {error}
            </p>
          )}

          <button
            onClick={() => navigate('/admin/quote-requests')}
            className="mt-6 w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
          >
            Back to all requests
          </button>
        </div>
      </div>
    </div>
  );
}
