import type { SiteContent } from "@/lib/types";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-white/10 bg-[#060607]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-[0.18em]">{content.brandName}</p>
            <p className="mt-2 max-w-md text-sm text-[#9a9aa3]">{content.footerBlurb}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9a9aa3]">
            <a href={content.github} target="_blank" rel="noreferrer" className="link-underline hover:text-white">GitHub</a>
            <a href={content.linkedin} target="_blank" rel="noreferrer" className="link-underline hover:text-white">LinkedIn</a>
            <a href={content.orcid} target="_blank" rel="noreferrer" className="link-underline hover:text-white">ORCID</a>
            <a href="/admin" className="link-underline hover:text-white">Admin</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 font-mono text-xs text-[#6b6b74] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Thaddeus Tagoe · ThaddeusTechz</p>
          <p>Accra, Ghana · built with Next.js · AI agent on OpenRouter</p>
        </div>
      </div>
    </footer>
  );
}
