import { useState } from "react";
import type { ProficiencyStore } from "@/utils/proficiency";
import {
  getCategoryProficiency,
  getOverallAccuracy,
  getWeakestCategory,
} from "@/utils/proficiency";

interface Props {
  store: ProficiencyStore;
  onReset: () => void;
}

interface CategoryGroup {
  label: string;
  categories: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  { label: "Champions", categories: ["champions"] },
  { label: "Items", categories: ["items", "item_quiz"] },
  { label: "TFT Knowledge", categories: ["tft", "mechanics", "economy", "stats", "roles"] },
  { label: "Traits", categories: ["trait_quiz"] },
];

function getGroupProficiency(
  store: ProficiencyStore,
  categories: string[]
): { avg: number; mastered: number; total: number } {
  let totalSeen = 0;
  let totalMastered = 0;
  let weightedSum = 0;

  for (const cat of categories) {
    const data = getCategoryProficiency(store, cat);
    if (data.total > 0) {
      totalSeen += data.total;
      totalMastered += data.mastered;
      weightedSum += data.avg * data.total;
    }
  }

  if (totalSeen === 0) return { avg: 0, mastered: 0, total: 0 };

  return {
    avg: Math.round((weightedSum / totalSeen) * 10) / 10,
    mastered: totalMastered,
    total: totalSeen,
  };
}

export default function ProficiencyPanel({ store, onReset }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (store.overall.quizzesTaken === 0) return null;

  const accuracy = getOverallAccuracy(store.overall);
  const weakest = getWeakestCategory(store);

  const categoryRows = CATEGORY_GROUPS.map((group) => ({
    label: group.label,
    data: getGroupProficiency(store, group.categories),
  })).filter((row) => row.data.total > 0);

  function barColor(avg: number): string {
    if (avg >= 65) return "bg-accent-gold";
    if (avg >= 35) return "bg-accent-purple";
    return "bg-red-500";
  }

  return (
    <div className="mb-8 bg-bg-surface border border-white/8 rounded-2xl overflow-hidden">
      {/* Headline stats row */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Your Progress
          </p>
          {categoryRows.length > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-[11px] text-text-muted hover:text-text-secondary transition-colors"
            >
              {expanded ? "▴ Hide breakdown" : "▾ Show breakdown"}
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-bg-elevated rounded-xl px-3 py-2.5 text-center border border-white/5">
            <p className="text-lg font-bold text-text-primary">
              {store.overall.quizzesTaken}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">Quizzes</p>
          </div>
          <div className="flex-1 bg-bg-elevated rounded-xl px-3 py-2.5 text-center border border-white/5">
            <p
              className={`text-lg font-bold ${
                accuracy >= 80
                  ? "text-accent-gold"
                  : accuracy >= 60
                  ? "text-emerald-400"
                  : accuracy >= 40
                  ? "text-accent-purple-light"
                  : "text-red-400"
              }`}
            >
              {accuracy}%
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">Accuracy</p>
          </div>
          <div className="flex-1 bg-bg-elevated rounded-xl px-3 py-2.5 text-center border border-white/5">
            <p className="text-lg font-bold text-text-primary">
              {store.overall.totalAnswered}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">Questions</p>
          </div>
        </div>

        {/* Weakest category callout */}
        {weakest && weakest.avg < 65 && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/8 border border-red-500/20">
            <span className="text-sm">📉</span>
            <p className="text-xs text-text-muted">
              Needs work:{" "}
              <span className="text-red-300 font-semibold">{weakest.label}</span>
              <span className="text-text-muted/50 ml-1">({weakest.avg}% avg)</span>
            </p>
          </div>
        )}
        {weakest && weakest.avg >= 65 && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
            <span className="text-sm">✦</span>
            <p className="text-xs text-text-muted">
              Strongest:{" "}
              <span className="text-emerald-300 font-semibold">{weakest.label}</span>
              <span className="text-text-muted/50 ml-1">({weakest.avg}% avg)</span>
            </p>
          </div>
        )}
      </div>

      {/* Category breakdown (collapsible) */}
      {expanded && categoryRows.length > 0 && (
        <div className="border-t border-white/8 px-5 py-4 space-y-3">
          {categoryRows.map(({ label, data }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-text-secondary">
                  {label}
                </span>
                <span className="text-[10px] text-text-muted">
                  {data.mastered}/{data.total} mastered
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor(data.avg)}`}
                  style={{ width: `${Math.min(100, data.avg)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 pb-3">
        <p className="text-[10px] text-text-muted">
          Saved in this browser only — clearing cache or switching browsers resets progress.
        </p>
        <button
          onClick={onReset}
          className="text-[10px] text-text-muted/40 hover:text-red-400 transition-colors shrink-0 ml-3"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
