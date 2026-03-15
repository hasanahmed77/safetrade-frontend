export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.4em] text-white/30">{subtitle}</p>
      <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
    </div>
  );
}
