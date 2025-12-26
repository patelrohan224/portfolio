'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Cpu, 
  Code2, 
  Layout, 
  Zap, 
  Trophy,
  Terminal,
  ChevronRight,
  Menu,
  X,
  Send,
  MessageSquare,
  Sparkles,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  Calendar,
  Clock,
  Sun,
  Moon,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES, EXPERIENCES, PROJECTS, EDUCATION_DATA, BLOGS } from './constants';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { Blog, Project } from './types';

// Theme Toggle Component
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    setTheme(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-95"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

// Performance Metrics Component (Showcase Expertise)
const PerformanceScorecard: React.FC = () => {
  const metrics = [
    { label: 'Performance', score: 100, color: 'text-green-500' },
    { label: 'Accessibility', score: 89, color: 'text-green-500' },
    { label: 'Best Practices', score: 100, color: 'text-green-500' },
    { label: 'SEO', score: 100, color: 'text-green-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mt-12 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {metrics.map((m) => (
        <div key={m.label} className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center border-slate-200 dark:border-white/10">
          <div className={`text-2xl md:text-3xl font-black mb-1 ${m.color}`}>
            {m.score}
          </div>
          <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-gray-500">
            {m.label}
          </div>
          <div className="mt-2 w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Persistent Floating AI Chat Component with Streaming
const FloatingAIChat: React.FC<{ forcedOpen?: boolean; setForcedOpen?: (v: boolean) => void }> = ({ forcedOpen, setForcedOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forcedOpen) setIsOpen(true);
  }, [forcedOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try { 
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        You are Rohan Patel's Personal AI Agent. 
        Context: Rohan is an SDE-2 at Prosperr.io, previously at NoBroker.com. 
        Expertise: React, Next.js, Performance Optimization (Core Web Vitals), SEO.
        Education: B.E. in Computer Engineering with Distinction.
        Awards: Extra Miler, Rising Star.
        Answer professionally and concisely to this query about Rohan: "${userMsg}"
      `;

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      let fullText = '';
      setMessages(prev => [...prev, { role: 'ai', text: '' }]);
      
      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'ai', text: fullText };
          return newMsgs;
        });
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "API Error: I'm currently having a connection timeout." }]);
    } finally {
      setLoading(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    if (setForcedOpen) setForcedOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="glass-card w-[350px] sm:w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-blue-600/20 border-b border-black/5 dark:border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Cpu size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Rohan's AI Agent</h3>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-widest font-bold">Streaming Online</p>
              </div>
            </div>
            <button onClick={closeChat} className="text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white p-1">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 dark:bg-[#030712]/50">
            {messages.length === 0 && (
              <div className="text-center py-10 opacity-50">
                <Sparkles size={32} className="mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-slate-500 dark:text-gray-400">Ask about my React architecture or Core Web Vitals skills!</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-gray-200 rounded-tl-none'
                }`}>
                  {m.text || (loading && m.role === 'ai' ? '...' : '')}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAsk} className="p-4 bg-white dark:bg-[#030712] border-t border-slate-100 dark:border-white/10 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 p-2 rounded-xl text-white disabled:opacity-50 transition-colors"
            >
              {loading ? <Zap size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          name="consult ai agent"
          className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all group relative"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-brand-light dark:border-brand-dark rounded-full"></div>
          <MessageSquare className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

      <div className="space-y-24">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-12 h-12 bg-brand-light dark:bg-brand-dark border-2 border-blue-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
               <span className="text-blue-500 font-black text-xs">{EXPERIENCES.length - idx}</span>
            </div>

            <div className="w-full md:w-[45%] ml-16 md:ml-0">
              <div className="glass-card p-8 rounded-[2rem] hover:border-blue-500/50 transition-all group relative">
                <div className="absolute -top-3 -right-3 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase text-white">
                   {exp.period.split(' – ')[0]}
                </div>
                
                <h3 className="text-3xl font-black mb-1 text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors tracking-tighter uppercase">{exp.role}</h3>
                <p className="text-blue-600 dark:text-blue-500 font-bold mb-6 text-lg">{exp.company}</p>
                
                <ul className="space-y-4 mb-8">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-gray-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors">
                      <Zap size={14} className="mt-1 text-blue-500 shrink-0 opacity-50" />
                      {h}
                    </li>
                  ))}
                </ul>

                {exp.awards && (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-yellow-500 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest w-fit">
                    <Trophy size={14} /> {exp.awards}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:block w-[45%] pointer-events-none select-none">
              <div className="text-[8rem] font-black text-slate-200 dark:text-white/[0.03] leading-none transition-theme">
                {exp.period.slice(0, 4)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Education Timeline Entry */}
        {EDUCATION_DATA.map((edu, idx) => (
          <div key={`edu-${idx}`} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-12 h-12 bg-brand-light dark:bg-brand-dark border-2 border-purple-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
               <GraduationCap size={20} className="text-purple-500" />
            </div>

            <div className="w-full md:w-[45%] ml-16 md:ml-0">
              <div className="glass-card p-8 rounded-[2rem] hover:border-purple-500/50 transition-all group relative border-purple-500/20">
                <div className="absolute -top-3 -right-3 px-4 py-1 bg-purple-600 rounded-full text-[10px] font-black tracking-widest uppercase text-white">
                   {edu.period}
                </div>
                <h3 className="text-2xl font-black mb-1 text-slate-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors tracking-tighter uppercase">{edu.degree}</h3>
                <p className="text-purple-600 dark:text-purple-500 font-bold mb-4">{edu.institution}</p>
                <p className="text-slate-600 dark:text-gray-400 text-sm font-medium italic">{edu.details}</p>
              </div>
            </div>
            
            <div className="hidden md:block w-[45%] text-right px-10">
               <div className="text-4xl font-black text-slate-200 dark:text-white/10 uppercase tracking-widest">Education</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RotatingHeader: React.FC = () => {
  const words = ["high-performance", "SEO-optimized", "future-ready", "Core Web Vitals", "pixel-perfect"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span key={words[index]} className="animate-word gradient-text italic">
      {words[index]}
    </span>
  );
};

// --- BLOG COMPONENTS ---

const BlogCard: React.FC<{ blog: Blog; onClick: () => void }> = ({ blog, onClick }) => (
  <div 
    onClick={onClick}
    className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-all"
  >
    <div className="aspect-[16/9] overflow-hidden">
      <img 
        src={blog.image} 
        alt={blog.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
          {blog.category}
        </span>
        <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-black">{blog.date}</span>
      </div>
      <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{blog.title}</h3>
      <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">{blog.summary}</p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-gray-500 uppercase font-black">
          <Clock size={12} /> {blog.readTime}
        </span>
        <span className="text-blue-600 dark:text-blue-500 group-hover:translate-x-1 transition-transform">
          <ChevronRight size={18} />
        </span>
      </div>
    </div>
  </div>
);

const BlogDetailView: React.FC<{ blog: Blog; onBack: () => void }> = ({ blog, onBack }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-200 dark:bg-white/5">
        <div className="h-full bg-blue-600 transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-black uppercase tracking-widest">Back to Blogs</span>
        </button>

        <div className="mb-8 flex items-center gap-4">
          <span className="px-4 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded-full border border-blue-500/20">
            {blog.category}
          </span>
          <div className="flex items-center gap-6 text-slate-500 dark:text-gray-500 text-xs font-black uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar size={14} /> {blog.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {blog.readTime}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight uppercase text-slate-900 dark:text-white">
          {blog.title}
        </h1>

        <div className="aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-slate-200 dark:border-white/10">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose dark:prose-invert prose-blue max-w-none">
          <div className="text-xl text-slate-700 dark:text-gray-300 font-light leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-blue-600/20">R</div>
            <div>
              <p className="font-black uppercase tracking-widest text-slate-900 dark:text-white">Rohan Patel</p>
              <p className="text-sm text-slate-500 dark:text-gray-500 uppercase tracking-widest font-black">SDE-2 @ Prosperr.io</p>
            </div>
          </div>
          <div className="flex gap-4">
             <a href="https://linkedin.com/in/patelrohan224" className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
             <a href="https://github.com/patelrohan224" className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors"><Github size={20} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiForcedOpen, setAiForcedOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  // Basic Navigation State
  const [view, setView] = useState<'portfolio' | 'blogs' | 'blog-detail'>('portfolio');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToBlog = (id: string) => {
    setSelectedBlogId(id);
    setView('blog-detail');
  };

  const selectedBlog = BLOGS.find(b => b.id === selectedBlogId);
  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];

  return (
    <div className="bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-gray-100 transition-theme">
      <div className="min-h-screen bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-gray-100 transition-theme selection:bg-blue-500/30">
        <FloatingAIChat forcedOpen={aiForcedOpen} setForcedOpen={setAiForcedOpen} />
        
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div 
              className="text-2xl font-black tracking-tighter cursor-pointer text-slate-900 dark:text-white"
              onClick={() => setView('portfolio')}
            >
              ROHAN<span className="text-blue-500">.</span>PATEL
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-gray-400">
              {view === 'portfolio' ? (
                <>
                  {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                      {item}
                    </a>
                  ))}
                  <button onClick={() => setView('blogs')} className="hover:text-slate-900 dark:hover:text-white transition-colors text-blue-600 dark:text-blue-500 font-black underline underline-offset-8">
                    Blogs
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setView('portfolio')} className="hover:text-slate-900 dark:hover:text-white transition-colors">Portfolio Home</button>
                  <button onClick={() => setView('blogs')} className={`hover:text-slate-900 dark:hover:text-white transition-colors ${view === 'blogs' ? 'text-blue-600 dark:text-blue-500 font-black' : ''}`}>All Blogs</button>
                </>
              )}
              <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button name="menu" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 dark:text-gray-400">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-brand-light dark:bg-brand-dark border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
              <button onClick={() => { setView('portfolio'); setIsMenuOpen(false); }} className="text-left text-lg font-bold">Portfolio</button>
              <button onClick={() => { setView('blogs'); setIsMenuOpen(false); }} className="text-left text-lg font-bold text-blue-600 dark:text-blue-500">Blogs</button>
              {view === 'portfolio' && ['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Main Content Router */}
        {view === 'portfolio' ? (
          <main className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  SDE-2 • Performance Architect
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                  Building scalable <br />
                  <RotatingHeader /> code.
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-6 leading-relaxed font-light">
                  Crafting pixel-perfect architectures at <span className="text-slate-900 dark:text-white font-medium">Prosperr.io</span>. 
                  Expert in Core Web Vitals, SSR optimization, and UI performance engineering.
                </p>
                
                <PerformanceScorecard />

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button onClick={() => setAiForcedOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95">
                    Consult AI Agent <MessageSquare size={20} />
                  </button>
                  <button onClick={() => setView('blogs')} className="bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white px-8 py-4 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95">
                    Insights & Blogs <BookOpen size={20} />
                  </button>
                </div>
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
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          activeFilter === cat 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                          : 'bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
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
                            <span key={t} className="text-[10px] font-bold text-slate-500 dark:text-blue-400">#{t}</span>
                          ))}
                        </div>
                        <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-8 leading-relaxed font-light">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <a href={project.link} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all group/link">
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
            <section id="blogs" className="py-24 px-4 bg-brand-light dark:bg-brand-dark relative overflow-hidden">
              <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-slate-900 dark:text-white">
                  <div>
                    <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-2 uppercase tracking-[0.3em]">/ shared wisdom</p>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Latest Thinking</h2>
                  </div>
                  <button 
                    onClick={() => setView('blogs')}
                    className="px-8 py-3 bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  >
                    View All Articles
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOGS.slice(0, 3).map(blog => (
                    <BlogCard key={blog.id} blog={blog} onClick={() => navigateToBlog(blog.id)} />
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
                      Let's scale <br />
                      <span className="text-blue-600 dark:text-blue-500">together.</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-gray-400 mb-12 font-light leading-relaxed">
                      Based in Bengaluru, building for the globe. Available for architecture consulting and high-impact engineering roles.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <a href="mailto:rohanpateloff@gmail.com" className="flex items-center gap-4 p-6 glass-card rounded-3xl hover:border-blue-500/50 transition-all group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Inbox</p>
                          <p className="font-bold truncate text-slate-900 dark:text-white">rohanpateloff@gmail.com</p>
                        </div>
                      </a>
                      <div className="flex items-center gap-4 p-6 glass-card rounded-3xl">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-500">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Base</p>
                          <p className="font-bold text-slate-900 dark:text-white">Bengaluru, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-20">
                    <div className="flex flex-col gap-6">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500">Socials</h4>
                      <a href="https://linkedin.com/in/patelrohan224" target="_blank" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">LinkedIn</a>
                      <a href="https://github.com/patelrohan224" target="_blank" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">GitHub</a>
                    </div>
                    <div className="flex flex-col gap-6">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500">Navigate</h4>
                      <a href="#skills" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">Skills</a>
                      <a href="#experience" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">History</a>
                      <a href="#projects" className="text-lg font-bold hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-gray-400 transition-colors">Works</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Performance Health: Excellent
                  </div>
                  <div>© {new Date().getFullYear()} Rohan Patel. Handcrafted with React.</div>
                </div>
              </div>
            </footer>
          </main>
        ) : view === 'blogs' ? (
          <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-20 text-center text-slate-900 dark:text-white">
              <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">/ thoughts on scale</p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-slate-900 dark:text-white">The Blog</h1>
              <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                Engineering deep-dives into frontend performance, architectural patterns, and real-world fintech challenges.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOGS.map(blog => (
                <BlogCard key={blog.id} blog={blog} onClick={() => navigateToBlog(blog.id)} />
              ))}
            </div>
          </main>
        ) : (
          selectedBlog && <BlogDetailView blog={selectedBlog} onBack={() => setView('blogs')} />
        )}
      </div>
    </div>
  );
}

export default App;
