import { Github, Linkedin, Mail, BookOpen } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import type { SiteContent } from "@/lib/types";

export default function About({ content }: { content: SiteContent }) {
  const links = [
    { href: content.github, label: "GitHub", icon: Github },
    { href: content.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: content.orcid, label: "ORCID", icon: BookOpen },
    { href: `mailto:${content.email}`, label: content.email, icon: Mail },
  ];

  return (
    <Section id="about" index="01 /" kicker="Profile" title={content.aboutTitle} body={content.aboutBody}>
      <Reveal>
        <div className="glass rounded-2xl p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6b6b74]">Key facts</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[#c7c7cd]">{content.aboutFacts}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/30 hover:bg-white/[0.07]"
              >
                <l.icon className="h-4 w-4 text-[#9a9aa3] transition group-hover:text-white" />
                <span className="truncate text-sm text-[#d6d6dc]">{l.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
