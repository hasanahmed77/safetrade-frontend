'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import AuthGate from '@/components/AuthGate';
import { deleteAdminProduct, getAdminProducts } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { Product } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in as admin to manage products.');
      return;
    }

    getAdminProducts(token)
      .then(setProducts)
      .catch(() => setStatus('Unable to load products.'));
  }, []);

  const handleDelete = async (product: Product) => {
    const token = getToken();
    if (!token) return;
    const confirmed = window.confirm(`Delete ${product.title}? This cannot be undone.`);
    if (!confirmed) return;
    await deleteAdminProduct(token, product.id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <AuthGate role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Product Management</h1>
        {status && <p className="text-sm text-white/60">{status}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="card space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{product.category}</p>
              <p className="text-lg font-semibold">{product.title}</p>
              <p className="text-sm text-white/60">${product.price}</p>
              <button className="btn-ghost" aria-label="Delete listing" title="Delete listing" onClick={() => handleDelete(product)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AuthGate>
  );
}
