'use client';

import { useState } from 'react';
import { requestReturn } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function ReturnRequestPage() {
  const [orderId, setOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in to request a return.');
      return;
    }

    try {
      await requestReturn(token, {
        order_id: Number(orderId),
        product_id: Number(productId),
        reason
      });
      setStatus('Return request submitted.');
    } catch {
      setStatus('Unable to submit return.');
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-3xl font-semibold">Return request</h1>
      <div className="card space-y-4">
        <input
          className="input"
          placeholder="Order ID"
          value={orderId}
          onChange={(event) => setOrderId(event.target.value)}
        />
        <input
          className="input"
          placeholder="Product ID"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
        />
        <textarea
          className="input h-28"
          placeholder="Reason for return"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
        <button className="btn-primary" onClick={handleSubmit}>
          Submit request
        </button>
        {status && <p className="text-sm text-white/60">{status}</p>}
      </div>
    </div>
  );
}
