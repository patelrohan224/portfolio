import React from "react";
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
    title: "A Complete Guide to Core Web Vitals: Understanding and Optimizing Performance Metrics",
    summary:
      "A deep dive into how we achieved sub-second LCP and near-zero CLS at scale for high-traffic real estate platforms.",
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed">
          Let's dive deeper into each metric, including <strong className="font-bold">how they're calculated</strong>, <strong className="font-bold">what impacts them</strong>, and <strong className="font-bold">how to improve them</strong>:
        </p>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4 mt-8">
            1. CLS (Cumulative Layout Shift)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What It Measures:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                CLS quantifies unexpected <strong className="font-bold">layout shifts</strong> during the page's lifecycle. These shifts happen when content moves around while the page is still loading (e.g., images loading late or ads resizing).
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How It's Calculated:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4 mb-2">
                CLS = Impact Fraction × Distance Fraction
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-8">
                <li>
                  <strong className="font-bold">Impact Fraction</strong>: Percentage of the viewport affected by the unstable element.
                </li>
                <li>
                  <strong className="font-bold">Distance Fraction</strong>: Distance the element moved as a fraction of the viewport.
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What Impacts CLS:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Images or videos without fixed dimensions.</li>
                <li>Ads, embeds, or iframes resizing dynamically.</li>
                <li>Font loading causing text shifts.</li>
                <li>Dynamically injected content above existing content.</li>
              </ul>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How to Improve CLS:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Always specify width and height attributes for images and videos.</li>
                <li>Use placeholders (e.g., skeleton loaders) for dynamic content.</li>
                <li>Preload important web fonts.</li>
                <li>Avoid inserting content above existing elements unless necessary.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4 mt-8">
            2. LCP (Largest Contentful Paint)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What It Measures:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                LCP tracks how long it takes for the <strong className="font-bold">largest visible content</strong> (image, video, or text block) to fully render on the viewport.
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How It's Calculated:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                The browser determines the largest content element visible in the viewport and measures when it's fully loaded. It's tracked up until the <strong className="font-bold">user's interaction</strong> or the <strong className="font-bold">page load event</strong>.
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What Impacts LCP:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Slow server response times.</li>
                <li>Render-blocking resources (e.g., CSS, JavaScript).</li>
                <li>Unoptimized images and videos.</li>
                <li>Large CSS or font files delaying content rendering.</li>
              </ul>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How to Improve LCP:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Optimize server performance with CDNs and caching.</li>
                <li>Compress images using modern formats like WebP or AVIF.</li>
                <li>Minify and defer non-critical CSS and JavaScript.</li>
                <li>Preload key resources (e.g., hero images, fonts).</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4 mt-8">
            3. FID (First Input Delay)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What It Measures:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                FID measures the <strong className="font-bold">time delay</strong> between a user's first interaction (e.g., click or tap) and the browser's ability to process that event. It reflects how interactive your website feels.
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How It's Calculated:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                The time difference between the user's input and the browser processing the event. This is tracked during the <strong className="font-bold">first meaningful interaction</strong> after the page starts loading.
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What Impacts FID:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Long JavaScript execution times (main thread blocking).</li>
                <li>Heavy third-party scripts.</li>
                <li>Large JavaScript bundles.</li>
                <li>Slow event listeners.</li>
              </ul>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How to Improve FID:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Break up large JavaScript bundles into smaller chunks.</li>
                <li>Use <strong className="font-bold">code splitting</strong> and lazy loading.</li>
                <li>Optimize critical JavaScript to run asynchronously.</li>
                <li>Minimize the impact of third-party scripts.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4 mt-8">
            4. TTFB (Time to First Byte)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What It Measures:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                TTFB measures the time it takes from when the user's browser makes a request to the server to when it receives the <strong className="font-bold">first byte</strong> of data. It's a server-related metric.
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How It's Calculated:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                TTFB = (Redirect Time) + (Connection Time) + (Backend Response Time)
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What Impacts TTFB:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Slow server response times.</li>
                <li>Inefficient backend processing.</li>
                <li>Network latency between the client and server.</li>
                <li>Lack of caching.</li>
              </ul>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How to Improve TTFB:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Use a Content Delivery Network (CDN) to reduce latency.</li>
                <li>Optimize backend processes (database queries, API responses).</li>
                <li>Cache frequently accessed data at the edge.</li>
                <li>Reduce server-side rendering overhead.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4 mt-8">
            5. INP (Interaction to Next Paint)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What It Measures:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                INP captures the <strong className="font-bold">latency of all interactions</strong> a user has with the page (e.g., clicks, taps, keypresses) and summarizes them into a single metric. It's a comprehensive metric for interaction responsiveness.
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4 mt-2">
                Tracking the time from a user's click/tap/keypress to the browser showing the next visual update (paint).
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How It's Calculated:</strong>
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                INP = Maximum latency of user interactions during the page lifecycle.
              </p>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4 mt-2">
                If there are many interactions, it uses the <strong className="font-bold">longest interaction delay</strong> to represent responsiveness.
              </p>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">What Impacts INP:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Main thread being blocked by heavy tasks.</li>
                <li>Large JavaScript tasks causing delays.</li>
                <li>Non-optimized event handlers.</li>
              </ul>
            </div>

            <div>
              <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                <strong className="font-bold">How to Improve INP:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>Break up long tasks into smaller chunks.</li>
                <li>Use <strong className="font-bold">web workers</strong> to handle background tasks off the main thread.</li>
                <li>Ensure event handlers are optimized for minimal latency.</li>
                <li>Use frameworks with efficient rendering (e.g., React, Vue) and reduce unnecessary re-renders.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4 mt-8">
            Relation Between Metrics
          </h2>
          <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-4">
            These metrics are interconnected:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
            <li>A slow server (high TTFB) delays <strong className="font-bold">LCP</strong>.</li>
            <li>Heavy scripts blocking the main thread increase <strong className="font-bold">FID</strong> and <strong className="font-bold">INP</strong>.</li>
            <li>Layout instability caused by lazy-loaded elements negatively impacts <strong className="font-bold">CLS</strong>.</li>
          </ul>
          <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mt-4">
            By focusing on all these metrics holistically, you ensure a fast, stable, and responsive user experience. Core Web Vitals tools like <strong className="font-bold">Lighthouse</strong>, <strong className="font-bold">PageSpeed Insights</strong>, and <strong className="font-bold">Web Vitals Chrome extension</strong> can help monitor and improve these metrics.
          </p>
        </div>

        <hr className="border-slate-200 dark:border-white/10 my-8" />

        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-6 mt-8">
            LCP vs FCP: Understanding the Difference
          </h2>
          <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-6">
            LCP (Largest Contentful Paint) and FCP (First Contentful Paint) are both important performance metrics in web development, particularly for measuring user-perceived loading performance. Here's a comparison:
          </p>

          <hr className="border-slate-200 dark:border-white/10 my-6" />

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                1. First Contentful Paint (FCP)
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>
                  <strong className="font-bold">Definition</strong>: Measures the time from when the page starts loading to when <strong className="font-bold">any content (text, image, canvas)</strong> is rendered on the screen.
                </li>
                <li>
                  <strong className="font-bold">What it indicates</strong>: The first point at which the user sees something on the screen. It is an early indicator of the loading experience.
                </li>
                <li>
                  <strong className="font-bold">Focus</strong>: Focuses on <strong className="font-bold">"first visible feedback"</strong> to users.
                </li>
                <li>
                  <strong className="font-bold">Example</strong>: If a website loads a logo or some text before anything else, the time it takes for that element to appear is the FCP.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                2. Largest Contentful Paint (LCP)
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                <li>
                  <strong className="font-bold">Definition</strong>: Measures the time from when the page starts loading to when the <strong className="font-bold">largest visible content element</strong> (such as a hero image, a heading, or a block of text) is rendered on the screen.
                </li>
                <li>
                  <strong className="font-bold">What it indicates</strong>: Marks the <strong className="font-bold">most meaningful point of content visibility</strong>, indicating when the main content of the page is fully visible to the user.
                </li>
                <li>
                  <strong className="font-bold">Focus</strong>: Focuses on <strong className="font-bold">"main content loading"</strong>.
                </li>
                <li>
                  <strong className="font-bold">Example</strong>: If a website has a large banner or hero image, the time it takes to render that element is the LCP.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Key Differences
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-left font-bold text-slate-900 dark:text-white">Metric</th>
                    <th className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-left font-bold text-slate-900 dark:text-white">FCP</th>
                    <th className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-left font-bold text-slate-900 dark:text-white">LCP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 font-bold text-slate-900 dark:text-white">What it Measures</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">First visible content</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Largest visible content</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 font-bold text-slate-900 dark:text-white">Focus</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Initial loading experience</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Main content loading experience</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 font-bold text-slate-900 dark:text-white">User Impact</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Early feedback for perceived interactivity</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Completeness of the loading experience</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 font-bold text-slate-900 dark:text-white">Type of Elements</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Any content (text, image, canvas)</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Largest block of text, image, or video visible</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 font-bold text-slate-900 dark:text-white">Timeline</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Happens earlier in the loading process</td>
                    <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-gray-300">Happens later, closer to when page feels ready</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Optimization Tips
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                  <strong className="font-bold">To Improve FCP:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                  <li>Minimize render-blocking JavaScript and CSS.</li>
                  <li>Optimize critical rendering paths.</li>
                  <li>Use faster servers and CDNs.</li>
                  <li>Preload important resources.</li>
                </ol>
              </div>
              <div>
                <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mb-2">
                  <strong className="font-bold">To Improve LCP:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed ml-4">
                  <li>Optimize images (compression, responsive formats like WebP).</li>
                  <li>Lazy load below-the-fold content.</li>
                  <li>Use a Content Delivery Network (CDN).</li>
                  <li>Reduce server response times and use caching.</li>
                </ol>
              </div>
            </div>
            <p className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed mt-6">
              Both metrics are critical for improving Core Web Vitals and enhancing the user experience.
            </p>
          </div>
        </div>
      </div>
    ),
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
];
