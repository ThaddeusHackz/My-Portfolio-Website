// ─── Default site content, projects, experience, education and skills ────
// Editable live from the admin panel; seeded into ./data/db.json on first run.

import type {
  EducationItem,
  ExperienceItem,
  KnowledgeItem,
  Project,
  SiteContent,
  Skill,
} from "./types";

export const DEFAULT_CONTENT: SiteContent = {
  brandName: "THADDEUS",
  brandEyebrow: "Thaddeus Tagoe",
  announcement:
    "Open to 2026 graduate, engineering & AI roles — full-stack · AI agents · digital forensics",
  announcementOn: true,
  heroKicker: "// PORTFOLIO · 2026 — 2027",
  heroTitle: "Thaddeus Tagoe",
  heroRole: "Software Developer · Digital Forensic Analyst · AI Prompt Engineer",
  heroBody:
    "I build production-grade full-stack systems and autonomous AI agents — from multilingual assistants to national-scale intelligence platforms. Currently engineering AI with the University of Ghana's Department of Computer Science and collaborating internationally.",
  heroPrimary: "Explore the work",
  heroSecondary: "Ask the AI agent",
  heroStatus: "Available for work · Accra, Ghana · UTC+0",
  aboutTitle: "Built to operate. Built to ship.",
  aboutBody:
    "Thaddeus Nii Teiko Tagoe is an Information Technology student and applied AI engineer at the University of Ghana. He ships complete products — frontend, backend, database, admin tooling and AI orchestration — under his engineering brand ThaddeusTechz. His work spans AI-driven agriculture, national disease forecasting, global monitoring dashboards and remote-systems automation, with a forensic-grade attention to security, reliability and graceful degradation.",
  aboutFacts:
    "BSc Information Technology (in progress) · University of Leeds, UK: Computational Thinking (LISS1060), 10 credits, 92%, Distinction · Assistant to Teaching Assistants, Dept. of Computer Science, University of Ghana · Software Engineering Team member under Dr. Prince Boakye-Sekyerehene · Research partnership with Dr. Costas Loizou, University of Leeds (2026)",
  projectsTitle: "Selected work",
  projectsBody:
    "Every project below is live, open-source and production-oriented — each one ships with an admin panel, AI fallback chains and Render-ready deployment.",
  skillsTitle: "Capability stack",
  skillsBody:
    "Full-stack across the modern web, with a deep specialisation in AI orchestration, multi-model fallback and digital forensics.",
  experienceTitle: "Experience & partnerships",
  contactTitle: "Let's build something",
  contactBody:
    "For roles, collaborations or research partnerships — reach out directly or ask the AI agent anything about my work.",
  footerBlurb:
    "Thaddeus Tagoe — Software Developer, Digital Forensic Analyst & AI Prompt Engineer. Accra, Ghana.",
  email: "tthaddeus75@gmail.com",
  github: "https://github.com/ThaddeusHackz",
  linkedin: "https://www.linkedin.com/in/thaddeus-tagoe-2388393a0/",
  orcid: "https://orcid.org/0009-0009-1490-3247",
  location: "Accra, Greater Accra, Ghana",
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "prj_agriai",
    slug: "agriai-v2",
    title: "AgriAI 2.0",
    tagline: "Intelligent multilingual farming assistant for Ghana",
    description:
      "A full-stack AI farming platform: multilingual chat, crop-disease vision, market prices, weather and voice — with a complete admin panel and PostgreSQL mirror. Engineered with a Gemini → Cloudflare Workers AI → local knowledge-base fallback chain so the product never goes dark.",
    repo: "https://github.com/ThaddeusHackz/agriai-v2",
    stack: ["Next.js", "TypeScript", "Tailwind v4", "Gemini", "Cloudflare AI", "PostgreSQL"],
    featured: true,
    year: "2026",
    category: "AI Platform",
  },
  {
    id: "prj_onehealth",
    slug: "one-health",
    title: "ONE HEALTH GHANA",
    tagline: "National disease forecasting & early-warning intelligence",
    description:
      "A decision-support command layer for the Ghana Health Service: probabilistic disease forecasting, document vision, live search and a One Health signal desk. Powered by a single OpenRouter key with an automatic cross-provider fallback chain (OpenAI → Gemini → Claude → DeepSeek → Llama → free models).",
    repo: "https://github.com/ThaddeusHackz/ONE-HEALTH-AI",
    stack: ["Next.js", "TypeScript", "OpenRouter", "Recharts", "PostgreSQL"],
    featured: true,
    year: "2026",
    category: "AI / Data",
  },
  {
    id: "prj_worldgpz",
    slug: "worldgpz",
    title: "WORLDGPZ",
    tagline: "Global monitoring dashboard by ThaddeusTechz",
    description:
      "A live global intelligence dashboard aggregating multiple real-world providers (energy, markets, weather, incidents) into one operational screen — React/Vite frontend with a Node service layer, auth and an admin console.",
    repo: "https://github.com/ThaddeusHackz/worldgpz",
    stack: ["React", "Vite", "JavaScript", "Node.js", "Express"],
    featured: true,
    year: "2026",
    category: "Full-stack",
  },
  {
    id: "prj_ivy",
    slug: "ivy-league-ai",
    title: "IVY LEAGUE INFO ON AI",
    tagline: "AI research & intelligence tooling",
    description:
      "A Python intelligence toolset for structured AI research — collecting, normalising and surfacing curated information on frontier AI systems and institutions.",
    repo: "https://github.com/ThaddeusHackz/IVY-LEAGUE-INFO-ON-AI",
    stack: ["Python"],
    featured: true,
    year: "2026",
    category: "AI / Research",
  },
  {
    id: "prj_game",
    slug: "game",
    title: "GAME",
    tagline: "Python project",
    description: "A public Python project in ThaddeusHackz's GitHub portfolio.",
    repo: "https://github.com/ThaddeusHackz/GAME",
    stack: ["Python"],
    featured: false,
    year: "2026",
    category: "Software",
  },
  {
    id: "prj_the_game",
    slug: "the-game",
    title: "THE-GAME",
    tagline: "Experimental project repository",
    description: "A public experimental repository in ThaddeusHackz's GitHub portfolio.",
    repo: "https://github.com/ThaddeusHackz/THE-GAME",
    stack: ["GitHub"],
    featured: false,
    year: "2026",
    category: "Software",
  },
  {
    id: "prj_rdp",
    slug: "rdp-universal",
    title: "RDP Universal",
    tagline: "Remote-systems automation toolkit",
    description:
      "A hardened shell-based toolkit for automating remote desktop environments — provisioning, hardening and repeatable remote-session workflows.",
    repo: "https://github.com/ThaddeusHackz/RDP-universal-",
    stack: ["Shell", "Automation", "Security"],
    featured: false,
    year: "2026",
    category: "Infrastructure",
  },
  {
    id: "prj_cpp",
    slug: "programming-fundamentals",
    title: "Programming Fundamentals — DCIT 104",
    tagline: "Computer science coursework (C++)",
    description:
      "GitHub Classroom coursework in programming fundamentals at the University of Ghana — data structures, algorithms and problem-solving in C++.",
    repo: "https://github.com/ThaddeusHackz/programming-fundamentals-asssignment-2-ThaddeusHackz",
    stack: ["C++"],
    featured: false,
    year: "2026",
    category: "Education",
  },
];

