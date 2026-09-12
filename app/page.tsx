'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Mic, Volume2, Send, Cpu, Zap, Globe, RefreshCw, Radio, Tag, 
  Menu, X, BookOpen, Video, Headphones, Play, Layers, ChevronRight
} from 'lucide-react';

// --- SYLLABUS DATA STRUCTURE ---
const SYLLABUS_DATA = {
  Physics: [
    "Units & Measurements", "Kinematics & Motion", "Laws of Motion", "Work, Energy & Power",
    "Rotational Dynamics", "Gravitation", "Thermodynamics", "Electrostatics", "Current Electricity",
    "Magnetic Effects of Current", "Optics & Wave Motion", "Modern Physics & Semiconductors"
  ],
  Chemistry: [
    "Some Basic Concepts of Chemistry", "Structure of Atom", "Chemical Bonding & Molecular Structure",
    "Thermodynamics & Equilibrium", "Redox Reactions", "Organic Chemistry - Basic Principles",
    "Hydrocarbons", "Solutions & Electrochemistry", "Chemical Kinetics", "p-Block & d-Block Elements",
    "Coordination Compounds", "Organic Compounds containing Oxygen & Nitrogen"
  ],
  Biology: [
    "Diversity in Living World", "Structural Organisation in Plants & Animals", "Cell Structure & Function",
    "Plant Physiology", "Human Physiology", "Reproduction & Genetics", "Evolution",
    "Biotechnology & Its Applications", "Ecology & Environment"
  ]
};

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

const MENTORS = [
  {
    id: 'ananya',
    name: "Ananya Ma'am",
    gender: 'female',
    role: "Master Faculty - Chemistry & NCERT Specialist",
    // Unsplash Human Avatar representing Indian Teacher in saree
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    badge: "AI Organic Specialist",
    borderGlow: "border-cyan-500 shadow-[0_0_35px_rgba(6,182,212,0.5)]",
    welcomeText: "Namaste! Main Ananya Ma'am. NCERT ke organic reactions aur concepts ko instant 3D classroom mode me decode karenge."
  },
  {
    id: 'kabir',
    name: "Kabir Sir",
    gender: 'male',
    role: "Physics & Mechanics Genius",
    // Unsplash Human Avatar representing Sharp Male Educator
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80",
    badge: "JEE Advanced Specialist",
    borderGlow: "border-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.5)]",
    welcomeText: "Hey Toppers! Kabir Sir here. Late-night numericals se darna nahi hai, live classroom shortcuts apply karo!"
  }
];

