import { SkillCategory, Experience, Project, Education, Blog } from "./types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Core",
    skills: [
      "React Js",
      "NextJs",
      "TypeScript",
      "JavaScript",
      "React Native",
      "Tailwind",
      "SCSS",
    ],
  },
  {
    title: "State & Logic",
    skills: ["Redux Saga", "Redux Thunk", "Context API", "React Hooks"],
  },
  {
    title: "Optimization & SEO",
    skills: [
      "Core Web Vitals",
      "SSR/SSG",
      "Performance Tuning",
      "Semantic HTML",
      "Schema Tags",
    ],
  },
  {
    title: "Backend & DB",
    skills: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "DevOps & Tools",
    skills: ["AWS", "GCP", "Docker", "CI/CD", "Postman", "BitBucket", "Jira"],
  },
  {
    title: "Analysis & Monitoring",
    skills: [
      "Debugbear",
      "Sentry.io",
      "Posthog",
      "GA4 / GTM",
      "Clarity",
      "Firebase",
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Software Development Engineer - 2",
    company: "Prosperr.io",
    location: "Bengaluru",
    period: "Feb 2025 – Present",
    highlights: [
      "Led high-performance frontend module development using React and Next.js.",
      "Owned end-to-end feature lifecycle: design, development, testing, and deployment.",
      "Improved SEO through dynamic meta tags, structured data, and SSR/SSG best practices.",
      "Optimized performance using lazy loading, code splitting, and Core Web Vitals improvements.",
      "Strengthened expertise in AWS GUI/CDK, Docker, and CI/CD pipelines.",
    ],
    awards: "Extra Miler Award",
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
      "Managed UI work for a pod, collaborating with business and development teams.",
    ],
    awards: "Rising Star Performer",
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "LDRP Institute of Technology and Research (Gujarat, India)",
    period: "May 2021",
    details: "First Class with Distinction",
  },
  {
    degree: "Class 12th (PCM)",
    institution: "Gujarat Secondary & Higher Secondary School",
    period: "May 2017",
    details: "Gujarat, India",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "JavaScript Compiler & Editor",
    description:
      "Online JavaScript Editor with custom engine support. Features an AST visualizer and memory visualization showcasing stack and heap memory allocations for learning JS internals.",
    tech: ["Custom JS Engine", "React.js", "Next.js", "Tailwind CSS"],
    category: "Open Source",
    link: "https://js-magix-rohanpatel.vercel.app",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
  },
];

export const BLOGS: Blog[] = [
  {
    id: "1",
    title: "Optimizing Core Web Vitals in 2025",
    summary:
      "A deep dive into how we achieved sub-second LCP and near-zero CLS at scale for high-traffic real estate platforms.",
    content: `Core Web Vitals have become the gold standard for user experience. In this post, I'll share my journey of optimizing performance for NoBroker's dashboard applications. 

### Why Performance Matters
User retention drops significantly for every 100ms of latency. At NoBroker, we focused on:
1. **LCP (Largest Contentful Paint)**: Reducing image sizes and optimizing server response times.
2. **CLS (Cumulative Layout Shift)**: Reserving space for dynamic content to avoid jumps.
3. **INP (Interaction to Next Paint)**: Ensuring the main thread stays idle for user inputs.

### Techniques Used
We utilized **Next.js SSR** to pre-render critical content and implemented aggressive image optimization with **next/image**. We also monitored real-user data using **Sentry.io** and **DebugBear** to identify bottlenecks in production.`,
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Scalable State Management with Redux Saga",
    summary:
      "Exploring the power of generators in side-effect management for complex fintech applications.",
    content: `When building Wealth products at Prosperr.io, we needed a robust way to handle multi-step flows and complex API sequences. Redux Saga emerged as the perfect tool.

### Generators and Sagas
Redux Saga leverages JavaScript generators to make asynchronous code look synchronous. This is particularly useful for:
- **Debouncing**: Avoiding multiple rapid clicks on 'Invest Now' buttons.
- **Race Conditions**: Ensuring only the latest search result is displayed.
- **Error Handling**: Centralizing API failure logic across the app.`,
    date: "February 28, 2024",
    readTime: "6 min read",
    category: "React Architecture",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "The Future of SEO: AI and Semantic HTML",
    summary:
      "How structured data and semantic markup are evolving in the age of generative search engines.",
    content: `SEO is no longer just about keywords. Search engines are now understanding intent through structured data and semantic HTML. 

### Best Practices
- **Schema.org**: Implement JSON-LD for rich results.
- **Semantic Tags**: Use <article>, <section>, and <nav> correctly.
- **AIGS (AI-Generated Search)**: Preparing content for LLM ingestion by providing clear headings and summaries.`,
    date: "January 10, 2024",
    readTime: "5 min read",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2032&auto=format&fit=crop",
  },
];
