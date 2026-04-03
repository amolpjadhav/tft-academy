import type { Trait } from "@/types/trait";
import type { QuizQuestion } from "@/utils/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Emblem quiz — pure visual identification.
 * Show the trait icon, player picks which trait it belongs to.
 */
export function buildEmblemQuiz(
  traits: Trait[],
  count: number | "all"
): QuizQuestion[] {
  // Only traits that have emblems (non-unique, non-arcana unique-1)
  const emblemTraits = traits.filter((t) => !t.isUnique);

  const pool = shuffle(emblemTraits);
  const n = count === "all" ? pool.length : Math.min(count as number, pool.length);
  const selected = pool.slice(0, n);

  return selected.map((trait, i) => {
    const correctAnswer = trait.name;

    // Distractors: 3 other non-unique trait names
    const distractors = shuffle(
      emblemTraits.filter((t) => t.id !== trait.id).map((t) => t.name)
    ).slice(0, 3);

    const categoryLabel = trait.category === "origin" ? "Origin" : "Class";

    return {
      id: `eq_${trait.id}_${i}`,
      type: "identify_emblem",
      prompt: "Which trait does this emblem belong to?",
      promptLabel: "Identify the emblem",
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      term: {
        emoji: "💠",
        category: "emblem_quiz",
        term: `${trait.name} Emblem`,
        detail: `The ${trait.name} Emblem grants a champion the ${trait.name} trait (${categoryLabel}).`,
        image: trait.icon,
      },
      hint: `This is a ${categoryLabel} trait. Champions: ${trait.champions
        .map((c) => c.name)
        .join(", ")}.`,
    };
  });
}
