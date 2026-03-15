'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { clearToken } from '@/lib/auth';
import { Bell, LogOut, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCart, getNotifications } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { EVENTS } from '@/lib/events';
import { connectRealtime } from '@/lib/realtime';

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/cart', label: 'Cart' },
    { href: '/orders', label: 'Orders' },
    ...(user?.role === 'seller' ? [{ href: '/dashboard', label: 'Seller' }] : []),
    ...(user?.role === 'admin' ? [{ href: '/admin', label: 'Admin' }] : [])
  ];

  useEffect(() => {
    const token = getToken();
    if (!token || !user) {
      setCartCount(0);
      setNotifCount(0);
      return;
    }

    const refreshCart = () => {
      getCart(token)
        .then((cart) => {
          const count = cart.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
          setCartCount(count);
        })
        .catch(() => setCartCount(0));
    };

    const refreshNotifs = () => {
      getNotifications(token)
        .then((items) => {
          const unread = items.filter((n) => !n.read_at).length;
          setNotifCount(unread);
        })
        .catch(() => setNotifCount(0));
    };

    refreshCart();
    refreshNotifs();

    const disconnect = connectRealtime({
      token,
      userId: user.id,
      onNotification: () => refreshNotifs()
    });

    window.addEventListener(EVENTS.cartUpdated, refreshCart);
    window.addEventListener(EVENTS.notificationsUpdated, refreshNotifs);
    return () => {
      window.removeEventListener(EVENTS.cartUpdated, refreshCart);
      window.removeEventListener(EVENTS.notificationsUpdated, refreshNotifs);
      disconnect();
    };
  }, [user]);

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-neon">
          SAFETRADE
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-white ${pathname === item.href ? 'text-white' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                {user.name}
              </span>
              <Link href="/cart" className="btn-ghost relative" aria-label="Cart" title="Cart">
                <ShoppingCart size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-neon px-1.5 py-0.5 text-[10px] font-semibold text-black">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/notifications" className="btn-ghost relative" aria-label="Notifications" title="Notifications">
                <Bell size={16} />
                {notifCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-ember px-1.5 py-0.5 text-[10px] font-semibold text-black">
                    {notifCount}
                  </span>
                )}
              </Link>
              <button
                className="btn-ghost"
                aria-label="Logout"
                title="Logout"
                onClick={() => {
                  clearToken();
                  window.location.href = '/';
                }}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost">
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
