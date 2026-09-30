"use client";

import React, { useMemo, useState } from "react";

type Exam = "JEE" | "NEET";

type Faculty = {
  name: string;
  subject: string;
  icon: string;
  color: string;
};

const JEE_FACULTY: Faculty[] = [
  { name: "Dr. Vikram Varma", subject: "Physics", icon: "⚡", color: "cyan" },
  { name: "Ananya Roy", subject: "Chemistry", icon: "🧪", color: "pink" },
  { name: "Prof. Devraj", subject: "Mathematics", icon: "∑", color: "purple" },
];

const NEET_FACULTY: Faculty[] = [
  { name: "Dr. Vikram Varma", subject: "Physics", icon: "⚡", color: "cyan" },
  { name: "Ananya Roy", subject: "Chemistry", icon: "🧪", color: "pink" },
  { name: "Dr. Ayesha Khan", subject: "Biology", icon: "🧬", color: "green" },
];

const SUBJECTS = {
  JEE: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
  ],
  NEET: [
    "Physics",
    "Chemistry",
    "Biology",
    "Botany",
    "Zoology",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
  ],
};

export default function MasterstrokeFuturisticApp() {
  const [exam, setExam] = useState<Exam>("JEE");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>(
    JEE_FACULTY[0]
  );

  const [activeTab, setActiveTab] = useState("AI Faculty");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);

  const [roomCode, setRoomCode] = useState("");
  const [createdRoom, setCreatedRoom] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const facultyList = useMemo(
    () => (exam === "JEE" ? JEE_FACULTY : NEET_FACULTY),
    [exam]
  );

  const changeExam = (newExam: Exam) => {
    setExam(newExam);

    const firstFaculty =
      newExam === "JEE" ? JEE_FACULTY[0] : NEET_FACULTY[0];

    setSelectedFaculty(firstFaculty);
    setAnswer("");
  };

  const askAI = async () => {
    if (!question.trim() && !imagePreview) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exam,
          subject: selectedFaculty.subject,
          faculty: selectedFaculty.name,
          question,
          image: imagePreview,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI backend error");
      }

      setAnswer(data.answer || "No answer received.");
    } catch (error) {
      console.error(error);

      setAnswer(
        "⚠️ AI backend is not connected yet. Once the /api/solve backend is deployed and the AI API key is configured, your Masterstroke Faculty will give direct answers here."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const startVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setQuestion((previous) =>
        previous ? `${previous} ${text}` : text
      );
    };

    recognition.start();
  };

  const speakAnswer = () => {
    if (!answer) return;

    const speech = new SpeechSynthesisUtterance(answer);
    speech.lang = "en-IN";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const createStudyRoom = () => {
    const code =
      "MS-" +
      Math.random().toString(36).substring(2, 7).toUpperCase();

    setCreatedRoom(code);
    setRoomCode(code);
  };

  const joinStudyRoom = () => {
    if (!roomCode.trim()) return;

    setCreatedRoom(roomCode.trim().toUpperCase());
  };

  const sendGroupMessage = () => {
    if (!chatMessage.trim()) return;

    setMessages((old) => [...old, chatMessage.trim()]);
    setChatMessage("");
  };

  const navItems = [
    "AI Faculty",
    "Group Study",
    "CBT Simulator",
    "Edu-Vault",
    "Quick Revise",
  ];

  return (
    <main className="min-h-screen bg-[#03040b] text-white overflow-hidden">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 20% 10%, rgba(0, 255, 255, 0.12), transparent 25%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.14), transparent 25%),
            #03040b;
          font-family: Arial, Helvetica, sans-serif;
        }

        .glass {
          background: rgba(10, 15, 30, 0.72);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 40px rgba(0, 255, 255, 0.05),
            inset 0 0 30px rgba(255,255,255,0.02);
        }

        .neon {
          box-shadow:
            0 0 10px rgba(0,255,255,0.45),
            0 0 30px rgba(0,255,255,0.12);
        }

        .neon-purple {
          box-shadow:
            0 0 10px rgba(168,85,247,0.45),
            0 0 30px rgba(168,85,247,0.12);
        }

        .neon-pink {
          box-shadow:
            0 0 10px rgba(236,72,153,0.45),
            0 0 30px rgba(236,72,153,0.12);
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* HEADER */}
      <header className="glass sticky top-0 z-50 border-b border-cyan-400/10">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-4 flex flex-col lg:flex-row gap-4 items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-300/30 flex items-center justify-center neon">
              <span className="text-2xl">⚡</span>
            </div>

            <div>
              <h1 className="font-black text-2xl tracking-wider">
                MASTER<span className="text-cyan-300">STROKE</span>
              </h1>
              <p className="text-[10px] text-slate-500 tracking-[0.3em]">
                AI EXAM INTELLIGENCE
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => changeExam("JEE")}
              className={`px-6 py-2 rounded-xl font-bold border ${
                exam === "JEE"
                  ? "bg-cyan-400 text-black border-cyan-300 neon"
                  : "bg-white/5 border-white/10 text-slate-400"
              }`}
            >
              JEE CORE
            </button>

            <button
              onClick={() => changeExam("NEET")}
              className={`px-6 py-2 rounded-xl font-bold border ${
                exam === "NEET"
                  ? "bg-green-400 text-black border-green-300"
                  : "bg-white/5 border-white/10 text-slate-400"
              }`}
            >
              NEET CORE
            </button>
          </div>

          <button
            onClick={() => setIsSubscriber(!isSubscriber)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-black shadow-lg"
          >
            {isSubscriber ? "✓ PREMIUM ACTIVE" : "SUBSCRIBE ₹229"}
          </button>
        </div>
      </header>

      <div className="grid-bg min-h-[calc(100vh-90px)]">
        <div className="max-w-[1500px] mx-auto p-4 md:p-8">

          {/* HERO */}
          <section className="mb-8">
            <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <p className="text-cyan-300 text-xs tracking-[0.4em] font-bold mb-3">
                  {exam} • NEXT GENERATION PREPARATION
                </p>

                <h2 className="text-3xl md:text-6xl font-black leading-tight max-w-4xl">
                  Your Personal
                  <span className="text-cyan-300"> AI Faculty </span>
                  for Every Question.
                </h2>

                <p className="text-slate-400 mt-4 max-w-2xl">
                  Ask questions, upload problems, practise MCQs and study
                  together with your premium Masterstroke community.
                </p>
              </div>
            </div>
          </section>

          {/* NAVIGATION */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl border text-sm font-bold ${
                  activeTab === item
                    ? "bg-cyan-400 text-black border-cyan-300 neon"
                    : "glass text-slate-400 border-white/10"
                }`}
              >
                {item === "Group Study" ? "👥 " : ""}
                {item}
              </button>
            ))}
          </div>

          {/* AI FACULTY */}
          {activeTab === "AI Faculty" && (
            <section className="grid lg:grid-cols-[350px_1fr] gap-6">

              <div className="glass rounded-3xl p-5">
                <p className="text-xs text-slate-500 tracking-widest mb-4">
                  AI FACULTY
                </p>

                <div className="space-y-3">
                  {facultyList.map((faculty) => (
                    <button
                      key={faculty.name}
                      onClick={() => setSelectedFaculty(faculty)}
                      className={`w-full text-left p-4 rounded-2xl border transition ${
                        selectedFaculty.name === faculty.name
                          ? "bg-cyan-400/10 border-cyan-300/50 neon"
                          : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                          {faculty.icon}
                        </div>

                        <div>
                          <p className="font-bold">{faculty.name}</p>
                          <p className="text-xs text-cyan-300">
                            {faculty.subject}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-xs text-slate-500 mb-3">
                    AVAILABLE SUBJECTS
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS[exam].map((subject) => (
                      <span
                        key={subject}
                        className="text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass rounded-3xl p-5 md:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-500">
                      CURRENT FACULTY
                    </p>
                    <h3 className="text-2xl font-black">
                      {selectedFaculty.icon} {selectedFaculty.name}
                    </h3>
                    <p className="text-cyan-300 text-sm">
                      {selectedFaculty.subject} • {exam}
                    </p>
                  </div>

                  <div className="hidden md:block text-right">
                    <p className="text-xs text-slate-500">STATUS</p>
                    <p className="text-green-400 font-bold">● ONLINE</p>
                  </div>
                </div>

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`Ask ${selectedFaculty.name} anything about ${selectedFaculty.subject}...`}
                  className="w-full min-h-[180px] resize-none rounded-2xl bg-black/30 border border-white/10 p-5 outline-none focus:border-cyan-400/60 text-white placeholder:text-slate-600"
                />

                {imagePreview && (
                  <div className="mt-4 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Question preview"
                      className="max-h-40 rounded-xl border border-cyan-400/30"
                    />

                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full w-7 h-7"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-4">
                  <label className="cursor-pointer px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40">
                    📷 Upload Question
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>

                  <button
                    onClick={startVoice}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    🎤 Voice
                  </button>

                  <button
                    onClick={askAI}
                    disabled={loading}
                    className="ml-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black neon"
                  >
                    {loading ? "THINKING..." : "⚡ ASK AI"}
                  </button>
                </div>

                {answer && (
                  <div className="mt-6 rounded-2xl bg-black/40 border border-cyan-400/20 p-5">
                    <div className="flex justify-between gap-3 mb-4">
                      <h4 className="font-black text-cyan-300">
                        AI SOLUTION
                      </h4>

                      <button
                        onClick={speakAnswer}
                        className="px-3 py-2 rounded-lg bg-white/5 text-sm"
                      >
                        🔊 Read
                      </button>
                    </div>

                    <div className="whitespace-pre-wrap text-slate-200 leading-7">
                      {answer}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* GROUP STUDY */}
          {activeTab === "Group Study" && (
            <section className="relative">
              {!isSubscriber ? (
                <div className="glass rounded-3xl p-10 text-center max-w-3xl mx-auto">
                  <div className="text-6xl mb-5">🔐</div>

                  <p className="text-purple-300 text-xs tracking-[0.3em] font-bold">
                    PREMIUM FEATURE
                  </p>

                  <h2 className="text-3xl md:text-5xl font-black mt-3">
                    GROUP STUDY
                  </h2>

                  <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                    Study with your friends, share doubts, solve MCQs and
                    practise together inside private Masterstroke rooms.
                  </p>

                  <button
                    onClick={() => setIsSubscriber(true)}
                    className="mt-7 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-black neon-purple"
                  >
                    🔓 UNLOCK WITH ₹229
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[380px_1fr] gap-6">

                  <div className="glass rounded-3xl p-6">
                    <p className="text-xs tracking-widest text-purple-300 font-bold">
                      PREMIUM GROUP STUDY
                    </p>

                    <h2 className="text-3xl font-black mt-2">
                      Study Together
                    </h2>

                    <p className="text-slate-500 text-sm mt-2">
                      Create a private room or join your friends.
                    </p>

                    <button
                      onClick={createStudyRoom}
                      className="w-full mt-7 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-black"
                    >
                      ＋ CREATE STUDY ROOM
                    </button>

                    <div className="my-5 h-px bg-white/10" />

                    <input
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value)}
                      placeholder="Enter room code"
                      className="w-full rounded-xl bg-black/30 border border-white/10 p-4 outline-none focus:border-purple-400"
                    />

                    <button
                      onClick={joinStudyRoom}
                      className="w-full mt-3 py-3 rounded-xl bg-white/5 border border-white/10 font-bold"
                    >
                      JOIN ROOM
                    </button>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="rounded-xl bg-white/5 p-4">
                        <p className="text-2xl">👥</p>
                        <p className="text-xs text-slate-500 mt-2">
                          PRIVATE ROOMS
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/5 p-4">
                        <p className="text-2xl">🏆</p>
                        <p className="text-xs text-slate-500 mt-2">
                          GROUP QUIZ
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-3xl p-6 min-h-[500px]">
                    {createdRoom ? (
                      <>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                          <div>
                            <p className="text-xs text-slate-500">
                              ACTIVE STUDY ROOM
                            </p>
                            <h3 className="text-2xl font-black">
                              Room {createdRoom}
                            </h3>
                          </div>

                          <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-lg bg-white/5">
                              🧠 Quiz
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-white/5">
                              ⏱ Focus
                            </button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-3 my-5">
                          <div className="rounded-xl bg-cyan-400/5 border border-cyan-400/10 p-4">
                            <p className="text-2xl">👤</p>
                            <p className="font-bold mt-2">You</p>
                            <p className="text-xs text-green-400">
                              Online
                            </p>
                          </div>

                          <div className="rounded-xl bg-white/5 p-4">
                            <p className="text-2xl">👥</p>
                            <p className="font-bold mt-2">Study Members</p>
                            <p className="text-xs text-slate-500">
                              Invite friends
                            </p>
                          </div>

                          <div className="rounded-xl bg-purple-400/5 border border-purple-400/10 p-4">
                            <p className="text-2xl">🤖</p>
                            <p className="font-bold mt-2">AI Faculty</p>
                            <p className="text-xs text-purple-300">
                              Available
                            </p>
                          </div>
                        </div>

                        <div className="h-64 rounded-2xl bg-black/30 border border-white/5 p-4 overflow-y-auto">
                          {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center text-slate-600">
                              <div>
                                <div className="text-4xl mb-3">💬</div>
                                <p>Start your group discussion.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {messages.map((message, index) => (
                                <div
                                  key={index}
                                  className="bg-cyan-400/10 border border-cyan-400/10 rounded-xl p-3"
                                >
                                  <p className="text-xs text-cyan-300">
                                    You
                                  </p>
                                  <p className="mt-1">{message}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <input
                            value={chatMessage}
                            onChange={(e) =>
                              setChatMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") sendGroupMessage();
                            }}
                            placeholder="Discuss a question with your group..."
                            className="flex-1 rounded-xl bg-black/30 border border-white/10 px-4 outline-none focus:border-cyan-400/40"
                          />

                          <button
                            onClick={sendGroupMessage}
                            className="px-5 rounded-xl bg-cyan-400 text-black font-black"
                          >
                            SEND
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-600 mt-3">
                          Real-time multi-user chat will be connected to the
                          Masterstroke backend/Supabase in the next stage.
                        </p>
                      </>
                    ) : (
                      <div className="h-full min-h-[450px] flex items-center justify-center text-center">
                        <div>
                          <div className="text-6xl mb-5">🚀</div>
                          <h3 className="text-3xl font-black">
                            Your Study Command Center
                          </h3>
                          <p className="text-slate-500 mt-3">
                            Create or join a private room to begin.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* CBT */}
          {activeTab === "CBT Simulator" && (
            <FeaturePanel
              icon="📝"
              title="CBT Exam Simulator"
              description="Full computer-based practice environment for JEE and NEET style questions."
              items={[
                "Timed mock tests",
                "Negative marking",
                "Question palette",
                "Performance analysis",
                "Subject-wise reports",
                "Difficulty tracking",
              ]}
            />
          )}

          {/* EDU VAULT */}
          {activeTab === "Edu-Vault" && (
            <FeaturePanel
              icon="📚"
              title="Edu-Vault"
              description="Your central study library for notes, formulas and revision material."
              items={[
                "Physics formula sheets",
                "Chemistry reactions",
                "Mathematics shortcuts",
                "Biology NCERT revision",
                "Chapter notes",
                "PDF study material",
              ]}
            />
          )}

          {/* QUICK REVISE */}
          {activeTab === "Quick Revise" && (
            <FeaturePanel
              icon="🎧"
              title="Quick Audio Revise"
              description="Fast revision tools for students who want to revise while travelling or relaxing."
              items={[
                "Formula revision",
                "Concept summaries",
                "Chemistry reactions",
                "Biology facts",
                "Rapid MCQ revision",
                "AI read-aloud",
              ]}
            />
          )}

          {/* FOOTER */}
          <footer className="text-center py-12 text-slate-600 text-xs">
            <p className="font-bold tracking-[0.3em]">
              MASTERSTROKE AI
            </p>
            <p className="mt-2">
              JEE • NEET • AI FACULTY • GROUP STUDY
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

function FeaturePanel({
  icon,
  title,
  description,
  items,
}: {
  icon: string;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <section className="glass rounded-3xl p-8 md:p-12">
      <div className="max-w-4xl">
        <div className="text-6xl mb-5">{icon}</div>

        <p className="text-cyan-300 text-xs tracking-[0.3em] font-bold">
          MASTERSTROKE MODULE
        </p>

        <h2 className="text-4xl md:text-6xl font-black mt-3">
          {title}
        </h2>

        <p className="text-slate-400 text-lg mt-4 max-w-2xl">
          {description}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-5"
            >
              <div className="text-cyan-300 text-xl">✦</div>
              <p className="font-bold mt-3">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
