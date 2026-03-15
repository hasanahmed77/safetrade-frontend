'use client';

import { useEffect, useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { createCoupon, getAdminCoupons, updateCoupon } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { Coupon } from '@/lib/types';

export default function CouponManagementPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [status, setStatus] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiry, setExpiry] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in as admin to manage coupons.');
      return;
    }
    getAdminCoupons(token)
      .then(setCoupons)
      .catch(() => setStatus('Unable to load coupons.'));
  }, []);

  const handleCreate = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const created = await createCoupon(token, {
        code,
        discount_percentage: Number(discount),
        expiry_date: expiry,
        status: 'active'
      });
      setCoupons((prev) => [created, ...prev]);
      setCode('');
      setDiscount('');
      setExpiry('');
      setStatus('Coupon created.');
    } catch {
      setStatus('Unable to create coupon.');
    }
  };

  const handleToggle = async (coupon: Coupon) => {
    const token = getToken();
    if (!token) return;
    const nextStatus = coupon.status === 'active' ? 'disabled' : 'active';
    const updated = await updateCoupon(token, coupon.id, { status: nextStatus });
    setCoupons((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  return (
    <AuthGate role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Coupon Management</h1>
        <div className="card space-y-4">
          <input className="input" placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} />
          <input
            className="input"
            placeholder="Discount percentage"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input className="input" placeholder="Expiry date (YYYY-MM-DD)" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          <button className="btn-primary" onClick={handleCreate}>
            Create coupon
          </button>
          {status && <p className="text-sm text-white/60">{status}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="card space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{coupon.status}</p>
              <p className="text-lg font-semibold">{coupon.code}</p>
              <p className="text-sm text-white/60">{coupon.discount_percentage}% off</p>
              <p className="text-xs text-white/40">Expires {coupon.expiry_date}</p>
              <button className="btn-ghost" onClick={() => handleToggle(coupon)}>
                {coupon.status === 'active' ? 'Disable' : 'Enable'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AuthGate>
  );
}
