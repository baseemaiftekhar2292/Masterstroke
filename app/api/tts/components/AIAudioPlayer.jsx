'use client';
import { useState } from 'react';

export default function AIAudioPlayer({ textScript }) {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handlePlayAI = async () => {
    if (audioUrl) return;
    setLoading(true);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textScript }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error("TTS Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg border border-gray-800">
      <button 
        onClick={handlePlayAI} 
        disabled={loading}
        className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
      >
        {loading ? 'Generating AI Voice...' : 'Play AI Lecture'}
      </button>

      {audioUrl && (
        <audio controls autoPlay src={audioUrl} className="mt-3 w-full" />
      )}
    </div>
  );
}
