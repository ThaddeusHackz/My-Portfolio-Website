export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-white/10 bg-[#0a0a0c] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#060607] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#060607] to-transparent" />
      <div className="flex overflow-hidden">
        <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8">
          {row.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] text-[#9a9aa3]"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-white/30" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
