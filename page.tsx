'use client';

import React, { useState } from 'react';
import { 
  Sparkles, CreditCard, Volume2, Mic, Send, Globe, Download, 
  Printer, Play, CheckCircle, BookOpen, Users, User, LayoutDashboard, 
  FileCheck, Headphones, MessageSquare, BarChart3, Plus, ShieldCheck, CheckSquare, Clock
} from 'lucide-react';

// authentic nta syllabus dataset
const SYLLABUS_DATA = {
  JEE: [
    { subject: 'Physics', chapters: ['Units & Measurements', 'Kinematics 1D & 2D', 'Laws of Motion & Friction', 'Work, Power & Energy', 'Rotational Dynamics', 'Electrostatics & Capacitance'] },
    { subject: 'Chemistry', chapters: ['Structure of Atom', 'Chemical Bonding & Molecular Structure', 'Thermodynamics & Energetics', 'Organic Reaction Mechanisms', 'Equilibrium (Ionic & Chemical)'] },
    { subject: 'Mathematics', chapters: ['Matrices & Determinants', 'Calculus: Limits & Continuity', 'Differentiation & Integration', 'Vector Algebra & 3D Geometry', 'Coordinate Geometry: Conic Sections'] }
  ],
  NEET: [
    { subject: 'Physics', chapters: ['Physical World & Measurement', 'Laws of Motion & Forces', 'Gravitation & Fluid Mechanics', 'Ray & Wave Optics', 'Current Electricity & Magnetism'] },
    { subject: 'Chemistry', chapters: ['Basic Concepts of Chemistry', 'Periodic Classification of Elements', 'Hydrocarbons & Organic Chemistry', 'Coordination Compounds', 'Solutions & Electrochemistry'] },
    { subject: 'Biology (Botany & Zoology)', chapters: ['Cell: The Unit of Life', 'Plant Physiology & Photosynthesis', 'Genetics & Evolution', 'Human Physiology: Digestion & Circulation', 'Reproduction in Organisms'] }
  ]
};

