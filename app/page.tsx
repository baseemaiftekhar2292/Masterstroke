'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Mic, Volume2, Send, Play, Pause, Award, 
  Zap, ShieldCheck, Cpu, Flame, CheckCircle, Lock 
} from 'lucide-react';

// --- 2050 MENTOR CONFIGURATION (FEATURES INTACT) ---
const MENTORS = [
  {
    id: 'ananya',
    name: "Ananya Ma'am",
    role: "Master Faculty - NCERT & Chemistry",
    image: "/images/ananya_saree.jpg", // Replace with your generated image path
    badge: "AI Organic Specialist",
    glowColor: "cyan",
    borderGlow: "border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.4)]",
    welcomeText: "Namaste! Main Ananya Ma'am. Aaj hum NCERT ke saare tough concepts aur traps ko instant decode karenge."
  },
  {
    id: 'kabir',
    name: "Kabir Sir",
    role: "Physics & Mechanics Genius",
    image: "/images/kabir_suit.jpg", // Replace with your generated image path
    badge: "JEE Advanced Architect",
    glowColor: "purple",
    borderGlow: "border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.4)]",
    welcomeText: "Hey Toppers! Kabir Sir here. Late-night numericals se darna band karo, 10-second neon shortcuts apply karo!"
  }
];

export default function Masterstroke2050() {
  // Existing States (Intact)
  const [activeMentor, setActiveMentor] = useState(MENTORS[0]);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // --- Speech Engine (Voice Response Intact) ---
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Reset previous voice
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- AI Gemini Handler (Backend Logic Intact) ---
  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    const userMsg = { role: 'user', content: query };
    setChatHistory(prev => [...prev, userMsg]);
    setLoading(true);
    setQuery('');

    try {
      // Direct call to Gemini backend API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: query, 
          mentor: activeMentor.name,
          role: activeMentor.role 
        }),
      });
      
      const data = await response.json();
      const aiResponseText = data.reply || "Aapka answer ready hai! Focus on NCERT key concepts.";
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponseText }]);
      speakText(aiResponseText);
    } catch (err) {
      // Fallback response for offline / demo testing
      const fallbackText = `${activeMentor.name}: Yeh sawal NEET/JEE point of view se bohot important hai. Step 1 me Formula balance karein aur units standard SI system me convert karein!`;
      setChatHistory(prev => [...prev, { role: 'assistant', content: fallbackText }]);
      speakText(fallbackText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* 2050 Cyber Background Mesh & Glow Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-pink-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Futuristic Header Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#05070D]/80 border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse">
            <Cpu className="w-6 h-6 text-black font-bold" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              MASTERSTROKE <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]">2050 AI</span>
            </h1>
            <p className="text-[10px] text-cyan-400/70 tracking-widest uppercase">Next-Gen JEE/NEET Intelligence Engine</p>
          </div>
        </div>

        {/* Pro Subscription Badge */}
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-105 transition-all">
          <Zap className="w-4 h-4 fill-black" /> Pro Plan (₹429/mo)
        </button>
      </header>

      {/* Main Grid Interface */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* LEFT PANEL: Glowing AI Faculty Selector */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Select Cyber AI Faculty
            </h2>

            <div className="space-y-4">
              {MENTORS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setActiveMentor(m);
                    speakText(m.welcomeText);
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 ${
                    activeMentor.id === m.id
                      ? `${m.borderGlow} bg-gradient-to-r from-slate-800/90 to-slate-900/90 scale-[1.02]`
                      : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  {/* Holographic Avatar Display */}
                  <div className="relative">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-cyan-400/40 shadow-inner"
                      onError={(e: any) => {
                        e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop";
                      }}
                    />
                    {activeMentor.id === m.id && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-ping" />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                      {m.badge}
                    </span>
                    <h3 className="font-bold text-base text-slate-100 mt-1">{m.name}</h3>
                    <p className="text-xs text-slate-400">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glowing Wave Audio Visualizer Card */}
          <div className="bg-slate-900/40 border border-purple-500/30 rounded-3xl p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-[0_0_35px_rgba(6,182,212,0.6)] mb-3">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden">
                <Volume2 className={`w-8 h-8 text-cyan-400 ${isSpeaking ? 'animate-bounce' : ''}`} />
              </div>
            </div>

            {/* Simulated Neon Lip-Sync Waves */}
            <div className="flex items-center gap-1.5 h-8 my-2">
              {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isSpeaking ? `${h}%` : '20%' }}
                  className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-150 shadow-[0_0_10px_#22d3ee]"
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              {isSpeaking ? `${activeMentor.name} is speaking...` : 'AI Voice Visualizer Ready'}
            </p>
          </div>
        </section>

        {/* RIGHT PANEL: Glowing Cyber AI Chat Workspace */}
        <section className="lg:col-span-8 bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-2xl flex flex-col justify-between min-h-[580px] shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          
          {/* Chat Messages Log */}
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20">
            {chatHistory.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
                <Sparkles className="w-12 h-12 text-cyan-400/40 animate-pulse mb-3" />
                <p className="text-sm font-medium text-slate-400">Poochhiye apna JEE/NEET ka koi bhi doubt!</p>
                <p className="text-xs text-slate-600 mt-1">{activeMentor.name} 24/7 online hain instant step-by-step guidance ke liye.</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-black font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-950 border border-cyan-500/30 text-slate-200 shadow-[0_0_15px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    <div className="text-[10px] opacity-70 mb-1 font-bold uppercase tracking-wider">
                      {msg.role === 'user' ? 'You' : activeMentor.name}
                    </div>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 text-xs text-cyan-400 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Cpu className="w-4 h-4 animate-spin" /> {activeMentor.name} is solving your doubt...
                </div>
              </div>
            )}
          </div>

          {/* Futuristic Glowing Prompt Input Bar */}
          <div className="mt-4 relative">
            <div className="flex items-center gap-3 bg-slate-950 border border-cyan-500/40 rounded-2xl p-2.5 focus-within:border-cyan-400 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder={`Ask ${activeMentor.name} any Physics, Organic or NCERT doubt...`}
                className="w-full bg-transparent px-3 py-1 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(6,182,212,0.6)] disabled:opacity-50"
              >
                <Send className="w-4 h-4 fill-black" />
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
