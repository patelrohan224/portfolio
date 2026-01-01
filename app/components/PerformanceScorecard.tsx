'use client'
import React, { useState, useEffect } from 'react';

interface Metric {
  label: string;
  score: number;
  color: string;
  loading: boolean;
}

const PerformanceScorecard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Performance', score: 0, color: 'text-slate-400', loading: true },
    { label: 'Accessibility', score: 0, color: 'text-slate-400', loading: true },
    { label: 'Best Practices', score: 0, color: 'text-slate-400', loading: true },
    { label: 'SEO', score: 0, color: 'text-slate-400', loading: true },
  ]);

  // Calculate score from value based on thresholds
  const calculateScore = (value: number, thresholds: { good: number; needsImprovement: number }): number => {
    if (value <= thresholds.good) return 100;
    if (value <= thresholds.needsImprovement) return 75;
    return 50;
  };

  // Get color based on score
  const getColor = (score: number): string => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get progress bar color
  const getProgressColor = (score: number): string => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    // Measure real-time performance metrics
    const measurePerformance = () => {
      if (typeof window === 'undefined' || !window.performance) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!navigation) return;

      // Calculate Performance Score (based on Core Web Vitals)
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      
      // Get FCP from paint timing entries (correct way to access FCP)
      const paintEntries = performance.getEntriesByType('paint') as PerformancePaintTiming[];
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      const fcpTime = fcpEntry ? fcpEntry.startTime : loadTime;
      
      // LCP approximation (using load time as proxy)
      const lcpScore = calculateScore(loadTime, { good: 2500, needsImprovement: 4000 });
      const fcpScore = calculateScore(fcpTime, { good: 1800, needsImprovement: 3000 });
      const performanceScore = Math.round((lcpScore + fcpScore) / 2);

      // Accessibility - Check for common issues
      let accessibilityScore = 100;
      const images = document.querySelectorAll('img');
      let missingAlt = 0;
      images.forEach(img => {
        if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
          missingAlt++;
        }
      });
      if (missingAlt > 0) {
        accessibilityScore = Math.max(50, 100 - (missingAlt * 5));
      }

      // Best Practices - Check for HTTPS, modern APIs, etc.
      let bestPracticesScore = 100;
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        bestPracticesScore -= 20;
      }
      // Additional checks could be added here (e.g., service worker, modern JS features)

      // SEO - Check for meta tags, semantic HTML
      let seoScore = 100;
      const hasTitle = document.title && document.title.length > 0;
      const hasMetaDescription = document.querySelector('meta[name="description"]');
      const hasH1 = document.querySelector('h1');
      const hasLang = document.documentElement.lang;
      
      if (!hasTitle) seoScore -= 25;
      if (!hasMetaDescription) seoScore -= 25;
      if (!hasH1) seoScore -= 15;
      if (!hasLang) seoScore -= 10;

      setMetrics([
        { 
          label: 'Performance', 
          score: performanceScore, 
          color: getColor(performanceScore),
          loading: false 
        },
        { 
          label: 'Accessibility', 
          score: accessibilityScore, 
          color: getColor(accessibilityScore),
          loading: false 
        },
        { 
          label: 'Best Practices', 
          score: bestPracticesScore, 
          color: getColor(bestPracticesScore),
          loading: false 
        },
        { 
          label: 'SEO', 
          score: seoScore, 
          color: getColor(seoScore),
          loading: false 
        },
      ]);
    };

    // Store load event handler for cleanup
    const handleLoad = () => {
      setTimeout(measurePerformance, 100);
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      setTimeout(measurePerformance, 100);
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Also measure on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(measurePerformance, 100);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mt-12 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {metrics.map((m) => (
        <div key={m.label} className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center border-slate-200 dark:border-white/10">
          <div className={`text-2xl md:text-3xl font-black mb-1 transition-colors duration-500 ${m.loading ? 'animate-pulse' : ''} ${m.color}`}>
            {m.loading ? '...' : m.score}
          </div>
          <div className="text-[10px] uppercase font-black tracking-widest text-slate-600 dark:text-gray-400">
            {m.label}
          </div>
          <div className="mt-2 w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(m.score)} transition-all duration-1000 ease-out ${m.loading ? 'animate-pulse' : ''}`}
              style={{ width: m.loading ? '0%' : `${m.score}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceScorecard;

