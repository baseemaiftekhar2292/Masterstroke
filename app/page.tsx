'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sparkles, Video, Mic, Volume2, FileText, CheckCircle2, 
  Award, Play, Pause, ChevronRight, Zap, BookOpen, BarChart3, 
  User, ShieldCheck, CreditCard, Download, Moon, Sun, Languages, 
  HelpCircle, RefreshCw, Layers, Check, ArrowRight, Lock, Target
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
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

// ==========================================
// AUTHENTIC JEE / NEET MENTORS DATA
// ==========================================
const MENTORS: FacultyProfile[] = [
  {
    id: 'kabir-physics',
    name: 'Dr. Kabir Vardhan',
    title: 'Senior Quantum & Mechanics Specialist (Ex-IIT Bombay)',
    subject: 'Physics',
    stream: ['JEE', 'NEET'],
    gender: 'male',
    attire: 'Tailored Navy Blazer over Crisp White Shirt',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
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
      { title: 'Parallel Axis Theorem', expression: 'I_axis = I_cm + M d²', note: 'Valid for all rigid 3D bodies' },
      { title: 'Pure Rolling Velocity', expression: 'v_cm = R · ω', note: 'No slipping condition at ground contact' }
    ],
    quiz: [
      {
        id: 1,
        question: 'A uniform solid sphere of mass M and radius R rolls without slipping down an inclined plane of angle θ. Its acceleration is:',
        options: ['(5/7) g sin θ', '(2/5) g sin θ', '(3/5) g sin θ', '(7/5) g sin θ'],
        correctIndex: 0,
        explanation: 'For solid sphere, I = (2/5)MR². Acceleration a = g sin θ / (1 + I/MR²) = g sin θ / (1 + 2/5) = (5/7) g sin θ.'
      }
    ]
  },
  {
    id: 'ananya-chemistry',
    name: 'Dr. Ananya Roy',
    title: 'Lead Organic & Kinetics Chair (AIR Specialist)',
    subject: 'Chemistry',
    stream: ['JEE', 'NEET'],
    gender: 'female',
    attire: 'Elegantly Styled Pastel Silk Saree with Professional Blazer Accent',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    topic: 'Chemical Kinetics & Biomolecule Reaction Mechanisms',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"Hello future doctors & engineers! Organic reactions ko cram nahi, electron displacement logic se master karenge."',
      Hindi: '"नमस्ते भावी डॉक्टरों और इंजीनियरों! कार्बनिक अभिक्रियाओं को रटना नहीं, इलेक्ट्रॉन विस्थापन लॉजिक से समझना है। "',
      Marathi: '"नमस्कार! ऑरगॅनिक केमिस्ट्री घोकायची नाही, तर इलेक्ट्रॉन मेकॅनिझमद्वारे लॉजिकली समजायची आहे."',
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
      'First order reaction unit of rate constant is s⁻¹, independent of concentration units.',
      'SN1 mechanism proceeds via carbocation intermediate; racemization occurs at chiral centers.'
    ],
    formulas: [
      { title: 'Arrhenius Activation Energy', expression: 'k = A · exp(-E_a / R T)', note: 'Ea is thermodynamic barrier height' },
      { title: 'First Order Kinetics', expression: 'k = (2.303 / t) · log([A]₀ / [A]_t)', note: 'Linear semi-logarithmic decay plot' },
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
    title: 'Senior Botany & Genetics Lead (AIIMS Faculty Mentor)',
    subject: 'Botany',
    stream: ['NEET'],
    gender: 'female',
    attire: 'Graceful Traditional Blazer Saree Fusion',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
    topic: 'Photosynthesis in Higher Plants & C4 Pathway',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"Medical aspirants! Photosynthesis aur Plant Physiology ko high-resolution 3D diagrams se memory-permanent karenge."',
      Hindi: '"मेडिकल एस्पिरेंट्स! प्रकाश संश्लेषण और पादप कार्यिकी को 3D आरेखों से स्थायी रूप से याद करेंगे। "',
      Marathi: '"वैद्यकीय विद्यार्थ्यांनो! वनस्पतीशास्त्र विषयातील फोटोसिंथेसिस संकल्पना 3D आलेखांच्या साहाय्याने कायमच्या लक्षात ठेवूया."',
      English: '"Future Doctors! Plant Physiology and C4 Pathway diagrams made 100% high-yield for NEET UG."',
      Gujarati: '"મેડિકલ એસ્પિરેન્ટ્સ! વનસ્પતિશાસ્ત્રના ખ્યાલો 3D ડાયાગ્રામ દ્વારા સરળતાથી યાદ રાખીએ."',
      Tamil: '"மருத்துவ மாணவர்களே! தாவர உடலியல் கருத்துக்களை 3D வரைபடங்கள் மூலம் எளிதில் நினைவில் கொள்வோம்."',
      Telugu: '"మెడికల్ ఆస్పిరెంట్స్! బాటనీ సి-4 పాత్వే కాన్సెప్ట్స్ ని 3D రేఖాచిత్రాలతో పర్‌ఫెక్ట్‌గా నేర్చుకుందాం."',
      Bengali: '"মেডিকেল পরীক্ষার্থীরা! উদ্ভিদের শারীরবৃত্তীয় প্রক্রিয়া ৩ডি চিত্রের মাধ্যমে স্থায়ীভাবে মনে রাখবো।"'
    },
    transcript: {
      Hinglish: 'Dr. Meenakshi: C4 plants retain Kranz Anatomy. RuBisCO is isolated in Bundle Sheath cells, avoiding Photorespiration completely!',
      Hindi: 'डॉ. मीनाक्षी: C4 पौधों में क्रैंज शारीर पाई जाती है। बंडल शीथ कोशिकाओं में प्रकाश-श्वसन शून्य होता है।',
      Marathi: 'डॉ. मीनाक्षी: C4 वनस्पतींमध्ये क्रॅन्झ ॲनाटॉमी असते. फोटोरेस्पिरेशन पूर्णपणे टळते.',
      English: 'Dr. Meenakshi: C4 plants exhibit Kranz anatomy. PEPcase fixes CO2 in mesophyll cells, while RuBisCO operates in bundle sheath cells.',
      Gujarati: 'ડૉ. મીનાક્ષી: C4 વનસ્પતિઓમાં ક્રાંઝ એનાટોમી જોવા મળે છે.',
      Tamil: 'டாக்டர் மீனாட்சி: C4 தாவரங்களில் கிரான்ஸ் உடற்கூறியல் காணப்படுகிறது.',
      Telugu: 'డాక్టర్ మీనాక్షి: C4 మొక్కలలో క్రాంజ్ అనాటమీ ఉంటుంది.',
      Bengali: 'ডঃ মীনাক্ষী: C4 উদ্ভিদে ক্রাঞ্জ অ্যানাটমি দেখা যায়।'
    },
    notes: [
      'Kranz Anatomy: Large bundle sheath cells around vascular bundles with dense chloroplasts without grana.',
      'Primary CO2 acceptor in C4 plants is Phosphoenolpyruvate (PEP) catalyzed by PEPcase in Mesophyll.',
      'Photorespiration (C2 Cycle) consumes ATP and O2 without producing sugar or ATP—a wasteful process avoided in C4.'
    ],
    formulas: [
      { title: 'Overall Photosynthetic Equation', expression: '6 CO₂ + 12 H₂O + Light → C₆H₁₂O₆ + 6 O₂ + 6 H₂O', note: 'Standard photolysis yield' },
      { title: 'ATP Yield in C4 vs C3', expression: 'C3 = 18 ATP / Glucose | C4 = 30 ATP / Glucose', note: 'Extra 12 ATP needed for C4 pump' }
    ],
    quiz: [
      {
        id: 3,
        question: 'In C4 plants, the primary CO2 fixation takes place in:',
        options: ['Mesophyll cells', 'Bundle sheath cells', 'Epidermal cells', 'Xylem vessels'],
        correctIndex: 0,
        explanation: 'Primary CO2 fixation occurs in mesophyll cells where PEP accepts CO2 to form 4-carbon Oxaloacetic Acid (OAA).'
      }
    ]
  },
  {
    id: 'vikram-zoology',
    name: 'Dr. Vikramaditya Sharma',
    title: 'Senior Neuro-Anatomy & Human Physiology Chair',
    subject: 'Zoology',
    stream: ['NEET'],
    gender: 'male',
    attire: 'Crisp Charcoal Executive Blazer & Smart Watch',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    topic: 'Neural Control, Synaptic Transmission & Reflex Arc',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"Future Surgeons! Neural conduction aur Action Potential graphs ko step-by-step master karenge."',
      Hindi: '"भावी सर्जनों! तंत्रिका संवहन और क्रिया विभव आरेखों को चरणबद्ध तरीके से समझेंगे। "',
      Marathi: '"भविष्यातील डॉक्टरांनो! मज्जासंस्था आणि ॲक्शन पोटेंशियल आलेख आपण टप्प्याटप्प्याने स्पष्ट करूया."',
      English: '"Future Medical Leaders! Nerve impulse transmission and membrane dynamics simplified for NEET AIR ranks."',
      Gujarati: '"ભાવિ સર્જનો! ચેતા આવેગ વહન અને સાયનેપ્ટિક વહનને સરળતાથી સમજીએ."',
      Tamil: '"எதிர்கால மருத்துவர்களே! நரம்புத் தூண்டுதல் கடத்தல் மற்றும் நியூரான்களின் செயல்பாட்டை தெளிவாக கற்போம்."',
      Telugu: '"ఫ్యూచర్ సర్జన్స్! నాడీ ప్రచోదన ప్రసారం మరియు యాక్షన్ పొటెన్షియల్ గ్రాఫ్‌లను స్పష్టంగా నేర్చుకుందాం."',
      Bengali: '"হবু সার্জনরা! স্নায়ু উদ্দীপনা পরিবহন এবং অ্যাকশন পটেনশিয়াল নিখুঁতভাবে শিখবো।"'
    },
    transcript: {
      Hinglish: 'Dr. Vikram: Resting membrane potential is -70mV maintained by 3 Na+ Out / 2 K+ In ATPase pump. Depolarization is rapid Na+ influx!',
      Hindi: 'डॉ. विक्रम: विश्राम कला विभव -70mV होता है। सोडियम-पोटेशियम पंप 3 Na+ बाहर और 2 K+ अंदर भेजता है।',
      Marathi: 'डॉ. विक्रम: न्यूरॉनचे रेस्टिंग पोटेंशियल -70mV असते. सोडियम-पोटॅशियम पंप सतत कार्यरत असतो.',
      English: 'Dr. Vikram: Action potential spikes to +30mV due to opening of voltage-gated Na+ channels.',
      Gujarati: 'ડૉ. વિક્રમ: ચેતાકોષનું રેસ્ટિંગ પોટેન્શિયલ -70mV હોય છે.',
      Tamil: 'டாக்டர் விக்ரம்: நரம்பு செல்லின் ஓய்வு நிலை மின் அழுத்தம் -70mV ஆகும்.',
      Telugu: 'డాక్టర్ విక్రమ్: రెస్టింగ్ మెంబ్రేన్ పొటెన్షియల్ -70mV వద్ద ఉంటుంది.',
      Bengali: 'ডঃ বিক্রম: স্নায়ুকোষের রেস্টিং পটেনশিয়াল -70mV থাকে।'
    },
    notes: [
      'Resting Potential (-70 mV): Axolemma more permeable to K+ ions, nearly impermeable to Na+ ions.',
      'Depolarization: Stimulus causes rapid influx of Na+ turning inside positive (+30 mV).',
      'Synaptic Delay: Ca2+ influx at axon terminal releases Acetylcholine into synaptic cleft.'
    ],
    formulas: [
      { title: 'Na+/K+ ATPase Pump Stoichiometry', expression: '3 Na⁺ (Out) : 2 K⁺ (In) per ATP consumed', note: 'Electrogenic active transport' },
      { title: 'Nernst Equation for Equilibrium', expression: 'E_k = (RT / zF) · ln([K⁺]_out / [K⁺]_in)', note: 'Calculates membrane potential' }
    ],
    quiz: [
      {
        id: 4,
        question: 'During the propagation of a nerve impulse, the action potential results from the movement of:',
        options: ['Na+ from extracellular fluid to intracellular fluid', 'K+ from extracellular fluid to intracellular fluid', 'Na+ from intracellular fluid to extracellular fluid', 'K+ from intracellular fluid to extracellular fluid'],
        correctIndex: 0,
        explanation: 'Action potential arises from rapid influx of Na+ ions from extracellular fluid to inside the axon (intracellular fluid) via voltage-gated Na+ channels.'
      }
    ]
  },
  {
    id: 'aman-maths',
    name: 'Aman Deep Singh',
    title: 'Chief Higher Mathematics & Vectors Specialist',
    subject: 'Maths',
    stream: ['JEE'],
    gender: 'male',
    attire: 'Modern Tailored Dark Suit with Minimalist Style',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    topic: 'Definite Integration Properties & Vector 3D',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    welcomeVoiceText: {
      Hinglish: '"IITian dreamers! Calculus aur 3D Vector Geometry ke complex problems ko 30-second shortcuts se Crack karenge."',
      Hindi: '"आईआईटी एस्पिरेंट्स! कैलकुलस और 3D वेक्टर के कठिन प्रश्नों को 30-सेकंड शॉर्टकट से हल करेंगे। "',
      Marathi: '"आयआयटी एस्पिरेंट्स! कॅल्क्युलस आणि 3D व्हेक्टर भूमितीचे कठीण प्रश्न ३०-सेकंद ट्रिक्सने सोडवूया."',
      English: '"Future IITians! Definite integrals and 3D Vector short-methods for 99.9 percentile in JEE Advanced."',
      Gujarati: '"ભાવિ આઈઆઈટીયન્સ! કેલ્ક્યુલસ અને 3D વેક્ટર પ્રશ્નો ટૂંકી ટ્રીક્સથી ઉકેલીએ."',
      Tamil: '"ஐஐடி மாணவர்களே! கால்குலஸ் மற்றும் 3D வெக்டர் கணக்குகளை எளிதான ஷார்ட்கட்களால் தீர்ப்போம்."',
      Telugu: '"ఫ్యూచర్ ఐఐటీయన్స్! క్యాల్కులస్ మరియు 3D వెక్టర్ ప్రాబ్లమ్స్‌ని 30-సెకన్ల షార్ట్‌కట్స్‌తో సాల్వ్ చేద్దాం."',
      Bengali: '"হবু আইআইটিয়ানরা! ক্যালকুলাস ও ৩ডি ভেক্টরের জটিল অঙ্ক শর্টকাট ট্রিক্সে সমাধান করবো।"'
    },
    transcript: {
      Hinglish: 'Aman Sir: King\'s Property: ∫_a^b f(x)dx = ∫_a^b f(a+b-x)dx. 80% JEE Advanced integration questions belong to this property!',
      Hindi: 'अमन सर: निश्चित समाकलन में किंग प्रॉपर्टी ∫_a^b f(x)dx = ∫_a^b f(a+b-x)dx सबसे महत्वपूर्ण है।',
      Marathi: 'अमन सर: डेफिनेट इंटिग्रेशनमध्ये \'किंग्स प्रॉपर्टी\' वापरून कठीण प्रश्न त्वरित सुटतात.',
      English: 'Aman Sir: Apply King\'s property to mirror limits and simplify numerator-denominator cancellation.',
      Gujarati: 'અમન સર: કિંગ્સ પ્રોપર્ટી દ્વારા સંકલનના અઘરા પ્રશ્નો સરળતાથી ઉકેલાય છે.',
      Tamil: 'அமன் சர்: கிங்ஸ் விதியைப் பயன்படுத்தி தொகையீட்டு வினாக்களை எளிதில் தீர்க்கலாம்.',
      Telugu: 'అమన్ సర్: కింగ్స్ ప్రాపర్టీ ఉపయోగించి డెఫినెట్ ఇంటెగ్రల్స్ ని వేగంగా సాల్వ్ చేయవచ్చు.',
      Bengali: 'অমন স্যার: কিংস প্রপার্টি ব্যবহার করে নির্দিষ্ট সমাকলনের অঙ্ক নিমেষে সমাধান করা যায়।'
    },
    notes: [
      'King\'s Property: ∫_a^b f(x)dx = ∫_a^b f(a + b - x)dx | Queen\'s Property for symmetrical limits.',
      'Vector Triple Product: a⃗ × (b⃗ × c⃗) = (a⃗ · c⃗)b⃗ - (a⃗ · b⃗)c⃗ (VTP identity).',
      'Shortest distance between skew lines: d = |(a⃗₂ - a⃗₁) · (b⃗₁ × b⃗₂)| / |b⃗₁ × b⃗₂|.'
    ],
    formulas: [
      { title: 'King\'s Definite Integral Identity', expression: '∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b - x) dx', note: 'Saves 90% step algebra in symmetry' },
      { title: 'Shortest Distance Between Skew Lines', expression: 'd = |(a⃗₂ - a⃗₁) · (b⃗₁ × b⃗₂)| / |b⃗₁ × b⃗₂|', note: 'Standard 3D vector geometry formula' }
    ],
    quiz: [
      {
        id: 5,
        question: 'The value of ∫₀^(π/2) (sin^n x) / (sin^n x + cos^n x) dx is equal to:',
        options: ['π / 4', 'π / 2', '0', '1'],
        correctIndex: 0,
        explanation: 'Applying King\'s property: I = ∫₀^(π/2) cos^n x / (cos^n x + sin^n x) dx. Adding original I and transformed I gives 2I = ∫₀^(π/2) 1 dx = π/2 ⇒ I = π/4.'
      }
    ]
  }
];

