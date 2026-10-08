'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CreditCard,
  Volume2,
  Mic,
  Send,
  Globe,
  Download,
  Printer,
  Play,
  CheckCircle,
  BookOpen,
  Users,
  User,
  LayoutDashboard,
  FileCheck,
  Headphones,
  MessageSquare,
  BarChart3,
  Plus,
  ShieldCheck,
  CheckSquare,
  Clock,
  Compass,
  Zap,
  Layers,
  Eye,
  X
} from 'lucide-react';

export default function Home() {
  const [inputQuestion, setInputQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!inputQuestion.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: inputQuestion }),
      });

      const data = await res.json();
      setAiResponse(data.answer || 'Error fetching response.');
    } catch (err) {
      setAiResponse('Backend connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Zap className="text-cyan-400" />
          <h1 className="text-xl font-bold tracking-wider">
            MASTERSTROKE <span className="text-xs text-cyan-400 block font-normal">QUANTUM AI ACADEMY</span>
          </h1>
        </div>
        <nav className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="text-white">Dashboard</a>
          <a href="#">CBT Simulator</a>
          <a href="#">Edu-Vault</a>
          <a href="#">Progress</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-cyan-400 font-semibold text-sm">DR. VIKRAM VARMA</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Physics AI Solution</span>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/80 min-h-[150px] text-slate-300 whitespace-pre-wrap">
              {loading ? (
                <p className="text-cyan-400 animate-pulse">Analyzing question with Gemini AI Faculty...</p>
              ) : (
                <p>{aiResponse || 'Your AI Faculty is ready. Ask any JEE/NEET physics question below!'}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? 'Solving...' : 'ASK FACULTY'}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">Preparation Score</h2>
          <div className="text-4xl font-extrabold text-cyan-400 mb-2">72%</div>
          <p className="text-xs text-slate-400">Keep practicing daily to reach 90%+</p>
        </div>
      </main>
    </div>
  );
}
