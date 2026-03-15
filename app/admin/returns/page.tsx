'use client';

import { useEffect, useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { getAdminReturns, updateReturnStatus } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { ReturnRequest } from '@/lib/types';

export default function ReturnsPage() {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in as admin to view returns.');
      return;
    }
    getAdminReturns(token)
      .then(setReturns)
      .catch(() => setStatus('Unable to load returns.'));
  }, []);

  const handleUpdate = async (returnItem: ReturnRequest, nextStatus: string) => {
    const token = getToken();
    if (!token) return;
    const updated = await updateReturnStatus(token, returnItem.id, nextStatus);
    setReturns((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  return (
    <AuthGate role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Return Requests</h1>
        {status && <p className="text-sm text-white/60">{status}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {returns.map((item) => {
            const resolved = item.status !== 'pending';
            return (
            <div
              key={item.id}
              className={`card space-y-2 ${resolved ? 'opacity-50' : ''}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.status}</p>
              <p className="text-sm text-white/60">Order #{item.order_id}</p>
              <p className="text-sm text-white/60">Product #{item.product_id}</p>
              <p className="text-sm text-white/70">{item.reason}</p>
              <div className="flex gap-2">
                <button className="btn-ghost" disabled={resolved} onClick={() => handleUpdate(item, 'approved')}>
                  Approve
                </button>
                <button className="btn-ghost" disabled={resolved} onClick={() => handleUpdate(item, 'rejected')}>
                  Reject
                </button>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </AuthGate>
  );
}
