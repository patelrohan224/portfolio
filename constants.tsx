
import { SkillCategory, Experience, Project, Education } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Core",
    skills: ["React Js", "NextJs", "TypeScript", "JavaScript", "React Native", "Tailwind", "SCSS"]
  },
  {
    title: "State & Logic",
    skills: ["Redux Saga", "Redux Thunk", "Context API", "React Hooks"]
  },
  {
    title: "Optimization & SEO",
    skills: ["Core Web Vitals", "SSR/SSG", "Performance Tuning", "Semantic HTML", "Schema Tags"]
  },
  {
    title: "Backend & DB",
    skills: ["Node.js", "Express.js", "MongoDB"]
  },
  {
    title: "DevOps & Tools",
    skills: ["AWS", "GCP", "Docker", "CI/CD", "Postman", "BitBucket", "Jira"]
  },
  {
    title: "Analysis & Monitoring",
    skills: ["Debugbear", "Sentry.io", "Posthog", "GA4 / GTM", "Clarity", "Firebase"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "SDE - 2",
    company: "Prosperr.io",
    location: "Bengaluru",
    period: "Feb 2025 – Present",
    highlights: [
      "Led high-performance frontend module development using React and Next.js.",
      "Owned end-to-end feature lifecycle: design, development, testing, and deployment.",
      "Improved SEO through dynamic meta tags, structured data, and SSR/SSG best practices.",
      "Optimized performance using lazy loading, code splitting, and Core Web Vitals improvements.",
      "Strengthened expertise in AWS GUI/CDK, Docker, and CI/CD pipelines."
    ],
    awards: "Extra Miler Award"
  },
  {
    role: "Software Development Engineer",
    company: "NoBroker.com",
    location: "Bengaluru",
    period: "Jan 2022 – Feb 2025",
    highlights: [
      "Refactored and optimized dashboard applications and customer-facing pages.",
      "Implemented SSR for faster page rendering, improving overall user experience.",
      "Monitored performance metrics (LCP, CLS, FCP) and resolved issues via Sentry.",
      "Introduced calculation tools, chat modules, and mail template builders.",
      "Managed UI work for a pod, collaborating with business and development teams."
    ],
    awards: "Rising Star Performer"
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "LDRP Institute of Technology and Research",
    period: "May 2021",
    details: "First Class with Distinction"
  },
  {
    degree: "Class 12th (PCM)",
    institution: "Gujarat Secondary & Higher Secondary School",
    period: "May 2017",
    details: "Gujarat, India"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "JavaScript Compiler & Editor",
    description: "Online JavaScript Editor with custom engine support. Features an AST visualizer and memory visualization showcasing stack and heap memory allocations for learning JS internals.",
    tech: ["React.js", "Next.js", "Tailwind CSS", "Custom JS Engine"],
    link: "https://github.com/patelrohan224",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop"
  },
  {
    title: "Wealth & Tax Platforms",
    description: "Led frontend development for Mutual Fund onboarding, Super Saver tax journeys, and Reimbursement workflows with complex multi-step forms and document tracking.",
    tech: ["Next.js", "Redux-Saga", "Context API", "Styled-Components"],
    image: "https://images.unsplash.com/photo-1611974714024-4607a55746ee?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Real Estate Ecosystems",
    description: "Built high-traffic platforms for Home Interiors and Renovation. Integrated CIBIL APIs, Comet Chat, and optimized for SEO using SSR/SSG best practices.",
    tech: ["React.js", "SSR", "GA/GTM", "Comet Chat", "Sentry"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
  },
  {
    title: "Internal CRM & CMS",
    description: "Developed enterprise CRM features including User Management, Spreadsheet uploads with error detection, and a dynamic Mail Template Builder.",
    tech: ["React Hooks", "Web APIs", "Tailwind CSS", "Role Management"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  }
];
