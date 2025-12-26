export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  awards?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: "Fintech" | "Real Estate" | "Open Source" | "Internal Tool";
  link?: string;
  github?: string;
  image?: string;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}
