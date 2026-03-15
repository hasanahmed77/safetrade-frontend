'use client';

import { useAuth } from '@/lib/useAuth';

type Props = {
  role?: 'buyer' | 'seller' | 'admin';
  children: React.ReactNode;
};

export default function AuthGate({ role, children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="card">Checking access…</div>;
  }

  if (!user) {
    return (
      <div className="card">
        You must be signed in to view this page.
      </div>
    );
  }

  if (role && user.role !== role) {
    return (
      <div className="card">
        Access denied. This page is for {role} accounts only.
      </div>
    );
  }

  return <>{children}</>;
}
