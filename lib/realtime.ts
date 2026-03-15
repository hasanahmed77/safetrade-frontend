'use client';

import Pusher from 'pusher-js';

export function connectRealtime(params: {
  token: string;
  userId: number;
  onNotification: (payload: any) => void;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
  const authUrl = apiUrl.replace(/\/api\/?$/, '') + '/broadcasting/auth';
  const key = process.env.NEXT_PUBLIC_REVERB_KEY ?? 'local';
  const host = process.env.NEXT_PUBLIC_REVERB_HOST ?? '127.0.0.1';
  const port = Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 8080);
  const scheme = process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'http';

  const pusher = new Pusher(key, {
    cluster: 'mt1',
    wsHost: host,
    wsPort: port,
    wssPort: port,
    forceTLS: scheme === 'https',
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
    authorizer: (channel) => ({
      authorize: async (socketId: string, callback: any) => {
        try {
          const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${params.token}`
            },
            body: JSON.stringify({ socket_id: socketId, channel_name: channel.name })
          });
          const data = await response.json();
          callback(null, data);
        } catch (error) {
          callback(error, null);
        }
      }
    })
  });

  const channel = pusher.subscribe(`private-users.${params.userId}`);
  channel.bind('notification.created', params.onNotification);

  return () => {
    channel.unbind_all();
    pusher.unsubscribe(`private-users.${params.userId}`);
    pusher.disconnect();
  };
}
