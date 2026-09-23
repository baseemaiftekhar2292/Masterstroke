"use client";

import { useState } from "react";
import {
  Atom,
  BrainCircuit,
  Calculator,
  Camera,
  ChevronRight,
  FlaskConical,
  Headphones,
  ImagePlus,
  LayoutDashboard,
  Menu,
  Mic,
  Send,
  Sparkles,
  Target,
  Trophy,
  BookOpen,
  Clock3,
  Bot,
  X,
  Zap,
} from "lucide-react";

type Exam = "JEE" | "NEET";

type Faculty = {
  name: string;
  subject: string;
  specialty: string;
  avatar: string;
};

const JEE_FACULTY: Faculty[] = [
  {
    name: "Dr. Vikram Varma",
    subject: "Physics",
    specialty: "Mechanics • Electrodynamics • Modern Physics",
    avatar: "VV",
  },
  {
    name: "Ananya Roy",
    subject: "Chemistry",
    specialty: "Organic • Inorganic • Physical Chemistry",
    avatar: "AR",
  },
  {
    name: "Prof. Devraj",
    subject: "Mathematics",
    specialty: "Algebra • Calculus • Coordinate Geometry",
    avatar: "PD",
  },
];

const NEET_FACULTY: Faculty[] = [
  {
    name: "Dr. Vikram Varma",
    subject: "Physics",
    specialty: "Mechanics • Electricity • Modern Physics",
    avatar: "VV",
  },
  {
    name: "Ananya Roy",
    subject: "Chemistry",
    specialty: "Organic • Inorganic • Physical Chemistry",
    avatar: "AR",
  },
  {
    name: "Dr. Ayesha Khan",
    subject: "Biology",
    specialty: "Botany • Zoology • Human Biology",
    avatar: "AK",
  },
];

