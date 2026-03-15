'use client';

import { useEffect, useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { getNotifications, markNotificationRead } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { connectRealtime } from '@/lib/realtime';
import { useAuth } from '@/lib/useAuth';
import type { NotificationItem } from '@/lib/types';

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [status, setStatus] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in to view notifications.');
      return;
    }

    const refresh = () => {
      getNotifications(token)
        .then(setItems)
        .catch(() => setStatus('Unable to load notifications.'));
    };

    refresh();
    if (!user) return;
    const disconnect = connectRealtime({
      token,
      userId: user.id,
      onNotification: refresh
    });
    return () => disconnect();
  }, [user]);

  const handleRead = async (item: NotificationItem) => {
    const token = getToken();
    if (!token) return;
    const updated = await markNotificationRead(token, item.id);
    setItems((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  return (
    <AuthGate>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        {status && <p className="text-sm text-white/60">{status}</p>}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.title}</p>
              <p className="text-sm text-white/70">{item.body}</p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{new Date(item.created_at).toLocaleString()}</span>
                {!item.read_at && (
                  <button className="btn-ghost" onClick={() => handleRead(item)}>
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGate>
  );
}
