'use client'
import React from 'react';
import { Zap, Trophy, GraduationCap, Clock } from 'lucide-react';
import { EXPERIENCES, EDUCATION_DATA } from '../constants';
import { calculateExperienceDuration } from '../utils/experience';

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
                <p className="text-blue-600 dark:text-blue-500 font-bold mb-2 text-lg">{exp.company}</p>
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 text-sm font-medium mb-6">
                  <Clock size={14} />
                  <span>{calculateExperienceDuration(exp.period)}</span>
                </div>
                
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
              <div className="text-[8rem] font-black text-slate-500 dark:text-white/50 leading-none transition-theme">
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
               <div className="text-4xl font-black text-slate-500 dark:text-white/60 uppercase tracking-widest">Education</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;

