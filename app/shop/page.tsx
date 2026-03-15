'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { getProducts } from '@/lib/api';
import type { Product } from '@/lib/types';
import { categories } from '@/lib/categories';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getProducts({
      category: category === 'All' ? undefined : category,
      page,
      perPage: 2,
      q: activeQuery || undefined
    })
      .then((result) => {
        setProducts(result.data ?? []);
        setLastPage(result.meta?.last_page ?? 1);
      })
      .catch((error) => setStatus(error?.message ?? 'Unable to load products.'));
  }, [category, sort, page, activeQuery]);

  const sortedProducts = useMemo(() => {
    const items = [...products];
    if (sort === 'price_asc') {
      return items.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price_desc') {
      return items.sort((a, b) => b.price - a.price);
    }
    return items;
  }, [products, sort]);

  return (
    <div className="space-y-8">
      <SectionTitle title="All listings" subtitle="Browse" />
      <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <select
          className="input md:w-56"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setPage(1);
          }}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex w-full gap-2 md:w-auto md:flex-1">
          <input
            className="input w-full"
            placeholder="Search listings, categories, and descriptions"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="btn-primary"
            aria-label="Search"
            title="Search"
            onClick={() => {
              setActiveQuery(query.trim());
              setPage(1);
            }}
          >
            <Search size={16} />
          </button>
        </div>
        <select
          className="input md:w-56"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      {status && <p className="text-sm text-white/60">{status}</p>}
      <div className="grid gap-6 md:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="btn-ghost"
          aria-label="Previous page"
          title="Previous page"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-sm text-white/60">
          Page {page} of {lastPage}
        </span>
        <button
          className="btn-ghost"
          aria-label="Next page"
          title="Next page"
          disabled={page >= lastPage}
          onClick={() => setPage((prev) => Math.min(lastPage, prev + 1))}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
