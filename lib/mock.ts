import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: 1,
    seller_id: 1,
    title: 'Vintage DSLR Camera',
    description: 'Well maintained DSLR with two lenses.',
    category: 'Electronics',
    price: 320,
    image: 'https://placehold.co/600x400?text=Camera'
  },
  {
    id: 2,
    seller_id: 1,
    title: 'Ergonomic Office Chair',
    description: 'Comfortable chair with lumbar support.',
    category: 'Furniture',
    price: 140,
    image: 'https://placehold.co/600x400?text=Chair'
  },
  {
    id: 3,
    seller_id: 1,
    title: 'Mechanical Keyboard',
    description: 'Hot-swappable switches, RGB lights.',
    category: 'Accessories',
    price: 85,
    image: 'https://placehold.co/600x400?text=Keyboard'
  }
];
