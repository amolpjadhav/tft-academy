import type { Champion } from "@/types/champion";
import type { QuizQuestion, QuizTerm } from "@/utils/quiz";

const ROLE_LABELS: Record<string, string> = {
  ad_carry: "AD Carry",
  ap_carry: "AP Carry",
  melee_carry: "Melee Carry",
  tank: "Tank",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shortDesc(desc: string, maxLen = 90): string {
  const clean = desc.replace(/\s+/g, " ").trim();
  return clean.length <= maxLen ? clean : clean.slice(0, maxLen) + "…";
}

function costEmoji(cost: number): string {
  return ["⚪", "💚", "💙", "💜", "🟠", "💎"][cost] ?? "⭐";
}

type CQType =
  | "name_ability"
  | "champion_from_ability"
  | "champion_role"
  | "champion_cost"
  | "champion_trait";

const Q_TYPES: CQType[] = [
  "name_ability",
  "champion_from_ability",
  "champion_role",
  "champion_cost",
  "champion_trait",
];

function makeTerm(champion: Champion, includeImage: boolean): QuizTerm {
  return {
    emoji: costEmoji(champion.cost),
    category: "champions",
    term: champion.name,
    detail: `${champion.ability.name} — ${champion.ability.description}`,
    image: includeImage ? champion.icon : undefined,
  };
}

function buildQuestion(
  champion: Champion,
  type: CQType,
  index: number,
  all: Champion[]
): QuizQuestion {
  switch (type) {
    case "name_ability": {
      const correctAnswer = champion.ability.name;
      const distractors = shuffle(all.filter((c) => c.id !== champion.id))
        .slice(0, 3)
        .map((c) => c.ability.name);
      return {
        id: `champ_${champion.id}_${index}`,
        type: "champion_ability",
        prompt: `What is ${champion.name}'s ability called?`,
        promptLabel: "Name the ability",
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        term: makeTerm(champion, true),
        hint: shortDesc(champion.ability.description, 100),
      };
    }

    case "champion_from_ability": {
      const correctAnswer = champion.name;
      const distractors = shuffle(all.filter((c) => c.id !== champion.id))
        .slice(0, 3)
        .map((c) => c.name);
      return {
        id: `champ_${champion.id}_${index}`,
        type: "champion_ability",
        prompt: `"${shortDesc(champion.ability.description, 90)}"`,
        promptLabel: "Which champion has this ability?",
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        // No portrait — it would reveal the answer
        term: makeTerm(champion, false),
        hint: `This champion's ability is called "${champion.ability.name}".`,
      };
    }

    case "champion_role": {
      const correctAnswer = ROLE_LABELS[champion.role] ?? champion.role;
      const allRoles = ["AD Carry", "AP Carry", "Melee Carry", "Tank"];
      const distractors = shuffle(allRoles.filter((r) => r !== correctAnswer));
      return {
        id: `champ_${champion.id}_${index}`,
        type: "champion_role",
        prompt: `What role does ${champion.name} play?`,
        promptLabel: "Identify the role",
        correctAnswer,
        options: [correctAnswer, ...distractors],
        term: makeTerm(champion, true),
        hint: `Think about what ${champion.name} does best in a fight.`,
      };
    }

    case "champion_cost": {
      const correctAnswer = `${champion.cost} Gold`;
      const allCosts = ["1 Gold", "2 Gold", "3 Gold", "4 Gold", "5 Gold"];
      const distractors = shuffle(allCosts.filter((c) => c !== correctAnswer)).slice(0, 3);
      return {
        id: `champ_${champion.id}_${index}`,
        type: "champion_cost",
        prompt: `How much does ${champion.name} cost in the shop?`,
        promptLabel: "Champion cost",
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        term: makeTerm(champion, true),
        hint: `${champion.cost}-cost champions are ${champion.cost >= 4 ? "rare and powerful" : champion.cost >= 3 ? "mid-game power spikes" : "common early-game picks"}.`,
      };
    }

    case "champion_trait": {
      const correctTrait =
        champion.traits[Math.floor(Math.random() * champion.traits.length)];
      const allTraits = Array.from(new Set(all.flatMap((c) => c.traits)));
      const distractors = shuffle(
        allTraits.filter((t) => !champion.traits.includes(t))
      ).slice(0, 3);
      return {
        id: `champ_${champion.id}_${index}`,
        type: "champion_trait",
        prompt: `Which of these is one of ${champion.name}'s traits?`,
        promptLabel: "Identify a trait",
        correctAnswer: correctTrait,
        options: shuffle([correctTrait, ...distractors]),
        term: makeTerm(champion, true),
        hint: `${champion.name} has ${champion.traits.length} trait${champion.traits.length > 1 ? "s" : ""}: ${champion.traits.join(", ")}.`,
      };
    }
  }
}

export function buildChampionQuiz(
  champions: Champion[],
  count: number | "all"
): QuizQuestion[] {
  const pool = shuffle(champions);
  const n = count === "all" ? pool.length : Math.min(count as number, pool.length);
  const selected = pool.slice(0, n);

  return selected.map((champion, i) =>
    buildQuestion(champion, Q_TYPES[i % Q_TYPES.length], i, champions)
  );
}
