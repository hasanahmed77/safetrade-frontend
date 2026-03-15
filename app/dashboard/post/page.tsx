'use client';

import { useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { categories } from '@/lib/categories';
import { createProduct } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function PostProductPage() {
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const categoryOptions = categories.filter((item) => item !== 'All');
  const [category, setCategory] = useState(categoryOptions[0] ?? 'Electronics');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in as seller to post a listing.');
      return;
    }

    try {
      const created = await createProduct(token, {
        title,
        description,
        category,
        price: Number(price),
        image: image || null
      });
      window.location.href = `/shop/${created.id}`;
    } catch {
      setStatus('Unable to publish listing.');
    }
  };

  return (
    <AuthGate role="seller">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-semibold">Post a product</h1>
        <div className="card space-y-4">
          <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            className="input h-32"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoryOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input className="input" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input className="input" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          <button className="btn-primary" onClick={handleSubmit}>
            Publish listing
          </button>
          {status && <p className="text-sm text-white/60">{status}</p>}
        </div>
      </div>
    </AuthGate>
  );
}
