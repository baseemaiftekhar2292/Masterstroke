'use client';

import { useState, useEffect } from 'react';

interface QuizQuestion {
  q: string;
  options: string[];
  ans: number;
  exp: string;
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
  bg: string;
  intellectualScript: string;
  notes: string;
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
      bg: 'from-blue-700 via-indigo-900 to-slate-950',
      intellectualScript: 'Greetings aspirants! Torque is rotational force: τ = r × F. Notice how conservation of angular momentum governs rolling without slipping.',
      notes: 'Center of Mass, Moment of Inertia (I = ∑mr²), Torque τ = r × F, Pure Rolling (v = ωR).',
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
      id: 'neet-ananya',
      name: 'Ananya Roy',
      role: 'Organic & Physical Chem Lead',
      subject: 'Chemistry',
      topic: 'Biomolecules & Reaction Kinetics',
      avatar: '👩‍🔬',
      expression: '🔬 Deep Analysis',
      badge: 'NEET AIR Specialist',
      bg: 'from-emerald-700 via-teal-900 to-slate-950',
      intellectualScript: 'Hello future doctors! In zero-order reactions, rate is independent of reactant concentration. Let us solve these high-yield NEET numericals.',
      notes: 'Carbohydrate classification, Amino acid zwitterions, Activation Energy as thermodynamic barrier.',
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
  // Stream & Subscription Locking States
  const [userSubscription, setUserSubscription] = useState<'jee' | 'neet' | null>('jee');
  const [activeStream, setActiveStream] = useState<'jee' | 'neet'>('jee');
  
  // Active Character State
  const [activeTeacher, setActiveTeacher] = useState<Teacher>(STREAM_TEACHERS.jee[0]);
  const [currentExpression, setCurrentExpression] = useState('💬 Active');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Quiz & Coupon States
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Audio handling
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const isLocked = userSubscription !== null && userSubscription !== activeStream;

  // Stream Tab Toggle Effect
  const handleStreamChange = (stream: 'jee' | 'neet') => {
    setActiveStream(stream);
    setActiveTeacher(STREAM_TEACHERS[stream][0]);
    setAnswers([]);
    setSubmitted(false);
    setAudioUrl(null);
    setIsSpeaking(false);
  };