export const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp_ug_ta",
    org: "University of Ghana — Dept. of Computer Science",
    role: "Assistant to Teaching Assistants",
    period: "Feb 2026 — Present",
    location: "Accra, Ghana",
    highlights: [
      "Support teaching assistants across computer-science courses with technical tooling and lab material.",
      "Bridge coursework with real production engineering practice — from C++ fundamentals to AI systems.",
    ],
    current: true,
    tags: ["Education", "Computer Science", "Mentorship"],
  },
  {
    id: "exp_aiss",
    org: "Advanced AI & Smart Systems Lab (AISS) — University of Ghana",
    role: "Software Engineering Team · Dr. Prince Boakye-Sekyerehene",
    period: "2026 — Present",
    location: "Accra, Ghana",
    highlights: [
      "Member of Dr. Prince Boakye-Sekyerehene's software engineering team, building applied AI systems.",
      "Engineered a fully automated AI website for Dr. Boakye-Sekyerehene — content, agents and admin tooling.",
    ],
    current: true,
    tags: ["Applied AI", "Software Engineering", "Human-centred computing"],
  },
  {
    id: "exp_founder",
    org: "ThaddeusTechz (independent engineering brand)",
    role: "Full-stack & AI Engineer",
    period: "2024 — Present",
    location: "Accra, Ghana",
    highlights: [
      "Designed and shipped AgriAI 2.0, ONE HEALTH GHANA and WORLDGPZ — full-stack products with admin panels and AI fallback chains.",
      "Architected an OpenRouter multi-model fallback layer (single key → cross-provider automatic failover).",
      "Productionised Render blueprints, PostgreSQL mirrors and graceful offline degradation.",
    ],
    current: true,
    tags: ["Full-stack", "AI Agents", "DevOps", "Next.js"],
  },
  {
    id: "exp_leeds",
    org: "University of Leeds (international research partnership)",
    role: "Collaborator · Dr. Costas Loizou",
    period: "2026 — Present",
    location: "Leeds, United Kingdom",
    highlights: [
      "Cross-institutional collaboration bridging applied AI engineering and academic research.",
      "Joint exploration of AI tooling for education and transnational academic practice.",
    ],
    current: true,
    tags: ["Research", "AI in Education", "Partnership"],
  },
];

