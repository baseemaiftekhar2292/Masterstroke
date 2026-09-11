'use client';

import { useState } from 'react';

const SYLLABUS = {
  physics: {
    name: "Physics",
    chapters: [
      { id: "phy-1", title: "Chapter 1: Vectors & Physical Quantities", script: "Welcome to Physics Chapter 1. Today we learn about scalars, vectors, and fundamental physical quantities." },
      { id: "phy-2", title: "Chapter 2: Kinematics & Motion", script: "In Chapter 2, we discuss distance, displacement, speed, velocity, and equations of motion." }
    ]
  },
  chemistry: {
    name: "Chemistry",
    chapters: [
      { id: "chem-1", title: "Chapter 1: Mole Concept", script: "Welcome to Chemistry Chapter 1. We cover mole concept, molar mass, and stoichiometry." }
    ]
  },
  botany: {
    name: "Botany",
    chapters: [
      { id: "bot-1", title: "Chapter 1: Cell - The Unit of Life", script: "Welcome to Botany. Today we study cell structure, organelles, and cell functions." }
    ]
  }
};

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<'physics' | 'chemistry' | 'botany'>('physics');
  const [selectedChapter, setSelectedChapter] = useState(SYLLABUS.physics.chapters[0]);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handlePlayAudio = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedChapter.script }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        alert('Audio generate nahi ho paya. OPENAI_API_KEY check karein.');
      }
    } catch (error) {
      alert('Error fetching audio playback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6 min-h-screen bg-black text-white font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-500">Masterstroke AI Portal</h1>
      
      {/* Subject Tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {(Object.keys(SYLLABUS) as Array<keyof typeof SYLLABUS>).map((subjKey) => (
          <button
            key={subjKey}
            onClick={() => {
              setSelectedSubject(subjKey);
              setSelectedChapter(SYLLABUS[subjKey].chapters[0]);
              setAudioUrl(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
              selectedSubject === subjKey ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            {SYLLABUS[subjKey].name}
          </button>
        ))}
      </div>

      {/* Chapter List */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Select Chapter:</h2>
        {SYLLABUS[selectedSubject].chapters.map((chap) => (
          <button
            key={chap.id}
            onClick={() => {
              setSelectedChapter(chap);
              setAudioUrl(null);
            }}
            className={`w-full text-left p-3 rounded-lg border transition ${
              selectedChapter.id === chap.id
                ? 'border-blue-500 bg-gray-900 text-white'
                : 'border-gray-800 bg-black text-gray-400'
            }`}
          >
            {chap.title}
          </button>
        ))}
      </div>

      {/* Dynamic AI Player Box */}
      <div className="border border-gray-800 p-6 rounded-xl bg-gray-900 space-y-4">
        <h3 className="font-bold text-lg">{selectedChapter.title} - AI Audio</h3>
        <p className="text-sm text-gray-400">{selectedChapter.script}</p>
        
        <button
          onClick={handlePlayAudio}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Generating AI Audio...' : 'Play AI Lecture Audio'}
        </button>

        {audioUrl && (
          <audio controls autoPlay className="w-full mt-4">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support audio element.
          </audio>
        )}
      </div>
    </main>
  );
}
