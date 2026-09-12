'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, Video, TrendingUp, Calendar, FileText, 
  Sparkles, CreditCard, Volume2, Mic, Send, Globe, Download, Printer, Play, CheckCircle, Lock, BookOpen
} from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  gender: 'female' | 'male';
  tag: string;
  role: string;
  examCategory: 'JEE' | 'NEET' | 'BOTH';
  avatarImg: string;
  voicePitch: number;
  voiceLang: string;
  generateExplanation: (query: string, lang: string) => string;
}

const FACULTY_DATA: Record<string, Faculty> = {
  ananya: {
    id: 'ananya',
    name: "Ananya Ma'am",
    gender: 'female',
    tag: 'ORGANIC CHEMISTRY SPECIALIST',
    role: 'Chemistry & NCERT Specialist',
    examCategory: 'BOTH',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    voicePitch: 1.2,
    voiceLang: 'hi-IN',
    generateExplanation: (query: string, lang: string) => {
      return `[${lang}] Ananya Ma'am:\n\nNamaste! Maine Chemistry topic "${query}" samajh liya hai. Main ise step-by-step samjhaungi:\n\n1. **NCERT Core Concept:**\n   Pehle functional groups, electron displacement effects aur reaction mechanism balance karein.\n\n2. **Important Rules:**\n   - Reactants aur Products ki SI Units verify karein.\n   - Temperature aur Catalyst conditions check karein.\n\n3. **Exam Tip:**\n   Is reaction mechanism par kam se kam 5 PYQs zaroor attempt karein! Kya aapko ye samajh aaya?`;
    }
  },
  kabir: {
    id: 'kabir',
    name: 'Kabir Sir',
    gender: 'male',
    tag: 'PHYSICS & MECHANICS GENIUS',
    role: 'Physics Specialist (JEE/NEET)',
    examCategory: 'BOTH',
    avatarImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300',
    voicePitch: 0.85,
    voiceLang: 'hi-IN',
    generateExplanation: (query: string, lang: string) => {
      return `[${lang}] Kabir Sir:\n\nHello Champion! Topic "${query}" ko main Physics perspective se vector breakdown karke solve karaunga:\n\n1. **Core Physics Laws:**\n   Newton's Laws of Motion aur Energy Conservation equations derive karenge.\n\n2. **Numerical Method:**\n   - Step 1: Free Body Diagram (FBD) draw karein.\n   - Step 2: Components resolve karke final answer nikalenge.\n\n3. **Important Tip:**\n   Calculations me units dhyan se check karo. Kya ek numerical aur solve karein?`;
    }
  },
  riya: {
    id: 'riya',
    name: 'Dr. Riya Ma\'am',
    gender: 'female',
    tag: 'NEET BIOLOGY EXPERT',
    role: 'Botany & Zoology NCERT Expert',
    examCategory: 'NEET',
    avatarImg: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300',
    voicePitch: 1.25,
    voiceLang: 'hi-IN',
    generateExplanation: (query: string, lang: string) => {
      return `[${lang}] Dr. Riya Ma'am:\n\nNamaste Future Doctors! Biology topic "${query}" NEET me direct 4 marks ka aata hai. Main ise NCERT line-by-line samjhaungi:\n\n1. **NCERT High-Yield Points:**\n   Cellular diagrams aur organ system functions dhyan se dekhein.\n\n2. **Key Terminology:**\n   Important scientific names aur enzyme functions memorize karein.\n\n3. **NEET Tip:**\n   Is Chapter ke 10 assertion-reasoning questions solve karein! Kya aapko ye clear laga?`;
    }
  },
  aarav: {
    id: 'aarav',
    name: 'Aarav Sir',
    gender: 'male',
    tag: 'JEE MATHS WIZARD',
    role: 'Calculus & Algebra Expert',
    examCategory: 'JEE',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    voicePitch: 0.9,
    voiceLang: 'hi-IN',
    generateExplanation: (query: string, lang: string) => {
      return `[${lang}] Aarav Sir:\n\nHey Future IITians! Maths question "${query}" ko main shortcut tricks aur formulas se solve karaunga:\n\n1. **Algebraic / Calculus Trick:**\n   Pehle boundary conditions check karein aur substitution method apply karein.\n\n2. **Step-by-Step Solution:**\n   - Step 1: Derivative / Integration setup karein.\n   - Step 2: Direct formula evaluation karke solution nikalenge.\n\n3. **JEE Advanced Tip:**\n   Formula sheets revision daily karo! Ready for next question?`;
    }
  }
};

