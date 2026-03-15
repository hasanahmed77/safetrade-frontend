'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { register } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [status, setStatus] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const preferred = searchParams.get('role');
    if (preferred === 'seller' || preferred === 'buyer') {
      setRole(preferred);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    try {
      const result = await register(name, email, password, role);
      setToken(result.token);
      setUser(result.user);
      setStatus('Account created.');
      window.location.href = '/';
    } catch (error: any) {
      setStatus(error?.message ?? 'Registration failed.');
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">Create account</h1>
      <div className="card space-y-4">
        <input
          className="input"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <select
          className="input"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="btn-primary" onClick={handleSubmit}>
          Create account
        </button>
        {status && <p className="text-sm text-white/60">{status}</p>}
      </div>
    </div>
  );
}
