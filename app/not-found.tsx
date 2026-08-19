import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-[#060607] text-[#f4f4f1] px-6">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-[#9a9aa3]">// 404</p>
        <h1 className="mt-4 font-display text-6xl md:text-8xl font-bold text-silver">
          Lost in the void.
        </h1>
        <p className="mt-4 text-[#9a9aa3]">This page doesn&apos;t exist — but the work does.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
