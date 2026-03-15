export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: number;
  seller_id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string | null;
  status?: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: number;
  buyer_id: number;
  items: CartItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: number;
  total_amount: number;
  status: string;
  items: OrderItem[];
}

export interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  expiry_date: string;
  status: string;
}

export interface ReturnRequest {
  id: number;
  order_id: number;
  product_id: number;
  reason: string;
  status: string;
  request_date: string;
  product?: Product;
}

export interface NotificationItem {
  id: number;
  title: string;
  body: string;
  read_at: string | null;
  created_at: string;
}
