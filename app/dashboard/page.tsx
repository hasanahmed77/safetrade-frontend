'use client';

import { useEffect, useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { getSellerOrders, getSellerProducts } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useAuth } from '@/lib/useAuth';
import type { Product } from '@/lib/types';

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [status, setStatus] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in as a seller to view your listings.');
      return;
    }

    Promise.all([getSellerProducts(token), getSellerOrders(token)])
      .then(([productData, orderData]) => {
        setProducts(productData);
        setOrders(orderData.length);
        if (user) {
          const sellerTotal = orderData.reduce((sum, order) => {
            const itemsTotal = order.items.reduce((itemSum, item) => {
              if (item.product?.seller_id === user.id) {
                return itemSum + Number(item.price) * item.quantity;
              }
              return itemSum;
            }, 0);
            return sum + itemsTotal;
          }, 0);
          setBalance(sellerTotal);
        }
      })
      .catch(() => setStatus('Unable to load listings.'));
  }, [user]);

  return (
    <AuthGate role="seller">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Seller Dashboard</h1>
        {user && <p className="text-sm text-white/60">Welcome, {user.name}.</p>}
        {status && <p className="text-sm text-white/60">{status}</p>}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Listings</p>
            <p className="mt-2 text-2xl font-semibold">{products.length}</p>
          </div>
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Orders</p>
            <p className="mt-2 text-2xl font-semibold">{orders}</p>
          </div>
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Balance</p>
            <p className="mt-2 text-2xl font-semibold text-neon">${balance.toFixed(2)}</p>
          </div>
        </div>
        <a href="/dashboard/post" className="btn-primary inline-flex">
          Post a new product
        </a>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="card">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{product.category}</p>
              <p className="mt-2 text-lg font-semibold">{product.title}</p>
              <p className="text-sm text-white/50">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthGate>
  );
}
