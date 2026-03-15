'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { addToCart } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function AddToCartQuick({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    const token = getToken();
    if (!token) {
      window.location.href = '/auth/login';
      return;
    }
    try {
      await addToCart(token, productId, 1);
      setAdded(true);
    } catch {
      setAdded(false);
    }
  };

  return (
    <button
      className={`btn-primary transition ${added ? 'scale-105 shadow-glow' : ''}`}
      onClick={handleAdd}
      aria-label="Add to cart"
      title="Add to cart"
      disabled={added}
    >
      {added ? <Check size={16} /> : <Plus size={16} />}
    </button>
  );
}
