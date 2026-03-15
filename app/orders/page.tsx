'use client';

import { useEffect, useState } from 'react';
import { getOrders, getReturns, requestReturn } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { Order } from '@/lib/types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState('');
  const [returns, setReturns] = useState<Record<string, { status: string }>>({});

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Please sign in to view orders.');
      return;
    }

    Promise.all([getOrders(token), getReturns(token)])
      .then(([ordersData, returnsData]) => {
        setOrders(ordersData);
        const map: Record<string, { status: string }> = {};
        returnsData.forEach((ret) => {
          map[`${ret.order_id}-${ret.product_id}`] = { status: ret.status };
        });
        setReturns(map);
      })
      .catch(() => setStatus('Unable to load orders.'));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Order History</h1>
      {status && <p className="text-sm text-white/60">{status}</p>}
      {orders.length === 0 && !status && <p className="text-white/50">No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">Order #{order.id}</p>
              <p className="text-sm text-neon">${order.total_amount}</p>
            </div>
            <p className="mt-2 text-sm text-white/50">Status: {order.status}</p>
            <div className="mt-4 space-y-2">
              {order.items?.map((item) => {
                const key = `${order.id}-${item.product?.id}`;
                const existing = returns[key];
                return (
                <div key={item.id} className="flex items-center justify-between text-sm text-white/60">
                  <span>{item.product?.title}</span>
                  {existing ? (
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                      Return {existing.status}
                    </span>
                  ) : (
                    <button
                      className="btn-ghost"
                      onClick={async () => {
                        const token = getToken();
                        if (!token) return;
                        const reason = window.prompt('Return reason?');
                        if (!reason) return;
                        try {
                          const created = await requestReturn(token, {
                            order_id: order.id,
                            product_id: item.product?.id,
                            reason
                          });
                          setReturns((prev) => ({
                            ...prev,
                            [key]: { status: created.status ?? 'pending' }
                          }));
                          setStatus('Return request submitted.');
                        } catch (error: any) {
                          setStatus(error?.message ?? 'Unable to submit return.');
                        }
                      }}
                    >
                      Return
                    </button>
                  )}
                </div>
                );
              })}
            </div>
            <a href={`/orders/${order.id}`} className="btn-ghost mt-4 inline-flex">
              View invoice
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
