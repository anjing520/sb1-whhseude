import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown, ChevronUp, ChevronDown, Inbox, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type SortKey = 'name' | 'email' | 'company' | 'service' | 'origin' | 'destination' | 'created_at';
type SortDir = 'asc' | 'desc';

type QuoteRequest = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  origin: string | null;
  destination: string | null;
  status: string;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-100 text-amber-700 ring-amber-200',
  reviewed: 'bg-blue-100 text-blue-700 ring-blue-200',
  contacted: 'bg-green-100 text-green-700 ring-green-200',
  archived: 'bg-navy-100 text-navy-600 ring-navy-200',
};

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'service', label: 'Service' },
  { key: 'origin', label: 'Origin' },
  { key: 'destination', label: 'Destination' },
  { key: 'created_at', label: 'Received' },
];

export default function AdminQuoteList() {
  const [rows, setRows] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError('');
      const { data, error: queryError } = await supabase
        .from('quote_requests')
        .select('id, name, email, company, service, origin, destination, status, created_at')
        .order('created_at', { ascending: false });

      if (!active) return;
      if (queryError) {
        setError('Could not load quote requests.');
        console.error(queryError);
      } else {
        setRows((data ?? []) as QuoteRequest[]);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      if (sortKey === 'created_at') {
        const at = new Date(av as string).getTime();
        const bt = new Date(bv as string).getTime();
        return sortDir === 'asc' ? at - bt : bt - at;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Quote Requests</h1>
          <p className="mt-1 text-sm text-navy-500">
            {loading ? 'Loading…' : `${rows.length} request${rows.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-12 grid place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
        </div>
      ) : error ? (
        <div className="mt-12 flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-12 text-center">
          <Inbox className="h-12 w-12 mx-auto text-navy-300" />
          <p className="mt-4 text-navy-500">No quote requests yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden md:block overflow-hidden rounded-2xl bg-white ring-1 ring-navy-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-50 text-navy-600">
                    <th className="px-4 py-3 text-left font-semibold w-20">Status</th>
                    {COLUMNS.map((col) => (
                      <th key={col.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="inline-flex items-center gap-1 hover:text-navy-900 transition-colors"
                        >
                          {col.label}
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )
                          ) : (
                            <ArrowUpDown className="h-3 w-3 text-navy-300" />
                          )}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {sorted.map((r) => (
                    <tr key={r.id} className="hover:bg-navy-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
                            STATUS_STYLES[r.status] ?? STATUS_STYLES.new
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-navy-900 whitespace-nowrap">
                        <Link
                          to={`/admin/quote-requests/${r.id}`}
                          className="hover:text-amber-600 transition-colors"
                        >
                          {r.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-navy-600 whitespace-nowrap">{r.email}</td>
                      <td className="px-4 py-3 text-navy-600 whitespace-nowrap">{r.company || '—'}</td>
                      <td className="px-4 py-3 text-navy-600 whitespace-nowrap">{r.service}</td>
                      <td className="px-4 py-3 text-navy-600 whitespace-nowrap">{r.origin || '—'}</td>
                      <td className="px-4 py-3 text-navy-600 whitespace-nowrap">{r.destination || '—'}</td>
                      <td className="px-4 py-3 text-navy-500 whitespace-nowrap tabular-nums">
                        {formatDate(r.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="mt-6 md:hidden space-y-3">
            {sorted.map((r) => (
              <Link
                key={r.id}
                to={`/admin/quote-requests/${r.id}`}
                className="block rounded-xl bg-white p-4 ring-1 ring-navy-100 shadow-sm active:bg-navy-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-navy-900">{r.name}</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
                      STATUS_STYLES[r.status] ?? STATUS_STYLES.new
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-navy-500">{r.email}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-600">
                  <span>{r.service}</span>
                  {r.company && <span>· {r.company}</span>}
                  <span>· {formatDate(r.created_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
