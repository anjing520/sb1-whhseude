import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type Role = 'member' | 'admin' | 'unknown';

type AuthState = {
  session: Session | null;
  user: User | null;
  role: Role;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({
  session: null,
  user: null,
  role: 'unknown',
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    role: 'unknown',
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    const applySession = async (session: Session | null) => {
      if (!mounted) return;
      if (!session) {
        setState({ session: null, user: null, role: 'unknown', loading: false });
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!mounted) return;
      setState({
        session,
        user: session.user,
        role: data?.role === 'admin' ? 'admin' : 'member',
        loading: false,
      });
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        await applySession(session);
      })();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