export const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: "edu_ug",
    school: "University of Ghana",
    degree: "BSc Information Technology",
    field: "Department of Computer Science",
    period: "In progress",
    notes:
      "Applied IT curriculum with coursework in programming fundamentals (C++), data structures, and human-centred computing — paired with hands-on production engineering.",
  },
  {
    id: "edu_leeds_liss1060",
    school: "University of Leeds, United Kingdom",
    degree: "Computational Thinking — LISS1060",
    field: "10 credits · 92% · Distinction",
    period: "Completed",
    notes:
      "Completed a University of Leeds course in Computational Thinking with a Distinction, achieving 92% across 10 credits.",
  },
  {
    id: "edu_dcit",
    school: "University of Ghana — GitHub Classroom",
    degree: "DCIT 104 · Programming Fundamentals",
    field: "C++ · algorithms · problem solving",
    period: "2026",
    notes:
      "Completed programming-fundamentals coursework, published as open-source on GitHub.",
  },
];

export const DEFAULT_SKILLS: Skill[] = [
  { id: "sk_ts", name: "TypeScript / JavaScript", category: "Languages", level: 92 },
  { id: "sk_py", name: "Python", category: "Languages", level: 80 },
  { id: "sk_cpp", name: "C++", category: "Languages", level: 75 },
  { id: "sk_sql", name: "SQL / PostgreSQL", category: "Languages", level: 84 },
  { id: "sk_shell", name: "Shell / Bash", category: "Languages", level: 82 },
  { id: "sk_next", name: "Next.js / React", category: "Frontend", level: 94 },
  { id: "sk_tailwind", name: "Tailwind CSS v4", category: "Frontend", level: 90 },
  { id: "sk_motion", name: "Framer Motion", category: "Frontend", level: 85 },
  { id: "sk_node", name: "Node.js / API design", category: "Backend", level: 91 },
  { id: "sk_pg", name: "PostgreSQL + JSON stores", category: "Backend", level: 86 },
  { id: "sk_or", name: "OpenRouter orchestration", category: "AI / ML", level: 93 },
  { id: "sk_prompt", name: "Prompt engineering", category: "AI / ML", level: 95 },
  { id: "sk_rag", name: "RAG / knowledge bases", category: "AI / ML", level: 88 },
  { id: "sk_vision", name: "Vision & multimodal", category: "AI / ML", level: 83 },
  { id: "sk_forensics", name: "Digital forensics", category: "Domain", level: 90 },
  { id: "sk_osint", name: "OSINT / recon", category: "Domain", level: 87 },
  { id: "sk_git", name: "Git / GitHub", category: "Tooling", level: 92 },
  { id: "sk_render", name: "Render / Docker / Linux", category: "Tooling", level: 86 },
];

