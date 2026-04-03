import { GLOSSARY } from "@/data/glossary";
import type { GlossaryCategory, GlossaryTerm } from "@/data/glossary";

export type QuizCategory = GlossaryCategory | "all" | "champions" | "item_quiz" | "items" | "trait_quiz" | "emblem_quiz";
export type QuestionCount = 5 | 10 | 15 | "all";

export type QuestionType = "term_to_definition" | "definition_to_term" | string;

/** Generic term shape used by both glossary and champion questions */
export interface QuizTerm {
  emoji: string;
  category: string;
  term: string;
  detail: string;
  /** Optional portrait/icon URL (champion questions) */
  image?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  /** The prompt text shown to the player */
  prompt: string;
  /** Sub-label beneath the prompt */
  promptLabel: string;
  /** The correct answer string */
  correctAnswer: string;
  /** All 4 options (shuffled) */
  options: string[];
  /** The source term (used for result recap) */
  term: QuizTerm;
  /** Hint: first sentence of detail explanation */
  hint: string;
}

export interface QuizResult {
  question: QuizQuestion;
  chosen: string;
  correct: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : text.slice(0, 80) + "…";
}

function pickDistractors(
  correct: GlossaryTerm,
  pool: GlossaryTerm[],
  field: "simple" | "term",
  count = 3
): string[] {
  // Prefer distractors from the same category first
  const same = pool.filter(
    (t) => t.id !== correct.id && t.category === correct.category
  );
  const others = pool.filter(
    (t) => t.id !== correct.id && t.category !== correct.category
  );
  const candidates = shuffle([...same, ...others]);
  return candidates.slice(0, count).map((t) => t[field]);
}

export function buildQuiz(
  category: QuizCategory,
  count: QuestionCount
): QuizQuestion[] {
  const pool =
    category === "all"
      ? GLOSSARY
      : GLOSSARY.filter((t) => t.category === category);

  // Need at least 4 terms to make valid questions
  if (pool.length < 4) return [];

  const n =
    count === "all" ? pool.length : Math.min(count as number, pool.length);
  const selected = shuffle(pool).slice(0, n);

  return selected.map((term, i) => {
    // Alternate question types
    const type: QuestionType =
      i % 2 === 0 ? "term_to_definition" : "definition_to_term";

    if (type === "term_to_definition") {
      const correctAnswer = term.simple;
      const distractors = pickDistractors(term, pool, "simple");
      return {
        id: `${term.id}_${i}`,
        type,
        prompt: term.term,
        promptLabel: "What does this term mean?",
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        term,
        hint: firstSentence(term.detail),
      };
    } else {
      const correctAnswer = term.term;
      const distractors = pickDistractors(term, pool, "term");
      return {
        id: `${term.id}_${i}`,
        type,
        prompt: `"${term.simple}"`,
        promptLabel: "Which term matches this definition?",
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        term,
        hint: `${term.emoji} Category: ${term.category.charAt(0).toUpperCase() + term.category.slice(1)}`,
      };
    }
  });
}