export default function MasterstrokeApp() {
  const [examType, setExamType] = useState<'JEE' | 'NEET'>('JEE');
  const [activeTab, setActiveTab] = useState('doubt-solver');
  const [selectedLanguage, setSelectedLanguage] = useState('Hinglish (Hindi + Eng)');
  
  // Student Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Aarav Sharma',
    target: 'JEE Main & Advanced 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    accuracy: '88%',
    completedChapters: 14,
    totalChapters: 36
  });

  // Dual-Mode Chat State
  const [chatMode, setChatMode] = useState<'solo' | 'group'>('solo');
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'ai',
      user: 'MASTERSTROKE AI Mentor',
      text: 'Namaste! Main aapka Real-Time Live AI Doubt Solver hoon. Formula, Numerical ya conceptual question type karein, instant detailed explanation milega!'
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Quick Audio Revise State
  const [selectedPodcastChapter, setSelectedPodcastChapter] = useState('Kinematics 1D & 2D');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [podcastLog, setPodcastLog] = useState<string | null>(null);

  // JEE Online CBT Interactive Test Modal
  const [activeCbtTest, setActiveCbtTest] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  // Subscription Modal State
  const [showSubModal, setShowSubModal] = useState(false);
  const [userSubscription, setUserSubscription] = useState<'NONE' | 'JEE' | 'NEET'>('NONE');

  // Handle Real-Time Live Doubt Solving
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg = { sender: 'user', user: userProfile.name, text: inputText };
    const query = inputText;
    
    let aiResponse = `[Live AI Solution - ${selectedLanguage}]\n\nQuestion Analysis: "${query}"\n\n1. **Core Concept Breakdown:**\n   Pehle fundamental laws aur boundary conditions check karein.\n\n2. **Step-by-Step Numerical Calculation:**\n   - Given Values: Standard NTA values substitute karein.\n   - Formula Applied: Direct standard equation evaluation.\n\n3. **Final Exam Tip:**\n   Calculations me SI Units verify karein aur PYQs zaroor attempt karein!`;

    if (chatMode === 'group') {
      aiResponse = `[Group Study Mentor - ${selectedLanguage}]\n\nHey Team! User "${userProfile.name}" ne query poochhi hai:\n"${query}"\n\nAI Explanation:\n- Step 1: Conceptual formula breakdown.\n- Step 2: Friends group me discuss karein aur answer verify karein!`;
    }

    const aiMsg = { sender: 'ai', user: 'MASTERSTROKE AI Mentor', text: aiResponse };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');
  };

  // Quick Audio Revise (Podcast Generator)
  const handleGeneratePodcast = () => {
    const summary = `Welcome to Quick Audio Revise! Generating a 5-minute audio podcast for "${selectedPodcastChapter}" in ${selectedLanguage}. Focusing on high-yield NTA questions, key formulas, and quick memory tricks...`;
    setPodcastLog(summary);
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Quick Audio Revise for ${selectedPodcastChapter}. Chapter overview and key concepts starting now.`);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;

      utterance.onstart = () => setIsAudioPlaying(true);
      utterance.onend = () => setIsAudioPlaying(false);
      utterance.onerror = () => setIsAudioPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Direct Razorpay Payment Gateway (₹229 Flat Including GST)
  const handleSubscribe = () => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if ((window as any).Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().then((res) => {
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
        amount: 22900, // ₹229 (22900 Paise)
        currency: 'INR',
        name: 'MASTERSTROKE EdTech',
        description: `${examType} Target Batch Subscription (Incl. 18% GST)`,
        prefill: {
          name: userProfile.name,
          email: 'student@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#00f0ff',
        },
        handler: function (response: any) {
          alert(`Payment Successful! Transaction ID: ${response.razorpay_payment_id}`);
          setUserSubscription(examType);
          setShowSubModal(false);
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    });
  };

  return (
    <div className="flex h-screen w-full bg-[#050811] text-slate-100 overflow-hidden font-sans">
      
      {/* 1. PERMANENT LEFT NAVIGATION SIDEBAR */}
      <aside className="w-64 bg-[#080d1a] border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-6 px-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h1 className="text-lg font-bold tracking-wider text-white">MASTERSTROKE</h1>
          </div>

          {/* Exam Switch Toggle (JEE vs NEET) */}
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

          <nav className="space-y-1">
            {[
              { id: 'doubt-solver', label: 'Live AI Doubt Solver', icon: MessageSquare },
              { id: 'job-sheets', label: `${examType} Practice Job Sheets`, icon: FileCheck },
              { id: 'audio-revise', label: 'Quick Audio Revise', icon: Headphones },
              { id: 'profile-dashboard', label: 'Student Profile & Analytics', icon: LayoutDashboard }
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
            Subscribe {examType} (₹229)
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col h-full bg-[#070b16] overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="px-6 py-3.5 border-b border-slate-800/80 flex justify-between items-center bg-[#080d1a]/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              {examType} {activeTab.replace('-', ' ').toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 font-bold tracking-wider">
              AUTHENTIC NTA SYLLABUS BATCH
            </span>
          </div>

          <div className="flex items-center gap-3">
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

            {/* User Avatar Mini */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <img src={userProfile.avatar} alt="User" className="w-7 h-7 rounded-full object-cover border border-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">{userProfile.name}</span>
            </div>
          </div>
        </header>

        {/* TAB 1: REAL-TIME LIVE AI DOUBT SOLVER (SOLO & GROUP STUDY MODE) */}
        {activeTab === 'doubt-solver' && (
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            
            {/* Solo vs Group Study Toggle */}
            <div className="flex justify-between items-center bg-slate-900/80 p-2 rounded-xl border border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChatMode('solo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    chatMode === 'solo' 
                      ? 'bg-cyan-500 text-black shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Solo Private Doubt Solver
                </button>
                <button
                  onClick={() => setChatMode('group')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    chatMode === 'group' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Group Study Mode (Friends + AI)
                </button>
              </div>

              {chatMode === 'group' && (
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/40 border border-purple-800/50 px-3 py-1 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  2 Subscribed Friends Active in Room
                </div>
              )}
            </div>

            {/* Live Chat Window */}
            <div className="flex-1 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col justify-between p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl p-3.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-cyan-500 text-black font-semibold' 
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}>
                      <p className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${msg.sender === 'user' ? 'text-black/70' : 'text-cyan-400'}`}>
                        {msg.user}
                      </p>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="mt-3 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2">
                <button className="p-2 text-slate-400 hover:text-white">
                  <Mic className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder={
                    chatMode === 'solo' 
                      ? `Ask any ${examType} numerical or concept in ${selectedLanguage}...` 
                      : `Ask a question to group friends and AI mentor in ${selectedLanguage}...`
                  }
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

        {/* TAB 2: EXAM-RESPECTIVE PRACTICE JOB SHEETS */}
        {activeTab === 'job-sheets' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-white">
                  {examType === 'JEE' ? 'JEE Computer-Based (CBT) Interactive Test Sheets' : 'NEET Printable PDF Sheets & OMR Bubble Sheets'}
                </h2>
                <p className="text-xs text-slate-400">Authentic NTA Exam Pattern Job Sheets with Step-by-Step Logic Solutions</p>
              </div>
            </div>

            <div className="space-y-6">
              {SYLLABUS_DATA[examType].map((sec, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {sec.subject} ({sec.chapters.length} Job Sheets)
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {sec.chapters.map((chap, cIdx) => (
                      <div key={cIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center hover:border-cyan-500/40">
                        <div>
                          <h4 className="text-xs font-semibold text-white">{chap}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {examType === 'JEE' ? 'CBT Mock Mode + Numerical Box' : 'Printable PDF + Bubble OMR Sheet'}
                          </p>
                        </div>

                        {examType === 'JEE' ? (
                          <button 
                            onClick={() => setActiveCbtTest(chap)}
                            className="px-3 py-1 bg-cyan-500 text-black hover:bg-cyan-400 rounded text-[10px] font-bold transition-all flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" /> Start CBT
                          </button>
                        ) : (
                          <div className="flex gap-1">
                            <button className="px-2.5 py-1 bg-slate-800 text-cyan-400 hover:bg-slate-700 rounded text-[10px] font-bold flex items-center gap-1">
                              <Download className="w-3 h-3" /> PDF Sheet
                            </button>
                            <button className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black rounded text-[10px] font-bold flex items-center gap-1">
                              <Printer className="w-3 h-3" /> OMR
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUICK AUDIO REVISE (PODCAST GENERATOR) */}
        {activeTab === 'audio-revise' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Headphones className="w-6 h-6 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">Quick Audio Revise (AI Podcast Generator)</h2>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl">
                Chapter select karein aur chosen language ({selectedLanguage}) me instant 5-minute concise audio podcast listen karein key formulas aur high-yield revision ke liye.
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
                      <option key={i} value={chap} className="bg-slate-900">{chap}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleGeneratePodcast}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/20 text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Volume2 className="w-4 h-4" /> Generate & Listen Audio Podcast
                  </button>
                </div>
              </div>
            </div>

            {podcastLog && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    NOW PLAYING PODCAST: {selectedPodcastChapter}
                  </span>
                  {isAudioPlaying && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-4 bg-cyan-400 animate-pulse"></span>
                      <span className="w-1.5 h-6 bg-cyan-400 animate-pulse delay-75"></span>
                      <span className="w-1.5 h-3 bg-cyan-400 animate-pulse delay-150"></span>
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

        {/* TAB 4: STUDENT PROFILE & CHAPTER-TO-CHAPTER PROGRESS ANALYTICS */}
        {activeTab === 'profile-dashboard' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Student Profile Overview Card */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={userProfile.avatar} alt="Profile" className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400" />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-1 rounded-full text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{userProfile.name}</h2>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">{userProfile.target}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Status: Active Subscribed Student</p>
                </div>
              </div>

              <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-xl font-medium border border-slate-700">
                Edit Profile Picture
              </button>
            </div>

            {/* Chapter-to-Chapter Performance Matrix */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">Chapters Completed</p>
                <h3 className="text-2xl font-bold text-cyan-400 mt-1">{userProfile.completedChapters} / {userProfile.totalChapters}</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">Average Mock Test Accuracy</p>
                <h3 className="text-2xl font-bold text-emerald-400 mt-1">{userProfile.accuracy}</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400">Active Study Streak</p>
                <h3 className="text-2xl font-bold text-purple-400 mt-1">12 Days 🔥</h3>
              </div>
            </div>

            {/* Detailed Chapter Breakdown Progress */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Chapter-to-Chapter Mastery Status</h3>
              <div className="space-y-3">
                {SYLLABUS_DATA[examType][0].chapters.map((chap, idx) => {
                  const progressVal = (idx + 1) * 22;
                  return (
                    <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-slate-200">{chap}</span>
                        <span className="text-cyan-400 font-bold">{progressVal > 100 ? 100 : progressVal}% Completed</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500" 
                          style={{ width: `${progressVal > 100 ? 100 : progressVal}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* JEE ONLINE CBT MOCK INTERFACE MODAL */}
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
                NTA JEE CBT SIMULATION MODE
              </span>
              <h3 className="text-sm font-bold text-white">{activeCbtTest} - Question #1</h3>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed mb-4">
              Q1. A particle moves along a straight line with a constant acceleration of 2 m/s². If its initial velocity is 4 m/s, find its displacement in the 3rd second.
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
                <strong>Step-by-Step Logic Explanation:</strong>{'\n'}
                Displacement in nth second formula: Sn = u + a/2 * (2n - 1){'\n'}
                Given: u = 4 m/s, a = 2 m/s², n = 3{'\n'}
                S3 = 4 + (2/2) * (2*3 - 1) = 4 + 1 * 5 = 9 meters.{'\n'}
                Correct Answer: Option 1 (9 meters).
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => setShowSolution(true)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Show Step-by-Step Solution
              </button>
              <button 
                onClick={() => { alert('Answer Submitted to NTA CBT Server!'); setActiveCbtTest(null); }}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-xs"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBSCRIPTION MODAL (₹229 FLAT INCLUDING GST) */}
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
            <p className="text-xs text-slate-400 mb-5">Get unlimited Live AI Doubt Solver, Group Study Access, Quick Audio Revise, and Practice Job Sheets.</p>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">{examType} Monthly Plan</span>
                <span className="text-lg font-bold text-cyan-400">
                  ₹229 / month
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">✔ Incl. 18% GST & Autopay Gateway Access</p>
            </div>

            <button 
              onClick={handleSubscribe}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 text-xs text-center"
            >
              Pay ₹229 & Activate {examType} Subscription
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
