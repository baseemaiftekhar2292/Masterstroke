'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, Video, Mic, Volume2, CheckCircle2, 
  BarChart3, User, ShieldCheck, Download, Languages, 
  HelpCircle, RefreshCw, Layers, Zap, BookOpen, Target
} from 'lucide-react';

type StreamType = 'JEE' | 'NEET';
type SupportedLang = 'Hinglish' | 'Hindi' | 'Marathi' | 'English' | 'Gujarati' | 'Tamil' | 'Telugu' | 'Bengali';

interface Formula {
  title: string;
  expression: string;
  note: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface FacultyProfile {
  id: string;
  name: string;
  title: string;
  subject: string;
  stream: StreamType[];
  gender: 'male' | 'female';
  attire: string;
  avatarUrl: string;
  topic: string;
  videoUrl: string;
  welcomeVoiceText: Record<SupportedLang, string>;
  transcript: Record<SupportedLang, string>;
  notes: string[];
  formulas: Formula[];
  quiz: QuizQuestion[];
}

// MENTORS DATA WITH AUTHENTIC INDIAN FACES & ALL PREVIOUS SETTINGS
const MENTORS: FacultyProfile[] = [
  {
    id: 'kabir-physics',
    name: 'Dr. Kabir Vardhan',
    title: 'Senior Quantum & Mechanics Specialist (Ex-IIT Bombay)',
    subject: 'Physics',
    stream: ['JEE', 'NEET'],
    gender: 'male',
    attire: 'Navy Tailored Executive Suit',
    // Handsome, Smart Indian Male Faculty
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    topic: 'Rotational Dynamics & Torque Vectors',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"Welcome aspirant! Rotational mechanics ko visual concepts se 100% crystal clear karenge."',
      Hindi: '"स्वागत है एस्पिरेंट! घूर्णन गतिशास्त्र को विजुअल कांसेप्ट्स के साथ पूरी तरह सरल बनाएंगे।"',
      Marathi: '"स्वागत आहे! रोटेशनल डायनामिक्स संकल्पना आपण व्हिज्युअल पद्धतीने पूर्णपणे स्पष्ट करूया."',
      English: '"Welcome aspirant! Let us master rotational mechanics through high-yield visual concepts."',
      Gujarati: '"સ્વાગત છે એસ્પિરેન્ટ! રોટેશનલ મિકેનિક્સને વિઝ્યુઅલ વિભાવનાઓ દ્વારા સરળ બનાવીએ."',
      Tamil: '"வரவேற்கிறோம்! சுழற்சி இயக்கவியலை காட்சிக் கருத்துக்கள் மூலம் எளிதாகக் கற்போம்."',
      Telugu: '"స్వాగతం! రొటేషనల్ మెకానిక్స్ ని విజువల్ కాన్సెప్ట్స్ ద్వారా పూర్తిగా అర్థం చేసుకుందాం."',
      Bengali: '"স্বাগত এস্পিরেন্ট! ঘূর্ণন গতিবিজ্ঞান দৃশ্যমান ধারণার মাধ্যমে সহজ করে তুলবো।"'
    },
    transcript: {
      Hinglish: 'Kabir Sir: Torque = r × F sin(θ). Pure rolling motion me point of contact instantaneous rest par hota hai. Direct NCERT Question!',
      Hindi: 'कबीर सर: बल आघूर्ण τ = r × F sin(θ)। शुद्ध घूर्णन गति में संपर्क बिंदु तात्क्षणिक विराम अवस्था में होता है।',
      Marathi: 'कबीर सर: टॉर्क τ = r × F sin(θ). रोलिंग गतीमध्ये संपर्काचा बिंदू तात्पुरता विश्रांतीवर असतो.',
      English: 'Kabir Sir: Torque = r × F sin(θ). In pure rolling, the instantaneous velocity of the contact point is always zero.',
      Gujarati: 'કબીર સર: ટોર્ક τ = r × F sin(θ). શુદ્ધ રોલિંગ ગતિમાં સંપર્ક બિંદુ ત્વરિત વિરામ પર હોય છે.',
      Tamil: 'கபீர் சர்: திருப்புத்திறன் τ = r × F sin(θ). தூய சுழற்சி இயக்கத்தில் தொடு புள்ளி கணநேர ஓய்வில் இருக்கும்.',
      Telugu: 'కబీర్ సర్: టార్క్ τ = r × F sin(θ). ప్యూర్ రోలింగ్ మోషన్‌లో కాంటాక్ట్ పాయింట్ క్షణిక విశ్రాంతిలో ఉంటుంది.',
      Bengali: 'কবীর স্যার: টর্ক τ = r × F sin(θ)। খাঁটি ঘূর্ণন গতিতে স্পর্শ বিন্দুটি তাৎক্ষণিকভাবে বিশ্রামে থাকে।'
    },
    notes: [
      'Center of Mass trajectory remains parabolic under uniform external gravity.',
      'Moment of Inertia (I = ∑mr²) depends on axis of rotation and mass distribution.',
      'Work Done by Torque: W = ∫ τ dθ | Conservation of Angular Momentum: L = Iω = Constant.'
    ],
    formulas: [
      { title: 'Torque Vector Relation', expression: 'τ⃗ = r⃗ × F⃗ = r F sin(θ) n̂', note: 'Cross product direction given by Right Hand Thumb Rule' },
      { title: 'Parallel Axis Theorem', expression: 'I_axis = I_cm + M d²', note: 'Valid for all rigid 3D bodies' }
    ],
    quiz: [
      {
        id: 1,
        question: 'A uniform solid sphere of mass M and radius R rolls without slipping down an inclined plane of angle θ. Its acceleration is:',
        options: ['(5/7) g sin θ', '(2/5) g sin θ', '(3/5) g sin θ', '(7/5) g sin θ'],
        correctIndex: 0,
        explanation: 'For solid sphere, I = (2/5)MR². Acceleration a = g sin θ / (1 + I/MR²) = (5/7) g sin θ.'
      }
    ]
  },
  {
    id: 'ananya-chemistry',
    name: 'Dr. Ananya Roy',
    title: 'Lead Organic & Kinetics Chair (NEET Specialist)',
    subject: 'Chemistry',
    stream: ['JEE', 'NEET'],
    gender: 'female',
    attire: 'Elegant Pastel Silk Saree & Blazer Accent',
    // Beautiful, Professional Indian Female Faculty
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    topic: 'Chemical Kinetics & Biomolecule Reaction Mechanisms',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"Hello future doctors & engineers! Organic reactions ko cram nahi, electron displacement logic se master karenge."',
      Hindi: '"नमस्ते भावी डॉक्टरों और इंजीनियरों! कार्बनिक अभिक्रियाओं को रटना नहीं, इलेक्ट्रॉन विस्थापन लॉजिक से समझना है। "',
      Marathi: '"नमस्कार! ऑरगॅनिक केमिस्ट्री घोकायची नाही, तर इलेक्ट्रॉन मेकॅनिझमद्वारे लॉजिकल समजायची आहे."',
      English: '"Hello future toppers! Master reaction kinetics and organic mechanisms with 100% logical clarity."',
      Gujarati: '"નમસ્તે! ઓર્ગેનિક કેમિસ્ટ્રીને ગોખવાની નથી, ઈલેક્ટ્રોન ટ્રાન્સફર લોજિકથી સમજવાની છે."',
      Tamil: '"வணக்கம் எதிர்கால சாதனையாளர்களே! ஆர்கானிக் வினைகளை மனப்பாடம் செய்யாமல் தர்க்கரீதியாக கற்போம்."',
      Telugu: '"నమస్తే! ఆర్గానిక్ కెమిస్ట్రీని బట్టీ పట్టకుండా, ఎలక్ట్రాన్ మూవ్‌మెంట్ లాజిక్‌తో నేర్చుకుందాం."',
      Bengali: '"নমস্কার হবু ডক্টর ও ইঞ্জিনিয়াররা! জৈব রসায়ন মুখস্থ না করে ইলেকট্রন স্থানান্তরের যুক্তিতে শিখবো।"'
    },
    transcript: {
      Hinglish: 'Ananya Ma\'am: Zero order reaction rate concentration se independent hota hai: [A]_t = [A]_0 - kt. Half-life t_1/2 = [A]_0 / 2k.',
      Hindi: 'अनन्या मैम: शून्य कोटि अभिक्रिया दर सांद्रता से स्वतंत्र होती है: t_1/2 = [A]_0 / (2k)।',
      Marathi: 'अनन्या मॅडम: शून्य-क्रम अभिक्रियेचा दर सांद्रतेवर अवलंबून नसतो. half-life थेट सुरुवातीच्या सांद्रतेवर अवलंबून असते.',
      English: 'Ananya Ma\'am: Rate of zero order reaction is k[A]^0. Half-life is directly proportional to initial reactant concentration.',
      Gujarati: 'અનન્યા મેડમ: શૂન્ય ક્રમની પ્રક્રિયાનો દર સાંદ્રતા પર આધાર રાખતો નથી.',
      Tamil: 'அனன்யா மேடம்: பூஜ்ஜிய வரிசை வினையின் வேகம் செறிவை சார்ந்தது அல்ல.',
      Telugu: 'అనన్య మేడమ్: జీరో ఆర్డర్ రియాక్షన్ రేట్ గాఢతపై ఆధారపడదు.',
      Bengali: 'অনন্যা ম্যাম: শূন্য ক্রম বিক্রিয়ার হার ঘনমাত্রার ওপর নির্ভর করে না।'
    },
    notes: [
      'Arrhenius Equation: k = A e^(-Ea/RT) | Plot of ln(k) vs 1/T gives straight line with slope = -Ea/R.',
      'SN1 mechanism proceeds via carbocation intermediate; racemization occurs at chiral centers.'
    ],
    formulas: [
      { title: 'Arrhenius Activation Energy', expression: 'k = A · exp(-E_a / R T)', note: 'Ea is thermodynamic barrier height' },
      { title: 'Zero Order Half-Life', expression: 't_{1/2} = [A]₀ / (2k)', note: 'Directly proportional to initial reactant amount' }
    ],
    quiz: [
      {
        id: 2,
        question: 'If initial concentration of reactant in a zero-order reaction is doubled, its half-life period will:',
        options: ['Be doubled', 'Remain unchanged', 'Be halved', 'Become 4 times'],
        correctIndex: 0,
        explanation: 'For zero-order reaction, t_1/2 = [A]_0 / (2k). Therefore, half-life is directly proportional to initial concentration [A]_0.'
      }
    ]
  },
  {
    id: 'meenakshi-botany',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Senior Botany & Plant Physiology Chair',
    subject: 'Botany',
    stream: ['NEET'],
    gender: 'female',
    attire: 'Traditional Silk Saree Fusion',
    // Elegant Indian Female Educator
    avatarUrl: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=800',
    topic: 'Photosynthesis in Higher Plants & C4 Pathway',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"Medical aspirants! Photosynthesis aur Plant Physiology ko high-resolution diagrams se master karenge."',
      Hindi: '"मेडिकल एस्पिरेंट्स! प्रकाश संश्लेषण और पादप कार्यिकी को स्पष्ट आरेखों से याद करेंगे। "',
      Marathi: '"वैद्यकीय विद्यार्थ्यांनो! वनस्पतीशास्त्र विषयातील फोटोसिंथेसिस संकल्पना आकृतींच्या साहाय्याने स्पष्ट करूया."',
      English: '"Future Doctors! Plant Physiology and C4 Pathway diagrams made 100% high-yield for NEET UG."',
      Gujarati: '"મેડિકલ એસ્પિરેન્ટ્સ! વનસ્પતિશાસ્ત્રના ખ્યાલો ડાયાગ્રામ દ્વારા સરળતાથી યાદ રાખીએ."',
      Tamil: '"மருத்துவ மாணவர்களே! தாவர உடலியல் கருத்துக்களை வரைபடங்கள் மூலம் தெளிவாக கற்போம்."',
      Telugu: '"మెడికల్ ఆస్పిరెంట్స్! బాటనీ సి-4 పాత్వే కాన్సెప్ట్స్ ని రేఖాచిత్రాలతో నేర్చుకుందాం."',
      Bengali: '"মেডিকেল পরীক্ষার্থীরা! উদ্ভিদের শারীরবৃত্তীয় প্রক্রিয়া নিখুঁতভাবে শিখবো।"'
    },
    transcript: {
      Hinglish: 'Dr. Meenakshi: C4 plants retain Kranz Anatomy. RuBisCO is isolated in Bundle Sheath cells, avoiding Photorespiration!',
      Hindi: 'डॉ. मीनाक्षी: C4 पौधों में क्रैंज शारीर पाई जाती है। बंडल शीथ कोशिकाओं में प्रकाश-श्वसन शून्य होता है।',
      Marathi: 'डॉ. मीनाक्षी: C4 वनस्पतींमध्ये क्रॅन्झ ॲनाटॉमी असते. फोटोरेस्पिरेशन पूर्णपणे टळते.',
      English: 'Dr. Meenakshi: C4 plants exhibit Kranz anatomy. PEPcase fixes CO2 in mesophyll cells.',
      Gujarati: 'ડૉ. મીનાક્ષી: C4 વનસ્પતિઓમાં ક્રાંઝ એનાટોમી જોવા મળે છે.',
      Tamil: 'டாக்டர் மீனாட்சி: C4 தாவரங்களில் கிரான்ஸ் உடற்கூறியல் காணப்படுகிறது.',
      Telugu: 'డాక్టర్ మీనాక్షి: C4 మొక్కలలో క్రాంజ్ అనాటమీ ఉంటుంది.',
      Bengali: 'ডঃ মীনাক্ষী: C4 উদ্ভিদে ক্রাঞ্জ অ্যানাটমি দেখা যায়।'
    },
    notes: [
      'Kranz Anatomy: Large bundle sheath cells around vascular bundles with dense chloroplasts.',
      'Primary CO2 acceptor in C4 plants is Phosphoenolpyruvate (PEP) in Mesophyll.'
    ],
    formulas: [
      { title: 'Photosynthetic Equation', expression: '6 CO₂ + 12 H₂O + Light → C₆H₁₂O₆ + 6 O₂ + 6 H₂O', note: 'Standard photolysis yield' }
    ],
    quiz: [
      {
        id: 3,
        question: 'In C4 plants, the primary CO2 fixation takes place in:',
        options: ['Mesophyll cells', 'Bundle sheath cells', 'Epidermal cells', 'Xylem vessels'],
        correctIndex: 0,
        explanation: 'Primary CO2 fixation occurs in mesophyll cells where PEP accepts CO2 to form OAA.'
      }
    ]
  }
];