// AUTHENTIC NTA SYLLABUS DATA
const SYLLABUS_DATA = {
  JEE: [
    { subject: 'Physics', chapters: ['Units & Measurements', 'Kinematics 1D & 2D', 'Laws of Motion & Friction', 'Work, Power & Energy', 'Rotational Dynamics', 'Electrostatics & Capacitance'] },
    { subject: 'Chemistry', chapters: ['Structure of Atom', 'Chemical Bonding & Molecular Structure', 'Thermodynamics & Energetics', 'Organic Reaction Mechanisms', 'Equilibrium (Ionic & Chemical)'] },
    { subject: 'Mathematics', chapters: ['Matrices & Determinants', 'Calculus: Limits & Continuity', 'Differentiation & Integration', 'Vector Algebra & 3D Geometry', 'Coordinate Geometry: Conic Sections'] }
  ],
  NEET: [
    { subject: 'Physics', chapters: ['Physical World & Measurement', 'Laws of Motion', 'Gravitation & Fluid Mechanics', 'Ray & Wave Optics', 'Current Electricity & Magnetism'] },
    { subject: 'Chemistry', chapters: ['Basic Concepts of Chemistry', 'Periodic Classification of Elements', 'Hydrocarbons & Organic Chemistry', 'Coordination Compounds', 'Solutions & Electrochemistry'] },
    { subject: 'Biology (Botany & Zoology)', chapters: ['Cell: The Unit of Life', 'Plant Physiology & Photosynthesis', 'Genetics & Evolution', 'Human Physiology: Digestion & Circulation', 'Reproduction in Organisms'] }
  ]
};

