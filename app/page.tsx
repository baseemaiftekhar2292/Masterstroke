'use client';

import AIAudioPlayer from '@/components/AIAudioPlayer';

export default function Home() {
  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-center">Masterstroke AI Portal</h1>
      
      <div className="border border-gray-800 p-6 rounded-xl bg-gray-900">
        <h2 className="text-xl font-semibold mb-2">Sample Lecture Audio</h2>
        <p className="text-gray-400 mb-4 text-sm">
          Listen to the AI-generated lecture script for Physics Chapter 1.
        </p>
        <AIAudioPlayer textScript="Welcome to Masterstroke! Today we will learn about Physics vectors and scalars in a very easy language." />
      </div>
    </main>
  );
}
