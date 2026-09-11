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
  quiz: QuizQuestion[];
}

const LIVE_TEACHERS: Teacher[] = [
  {
    id: 'phy-vikram',
    name: 'Dr. Vikram Sharma',
    role: 'Senior Physics Faculty (Ex-IITian)',
    subject: 'Physics',
    topic: 'Rotational Dynamics & Torque',
    avatar: '👨‍🏫',
    expression: '🧠 Analytical & Focused',
    badge: 'IITian Mentor',
    bg: 'from-blue-700 via-indigo-900 to-slate-950',
    intellectualScript: 'Greetings aspirants. Look at torque as rotational force—t = r × F. When moment of inertia increases, angular velocity must adjust to conserve momentum. Let us solve a high-yield JEE problem now.',
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
  },
  {
    id: 'chem-ananya',
    name: 'Ananya Roy',
    role: 'Organic & Physical Chem Lead',
    subject: 'Chemistry',
    topic: 'Reaction Kinetics & Energetics',
    avatar: '👩‍🔬',
    badge: 'NEET AIR Specialist',
    bg: 'from-emerald-700 via-teal-900 to-slate-950',
    intellectualScript: 'Hello future doctors! In zero-order reactions, rate is independent of reactant concentration. Notice how activation energy acts as a thermodynamic barrier—catalysts lower this peak!',
    quiz: [
      {
        q: "The unit of rate constant for a second-order reaction is:",
        options: ["s⁻¹", "mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "L² mol⁻² s⁻¹"],
        ans: 2,
        exp: "For nth order, unit is (mol/L)^(1-n) s⁻¹. For n=2, it becomes L mol⁻¹ s⁻¹."
      }
    ]
  }
];

export default function Home() {
  const [activeTeacher, setActiveTeacher] = useState<Teacher>(LIVE_TEACHERS[0]);
  const [currentExpression, setCurrentExpression] = useState('💬 Listening to Input');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  
  // Audio handling
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Expression animation sync
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        const expressions = ['🗣️ Explaining Concept', '🔍 Deep Analysis', '⚡ Intellectual Spark', '💡 Solving Live'];
        setCurrentExpression(expressions[Math.floor(Math.random() * expressions.length)]);
      }, 1800);
      return () => clearInterval(interval);
    } else {
      setCurrentExpression(activeTeacher.expression);
    }
  }, [isSpeaking, activeTeacher]);

  const handleLiveInteraction = async () => {
    setLoadingAudio(true);
    setIsSpeaking(true);
    setCurrentExpression('🧠 Generating Intellectual Audio...');
    
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: activeTeacher.intellectualScript }),
      });
      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
        setCurrentExpression('🗣️ Live Lecturing Mode');
      } else {
        alert('Vercel par OPENAI_API_KEY verify karein.');
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
          Live AI Neural Studio
        </span>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-teal-300 to-yellow-400 bg-clip-text text-transparent">
          Masterstroke Live Interactive Faculty
        </h1>
        <p className="text-gray-400 text-sm">Intellectual AI Teachers with Live Expressions & Real-time Speech</p>
      </div>

      {/* Live AI Character Selector */}
      <div className="grid md:grid-cols-2 gap-5">
        {LIVE_TEACHERS.map((t) => (
          <div 
            key={t.id}
            onClick={() => { 
              setActiveTeacher(t); 
              setAnswers([]); 
              setSubmitted(false); 
              setAudioUrl(null); 
              setIsSpeaking(false);
            }}
            className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 bg-gradient-to-br ${t.bg} ${activeTeacher.id === t.id ? 'border-yellow-400 shadow-2xl shadow-blue-900/50 scale-[1.02]' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className={`text-6xl p-3 rounded-2xl border bg-slate-900/80 ${activeTeacher.id === t.id && isSpeaking ? 'animate-bounce border-yellow-400' : 'border-slate-700'}`}>
                  {t.avatar}
                </div>
                {activeTeacher.id === t.id && isSpeaking && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{t.badge}</span>
                <h2 className="text-xl font-extrabold">{t.name}</h2>
                <p className="text-xs text-gray-300">{t.role}</p>
                <p className="text-xs font-semibold text-teal-300">📚 {t.subject}: {t.topic}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Character Interactive Stage */}
      <div className="border border-slate-800 bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* Character Status Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-5 gap-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl bg-slate-950 p-2.5 rounded-2xl border border-slate-700">{activeTeacher.avatar}</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl text-white">{activeTeacher.name}</h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">Live Mode</span>
              </div>
              <p className="text-xs text-yellow-400 font-mono mt-1">Expression: {currentExpression}</p>
            </div>
          </div>

          <button 
            onClick={handleLiveInteraction}
            disabled={loadingAudio}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-extrabold px-6 py-3 rounded-2xl shadow-xl transition disabled:opacity-50 text-sm flex items-center gap-2 border border-blue-400/30"
          >
            {loadingAudio ? '🧠 Thinking Intellectual Speech...' : '🎙️ Start Live Interaction & Speech'}
          </button>
        </div>

        {/* Live Audio Stream Banner */}
        {audioUrl && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-teal-500/40 space-y-2">
            <div className="flex justify-between items-center text-xs text-teal-400 font-mono">
              <span>🔊 Live Audio Stream Active</span>
              <span className="animate-pulse">● Speaking...</span>
            </div>
            <audio 
              controls 
              autoPlay 
              onEnded={() => setIsSpeaking(false)}
              className="w-full h-10"
            >
              <source src={audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}

        {/* Intellectual Speech Transcript Box */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Teacher's Live Intellectual Thought:</p>
          <p className="text-sm text-gray-200 leading-relaxed font-serif italic">"{activeTeacher.intellectualScript}"</p>
        </div>

        {/* Live NEET/JEE Assessment Sheet */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg text-yellow-400 flex items-center gap-2">🎯 NEET/JEE Live Assessment Sheet</h4>
            <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30 font-mono">Real-Exam Mode</span>
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
                  <p className="font-bold">{answers[idx] === q.ans ? '✅ Correct Solution' : '❌ Incorrect'}</p>
                  <p className="mt-1 text-gray-200"><span className="text-yellow-400 font-semibold">Faculty Intellectual Explanation: </span>{q.exp}</p>
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
              Submit Test to {activeTeacher.name}
            </button>
          ) : (
            <div className="p-4 bg-slate-800/80 rounded-2xl text-center border border-teal-500/30">
              <p className="text-lg font-extrabold text-teal-300">Assessment Submitted! 🎉</p>
              <p className="text-xs text-gray-400 mt-1">Select another live character to experience multi-subject guidance.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
