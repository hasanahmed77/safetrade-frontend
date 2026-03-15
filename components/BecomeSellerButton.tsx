'use client';

import { useState } from 'react';
import { upgradeToSeller } from '@/lib/api';
import { getToken, setUser } from '@/lib/auth';
import { useAuth } from '@/lib/useAuth';

export default function BecomeSellerButton() {
  const { user } = useAuth();
  const [status, setStatus] = useState('');

  const handleUpgrade = async () => {
    const token = getToken();
    if (!token) {
      window.location.href = '/auth/register?role=seller';
      return;
    }

    const confirmed = window.confirm('Switch to a seller account? This will update your role.');
    if (!confirmed) return;

    try {
      const result = await upgradeToSeller(token);
      setUser(result.user);
      setStatus('You are now a seller.');
      window.location.href = '/dashboard';
    } catch (error: any) {
      setStatus(error?.message ?? 'Unable to upgrade.');
    }
  };

  if (user?.role === 'seller') {
    return (
      <a className="btn-ghost" href="/dashboard">
        Seller dashboard
      </a>
    );
  }

  return (
    <div className="space-y-2">
      <button className="btn-ghost" onClick={handleUpgrade}>
        Become a seller
      </button>
      {status && <p className="text-xs text-white/60">{status}</p>}
    </div>
  );
}
