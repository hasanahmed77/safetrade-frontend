'use client';

import { useState } from 'react';
import { login } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await login(email, password);
      setToken(result.token);
      setUser(result.user);
      setStatus('Signed in.');
      window.location.href = '/';
    } catch (error: any) {
      setStatus(error?.message ?? 'Login failed.');
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <div className="card space-y-4">
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
        <button className="btn-primary" onClick={handleSubmit}>
          Sign in
        </button>
        {status && <p className="text-sm text-white/60">{status}</p>}
      </div>
    </div>
  );
}
