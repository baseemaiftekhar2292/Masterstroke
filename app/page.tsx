
'use client';

import { useState } from 'react';

const SYLLABUS = {
  physics: {
    name: "Physics",
    chapters: [
      { 
        id: "phy-1", 
        title: "Chapter 1: Vectors & Kinematics", 
        script: "Welcome to Physics. Today we learn about vectors and motion.",
        quiz: [
          {
            q: "If a particle moves in a circle of radius R with constant speed v, what is its acceleration?",
            options: ["Zero", "v^2/R towards center", "v^2/R away from center", "v/R"],
            ans: 1,
            exp: "In uniform circular motion, acceleration is centripetal, directed towards the center with magnitude v^2/R."
          },
          {
            q: "A boy walks 3m East and 4m North. His displacement is:",
            options: ["7m", "1m", "5m", "0m"],
            ans: 2,
            exp: "Displacement is the shortest distance. Using Pythagoras theorem: √(3^2 + 4^2) = 5m."
          }
        ]
      }
    ]
  },
  chemistry: {
    name: "Chemistry",
    chapters: [
      { 
        id: "chem-1", 
        title: "Chapter 1: Mole Concept", 
        script: "Welcome to Chemistry. Let's study stoichiometry.",
        quiz: [
          {
            q: "Number of atoms in 12g of C-12 is:",
            options: ["6.022 × 10^23", "12", "1", "6.022 × 10^24"],
            ans: 0,
            exp: "12g of Carbon-12 is exactly 1 mole, which contains Avogadro's number of atoms."
          }
        ]
      }
    ]
  }
};

export default function Home() {
  const [subject, setSubject] = useState<'physics' | 'chemistry'>('physics');
  const [chapter, setChapter] = useState(SYLLABUS.physics.chapters[0]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  
  // Audio State
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handlePlayAudio = async () => {
    setLoadingAudio(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chapter.script }),
      });
      if (res.ok) {
        const blob = await res.blob();
        setAudioUrl(URL.createObjectURL(blob));
      } else alert('API Key check karein.');
    } catch { alert('Error in Audio.'); }
    setLoadingAudio(false);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    answers.forEach((ans, idx) => {
      if (ans === chapter.quiz[idx].ans) score++;
    });
    setQuizScore(score);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8 min-h-screen bg-black text-white font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-500">Masterstroke AI Portal</h1>
      
      {/* Subjects */}
      <div className="flex gap-2 justify-center">
        {(Object.keys(SYLLABUS) as Array<keyof typeof SYLLABUS>).map((s) => (
          <button key={s} onClick={() => { setSubject(s); setChapter(SYLLABUS[s].chapters[0]); setQuizScore(null); setAnswers([]); setAudioUrl(null); }} className={`px-4 py-2 rounded-lg font-medium capitalize ${subject === s ? 'bg-blue-600' : 'bg-gray-800'}`}>{SYLLABUS[s].name}</button>
        ))}
      </div>

      {/* AI Audio Lecture */}
      <div className="border border-gray-800 p-6 rounded-xl bg-gray-900 space-y-4">
        <h3 className="font-bold text-lg">{chapter.title} - AI Lecture</h3>
        <button onClick={handlePlayAudio} disabled={loadingAudio} className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition">
          {loadingAudio ? 'Generating...' : '▶ Play AI Audio Lecture'}
        </button>
        {audioUrl && <audio controls autoPlay className="w-full mt-2"><source src={audioUrl} type="audio/mpeg" /></audio>}
      </div>

      {/* NEET/JEE Interactive Jobsheet */}
      <div className="border border-gray-800 p-6 rounded-xl bg-gray-900 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
          <h3 className="font-bold text-xl text-yellow-500">NEET/JEE Practice Jobsheet</h3>
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold">Timer: 05:00</span>
        </div>

        {chapter.quiz.map((q, qIndex) => (
          <div key={qIndex} className="space-y-3">
            <p className="font-medium text-gray-200">Q{qIndex + 1}. {q.q}</p>
            <div className="space-y-2 pl-4">
              {q.options.map((opt, optIndex) => (
                <button 
                  key={optIndex} 
                  onClick={() => {
                    const newAns = [...answers];
                    newAns[qIndex] = optIndex;
                    setAnswers(newAns);
                  }}
                  className={`block w-full text-left p-3 rounded-md border ${answers[qIndex] === optIndex ? 'bg-blue-600/30 border-blue-500 text-white' : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                  {optIndex + 1}) {opt}
                </button>
              ))}
            </div>
            {quizScore !== null && (
              <div className={`p-4 rounded-md mt-2 ${answers[qIndex] === q.ans ? 'bg-green-900/30 border border-green-500 text-green-300' : 'bg-red-900/30 border border-red-500 text-red-300'}`}>
                <p className="font-bold">{answers[qIndex] === q.ans ? '✅ Correct' : '❌ Incorrect'}</p>
                <p className="text-sm mt-1"><span className="font-semibold text-gray-400">AI Explanation: </span>{q.exp}</p>
              </div>
            )}
          </div>
        ))}

        {quizScore === null ? (
          <button onClick={handleQuizSubmit} disabled={answers.length < chapter.quiz.length} className="w-full bg-blue-600 py-3 rounded-lg font-bold disabled:opacity-50">Submit Final Answers</button>
        ) : (
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <p className="text-2xl font-bold">Score: {quizScore} / {chapter.quiz.length}</p>
          </div>
        )}
      </div>
    </main>
  );
}
