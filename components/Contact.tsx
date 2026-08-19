"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Github, Linkedin, BookOpen, Send } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/types";

export default function Contact({ content }: { content: SiteContent }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      toast.success("Message sent — Thaddeus will get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSending(false);
    }
  }

  const channels = [
    { icon: Mail, label: "Email", value: content.email, href: `mailto:${content.email}` },
    { icon: Github, label: "GitHub", value: "ThaddeusHackz", href: content.github },
    { icon: Linkedin, label: "LinkedIn", value: "thaddeus-tagoe", href: content.linkedin },
    { icon: BookOpen, label: "ORCID", value: "0009-0009-1490-3247", href: content.orcid },
    { icon: MapPin, label: "Location", value: content.location, href: undefined },
  ];

  return (
    <Section id="contact" index="06 /" kicker="Contact" title={content.contactTitle} body={content.contactBody}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-3">
            {channels.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <c.icon className="h-5 w-5 text-[#9a9aa3] transition group-hover:text-white" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">{c.label}</p>
                    <p className="text-sm text-[#d6d6dc]">{c.value}</p>
                  </div>
                </a>
              ) : (
                <div key={c.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                  <c.icon className="h-5 w-5 text-[#9a9aa3]" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">{c.label}</p>
                    <p className="text-sm text-[#d6d6dc]">{c.value}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@company.com" />
            </div>
            <div className="mt-4">
              <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} placeholder="Role · collaboration · research" />
            </div>
            <div className="mt-4">
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Tell me about the opportunity…"
                className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[#6b6b74] outline-none transition focus:border-white/40"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d6d6dc] disabled:opacity-60 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[#6b6b74] outline-none transition focus:border-white/40"
      />
    </label>
  );
}
