// ─── Shared data model for the portfolio store ────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  salt: string;
  passwordHash: string;
  role: "admin" | "editor";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  repo: string;
  live?: string;
  stack: string[];
  featured: boolean;
  year: string;
  category: string;
}

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  current: boolean;
  tags: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  period: string;
  notes: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
}

export interface KnowledgeItem {
  id: string;
  topic: string;
  keywords: string;
  answer: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ActivityRow {
  actor: string;
  action: string;
  detail: string;
  at: string;
}

export interface VisitDay {
  date: string;
  count: number;
  unique: number;
}

export interface Analytics {
  visits: VisitDay[];
  questions: { q: string; count: number }[];
  totalChats: number;
  totalMessages: number;
  totalContacts: number;
  firstSeen: string;
}

export interface SiteContent {
  brandName: string;
  brandEyebrow: string;
  announcement: string;
  announcementOn: boolean;
  heroKicker: string;
  heroTitle: string;
  heroRole: string;
  heroBody: string;
  heroPrimary: string;
  heroSecondary: string;
  heroStatus: string;
  aboutTitle: string;
  aboutBody: string;
  aboutFacts: string;
  projectsTitle: string;
  projectsBody: string;
  skillsTitle: string;
  skillsBody: string;
  experienceTitle: string;
  contactTitle: string;
  contactBody: string;
  footerBlurb: string;
  email: string;
  github: string;
  linkedin: string;
  orcid: string;
  location: string;
}

export interface Database {
  content: SiteContent;
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: Skill[];
  knowledge: KnowledgeItem[];
  chats: ChatSession[];
  messages: ContactMessage[];
  analytics: Analytics;
  admins: AdminUser[];
  activity: ActivityRow[];
}
