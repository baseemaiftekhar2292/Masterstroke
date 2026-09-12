'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Video, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Sparkles, 
  CreditCard,
  Volume2, 
  Mic, 
  Send, 
  Globe,
  Download,
  Printer
} from 'lucide-react';

// --- GENDER & DYNAMIC TEACHER RESPONSE SYSTEM ---
interface Faculty {
  id: string;
  name: string;
  gender: 'female' | 'male';
  tag: string;
  role: string;
  avatarImg: string;
  greeting: string;
  generateExplanation: (query: string, lang: string) => string;
}

const FACULTY_DATA: Record<string, Faculty> = {
  ananya: {
    id: 'ananya',
    name: "Ananya Ma'am",
    gender: 'female',
    tag: 'AI ORGANIC SPECIALIST',
    role: 'Master Faculty - Chemistry & NCERT',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    greeting: 'Namaste! Main Ananya Ma\'am hoon. Organic Chemistry aur NCERT ke doubts detail me samjhaungi.',
    generateExplanation: (query: string, lang: string) => {
      return `[${lang}] Ananya Ma'am:

Maine aapka question "${query}" samajh liya hai! Is chapter ko main step-by-step detail me samjhaungi:

1. **Key Concept Overview:**
   Chemistry me is topic ko balance karne ke liye pehle structural oxidation states aur functional groups check karein.

2. **Step-by-Step Breakdown:**
   - Step 1: Chemical equation ke reactants aur products verify karein.
   - Step 2: SI Units aur temperature conditions apply karein.

3. **Practice Suggestion:**
   Is concept par NCERT ke top 5 questions zaroor attempt karein. Kya aapko ye samjhane ka tarika clear laga?`;
    }
  },
  kabir: {
    id: 'kabir',
    name: 'Kabir Sir',
    gender: 'male',
    tag: 'JEE ADVANCED SPECIALIST',
    role: 'Physics & Mechanics Genius',
    avatarImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    greeting: 'Hello Champion! Main Kabir Sir hoon. Physics aur Mechanics ke tough concepts simple tarike se solve karenge!',
    generateExplanation: (query: string, lang: string) => {
      return `[${lang}] Kabir Sir:

Sahi question pucha aapne! Topic "${query}" ko main physics perspective se derive karke samjhaunga:

1. **Fundamental Laws:**
   Newton's laws aur energy conservation principles apply karke equation set up karenge.

2. **Numerical Breakdown:**
   - Step 1: Vector directions aur free body diagram draw karein.
   - Step 2: Values substitute karke final answer calculate karein.

3. **JEE Tip:**
   Is numerical logic ko dhyan se note kar lo. Kya ek example question aur solve karein?`;
    }
  }
};

export default function Page() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFaculty, setSelectedFaculty] = useState('ananya');
  const [selectedLanguage, setSelectedLanguage] = useState('Hinglish (Hindi + Eng)');
  
  // Dynamic Chat Messages state
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      faculty: "Ananya Ma'am",
      text: "[Hinglish (Hindi + Eng)] Ananya Ma'am: Namaste! Kisi bhi chapter ya numerical ka doubt puchein, main step-by-step detail me samjhaungi!"
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Subscription Modal State
  const [showSubModal, setShowSubModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  const currentFaculty = FACULTY_DATA[selectedFaculty];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userQuery = inputText;
    const userMsg = { sender: 'user', text: userQuery, faculty: '' };
    
    // Dynamic detailed response generation (Gender & Language aware)
    const detailedExplanation = currentFaculty.generateExplanation(userQuery, selectedLanguage);
    const aiMsg = { 
      sender: 'ai', 
      faculty: currentFaculty.name, 
      text: detailedExplanation 
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'NEW2MASTRSTRK') {
      setAppliedDiscount(true);
    } else {
      alert('Invalid Promo Code! Try: NEW2MASTRSTRK');
    }
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

          {/* 2-Day Free Trial Alert */}
          <div className="bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/30 rounded-xl p-3 mb-6 text-xs text-cyan-200">
            <p className="font-semibold mb-1">🎁 2-Day Free Trial Active</p>
            <p className="text-slate-400">Full access to AI Faculty & Lectures.</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Live AI Studio Faculty', icon: MessageSquare },
              { id: 'lectures', label: 'Chapter Lectures', icon: Video },
              { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
              { id: 'attendance', label: 'Attendance Record', icon: Calendar },
              { id: 'papers', label: 'PDF Practice Papers', icon: FileText }
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

        {/* Upgrade / Autopay Subscription Button */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setShowSubModal(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-xs transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Upgrade Plan (₹429)
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col h-full bg-[#080d1a] overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="px-6 py-3.5 border-b border-slate-800/80 flex justify-between items-center bg-[#0a0f1d]/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              {activeTab === 'dashboard' ? 'LIVE AI STUDIO FACULTY' : activeTab.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold tracking-wider">
              STUDIO LIVE
            </span>
          </div>

          {/* Language Selector */}
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

        {/* TAB 1: DASHBOARD & DYNAMIC TEACHING CHAT */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 flex overflow-hidden p-4 gap-4">
            
            {/* Faculty Selection Card */}
            <div className="w-72 flex flex-col gap-4">
              <div className="space-y-3">
                {Object.values(FACULTY_DATA).map((fac) => {
                  const isSelected = selectedFaculty === fac.id;
                  return (
                    <div
                      key={fac.id}
                      onClick={() => setSelectedFaculty(fac.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                          : 'bg-slate-950/60 border-slate-800/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <img src={fac.avatarImg} alt={fac.name} className="w-11 h-11 rounded-lg object-cover border border-cyan-500/30" />
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

              {/* Live Classroom Audio Waveform Frame */}
              <div className="mt-auto bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <div className="relative w-full h-24 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center mb-2 border border-slate-800">
                  <img src={currentFaculty.avatarImg} alt={currentFaculty.name} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase">STAGE: {currentFaculty.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-[10px] text-slate-400">AI Live Classroom Lipsync Active</span>
                </div>
              </div>
            </div>

            {/* Main Interactive Chat Panel */}
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

              {/* Chat Input Bar */}
              <div className="mt-3 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2">
                <button className="p-2 text-slate-400 hover:text-white">
                  <Mic className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder={`Ask ${currentFaculty.name} to explain any chapter in ${selectedLanguage}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-transparent text-xs text-white flex-1 focus:outline-none px-2"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRINTABLE PDF PRACTICE PAPERS */}
        {activeTab === 'papers' && (
          <div className="p-6 overflow-y-auto space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Chapter-wise Printable PDF Practice Papers</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Structure of Atom - Advanced Sheet', 'Organic Reaction Mechanisms - Set A', 'Newton Laws of Motion & Friction'].map((paper, idx) => (
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

      {/* 3. PROMO CODE SUBSCRIPTION MODAL */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowSubModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-white mb-1">Upgrade to Masterstroke Premium</h2>
            <p className="text-xs text-slate-400 mb-5">Get unlimited Live AI Teacher access, multi-language videos, and PDF practice tests.</p>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Monthly Plan Subscription</span>
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

            {/* Promo Code Input */}
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

            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 text-xs text-center">
              Activate Autopay & Subscribe
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
