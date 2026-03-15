'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function AddToCartButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in to add items.');
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
    <div className="space-y-2">
      <button
        className={`btn-primary transition ${added ? 'scale-105 shadow-glow' : ''}`}
        onClick={handleAdd}
        aria-label="Add to cart"
        title="Add to cart"
        disabled={added}
      >
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
      </button>
    </div>
  );
}
