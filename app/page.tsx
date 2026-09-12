'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Mic, Volume2, Send, Cpu, Zap, Globe, RefreshCw, Radio
} from 'lucide-react';

// --- MULTI-LINGUAL TRANSLATION LIST ---
const LANGUAGES = [
  { code: 'Hinglish', name: 'Hinglish (Hindi + Eng)', voiceLang: 'hi-IN' },
  { code: 'Hindi', name: 'हिंदी (Hindi)', voiceLang: 'hi-IN' },
  { code: 'Marathi', name: 'मराठी (Marathi)', voiceLang: 'mr-IN' },
  { code: 'Gujarati', name: 'ગુજરાતી (Gujarati)', voiceLang: 'gu-IN' },
  { code: 'Tamil', name: 'தமிழ் (Tamil)', voiceLang: 'ta-IN' },
  { code: 'Telugu', name: 'తెలుగు (Telugu)', voiceLang: 'te-IN' },
  { code: 'Bengali', name: 'বাংলা (Bengali)', voiceLang: 'bn-IN' },
  { code: 'Kannada', name: 'ಕನ್ನಡ (Kannada)', voiceLang: 'kn-IN' },
  { code: 'English', name: 'English (Pure)', voiceLang: 'en-IN' },
];

// --- 2050 LIVE INTERACTIVE MENTORS CONFIGURATION ---
const MENTORS = [
  {
    id: 'ananya',
    name: "Ananya Ma'am",
    gender: 'female',
    role: "Master Faculty - Chemistry & NCERT",
    image: "/images/ananya_saree.jpg", // Saree Avatar Image Path
    badge: "AI Organic Specialist",
    borderGlow: "border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]",
    welcomeText: "Namaste! Main Ananya Ma'am. Aaj hum NCERT ke saare tough concepts aur reactions ko instant decode karenge."
  },
  {
    id: 'kabir',
    name: "Kabir Sir",
    gender: 'male',
    role: "Physics & Mechanics Genius",
    image: "/images/kabir_suit.jpg", // Futuristic Suit Avatar Image Path
    badge: "JEE Advanced Specialist",
    borderGlow: "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)]",
    welcomeText: "Hey Toppers! Kabir Sir here. Late-night numericals se darna nahi hai, 10-second neon shortcuts apply karo!"
  }
];