  // Expression Animation Engine
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        const exprs = ['🗣️ Explaining Concept', '🔍 Deep Analysis', '⚡ Intellectual Spark', '💡 Solving Live'];
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
    setCurrentExpression('🧠 Generating AI Audio...');
    
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
        alert('Vercel par OPENAI_API_KEY set/verify karein.');
        setIsSpeaking(false);
      }
    } catch {
      alert('Interaction Error.');
      setIsSpeaking(false);
    }
    setLoadingAudio(false);
  };

  return (
    <main className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 min-h-screen bg-slate-950 text-white font-sans">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase animate-pulse">
          Masterstroke Live AI Studio
        </span>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-teal-300 to-yellow-400 bg-clip-text text-transparent">
          Interactive AI Faculty & Authentic Notes
        </h1>
        <p className="text-gray-400 text-sm">Live Expressions, Stream Locking & Dynamic NEET/JEE Assessment</p>
      </div>

      {/* Stream Selector Tabs */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => handleStreamChange('jee')}
          className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition flex items-center gap-2 ${activeStream === 'jee' ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800'}`}
        >
          ⚡ JEE Main & Advanced {userSubscription === 'jee' && '✓'}
        </button>

        <button 
          onClick={() => handleStreamChange('neet')}
          className={`px-6 py-3 rounded-2xl font-extrabold text-sm border transition flex items-center gap-2 ${activeStream === 'neet' ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800'}`}
        >
          🩺 NEET UG Medical {userSubscription === 'neet' && '✓'} {userSubscription === 'jee' && '🔒'}
        </button>
      </div>

      {/* Stream Locked View with Loyalty Coupon */}
      {isLocked ? (
        <div className="border border-yellow-500/30 bg-slate-900/90 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="text-6xl animate-bounce">🔒</div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-yellow-400">
              {activeStream.toUpperCase()} Stream Access Locked
            </h2>
            <p className="text-sm text-gray-300">
              Aapka active plan **{userSubscription?.toUpperCase()}** hai. {activeStream.toUpperCase()} content unlock karne ke liye add-on pass required hai.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-dashed border-teal-500/50 max-w-md mx-auto space-y-4">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/40">
              🎁 Existing User Discount
            </span>
            <p className="text-xs text-gray-300">
              Existing client hone par aapko milta hai **₹250 Flat Off**!
            </p>
            
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">Coupon:</span>
              <span className="text-yellow-400 font-bold text-sm select-all">EXISTING250</span>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter EXISTING250" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs w-full text-white"
              />
              <button 
                onClick={() => {
                  if (couponCode.toUpperCase() === 'EXISTING250') setDiscountApplied(true);
                  else alert('Invalid Coupon! Use: EXISTING250');
                }}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Apply
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 text-left space-y-1 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Price:</span>
                <span className="line-through">₹499/mo</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Loyalty Offer:</span>
                  <span>- ₹250</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-white text-sm pt-1">
                <span>Total:</span>
                <span className="text-yellow-400">{discountApplied ? '₹249/mo' : '₹499/mo'}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setUserSubscription(activeStream);
                alert(`${activeStream.toUpperCase()} Stream Unlocked!`);
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 text-black font-extrabold py-3 rounded-xl text-sm transition shadow-lg"
            >
              Unlock {activeStream.toUpperCase()} Stream
            </button>
          </div>
        </div>
      ) : (
        /* Unlocked Live Interactive Stage */
        <div className="border border-slate-800 bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
          
          {/* Character Card Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-5 gap-4">
            <div className="flex items-center gap-4">
              <div className={`text-6xl bg-slate-950 p-3 rounded-2xl border ${isSpeaking ? 'animate-bounce border-yellow-400' : 'border-slate-700'}`}>
                {activeTeacher.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl text-white">{activeTeacher.name}</h3>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">Live Mode</span>
                </div>
                <p className="text-xs text-yellow-400 font-mono mt-1">Expression: {currentExpression}</p>
              </div>
            </div>

            <button 
              onClick={() => handleLiveInteraction(activeTeacher.intellectualScript)}
              disabled={loadingAudio}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-xl transition disabled:opacity-50 text-sm border border-blue-400/30"
            >
              {loadingAudio ? '🧠 Generating Speech...' : '🎙️ Start Live Interaction'}
            </button>
          </div>

          {/* Audio Player Banner */}
          {audioUrl && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-teal-500/40 space-y-2">
              <p className="text-xs text-teal-400 font-mono flex justify-between">
                <span>🔊 Live Speech Stream Active</span>
                <span className="animate-pulse">● Speaking...</span>
              </p>
              <audio controls autoPlay onEnded={() => setIsSpeaking(false)} className="w-full h-10">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}

          {/* Authentic Syllabus Notes Box */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Authentic High-Yield Notes:</h4>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">{activeTeacher.notes}</p>
          </div>

          {/* Interactive NEET/JEE Jobsheet */}
          <div className="space-y-6 pt-2 border-t border-slate-800">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg text-yellow-400 flex items-center gap-2">🎯 Live Assessment Sheet</h4>
              <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30 font-mono">Exam Mode</span>
            </div>

            {activeTeacher.quiz.map((q, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <p className="font-semibold text-sm text-gray-100">Q{idx + 1}. {q.q}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        const newAns = [...answers];
                        newAns[idx] = optIdx;
                        setAnswers(newAns);
                      }}
                      className={`text-left p-3.5 rounded-xl text-xs font-medium border transition ${answers[idx] === optIdx ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-800'}`}
                    >
                      {optIdx + 1}) {opt}
                    </button>
                  ))}
                </div>

                {submitted && (
                  <div className={`p-4 rounded-xl text-xs mt-2 border ${answers[idx] === q.ans ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-red-950/40 border-red-500 text-red-300'}`}>
                    <p className="font-bold">{answers[idx] === q.ans ? '✅ Correct' : '❌ Incorrect'}</p>
                    <p className="mt-1 text-gray-200"><span className="text-yellow-400 font-semibold">Faculty Explanation: </span>{q.exp}</p>
                  </div>
                )}
              </div>
            ))}

            {!submitted ? (
              <button 
                onClick={() => setSubmitted(true)}
                disabled={answers.length < activeTeacher.quiz.length}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition disabled:opacity-40 text-sm shadow-xl"
              >
                Submit Answers
              </button>
            ) : (
              <div className="p-4 bg-slate-800/80 rounded-2xl text-center border border-teal-500/30">
                <p className="text-lg font-extrabold text-teal-300">Assessment Submitted! 🎉</p>
              </div>
            )}
          </div>

        </div>
      )}

    </main>
  );
}
