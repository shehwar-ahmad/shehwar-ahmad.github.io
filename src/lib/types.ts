export type Social = "github" | "linkedin" | "medium" | "stackoverflow" | "email";

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  bio: string;
  email: string;
  available: boolean;
  resumeUrl: string | null;
  socials: Record<Exclude<Social, "email">, string>;
}

export interface Skill {
  name: string;
  /** Slug for matching to a brand icon, e.g. "react", "nextdotjs" */
  iconKey: string;
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  logo: string;
  stack: string[];
  current?: boolean;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  image: string;
}

export interface Certification {
  title: string;
  issuer: string;
  url: string;
  image?: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  logo: string;
  highlights?: string[];
  grade?: string;
}
