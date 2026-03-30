import type { Item, Component } from "@/types/item";
import type { QuizQuestion, QuizTerm } from "@/utils/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CATEGORY_LABELS: Record<string, string> = {
  ad_carry:    "AD Carry",
  ap_carry:    "AP Carry",
  melee_carry: "Melee Carry",
  tank:        "Tank",
};

const TIER_EMOJI: Record<string, string> = {
  S: "🟡",
  A: "🔵",
  B: "🟢",
  C: "⚪",
};

function makeTerm(item: Item): QuizTerm {
  return {
    emoji: TIER_EMOJI[item.tier] ?? "⚔️",
    category: "items",
    term: item.name,
    detail: item.passive.description,
    image: item.icon,
  };
}

type IKQType =
  | "passive_to_item"      // "Which item has this passive?" → item name
  | "item_to_passive"      // "What does [item]'s passive do?" → description
  | "components_to_item"   // "Which item is crafted from [A] + [B]?" → item name
  | "item_to_category"     // "Which role is [item] best suited for?" → category
  | "item_to_tier"         // "What tier is [item] rated?" → S/A/B/C

const Q_TYPES: IKQType[] = [
  "passive_to_item",
  "item_to_passive",
  "components_to_item",
  "item_to_category",
  "item_to_tier",
];

function makePassiveToItem(
  item: Item,
  index: number,
  all: Item[]
): QuizQuestion {
  const correctAnswer = item.name;
  const distractors = shuffle(all.filter((i) => i.id !== item.id))
    .slice(0, 3)
    .map((i) => i.name);

  return {
    id: `iknow_p2i_${item.id}_${index}`,
    type: "passive_to_item",
    prompt: `"${item.passive.description}"`,
    promptLabel: "Which item has this passive?",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(item),
    hint: `This item's passive is called "${item.passive.name}".`,
  };
}

function makeItemToPassive(
  item: Item,
  index: number,
  all: Item[]
): QuizQuestion {
  const correctAnswer = item.passive.description;
  const distractors = shuffle(all.filter((i) => i.id !== item.id))
    .slice(0, 3)
    .map((i) => i.passive.description);

  return {
    id: `iknow_i2p_${item.id}_${index}`,
    type: "item_to_passive",
    prompt: `What does ${item.name}'s passive "${item.passive.name}" do?`,
    promptLabel: "Match the passive effect",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(item),
    hint: item.why_it_matters,
  };
}

function makeComponentsToItem(
  item: Item,
  index: number,
  all: Item[],
  componentMap: Record<string, Component>
): QuizQuestion {
  const compA = componentMap[item.components[0]];
  const compB = componentMap[item.components[1]];
  const compNames = [compA?.name ?? item.components[0], compB?.name ?? item.components[1]];

  const correctAnswer = item.name;
  const distractors = shuffle(all.filter((i) => i.id !== item.id))
    .slice(0, 3)
    .map((i) => i.name);

  return {
    id: `iknow_c2i_${item.id}_${index}`,
    type: "components_to_item",
    prompt: `${compNames[0]} + ${compNames[1]} = ?`,
    promptLabel: "What item do these two components make?",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(item),
    hint: `${item.name} — ${item.passive.name}: ${item.passive.description.slice(0, 80)}…`,
  };
}

function makeItemToCategory(
  item: Item,
  index: number,
  all: Item[]
): QuizQuestion {
  const correctAnswer = CATEGORY_LABELS[item.category];
  const allCategories = Object.values(CATEGORY_LABELS);
  const distractors = shuffle(allCategories.filter((c) => c !== correctAnswer)).slice(0, 3);

  // Pick a distractor item from the same category to show in hint (for context)
  const sameCategory = all.filter((i) => i.id !== item.id && i.category === item.category);

  return {
    id: `iknow_i2c_${item.id}_${index}`,
    type: "item_to_category",
    prompt: `Which role is ${item.name} best suited for?`,
    promptLabel: "Identify the item role",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(item),
    hint: sameCategory.length > 0
      ? `Other ${correctAnswer} items include: ${sameCategory.slice(0, 2).map((i) => i.name).join(", ")}.`
      : item.why_it_matters,
  };
}

function makeItemToTier(
  item: Item,
  index: number
): QuizQuestion {
  const correctAnswer = `${TIER_EMOJI[item.tier]} ${item.tier}-Tier`;
  const allTiers = ["S", "A", "B", "C"].filter((t) => t !== item.tier);
  const distractors = allTiers.map((t) => `${TIER_EMOJI[t]} ${t}-Tier`);

  return {
    id: `iknow_i2t_${item.id}_${index}`,
    type: "item_to_tier",
    prompt: `What tier rating does ${item.name} have in Set 16?`,
    promptLabel: "Rate the item",
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    term: makeTerm(item),
    hint: item.why_it_matters,
  };
}

export function buildItemKnowledgeQuiz(
  items: Item[],
  components: Component[],
  count: number | "all"
): QuizQuestion[] {
  const componentMap = Object.fromEntries(components.map((c) => [c.id, c]));
  const pool = shuffle(items);
  const n = count === "all" ? pool.length : Math.min(count as number, pool.length);
  const selected = pool.slice(0, n);

  return selected.map((item, i) => {
    const type = Q_TYPES[i % Q_TYPES.length];
    switch (type) {
      case "passive_to_item":    return makePassiveToItem(item, i, items);
      case "item_to_passive":    return makeItemToPassive(item, i, items);
      case "components_to_item": return makeComponentsToItem(item, i, items, componentMap);
      case "item_to_category":   return makeItemToCategory(item, i, items);
      case "item_to_tier":       return makeItemToTier(item, i);
    }
  });
}
