
import { SkillCategory, Experience, Project } from './types';

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
      "Managed UI work for a pod, collaborating with cross-functional teams to reduce operating costs."
    ],
    awards: "Rising Star Performer"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "JavaScript Compiler & Editor",
    description: "Online JavaScript Editor with custom engine support. Features an AST visualizer and memory visualization showcasing stack and heap memory allocations.",
    tech: ["React.js", "Next.js", "Tailwind CSS", "Custom JS Engine"],
    link: "#",
    image: "https://picsum.photos/seed/compiler/800/450"
  },
  {
    title: "B2B Wealth Platforms",
    description: "Led development of Mutual Fund, Super Saver (tax-saving), and internal CMS at Prosperr.io. Focused on multi-step forms and secure document handling.",
    tech: ["Next.js", "Redux-Saga", "Styled-Components", "SSR"],
    image: "https://picsum.photos/seed/wealth/800/450"
  },
  {
    title: "Home Services Platforms",
    description: "Core implementation for Home Interiors, Renovation, and Home Loan platforms at NoBroker. Integrated CIBIL API and real-time data handling.",
    tech: ["React.js", "Comet Chat", "GA/GTM", "Context API"],
    image: "https://picsum.photos/seed/nobroker/800/450"
  }
];
