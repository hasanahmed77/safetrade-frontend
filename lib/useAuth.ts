'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api';
import { clearToken, getToken, getUser, setUser } from '@/lib/auth';
import type { User } from '@/lib/types';

export function useAuth() {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const cached = getUser<User>();
    if (!token) {
      setUserState(null);
      setLoading(false);
      return;
    }

    if (cached) {
      setUserState(cached);
      setLoading(false);
      return;
    }

    getMe(token)
      .then((data) => {
        setUser(data.user);
        setUserState(data.user);
      })
      .catch(() => {
        clearToken();
        setUserState(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
