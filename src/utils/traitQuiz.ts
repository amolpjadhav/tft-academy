import type { Trait } from "@/types/trait";
import type { Champion } from "@/types/champion";
import type { QuizQuestion, QuizTerm } from "@/utils/quiz";
import { TRAIT_EXPLAINERS } from "@/data/traitExplainers";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TYPE_LABELS: Record<string, string> = {
  damage:  "Damage",
  magic:   "Magic",
  tank:    "Tank",
  economy: "Economy",
  utility: "Utility",
};

function makeTerm(trait: Trait): QuizTerm {
  return {
    emoji: trait.isUnique ? "⭐" : "🌟",
    category: "trait_quiz",
    term: trait.name,
    detail: trait.description,
    image: trait.icon,
  };
}

type TQType =
  | "champion_to_trait"    // Which trait does [champion] belong to?
  | "trait_to_champion"    // Which champion is part of [trait]?
  | "trait_to_effect"      // What does [trait] do?
  | "trait_breakpoint"     // How many units activate [breakpoint tier] for [trait]?
  | "trait_to_type";       // What type is [trait]?

const Q_TYPES: TQType[] = [
  "champion_to_trait",
  "trait_to_champion",
  "trait_to_effect",
  "trait_breakpoint",
  "trait_to_type",
];

/** "Which trait does [champion] belong to?" */
function makeChampionToTrait(
  trait: Trait,
  index: number,
  allTraits: Trait[]
): QuizQuestion | null {
  if (trait.champions.length === 0) return null;
  const champ = trait.champions[Math.floor(Math.random() * trait.champions.length)];

  const correctAnswer = trait.name;
  const distractors = shuffle(allTraits.filter((t) => t.id !== trait.id))
    .slice(0, 3)
    .map((t) => t.name);

  return {
    id: `tq_c2t_${trait.id}_${index}`,
    type: "champion_to_trait",
    prompt: `Which trait does ${champ.name} belong to?`,
    promptLabel: "Identify the trait",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(trait),
    hint: `${trait.name} activates with: ${trait.champions.map((c) => c.name).join(", ")}.`,
  };
}

/** "Which champion is part of [trait]?" */
function makeTraitToChampion(
  trait: Trait,
  index: number,
  allChampions: Champion[]
): QuizQuestion | null {
  if (trait.champions.length === 0) return null;
  const correctChamp = trait.champions[Math.floor(Math.random() * trait.champions.length)];
  const traitChampNames = new Set(trait.champions.map((c) => c.name));

  const correctAnswer = correctChamp.name;
  const distractors = shuffle(allChampions.filter((c) => !traitChampNames.has(c.name)))
    .slice(0, 3)
    .map((c) => c.name);

  return {
    id: `tq_t2c_${trait.id}_${index}`,
    type: "trait_to_champion",
    prompt: `Which of these champions is part of the ${trait.name} trait?`,
    promptLabel: "Find the champion",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(trait),
    hint: `${trait.name} champions: ${trait.champions.map((c) => c.name).join(", ")}.`,
  };
}

/** "What does [trait] do?" — match beginner description */
function makeTraitToEffect(
  trait: Trait,
  index: number,
  allTraits: Trait[]
): QuizQuestion | null {
  const explainer = TRAIT_EXPLAINERS[trait.name];
  if (!explainer) return null;

  const correctAnswer = explainer.beginner;
  const distractors = shuffle(
    allTraits
      .filter((t) => t.id !== trait.id && TRAIT_EXPLAINERS[t.name])
      .map((t) => TRAIT_EXPLAINERS[t.name].beginner)
      .filter((b) => b !== correctAnswer)
  ).slice(0, 3);

  if (distractors.length < 3) return null;

  return {
    id: `tq_t2e_${trait.id}_${index}`,
    type: "trait_to_effect",
    prompt: `What does the ${trait.name} trait do?`,
    promptLabel: "Match the effect",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(trait),
    hint: `Tip: ${explainer.tip}`,
  };
}

/** "How many units activate the [Gold/Silver] tier of [trait]?" */
function makeTraitBreakpoint(
  trait: Trait,
  index: number,
  allTraits: Trait[]
): QuizQuestion | null {
  if (trait.isUnique || trait.breakpoints.length < 2) return null;

  const STYLE_LABEL = ["", "Bronze", "Silver", "Gold", "Prismatic"];
  const bp = trait.breakpoints[Math.floor(Math.random() * trait.breakpoints.length)];
  const tier = STYLE_LABEL[bp.style] ?? `Tier ${bp.style}`;
  const correctAnswer = `${bp.minUnits} units`;

  // Distractors: other valid unit counts from other traits
  const otherCounts = shuffle(
    allTraits
      .filter((t) => t.id !== trait.id && !t.isUnique)
      .flatMap((t) => t.breakpoints.map((b) => `${b.minUnits} units`))
      .filter((v) => v !== correctAnswer)
  );
  const unique = [...new Set(otherCounts)].slice(0, 3);
  if (unique.length < 3) return null;

  return {
    id: `tq_bp_${trait.id}_${index}`,
    type: "trait_breakpoint",
    prompt: `How many ${trait.name} units activate the ${tier} breakpoint?`,
    promptLabel: "Pick the correct unit count",
    correctAnswer,
    options: shuffle([correctAnswer, ...unique]),
    term: makeTerm(trait),
    hint: `${trait.name} breakpoints: ${trait.breakpoints.map((b) => `${b.minUnits} (${STYLE_LABEL[b.style]})`).join(", ")}.`,
  };
}

/** "What type is [trait]?" — Damage / Magic / Tank / Economy / Utility */
function makeTraitToType(
  trait: Trait,
  index: number
): QuizQuestion {
  const correctAnswer = TYPE_LABELS[trait.type] ?? trait.type;
  const allTypes = Object.values(TYPE_LABELS);
  const distractors = shuffle(allTypes.filter((t) => t !== correctAnswer)).slice(0, 3);

  return {
    id: `tq_t2type_${trait.id}_${index}`,
    type: "trait_to_type",
    prompt: `What type of trait is ${trait.name}?`,
    promptLabel: "Identify the trait type",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(trait),
    hint: TRAIT_EXPLAINERS[trait.name]?.beginner ?? trait.description,
  };
}

export function buildTraitQuiz(
  traits: Trait[],
  champions: Champion[],
  count: number | "all"
): QuizQuestion[] {
  const pool = shuffle(traits);
  const n = count === "all" ? pool.length : Math.min(count as number, pool.length);
  const selected = pool.slice(0, n);

  const questions: QuizQuestion[] = [];

  selected.forEach((trait, i) => {
    const type = Q_TYPES[i % Q_TYPES.length];
    let q: QuizQuestion | null = null;

    switch (type) {
      case "champion_to_trait":  q = makeChampionToTrait(trait, i, traits); break;
      case "trait_to_champion":  q = makeTraitToChampion(trait, i, champions); break;
      case "trait_to_effect":    q = makeTraitToEffect(trait, i, traits); break;
      case "trait_breakpoint":   q = makeTraitBreakpoint(trait, i, traits); break;
      case "trait_to_type":      q = makeTraitToType(trait, i); break;
    }

    // Fallback to a different type if primary returns null
    if (!q) q = makeChampionToTrait(trait, i, traits);
    if (q) questions.push(q);
  });

  return questions;
}
