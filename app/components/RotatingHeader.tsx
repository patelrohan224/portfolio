'use client'
import React, { useState, useEffect } from 'react';

const words = ["high-performance", "SEO-optimized", "future-ready", "Core Web Vitals", "pixel-perfect"];

const RotatingHeader: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span key={words[index]} className="animate-word gradient-text italic pr-2">
      {words[index]}
    </span>
  );
};

export default RotatingHeader;