export default function Home() {
  const [activeStream, setActiveStream] = useState<StreamType>('NEET');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLang>('Hinglish');
  const [activeMentor, setActiveMentor] = useState<FacultyProfile>(MENTORS[1]);
  const [userDoubtQuery, setUserDoubtQuery] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isAudioSpeaking, setIsAudioSpeaking] = useState(false);
  const [aiVoiceTranscript, setAiVoiceTranscript] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'Home' | 'Lectures' | 'Tests' | 'Podcast' | 'Profile'>('Home');
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [isListeningMic, setIsListeningMic] = useState(false);

  const filteredMentors = MENTORS.filter(m => m.stream.includes(activeStream));

  useEffect(() => {
    if (!activeMentor.stream.includes(activeStream)) {
      setActiveMentor(filteredMentors[0]);
    }
  }, [activeStream]);

  const handleAskAiDoubt = async (queryText?: string) => {
    const textToProcess = queryText || userDoubtQuery || activeMentor.transcript[selectedLanguage];
    if (!textToProcess) return;

    setIsAiThinking(true);
    setIsAudioSpeaking(true);
    setAiVoiceTranscript(`${activeMentor.name}: "${textToProcess}" — Processing via NCERT Core Engine...`);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToProcess,
          language: selectedLanguage,
          mentorId: activeMentor.id
        })
      });

      if (!response.ok) {
        setTimeout(() => setIsAiThinking(false), 1200);
      } else {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setIsAudioSpeaking(false);
        setIsAiThinking(false);
      }
    } catch {
      setTimeout(() => setIsAiThinking(false), 1500);
    }
  };

  const handleMicSpeechInput = () => {
    setIsListeningMic(true);
    setTimeout(() => {
      setIsListeningMic(false);
      setUserDoubtQuery(`[${selectedLanguage} Voice Input Captured] Explain core concept.`);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans pb-28 relative overflow-x-hidden">
      
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .printable-card { border: 2px solid #000 !important; background: white !important; color: black !important; box-shadow: none !important; }
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0c0f1d]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent uppercase">
                  MASTERSTROKE
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  PRO AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">JEE/NEET AI Portal</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveStream('JEE')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeStream === 'JEE' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>JEE Main/Adv</span>
            </button>
            <button 
              onClick={() => setActiveStream('NEET')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeStream === 'NEET' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' : 'text-slate-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>NEET UG</span>
            </button>
          </div>

          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MOBILE STREAM TOGGLE */}
      <div className="sm:hidden px-4 py-2 bg-[#090c18] border-b border-slate-800/60 flex justify-center no-print">
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 w-full max-w-xs justify-between">
          <button 
            onClick={() => setActiveStream('JEE')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black ${activeStream === 'JEE' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            JEE
          </button>
          <button 
            onClick={() => setActiveStream('NEET')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black ${activeStream === 'NEET' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
          >
            NEET UG
          </button>
        </div>
      </div>

      {/* DRAWER MENU */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md no-print">
          <div className="w-80 max-w-[85vw] h-full bg-[#0c0f1d] border-l border-slate-800 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-extrabold text-sm text-white">Menu & Controls</h3>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-indigo-400 font-mono uppercase">Subscription</span>
                      <h4 className="font-extrabold text-white text-base">₹429 / Month</h4>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">ACTIVE</span>
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    <input 
                      type="text" 
                      placeholder="Coupon Code"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs w-full uppercase font-mono text-cyan-300"
                    />
                    <button 
                      onClick={() => {
                        if (couponCodeInput.toUpperCase() === 'EXISTING250') {
                          setIsCouponApplied(true);
                          alert('Coupon Applied! Subscription reduced to ₹249/mo');
                        } else {
                          alert('Use code: EXISTING250 for Flat ₹250 Off!');
                        }
                      }}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                  {isCouponApplied && <p className="text-[10px] text-emerald-400 font-mono">✓ Code EXISTING250 Active (₹249/mo)</p>}
                </div>

                <button 
                  onClick={() => { setIsDrawerOpen(false); window.print(); }}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-200"
                >
                  <span className="flex items-center gap-2"><Download className="w-4 h-4 text-amber-400" /> Printable Sheet</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">PDF</span>
                </button>
              </div>
            </div>

            <button onClick={() => setIsDrawerOpen(false)} className="w-full py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400">
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* SUBJECT CHIPS */}
      <div className="border-b border-slate-800/80 bg-[#0a0d1a] py-3 px-4 no-print overflow-x-auto no-scrollbar">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          {filteredMentors.map((mentor) => (
            <button
              key={mentor.id}
              onClick={() => {
                setActiveMentor(mentor);
                setAiVoiceTranscript('');
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeMentor.id === mentor.id
                  ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white border border-cyan-400/40 shadow-lg'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <img src={mentor.avatarUrl} alt={mentor.name} className="w-6 h-6 rounded-full object-cover border border-cyan-400/40" />
              <span>{mentor.name}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase bg-slate-800 text-cyan-300">
                {mentor.subject}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        
        <div className="printable-card bg-[#0d1124] border border-slate-800 rounded-3xl p-5 md:p-7 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-4 no-print">
            <span className="text-emerald-400 font-extrabold tracking-wider uppercase text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Mentor Online
            </span>
            <button onClick={() => window.print()} className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <Download className="w-3 h-3" /> Print PDF Sheet
            </button>
          </div>

          {/* FACULTY PROFILE DISPLAY */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-800 bg-slate-950 shadow-2xl">
              <img src={activeMentor.avatarUrl} alt={activeMentor.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80"></div>

              <div className="absolute top-3 left-3 bg-black/70 border border-slate-700 px-3 py-1 rounded-xl text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>{isAudioSpeaking ? '🗣️ Explaining Live' : '🧠 Analytical Mode'}</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">{activeMentor.subject} Chair</span>
                <h2 className="text-2xl font-black text-white tracking-tight leading-snug mt-0.5">
                  {activeMentor.name}
                </h2>
                <p className="text-xs text-slate-400 font-mono">{activeMentor.title}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-1.5">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono text-[10px]">
                  Topic: {activeMentor.topic}
                </p>
                <p className="text-sm font-semibold text-slate-200 leading-relaxed italic">
                  {activeMentor.welcomeVoiceText[selectedLanguage]}
                </p>
              </div>

              {/* LANGUAGE SELECTOR */}
              <div className="space-y-1.5 no-print">
                <p className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                  <Languages className="w-3 h-3 text-purple-400" /> Explanation Language:
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {(['Hinglish', 'Hindi', 'Marathi', 'English', 'Gujarati', 'Tamil', 'Telugu', 'Bengali'] as SupportedLang[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                        selectedLanguage === lang
                          ? 'bg-purple-600/30 text-purple-300 border-purple-500/60'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
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
          <div className="space-y-3 pt-4 border-t border-slate-800/80 no-print">
            <p className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              <span>On-Demand HD Chapter Lecture</span>
            </p>

            <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800 bg-slate-950 shadow-2xl">
              <video controls className="w-full h-full object-cover">
                <source src={activeMentor.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* AI DOUBT SOLVER */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-indigo-500/30 space-y-4 no-print shadow-xl">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Ask ${activeMentor.name} any doubt from ${activeMentor.topic}...`}
                value={userDoubtQuery}
                onChange={(e) => setUserDoubtQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white"
              />
              
              <button
                onClick={handleMicSpeechInput}
                className={`px-3.5 py-3 rounded-xl border text-xs font-bold ${isListeningMic ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 text-indigo-400'}`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAskAiDoubt()}
                disabled={isAiThinking}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold px-5 py-3 rounded-xl text-xs whitespace-nowrap"
              >
                {isAiThinking ? 'Analyzing...' : 'Ask Live'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                <span>REAL-TIME NCERT TRANSCRIPT</span>
                <span className="text-indigo-400">{selectedLanguage}</span>
              </div>
              <p className="text-xs text-slate-200">{aiVoiceTranscript || activeMentor.transcript[selectedLanguage]}</p>
            </div>
          </div>

          {/* FORMULAS */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Official Formula Bank & Identities</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeMentor.formulas.map((f, fIdx) => (
                <div key={fIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <p className="text-xs font-bold text-amber-400 font-sans">{f.title}</p>
                  <p className="text-sm font-mono font-bold text-white">{f.expression}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{f.note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#0a0d1b]/95 backdrop-blur-xl border-t border-slate-800 px-4 py-2 flex justify-around items-center text-slate-400 text-[10px] z-40 no-print">
        {[
          { id: 'Home', label: 'Home', icon: Sparkles },
          { id: 'Lectures', label: 'Lectures', icon: Video },
          { id: 'Tests', label: 'Tests', icon: Target },
          { id: 'Profile', label: 'Profile', icon: User },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveBottomTab(item.id as any)}
              className={`flex flex-col items-center gap-1 ${activeBottomTab === item.id ? 'text-cyan-400 font-bold' : ''}`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-mono">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
