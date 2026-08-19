"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#060607] px-6 text-[#f4f4f1]">
      <div className="absolute inset-0 grid-lines" />
      <div
        className="glow left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)" }}
      />
      <div className="relative z-10 w-full max-w-sm">
        <a href="/" className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-[#6b6b74] transition hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </a>
        <div className="glass-strong rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold">Admin console</h1>
              <p className="font-mono text-[11px] text-[#6b6b74]">Thaddeus Tagoe · portfolio</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#6b6b74] outline-none focus:border-white/40"
                placeholder="admin@thaddeustagoe.dev"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#6b6b74] outline-none focus:border-white/40"
                placeholder="••••••••"
              />
            </label>
            {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d6d6dc] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-[#6b6b74]">
          Default credentials seed from ADMIN_EMAIL / ADMIN_PASSWORD
        </p>
      </div>
    </main>
  );
}
