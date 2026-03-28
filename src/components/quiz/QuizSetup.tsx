import { useState } from "react";
import { GLOSSARY, CATEGORY_META } from "@/data/glossary";
import type { QuizCategory, QuestionCount } from "@/utils/quiz";

type QuizMode = "knowledge" | "champions";

const GLOSSARY_CATEGORIES: { id: QuizCategory; emoji: string }[] = [
  { id: "all",       emoji: "📖" },
  { id: "stats",     emoji: "📊" },
  { id: "mechanics", emoji: "⚙️" },
  { id: "roles",     emoji: "🎭" },
  { id: "economy",   emoji: "💰" },
  { id: "tft",       emoji: "🎮" },
];

const COUNTS: { value: QuestionCount; label: string }[] = [
  { value: 5,     label: "5 questions" },
  { value: 10,    label: "10 questions" },
  { value: 15,    label: "15 questions" },
  { value: "all", label: "All questions" },
];

const CHAMPION_Q_TYPES = [
  { emoji: "🎯", label: "Name the ability" },
  { emoji: "❓", label: "Identify the champion" },
  { emoji: "🎭", label: "Champion role" },
  { emoji: "💰", label: "Champion cost" },
  { emoji: "🌟", label: "Champion traits" },
];

interface QuizSetupProps {
  onStart: (category: QuizCategory, count: QuestionCount) => void;
  championsCount: number;
}

export default function QuizSetup({ onStart, championsCount }: QuizSetupProps) {
  const [mode, setMode]         = useState<QuizMode>("knowledge");
  const [category, setCategory] = useState<QuizCategory>("all");
  const [count, setCount]       = useState<QuestionCount>(10);

  const poolSize =
    mode === "champions"
      ? championsCount
      : category === "all"
      ? GLOSSARY.length
      : GLOSSARY.filter((t) => t.category === category).length;

  const actualCount =
    count === "all" ? poolSize : Math.min(count as number, poolSize);

  function handleStart() {
    onStart(mode === "champions" ? "champions" : category, count);
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="font-heading text-2xl text-text-primary mb-2">
          TFT Knowledge Quiz
        </h2>
        <p className="text-text-secondary text-sm">
          Test what you&apos;ve learned. Four options per question — no tricks, just TFT.
        </p>
      </div>

      {/* Quiz mode switcher */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
          Choose quiz type
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => { setMode("knowledge"); setCategory("all"); }}
            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border text-left transition-all ${
              mode === "knowledge"
                ? "bg-accent-purple/20 border-accent-purple/50 shadow-glow"
                : "bg-bg-surface border-white/10 hover:border-white/25 hover:bg-bg-elevated"
            }`}
          >
            <span className="text-3xl">📖</span>
            <div className="text-center">
              <p className={`text-sm font-semibold ${mode === "knowledge" ? "text-accent-purple-light" : "text-text-primary"}`}>
                TFT Knowledge
              </p>
              <p className="text-xs text-text-muted mt-0.5">Terms & mechanics</p>
            </div>
          </button>

          <button
            onClick={() => { setMode("champions"); }}
            className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border text-left transition-all ${
              mode === "champions"
                ? "bg-accent-gold/15 border-accent-gold/50"
                : "bg-bg-surface border-white/10 hover:border-white/25 hover:bg-bg-elevated"
            }`}
          >
            <span className="text-3xl">🏆</span>
            <div className="text-center">
              <p className={`text-sm font-semibold ${mode === "champions" ? "text-accent-gold" : "text-text-primary"}`}>
                Champions
              </p>
              <p className="text-xs text-text-muted mt-0.5">Abilities, roles & traits</p>
            </div>
          </button>
        </div>
      </div>

      {/* Glossary sub-category picker (only for knowledge mode) */}
      {mode === "knowledge" && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
            Choose a topic
          </p>
          <div className="grid grid-cols-2 gap-2">
            {GLOSSARY_CATEGORIES.map(({ id, emoji }) => {
              const label = id === "all" ? "All Topics" : CATEGORY_META[id as Exclude<typeof id, "all" | "champions">].label;
              const cnt = id === "all"
                ? GLOSSARY.length
                : GLOSSARY.filter((t) => t.category === id).length;
              const active = category === id;
              const color = id === "all" ? "text-text-primary" : CATEGORY_META[id as Exclude<typeof id, "all" | "champions">].color;
              return (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    active
                      ? "bg-accent-purple/20 border-accent-purple/50 shadow-glow"
                      : "bg-bg-surface border-white/10 hover:border-white/25 hover:bg-bg-elevated"
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <div>
                    <p className={`text-sm font-semibold ${active ? color : "text-text-primary"}`}>
                      {label}
                    </p>
                    <p className="text-xs text-text-muted">{cnt} terms</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Champion quiz info (only for champions mode) */}
      {mode === "champions" && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
            What you&apos;ll be tested on
          </p>
          <div className="bg-bg-surface border border-accent-gold/20 rounded-xl p-4">
            <div className="grid grid-cols-1 gap-2">
              {CHAMPION_Q_TYPES.map(({ emoji, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-base">{emoji}</span>
                  <span className="text-sm text-text-secondary">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3 pt-3 border-t border-white/5">
              Questions are randomly drawn from all {championsCount} Set 16 champions.
            </p>
          </div>
        </div>
      )}

      {/* Question count */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
          How many questions?
        </p>
        <div className="flex gap-2 flex-wrap">
          {COUNTS.map(({ value, label }) => {
            const disabled = value !== "all" && (value as number) > poolSize;
            return (
              <button
                key={String(value)}
                onClick={() => !disabled && setCount(value)}
                disabled={disabled}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  count === value
                    ? mode === "champions"
                      ? "bg-accent-gold/15 border-accent-gold/50 text-accent-gold"
                      : "bg-accent-purple/20 border-accent-purple/50 text-accent-purple-light shadow-glow"
                    : disabled
                    ? "border-white/5 text-text-muted cursor-not-allowed opacity-40"
                    : "bg-bg-surface border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        className={`w-full py-4 rounded-xl text-white font-semibold text-base transition-all active:scale-95 ${
          mode === "champions"
            ? "bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg"
            : "bg-accent-purple hover:bg-accent-purple/80 shadow-glow"
        }`}
      >
        {mode === "champions" ? "🏆" : "🚀"} Start Quiz — {actualCount} question{actualCount !== 1 ? "s" : ""}
      </button>
    </div>
  );
}
