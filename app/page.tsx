'use client';

import { useState, useEffect } from 'react';

interface Mentor {
  id: string;
  name: string;
  role: string;
  subject: string;
  topic: string;
  avatarImg: string;
  videoUrl: string;
  welcomeMessage: string;
  defaultTranscript: string;
  notes: string;
  formulas: { title: string; formula: string }[];
}

const SUBJECT_MENTORS: Mentor[] = [
  {
    id: 'kabir',
    name: 'Kabir Sir',
    role: 'Concept & Visualization Specialist',
    subject: 'Physics',
    topic: 'Rotational Dynamics & Torque',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeMessage: '"Let\'s make rotational dynamics simple."',
    defaultTranscript: 'Kabir Sir: Torque is rotational force (τ = r × F). Ask me any doubt from this video lecture!',
    notes: 'Center of Mass, Moment of Inertia (I = ∑mr²), Torque τ = r × F, Pure Rolling (v = ωR).',
    formulas: [
      { title: 'Torque Formula', formula: 'τ = r × F = r F sin(θ)' },
      { title: 'Moment of Inertia (Ring)', formula: 'I = M R²' }
    ]
  },
  {
    id: 'ananya',
    name: 'Ananya Ma\'am',
    role: 'Reaction Kinetics & Organic Lead',
    subject: 'Chemistry',
    topic: 'Biomolecules & Chemical Kinetics',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeMessage: '"Organic Chemistry is logical, not memory work."',
    defaultTranscript: 'Ananya Ma\'am: In zero-order reactions, the rate is independent of reactant concentration.',
    notes: 'Carbohydrate classification, Amino acid zwitterions, Activation Energy as thermodynamic barrier.',
    formulas: [
      { title: 'Zero Order Half Life', formula: 't_1/2 = [A]_0 / (2k)' },
      { title: 'First Order Rate Constant', formula: 'k = (2.303 / t) log([A]_0 / [A])' }
    ]
  },
  {
    id: 'meenakshi',
    name: 'Dr. Meenakshi',
    role: 'Genetics & Plant Physiology Specialist',
    subject: 'Botany',
    topic: 'Photosynthesis & Respiration',
    avatarImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeMessage: '"Master plant processes visually."',
    defaultTranscript: 'Dr. Meenakshi: Light reactions produce ATP and NADPH in the thylakoid membrane.',
    notes: 'Calvin cycle steps, Z-scheme electron transport, C4 pathway adaptation.',
    formulas: [
      { title: 'Overall Reaction', formula: '6CO₂ + 12H₂O + Light → C₆H₁₂O₆ + 6O₂ + 6H₂O' }
    ]
  },
  {
    id: 'vikram',
    name: 'Dr. Vikram',
    role: 'Human Anatomy & Zoology Lead',
    subject: 'Zoology',
    topic: 'Neural Control & Coordination',
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeMessage: '"High-yield NEET diagrams simplified."',
    defaultTranscript: 'Dr. Vikram: Action potential causes depolarization of axon membrane via Na+ channels.',
    notes: 'Synaptic transmission, Reflex arc components, Brain lobe functions.',
    formulas: [
      { title: 'Resting Potential', formula: '-70 mV (Inside negative)' }
    ]
  },
  {
    id: 'aman',
    name: 'Aman Sir',
    role: 'Calculus & Vectors Specialist',
    subject: 'Maths',
    topic: 'Definite Integration & Vectors',
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeMessage: '"Calculus solved with speed & precision."',
    defaultTranscript: 'Aman Sir: Apply integration by parts or properties of definite integrals directly.',
    notes: 'Fundamental theorem of calculus, Vector dot and cross product properties.',
    formulas: [
      { title: 'Integration by Parts', formula: '∫ u dv = uv - ∫ v du' }
    ]
  }
];

