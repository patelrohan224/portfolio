'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link 
          href="/"
          className="text-2xl font-black tracking-tighter cursor-pointer text-slate-900 dark:text-white"
        >
          ROHAN<span className="text-blue-500">.</span>PATEL
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-gray-400">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
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
          <button name="menu" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 dark:text-gray-400">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-light dark:bg-brand-dark border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-left text-lg font-bold">Portfolio</Link>
          <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-left text-lg font-bold text-blue-600 dark:text-blue-500">Blogs</Link>
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

