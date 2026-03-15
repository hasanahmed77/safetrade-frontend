import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import BecomeSellerButton from '@/components/BecomeSellerButton';
import { getProducts } from '@/lib/api';

export default async function HomePage() {
  const response = await getProducts();
  const products = response.data ?? [];

  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40">SafeTrade</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Buy and sell used items with platform-held protection.
          </h1>
          <p className="text-white/60">
            SafeTrade keeps payments inside the platform, offers refund controls, and unlocks
            discounted checkout through verified coupons.
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="btn-primary" href="/shop">Browse listings</a>
            <BecomeSellerButton />
          </div>
        </div>
        <div className="card space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Why SafeTrade</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li>Platform-held payments reduce scams.</li>
            <li>Return window enforced by admin workflows.</li>
            <li>Clean cart with add/remove and coupon previews.</li>
            <li>Instant invoice generation after checkout.</li>
          </ul>
        </div>
      </section>

      <section>
        <SectionTitle title="Featured listings" subtitle="Fresh arrivals" />
        <div className="grid gap-6 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <h3 className="text-lg font-semibold">Secure checkout</h3>
          <p className="mt-3 text-sm text-white/60">
            Internal payments and invoice generation keep every purchase transparent.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Flexible returns</h3>
          <p className="mt-3 text-sm text-white/60">
            Buyers can request refunds, and admins can approve or reject quickly.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Coupon control</h3>
          <p className="mt-3 text-sm text-white/60">
            Admins can create discount codes with expiries and status toggles.
          </p>
        </div>
      </section>
    </div>
  );
}
