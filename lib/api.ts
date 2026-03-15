import { mockProducts } from '@/lib/mock';
import type { Cart, Coupon, NotificationItem, Order, Product, ReturnRequest, User } from '@/lib/types';
import { emitCartUpdated, emitNotificationsUpdated } from '@/lib/events';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers ?? {})
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      } else if (data?.errors) {
        message = Object.values(data.errors).flat().join(' ');
      }
    } catch {
      const text = await response.text();
      if (text) message = text;
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(params?: {
  category?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  q?: string;
}): Promise<{ data: Product[]; meta?: any }> {
  const search = new URLSearchParams();
  if (params?.category) search.set('category', params.category);
  if (params?.sort) search.set('sort', params.sort);
  if (params?.page) search.set('page', String(params.page));
  if (params?.perPage) search.set('per_page', String(params.perPage));
  if (params?.q) search.set('q', params.q);

  const suffix = search.toString() ? `?${search.toString()}` : '';

  try {
    const result = await apiFetch<any>(`/products${suffix}`);
    if (result?.data && result?.last_page) {
      return {
        data: result.data,
        meta: {
          last_page: result.last_page,
          current_page: result.current_page
        }
      };
    }
    return result as { data: Product[]; meta?: any };
  } catch {
    return { data: mockProducts, meta: { last_page: 1, current_page: 1 } };
  }
}

export async function getSellerProducts(token: string): Promise<Product[]> {
  return apiFetch<Product[]>('/seller/products', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getSellerOrders(token: string): Promise<Order[]> {
  return apiFetch<Order[]>('/seller/orders', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function createProduct(token: string, payload: Omit<Product, 'id' | 'seller_id'>) {
  return apiFetch<Product>('/products', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${id}`);
  } catch {
    return mockProducts.find((p) => p.id === Number(id)) ?? null;
  }
}

export async function login(email: string, password: string) {
  return apiFetch<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function register(name: string, email: string, password: string, role: string) {
  return apiFetch<{ token: string; user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role })
  });
}

export async function getMe(token: string) {
  return apiFetch<{ user: User }>('/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function upgradeToSeller(token: string) {
  return apiFetch<{ user: User }>('/me/role', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getCart(token: string) {
  return apiFetch<Cart>('/cart', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function addToCart(token: string, productId: number, quantity: number) {
  const cart = await apiFetch<Cart>('/cart/items', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ product_id: productId, quantity })
  });
  emitCartUpdated();
  return cart;
}

export async function removeFromCart(token: string, itemId: number) {
  const cart = await apiFetch<Cart>(`/cart/items/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  emitCartUpdated();
  return cart;
}

export async function checkout(token: string, couponCode?: string) {
  const result = await apiFetch<{ order: Order; pricing: { discount: number; total: number } }>(
    '/checkout',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ coupon_code: couponCode })
    }
  );
  emitCartUpdated();
  return result;
}

export async function getOrders(token: string) {
  return apiFetch<Order[]>('/orders', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getAdminCoupons(token: string) {
  return apiFetch<Coupon[]>('/admin/coupons', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getAdminUsers(token: string) {
  return apiFetch<User[]>('/admin/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getAdminProducts(token: string) {
  return apiFetch<Product[]>('/admin/products', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getAdminOrders(token: string) {
  return apiFetch<Order[]>('/admin/orders', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getAdminPayments(token: string) {
  return apiFetch<any[]>('/admin/payments', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getAdminReturns(token: string) {
  return apiFetch<ReturnRequest[]>('/admin/returns', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function deleteAdminProduct(token: string, id: number) {
  return apiFetch<{ message: string }>(`/admin/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateAdminUser(token: string, id: number, role: string) {
  return apiFetch<User>(`/admin/users/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ role })
  });
}

export async function deleteAdminUser(token: string, id: number) {
  return apiFetch<{ message: string }>(`/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function createCoupon(token: string, payload: Omit<Coupon, 'id'>) {
  return apiFetch<Coupon>('/admin/coupons', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export async function updateCoupon(token: string, id: number, payload: Partial<Omit<Coupon, 'id' | 'code'>>) {
  return apiFetch<Coupon>(`/admin/coupons/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export async function updateReturnStatus(token: string, id: number, status: string) {
  return apiFetch<ReturnRequest>(`/admin/returns/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status })
  });
}

export async function requestReturn(token: string, payload: { order_id: number; product_id: number; reason: string }) {
  return apiFetch('/returns', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export async function getReturns(token: string) {
  return apiFetch<ReturnRequest[]>('/returns', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getInvoice(token: string, orderId: number) {
  return apiFetch(`/orders/${orderId}/invoice`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getNotifications(token: string) {
  return apiFetch<NotificationItem[]>('/notifications', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function markNotificationRead(token: string, id: number) {
  const item = await apiFetch<NotificationItem>(`/notifications/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  emitNotificationsUpdated();
  return item;
}
