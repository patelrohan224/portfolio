'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Cpu, X, Send, Zap, Sparkles, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface FloatingAIChatProps {
  forcedOpen?: boolean;
  setForcedOpen?: (v: boolean) => void;
}

const FloatingAIChat: React.FC<FloatingAIChatProps> = ({ forcedOpen, setForcedOpen }) => {
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
            <button 
              onClick={closeChat} 
              aria-label="Close chat"
              className="text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white p-1"
            >
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
              type="submit"
              disabled={loading}
              aria-label={loading ? "Sending message" : "Send message"}
              className="bg-blue-600 hover:bg-blue-500 p-2 rounded-xl text-white disabled:opacity-50 transition-colors"
            >
              {loading ? <Zap size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Consult AI agent"
          className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all group relative"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-brand-light dark:border-brand-dark rounded-full" aria-hidden="true"></div>
          <MessageSquare className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default FloatingAIChat;

