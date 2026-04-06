import type { QuizResult } from "@/utils/quiz";
import type { ProficiencyStore } from "@/utils/proficiency";
import { getTopicKey, getProficiencyTier, getTotalMastered, getWeakestCategory } from "@/utils/proficiency";

interface QuizResultProps {
  results: QuizResult[];
  bestStreak: number;
  onPlayAgain: () => void;
  onNewQuiz: () => void;
  profStore?: ProficiencyStore;
}

function scoreGrade(pct: number): { label: string; emoji: string; color: string } {
  if (pct === 100) return { label: "Perfect!", emoji: "🏆", color: "text-accent-gold" };
  if (pct >= 80)  return { label: "Great job!", emoji: "🌟", color: "text-accent-gold" };
  if (pct >= 60)  return { label: "Not bad!", emoji: "👍", color: "text-blue-400" };
  if (pct >= 40)  return { label: "Keep going!", emoji: "💪", color: "text-purple-400" };
  return { label: "Keep studying!", emoji: "📚", color: "text-text-secondary" };
}

export default function QuizResult({
  results,
  bestStreak,
  onPlayAgain,
  onNewQuiz,
  profStore,
}: QuizResultProps) {
  const correct = results.filter((r) => r.correct).length;
  const total   = results.length;
  const pct     = Math.round((correct / total) * 100);
  const grade   = scoreGrade(pct);
  const wrong   = results.filter((r) => !r.correct);
  const isChampionQuiz = results.some((r) => r.question.term.category === "champions");
  const mastered = profStore ? getTotalMastered(profStore) : null;
  const weakest  = profStore ? getWeakestCategory(profStore) : null;

  return (
    <div className="max-w-xl mx-auto">
      {/* Score card */}
      <div className="bg-bg-surface border border-white/10 rounded-2xl p-8 text-center mb-8 animate-slide-up">
        <div className="text-6xl mb-4">{grade.emoji}</div>
        <h2 className={`font-heading text-3xl mb-1 ${grade.color}`}>{grade.label}</h2>
        {isChampionQuiz && (
          <p className="text-text-muted text-sm mt-1">Champions Quiz</p>
        )}

        {/* Score ring */}
        <div className="flex justify-center my-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={pct >= 80 ? "#f59e0b" : pct >= 60 ? "#60a5fa" : "#a78bfa"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${grade.color}`}>{pct}%</span>
              <span className="text-text-muted text-xs">{correct}/{total}</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{correct}</p>
            <p className="text-xs text-text-muted">Correct</p>
          </div>
          <div className="w-px bg-white/5" />
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{wrong.length}</p>
            <p className="text-xs text-text-muted">Wrong</p>
          </div>
          <div className="w-px bg-white/5" />
          <div className="text-center">
            {mastered ? (
              <p className="text-2xl font-bold text-accent-gold">
                {mastered.mastered}<span className="text-base font-normal text-text-muted">/{mastered.total}</span>
              </p>
            ) : (
              <p className="text-2xl font-bold text-accent-gold">—</p>
            )}
            <p className="text-xs text-text-muted">Mastered</p>
          </div>
        </div>
      </div>

      {/* Weakest category callout */}
      {weakest && (
        <div className={`mb-8 flex items-center gap-2.5 px-4 py-3 rounded-xl border ${weakest.avg < 65 ? "bg-red-500/8 border-red-500/20" : "bg-emerald-500/8 border-emerald-500/20"}`}>
          <span className="text-base">{weakest.avg < 65 ? "📉" : "✦"}</span>
          <p className="text-sm text-text-muted">
            {weakest.avg < 65 ? "Focus next on" : "Strongest area"}:{" "}
            <span className={`font-semibold ${weakest.avg < 65 ? "text-red-300" : "text-emerald-300"}`}>
              {weakest.label}
            </span>
            <span className="text-text-muted/50 ml-1.5 text-xs">({weakest.avg}% avg)</span>
          </p>
        </div>
      )}

      {/* Wrong answers recap */}
      {wrong.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
            Review — {wrong.length} missed
          </p>
          <div className="space-y-3">
            {wrong.map(({ question, chosen }) => {
              const hasPortrait = !!question.term.image;
              return (
                <div
                  key={question.id}
                  className="bg-bg-surface border border-red-500/20 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    {/* Portrait (champion quiz) or emoji (glossary) */}
                    {hasPortrait ? (
                      <div className="relative shrink-0 mt-0.5">
                        <img
                          src={question.term.image}
                          alt={question.term.term}
                          className="w-12 h-12 rounded-xl object-cover border border-white/15"
                        />
                      </div>
                    ) : (
                      <span className="text-xl shrink-0 mt-0.5">{question.term.emoji}</span>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary mb-1">
                        {question.term.term}
                      </p>
                      <p className="text-xs text-text-muted mb-2">{question.promptLabel}</p>

                      <div className="flex items-start gap-2 mb-1.5">
                        <span className="text-red-400 text-xs shrink-0 mt-0.5">✗ You chose:</span>
                        <span className="text-red-300 text-xs">{chosen}</span>
                      </div>
                      <div className="flex items-start gap-2 mb-3">
                        <span className="text-green-400 text-xs shrink-0 mt-0.5">✓ Answer:</span>
                        <span className="text-green-300 text-xs">{question.correctAnswer}</span>
                      </div>

                      <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-lg px-3 py-2">
                        <p className="text-xs text-accent-purple-light font-semibold mb-1">
                          📝 Quick reminder
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {question.term.detail.split(".")[0]}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Topics to Review — proficiency tiers for missed questions */}
      {profStore && wrong.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
            Proficiency — missed topics
          </p>
          <div className="bg-bg-surface border border-white/8 rounded-xl divide-y divide-white/5">
            {wrong.map(({ question }) => {
              const key = getTopicKey(question.term.category, question.term.term);
              const record = profStore.topics[key];
              const score = record?.score ?? 0;
              const tier = getProficiencyTier(score);
              return (
                <div
                  key={question.id}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <span className="text-sm text-text-secondary truncate mr-3">
                    {question.term.term}
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tier.bg} ${tier.color}`}
                  >
                    {tier.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPlayAgain}
          className={`flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-all ${
            isChampionQuiz
              ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400"
              : "bg-accent-purple hover:bg-accent-purple/80 shadow-glow"
          }`}
        >
          🔄 Same Quiz Again
        </button>
        <button
          onClick={onNewQuiz}
          className="flex-1 py-3 rounded-xl bg-bg-elevated border border-white/10 hover:border-white/25 text-text-primary font-semibold text-sm transition-all"
        >
          ⚙️ New Quiz
        </button>
      </div>
    </div>
  );
}