export default function Home() {
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [activeMentor, setActiveMentor] = useState<Mentor>(SUBJECT_MENTORS[0]);
  const [activeLang, setActiveLang] = useState<'Hinglish' | 'Hindi' | 'Marathi'>('Hinglish');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [userDoubt, setUserDoubt] = useState('');
  const [activeTab, setActiveTab] = useState('Tutor');

  const handleSubjectChange = (subjectName: string) => {
    setActiveSubject(subjectName);
    const found = SUBJECT_MENTORS.find(m => m.subject === subjectName) || SUBJECT_MENTORS[0];
    setActiveMentor(found);
    setAudioUrl(null);
    setIsSpeaking(false);
    setUserDoubt('');
  };

  const handleSpeechInteraction = async (queryText?: string) => {
    setLoadingAudio(true);
    setIsSpeaking(true);

    const textToSpeak = queryText || activeMentor.defaultTranscript;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak }),
      });

      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
      } else {
        alert('Please verify your OPENAI_API_KEY in Vercel settings.');
        setIsSpeaking(false);
      }
    } catch {
      alert('Audio interaction error.');
      setIsSpeaking(false);
    }
    setLoadingAudio(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0d18] text-white font-sans pb-24">
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Top Subjects Bar */}
      <div className="flex items-center gap-3 overflow-x-auto p-4 border-b border-slate-800/80 no-scrollbar no-print">
        {SUBJECT_MENTORS.map((m) => (
          <button
            key={m.subject}
            onClick={() => handleSubjectChange(m.subject)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubject === m.subject
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 border border-blue-400/40'
                : 'bg-slate-900/80 text-gray-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <img src={m.avatarImg} alt={m.subject} className="w-6 h-6 rounded-full object-cover" />
            <span>{m.subject}</span>
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto p-4 space-y-6">
        
        {/* Mentor Card Container */}
        <div className="bg-[#111629] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5">
          
          {/* Header Indicators */}
          <div className="flex justify-between items-center text-xs no-print">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider uppercase text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Mentor Online
            </span>
            
            <button 
              onClick={() => window.print()}
              className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-bold"
            >
              📄 Printable Sheet
            </button>
          </div>

          {/* 🎥 PRE-RECORDED VIDEO LECTURE SECTION */}
          <div className="space-y-2 no-print">
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              🎥 Chapter Lecture: {activeMentor.topic}
            </p>
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800 bg-slate-950 shadow-xl">
              <video controls className="w-full h-full object-cover">
                <source src={activeMentor.videoUrl} type="video/mp4" />
                Your browser does not support video play.
              </video>
            </div>
          </div>

          {/* Mentor Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img src={activeMentor.avatarImg} alt={activeMentor.name} className="w-10 h-10 rounded-full object-cover border border-blue-500/40" />
              <div>
                <h3 className="font-bold text-base text-white">{activeMentor.name}</h3>
                <p className="text-[11px] text-gray-400 font-mono">{activeMentor.role}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-blue-300">
              {activeMentor.welcomeMessage}
            </p>
          </div>

          {/* Language Selection */}
          <div className="flex gap-2 no-print">
            {(['Hinglish', 'Hindi', 'Marathi'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                  activeLang === lang
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                    : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-850'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* 🎙️ LIVE AI DOUBT SOLVER INTERACTION */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80 no-print">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
              💬 Ask Live Doubt to {activeMentor.name}
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Ask any doubt from ${activeMentor.subject}...`}
                value={userDoubt}
                onChange={(e) => setUserDoubt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSpeechInteraction(userDoubt)}
                disabled={loadingAudio}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition disabled:opacity-50 whitespace-nowrap border border-blue-400/30"
              >
                {loadingAudio ? 'Connecting...' : '🎙️ Ask Live'}
              </button>
            </div>
          </div>

          {/* Audio Response Output */}
          {audioUrl && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <audio controls autoPlay onEnded={() => setIsSpeaking(false)} className="w-full h-8">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}

          {/* Live Transcript Container */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono tracking-wider uppercase">
              <span>LIVE TRANSCRIPT</span>
              <span className="text-purple-400">{activeLang}</span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">
              {userDoubt ? `${activeMentor.name}: "${userDoubt}" - Let's solve this step-by-step using NCERT rules.` : activeMentor.defaultTranscript}
            </p>
          </div>

          {/* High-Yield Notes & Formula Bank */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              📐 High-Yield Formula Bank ({activeMentor.subject})
            </p>
            <div className="grid grid-cols-1 gap-2">
              {activeMentor.formulas.map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <p className="text-amber-400 font-semibold">{f.title}</p>
                  <p className="font-mono text-white font-bold">{f.formula}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-[#0d1120]/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5 flex justify-around items-center text-gray-400 text-[10px] z-50 no-print">
        {[
          { name: 'Home', icon: '🏠' },
          { name: 'Lectures', icon: '📖' },
          { name: 'Monthly Test', icon: '⚡' },
          { name: 'Podcast Mode', icon: '🔊' },
          { name: 'Tutor', icon: '🧬' },
          { name: 'Profile', icon: '👤' }
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === item.name ? 'text-blue-400 font-bold scale-105' : 'hover:text-gray-200'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