export const DEFAULT_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "kno_who",
    topic: "Who is Thaddeus?",
    keywords: "who is thaddeus, thaddeus tagoe, about, intro, bio",
    answer:
      "**Thaddeus Nii Teiko Tagoe** is a Software Developer, Digital Forensic Analyst and AI Prompt Engineer based in Accra, Ghana. He is an Information Technology student at the University of Ghana (Department of Computer Science) and works as an Assistant to Teaching Assistants there. He ships full-stack products and autonomous AI agents under his brand **ThaddeusTechz**.",
  },
  {
    id: "kno_exp",
    topic: "Experience & roles",
    keywords: "experience, roles, work, job, assistant, teaching",
    answer:
      "Thaddeus's current roles:\n\n1. **Assistant to Teaching Assistants** — Dept. of Computer Science, University of Ghana (Feb 2026 – present).\n2. **Software Engineering Team member** under Dr. Prince Boakye-Sekyerehene at the Advanced AI & Smart Systems Lab (AISS Lab), University of Ghana.\n3. **Full-stack & AI Engineer** at ThaddeusTechz (2024 – present).\n4. **International research collaborator** with Dr. Costas Loizou, University of Leeds (2026).",
  },
  {
    id: "kno_projects",
    topic: "Projects",
    keywords: "projects, work, agriai, one health, worldgpz, github, portfolio",
    answer:
      "**Selected projects (all on GitHub):**\n\n- **AgriAI 2.0** — multilingual AI farming assistant for Ghana (Next.js, Gemini + Cloudflare fallback, admin panel).\n- **ONE HEALTH GHANA** — national disease forecasting & early-warning system for the Ghana Health Service (OpenRouter multi-model fallback).\n- **WORLDGPZ** — global monitoring dashboard by ThaddeusTechz.\n- **IVY LEAGUE INFO ON AI** — Python AI research tooling.\n- **RDP Universal** — remote-systems automation toolkit.\n\nFull list: https://github.com/ThaddeusHackz",
  },
  {
    id: "kno_partners",
    topic: "Partnerships",
    keywords: "partnership, partners, loizou, leeds, boakye, collaboration",
    answer:
      "**Partnerships & affiliations:**\n\n- **Dr. Costas Loizou** — University of Leeds, United Kingdom (2026 research partnership).\n- **Dr. Prince Boakye-Sekyerehene** — Lecturer, Dept. of Computer Science, University of Ghana. Thaddeus built a fully automated AI website for him and serves on his Software Engineering Team (AISS Lab).",
  },
  {
    id: "kno_skills",
    topic: "Skills",
    keywords: "skills, stack, technologies, languages, tools",
    answer:
      "**Capability stack:** TypeScript, JavaScript, Python, C++, SQL, Shell · Next.js/React, Tailwind CSS v4, Framer Motion · Node.js, PostgreSQL · OpenRouter orchestration, prompt engineering, RAG, vision · digital forensics & OSINT · Git, Docker, Render, Linux.",
  },
  {
    id: "kno_contact",
    topic: "Contact",
    keywords: "contact, email, hire, reach, linkedin, phone",
    answer:
      "**Contact Thaddeus:**\n\n- Email: tthaddeus75@gmail.com\n- GitHub: https://github.com/ThaddeusHackz\n- LinkedIn: https://www.linkedin.com/in/thaddeus-tagoe-2388393a0/\n- ORCID: https://orcid.org/0009-0009-1490-3247\n\nUse the contact form on the site, or reach out directly by email.",
  },
  {
    id: "kno_ai",
    topic: "How this AI works",
    keywords: "how do you work, openrouter, ai agent, fallback, model",
    answer:
      "This agent runs on a **single OpenRouter API key** with an automatic fallback chain — OpenAI → Gemini → Claude → DeepSeek → Llama → free models → OpenRouter auto. When no key is configured (or the network is offline) it answers from a local knowledge base about Thaddeus, so it always responds.",
  },
  {
    id: "kno_hire",
    topic: "Why hire Thaddeus",
    keywords: "hire, why, candidate, best, recruit, fit",
    answer:
      "Thaddeus combines a full-stack engineering range (frontend → backend → database → admin tooling) with production AI orchestration and a digital-forensics mindset for reliability and security. He has shipped complete, deployable products end-to-end — not just prototypes — with graceful degradation and Render-ready operations.",
  },
];