export default function Masterstroke() {
  const [activeMentor, setActiveMentor] = useState(MENTORS[0]);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // NEW FEATURES STATES
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<'Physics' | 'Chemistry' | 'Biology'>('Chemistry');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [podcastModalOpen, setPodcastModalOpen] = useState(false);
  const [podcastGenerating, setPodcastGenerating] = useState(false);
  const [podcastAudioReady, setPodcastAudioReady] = useState(false);

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

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang.voiceLang;

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
      utterance.pitch = 1.25;
      utterance.rate = 0.95;
    } else {
      chosenVoice = filteredVoices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('david') || 
        v.name.toLowerCase().includes('ravi') ||
        v.name.toLowerCase().includes('george')
      );
      utterance.pitch = 0.9;
      utterance.rate = 1.0;
    }

    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleAskAI = async (customPrompt?: string) => {
    const promptToUse = customPrompt || query;
    if (!promptToUse.trim()) return;

    const userMsg = { role: 'user', content: promptToUse, lang: selectedLang.name };
    setChatHistory(prev => [...prev, userMsg]);
    setLoading(true);
    if (!customPrompt) setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: promptToUse, 
          mentor: activeMentor.name,
          role: activeMentor.role,
          language: selectedLang.code,
          chapter: selectedChapter
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

  const handleGeneratePodcast = () => {
    if (!selectedChapter) return;
    setPodcastGenerating(true);
    setPodcastAudioReady(false);
    
    setTimeout(() => {
      setPodcastGenerating(false);
      setPodcastAudioReady(true);
      speakText(`Welcome to Masterstroke Audio Revision Podcast for ${selectedChapter}. ${activeMentor.name} is hosting this session.`);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#04060B] text-slate-100 font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-pink-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* --- SIDEBAR HAMBURGER DRAWER --- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex">
          <div className="w-80 md:w-96 bg-slate-950 border-r border-cyan-500/30 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-cyan-400" />
                  <h2 className="font-black text-lg text-cyan-400 tracking-wider">MASTERSTROKE MENU</h2>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Subject Selector Tabs */}
              <div className="flex gap-2 mb-6 bg-slate-900 p-1.5 rounded-xl border border-cyan-500/20">
                {(['Physics', 'Chemistry', 'Biology'] as const).map(subj => (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedSubject === subj ? 'bg-cyan-500 text-black shadow-[0_0_15px_#22d3ee]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              {/* Syllabus Chapters List */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> {selectedSubject} Chapter Syllabus
                </h3>
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {SYLLABUS_DATA[selectedSubject].map((chap, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedChapter(chap);
                        setSidebarOpen(false);
                        handleAskAI(`Explain key formulas and NCERT traps for chapter: ${chap}`);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer flex items-center justify-between transition-all ${
                        selectedChapter === chap 
                          ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-300' 
                          : 'bg-slate-900/50 hover:bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      <span>{idx + 1}. {chap}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recorded Lectures & AI Podcast Links */}
              <div className="mt-6 space-y-3 border-t border-slate-800 pt-4">
                <button 
                  onClick={() => {
                    setSidebarOpen(false);
                    setPodcastModalOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-2 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <Headphones className="w-4 h-4 text-purple-400" /> Generate Topic Podcast
                </button>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <Video className="w-4 h-4 text-cyan-400" /> 120+ High-Yield Video Lectures Included
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-4">
              NEET (UG) & JEE 2026/2027 Syllabus Synchronized
            </div>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Cyberpunk Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#04060B]/80 border-b border-cyan-500/20 px-6 py-4 flex flex-wrap justify-between items-center gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Trigger Button */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              MASTERSTROKE
            </h1>
            <p className="text-[10px] text-cyan-400/70 tracking-widest uppercase flex items-center gap-1">
              <span>JEE & NEET AI Live Classroom</span>
              {selectedChapter && <span className="text-pink-400 font-bold">• {selectedChapter}</span>}
            </p>
          </div>
        </div>

        {/* Translation Selector & ₹229 Subscription Badge */}
        <div className="flex items-center gap-3 flex-wrap">
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

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-black shadow-[0_0_25px_rgba(168,85,247,0.6)] cursor-pointer hover:scale-105 transition-all">
            <Zap className="w-4 h-4 fill-black" />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="line-through text-[11px] text-slate-900/70 font-bold">₹429</span>
                <span className="font-black text-sm text-black">₹229/mo</span>
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-tighter text-slate-950 flex items-center gap-0.5">
                <Tag className="w-2.5 h-2.5" /> Code: NEWTOMASTER (₹200 OFF)
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* LEFT PANEL: Live Interactive AI Classroom Human Avatars */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Live AI Studio Faculty
              </h2>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                <Radio className="w-3 h-3 animate-ping" /> STUDIO LIVE
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
                  className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 ${
                    activeMentor.id === m.id
                      ? `${m.borderGlow} bg-gradient-to-r from-slate-800/95 to-slate-900/95 scale-[1.02]`
                      : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  {/* Human Avatar Image Container */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-cyan-400/50 shadow-md">
                    <img 
                      src={m.avatarUrl} 
                      alt={m.name} 
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                    />
                    {activeMentor.id === m.id && (
                      <div className="absolute inset-0 border-2 border-cyan-400 rounded-xl pointer-events-none animate-pulse" />
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

          {/* Interactive Classroom Visualizer Screen */}
          <div className="bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col items-center text-center relative overflow-hidden">
            {/* Live Backdrop Display */}
            <div className="w-full h-40 rounded-2xl overflow-hidden relative border border-slate-800 mb-3 bg-black">
              <img 
                src={activeMentor.avatarUrl} 
                alt="Live Classroom Backdrop" 
                className={`w-full h-full object-cover object-top opacity-80 ${isSpeaking ? 'scale-105 filter brightness-110' : ''} transition-all duration-700`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] text-cyan-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                <span>STAGE: {activeMentor.name}</span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> AUDIO ON</span>
              </div>
            </div>

            {/* Glowing Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-6 my-1">
              {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isSpeaking ? `${h}%` : '20%' }}
                  className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-150 shadow-[0_0_10px_#22d3ee]"
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isSpeaking ? `${activeMentor.name} is teaching in ${selectedLang.name}...` : 'AI Live Classroom Ready'}
            </p>
          </div>
        </section>

        {/* RIGHT PANEL: Glowing Cyber Live Classroom Screen */}
        <section className="lg:col-span-8 bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-2xl flex flex-col justify-between min-h-[580px] shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20">
            {chatHistory.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
                <Sparkles className="w-12 h-12 text-cyan-400/40 animate-pulse mb-3" />
                <p className="text-sm font-medium text-slate-400">Poochhiye koi bhi doubt ya Hamburger menu se Chapter select karein!</p>
                <p className="text-xs text-slate-600 mt-1">{activeMentor.name} ready hain step-by-step resolution ke liye.</p>
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
                  <RefreshCw className="w-4 h-4 animate-spin" /> {activeMentor.name} is solving in {selectedLang.name}...
                </div>
              </div>
            )}
          </div>

          {/* Prompt Input Bar */}
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
                onClick={() => handleAskAI()}
                disabled={loading}
                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.6)] disabled:opacity-50"
              >
                <Send className="w-4 h-4 fill-black" />
              </button>
            </div>
          </div>

        </section>
      </main>

      {/* --- PODCAST GENERATOR MODAL --- */}
      {podcastModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-purple-500/40 rounded-3xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.4)] relative">
            <button onClick={() => setPodcastModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-6 h-6 text-purple-400" />
              <h3 className="font-bold text-lg text-purple-300">AI Revision Podcast Generator</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select a chapter from syllabus menu to convert key formulas into an AI Audio Podcast.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-bold mb-4">
              Selected Topic: {selectedChapter || 'Units & Measurements (Default)'}
            </div>

            {podcastGenerating ? (
              <div className="py-8 flex flex-col items-center justify-center text-xs text-purple-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                Synthesizing AI Podcast with {activeMentor.name}...
              </div>
            ) : podcastAudioReady ? (
              <div className="py-4 text-center">
                <p className="text-xs text-emerald-400 font-bold mb-3">✓ Podcast Generated Successfully!</p>
                <button 
                  onClick={() => speakText(`Playing podcast revision for ${selectedChapter || 'Units and Measurements'}`)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_#10b981]"
                >
                  <Play className="w-4 h-4 fill-black" /> Play AI Audio Podcast
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGeneratePodcast}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 transition-all"
              >
                Generate 5-Minute AI Podcast
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
