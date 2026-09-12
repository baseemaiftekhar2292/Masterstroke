'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Video, Mic, Volume2, 
  Languages, Zap, VolumeX, Sparkles, BookOpen, User, Play, Compass
} from 'lucide-react';

type StreamType = 'JEE' | 'NEET';
type SupportedLang = 'Hinglish' | 'Hindi' | 'Marathi' | 'English' | 'Gujarati' | 'Tamil' | 'Telugu' | 'Bengali';

interface Formula {
  title: string;
  expression: string;
  note: string;
}

interface FacultyProfile {
  id: string;
  name: string;
  title: string;
  subject: string;
  stream: StreamType[];
  avatarUrl: string;
  topic: string;
  videoUrl: string;
  welcomeVoiceText: Record<SupportedLang, string>;
  transcript: Record<SupportedLang, string>;
  formulas: Formula[];
}

const MENTORS: FacultyProfile[] = [
  {
    id: 'kabir-physics',
    name: 'Dr. Kabir Vardhan',
    title: 'Senior Quantum & Mechanics Specialist',
    subject: 'Physics',
    stream: ['JEE', 'NEET'],
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    topic: 'Rotational Dynamics & Torque Vectors',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    welcomeVoiceText: {
      Hinglish: 'Welcome aspirant! Rotational mechanics ko visual concepts se clear karenge.',
      Hindi: 'स्वागत है एस्पिरेंट! घूर्णन गतिशास्त्र को विजुअल कांसेप्ट्स से सरल बनाएंगे।',
      Marathi: 'स्वागत आहे! रोटेशनल डायनामिक्स संकल्पना आपण स्पष्ट करूया.',
      English: 'Welcome aspirant! Master rotational mechanics through visual concepts.',
      Gujarati: 'સ્વાગત છે! રોટેશનલ મિકેનિક્સને વિઝ્યુઅલ વિભાવનાઓથી સરળ બનાવીએ.',
      Tamil: 'வரவேற்கிறோம்! சுழற்சி இயக்கவியலை காட்சிக் கருத்துக்கள் மூலம் கற்போம்.',
      Telugu: 'స్వాగతం! రొటేషనల్ మెకానిక్స్ ని విజువల్ కాన్సెప్ట్స్ తో నేర్చుకుందాం.',
      Bengali: 'স্বাগত! ঘূর্ণন গতিবিজ্ঞান দৃশ্যমান ধারণার মাধ্যমে সহজ করবো।'
    },
    transcript: {
      Hinglish: 'Kabir Sir: Torque is rotational force equal to r cross F sin theta. Pure rolling motion me contact point instantaneous rest par hota hai.',
      Hindi: 'कबीर सर: बल आघूर्ण टाउ बराबर r cross F sin theta। शुद्ध घूर्णन गति में संपर्क बिंदु तात्क्षणिक विराम अवस्था में होता है।',
      Marathi: 'कबीर सर: टॉर्क बराबर r cross F sin theta. रोलिंग गतीमध्ये संपर्काचा बिंदू विश्रांतीवर असतो.',
      English: 'Kabir Sir: Torque equals r cross F sin theta. In pure rolling, instantaneous velocity of contact point is zero.',
      Gujarati: 'કબીર સર: ટોર્ક ટાઉ = r cross F sin theta. શુદ્ધ રોલિંગ ગતિમાં સંપર્ક બિંદુ વિરામ પર હોય છે.',
      Tamil: 'கபீர் சர்: திருப்புத்திறன் டாவு = r cross F sin theta. தூய சுழற்சி இயக்கத்தில் தொடு புள்ளி ஓய்வில் இருக்கும்.',
      Telugu: 'కబీర్ సర్: టార్క్ టావు = r cross F sin theta. కాంటాక్ట్ పాయింట్ క్షణిక విశ్రాంతిలో ఉంటుంది.',
      Bengali: 'কবীর স্যার: টর্ক টাউ = r cross F sin theta। স্পর্শ বিন্দুটি তাৎক্ষণিকভাবে বিশ্রামে থাকে।'
    },
    formulas: [
      { title: 'Torque Vector Relation', expression: 'τ = r × F = r F sin(θ)', note: 'Cross product right-hand rule' },
      { title: 'Parallel Axis Theorem', expression: 'I_axis = I_cm + M d²', note: 'Valid for rigid bodies' }
    ]
  },
  {
    id: 'ananya-chemistry',
    name: 'Dr. Ananya Roy',
    title: 'Lead Organic & Kinetics Chair',
    subject: 'Chemistry',
    stream: ['JEE', 'NEET'],
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    topic: 'Chemical Kinetics & Biomolecules',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    welcomeVoiceText: {
      Hinglish: 'Hello future toppers! Organic reactions ko electron displacement logic se master karenge.',
      Hindi: 'नमस्ते भावी डॉक्टरों और इंजीनियरों! कार्बनिक अभिक्रियाओं को लॉजिक से समझना है।',
      Marathi: 'नमस्कार! ऑरगॅनिक केमिस्ट्री इलेक्ट्रॉन मेकॅनिझमद्वारे समजायची आहे.',
      English: 'Hello future toppers! Master reaction kinetics and organic mechanisms with logic.',
      Gujarati: 'નમસ્તે! ઓર્ગેનિક કેમિસ્ટ્રીને ઈલેક્ટ્રોન ટ્રાન્સફર લોજિકથી સમજવાની છે.',
      Tamil: 'வணக்கம்! ஆர்கானிக் வினைகளை தர்க்கரீதியாக கற்போம்.',
      Telugu: 'నమస్తే! ఆర్గానిక్ కెమిస్ట్రీని ఎలక్ట్రాన్ మూవ్‌మెంట్ లాజిక్‌తో నేర్చుకుందాం.',
      Bengali: 'নমস্কার! জৈব রসায়ন ইলেকট্রন স্থানান্তরের যুক্তিতে শিখবো।'
    },
    transcript: {
      Hinglish: 'Ananya Ma\'am: Zero order reaction rate reactant concentration se independent hota hai.',
      Hindi: 'अनन्या मैम: शून्य कोटि अभिक्रिया दर सांद्रता से स्वतंत्र होती है।',
      Marathi: 'अनन्या मॅडम: शून्य-क्रम अभिक्रियेचा दर सांद्रतेवर अवलंबून नसतो.',
      English: 'Ananya Ma\'am: Rate of zero order reaction is completely independent of concentration.',
      Gujarati: 'અનન્યા મેડમ: શૂન્ય ક્રમની પ્રક્રિયાનો દર સાંદ્રતા પર આધાર રાખતો નથી.',
      Tamil: 'அனன்யா மேடம்: பூஜ்ஜிய வரிசை வினையின் வேகம் செறிவை சார்ந்தது அல்ல.',
      Telugu: 'అనన్య మేడమ్: జీరో ఆర్డర్ రియాక్షన్ రేట్ గాఢతపై ఆధారపడదు.',
      Bengali: 'অনন্যা ম্যাম: শূন্য ক্রম বিক্রিয়ার হার ঘনমাত্রার ওপর নির্ভর করে না।'
    },
    formulas: [
      { title: 'Arrhenius Activation Energy', expression: 'k = A exp(-E_a / R T)', note: 'Thermodynamic barrier' },
      { title: 'Zero Order Half-Life', expression: 't_{1/2} = [A]₀ / (2k)', note: 'Directly proportional to initial reactant' }
    ]
  }
];

