import { Handshake, ExternalLink } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Partnerships() {
  const partners = [
    {
      name: "Dr. Costas Loizou",
      org: "University of Leeds · United Kingdom",
      role: "International research partnership",
      detail:
        "Cross-institutional collaboration bridging applied AI engineering and academic research — exploring AI tooling for education and transnational academic practice (2026).",
      href: "https://eps.leeds.ac.uk/faculty-engineering-physical-sciences/staff/12265/dr-costas-loizou",
    },
    {
      name: "Dr. Prince Boakye-Sekyerehene",
      org: "University of Ghana · AISS Lab",
      role: "Software Engineering Team · AI website built",
      detail:
        "Member of Dr. Boakye-Sekyerehene's software engineering team at the Advanced AI & Smart Systems Lab. Engineered a fully automated AI website for him — content, agents and admin tooling.",
      href: "https://dcs.ug.edu.gh/faculty/66a12a84d26b8402b64b897b",
    },
  ];

  return (
    <Section id="partners" index="05 /" kicker="Network" title="Partnerships & affiliations">
      <div className="grid gap-5 md:grid-cols-2">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/25 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <Handshake className="h-6 w-6 text-[#9a9aa3] transition group-hover:text-white" />
                <ExternalLink className="h-4 w-4 text-[#6b6b74] opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{p.name}</h3>
              <p className="mt-1 font-mono text-xs text-[#6b6b74]">{p.org}</p>
              <p className="mt-3 inline-flex w-fit rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#d6d6dc]">
                {p.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#9a9aa3]">{p.detail}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
