"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Bot, Sparkles, Circle } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export default function Hero({ content }: { content: SiteContent }) {
  const [spot, setSpot] = useState({ x: -500, y: -500 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const stats = [
    { k: "06+", v: "Production projects" },
    { k: "02", v: "International partners" },
    { k: "AI", v: "Autonomous agents shipped" },
    { k: "2026", v: "Actively shipping" },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* backdrop */}
      <div className="absolute inset-0 grid-lines" />
      <div
        className="glow -top-24 left-1/4 h-[420px] w-[420px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%)" }}
      />
      <div
        className="glow bottom-0 right-0 h-[360px] w-[360px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }}
      />
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute -inset-40 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.07), transparent 65%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] text-[#9a9aa3] uppercase"
        >
          {content.heroKicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-6 font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-silver md:text-[7.5rem]"
        >
          Thaddeus
          <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_#f4f4f1]">Tagoe</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-6 flex flex-wrap items-center gap-2 text-sm md:text-base"
        >
          {content.heroRole.split("·").map((r) => (
            <span
              key={r.trim()}
              className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[#d6d6dc]"
            >
              {r.trim()}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[#9a9aa3] md:text-lg"
        >
          {content.heroBody}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d6d6dc]"
          >
            {content.heroPrimary}
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium transition hover:border-white/40 hover:bg-white/10"
          >
            <Bot className="h-4 w-4" />
            {content.heroSecondary}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44 }}
          className="mt-8 flex items-center gap-2 font-mono text-xs text-[#6b6b74]"
        >
          <Circle className="h-2 w-2 fill-[#a7f3a0] text-[#a7f3a0]" />
          {content.heroStatus}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.v} className="bg-[#0a0a0c] p-5">
              <p className="font-display text-3xl font-bold text-white">{s.k}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">
                {s.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#6b6b74] transition hover:text-white"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
      <Sparkles className="absolute right-10 top-24 hidden h-5 w-5 text-[#6b6b74] md:block" />
    </section>
  );
}
