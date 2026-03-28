import { useState } from "react";
import { GLOSSARY, CATEGORY_META } from "@/data/glossary";
import type { QuizCategory, QuestionCount } from "@/utils/quiz";

const CATEGORIES: { id: QuizCategory; emoji: string }[] = [
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

interface QuizSetupProps {
  onStart: (category: QuizCategory, count: QuestionCount) => void;
}

export default function QuizSetup({ onStart }: QuizSetupProps) {
  const [category, setCategory] = useState<QuizCategory>("all");
  const [count, setCount]       = useState<QuestionCount>(10);

  const poolSize =
    category === "all"
      ? GLOSSARY.length
      : GLOSSARY.filter((t) => t.category === category).length;

  const actualCount =
    count === "all" ? poolSize : Math.min(count as number, poolSize);

  return (
    <div className="max-w-xl mx-auto">
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

      {/* Category picker */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
          Choose a topic
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map(({ id, emoji }) => {
            const label = id === "all" ? "All Topics" : CATEGORY_META[id].label;
            const count = id === "all"
              ? GLOSSARY.length
              : GLOSSARY.filter((t) => t.category === id).length;
            const active = category === id;
            const color  = id === "all" ? "text-text-primary" : CATEGORY_META[id].color;
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
                  <p className="text-xs text-text-muted">{count} terms</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

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
                    ? "bg-accent-purple/20 border-accent-purple/50 text-accent-purple-light shadow-glow"
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
        onClick={() => onStart(category, count)}
        className="w-full py-4 rounded-xl bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold text-base transition-all shadow-glow hover:shadow-glow active:scale-95"
      >
        Start Quiz — {actualCount} question{actualCount !== 1 ? "s" : ""} 🚀
      </button>
    </div>
  );
}
