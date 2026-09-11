'use client';

import { useState, useEffect } from 'react';

interface QuizQuestion {
  q: string;
  options: string[];
  ans: number;
  exp: string;
}

interface FormulaItem {
  title: string;
  formula: string;
}

interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  topic: string;
  avatar: string;
  expression: string;
  badge: string;
  intellectualScript: string;
  notes: string;
  formulas: FormulaItem[];
  quiz: QuizQuestion[];
}

const STREAM_TEACHERS: Record<'jee' | 'neet', Teacher[]> = {
  jee: [
    {
      id: 'jee-vikram',
      name: 'Dr. Vikram Sharma',
      role: 'Senior Physics Faculty (Ex-IITian)',
      subject: 'Physics',
      topic: 'Rotational Dynamics & Torque',
      avatar: '👨‍🏫',
      expression: '🧠 Analytical & Focused',
      badge: 'IITian Mentor',
      intellectualScript: 'Greetings aspirants! Torque is rotational force: τ = r × F. Notice how conservation of angular momentum governs rolling without slipping.',
      notes: 'Center of Mass, Moment of Inertia (I = ∑mr²), Torque τ = r × F, Pure Rolling (v = ωR).',
      formulas: [
        { title: 'Torque Formula', formula: 'τ = r × F = r F sin(θ)' },
        { title: 'Moment of Inertia (Ring)', formula: 'I = M R²' },
        { title: 'Angular Momentum', formula: 'L = I × ω' }
      ],
      quiz: [
        {
          q: "A wheel of radius R rolls without slipping. The velocity of the point touching the ground is:",
          options: ["Zero", "v", "2v", "v/2"],
          ans: 0,
          exp: "In pure rolling, the contact point is instantaneously at rest relative to the surface."
        }
      ]
    }
  ],
  neet: [
    {
      id: 'neet-ananya',
      name: 'Ananya Roy',
      role: 'Organic & Physical Chem Lead',
      subject: 'Chemistry',
      topic: 'Biomolecules & Reaction Kinetics',
      avatar: '👩‍🔬',
      expression: '🔬 Deep Analysis',
      badge: 'NEET AIR Specialist',
      intellectualScript: 'Hello future doctors! In zero-order reactions, rate is independent of reactant concentration. Let us solve these high-yield NEET numericals.',
      notes: 'Carbohydrate classification, Amino acid zwitterions, Activation Energy as thermodynamic barrier.',
      formulas: [
        { title: 'Zero Order Half Life', formula: 't_1/2 = [A]_0 / (2k)' },
        { title: 'First Order Rate Constant', formula: 'k = (2.303 / t) log([A]_0 / [A])' }
      ],
      quiz: [
        {
          q: "The unit of rate constant for a second-order reaction is:",
          options: ["s⁻¹", "mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "L² mol⁻² s⁻¹"],
          ans: 2,
          exp: "For nth order, unit is (mol/L)^(1-n) s⁻¹. For n=2, it becomes L mol⁻¹ s⁻¹."
        }
      ]
    }
  ]
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userSubscription, setUserSubscription] = useState<'jee' | 'neet' | null>('jee');
  const [activeStream, setActiveStream] = useState<'jee' | 'neet'>('jee');
  const [activeTeacher, setActiveTeacher] = useState<Teacher>(STREAM_TEACHERS.jee[0]);
  const [currentExpression, setCurrentExpression] = useState('💬 Active');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const isLocked = userSubscription !== null && userSubscription !== activeStream;

  const handleStreamChange = (stream: 'jee' | 'neet') => {
    setActiveStream(stream);
    setActiveTeacher(STREAM_TEACHERS[stream][0]);
    setAnswers([]);
    setAudioUrl(null);
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        const exprs = ['🗣️ Explaining Concept', '🔍 Deep Analysis', '💡 Solving Live'];
        setCurrentExpression(exprs[Math.floor(Math.random() * exprs.length)]);
      }, 1800);
      return () => clearInterval(interval);
    } else {
      setCurrentExpression(activeTeacher.expression);
    }
  }, [isSpeaking, activeTeacher]);

  const handleLiveInteraction = async (text: string) => {
    setLoadingAudio(true);
    setIsSpeaking(true);
    setCurrentExpression('🧠 Generating AI Speech...');
    
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
        setCurrentExpression('🗣️ Live Lecturing');
      } else {
        alert('Vercel settings me OPENAI_API_KEY verify karein.');
        setIsSpeaking(false);
      }
    } catch {
      alert('Interaction Error.');
      setIsSpeaking(false);
    }
    setLoadingAudio(false);
  };

  return (
    <main className={`p-4 md:p-8 min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .printable-card { border: 2px solid #000 !important; background: white !important; color: black !important; box-shadow: none !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center no-print">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${isDarkMode ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
            Masterstroke AI Portal
          </span>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-yellow-400' : 'bg-white border-slate-300 text-slate-800'}`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-2 no-print">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 via-teal-400 to-yellow-500 bg-clip-text text-transparent">
            Masterstroke AI Classroom
          </h1>
          <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-slate-600 text-sm'}>
            Interactive AI Mentors, Live Speech & Printable Formula Sheets
          </p>
        </div>

        {/* Stream Selector */}
        <div className="flex justify-center gap-4 no-print">
          <button 
            onClick={() => handleStreamChange('jee')}
            className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition ${activeStream === 'jee' ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-400' : 'bg-white border-slate-300 text-slate-600'}`}
          >
            ⚡ JEE Main & Advanced {userSubscription === 'jee' && '✓'}
          </button>

          <button 
            onClick={() => handleStreamChange('neet')}
            className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition ${activeStream === 'neet' ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-400' : 'bg-white border-slate-300 text-slate-600'}`}
          >
            🩺 NEET UG Medical {userSubscription === 'neet' && '✓'} {userSubscription === 'jee' && '🔒'}
          </button>
        </div>

        {/* Locked Screen */}
        {isLocked ? (
          <div className={`border rounded-3xl p-8 text-center space-y-6 shadow-2xl no-print ${isDarkMode ? 'bg-slate-900/90 border-yellow-500/30' : 'bg-white border-yellow-400'}`}>
            <div className="text-6xl animate-bounce">🔒</div>
            <h2 className="text-2xl font-extrabold text-yellow-500">{activeStream.toUpperCase()} Stream Access Locked</h2>
            <div className={`p-6 rounded-2xl border border-dashed max-w-md mx-auto space-y-4 ${isDarkMode ? 'bg-slate-950 border-teal-500/50' : 'bg-slate-50 border-teal-600'}`}>
              <span className="bg-teal-500/20 text-teal-600 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/40">🎁 Discount Offer</span>
              <p className="text-xs">Coupon Code: <b className="text-yellow-500">EXISTING250</b> (Flat ₹250 Off)</p>
              
              <button 
                onClick={() => { setUserSubscription(activeStream); alert(`${activeStream.toUpperCase()} Unlocked!`); }}
                className="w-full bg-yellow-500 text-black font-extrabold py-3 rounded-xl text-sm"
              >
                Unlock {activeStream.toUpperCase()} Stream
              </button>
            </div>
          </div>
        ) : (
          /* Original Main Studio View */
          <div className={`printable-card border rounded-3xl p-6 md:p-8 shadow-2xl space-y-8 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
            
            {/* Faculty Header */}
            <div className="flex flex-wrap items-center justify-between border-b pb-5 gap-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className={`text-6xl p-3 rounded-2xl border ${isSpeaking ? 'animate-bounce border-yellow-400' : 'border-slate-700'} ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                  {activeTeacher.avatar}
                </div>
                <div>
                  <h3 className={`font-extrabold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTeacher.name}</h3>
                  <p className="text-xs text-yellow-500 font-mono mt-0.5">Topic: {activeTeacher.topic}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 no-print">
                <button 
                  onClick={() => window.print()}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs border border-yellow-400"
                >
                  📄 Download Formulas (PDF)
                </button>

                <button 
                  onClick={() => handleLiveInteraction(activeTeacher.intellectualScript)}
                  disabled={loadingAudio}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition disabled:opacity-50"
                >
                  {loadingAudio ? '🧠 Thinking...' : '🎙️ Live Audio'}
                </button>
              </div>
            </div>

            {/* Audio Stream Player */}
            {audioUrl && (
              <div className={`p-4 rounded-2xl border space-y-2 no-print ${isDarkMode ? 'bg-slate-950 border-teal-500/40' : 'bg-teal-50 border-teal-300'}`}>
                <p className="text-xs text-teal-500 font-mono flex justify-between">
                  <span>🔊 Speech Active</span>
                  <span className="animate-pulse">● Playing...</span>
                </p>
                <audio controls autoPlay onEnded={() => setIsSpeaking(false)} className="w-full h-9">
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            )}

            {/* Notes Box */}
            <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Authentic Revision Notes:</h4>
              <p className={`text-xs font-mono leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{activeTeacher.notes}</p>
            </div>

            {/* Formula Bank */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-teal-500 uppercase tracking-wider">
                📐 Official Formula Bank (Printable)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeTeacher.formulas.map((f, fIdx) => (
                  <div key={fIdx} className={`p-4 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <p className="text-xs font-semibold text-yellow-500">{f.title}</p>
                    <p className={`text-sm font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{f.formula}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Quiz */}
            <div className="space-y-6 pt-2 border-t border-slate-200 dark:border-slate-800 no-print">
              <h4 className="font-bold text-lg text-yellow-500">🎯 Interactive Quiz</h4>

              {activeTeacher.quiz.map((q, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="font-semibold text-sm">Q{idx + 1}. {q.q}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const newAns = [...answers];
                          newAns[idx] = optIdx;
                          setAnswers(newAns);
                        }}
                        className={`text-left p-3.5 rounded-xl text-xs font-medium border transition ${answers[idx] === optIdx ? 'bg-blue-600 border-blue-400 text-white' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-300' : 'bg-white border-slate-300 text-slate-700'}`}
                      >
                        {optIdx + 1}) {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
