'use client';

import { useState } from 'react';

type SupportedLanguage = 'Hinglish' | 'Hindi' | 'Marathi' | 'English' | 'Gujarati' | 'Tamil' | 'Telugu' | 'Bengali';

interface TranslatedContent {
  welcome: string;
  transcript: string;
  notes: string;
}

interface Mentor {
  id: string;
  name: string;
  role: string;
  subject: string;
  topic: string;
  avatarImg: string;
  videoUrl: string;
  translations: Record<SupportedLanguage, TranslatedContent>;
  formulas: { title: string; formula: string }[];
}

const LANGUAGES: SupportedLanguage[] = ['Hinglish', 'Hindi', 'Marathi', 'English', 'Gujarati', 'Tamil', 'Telugu', 'Bengali'];

const SUBJECT_MENTORS: Mentor[] = [
  {
    id: 'kabir',
    name: 'Kabir Sir',
    role: 'Concept & Visualization Specialist',
    subject: 'Physics',
    topic: 'Rotational Dynamics & Torque',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    translations: {
      Hinglish: {
        welcome: '"Let\'s make rotational dynamics simple."',
        transcript: 'Kabir Sir: Torque rotational force hai (τ = r × F). Koi bhi doubt pucho live solve karenge!',
        notes: 'Center of Mass, Moment of Inertia (I = ∑mr²), Torque τ = r × F, Pure Rolling (v = ωR).'
      },
      Hindi: {
        welcome: '"घूर्णन गति को आसान बनाते हैं।"',
        transcript: 'कबीर सर: बल आघूर्ण घूर्णी बल है (τ = r × F)। अपना कोई भी प्रश्न पूछें!',
        notes: 'द्रव्यमान केंद्र, जड़त्व आघूर्ण (I = ∑mr²), बल आघूर्ण τ = r × F।'
      },
      Marathi: {
        welcome: '"चला रोटेशनल डायनामिक्स सोपे करूया."',
        transcript: 'कबीर सर: टॉर्क म्हणजे फिरवणारे बल (τ = r × F). तुमची कोणतीही शंका विचारा!',
        notes: 'सेंटर ऑफ मास, जडत्वाचा क्षण (I = ∑mr²), टॉर्क τ = r × F.'
      },
      English: {
        welcome: '"Let\'s make rotational dynamics simple."',
        transcript: 'Kabir Sir: Torque is rotational force (τ = r × F). Ask any doubt to solve live!',
        notes: 'Center of Mass, Moment of Inertia (I = ∑mr²), Torque τ = r × F.'
      },
      Gujarati: {
        welcome: '"ચાલો રોટેશનલ ડાયનેમિક્સ સરળ બનાવીએ."',
        transcript: 'કબીર સર: ટોર્ક એ રોટેશનલ બળ છે (τ = r × F). તમારો શંકા પૂછો!',
        notes: 'સેન્ટર ઓફ માસ, મોમેન્ટ ઓફ ઇનર્શિયા (I = ∑mr²).'
      },
      Tamil: {
        welcome: '"சுழற்சி இயக்கவியலை எளிதாக்குவோம்."',
        transcript: 'கபீர் சர்: டார்க் என்பது சுழற்சி விசை (τ = r × F). உங்கள் சந்தேகத்தை கேளுங்கள்!',
        notes: 'நிறை மையம், திருப்புத்திறன் (I = ∑mr²).'
      },
      Telugu: {
        welcome: '"రొటేషనల్ డైనమిక్స్ ని సులభం చేద్దాం."',
        transcript: 'కబీర్ సర్: టార్క్ అనేది భ్రమణ బలం (τ = r × F). మీ సందేహాన్ని అడగండి!',
        notes: 'మాస్ సెంటర్, మోమెంట్ ఆఫ్ ఇనర్షియా (I = ∑mr²).'
      },
      Bengali: {
        welcome: '"চলুন ঘূর্ণন গতিবিজ্ঞান সহজ করি।"',
        transcript: 'কবীর স্যার: টর্ক হলো ঘূর্ণন বল (τ = r × F)। যেকোনো প্রশ্ন জিজ্ঞাসা করুন!',
        notes: 'ভর কেন্দ্র, জড়তার ভ্রামক (I = ∑mr²)।'
      }
    },
    formulas: [
      { title: 'Torque Formula', formula: 'τ = r × F = r F sin(θ)' },
      { title: 'Moment of Inertia (Ring)', formula: 'I = M R²' }
    ]
  }
];

export default function Home() {
  const [activeSubject] = useState('Physics');
  const [activeMentor] = useState<Mentor>(SUBJECT_MENTORS[0]);
  const [activeLang, setActiveLang] = useState<SupportedLanguage>('Hinglish');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [userDoubt, setUserDoubt] = useState('');
  const [isListening, setIsListening] = useState(false);

  const currentContent = activeMentor.translations[activeLang] || activeMentor.translations['Hinglish'];

  const startVoiceTranslation = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setUserDoubt(`[${activeLang} Voice Input Captured]`);
    }, 3000);
  };

  const handleSpeechInteraction = async (queryText?: string) => {
    setLoadingAudio(true);
    setIsSpeaking(true);

    const textToSpeak = queryText || currentContent.transcript;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, lang: activeLang }),
      });

      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
      } else {
        alert('Verify OPENAI_API_KEY in Vercel.');
        setIsSpeaking(false);
      }
    } catch {
      alert('Audio Translation Error.');
      setIsSpeaking(false);
    }
    setLoadingAudio(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0d18] text-white font-sans pb-24">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <div className="bg-[#111629] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5">
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-400 font-semibold text-[10px]">● MENTOR ONLINE</span>
            <span className="text-gray-400 text-[10px] font-mono">ALL-LANG AI ENGINE</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-800 bg-slate-950">
            <img src={activeMentor.avatarImg} alt={activeMentor.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent opacity-90"></div>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg">{activeMentor.name} · {activeMentor.subject}</h3>
            <p className="text-sm font-semibold text-blue-300">{currentContent.welcome}</p>
          </div>

          {/* 🌍 All-Language Selector Bar */}
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 font-mono uppercase">Select UI & Voice Language:</p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition whitespace-nowrap ${
                    activeLang === lang
                      ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                      : 'bg-slate-900 text-gray-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* 🎙️ Voice & Text Translator Input */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Type in ${activeLang} or use Mic...`}
                value={userDoubt}
                onChange={(e) => setUserDoubt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
              <button
                onClick={startVoiceTranslation}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition ${isListening ? 'bg-red-600 border-red-400 animate-pulse text-white' : 'bg-slate-900 border-slate-800 text-purple-400'}`}
              >
                {isListening ? '🎙️ Listening...' : '🎤 Mic'}
              </button>
            </div>

            <button
              onClick={() => handleSpeechInteraction(userDoubt || currentContent.transcript)}
              disabled={loadingAudio}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl text-xs"
            >
              {loadingAudio ? 'Translating & Generating Audio...' : `🗣️ Explain Live in ${activeLang}`}
            </button>
          </div>

          {audioUrl && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <audio controls autoPlay onEnded={() => setIsSpeaking(false)} className="w-full h-8">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}

          {/* Live Translated Transcript */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>LIVE TRANSCRIPT</span>
              <span className="text-purple-400">{activeLang}</span>
            </div>
            <p className="text-xs text-gray-200">{userDoubt ? `${activeMentor.name}: "${userDoubt}"` : currentContent.transcript}</p>
          </div>

        </div>
      </div>
    </main>
  );
}