export default function Page() {
  const [examType, setExamType] = useState<'JEE' | 'NEET'>('JEE');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFaculty, setSelectedFaculty] = useState('ananya');
  const [selectedLanguage, setSelectedLanguage] = useState('Hinglish (Hindi + Eng)');
  
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'ai',
      faculty: "Ananya Ma'am",
      text: "[Hinglish (Hindi + Eng)] Ananya Ma'am: Namaste! Chemical formula ya NTA syllabus ka koi bhi doubt puchein, main live step-by-step samjhaungi!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Subscription States
  const [showSubModal, setShowSubModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);
  const [userSubscription, setUserSubscription] = useState<'NONE' | 'JEE' | 'NEET'>('NONE');

  const currentFaculty = FACULTY_DATA[selectedFaculty];

  const speakTeacherResponse = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[.*?\]|\*\*|\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      utterance.lang = currentFaculty.voiceLang;
      utterance.pitch = currentFaculty.voicePitch;
      utterance.rate = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userQuery = inputText;
    const userMsg = { sender: 'user', text: userQuery };
    
    const detailedExplanation = currentFaculty.generateExplanation(userQuery, selectedLanguage);
    const aiMsg = { 
      sender: 'ai', 
      faculty: currentFaculty.name, 
      text: detailedExplanation 
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');
    speakTeacherResponse(detailedExplanation);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'NEW2MASTRSTRK') {
      setAppliedDiscount(true);
    } else {
      alert('Invalid Promo Code! Try: NEW2MASTRSTRK');
    }
  };

  const handleSubscribe = () => {
    setUserSubscription(examType);
    setShowSubModal(false);
    alert(`Success! ${examType} Subscription activated with Autopay.`);
  };

  return (
    <div className="flex h-screen w-full bg-[#060a12] text-slate-100 overflow-hidden font-sans">
      
      {/* 1. PERMANENT LEFT NAVIGATION SIDEBAR */}
      <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-6 px-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h1 className="text-lg font-bold tracking-wider text-white">MASTERSTROKE</h1>
          </div>

          {/* Exam Type Toggle Switch */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex mb-4">
            <button
              onClick={() => setExamType('JEE')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                examType === 'JEE' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              JEE TARGET
            </button>
            <button
              onClick={() => setExamType('NEET')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                examType === 'NEET' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              NEET TARGET
            </button>
          </div>

          <div className="bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/30 rounded-xl p-3 mb-6 text-xs text-cyan-200">
            <p className="font-semibold mb-1">🎁 2-Day Free Trial Active</p>
            <p className="text-slate-400">Targeting {examType} 2026 Exam.</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Live AI Studio Faculty', icon: MessageSquare },
              { id: 'lectures', label: `${examType} Syllabus & Lectures`, icon: Video },
              { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
              { id: 'attendance', label: 'Attendance Sheet', icon: Calendar },
              { id: 'papers', label: `${examType} PDF Practice Sheets`, icon: FileText }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setShowSubModal(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-xs transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Subscribe {examType} (₹429)
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col h-full bg-[#080d1a] overflow-hidden">
        
        <header className="px-6 py-3.5 border-b border-slate-800/80 flex justify-between items-center bg-[#0a0f1d]/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              {examType} {activeTab.replace('-', ' ').toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold tracking-wider">
              {examType} ACTIVE BATCH
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="Hinglish (Hindi + Eng)" className="bg-slate-900">Hinglish (Hindi + Eng)</option>
              <option value="Hindi" className="bg-slate-900">Hindi</option>
              <option value="English" className="bg-slate-900">English</option>
              <option value="Marathi" className="bg-slate-900">Marathi</option>
            </select>
          </div>
        </header>

        {/* TAB 1: LIVE AI STUDIO FACULTY */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 flex overflow-hidden p-4 gap-4">
            
            <div className="w-80 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select {examType} AI Faculty</h3>
              <div className="space-y-3">
                {Object.values(FACULTY_DATA)
                  .filter(fac => fac.examCategory === 'BOTH' || fac.examCategory === examType)
                  .map((fac) => {
                    const isSelected = selectedFaculty === fac.id;
                    return (
                      <div
                        key={fac.id}
                        onClick={() => {
                          setSelectedFaculty(fac.id);
                          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                          }
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                            : 'bg-slate-950/60 border-slate-800/60 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="flex gap-3 items-center">
                          <img src={fac.avatarImg} alt={fac.name} className="w-10 h-10 rounded-lg object-cover border border-cyan-500/30" />
                          <div>
                            <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20 font-semibold">
                              {fac.tag}
                            </span>
                            <h4 className="font-bold text-xs text-white mt-1">{fac.name}</h4>
                            <p className="text-[10px] text-slate-400 leading-tight">{fac.role}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <div className="relative w-full h-44 bg-slate-900 rounded-xl overflow-hidden border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
                  <img 
                    src={currentFaculty.avatarImg} 
                    alt={currentFaculty.name} 
                    className={`w-full h-full object-cover transition-all duration-300 ${isSpeaking ? 'scale-105 filter brightness-110' : 'opacity-80'}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="self-end">
                      <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-cyan-300 font-bold border border-cyan-500/30">
                        {selectedLanguage}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                        STAGE: {currentFaculty.name}
                      </span>
                      {isSpeaking && (
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-3 bg-cyan-400 animate-pulse"></span>
                          <span className="w-1 h-5 bg-cyan-400 animate-pulse delay-75"></span>
                          <span className="w-1 h-2 bg-cyan-400 animate-pulse delay-150"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-cyan-400 animate-bounce' : 'text-slate-500'}`} />
                    <span className="text-[10px] text-slate-300 font-medium">
                      {isSpeaking ? `${currentFaculty.name} Live Audio Active...` : 'AI Voice Classroom Ready'}
                    </span>
                  </div>
                  {isSpeaking && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>}
                </div>
              </div>
            </div>

            <div className="flex-1 bg-slate-950/50 border border-slate-800/80 rounded-2xl flex flex-col justify-between p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-cyan-500 text-black font-semibold' 
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}>
                      {msg.sender === 'ai' && (
                        <p className="text-[10px] text-cyan-400 font-bold mb-1 uppercase tracking-wider">{msg.faculty}</p>
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2">
                <button className="p-2 text-slate-400 hover:text-white">
                  <Mic className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder={`Ask ${currentFaculty.name} to explain any ${examType} chapter in ${selectedLanguage}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-transparent text-xs text-white flex-1 focus:outline-none px-2"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-all font-semibold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTHENTIC NTA JEE/NEET CHAPTER LECTURES */}
        {activeTab === 'lectures' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white">Authentic NTA {examType} Chapter Lectures</h2>
                <p className="text-xs text-slate-400">Official Syllabus with Audio/Transcript translation in {selectedLanguage}</p>
              </div>
            </div>

            <div className="space-y-6">
              {SYLLABUS_DATA[examType].map((sec, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {sec.subject} ({sec.chapters.length} Chapters)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {sec.chapters.map((chap, cIdx) => (
                      <div key={cIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex justify-between items-center hover:border-cyan-500/40">
                        <div>
                          <h4 className="text-xs font-semibold text-white">{chap}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Full Interactive Lecture & NCERT Notes</p>
                        </div>
                        <button className="px-3 py-1 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded text-[10px] font-bold transition-all flex items-center gap-1">
                          <Play className="w-3 h-3" /> Watch
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROGRESS TRACKING */}
        {activeTab === 'progress' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <h2 className="text-base font-bold text-white">{examType} Target Progress Analytics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">Chapters Completed</p>
                <h3 className="text-xl font-bold text-cyan-400 mt-1">12 / 24 Chapters</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">NTA Mock Test Score</p>
                <h3 className="text-xl font-bold text-emerald-400 mt-1">92% Accuracy</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">Study Streak</p>
                <h3 className="text-xl font-bold text-purple-400 mt-1">8 Days 🔥</h3>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MONTHLY ATTENDANCE SHEET MATRIX */}
        {activeTab === 'attendance' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white">Monthly Attendance Sheet Matrix</h2>
                <p className="text-xs text-slate-400">Track your daily study logs and live AI faculty sessions</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                Monthly Attendance Rate: 94%
              </span>
            </div>

            {/* Calendar Matrix View */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">September 2026 Daily Attendance Grid</h3>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <span key={i} className="text-slate-500 font-bold py-1">{day}</span>
                ))}
                {Array.from({ length: 30 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isPresent = dayNum <= 12; // Days 1 to 12 Present
                  return (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-lg border font-semibold flex flex-col items-center justify-center ${
                        isPresent 
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      <span className="text-xs">{dayNum}</span>
                      <span className="text-[9px] mt-0.5">{isPresent ? 'P' : 'A'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PRINTABLE PDF PRACTICE PAPERS */}
        {activeTab === 'papers' && (
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            <h2 className="text-base font-bold text-white">{examType} Printable PDF Practice Sheets</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                `${examType} Structure of Atom & Quantum Mechanics - Sheet A`,
                `${examType} Laws of Motion & Friction Practice Paper`,
                `${examType} Organic Reactions & Mechanisms Test Sheet`,
                `${examType} Calculus & Derivatives Step-by-Step Question Bank`
              ].map((paper, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-xs text-white">{paper}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Includes Step-by-Step Answer Keys</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button className="p-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg text-xs flex items-center gap-1 font-semibold">
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* PROMO & SUBSCRIPTION MODAL */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowSubModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-white mb-1">Subscribe to {examType} Target Batch</h2>
            <p className="text-xs text-slate-400 mb-5">Get unlimited Live AI Faculty doubts, {examType} NTA lectures, and downloadable PDF sheets.</p>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">{examType} Monthly Subscription Plan</span>
                <span className={`text-base font-bold ${appliedDiscount ? 'line-through text-slate-500' : 'text-white'}`}>
                  ₹429 / month
                </span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between items-center mt-2 text-cyan-400 font-bold text-sm border-t border-slate-800 pt-2">
                  <span>Discount Price (NEW2MASTRSTRK)</span>
                  <span>₹199 / month</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Enter Promo Code (NEW2MASTRSTRK)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs flex-1 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-3 py-2 rounded-lg text-xs"
              >
                Apply
              </button>
            </div>

            <button 
              onClick={handleSubscribe}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 text-xs text-center"
            >
              Activate Autopay & Subscribe {examType} Batch
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
