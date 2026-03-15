'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getCart, removeFromCart } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { Cart } from '@/lib/types';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Please sign in to view your cart.');
      return;
    }

    getCart(token)
      .then(setCart)
      .catch(() => setStatus('Unable to load cart.'));
  }, []);

  const handleRemove = async (itemId: number) => {
    const token = getToken();
    if (!token) return;
    const updated = await removeFromCart(token, itemId);
    setCart(updated);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Your Cart</h1>
      {status && <p className="text-sm text-white/60">{status}</p>}
      {cart && cart.items.length === 0 && <p className="text-white/50">Cart is empty.</p>}
      {cart && cart.items.length > 0 && (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="card flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">{item.product.category}</p>
                <p className="text-lg font-semibold">{item.product.title}</p>
                <p className="text-sm text-white/50">Qty {item.quantity}</p>
              </div>
              <button className="btn-ghost" aria-label="Remove item" title="Remove item" onClick={() => handleRemove(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <a href="/checkout" className="btn-primary w-full text-center">
            Proceed to checkout
          </a>
        </div>
      )}
    </div>
  );
}
