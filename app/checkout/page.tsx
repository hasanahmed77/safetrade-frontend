'use client';

import { useState } from 'react';
import { checkout, getInvoice } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState('');
  const [status, setStatus] = useState('');
  const [invoice, setInvoice] = useState<any>(null);

  const handleCheckout = async () => {
    const token = getToken();
    if (!token) {
      setStatus('Please sign in before checkout.');
      return;
    }

    try {
      const result = await checkout(token, coupon || undefined);
      setStatus('Payment captured. Invoice generated.');
      const invoiceData = await getInvoice(token, result.order.id);
      setInvoice(invoiceData);
    } catch {
      setStatus('Checkout failed.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <div className="card space-y-4">
        <label className="text-sm text-white/60">Discount coupon</label>
        <input
          className="input"
          value={coupon}
          onChange={(event) => setCoupon(event.target.value)}
          placeholder="Enter coupon code"
        />
        <button className="btn-primary" onClick={handleCheckout}>
          Complete purchase
        </button>
        {status && <p className="text-sm text-white/60">{status}</p>}
      </div>
      {invoice && (
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Invoice {invoice.invoice_id}</h2>
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
