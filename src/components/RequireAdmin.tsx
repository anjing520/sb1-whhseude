import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';

type Props = {
  children: ReactNode;
};

export default function RequireAdmin({ children }: Props) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-navy-50">
        <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/signin" replace />;
  }

  if (role !== 'admin') {
    return (
      <div className="min-h-screen grid place-items-center bg-navy-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-extrabold text-navy-900">Admin access required</h1>
          <p className="mt-3 text-navy-500 leading-relaxed">
            Your account does not have admin permissions. Please contact your
            database administrator to be promoted, then refresh this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
