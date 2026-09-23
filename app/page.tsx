"use client";

import React, { useRef, useState } from "react";
import {
  Atom,
  BrainCircuit,
  Calculator,
  Camera,
  ChevronRight,
  CircleUserRound,
  FlaskConical,
  Headphones,
  ImagePlus,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Mic,
  Paperclip,
  Play,
  Send,
  Sparkles,
  Trophy,
  Upload,
  X,
  Zap,
  BookOpen,
  Clock3,
  Target,
  Bot,
} from "lucide-react";

type Exam = "JEE" | "NEET";

type Subject =
  | "Physics"
  | "Chemistry"
  | "Mathematics"
  | "Biology"
  | "Botany"
  | "Zoology";

const JEE_SUBJECTS: Subject[] = [
  "Physics",
  "Chemistry",
  "Mathematics",
];

const NEET_SUBJECTS: Subject[] = [
  "Physics",
  "Chemistry",
  "Biology",
];

const subjectIcon: Record<Subject, React.ReactNode> = {
  Physics: <Atom size={18} />,
  Chemistry: <FlaskConical size={18} />,
  Mathematics: <Calculator size={18} />,
  Biology: <BrainCircuit size={18} />,
  Botany: <BookOpen size={18} />,
  Zoology: <Bot size={18} />,
};

