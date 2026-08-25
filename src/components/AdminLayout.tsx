import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ship, LayoutGrid, LogOut, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/signin');
  };

  return (
    <div className="min-h-screen bg-navy-50 flex">
      <aside className="hidden md:flex w-60 flex-col bg-navy-950 text-navy-200 sticky top-0 h-screen">
        <div className="p-5 flex items-center gap-2.5">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-amber-500 text-navy-950">
            <Ship className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-extrabold text-white">
            Meridian<span className="text-amber-500">Admin</span>
          </span>
        </div>

        <nav className="flex-1 px-3 py-2">
          <Link
            to="/admin/quote-requests"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-100 hover:bg-white/10 transition-colors"
          >
            <LayoutGrid className="h-5 w-5" />
            Quote Requests
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <a
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to site
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
          {user && (
            <p className="mt-3 px-3 text-xs text-navy-500 truncate">{user.email}</p>
          )}
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden bg-navy-950 px-4 py-3 flex items-center justify-between">
          <span className="font-extrabold text-white text-sm">
            Meridian<span className="text-amber-500">Admin</span>
          </span>
          <button onClick={handleSignOut} className="text-navy-200 p-1.5">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
        <main className="p-6 sm:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
