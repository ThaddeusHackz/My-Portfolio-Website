"use client";

import { useEffect, useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ brand }: { brand: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-white/10" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/5 text-sm font-bold transition group-hover:bg-white group-hover:text-black">
            T
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.18em]">
            {brand || "THADDEUS"}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline rounded-full px-4 py-2 text-sm text-[#c7c7cd] transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/admin"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-[#9a9aa3] transition hover:border-white/40 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5" /> Admin
          </a>
          <a
            href="#contact"
            className="ml-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#d6d6dc]"
          >
            Hire me
          </a>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0c]/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[#c7c7cd] hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-white px-3 py-2.5 text-center font-semibold text-black"
            >
              Hire me
            </a>
            <a
              href="/admin"
              className="mt-1 rounded-lg border border-white/15 px-3 py-2.5 text-center font-mono text-xs text-[#9a9aa3]"
            >
              Admin console
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