export default function MasterstrokeV2() {
  const [exam, setExam] = useState<Exam>("JEE");
  const [subject, setSubject] = useState<Subject>("Physics");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const subjects =
    exam === "JEE" ? JEE_SUBJECTS : NEET_SUBJECTS;

  function changeExam(nextExam: Exam) {
    setExam(nextExam);
    setSubject(nextExam === "JEE" ? "Physics" : "Physics");
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
          subject,
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
          "The AI returned no answer. Please try the question again."
      );
    } catch {
      setAnswer(
        "AI connection is not configured yet. Connect your /api/solve endpoint to an AI model to enable real-time JEE/NEET answers."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleImage(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function startVoice() {
    const SpeechRecognition =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    setVoiceActive(true);

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[0][0].transcript;

      setQuestion((old) =>
        old ? `${old} ${transcript}` : transcript
      );
    };

    recognition.onend = () => {
      setVoiceActive(false);
    };

    recognition.start();
  }

  function speakAnswer() {
    if (!answer || typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(answer);
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#03020a] text-white">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 20% 10%, rgba(0, 255, 255, .13), transparent 28%),
            radial-gradient(circle at 80% 15%, rgba(145, 0, 255, .16), transparent 30%),
            radial-gradient(circle at 50% 90%, rgba(255, 0, 153, .08), transparent 35%),
            #03020a;
          font-family: Inter, Arial, sans-serif;
        }

        .neon-border {
          border: 1px solid rgba(0, 240, 255, .22);
          box-shadow:
            0 0 20px rgba(0, 240, 255, .06),
            inset 0 0 25px rgba(130, 0, 255, .035);
        }

        .glass {
          background: rgba(10, 10, 25, .68);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .neon-text {
          text-shadow:
            0 0 8px rgba(0, 240, 255, .8),
            0 0 25px rgba(120, 0, 255, .5);
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #00f6ff,
            #7c5cff,
            #ff35c9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .grid-bg {
          background-image:
            linear-gradient(
              rgba(0, 240, 255, .035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 240, 255, .035) 1px,
              transparent 1px
            );
          background-size: 45px 45px;
        }

        .glow-button {
          transition: all .2s ease;
        }

        .glow-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 0 18px rgba(0, 240, 255, .3),
            0 0 35px rgba(125, 70, 255, .2);
        }

        .scanline {
          position: relative;
          overflow: hidden;
        }

        .scanline:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 246, 255, .12);
          animation: scan 5s linear infinite;
        }

        @keyframes scan {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .55;
          }
          50% {
            opacity: 1;
          }
        }

        .pulse-glow {
          animation: pulseGlow 2.4s infinite;
        }
      `}</style>

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#03020a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-white/10 p-2 md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Menu size={20} />
            </button>

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/5">
              <Zap
                className="text-cyan-300 pulse-glow"
                size={23}
              />
              <span className="absolute inset-0 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,.25)]" />
            </div>

            <div>
              <div className="text-lg font-black tracking-wider">
                MASTER<span className="gradient-text">STROKE</span>
              </div>
              <div className="text-[9px] tracking-[.35em] text-cyan-300/60">
                AI LEARNING CORE
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-xl px-4 py-2 text-sm text-white/60 hover:bg-white/5">
              <LayoutDashboard className="mr-2 inline" size={16} />
              Dashboard
            </button>

            <button className="rounded-xl px-4 py-2 text-sm text-white/60 hover:bg-white/5">
              <Trophy className="mr-2 inline" size={16} />
              Progress
            </button>

            <button className="rounded-xl px-4 py-2 text-sm text-white/60 hover:bg-white/5">
              <BookOpen className="mr-2 inline" size={16} />
              Study Vault
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 text-xs text-cyan-200 sm:block">
              AI ONLINE
            </div>

            <CircleUserRound
              className="text-white/70"
              size={28}
            />
          </div>
        </div>
      </header>

      <div className="grid-bg min-h-[calc(100vh-73px)]">
        <div className="mx-auto max-w-[1500px] px-4 py-6 md:px-7">
          {/* HERO */}
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-cyan-300/10 bg-gradient-to-br from-cyan-500/[.06] via-purple-500/[.04] to-pink-500/[.05] p-6 md:p-9">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
                <Sparkles size={15} />
                Next Generation Exam Intelligence
              </div>

              <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Your AI Faculty.
                <br />
                <span className="gradient-text">
                  Your Complete Preparation Core.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                Ask any JEE or NEET question. Get a direct answer,
                detailed reasoning, formulas, concepts and exam-focused
                explanations from one intelligent learning interface.
              </p>
            </div>
          </section>

          {/* EXAM SWITCH */}
          <section className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="glass neon-border rounded-2xl p-3">
              <div className="mb-2 px-2 text-[10px] uppercase tracking-[.3em] text-white/35">
                Examination Core
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(["JEE", "NEET"] as Exam[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => changeExam(item)}
                    className={`glow-button rounded-xl px-5 py-3 text-sm font-black ${
                      exam === item
                        ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-200 ring-1 ring-cyan-300/40"
                        : "bg-white/[.025] text-white/40"
                    }`}
                  >
                    {item === "JEE"
                      ? "JEE CORE"
                      : "NEET CORE"}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass neon-border flex items-center gap-3 rounded-2xl px-5 py-4">
              <div className="rounded-xl bg-purple-500/10 p-2">
                <Target className="text-purple-300" size={20} />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/35">
                  Target
                </div>
                <div className="text-sm font-bold">
                  {exam === "JEE"
                    ? "Engineering Entrance"
                    : "Medical Entrance"}
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
            {/* LEFT SUBJECT PANEL */}
            <aside className="glass neon-border h-fit rounded-3xl p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[.2em] text-white/45">
                  Subjects
                </span>
                <span className="rounded-full bg-cyan-300/10 px-2 py-1 text-[9px] text-cyan-200">
                  {subjects.length} ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {subjects.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSubject(item)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                      subject === item
                        ? "bg-gradient-to-r from-cyan-400/15 to-purple-500/10 text-cyan-200 ring-1 ring-cyan-300/25"
                        : "text-white/45 hover:bg-white/[.035]"
                    }`}
                  >
                    <span
                      className={
                        subject === item
                          ? "text-cyan-300"
                          : "text-white/35"
                      }
                    >
                      {subjectIcon[item]}
                    </span>

                    <span className="flex-1 text-sm font-semibold">
                      {item}
                    </span>

                    {subject === item && (
                      <ChevronRight
                        size={15}
                        className="text-cyan-300"
                      />
                    )}
                  </button>
                ))}
              </div>

              {exam === "NEET" && (
                <div className="mt-5 rounded-2xl border border-pink-300/10 bg-pink-400/[.03] p-4">
                  <div className="text-[10px] uppercase tracking-widest text-pink-300/70">
                    Biology Core
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(["Botany", "Zoology"] as Subject[]).map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setSubject(item)}
                          className={`rounded-xl border px-2 py-2 text-xs ${
                            subject === item
                              ? "border-pink-300/40 bg-pink-300/10 text-pink-200"
                              : "border-white/5 text-white/35"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </aside>

            {/* MAIN AI */}
            <section className="min-w-0">
              <div className="glass neon-border scanline rounded-3xl">
                {/* AI HEADER */}
                <div className="flex items-center justify-between border-b border-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                      <BrainCircuit
                        className="text-cyan-300"
                        size={24}
                      />
                      <span className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,.2)]" />
                    </div>

                    <div>
                      <div className="font-bold">
                        Masterstroke AI Faculty
                      </div>
                      <div className="text-[11px] text-white/35">
                        {exam} • {subject} • Direct Answer Mode
                      </div>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 text-[10px] text-green-300 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
                    READY
                  </div>
                </div>

                {/* ANSWER AREA */}
                <div className="min-h-[420px] p-5 md:p-7">
                  {!answer && !loading ? (
                    <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-cyan-300/20 bg-cyan-300/5">
                        <Sparkles
                          className="text-cyan-300"
                          size={34}
                        />
                      </div>

                      <h2 className="text-xl font-black">
                        Ask anything in {subject}
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                        Type a question, speak it, or upload a
                        question image. The AI will generate the
                        answer and explanation.
                      </p>

                      <div className="mt-7 grid w-full max-w-xl gap-2 sm:grid-cols-2">
                        {[
                          "Solve this question step by step",
                          "Explain this concept simply",
                          "Give the fastest exam method",
                          "Create 5 practice questions",
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => setQuestion(prompt)}
                            className="rounded-xl border border-white/5 bg-white/[.025] px-4 py-3 text-left text-xs text-white/45 transition hover:border-cyan-300/20 hover:text-cyan-200"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {loading && (
                        <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[.03] p-5">
                          <div className="flex items-center gap-3">
                            <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_15px_cyan]" />
                            <span className="text-sm text-cyan-200">
                              Masterstroke AI is solving...
                            </span>
                          </div>

                          <div className="mt-5 space-y-2">
                            <div className="h-2 animate-pulse rounded bg-white/5" />
                            <div className="h-2 w-4/5 animate-pulse rounded bg-white/5" />
                            <div className="h-2 w-3/5 animate-pulse rounded bg-white/5" />
                          </div>
                        </div>
                      )}

                      {answer && (
                        <div className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[.06] to-purple-500/[.04] p-5 md:p-7">
                          <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">
                              <Zap size={14} />
                              AI Solution
                            </div>

                            <button
                              onClick={speakAnswer}
                              className="rounded-xl border border-white/10 p-2 text-white/50 hover:text-cyan-200"
                              title="Read answer aloud"
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
                <div className="border-t border-white/5 p-4 md:p-5">
                  {image && (
                    <div className="mb-3 flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.03] p-3">
                      <img
                        src={image}
                        alt="Question preview"
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <div className="text-xs font-bold text-cyan-200">
                          Question image attached
                        </div>
                        <div className="text-[10px] text-white/30">
                          AI will analyze the uploaded question.
                        </div>
                      </div>

                      <button
                        onClick={() => setImage(null)}
                        className="rounded-lg p-2 text-white/40 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-2 focus-within:border-cyan-300/30">
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
                      placeholder={`Ask your ${subject} question...`}
                      rows={3}
                      className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/20"
                    />

                    <div className="flex items-center justify-between px-2 pb-1">
                      <div className="flex items-center gap-1">
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file =
                              e.target.files?.[0];

                            if (file) handleImage(file);
                          }}
                        />

                        <button
                          onClick={() =>
                            fileRef.current?.click()
                          }
                          className="rounded-xl p-2 text-white/35 hover:bg-white/5 hover:text-cyan-200"
                          title="Upload question image"
                        >
                          <ImagePlus size={18} />
                        </button>

                        <button
                          onClick={startVoice}
                          className={`rounded-xl p-2 ${
                            voiceActive
                              ? "bg-pink-400/10 text-pink-300"
                              : "text-white/35 hover:bg-white/5 hover:text-cyan-200"
                          }`}
                          title="Voice question"
                        >
                          <Mic size={18} />
                        </button>

                        <button className="hidden rounded-xl p-2 text-white/35 hover:bg-white/5 sm:block">
                          <Paperclip size={18} />
                        </button>
                      </div>

                      <button
                        onClick={askAI}
                        disabled={
                          loading ||
                          (!question.trim() && !image)
                        }
                        className="glow-button flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 px-5 py-2.5 text-xs font-black text-cyan-100 ring-1 ring-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Send size={15} />
                        ASK AI
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-center text-[9px] text-white/20">
                    Enter to send • Shift + Enter for new line
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT PANEL */}
            <aside className="space-y-5">
              <div className="glass neon-border rounded-3xl p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Trophy
                    className="text-yellow-300"
                    size={18}
                  />
                  <span className="text-xs font-black uppercase tracking-[.2em]">
                    Student Core
                  </span>
                </div>

                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-black">
                      72%
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30">
                      Preparation
                    </div>
                  </div>

                  <div className="text-right text-xs text-cyan-300">
                    +8%
                    <div className="text-[9px] text-white/25">
                      this week
                    </div>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(0,240,255,.35)]" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Stat
                    icon={<Clock3 size={15} />}
                    value="18h"
                    label="Study"
                  />
                  <Stat
                    icon={<Target size={15} />}
                    value="84%"
                    label="Accuracy"
                  />
                  <Stat
                    icon={<MessageCircle size={15} />}
                    value="126"
                    label="Solved"
                  />
                  <Stat
                    icon={<Trophy size={15} />}
                    value="14"
                    label="Streak"
                  />
                </div>
              </div>

              <div className="glass neon-border rounded-3xl p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Play
                    className="text-purple-300"
                    size={17}
                  />
                  <span className="text-xs font-black uppercase tracking-[.2em]">
                    Quick Launch
                  </span>
                </div>

                <div className="space-y-2">
                  <QuickAction
                    icon={<Target size={17} />}
                    title="CBT Simulator"
                    subtitle="Timed exam"
                  />

                  <QuickAction
                    icon={<BookOpen size={17} />}
                    title="Revision Vault"
                    subtitle="Notes & PDFs"
                  />

                  <QuickAction
                    icon={<Headphones size={17} />}
                    title="Audio Revision"
                    subtitle="Learn on the go"
                  />

                  <QuickAction
                    icon={<Camera size={17} />}
                    title="Scan Question"
                    subtitle="Image → solution"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-pink-300/10 bg-gradient-to-br from-pink-500/[.07] to-purple-500/[.04] p-5">
                <div className="text-[10px] font-bold uppercase tracking-[.25em] text-pink-300">
                  Masterstroke Premium
                </div>

                <div className="mt-2 text-lg font-black">
                  Unlock the complete AI Core
                </div>

                <div className="mt-2 text-xs leading-5 text-white/35">
                  Unlimited AI questions, advanced practice,
                  analytics and exam simulations.
                </div>

                <button className="glow-button mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 py-3 text-xs font-black text-cyan-100 ring-1 ring-cyan-300/20">
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

function Stat({
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
      <div className="mb-2 text-white/35">{icon}</div>
      <div className="text-sm font-black">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-white/25">
        {label}
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[.02] p-3 text-left transition hover:border-cyan-300/20 hover:bg-cyan-300/[.03]">
      <div className="rounded-xl bg-purple-500/10 p-2 text-purple-300">
        {icon}
      </div>

      <div className="flex-1">
        <div className="text-xs font-bold">
          {title}
        </div>
        <div className="text-[9px] text-white/25">
          {subtitle}
        </div>
      </div>

      <ChevronRight
        size={14}
        className="text-white/20"
      />
    </button>
  );
}