export default function MasterstrokeV3() {
  const [exam, setExam] = useState<Exam>("JEE");
  const [selectedFaculty, setSelectedFaculty] =
    useState<Faculty>(JEE_FACULTY[0]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [voiceActive, setVoiceActive] = useState(false);

  const faculty =
    exam === "JEE" ? JEE_FACULTY : NEET_FACULTY;

  function changeExam(next: Exam) {
    setExam(next);
    setSelectedFaculty(
      next === "JEE"
        ? JEE_FACULTY[0]
        : NEET_FACULTY[0]
    );
    setAnswer("");
  }

  async function askAI() {
    if (!question.trim() && !image) return;

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
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      const data = await response.json();

      setAnswer(
        data.answer ||
          "No answer was returned by the AI."
      );
    } catch {
      setAnswer(
        "Your AI Faculty is ready, but the AI backend is not connected yet. Connect /api/solve to an AI model to receive real answers."
      );
    }

    setLoading(false);
  }

  function uploadImage(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function voiceInput() {
    const Recognition =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition
        : null;

    if (!Recognition) {
      alert("Voice input is not supported here.");
      return;
    }

    const recognition = new Recognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    setVoiceActive(true);

    recognition.onresult = (event: any) => {
      const text =
        event.results[0][0].transcript;

      setQuestion((old) =>
        old ? `${old} ${text}` : text
      );
    };

    recognition.onend = () => {
      setVoiceActive(false);
    };

    recognition.start();
  }

  function speak() {
    if (!answer) return;

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(answer);

    speech.rate = 0.92;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  return (
    <main className="min-h-screen bg-[#02020a] text-white">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(0, 245, 255, .12),
              transparent 25%
            ),
            radial-gradient(
              circle at 90% 10%,
              rgba(155, 70, 255, .15),
              transparent 28%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(255, 20, 180, .09),
              transparent 35%
            ),
            #02020a;
          font-family: Arial, Helvetica, sans-serif;
        }

        .grid {
          background-image:
            linear-gradient(
              rgba(0, 245, 255, .035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 245, 255, .035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
        }

        .glass {
          background: rgba(8, 8, 22, .72);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,.07);
          box-shadow:
            0 0 35px rgba(0,245,255,.035),
            inset 0 0 30px rgba(140,70,255,.025);
        }

        .neon {
          text-shadow:
            0 0 8px rgba(0,245,255,.8),
            0 0 25px rgba(100,50,255,.45);
        }

        .gradient {
          background:
            linear-gradient(
              90deg,
              #00f6ff,
              #8b5cf6,
              #ff36ca
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .facultyGlow {
          box-shadow:
            0 0 18px rgba(0,245,255,.13),
            inset 0 0 25px rgba(120,70,255,.04);
        }

        .facultyGlow:hover {
          transform: translateY(-2px);
          border-color: rgba(0,245,255,.35);
          box-shadow:
            0 0 28px rgba(0,245,255,.18),
            0 0 55px rgba(130,70,255,.1);
        }

        .facultySelected {
          border-color: rgba(0,245,255,.55) !important;
          box-shadow:
            0 0 25px rgba(0,245,255,.22),
            inset 0 0 25px rgba(0,245,255,.05);
        }

        .glow {
          box-shadow:
            0 0 15px rgba(0,245,255,.2),
            0 0 40px rgba(130,70,255,.1);
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#02020a]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1550px] items-center justify-between px-4 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-white/10 p-2 md:hidden">
              <Menu size={20} />
            </button>

            <div className="glow flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/5">
              <Zap
                size={23}
                className="text-cyan-300"
              />
            </div>

            <div>
              <div className="text-lg font-black tracking-wider">
                MASTER<span className="gradient">STROKE</span>
              </div>

              <div className="text-[8px] tracking-[.4em] text-cyan-300/55">
                QUANTUM AI ACADEMY
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <span className="text-xs text-white/45">
              Dashboard
            </span>

            <span className="text-xs text-white/45">
              CBT Simulator
            </span>

            <span className="text-xs text-white/45">
              Edu-Vault
            </span>

            <span className="text-xs text-white/45">
              Progress
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1.5 text-[9px] font-bold text-green-300 sm:block">
              ● AI ONLINE
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Bot size={18} />
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-screen grid-bg">
        <div className="mx-auto w-full max-w-[1550px] px-4 py-6 md:px-7">

          {/* HERO */}
          <section className="relative mb-6 overflow-hidden rounded-[30px] border border-cyan-300/10 bg-gradient-to-br from-cyan-400/[.07] via-purple-500/[.04] to-pink-500/[.05] p-6 md:p-9">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.3em] text-cyan-300">
                <Sparkles size={14} />
                Artificial Intelligence • Exam Intelligence
              </div>

              <h1 className="text-3xl font-black leading-tight md:text-5xl">
                Master your exam with
                <br />
                <span className="gradient">
                  AI Faculty Intelligence.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
                Ask questions. Upload problems. Speak naturally.
                Your selected AI faculty explains the answer,
                method, concept and exam strategy.
              </p>
            </div>
          </section>

          {/* EXAM SELECTOR */}
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_280px]">
            <div className="glass rounded-3xl p-3">
              <div className="mb-2 px-2 text-[9px] uppercase tracking-[.3em] text-white/30">
                Select Examination
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => changeExam("JEE")}
                  className={`rounded-2xl py-4 text-sm font-black transition ${
                    exam === "JEE"
                      ? "bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/40"
                      : "bg-white/[.025] text-white/35"
                  }`}
                >
                  ⚡ JEE CORE
                </button>

                <button
                  onClick={() => changeExam("NEET")}
                  className={`rounded-2xl py-4 text-sm font-black transition ${
                    exam === "NEET"
                      ? "bg-pink-400/10 text-pink-200 ring-1 ring-pink-300/40"
                      : "bg-white/[.025] text-white/35"
                  }`}
                >
                  🧬 NEET CORE
                </button>
              </div>
            </div>

            <div className="glass flex items-center gap-3 rounded-3xl p-4">
              <div className="rounded-2xl bg-purple-500/10 p-3 text-purple-300">
                <Target size={20} />
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30">
                  Current Mission
                </div>
                <div className="text-sm font-black">
                  {exam} Preparation
                </div>
              </div>
            </div>
          </div>

          {/* AI FACULTY */}
          <section className="glass mb-6 rounded-3xl p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit
                    size={20}
                    className="text-cyan-300"
                  />

                  <h2 className="text-lg font-black">
                    AI FACULTY
                  </h2>
                </div>

                <p className="mt-1 text-[10px] uppercase tracking-[.22em] text-white/25">
                  Choose your virtual master
                </p>
              </div>

              <div className="rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5 text-[9px] font-bold text-cyan-200">
                {faculty.length} FACULTIES ACTIVE
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {faculty.map((person) => (
                <button
                  key={person.name}
                  onClick={() => {
                    setSelectedFaculty(person);
                    setAnswer("");
                  }}
                  className={`facultyGlow rounded-3xl border border-white/7 bg-white/[.025] p-4 text-left transition ${
                    selectedFaculty.name === person.name
                      ? "facultySelected"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 via-purple-500/15 to-pink-500/20 text-sm font-black text-cyan-200">
                      {person.avatar}

                      <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#080816] bg-green-400 shadow-[0_0_10px_#4ade80]" />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-black">
                        {person.name}
                      </div>

                      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300/70">
                        {person.subject}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-[10px] leading-5 text-white/30">
                    {person.specialty}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`text-[9px] font-bold ${
                        selectedFaculty.name ===
                        person.name
                          ? "text-cyan-300"
                          : "text-white/20"
                      }`}
                    >
                      {selectedFaculty.name ===
                      person.name
                        ? "● SELECTED FACULTY"
                        : "SELECT FACULTY"}
                    </span>

                    <ChevronRight
                      size={14}
                      className="text-white/20"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* MAIN */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* CHAT */}
            <section className="glass overflow-hidden rounded-3xl">
              <div className="border-b border-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="glow flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/5">
                      <BrainCircuit
                        size={24}
                        className="text-cyan-300"
                      />
                    </div>

                    <div>
                      <div className="font-black">
                        {selectedFaculty.name}
                      </div>

                      <div className="text-[10px] text-white/30">
                        {selectedFaculty.subject} AI Faculty •{" "}
                        {exam} CORE
                      </div>
                    </div>
                  </div>

                  <div className="hidden rounded-full bg-cyan-300/5 px-3 py-1.5 text-[9px] text-cyan-300 sm:block">
                    DIRECT ANSWER MODE
                  </div>
                </div>
              </div>

              {/* ANSWER */}
              <div className="min-h-[390px] p-5 md:p-7">
                {!answer && !loading ? (
                  <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
                    <div className="glow mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-cyan-300/20 bg-cyan-300/5">
                      <Sparkles
                        size={34}
                        className="text-cyan-300"
                      />
                    </div>

                    <div className="text-xl font-black">
                      Ask{" "}
                      <span className="gradient">
                        {selectedFaculty.name}
                      </span>
                    </div>

                    <p className="mt-2 max-w-md text-sm leading-6 text-white/30">
                      Ask a {selectedFaculty.subject} question
                      and your AI faculty will provide a direct
                      solution.
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-2">
                      {[
                        "Solve step-by-step",
                        "Explain the concept",
                        "Give shortcut method",
                        "Create practice questions",
                      ].map((text) => (
                        <button
                          key={text}
                          onClick={() =>
                            setQuestion(text)
                          }
                          className="rounded-xl border border-white/7 bg-white/[.025] px-4 py-2.5 text-[10px] text-white/40 hover:border-cyan-300/20 hover:text-cyan-200"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {loading && (
                      <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[.03] p-6">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_15px_cyan]" />

                          <div>
                            <div className="text-sm font-bold text-cyan-200">
                              {selectedFaculty.name}
                            </div>

                            <div className="text-[10px] text-white/30">
                              Analysing your {exam} question...
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {answer && (
                      <div className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[.06] via-purple-500/[.04] to-pink-500/[.03] p-6">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <div className="text-[9px] uppercase tracking-[.3em] text-cyan-300">
                              {selectedFaculty.name}
                            </div>

                            <div className="mt-1 text-xs text-white/35">
                              {selectedFaculty.subject} • AI Solution
                            </div>
                          </div>

                          <button
                            onClick={speak}
                            className="rounded-xl border border-white/10 p-2 text-white/40 hover:text-cyan-200"
                          >
                            <Headphones size={17} />
                          </button>
                        </div>

                        <div className="whitespace-pre-wrap text-sm leading-7 text-white/80">
                          {answer}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div className="border-t border-white/5 p-4">
                {image && (
                  <div className="mb-3 flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.03] p-3">
                    <img
                      src={image}
                      alt="Question"
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div className="flex-1 text-xs text-cyan-200">
                      Question image attached
                    </div>

                    <button
                      onClick={() => setImage(null)}
                      className="text-white/40"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                  <textarea
                    value={question}
                    onChange={(e) =>
                      setQuestion(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        askAI();
                      }
                    }}
                    placeholder={`Ask ${selectedFaculty.name} a ${selectedFaculty.subject} question...`}
                    rows={3}
                    className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/20"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <input
                        id="questionImage"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file =
                            e.target.files?.[0];

                          if (file) uploadImage(file);
                        }}
                      />

                      <label
                        htmlFor="questionImage"
                        className="cursor-pointer rounded-xl p-2 text-white/35 hover:bg-white/5 hover:text-cyan-200"
                      >
                        <ImagePlus size={18} />
                      </label>

                      <button
                        onClick={voiceInput}
                        className={`rounded-xl p-2 ${
                          voiceActive
                            ? "bg-pink-400/10 text-pink-300"
                            : "text-white/35 hover:text-cyan-200"
                        }`}
                      >
                        <Mic size={18} />
                      </button>

                      <button className="rounded-xl p-2 text-white/35">
                        <Camera size={18} />
                      </button>
                    </div>

                    <button
                      onClick={askAI}
                      disabled={
                        loading ||
                        (!question.trim() && !image)
                      }
                      className="glow flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 px-5 py-3 text-[10px] font-black text-cyan-100 ring-1 ring-cyan-300/30 disabled:opacity-30"
                    >
                      <Send size={15} />
                      ASK FACULTY
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT DASHBOARD */}
            <aside className="space-y-5">

              <div className="glass rounded-3xl p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Trophy
                    size={18}
                    className="text-yellow-300"
                  />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Student Core
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-black gradient">
                      72%
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-widest text-white/25">
                      Preparation
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-green-300">
                      +8%
                    </div>
                    <div className="text-[9px] text-white/20">
                      weekly
                    </div>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <MiniStat
                    icon={<Clock3 size={14} />}
                    value="18h"
                    label="Study"
                  />

                  <MiniStat
                    icon={<Target size={14} />}
                    value="84%"
                    label="Accuracy"
                  />

                  <MiniStat
                    icon={<MessageCircleIcon />}
                    value="126"
                    label="Solved"
                  />

                  <MiniStat
                    icon={<Trophy size={14} />}
                    value="14"
                    label="Streak"
                  />
                </div>
              </div>

              <div className="glass rounded-3xl p-5">
                <div className="mb-4 text-xs font-black uppercase tracking-widest">
                  Mission Control
                </div>

                <Quick
                  icon={<Target size={17} />}
                  title="CBT Simulator"
                  text="Timed exam mode"
                />

                <Quick
                  icon={<BookOpen size={17} />}
                  title="Edu-Vault"
                  text="Notes & PDFs"
                />

                <Quick
                  icon={<Headphones size={17} />}
                  title="Audio Revise"
                  text="Quick revision"
                />

                <Quick
                  icon={<Camera size={17} />}
                  title="Question Scanner"
                  text="Image → solution"
                />
              </div>

              <div className="rounded-3xl border border-purple-400/15 bg-gradient-to-br from-purple-500/[.09] to-pink-500/[.04] p-5">
                <div className="text-[9px] font-bold uppercase tracking-[.3em] text-purple-300">
                  PREMIUM AI CORE
                </div>

                <div className="mt-2 text-lg font-black">
                  Your preparation,
                  <br />
                  upgraded.
                </div>

                <p className="mt-2 text-xs leading-5 text-white/30">
                  Advanced AI solving, unlimited practice,
                  analytics and exam simulation.
                </p>

                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 py-3 text-[10px] font-black text-cyan-100 ring-1 ring-cyan-300/20">
                  EXPLORE PREMIUM
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[.025] p-3">
      <div className="text-white/30">{icon}</div>
      <div className="mt-2 text-sm font-black">
        {value}
      </div>
      <div className="text-[8px] uppercase tracking-widest text-white/20">
        {label}
      </div>
    </div>
  );
}

function Quick({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[.02] p-3 text-left hover:border-cyan-300/20">
      <div className="rounded-xl bg-purple-400/10 p-2 text-purple-300">
        {icon}
      </div>

      <div className="flex-1">
        <div className="text-xs font-bold">
          {title}
        </div>
        <div className="text-[9px] text-white/20">
          {text}
        </div>
      </div>

      <ChevronRight
        size={14}
        className="text-white/15"
      />
    </button>
  );
}

function MessageCircleIcon() {
  return (
    <div className="text-[14px]">
      💬
    </div>
  );
}