export default function Masterstroke2050() {
  const [activeMentor, setActiveMentor] = useState(MENTORS[0]);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load browser voices for Speech Engine
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setAvailableVoices(window.speechSynthesis.getVoices());
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Live Interactive Gender & Multi-Lingual Speech Engine
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang.voiceLang;

    // Filter Female vs Male voices
    const filteredVoices = availableVoices.filter(v => 
      v.lang.includes(selectedLang.voiceLang.split('-')[0]) || 
      v.lang.includes('IN') || 
      v.lang.includes('en')
    );

    let chosenVoice = null;
    if (activeMentor.gender === 'female') {
      chosenVoice = filteredVoices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('zira') || 
        v.name.toLowerCase().includes('swara') ||
        v.name.toLowerCase().includes('google hi-in') ||
        v.name.toLowerCase().includes('sangeeta')
      );
      utterance.pitch = 1.25; // High Pitch Natural Female Voice
      utterance.rate = 0.95;
    } else {
      chosenVoice = filteredVoices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('david') || 
        v.name.toLowerCase().includes('ravi') ||
        v.name.toLowerCase().includes('george')
      );
      utterance.pitch = 0.9; // Deeper Pitch Natural Male Voice
      utterance.rate = 1.0;
    }

    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Handle Gemini AI API Query + Live Output
  const handleAskAI = async () => {
    if (!query.trim()) return;

    const userMsg = { role: 'user', content: query, lang: selectedLang.name };
    setChatHistory(prev => [...prev, userMsg]);
    setLoading(true);
    const currentQuery = query;
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: currentQuery, 
          mentor: activeMentor.name,
          role: activeMentor.role,
          language: selectedLang.code // Send selected language to API backend
        }),
      });
      
      const data = await response.json();
      const aiResponseText = data.reply || `Aapka question ${selectedLang.name} mein solve ho gaya hai. Focus on core formulas!`;
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponseText, mentor: activeMentor.name }]);
      speakText(aiResponseText);
    } catch (err) {
      const fallbackText = `[${selectedLang.name}] ${activeMentor.name}: Step 1 mein formula balance karein aur units standard SI system me convert karein!`;
      setChatHistory(prev => [...prev, { role: 'assistant', content: fallbackText, mentor: activeMentor.name }]);
      speakText(fallbackText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#04060B] text-slate-100 font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* 2050 Futuristic Neon Mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-pink-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Cyberpunk Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#04060B]/80 border-b border-cyan-500/20 px-6 py-4 flex flex-wrap justify-between items-center gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-[0_0_25px_rgba(6,182,212,0.6)] animate-pulse">
            <Cpu className="w-6 h-6 text-black font-bold" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              MASTERSTROKE <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]">2050 AI</span>
            </h1>
            <p className="text-[10px] text-cyan-400/70 tracking-widest uppercase">Live Interactive Multi-Lingual Engine</p>
          </div>
        </div>

        {/* Translation Language Selector & Subscription Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Globe className="w-4 h-4 text-cyan-400" />
            <select
              value={selectedLang.code}
              onChange={(e) => {
                const lang = LANGUAGES.find(l => l.code === e.target.value);
                if (lang) setSelectedLang(lang);
              }}
              className="bg-transparent text-xs text-cyan-300 font-semibold focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-950 text-slate-100">
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xs uppercase shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105 transition-all">
            <Zap className="w-4 h-4 fill-black" /> Pro (₹429/mo)
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* LEFT PANEL: Live Interactive AI Mentors Selector */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Live AI Faculty
              </h2>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                <Radio className="w-3 h-3 animate-ping" /> LIVE ONLINE
              </span>
            </div>

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
                  <div className="relative">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-cyan-400/40 shadow-inner"
                      onError={(e: any) => {
                        e.target.src = m.gender === 'female' 
                          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop" 
                          : "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop";
                      }}
                    />
                    {activeMentor.id === m.id && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
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

          {/* Interactive Voice Wave & Visualizer */}
          <div className="bg-slate-900/40 border border-purple-500/30 rounded-3xl p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-[0_0_35px_rgba(6,182,212,0.6)] mb-3">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Volume2 className={`w-8 h-8 text-cyan-400 ${isSpeaking ? 'animate-bounce' : ''}`} />
              </div>
            </div>

            {/* Glowing Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-8 my-2">
              {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isSpeaking ? `${h}%` : '25%' }}
                  className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-150 shadow-[0_0_10px_#22d3ee]"
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              {isSpeaking ? `${activeMentor.name} is speaking in ${selectedLang.name}...` : 'AI Voice Engine Active'}
            </p>
          </div>
        </section>

        {/* RIGHT PANEL: Live Glowing Cyber Chat Workspace */}
        <section className="lg:col-span-8 bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-2xl flex flex-col justify-between min-h-[580px] shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20">
            {chatHistory.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
                <Sparkles className="w-12 h-12 text-cyan-400/40 animate-pulse mb-3" />
                <p className="text-sm font-medium text-slate-400">Ask any doubt in {selectedLang.name}!</p>
                <p className="text-xs text-slate-600 mt-1">{activeMentor.name} is ready with step-by-step visual solutions.</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-black font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-950 border border-cyan-500/30 text-slate-200 shadow-[0_0_15px_rgba(0,0,0,0.6)]'
                  }`}>
                    <div className="text-[10px] opacity-70 mb-1 font-bold uppercase tracking-wider">
                      {msg.role === 'user' ? `You (${msg.lang})` : activeMentor.name}
                    </div>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 text-xs text-cyan-400 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <RefreshCw className="w-4 h-4 animate-spin" /> {activeMentor.name} is translating & solving in {selectedLang.name}...
                </div>
              </div>
            )}
          </div>

          {/* Glowing Cyber Prompt Bar */}
          <div className="mt-4 relative">
            <div className="flex items-center gap-3 bg-slate-950 border border-cyan-500/40 rounded-2xl p-2.5 focus-within:border-cyan-400 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder={`Ask ${activeMentor.name} in ${selectedLang.name}...`}
                className="w-full bg-transparent px-3 py-1 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.6)] disabled:opacity-50"
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