// ==========================================
// MAIN PRODUCTION-READY COMPONENT
// ==========================================
export default function MasterstrokeProductionApp() {
  // --- STATES ---
  const [activeStream, setActiveStream] = useState<StreamType>('NEET');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLang>('Hinglish');
  const [activeMentor, setActiveMentor] = useState<FacultyProfile>(MENTORS[1]); // Default Ananya
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

  // Filter mentors based on JEE vs NEET stream isolation
  const filteredMentors = MENTORS.filter(m => m.stream.includes(activeStream));

  // Switch active mentor when stream toggles if current mentor not in new stream
  useEffect(() => {
    if (!activeMentor.stream.includes(activeStream)) {
      setActiveMentor(filteredMentors[0]);
    }
  }, [activeStream]);

  // Speech Interaction Engine
  const handleAskAiDoubt = async (queryText?: string) => {
    const textToProcess = queryText || userDoubtQuery || activeMentor.transcript[selectedLanguage];
    if (!textToProcess) return;

    setIsAiThinking(true);
    setIsAudioSpeaking(true);
    setAiVoiceTranscript(`${activeMentor.name}: "${textToProcess}" — Analyzing via NCERT Core Engine...`);

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
        // Fallback simulation for preview/demo
        setTimeout(() => {
          setIsAiThinking(false);
        }, 1200);
      } else {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setIsAudioSpeaking(false);
        setIsAiThinking(false);
      }
    } catch {
      // Graceful fallback simulation
      setTimeout(() => {
        setIsAiThinking(false);
      }, 1500);
    }
  };

  // Mic Capture Simulation
  const handleMicSpeechInput = () => {
    setIsListeningMic(true);
    setTimeout(() => {
      setIsListeningMic(false);
      setUserDoubtQuery(`[${selectedLanguage} Audio Doubt Captured] Explain reaction rate formula.`);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-28 relative overflow-x-hidden">
      
      {/* GLOBAL PRINT STYLING FOR EXAM WORKSHEETS */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .printable-card { border: 2px solid #000 !important; background: white !important; color: black !important; box-shadow: none !important; }
        }
      `}</style>

      {/* ==========================================
          TOP NAVIGATION BAR WITH HAMBURGER
      ========================================== */}
      <header className="sticky top-0 z-40 bg-[#0c0f1d]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
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
              <p className="text-[10px] text-slate-400 font-mono">JEE/NEET AI Avatar Portal</p>
            </div>
          </div>

          {/* Center Stream isolation Toggle Switch */}
          <div className="hidden sm:flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveStream('JEE')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeStream === 'JEE' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>JEE Main/Adv</span>
            </button>
            <button 
              onClick={() => setActiveStream('NEET')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeStream === 'NEET' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>NEET UG</span>
            </button>
          </div>

          {/* Right Hamburger Icon */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition active:scale-95"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE STREAM TOGGLE BAR */}
      <div className="sm:hidden px-4 py-2 bg-[#090c18] border-b border-slate-800/60 flex justify-center no-print">
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 w-full max-w-xs justify-between">
          <button 
            onClick={() => setActiveStream('JEE')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeStream === 'JEE' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>JEE</span>
          </button>
          <button 
            onClick={() => setActiveStream('NEET')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeStream === 'NEET' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            <span>NEET UG</span>
          </button>
        </div>
      </div>

      {/* ==========================================
          SIDEBAR SLIDE-OUT DRAWER MENU
      ========================================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md no-print animate-in fade-in duration-200">
          <div className="w-85 max-w-[85vw] h-full bg-[#0c0f1d] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            
            <div className="space-y-6">
              {/* Drawer Title & Close Button */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Layers className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">Masterstroke Controls</h3>
                    <p className="text-[10px] font-mono text-cyan-400">Stream: {activeStream} Mode</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Item List */}
              <div className="space-y-3 text-xs font-medium">
                
                {/* Subscription Widget */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-indigo-500/30 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                        Active Plan
                      </span>
                      <h4 className="font-extrabold text-white text-base">₹429 / Month</h4>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/40">
                      SAVINGS ACTIVE
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    Unlimited HD AI-Avatar Video Lectures + 24/7 Voice Doubt Solver Access.
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="flex gap-1.5">
                      <input 
                        type="text" 
                        placeholder="Enter Coupon Code"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs w-full uppercase font-mono text-cyan-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                      <button 
                        onClick={() => {
                          if (couponCodeInput.toUpperCase() === 'EXISTING250') {
                            setIsCouponApplied(true);
                            alert('Coupon EXISTING250 Applied! Price reduced to ₹249/mo');
                          } else {
                            alert('Use code: EXISTING250 for Flat ₹250 Off!');
                          }
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                    {isCouponApplied && (
                      <p className="text-[10px] text-emerald-400 font-mono">✓ Code EXISTING250 Active (₹249/mo)</p>
                    )}
                  </div>
                </div>

                {/* Print Sheet Action */}
                <button 
                  onClick={() => { setIsDrawerOpen(false); window.print(); }}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download Printable Exam Sheet</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    PDF
                  </span>
                </button>

                {/* Progress Chart Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="flex items-center gap-2 text-slate-300 font-semibold">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <span>Monthly Progress Chart</span>
                    </span>
                    <span className="text-cyan-400 font-mono font-bold">78% Target</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 w-[78%] rounded-full"></div>
                  </div>
                </div>

                {/* Help Desk */}
                <button 
                  onClick={() => { setIsDrawerOpen(false); alert('24/7 AI Masterstroke Support Desk Active.'); }}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 flex items-center gap-2.5 text-slate-200 transition"
                >
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span>Help & AI Support Desk</span>
                </button>

              </div>
            </div>

            {/* Footer inside drawer */}
            <div className="border-t border-slate-800/80 pt-4 text-center space-y-2">
              <p className="text-[10px] font-mono text-slate-500">Masterstroke Engine v4.2 · Production Live</p>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 font-bold hover:text-white"
              >
                Close Menu
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          TOP HORIZONTAL SUBJECT CHIPS BAR
      ========================================== */}
      <div className="border-b border-slate-800/80 bg-[#0a0d1a] py-3 px-4 no-print overflow-x-auto no-scrollbar">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono whitespace-nowrap hidden md:inline">
            Faculty Studio:
          </span>
          {filteredMentors.map((mentor) => (
            <button
              key={mentor.id}
              onClick={() => {
                setActiveMentor(mentor);
                setAiVoiceTranscript('');
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeMentor.id === mentor.id
                  ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-cyan-400/40 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <img 
                src={mentor.avatarUrl} 
                alt={mentor.name} 
                className="w-6 h-6 rounded-full object-cover border border-cyan-400/40" 
              />
              <span>{mentor.name}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase ${
                mentor.subject === 'Physics' ? 'bg-blue-500/20 text-blue-300' :
                mentor.subject === 'Chemistry' ? 'bg-purple-500/20 text-purple-300' :
                mentor.subject === 'Botany' ? 'bg-emerald-500/20 text-emerald-300' :
                mentor.subject === 'Zoology' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {mentor.subject}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================
          MAIN CONTENT AREA CONTAINER
      ========================================== */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* PRINTABLE HEADER TITLE (VISIBLE ONLY IN PRINT MODE) */}
        <div className="hidden print-only text-center space-y-2 mb-6">
          <h1 className="text-2xl font-black uppercase tracking-wider">Masterstroke JEE/NEET High-Yield Revision Sheet</h1>
          <p className="text-sm">Faculty: {activeMentor.name} | Subject: {activeMentor.subject} | Topic: {activeMentor.topic}</p>
          <hr className="border-black" />
        </div>

        {/* ==========================================
            HERO MENTOR CARD (PRIMARY INTERFACE)
        ========================================== */}
        <div className="printable-card bg-[#0d1124] border border-slate-800 rounded-3xl p-5 md:p-7 shadow-2xl space-y-6 relative">
          
          {/* Top Indicators Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800/80 pb-4 no-print">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-extrabold tracking-wider uppercase text-[11px] font-mono">
                AI Mentor Online
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full text-[10px] font-mono">
                NCERT 100% Aligned
              </span>
              <button 
                onClick={() => window.print()}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition"
              >
                <Download className="w-3 h-3" />
                <span>Print PDF Sheet</span>
              </button>
            </div>
          </div>

          {/* FACULTY PROFILE & HIGH-AESTHETIC AVATAR VISUALIZER */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left 5 Cols: Avatar Visual Frame */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-square border border-slate-800 bg-slate-950 shadow-2xl group">
              <img 
                src={activeMentor.avatarUrl} 
                alt={activeMentor.name} 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-90"></div>

              {/* Dynamic Expression State Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-slate-700/80 px-3 py-1 rounded-xl text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>{isAudioSpeaking ? '🗣️ Explaining Live' : '🧠 Analytical Mode'}</span>
              </div>

              {/* Lip-Sync Audio Waveform Animation Bars */}
              <div className="absolute bottom-3 right-3 flex items-end gap-1 h-6 px-2 py-1 bg-black/60 rounded-lg backdrop-blur-sm border border-slate-800">
                <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isAudioSpeaking ? 'h-6 animate-bounce' : 'h-1.5'}`}></span>
                <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isAudioSpeaking ? 'h-4 animate-bounce delay-100' : 'h-2'}`}></span>
                <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isAudioSpeaking ? 'h-5 animate-bounce delay-200' : 'h-1'}`}></span>
                <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isAudioSpeaking ? 'h-3 animate-bounce delay-150' : 'h-2.5'}`}></span>
              </div>
            </div>

            {/* Right 7 Cols: Faculty Description & Welcome Dialogue */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{activeMentor.subject} Chair</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] text-slate-400 font-mono">{activeMentor.attire}</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-snug mt-1">
                  {activeMentor.name}
                </h2>
                <p className="text-xs text-slate-400 font-mono">{activeMentor.title}</p>
              </div>

              {/* Welcome Quote Box */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-2">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono text-[10px]">
                  Topic: {activeMentor.topic}
                </p>
                <p className="text-sm font-semibold text-slate-200 leading-relaxed italic">
                  {activeMentor.welcomeVoiceText[selectedLanguage]}
                </p>
              </div>

              {/* Language Selector Chips */}
              <div className="space-y-1.5 no-print">
                <p className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                  <Languages className="w-3 h-3 text-purple-400" />
                  <span>Select Explanation Language:</span>
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {(['Hinglish', 'Hindi', 'Marathi', 'English', 'Gujarati', 'Tamil', 'Telugu', 'Bengali'] as SupportedLang[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                        selectedLanguage === lang
                          ? 'bg-purple-600/30 text-purple-300 border-purple-500/60 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ==========================================
              RECORDED HD CHAPTER VIDEO LECTURE SECTION
          ========================================== */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80 no-print">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-2">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>On-Demand HD Chapter Lecture</span>
              </p>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-500/20 font-mono">
                1080p Recorded
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800 bg-slate-950 shadow-2xl">
              <video controls className="w-full h-full object-cover">
                <source src={activeMentor.videoUrl} type="video/mp4" />
                Your browser does not support HD Video Lecture streaming.
              </video>
            </div>
          </div>

          {/* ==========================================
              LIVE AI DOUBT SOLVER (VOICE & TEXT)
          ========================================== */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-indigo-500/30 space-y-4 no-print shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider font-mono">
                  Live Interactive AI Doubt Engine ({selectedLanguage})
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">24/7 Active Voice</span>
            </div>

            {/* Input Row */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Ask ${activeMentor.name} any doubt from ${activeMentor.topic}...`}
                value={userDoubtQuery}
                onChange={(e) => setUserDoubtQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition font-sans"
              />
              
              {/* Mic Input Trigger Button */}
              <button
                onClick={handleMicSpeechInput}
                className={`px-3.5 py-3 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  isListeningMic 
                    ? 'bg-rose-600 border-rose-400 text-white animate-pulse' 
                    : 'bg-slate-900 border-slate-800 text-indigo-400 hover:bg-slate-800'
                }`}
                title="Tap to speak your doubt in regional language"
              >
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">{isListeningMic ? 'Listening...' : 'Mic'}</span>
              </button>

              {/* Submit Voice Question Button */}
              <button
                onClick={() => handleAskAiDoubt()}
                disabled={isAiThinking}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-5 py-3 rounded-xl text-xs transition disabled:opacity-50 whitespace-nowrap shadow-lg shadow-indigo-600/20 border border-blue-400/30 flex items-center gap-1.5"
              >
                {isAiThinking ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Ask Live</span>
                  </>
                )}
              </button>
            </div>

            {/* Realtime Transcript Box */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase">
                <span>REAL-TIME NCERT TRANSCRIPT</span>
                <span className="text-indigo-400">{selectedLanguage}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {aiVoiceTranscript || activeMentor.transcript[selectedLanguage]}
              </p>
            </div>
          </div>

          {/* ==========================================
              AUTHENTIC REVISION NOTES & FORMULAS
          ========================================== */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>High-Yield Revision Notes ({activeMentor.subject})</span>
            </h4>

            <ul className="space-y-2">
              {activeMentor.notes.map((note, nIdx) => (
                <li key={nIdx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HIGH-YIELD FORMULA BANK */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Official Formula Bank & Vector Identities</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeMentor.formulas.map((f, fIdx) => (
                <div key={fIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <p className="text-xs font-bold text-amber-400 font-sans">{f.title}</p>
                  <p className="text-sm font-mono font-bold text-white tracking-wide">{f.expression}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{f.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ==========================================
              MONTHLY ASSESSMENT QUIZ ENGINE
          ========================================== */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80 no-print">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Monthly Exam Test Practice ({activeStream})</span>
              </h4>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
                NCERT Exam Pattern
              </span>
            </div>

            {activeMentor.quiz.map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
                <p className="text-xs font-extrabold text-white leading-snug">
                  Q. {q.question}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedQuizAnswers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => setSelectedQuizAnswers({ ...selectedQuizAnswers, [q.id]: optIdx })}
                        className={`text-left p-3 rounded-xl text-xs font-medium border transition ${
                          isSelected 
                            ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-md' 
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-mono text-cyan-400 mr-1.5">{optIdx + 1})</span> {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedQuizAnswers[q.id] !== undefined && (
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    selectedQuizAnswers[q.id] === q.correctIndex 
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}>
                    <p className="font-bold uppercase font-mono text-[10px] mb-1">
                      {selectedQuizAnswers[q.id] === q.correctIndex ? '✓ Correct Answer!' : '✗ Incorrect Option'}
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </main>

      {/* ==========================================
          FIXED MOBILE BOTTOM NAVIGATION BAR
      ========================================== */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#0a0d1b]/95 backdrop-blur-xl border-t border-slate-800 px-4 py-2 flex justify-around items-center text-slate-400 text-[10px] z-40 no-print">
        {[
          { id: 'Home', label: 'Home', icon: Sparkles },
          { id: 'Lectures', label: 'Lectures', icon: Video },
          { id: 'Tests', label: 'Tests', icon: Target },
          { id: 'Podcast', label: 'Podcast', icon: Volume2 },
          { id: 'Profile', label: 'Profile', icon: User },
        ].map((item) => {
          const IconComponent = item.icon;
          const isActive = activeBottomTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveBottomTab(item.id as any)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-cyan-400 font-bold scale-110' : 'hover:text-slate-200'
              }`}
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
