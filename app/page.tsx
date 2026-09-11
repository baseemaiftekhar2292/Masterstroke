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
  videoUrl: string;
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
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      intellectualScript: 'Aspirant, torque is rotational force: τ = r × F. Ask me any doubt from this video and I will explain live!',
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
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      intellectualScript: 'Hello future doctor! Zero-order reaction rate is independent of concentration. What is your doubt in this topic?',
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
  const [userDoubt, setUserDoubt] = useState('');
  
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const isLocked = userSubscription !== null && userSubscription !== activeStream;

  const handleStreamChange = (stream: 'jee' | 'neet') => {
    setActiveStream(stream);
    setActiveTeacher(STREAM_TEACHERS[stream][0]);
    setAnswers([]);
    setSubmitted(false);
    setAudioUrl(null);
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        const exprs = ['🗣️ Explaining Concept', '🔍 Analyzing Doubt', '💡 Solving Live'];
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
    setCurrentExpression('🧠 Analyzing & Generating Response...');
    
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
        setCurrentExpression('🗣️ Faculty Replying Live');
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
          .printable-card { border: 2px solid #000 !important; background: white !important; color: black !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center no-print">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${isDarkMode ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
            Masterstroke Hybrid AI Studio
          </span>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700 text-yellow-400' : 'bg-white border-slate-300 text-slate-800'}`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

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

        {isLocked ? (
          <div className={`border rounded-3xl p-8 text-center space-y-6 shadow-2xl no-print ${isDarkMode ? 'bg-slate-900/90 border-yellow-500/30' : 'bg-white border-yellow-400'}`}>
            <div className="text-6xl animate-bounce">🔒</div>
            <h2 className="text-2xl font-extrabold text-yellow-500">{activeStream.toUpperCase()} Stream Access Locked</h2>
            <div className={`p-6 rounded-2xl border border-dashed max-w-md mx-auto space-y-4 ${isDarkMode ? 'bg-slate-950 border-teal-500/50' : 'bg-slate-50 border-teal-600'}`}>
              <span className="bg-teal-500/20 text-teal-600 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/40">🎁 Existing User Offer</span>
              <p className="text-xs">Coupon Code: <b className="text-yellow-500">EXISTING250</b> for ₹250 OFF!</p>
              <button onClick={() => { setUserSubscription(activeStream); alert(`${activeStream.toUpperCase()} Unlocked!`); }} className="w-full bg-yellow-500 text-black font-extrabold py-3 rounded-xl text-sm">
                Unlock {activeStream.toUpperCase()} Stream
              </button>
            </div>
          </div>
        ) : (
          <div className={`printable-card border rounded-3xl p-6 md:p-8 shadow-2xl space-y-8 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
            
            <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className={`text-5xl p-2.5 rounded-2xl border ${isSpeaking ? 'animate-bounce border-yellow-400' : 'border-slate-700'} ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                  {activeTeacher.avatar}
                </div>
                <div>
                  <h3 className={`font-extrabold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTeacher.name}</h3>
                  <p className="text-xs text-yellow-500 font-mono">Topic: {activeTeacher.topic}</p>
                </div>
              </div>

              <button 
                onClick={() => window.print()}
                className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-yellow-400 no-print"
              >
                📄 Download Formulas (PDF)
              </button>
            </div>

            <div className="space-y-3 no-print">
              <h4 className="text-xs font-bold text-teal-500 uppercase tracking-wider flex items-center gap-2">
                🎥 HD AI Avatar Video Lecture (On-Demand)
              </h4>
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 aspect-video shadow-2xl">
                <video controls className="w-full h-full object-cover">
                  <source src={activeTeacher.videoUrl} type="video/mp4" />
                  Your browser does not support video streaming.
                </video>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border space-y-4 no-print ${isDarkMode ? 'bg-slate-950 border-teal-500/40' : 'bg-teal-50 border-teal-300'}`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-teal-500 uppercase tracking-wider flex items-center gap-2">
                  💬 Live AI Faculty Doubt Solver
                </span>
                <span className="text-xs text-yellow-500 font-mono">State: {currentExpression}</span>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={`Ask ${activeTeacher.name} any doubt from this chapter...`} 
                  value={userDoubt} 
                  onChange={(e) => setUserDoubt(e.target.value)}
                  className={`border rounded-xl px-4 py-2.5 text-xs w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                />
                <button 
                  onClick={() => handleLiveInteraction(userDoubt || activeTeacher.intellectualScript)}
                  disabled={loadingAudio}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loadingAudio ? '🧠 Thinking...' : '🎙️ Ask Live'}
                </button>
              </div>

              {audioUrl && (
                <div className="pt-2">
                  <p className="text-xs text-teal-400 font-mono mb-1">🔊 Live Audio Response:</p>
                  <audio controls autoPlay onEnded={() => setIsSpeaking(false)} className="w-full h-9">
                    <source src={audioUrl} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>

            <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Authentic High-Yield Revision Notes:</h4>
              <p className={`text-xs font-mono leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{activeTeacher.notes}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-teal-500 uppercase tracking-wider">
                📐 Official High-Yield Formula Bank
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

            <div className="space-y-6 pt-2 border-t border-slate-200 dark:border-slate-800 no-print">
              <h4 className="font-bold text-lg text-yellow-500">🎯 Live Chapter Assessment</h4>
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
                        className={`text-left p-3.5 rounded-xl text-xs font-medium border ${answers[idx] === optIdx ? 'bg-blue-600 border-blue-400 text-white' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-300' : 'bg-white border-slate-300 text-slate-700'}`}
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
        { title: 'Angular Momentum', formula: 'L = I × ω' },
        { title: 'Pure Rolling Condition', formula: 'v_cm = R × ω' }
      ],
      quiz: [
        {
          q: "A wheel of radius R rolls without slipping. The velocity of the point touching the ground is:",
          options: ["Zero", "v", "2v", "v/2"],
          ans: 0,
          exp: "In pure rolling, the contact point is instantaneously at rest relative to the surface."
        },
        {
          q: "What is the dimension of Torque?",
          options: ["[M L T⁻¹]", "[M L² T⁻²]", "[M L⁻¹ T⁻²]", "[M² L T⁻²]"],
          ans: 1,
          exp: "Torque = Force × Distance = [M L T⁻²] × [L] = [M L² T⁻²]."
        }
      ]
    }
  ],
  neet: [
    {
      id: 'neet-kabir',
      name: 'Dr. Kabir Mehta',
      role: 'Senior Human Anatomy & Zoology Lead',
      subject: 'Zoology',
      topic: 'Human Anatomy & Neural Control',
      avatar: '👨‍⚕️',
      expression: '🔬 Clinical & Precise',
      badge: 'NEET AIR Specialist',
      intellectualScript: 'Hello future doctors! The nervous system coordinates body activities using electrical impulses via neurons. Let us analyze action potential kinetics.',
      notes: 'Central Nervous System (CNS), Action Potential Generation (-70mV resting potential), Synaptic Transmission & Neurotransmitters.',
      formulas: [
        { title: 'Resting Membrane Potential', formula: 'E_m ≈ -70 mV' },
        { title: 'Nernst Equation', formula: 'E = (RT/zF) ln([Ion]_out / [Ion]_in)' },
        { title: 'Conduction Velocity Factor', formula: 'v ∝ Myelination × Axon Diameter' }
      ],
      quiz: [
        {
          q: "Depolarization during an action potential is primarily caused by:",
          options: ["Influx of Na⁺ ions", "Efflux of K⁺ ions", "Influx of Cl⁻ ions", "Efflux of Na⁺ ions"],
          ans: 0,
          exp: "Rapid opening of voltage-gated Na⁺ channels allows Na⁺ influx, causing depolarization."
        }
      ]
    },
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
        { title: 'First Order Rate Constant', formula: 'k = (2.303 / t) log([A]_0 / [A])' },
        { title: 'Arrhenius Equation', formula: 'k = A · e^(-Ea / RT)' }
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
  const [userDoubt, setUserDoubt] = useState('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const isLocked = userSubscription !== null && userSubscription !== activeStream;

  const handleStreamChange = (stream: 'jee' | 'neet') => {
    setActiveStream(stream);
    setActiveTeacher(STREAM_TEACHERS[stream][0]);
    setAnswers([]);
    setSubmitted(false);
    setAudioUrl(null);
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        const exprs = ['🗣️ Explaining Concept', '🔍 Deep Clinical Analysis', '⚡ Intellectual Spark', '💡 Solving Live Classroom Doubt'];
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
    setCurrentExpression('🧠 AI Classroom Speech Processing...');
    
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
        setCurrentExpression('🗣️ Live AI Classroom Lecture Active');
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
          .print-only { display: block !important; }
          .printable-card { border: 2px solid #000 !important; background: white !important; color: black !important; box-shadow: none !important; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Controls Bar */}
        <div className="flex justify-between items-center no-print">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${isDarkMode ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
            Masterstroke Interactive AI Classroom
          </span>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700 text-yellow-400 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'}`}
          >
            {isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2 no-print">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 via-teal-400 to-yellow-500 bg-clip-text text-transparent">
            AI Humanoid Classroom Studio
          </h1>
          <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-slate-600 text-sm'}>
            Interactive Virtual Faculty, Live Doubt Solver & Downloadable PDF Formula Banks
          </p>
        </div>

        {/* Stream Selector Tabs */}
        <div className="flex justify-center gap-4 no-print">
          <button 
            onClick={() => handleStreamChange('jee')}
            className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition flex items-center gap-2 ${activeStream === 'jee' ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-400' : 'bg-white border-slate-300 text-slate-600'}`}
          >
            ⚡ JEE Main & Advanced {userSubscription === 'jee' && '✓'}
          </button>

          <button 
            onClick={() => handleStreamChange('neet')}
            className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition flex items-center gap-2 ${activeStream === 'neet' ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-400' : 'bg-white border-slate-300 text-slate-600'}`}
          >
            🩺 NEET UG Medical {userSubscription === 'neet' && '✓'} {userSubscription === 'jee' && '🔒'}
          </button>
        </div>

        {/* Stream Faculty Tabs (If Multiple Faculty Members exist) */}
        {!isLocked && STREAM_TEACHERS[activeStream].length > 1 && (
          <div className="flex justify-center gap-2 no-print">
            {STREAM_TEACHERS[activeStream].map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTeacher(t); setAudioUrl(null); setIsSpeaking(false); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${activeTeacher.id === t.id ? 'bg-yellow-500 text-black border-yellow-400 shadow-md' : isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-400' : 'bg-slate-100 border-slate-300 text-slate-700'}`}
              >
                {t.avatar} {t.name} ({t.subject})
              </button>
            ))}
          </div>
        )}

        {/* Stream Locked Screen */}
        {isLocked ? (
          <div className={`border rounded-3xl p-8 text-center space-y-6 shadow-2xl no-print ${isDarkMode ? 'bg-slate-900/90 border-yellow-500/30' : 'bg-white border-yellow-400'}`}>
            <div className="text-6xl animate-bounce">🔒</div>
            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold text-yellow-500">
                {activeStream.toUpperCase()} Stream Access Locked
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                Aapka active subscription plan **{userSubscription?.toUpperCase()}** hai. {activeStream.toUpperCase()} stream classroom unlock karne ke liye pass required hai.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border border-dashed max-w-md mx-auto space-y-4 ${isDarkMode ? 'bg-slate-950 border-teal-500/50' : 'bg-slate-50 border-teal-600'}`}>
              <span className="bg-teal-500/20 text-teal-600 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/40">
                🎁 Loyalty Discount Code
              </span>
              <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Coupon Code: **EXISTING250** (Flat ₹250 Off)
              </p>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Coupon" 
                  value={couponCode} 
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={`border rounded-xl px-3 py-2 text-xs w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                />
                <button 
                  onClick={() => {
                    if (couponCode.toUpperCase() === 'EXISTING250') setDiscountApplied(true);
                    else alert('Invalid Coupon!');
                  }}
                  className="bg-teal-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Apply
                </button>
              </div>

              <button 
                onClick={() => {
                  setUserSubscription(activeStream);
                  alert(`${activeStream.toUpperCase()} Stream Unlocked!`);
                }}
                className="w-full bg-yellow-500 text-black font-extrabold py-3 rounded-xl text-sm transition"
              >
                Unlock {activeStream.toUpperCase()} Stream
              </button>
            </div>
          </div>
        ) : (
          /* Main AI Classroom View */
          <div className={`printable-card border rounded-3xl p-6 md:p-8 shadow-2xl space-y-8 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
            
            {/* Faculty Classroom Header */}
            <div className="flex flex-wrap items-center justify-between border-b pb-5 gap-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className={`text-6xl p-3 rounded-2xl border transition-all ${isSpeaking ? 'animate-bounce border-yellow-400 shadow-yellow-500/20 shadow-xl' : 'border-slate-700'} ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                  {activeTeacher.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-extrabold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTeacher.name}</h3>
                    <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold no-print">AI Classroom Active</span>
                  </div>
                  <p className="text-xs text-yellow-500 font-mono mt-1">{activeTeacher.role} • Topic: {activeTeacher.topic}</p>
                  <p className="text-xs text-teal-400 font-mono mt-0.5">Faculty State: {currentExpression}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 no-print">
                <button 
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold px-5 py-3 rounded-2xl shadow-xl transition text-sm flex items-center gap-2 border border-yellow-400/50"
                >
                  📄 Download Formulas (PDF)
                </button>

                <button 
                  onClick={() => handleLiveInteraction(activeTeacher.intellectualScript)}
                  disabled={loadingAudio}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-xl transition disabled:opacity-50 text-sm border border-blue-400/30"
                >
                  {loadingAudio ? '🧠 Speech Processing...' : '🎙️ Start Classroom Speech'}
                </button>
              </div>
            </div>

            {/* Audio Stream Player */}
            {audioUrl && (
              <div className={`p-4 rounded-2xl border space-y-2 no-print ${isDarkMode ? 'bg-slate-950 border-teal-500/40' : 'bg-teal-50 border-teal-300'}`}>
                <p className="text-xs text-teal-600 dark:text-teal-400 font-mono flex justify-between">
                  <span>🔊 Live Classroom Audio Stream</span>
                  <span className="animate-pulse">● Lecturing...</span>
                </p>
                <audio controls autoPlay onEnded={() => setIsSpeaking(false)} className="w-full h-10">
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            )}

            {/* Live Interactive Doubt Solver Box */}
            <div className={`p-5 rounded-2xl border space-y-3 no-print ${isDarkMode ? 'bg-slate-950 border-teal-500/30' : 'bg-slate-50 border-teal-200'}`}>
              <h4 className="text-xs font-bold text-teal-500 uppercase tracking-wider">
                💬 Ask {activeTeacher.name} a Classroom Doubt
              </h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={`Type your ${activeTeacher.subject} question...`} 
                  value={userDoubt} 
                  onChange={(e) => setUserDoubt(e.target.value)}
                  className={`border rounded-xl px-4 py-2.5 text-xs w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                />
                <button 
                  onClick={() => handleLiveInteraction(userDoubt || activeTeacher.intellectualScript)}
                  disabled={loadingAudio}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loadingAudio ? '🧠 Thinking...' : '🎙️ Ask Live'}
                </button>
              </div>
            </div>

            {/* Revision Notes Box */}
            <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Authentic High-Yield Revision Notes:</h4>
              <p className={`text-xs font-mono leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{activeTeacher.notes}</p>
            </div>

            {/* Formula Bank */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-teal-500 uppercase tracking-wider flex items-center gap-1.5">
                📐 Official High-Yield Formula Bank (Printable)
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

            {/* Interactive Assessment Sheet */}
            <div className="space-y-6 pt-2 border-t border-slate-200 dark:border-slate-800 no-print">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg text-yellow-500">🎯 Interactive Assessment Sheet</h4>
                <span className="text-xs bg-red-500/20 text-red-500 px-3 py-1 rounded-full border border-red-500/30 font-mono">Exam Mode</span>
              </div>

              {activeTeacher.quiz.map((q, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`font-semibold text-sm ${isDarkMode ? 'text-gray-100' : 'text-slate-900'}`}>Q{idx + 1}. {q.q}</p>
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