export default function Home() {
  const [activeStream, setActiveStream] = useState<StreamType>('NEET');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLang>('Hinglish');
  const [activeMentor, setActiveMentor] = useState<FacultyProfile>(MENTORS[1]);
  const [userDoubtQuery, setUserDoubtQuery] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiVoiceTranscript, setAiVoiceTranscript] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Home' | 'Lectures' | 'Formula' | 'Profile'>('Home');

  const filteredMentors = MENTORS.filter(m => m.stream.includes(activeStream));

  useEffect(() => {
    if (!activeMentor.stream.includes(activeStream)) {
      setActiveMentor(filteredMentors[0]);
    }
  }, [activeStream]);

  const speakTextFree = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;

      const langMap: Record<SupportedLang, string> = {
        Hinglish: 'hi-IN', Hindi: 'hi-IN', Marathi: 'mr-IN', English: 'en-IN',
        Gujarati: 'gu-IN', Tamil: 'ta-IN', Telugu: 'te-IN', Bengali: 'bn-IN'
      };
      utterance.lang = langMap[selectedLanguage] || 'hi-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleAskAiDoubt = async () => {
    const doubtToProcess = userDoubtQuery || activeMentor.transcript[selectedLanguage];
    if (!doubtToProcess) return;

    setIsAiThinking(true);
    setAiVoiceTranscript('Connecting to Gemini AI Engine...');

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are ${activeMentor.name}, a top Indian EdTech mentor for ${activeStream} ${activeMentor.subject}. Answer this student doubt concisely in ${selectedLanguage} language under 2-3 sentences: ${doubtToProcess}`
            }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || `${activeMentor.name}: ${doubtToProcess}`;
      
      setAiVoiceTranscript(aiResponse);
      speakTextFree(aiResponse);
    } catch {
      const fallbackMsg = `${activeMentor.name} (NCERT Core): ${doubtToProcess}`;
      setAiVoiceTranscript(fallbackMsg);
      speakTextFree(fallbackMsg);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ededed] font-sans selection:bg-white selection:text-black pb-28">
      
      {/* APP HEADER */}
      <header className="sticky top-0 z-40 bg-[#000000]/80 backdrop-blur-xl border-b border-[#1c1c1c] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 76 65" className="w-3.5 h-3.5 fill-black">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white font-mono">masterstroke</span>
          </div>

          {/* APP CONTROL SWITCHER */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 bg-[#111111] rounded-full border border-[#222222] text-xs font-mono">
              <button 
                onClick={() => setActiveStream('JEE')} 
                className={`px-3 py-1 rounded-full transition-all duration-200 ${activeStream === 'JEE' ? 'bg-[#222222] text-white font-medium shadow' : 'text-[#777777]'}`}
              >
                JEE
              </button>
              <button 
                onClick={() => setActiveStream('NEET')} 
                className={`px-3 py-1 rounded-full transition-all duration-200 ${activeStream === 'NEET' ? 'bg-[#222222] text-white font-medium shadow' : 'text-[#777777]'}`}
              >
                NEET
              </button>
            </div>
            <button onClick={() => setIsDrawerOpen(true)} className="p-2 rounded-full border border-[#222222] bg-[#111111] text-[#888888] active:scale-95 transition">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* SIDE DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md">
          <div className="w-80 h-full bg-[#0a0a0a] border-l border-[#222222] p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#222222] pb-4">
                <span className="font-mono text-xs text-[#888888]">App Engine Status</span>
                <button onClick={() => setIsDrawerOpen(false)} className="text-[#888888] hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4 bg-[#111111] border border-[#222222] rounded-xl text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Free Gemini AI Active</span>
                </div>
                <p className="text-[#666666]">1,500 Daily Free Requests Loaded</p>
              </div>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="w-full py-2.5 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#888888]">Close</button>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-5">
        
        {/* FACULTY CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-[#1c1c1c] pb-3">
          {filteredMentors.map((m) => (
            <button
              key={m.id}
              onClick={() => { setActiveMentor(m); stopSpeech(); }}
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all ${
                activeMentor.id === m.id 
                  ? 'bg-white text-black border-white font-medium shadow-md' 
                  : 'bg-[#0a0a0a] border-[#222222] text-[#888888]'
              }`}
            >
              <img src={m.avatarUrl} alt={m.name} className="w-4 h-4 rounded-full object-cover" />
              <span>{m.name}</span>
            </button>
          ))}
        </div>

        {/* FACULTY HERO CARD */}
        <div className="bg-[#0a0a0a] border border-[#222222] rounded-2xl p-4 md:p-6 space-y-5 shadow-2xl">
          
          <div className="flex justify-between items-center border-b border-[#1f1f1f] pb-3">
            <div>
              <h1 className="text-base font-semibold text-white tracking-tight">{activeMentor.name}</h1>
              <p className="text-xs font-mono text-[#777777]">{activeMentor.title}</p>
            </div>
            
            <button 
              onClick={() => speakTextFree(activeMentor.welcomeVoiceText[selectedLanguage])}
              className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] text-white rounded-full text-xs font-mono transition flex items-center gap-1.5 active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Listen Voice</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* AVATAR FRAME WITH AUDIO WAVE EFFECT */}
            <div className="md:col-span-5 bg-[#000000] border border-[#222222] rounded-xl overflow-hidden aspect-[4/3] relative flex items-center justify-center">
              <img 
                src={activeMentor.avatarUrl} 
                alt={activeMentor.name} 
                className={`w-full h-full object-cover object-top transition-all duration-500 ${isSpeaking ? 'scale-105 brightness-110' : 'scale-100'}`} 
              />
              
              {isSpeaking && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-8 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-12 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-pulse"></span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#666666] uppercase">CURRENT TOPIC</span>
                <p className="text-xs font-semibold text-white">{activeMentor.topic}</p>
              </div>

              <div className="p-3 bg-[#000000] border border-[#1f1f1f] rounded-xl">
                <p className="text-xs text-[#bbbbbb] leading-relaxed">{activeMentor.welcomeVoiceText[selectedLanguage]}</p>
              </div>

              {/* MULTILINGUAL SELECTOR */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#666666] uppercase">SELECT LANGUAGE</span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {(['Hinglish', 'Hindi', 'Marathi', 'English', 'Gujarati', 'Tamil', 'Telugu', 'Bengali'] as SupportedLang[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLanguage(lang); speakTextFree(activeMentor.welcomeVoiceText[lang]); }}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono border transition ${
                        selectedLanguage === lang ? 'bg-white text-black border-white font-medium' : 'bg-[#000000] text-[#666666] border-[#222222]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* VIDEO LECTURE PLAYER */}
          <div className="space-y-2 border-t border-[#1f1f1f] pt-4">
            <span className="text-[10px] font-mono text-[#666666] uppercase">ON-DEMAND VIDEO LECTURE</span>
            <div className="bg-[#000000] border border-[#222222] rounded-xl overflow-hidden aspect-video relative">
              <video key={activeMentor.id} controls className="w-full h-full object-cover">
                <source src={activeMentor.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* AI GEMINI DOUBT SOLVER */}
          <div className="bg-[#000000] border border-[#222222] rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#666666]">
              <span className="flex items-center gap-1 text-cyan-400">
                <Sparkles className="w-3 h-3" /> ASK GEMINI AI DOUBT ENGINE
              </span>
              <span>100% Free Voice</span>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Ask ${activeMentor.name} any doubt...`}
                value={userDoubtQuery}
                onChange={(e) => setUserDoubtQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#222222] focus:border-[#444444] outline-none rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder:text-[#444444]"
              />
              
              <button 
                onClick={handleAskAiDoubt}
                disabled={isAiThinking}
                className="px-4 py-2.5 bg-white hover:bg-zinc-200 text-black font-mono font-medium rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition"
              >
                {isAiThinking ? 'Thinking...' : 'Ask AI'}
              </button>

              {isSpeaking && (
                <button onClick={stopSpeech} className="px-3 py-2.5 bg-rose-950 border border-rose-800 text-rose-400 rounded-xl text-xs font-mono">
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="p-3 bg-[#0a0a0a] border border-[#222222] rounded-xl text-xs font-mono text-[#888888] space-y-1">
              <div className="flex justify-between text-[10px] text-[#555555]">
                <span>AI RESPONSE TRANSCRIPT</span>
                <span>{selectedLanguage}</span>
              </div>
              <p className="text-white">{aiVoiceTranscript || activeMentor.transcript[selectedLanguage]}</p>
            </div>
          </div>

        </div>

      </main>

      {/* MOBILE APP FLOATING BOTTOM NAVIGATION */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-40">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#333333] rounded-full px-5 py-2.5 flex items-center gap-8 shadow-2xl font-mono text-xs">
          <button 
            onClick={() => setActiveTab('Home')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'Home' ? 'text-white font-medium' : 'text-[#666666]'}`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[10px]">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('Lectures')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'Lectures' ? 'text-white font-medium' : 'text-[#666666]'}`}
          >
            <Play className="w-4 h-4" />
            <span className="text-[10px]">Lectures</span>
          </button>

          <button 
            onClick={() => setActiveTab('Formula')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'Formula' ? 'text-white font-medium' : 'text-[#666666]'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Formula</span>
          </button>

          <button 
            onClick={() => setActiveTab('Profile')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'Profile' ? 'text-white font-medium' : 'text-[#666666]'}`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </div>

    </div>
  );
}
