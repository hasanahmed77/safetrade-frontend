import AddToCartButton from '@/components/AddToCartButton';
import { getProduct } from '@/lib/api';

type Params = { id: string };

export default async function ProductDetails({ params }: { params: Params | Promise<Params> }) {
  const resolved = await params;
  const product = await getProduct(resolved.id);

  if (!product) {
    return <div className="card">Product not found.</div>;
  }

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
      <div className="card">
        <img
          src={product.image ?? 'https://placehold.co/600x400?text=SafeTrade'}
          alt={product.title}
          className="h-80 w-full rounded-xl object-cover"
        />
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">{product.category}</p>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-sm text-white/60">{product.description}</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="card space-y-4">
          <p className="text-sm text-white/60">Price</p>
          <p className="text-3xl font-semibold text-neon">${product.price}</p>
          <AddToCartButton productId={product.id} />
        </div>
        <div className="card text-sm text-white/60">
          Buyer protection: funds held until delivery confirmation or return approval.
        </div>
      </div>
    </div>
  );
}
