import { useState } from "react";
import type { QuizQuestion } from "@/utils/quiz";

interface QuizQuestionProps {
  question: QuizQuestion;
  index: number;
  total: number;
  streak: number;
  onAnswer: (chosen: string) => void;
}

type AnswerState = "idle" | "correct" | "wrong";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuizQuestionCard({
  question,
  index,
  total,
  streak,
  onAnswer,
}: QuizQuestionProps) {
  const [chosen, setChosen]     = useState<string | null>(null);
  const [state, setState]       = useState<AnswerState>("idle");
  const [hintOpen, setHintOpen] = useState(false);

  const progress = (index / total) * 100;
  const isChampionQ  = question.term.category === "champions";
  const isEmblemQ    = question.term.category === "emblem_quiz";

  function handleSelect(option: string) {
    if (state !== "idle") return;
    setChosen(option);
    const correct = option === question.correctAnswer;
    setState(correct ? "correct" : "wrong");
    setTimeout(() => onAnswer(option), 900);
  }

  function optionStyle(option: string): string {
    const base =
      "w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center gap-3";
    if (state === "idle")
      return `${base} bg-bg-surface border-white/10 text-text-primary hover:border-accent-purple/50 hover:bg-accent-purple/10 active:scale-[0.99] cursor-pointer`;
    if (option === question.correctAnswer)
      return `${base} bg-green-500/15 border-green-500/60 text-green-300`;
    if (option === chosen && state === "wrong")
      return `${base} bg-red-500/15 border-red-500/60 text-red-300`;
    return `${base} bg-bg-surface border-white/5 text-text-muted opacity-50`;
  }

  function optionIcon(option: string, idx: number): React.ReactNode {
    if (state === "idle")
      return (
        <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-text-muted shrink-0">
          {OPTION_LABELS[idx]}
        </span>
      );
    if (option === question.correctAnswer)
      return <span className="text-green-400 text-lg shrink-0">✓</span>;
    if (option === chosen && state === "wrong")
      return <span className="text-red-400 text-lg shrink-0">✗</span>;
    return (
      <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs text-text-muted shrink-0">
        {OPTION_LABELS[idx]}
      </span>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Top bar: progress + streak */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>Question {index + 1} of {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isChampionQ ? "bg-accent-gold" : isEmblemQ ? "bg-indigo-500" : "bg-accent-purple"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {streak >= 2 && (
          <div className="flex items-center gap-1 bg-accent-gold/10 border border-accent-gold/30 px-3 py-1 rounded-full shrink-0">
            <span className="text-sm">🔥</span>
            <span className="text-accent-gold text-sm font-bold">{streak}</span>
          </div>
        )}
      </div>

      {/* Question card */}
      <div className={`border rounded-2xl p-7 mb-5 animate-slide-up ${
        isChampionQ
          ? "bg-bg-surface border-accent-gold/20"
          : isEmblemQ
          ? "bg-bg-surface border-indigo-500/25"
          : "bg-bg-surface border-white/10"
      }`}>

        {/* Icon / portrait */}
        {question.term.image && (
          <div className="flex justify-center mb-5">
            {isEmblemQ ? (
              /* Emblem: large icon, no badge — the icon IS the question */
              <div
                className="w-28 h-28 rounded-2xl bg-bg-elevated border-2 border-indigo-500/40 shadow-lg shadow-indigo-500/20 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={question.term.image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span style="font-size:3rem">💠</span>`;
                    }
                  }}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={question.term.image}
                  alt={question.term.term}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-bg-base border border-white/20 flex items-center justify-center text-xs leading-none">
                  {question.term.emoji}
                </div>
              </div>
            )}
          </div>
        )}

        <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
          isChampionQ ? "text-accent-gold/70" : "text-text-muted"
        }`}>
          {question.promptLabel}
        </p>
        <p className="font-heading text-xl text-text-primary leading-snug">
          {question.prompt}
        </p>

        {/* Category tag */}
        <div className="mt-3 flex items-center gap-2">
          {!question.term.image && (
            <span className="text-lg">{question.term.emoji}</span>
          )}
          <span className={`text-xs capitalize ${isChampionQ ? "text-accent-gold/60" : isEmblemQ ? "text-indigo-400/70" : "text-text-muted"}`}>
            {question.term.category === "tft"
              ? "TFT Basics"
              : question.term.category === "champions"
              ? "Champions"
              : question.term.category === "emblem_quiz"
              ? "Emblems"
              : question.term.category === "trait_quiz"
              ? "Traits"
              : question.term.category}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2.5 mb-5">
        {question.options.map((option, idx) => (
          <button
            key={option}
            className={optionStyle(option)}
            onClick={() => handleSelect(option)}
          >
            {optionIcon(option, idx)}
            <span className="leading-snug">{option}</span>
          </button>
        ))}
      </div>

      {/* Feedback banner */}
      {state !== "idle" && (
        <div
          className={`rounded-xl px-5 py-3 mb-4 text-sm font-medium animate-fade-in ${
            state === "correct"
              ? "bg-green-500/15 border border-green-500/30 text-green-300"
              : "bg-red-500/15 border border-red-500/30 text-red-300"
          }`}
        >
          {state === "correct" ? (
            <span>✓ Correct! {streak >= 3 ? " You're on fire 🔥" : ""}</span>
          ) : (
            <span>
              ✗ Not quite — the answer was{" "}
              <span className="font-semibold text-text-primary">
                {question.correctAnswer}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Hint toggle */}
      {state === "idle" && (
        <button
          onClick={() => setHintOpen((v) => !v)}
          className="text-xs text-text-muted hover:text-text-secondary transition underline underline-offset-2"
        >
          {hintOpen ? "Hide hint" : "💡 Show hint"}
        </button>
      )}
      {hintOpen && state === "idle" && (
        <div className="mt-2 bg-accent-gold/10 border border-accent-gold/20 rounded-lg px-4 py-2.5 text-sm text-text-secondary animate-fade-in">
          {question.hint}
        </div>
      )}
    </div>
  );
}
