'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Layout, 
  Zap, 
  Menu,
  X,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { SKILL_CATEGORIES, PROJECTS, BLOGS } from './constants';
import ThemeToggle from './components/ThemeToggle';
import PerformanceScorecard from './components/PerformanceScorecard';
import FloatingAIChat from './components/FloatingAIChat';
import ExperienceTimeline from './components/ExperienceTimeline';
import RotatingHeader from './components/RotatingHeader';
import BlogCard from './components/BlogCard';

// --- MAIN APP ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiForcedOpen, setAiForcedOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];

  return (
    <div className="bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-gray-100 transition-theme">
      <div className="min-h-screen bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-gray-100 transition-theme selection:bg-blue-500/30">
        {/* <FloatingAIChat forcedOpen={aiForcedOpen} setForcedOpen={setAiForcedOpen} /> */}
        
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <Link 
              href="/"
              className="text-2xl font-black tracking-tighter cursor-pointer text-slate-900 dark:text-white"
            >
              ROHAN<span className="text-blue-500">.</span>PATEL
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-600 dark:text-gray-300">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {item}
                </a>
              ))}
              <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors text-blue-600 dark:text-blue-500 font-black underline underline-offset-8">
                Blogs
              </Link>
              <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button aria-label='menu'  name="menu" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-gray-300">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-brand-light dark:bg-brand-dark border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-left text-lg font-bold">Portfolio</Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-left text-lg font-bold text-blue-600 dark:text-blue-500">Blogs</Link>
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="animate-in fade-in duration-500" id="about">
            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  SDE-2 • Frontend Engineer
                </div>
                <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                  Building scalable <br />
                  <RotatingHeader /> code.
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-6 leading-relaxed font-light">
                  Building high-performance web applications, with a focus on Core Web Vitals optimization, server-side rendering, and frontend performance engineering.
                </p>
                <PerformanceScorecard />
                {/* <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button aria-label="consult ai agent" onClick={() => setAiForcedOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95">
                    Consult AI Agent <MessageSquare size={20} />
                  </button>
                  <a href="#blog" className="bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white px-8 py-4 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95">
                    Insights & Blogs <BookOpen size={20} />
                  </a>
                </div> */}
              </div>
            </section>

            {/* Skills */}
            <section id="skills" className="py-24 px-4 bg-slate-100/50 dark:bg-gray-900/30">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">/ technical arsenal</p>
                <h2 className="text-4xl md:text-6xl font-black mb-20 uppercase tracking-tighter text-slate-900 dark:text-white">Stack & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="glass-card p-10 rounded-[2.5rem] hover:translate-y-[-8px] transition-all duration-300 text-left border-t border-slate-200 dark:border-white/5 group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 mb-8 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {idx % 3 === 0 ? <Layout size={24} /> : idx % 3 === 1 ? <Zap size={24} /> : <Code2 size={24} />}
                      </div>
                      <h3 className="text-xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-widest">
                        {cat.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/30 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Experience Timeline */}
            <section id="experience" className="py-24 px-4 overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                  <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">/ career path</p>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-slate-900 dark:text-white">The Journey</h2>
                  <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
                <ExperienceTimeline />
              </div>
            </section>

            {/* Featured Projects with Filtering */}
            <section id="projects" className="py-24 px-4 bg-slate-100/50 dark:bg-gray-900/30">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 text-slate-900 dark:text-white">
                  <div>
                    <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-2 uppercase tracking-[0.3em]">/ case studies</p>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Impactful Work</h2>
                  </div>
                  
                  {/* Filter Controls */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        aria-label='controls'
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          activeFilter === cat 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                          : 'bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                  {filteredProjects.map((project, idx) => (
                    <div key={project.title} className="flex flex-col h-full glass-card rounded-[2.5rem] overflow-hidden group animate-in fade-in zoom-in-95 duration-500">
                      <div className="aspect-video bg-slate-200 dark:bg-gray-800 relative overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-[#030712] via-transparent to-transparent opacity-60 dark:opacity-80 transition-theme"></div>
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-10 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map(t => (
                            <span key={t} className="text-[10px] font-bold text-slate-600 dark:text-blue-400">#{t}</span>
                          ))}
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-8 leading-relaxed font-light">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <a href={project.link} target='_blank' className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all group/link">
                            Explore Product <ExternalLink size={16} className="group-hover/link:translate-y-[-2px] transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recent Blogs Section */}
            <section id="blog" className="py-24 px-4 bg-brand-light dark:bg-brand-dark relative overflow-hidden">
              <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-slate-900 dark:text-white">
                  <div>
                    <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-2 uppercase tracking-[0.3em]">/ shared wisdom</p>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Latest Thinking</h2>
                  </div>
                  <Link 
                    href="/blog"
                    className="px-8 py-3 bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  >
                    View All Articles
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOGS.slice(0, 3).map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <footer id="contact" className="pt-32 pb-12 px-4 border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full"></div>
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 text-slate-900 dark:text-white">
                  <div className="max-w-2xl">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">
                      Let's Build <br />
                      <span className="text-blue-600 dark:text-blue-500">together.</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-gray-400 mb-12 font-light leading-relaxed">
                      Based in Bengaluru, creating impactful solutions. Open to engineering opportunities.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <a href="mailto:rohanpateloff@gmail.com" className="flex items-center gap-4 p-6 glass-card rounded-3xl hover:border-blue-500/50 transition-all group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-600 dark:text-gray-400 uppercase tracking-widest">Inbox</p>
                          <p className="font-bold truncate text-slate-900 dark:text-white">rohanpateloff@gmail.com</p>
                        </div>
                      </a>
                      <div className="flex items-center gap-4 p-6 glass-card rounded-3xl">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-500">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-600 dark:text-gray-400 uppercase tracking-widest">Base</p>
                          <p className="font-bold text-slate-900 dark:text-white">Bengaluru, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-20">
                    <div className="flex flex-col gap-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500">Socials</h3>
                      <a href="https://www.linkedin.com/in/rohan-patel-dev" target="_blank" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">LinkedIn</a>
                      <a href="https://github.com/patelrohan224" target="_blank" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">GitHub</a>
                    </div>
                    <div className="flex flex-col gap-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500">Navigate</h3>
                      <a href="#skills" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">Skills</a>
                      <a href="#experience" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-600 dark:text-gray-300 transition-colors">History</a>
                      <a href="#projects" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-600 dark:text-gray-300 transition-colors">Works</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-200 dark:border-white/5 text-slate-600 dark:text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em] gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Performance Health: Excellent
                  </div>
                  <div>© {new Date().getFullYear()} Rohan Patel. Handcrafted with React.</div>
                </div>
              </div>
            </footer>
          </main>
      </div>
    </div>
  );
}

export default App;
