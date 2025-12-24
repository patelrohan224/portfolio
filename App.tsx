
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
  GraduationCap
} from 'lucide-react';
import { SKILL_CATEGORIES, EXPERIENCES, PROJECTS, EDUCATION_DATA } from './constants';
import { GoogleGenAI } from '@google/genai';

// Persistent Floating AI Chat Component
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
    if (!query.trim()) return;

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

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'ai', text: result.text || "I'm having trouble connecting to my brain right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "API Error: I'm currently offline." }]);
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
          <div className="p-4 bg-blue-600/20 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Cpu size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Rohan's AI Agent</h3>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Online</p>
              </div>
            </div>
            <button onClick={closeChat} className="text-gray-400 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#030712]/50">
            {messages.length === 0 && (
              <div className="text-center py-10 opacity-50">
                <Sparkles size={32} className="mx-auto mb-2 text-blue-500" />
                <p className="text-sm">Ask me about Rohan's skills, experience, or project stack!</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="p-4 bg-[#030712] border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 p-2 rounded-xl text-white disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all group relative"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#030712] rounded-full"></div>
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
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-12 h-12 bg-[#030712] border-2 border-blue-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               <span className="text-blue-500 font-black text-xs">{EXPERIENCES.length - idx}</span>
            </div>

            <div className="w-full md:w-[45%] ml-16 md:ml-0">
              <div className="glass-card p-8 rounded-[2rem] hover:border-blue-500/50 transition-all group relative">
                <div className="absolute -top-3 -right-3 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase">
                   {exp.period.split(' – ')[0]}
                </div>
                
                <h3 className="text-3xl font-black mb-1 group-hover:text-blue-400 transition-colors tracking-tighter uppercase">{exp.role}</h3>
                <p className="text-blue-500 font-bold mb-6 text-lg">{exp.company}</p>
                
                <ul className="space-y-4 mb-8">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      <Zap size={14} className="mt-1 text-blue-500 shrink-0 opacity-50" />
                      {h}
                    </li>
                  ))}
                </ul>

                {exp.awards && (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest w-fit">
                    <Trophy size={14} /> {exp.awards}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:block w-[45%] pointer-events-none select-none">
              <div className="text-[8rem] font-black text-white/[0.03] leading-none">
                {exp.period.slice(0, 4)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Education Timeline Entry */}
        {EDUCATION_DATA.map((edu, idx) => (
          <div key={`edu-${idx}`} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-12 h-12 bg-[#030712] border-2 border-purple-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
               <GraduationCap size={20} className="text-purple-500" />
            </div>

            <div className="w-full md:w-[45%] ml-16 md:ml-0">
              <div className="glass-card p-8 rounded-[2rem] hover:border-purple-500/50 transition-all group relative border-purple-500/20">
                <div className="absolute -top-3 -right-3 px-4 py-1 bg-purple-600 rounded-full text-[10px] font-black tracking-widest uppercase">
                   {edu.period}
                </div>
                <h3 className="text-2xl font-black mb-1 group-hover:text-purple-400 transition-colors tracking-tighter uppercase">{edu.degree}</h3>
                <p className="text-purple-500 font-bold mb-4">{edu.institution}</p>
                <p className="text-gray-400 text-sm font-medium italic">{edu.details}</p>
              </div>
            </div>
            
            <div className="hidden md:block w-[45%] text-right px-10">
               <div className="text-4xl font-black text-white/10 uppercase tracking-widest">Education</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RotatingHeader: React.FC = () => {
  const words = ["high-performance", "SEO-optimized", "scalable", "future-ready", "Core Web Vitals", "pixel-perfect"];
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

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiForcedOpen, setAiForcedOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-blue-500/30">
      <FloatingAIChat forcedOpen={aiForcedOpen} setForcedOpen={setAiForcedOpen} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter">
            ROHAN<span className="text-blue-500">.</span>PATEL
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-gray-400">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#030712] border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            SDE-2 • UI/UX Specialist
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            Building scalable <br />
            <RotatingHeader /> code.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light">
            Crafting pixel-perfect, ultra-fast web architectures 
            at <span className="text-white font-medium">Prosperr.io</span> and <span className="text-white font-medium">NoBroker.com</span>. Focused on LCP, CLS, and FID optimization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setAiForcedOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95">
              Chat with My AI <MessageSquare size={20} />
            </button>
            <a href="#projects" className="bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95">
              See My Works <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">/ core stack</p>
          <h2 className="text-4xl md:text-6xl font-black mb-20 uppercase tracking-tighter">Stack & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="glass-card p-10 rounded-[2.5rem] hover:translate-y-[-8px] transition-all duration-300 text-left border-t border-white/5">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20">
                   {idx % 3 === 0 ? <Layout size={24} /> : idx % 3 === 1 ? <Zap size={24} /> : <Code2 size={24} />}
                </div>
                <h3 className="text-xl font-black mb-6 text-white uppercase tracking-widest">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-blue-500/30 transition-colors">
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
            <p className="text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">/ professional history</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">The Journey</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <ExperienceTimeline />
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-4">
            <div>
              <p className="text-blue-500 font-mono text-sm mb-2 uppercase tracking-[0.3em]">/ lab experiments</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Selected Works</h2>
            </div>
            <a href="https://github.com/patelrohan224" target="_blank" className="bg-white/5 px-6 py-3 rounded-2xl text-gray-300 hover:text-white transition-colors flex items-center gap-3 text-sm font-bold border border-white/10">
              Explore Github <Github size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="flex flex-col h-full glass-card rounded-[2.5rem] overflow-hidden group">
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} className="bg-blue-600/20 backdrop-blur-md text-blue-400 border border-blue-500/30 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-3xl font-black mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <a href={project.link} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white hover:text-blue-400 transition-all group/link">
                      Launch Case Study <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="pt-32 pb-12 px-4 border-t border-white/5 relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">
                Let's build something <br />
                <span className="text-blue-500">exceptional.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                Currently building high-performance financial interfaces at Prosperr.io. 
                Always open to technical discussions or collaborative builds.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="mailto:rohanpateloff@gmail.com" className="flex items-center gap-4 p-6 glass-card rounded-3xl hover:border-blue-500/50 transition-all group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Write to me</p>
                    <p className="font-bold truncate">rohanpateloff@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-6 glass-card rounded-3xl">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Base</p>
                    <p className="font-bold">Bengaluru, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-20">
              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">Socials</h4>
                <a href="https://linkedin.com/in/patelrohan224" target="_blank" className="text-lg font-bold hover:text-white text-gray-400 transition-colors">LinkedIn</a>
                <a href="https://github.com/patelrohan224" target="_blank" className="text-lg font-bold hover:text-white text-gray-400 transition-colors">GitHub</a>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">Navigate</h4>
                <a href="#skills" className="text-lg font-bold hover:text-white text-gray-400 transition-colors">Skills</a>
                <a href="#experience" className="text-lg font-bold hover:text-white text-gray-400 transition-colors">History</a>
                <a href="#projects" className="text-lg font-bold hover:text-white text-gray-400 transition-colors">Works</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               Status: Actively Coding Performance
            </div>
            <div>© {new Date().getFullYear()} Rohan Patel. Handcrafted with React.</div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-blue-400"><Sparkles size={14} /> Powered by Gemini-3</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
