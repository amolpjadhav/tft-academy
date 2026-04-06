export interface TopicRecord {
  seen: number;
  correct: number;
  score: number;
  streak: number;
  lastSeen: number;
}

export interface OverallStats {
  totalAnswered: number;
  totalCorrect: number;
  longestStreak: number;
  quizzesTaken: number;
  lastPlayed: number;
}

export interface ProficiencyStore {
  version: number;
  topics: Record<string, TopicRecord>;
  overall: OverallStats;
}

export const DEFAULT_STORE: ProficiencyStore = {
  version: 1,
  topics: {},
  overall: {
    totalAnswered: 0,
    totalCorrect: 0,
    longestStreak: 0,
    quizzesTaken: 0,
    lastPlayed: 0,
  },
};

const STORAGE_KEY = "tftschool_proficiency_v1";

export function loadProficiency(): ProficiencyStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STORE, topics: {}, overall: { ...DEFAULT_STORE.overall } };
    const parsed = JSON.parse(raw) as ProficiencyStore;
    if (!parsed || parsed.version !== 1) return { ...DEFAULT_STORE, topics: {}, overall: { ...DEFAULT_STORE.overall } };
    return parsed;
  } catch {
    return { ...DEFAULT_STORE, topics: {}, overall: { ...DEFAULT_STORE.overall } };
  }
}

export function saveProficiency(store: ProficiencyStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // silently ignore storage errors
  }
}

export function getTopicKey(category: string, term: string): string {
  return `${category}:${term}`;
}

export function recordAnswer(
  store: ProficiencyStore,
  topicKey: string,
  correct: boolean
): ProficiencyStore {
  const existing: TopicRecord = store.topics[topicKey] ?? {
    seen: 0,
    correct: 0,
    score: 0,
    streak: 0,
    lastSeen: 0,
  };

  const newScore = correct
    ? Math.min(100, existing.score + (100 - existing.score) * 0.25)
    : existing.score * 0.65;

  const roundedScore = Math.round(newScore * 10) / 10;
  const newStreak = correct ? existing.streak + 1 : 0;

  const updatedTopic: TopicRecord = {
    seen: existing.seen + 1,
    correct: existing.correct + (correct ? 1 : 0),
    score: roundedScore,
    streak: newStreak,
    lastSeen: Date.now(),
  };

  const overall = store.overall;

  return {
    ...store,
    topics: {
      ...store.topics,
      [topicKey]: updatedTopic,
    },
    overall: {
      ...overall,
      totalAnswered: overall.totalAnswered + 1,
      totalCorrect: overall.totalCorrect + (correct ? 1 : 0),
      // longestStreak and quizzesTaken are updated at quiz completion, not per-answer
      lastPlayed: Date.now(),
    },
  };
}

export function getCategoryProficiency(
  store: ProficiencyStore,
  category: string
): { avg: number; mastered: number; total: number } {
  const prefix = `${category}:`;
  const matching = Object.entries(store.topics).filter(([key]) =>
    key.startsWith(prefix)
  );

  if (matching.length === 0) return { avg: 0, mastered: 0, total: 0 };

  const total = matching.length;
  const sum = matching.reduce((acc, [, rec]) => acc + rec.score, 0);
  const mastered = matching.filter(([, rec]) => rec.score >= 85).length;

  return {
    avg: Math.round((sum / total) * 10) / 10,
    mastered,
    total,
  };
}

export function getProficiencyTier(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 85) return { label: "Mastered", color: "text-accent-gold", bg: "bg-accent-gold/15 border-accent-gold/30" };
  if (score >= 65) return { label: "Strong", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" };
  if (score >= 35) return { label: "Learning", color: "text-accent-purple-light", bg: "bg-accent-purple/15 border-accent-purple/30" };
  return { label: "Struggling", color: "text-red-400", bg: "bg-red-500/15 border-red-500/30" };
}

export function getOverallAccuracy(overall: OverallStats): number {
  if (overall.totalAnswered === 0) return 0;
  return Math.round((overall.totalCorrect / overall.totalAnswered) * 100);
}

const NAMED_CATEGORY_GROUPS: { label: string; categories: string[] }[] = [
  { label: "Champions",    categories: ["champions"] },
  { label: "Items",        categories: ["items", "item_quiz"] },
  { label: "TFT Knowledge",categories: ["tft", "mechanics", "economy", "stats", "roles"] },
  { label: "Traits",       categories: ["trait_quiz"] },
];

export function getTotalMastered(store: ProficiencyStore): { mastered: number; total: number } {
  const all = Object.values(store.topics);
  return {
    mastered: all.filter((t) => t.score >= 85).length,
    total: all.length,
  };
}

export function getWeakestCategory(store: ProficiencyStore): { label: string; avg: number } | null {
  let weakest: { label: string; avg: number } | null = null;
  for (const group of NAMED_CATEGORY_GROUPS) {
    let totalSeen = 0;
    let weightedSum = 0;
    for (const cat of group.categories) {
      const data = getCategoryProficiency(store, cat);
      if (data.total > 0) {
        totalSeen += data.total;
        weightedSum += data.avg * data.total;
      }
    }
    if (totalSeen === 0) continue;
    const avg = Math.round((weightedSum / totalSeen) * 10) / 10;
    if (weakest === null || avg < weakest.avg) {
      weakest = { label: group.label, avg };
    }
  }
  return weakest;
}
