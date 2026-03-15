'use client';

import { useEffect, useState } from 'react';
import { getInvoice } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Params = { id: string };

export default function OrderInvoicePage({ params }: { params: Params | Promise<Params> }) {
  const [invoice, setInvoice] = useState<any>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const token = getToken();
      if (!token) {
        setStatus('Please sign in to view invoice.');
        return;
      }

      const resolved = await params;
      const orderId = Number(resolved.id);
      if (Number.isNaN(orderId)) {
        setStatus('Invalid order id.');
        return;
      }

      getInvoice(token, orderId)
        .then(setInvoice)
        .catch((error) => setStatus(error?.message ?? 'Unable to load invoice.'));
    };

    load();
  }, [params]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Invoice</h1>
      {status && <p className="text-sm text-white/60">{status}</p>}
      {invoice && (
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Invoice {invoice.invoice_id}</h2>
          <p className="text-sm text-white/60">Order #{invoice.order_id}</p>
          <p className="text-sm text-white/60">Payment status: {invoice.payment_status}</p>
          <ul className="space-y-2 text-sm text-white/70">
            {invoice.items.map((item: any, index: number) => (
              <li key={index} className="flex justify-between">
                <span>{item.product}</span>
                <span>${item.line_total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-white/10 pt-3 text-sm">
            <span>Total</span>
            <span className="text-neon">${invoice.total_amount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
