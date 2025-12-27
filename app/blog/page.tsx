'use client'
import React from 'react';
import { BLOGS } from '../constants';
import BlogCard from '../components/BlogCard';
import Navigation from '../components/Navigation';
import FloatingAIChat from '../components/FloatingAIChat';

export default function BlogsPage() {
  return (
    <div className="bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-gray-100 transition-theme min-h-screen">
      {/* <FloatingAIChat /> */}
      <Navigation />
      <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-20 text-center text-slate-900 dark:text-white">
          <p className="text-blue-600 dark:text-blue-500 font-mono text-sm mb-4 uppercase tracking-[0.3em]">/ thoughts on scale</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-slate-900 dark:text-white">The Blog</h1>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Engineering deep-dives into frontend performance, architectural patterns, and real-world challenges.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>
    </div>
  );
}

