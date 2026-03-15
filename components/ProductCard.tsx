'use client';

import Link from 'next/link';
import type { Product } from '@/lib/types';
import AddToCartQuick from '@/components/AddToCartQuick';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="card flex h-full flex-col gap-4 transition hover:border-white/30">
        <div className="h-44 overflow-hidden rounded-xl border border-white/10 bg-black">
          <img
            src={product.image ?? 'https://placehold.co/600x400?text=SafeTrade'}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            {product.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/60">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-neon">${product.price}</span>
          <div
            className="flex items-center gap-2"
            onClick={(event) => event.preventDefault()}
          >
            <AddToCartQuick productId={product.id} />
          </div>
        </div>
      </div>
    </Link>
  );
}
