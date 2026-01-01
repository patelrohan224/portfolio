'use client'
import React from 'react';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import { Blog } from '../types';
import { generateSlug } from '../utils/slug';

interface BlogCardProps {
  blog: Blog;
  onClick?: () => void; // Optional for backward compatibility
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const slug = generateSlug(blog.title);
  const href = `/blog/${slug}`;

  const content = (
    <div className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-all">
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
        <span className="text-[10px] text-slate-600 dark:text-gray-400 uppercase font-black">{blog.date}</span>
      </div>
      <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{blog.title}</h3>
      <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">{blog.summary}</p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-gray-400 uppercase font-black">
          <Clock size={12} /> {blog.readTime}
        </span>
        <span className="text-blue-600 dark:text-blue-500 group-hover:translate-x-1 transition-transform">
          <ChevronRight size={18} />
        </span>
      </div>
    </div>
    </div>
  );

  if (onClick) {
    // Backward compatibility: if onClick is provided, use it
    return <div onClick={onClick}>{content}</div>;
  }

  // Use Next.js Link for navigation
  return <Link href={href}>{content}</Link>;
};

export default BlogCard;

