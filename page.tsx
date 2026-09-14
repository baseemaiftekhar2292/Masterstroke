'use client';

import React, { useState } from 'react';
import { 
  Sparkles, CreditCard, Volume2, Mic, Send, Globe, Download, 
  Play, CheckCircle, BookOpen, User, LayoutDashboard, 
  FileCheck, Headphones, MessageSquare, ShieldCheck, Compass, Zap, Layers, Eye, X, Clock, CheckSquare
} from 'lucide-react';

const SYLLABUS_DATA = {
  JEE: [
    { 
      subject: 'Physics', 
      chapters: [
        { name: 'Units & Measurements', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Kinematics 1D & 2D', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Laws of Motion & Friction', pdfUrl: '' },
        { name: 'Work, Power & Energy', pdfUrl: '' },
        { name: 'Rotational Dynamics', pdfUrl: '' },
        { name: 'Electrostatics & Capacitance', pdfUrl: '' }
      ] 
    },
    { 
      subject: 'Chemistry', 
      chapters: [
        { name: 'Structure of Atom', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Chemical Bonding & Structure', pdfUrl: '' },
        { name: 'Thermodynamics & Energetics', pdfUrl: '' },
        { name: 'Organic Reaction Mechanisms', pdfUrl: '' }
      ] 
    },
    { 
      subject: 'Mathematics', 
      chapters: [
        { name: 'Matrices & Determinants', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Calculus: Limits & Continuity', pdfUrl: '' },
        { name: 'Vector Algebra & 3D Geometry', pdfUrl: '' },
        { name: 'Trigonometric Equations', pdfUrl: '' }
      ] 
    }
  ],
  NEET: [
    { 
      subject: 'Physics', 
      chapters: [
        { name: 'Physical World & Measurement', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Laws of Motion & Forces', pdfUrl: '' },
        { name: 'Ray & Wave Optics', pdfUrl: '' }
      ] 
    },
    { 
      subject: 'Chemistry', 
      chapters: [
        { name: 'Basic Concepts of Chemistry', pdfUrl: '' },
        { name: 'Hydrocarbons & Organic Chemistry', pdfUrl: '' },
        { name: 'Solutions & Electrochemistry', pdfUrl: '' }
      ] 
    },
    { 
      subject: 'Biology (Botany & Zoology)', 
      chapters: [
        { name: 'Cell: The Unit of Life', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Plant Physiology & Photosynthesis', pdfUrl: '' },
        { name: 'Genetics & Evolution', pdfUrl: '' },
        { name: 'Human Physiology', pdfUrl: '' }
      ] 
    }
  ]
};

const AI_FACULTIES = [
  { id: 'physics', name: 'Dr. Vikram Varma', role: 'AI Quantum & Mechanics Head', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', subject: 'Physics' },
  { id: 'chem', name: 'Ananya Roy', role: 'AI Organic & NCERT Specialist', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300', subject: 'Chemistry' },
  { id: 'maths', name: 'Prof. Devraj', role: 'AI Calculus & 3D Geometry Genius', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300', subject: 'Mathematics' }
];

export default function MasterstrokeFuturisticApp() {
  const [examType, setExamType] = useState<'JEE' | 'NEET'>('JEE');
  const [activeTab, setActiveTab] = useState('campus-hub');
  const [selectedFaculty, setSelectedFaculty] = useState(AI_FACULTIES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('Hinglish (Hindi + Eng)');

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! Main aapka AI Studio Faculty Mentor hoon. Kisi bhi numerical ya theoretical concept me doubt ho, specify karein!' }
  ]);

  const [viewingPdf, setViewingPdf] = useState<{ title: string; url: string } | null>(null);
  const [notesComingSoonModal, setNotesComingSoonModal] = useState<string | null>(null);

  const [activeCbtTest, setActiveCbtTest] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const [selectedPodcastChapter, setSelectedPodcastChapter] = useState('Kinematics 1D & 2D');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [podcastLog, setPodcastLog] = useState<string | null>(null);

  // Comprehensive Real-Time AI Doubt Solver Engine
  const generateDynamicExplanation = (query: string, facultyName: string, lang: string) => {
    const q = query.toLowerCase();

    if (q.includes('trig') || q.includes('sin') || q.includes('cos') || q.includes('tan') || q.includes('angle')) {
      return `[${facultyName} - ${lang}]

📌 **Trigonometry Concept Breakdown:**
1. **Core Identities:**
   - sin²(θ) + cos²(θ) = 1
   - 1 + tan²(θ) = sec²(θ)
   - 1 + cot²(θ) = cosec²(θ)

2. **Compound & Quad-Angle Formulas:**
   - sin(A ± B) = sin A cos B ± cos A sin B
   - cos(A ± B) = cos A cos B ∓ sin A sin B

3. **NTA Exam Shortcut:** Quadrant rules [ASTC Rule: All-Sin-Tan-Cos] follow karein. Complementary angles (90°-θ) par identity directly apply karke steps reduce karein!`;
    } 

    if (q.includes('newton') || q.includes('motion') || q.includes('force') || q.includes('kinematic') || q.includes('friction')) {
      return `[${facultyName} - ${lang}]

📌 **Newtonian Mechanics Analysis:**
1. **Fundamental Equations:**
   - v = u + at
   - s = ut + ½ at²
   - v² = u² + 2as

2. **Free Body Diagram (FBD) Logic:**
   - Normal Force (N) is always perpendicular to contact plane.
   - Friction (f) = μN, acting opposite to relative motion.

3. **Problem Solving Tip:** System me sabhi forces ko X-axis (along motion) aur Y-axis (perpendicular) me resolve karke ΣF = ma execute karein.`;
    }

    if (q.includes('atom') || q.includes('bond') || q.includes('organic') || q.includes('reaction') || q.includes('acid')) {
      return `[${facultyName} - ${lang}]

📌 **Chemistry Core Explanation:**
1. **Structure & Bonding:**
   - VSEPR Theory: Hybridization (sp, sp², sp³) predicts geometry and lone pair repulsion.
2. **Organic Mechanism:**
   - Nucleophilic substitution (SN1 vs SN2): SN1 prefers tertiary carbocation; SN2 prefers primary steric unhindered center.
3. **NTA NCERT Rule:** Direct NCERT exceptions aur inorganic trend anomalies standard test papers me repeated aate hain!`;
    }

    if (q.includes('calculus') || q.includes('limit') || q.includes('integration') || q.includes('derivative')) {
      return `[${facultyName} - ${lang}]

📌 **Calculus & Analysis Steps:**
1. **Limits:** Check for 0/0 or ∞/∞ forms. L'Hôpital's Rule apply karein by differentiating numerator and denominator separately.
2. **Integration:** Substitution method (t = g(x)) or Integration by Parts (ILATE rule).
3. **Exam Tip:** Definite Integrals me King's Property [∫a to b f(x)dx = ∫a to b f(a+b-x)dx] maximum questions simplify kar deti hai!`;
    }

    return `[${facultyName} - ${lang}]

📌 **Custom Detailed Analysis for Query:** "${query}"

1. **Fundamental Concept:**
   NTA curriculum ke standard principles aur boundary conditions initialize karein.

2. **Step-by-Step Logic:**
   - Step 1: Given values identify karke SI units me convert karein.
   - Step 2: Core standard formula select karke values substitute karein.

3. **Exam Tip:** Calculation me sign convention (Positive/Negative directions) re-verify karein for 100% accuracy.`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    const aiResponse = generateDynamicExplanation(userMsg, selectedFaculty.name, selectedLanguage);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userMsg },
      { sender: 'ai', text: aiResponse }
    ]);
    setInputText('');
  };

  const handleOpenPdf = (chapName: string, url: string) => {
    if (url && url.length > 5) {
      setViewingPdf({ title: chapName, url });
    } else {
      setNotesComingSoonModal(chapName);
    }
  };

  const handleGeneratePodcast = () => {
    const summary = `Generating 5-minute Masterstroke Audio Podcast for "${selectedPodcastChapter}" in ${selectedLanguage}... Audio Overview initialized.`;
    setPodcastLog(summary);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Quick Audio Revise for ${selectedPodcastChapter}. Key formulas and concept summary starting now.`);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsAudioPlaying(true);
      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onerror = () => setIsAudioPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#030611] text-slate-100 font-sans overflow-hidden">
      
      {/* Sidebar Command Rail */}
      <aside className="w-64 bg-[#070d1e]/90 border-r border-cyan-500/20 flex flex-col justify-between p-4 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h1 className="text-lg font-black tracking-widest bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              MASTERSTROKE
            </h1>
          </div>

          <div className="bg-slate-950/80 p-1 rounded-xl border border-cyan-500/30 flex mb-6 shadow-inner">
            <button
              onClick={() => setExamType('JEE')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                examType === 'JEE' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              JEE CORE
            </button>
            <button
              onClick={() => setExamType('NEET')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                examType === 'NEET' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              NEET CORE
            </button>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'campus-hub', label: 'Virtual Campus Deck', icon: Compass },
              { id: 'ai-faculty', label: 'AI Studio Faculty', icon: User },
              { id: 'notes-vault', label: 'Edu-Vault Notes & PDF', icon: BookOpen },
              { id: 'cbt-center', label: 'CBT Exam Simulator', icon: FileCheck },
              { id: 'audio-revise', label: 'Quick Audio Revise', icon: Headphones }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-md shadow-cyan-500/10' 
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-cyan-500/20">
          <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-cyan-500/20 text-xs tracking-wider uppercase transition-all">
            Subscribe {examType} (₹229)
          </button>
        </div>
      </aside>

      {/* Main High-End Workspace */}
      <main className="flex-1 flex flex-col h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-[#040816] to-[#02040a] overflow-hidden">
        
        {/* Top Header */}
        <header className="px-6 py-4 border-b border-cyan-500/15 flex justify-between items-center bg-[#070d1e]/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-cyan-400 tracking-wider uppercase flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> {examType} Digital High School Walkthrough
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950 border border-cyan-500/30 rounded-lg px-3 py-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="Hinglish (Hindi + Eng)" className="bg-slate-900">Hinglish (Hindi + Eng)</option>
                <option value="Hindi" className="bg-slate-900">Hindi</option>
                <option value="English" className="bg-slate-900">English</option>
              </select>
            </div>
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full font-bold">
              AI Faculty Live • Active Session
            </span>
          </div>
        </header>

        {/* TAB 1: CAMPUS HUB */}
        {activeTab === 'campus-hub' && (
          <div className="p-8 overflow-y-auto space-y-8 flex-1">
            <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-950 border border-cyan-500/30 p-8 rounded-3xl relative overflow-hidden backdrop-blur-md">
              <div className="max-w-xl relative z-10">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Masterstroke Cyber Campus</span>
                <h2 className="text-2xl font-black text-white mt-1 mb-2">Futuristic AI Learning Deck</h2>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Experience EduRev-style structured study vaults combined with hyper-realistic AI Human Faculty, In-App PDF Viewers, and CBT Exam Simulators.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('ai-faculty')} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-cyan-500/20">
                    Connect AI Faculty
                  </button>
                  <button onClick={() => setActiveTab('notes-vault')} className="bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold px-5 py-2.5 rounded-xl text-xs">
                    Open In-App Edu Vault
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">AI Human Mentors & Subject Specialists</h3>
              <div className="grid grid-cols-3 gap-6">
                {AI_FACULTIES.map(fac => (
                  <div key={fac.id} className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-500/60 transition-all flex items-center gap-4">
                    <img src={fac.avatar} alt={fac.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{fac.name}</h4>
                      <p className="text-[10px] text-cyan-400 font-semibold">{fac.role}</p>
                      <button 
                        onClick={() => { setSelectedFaculty(fac); setActiveTab('ai-faculty'); }}
                        className="mt-2 text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-lg font-bold hover:bg-cyan-500 hover:text-black transition-all"
                      >
                        Ask Doubt →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI FACULTY CHAT */}
        {activeTab === 'ai-faculty' && (
          <div className="flex-1 flex p-6 gap-6 overflow-hidden">
            <div className="w-72 bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-4 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Select AI Faculty</h3>
              {AI_FACULTIES.map(fac => (
                <div 
                  key={fac.id}
                  onClick={() => setSelectedFaculty(fac)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    selectedFaculty.id === fac.id 
                      ? 'bg-cyan-500/20 border-cyan-400 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <img src={fac.avatar} alt={fac.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold">{fac.name}</h4>
                    <p className="text-[10px] text-slate-400">{fac.subject} Specialist</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 bg-slate-950/80 border border-cyan-500/20 rounded-2xl flex flex-col justify-between p-6">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <img src={selectedFaculty.avatar} alt={selectedFaculty.name} className="w-12 h-12 rounded-xl object-cover border border-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedFaculty.name}</h3>
                  <p className="text-xs text-cyan-400">{selectedFaculty.role}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg p-4 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      m.sender === 'user' ? 'bg-cyan-500 text-black font-semibold' : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2">
                <input 
                  type="text"
                  placeholder={`Ask ${selectedFaculty.name} any numerical or concept in ${selectedLanguage}...`}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  className="bg-transparent text-xs text-white flex-1 px-3 focus:outline-none"
                />
                <button onClick={handleSendMessage} className="bg-cyan-500 hover:bg-cyan-400 text-black p-2.5 rounded-lg font-bold transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EDU-VAULT NOTES & IN-APP PDF */}
        {activeTab === 'notes-vault' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white">{examType} Curated Study Vault & Detailed Notes</h2>
                <p className="text-xs text-slate-400">In-App Native PDF Reader • Zero External Links • Clean Masterstroke Interface</p>
              </div>
            </div>

            <div className="space-y-6">
              {SYLLABUS_DATA[examType].map((sec, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-5">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {sec.subject} Notes Library
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {sec.chapters.map((chap, cIdx) => (
                      <div key={cIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-cyan-500/40 transition-all">
                        <div>
                          <h4 className="text-xs font-semibold text-white">{chap.name}</h4>
                          <span className={`text-[10px] font-bold mt-1 inline-block ${chap.pdfUrl ? 'text-emerald-400' : 'text-purple-400'}`}>
                            {chap.pdfUrl ? '✔ In-App PDF Verified' : '⏳ Handwritten Notes Reviewing'}
                          </span>
                        </div>

                        <button 
                          onClick={() => handleOpenPdf(chap.name, chap.pdfUrl)}
                          className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Read Notes
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CBT SIMULATOR */}
        {activeTab === 'cbt-center' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white">{examType} NTA Computer-Based Mock Test Simulator</h2>
                <p className="text-xs text-slate-400">Real CBT Exam Interface with Instant Logic Solutions & Scoring</p>
              </div>
            </div>

            <div className="space-y-6">
              {SYLLABUS_DATA[examType].map((sec, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-5">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" /> {sec.subject} CBT Test Modules
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {sec.chapters.map((chap, cIdx) => (
                      <div key={cIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-cyan-500/40 transition-all">
                        <div>
                          <h4 className="text-xs font-semibold text-white">{chap.name}</h4>
                          <span className="text-[10px] text-slate-400 mt-1 block">10 Speed Questions • 15 Mins</span>
                        </div>

                        <button 
                          onClick={() => setActiveCbtTest(chap.name)}
                          className="px-4 py-2 bg-cyan-500 text-black hover:bg-cyan-400 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                        >
                          <Play className="w-3.5 h-3.5" /> Start Test
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: QUICK AUDIO REVISE */}
        {activeTab === 'audio-revise' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Headphones className="w-6 h-6 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">Masterstroke AI Quick Audio Revise</h2>
              </div>
              <p className="text-xs text-slate-300">
                Generated via NotebookLM AI Engine. Listen to 5-minute ultra-focused audio overviews for key NTA formulas.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="text-xs text-slate-400 mb-2 block font-semibold">Select Chapter for Podcast:</label>
                  <select
                    value={selectedPodcastChapter}
                    onChange={(e) => setSelectedPodcastChapter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {SYLLABUS_DATA[examType].flatMap(s => s.chapters).map((chap, i) => (
                      <option key={i} value={chap.name} className="bg-slate-900">{chap.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleGeneratePodcast}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/20 text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Volume2 className="w-4 h-4" /> Generate & Listen Audio Overview
                  </button>
                </div>
              </div>
            </div>

            {podcastLog && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    AUDIO PODCAST: {selectedPodcastChapter}
                  </span>
                  {isAudioPlaying && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-4 bg-cyan-400 animate-pulse"></span>
                      <span className="w-1.5 h-6 bg-cyan-400 animate-pulse"></span>
                      <span className="w-1.5 h-3 bg-cyan-400 animate-pulse"></span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800">
                  {podcastLog}
                </p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* CBT SIMULATION MODAL */}
      {activeCbtTest && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => { setActiveCbtTest(null); setShowSolution(false); setSelectedOption(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                NTA CBT SIMULATION MODE
              </span>
              <h3 className="text-sm font-bold text-white">{activeCbtTest} - Question #1</h3>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed mb-4">
              Q1. A particle moves along a straight line with constant acceleration a = 2 m/s². If initial velocity u = 4 m/s, find its total displacement in the 3rd second.
            </p>

            <div className="space-y-2 mb-6">
              {['9 meters', '11 meters', '13 meters', '15 meters'].map((opt, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer font-medium transition-all ${
                    selectedOption === idx 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  Option {idx + 1}: {opt}
                </div>
              ))}
            </div>

            {showSolution && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-200 mb-4 whitespace-pre-line">
                <strong>Step-by-Step Solution Logic:</strong>{'\n'}
                Displacement in nth second: Sn = u + ½ a(2n - 1){'\n'}
                Given: u = 4 m/s, a = 2 m/s², n = 3{'\n'}
                S3 = 4 + ½(2)(2*3 - 1) = 4 + 5 = 9 meters.{'\n'}
                Correct Answer: Option 1 (9 meters).
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => setShowSolution(true)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Show Step-by-Step Logic
              </button>
              <button 
                onClick={() => { alert('Answer Submitted Successfully!'); setActiveCbtTest(null); }}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-xs"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP NATIVE PDF VIEWER MODAL */}
      {viewingPdf && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-[#080d1e] border border-cyan-500/40 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col relative shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2.5 py-1 rounded text-[10px] font-bold">
                  MASTERSTROKE IN-APP READER
                </span>
                <h3 className="text-sm font-bold text-white">{viewingPdf.title} - Detailed Revision Notes</h3>
              </div>
              <button 
                onClick={() => setViewingPdf(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-slate-900 p-2">
              <iframe 
                src={viewingPdf.url} 
                className="w-full h-full rounded-xl border border-slate-800"
                title="In-App Document Reader"
              />
            </div>
          </div>
        </div>
      )}

      {/* NOTES COMING SOON MODAL */}
      {notesComingSoonModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setNotesComingSoonModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Notes Under Final NTA Review</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Handwritten Topper Notes & Short Tricks for <strong className="text-cyan-400">{notesComingSoonModal}</strong> are currently being finalized by Top NTA Faculties inside our Google NotebookLM engine.
            </p>
            <button 
              onClick={() => setNotesComingSoonModal(null)}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-xs"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
