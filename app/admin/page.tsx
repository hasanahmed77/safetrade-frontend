'use client';

import AuthGate from '@/components/AuthGate';
import { useEffect, useState } from 'react';
import { getAdminOrders, getAdminReturns, getAdminUsers } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [returnsCount, setReturnsCount] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    Promise.all([getAdminUsers(token), getAdminOrders(token), getAdminReturns(token)])
      .then(([users, orders, returns]) => {
        setUsersCount(users.length);
        setOrdersCount(orders.length);
        setReturnsCount(returns.filter((r) => r.status === 'pending').length);
      })
      .catch(() => setStatus('Unable to load admin stats.'));
  }, []);

  return (
    <AuthGate role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        {status && <p className="text-sm text-white/60">{status}</p>}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Users</p>
            <p className="mt-2 text-2xl font-semibold">{usersCount}</p>
          </div>
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Orders</p>
            <p className="mt-2 text-2xl font-semibold">{ordersCount}</p>
          </div>
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Returns</p>
            <p className="mt-2 text-2xl font-semibold text-ember">{returnsCount} pending</p>
          </div>
        </div>
        <div className="flex gap-4">
          <a className="btn-ghost" href="/admin/users">Manage users</a>
          <a className="btn-ghost" href="/admin/products">Manage products</a>
          <a className="btn-ghost" href="/admin/coupons">Manage coupons</a>
          <a className="btn-ghost" href="/admin/returns">Review returns</a>
        </div>
      </div>
    </AuthGate>
  );
}
