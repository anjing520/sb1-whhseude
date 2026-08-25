import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Ship, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Mode = 'signin' | 'signup';

type Props = {
  mode: Mode;
};

export default function AuthPage({ mode }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSignup = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          navigate('/admin/signin');
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
      navigate('/admin/quote-requests');
    } catch {
      setError('Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-navy-950 px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-amber-500 text-navy-950">
            <Ship className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="text-xl font-extrabold text-white">
            Meridian<span className="text-amber-500">Logistics</span>
          </span>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-2xl">
          <h1 className="text-xl font-extrabold text-navy-900">
            {isSignup ? 'Create admin account' : 'Admin sign in'}
          </h1>
          <p className="mt-1.5 text-sm text-navy-500">
            {isSignup
              ? 'Sign up, then request admin access from your database admin.'
              : 'Sign in to manage quote requests.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-semibold text-navy-700 mb-1.5">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none transition"
                placeholder="admin@meridianlogistics.com"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block text-sm font-semibold text-navy-700 mb-1.5">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-navy-950 shadow-md shadow-amber-500/30 hover:bg-amber-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {isSignup ? 'Creating account...' : 'Signing in...'}
                </>
              ) : isSignup ? (
                'Create account'
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-navy-500">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <Link to="/admin/signin" className="font-semibold text-amber-600 hover:text-amber-700">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Need an account?{' '}
                <Link to="/admin/signup" className="font-semibold text-amber-600 hover:text-amber-700">
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-navy-400">
          <Link to="/" className="hover:text-white transition-colors">Back to site</Link>
        </p>
      </div>
    </div>
  );
}
