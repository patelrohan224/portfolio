'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Linkedin, Github } from 'lucide-react';
import { BLOGS } from '../../constants';
import { generateSlug } from '../../utils/slug';
import Navigation from '../../components/Navigation';
import FloatingAIChat from '../../components/FloatingAIChat';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const slug = params?.slug as string;
  const blog = BLOGS.find(b => generateSlug(b.title) === slug);

  useEffect(() => {
    if (!blog) {
      router.push('/blog');
      return;
    }
    
    window.scrollTo(0, 0);
    const updateScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, [blog, router]);

  if (!blog) {
    return null;
  }

  return (
    <div className="bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-gray-100 transition-theme min-h-screen">
      {/* <FloatingAIChat /> */}
      <Navigation />
      <div className="animate-in fade-in slide-in-from-bottom-4">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-200 dark:bg-white/5">
          <div className="h-full bg-blue-600 transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/blog')}
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
            {blog.content}
          </div>

          <div className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-blue-600/20">R</div>
              <div>
                <p className="font-black uppercase tracking-widest text-slate-900 dark:text-white">Rohan Patel</p>
                <p className="text-sm text-slate-500 dark:text-gray-500 uppercase tracking-widest font-black">SDE-2 • Frontend Engineer</p>
              </div>
            </div>
            <div className="flex gap-4">
               <a href="https://www.linkedin.com/in/rohan-patel-dev" target='_blank' className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
               <a href="https://github.com/patelrohan224" target='_blank' className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors"><Github size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

