import type { Champion } from "@/types/champion";
import type { Item } from "@/types/item";
import type { QuizQuestion, QuizTerm } from "@/utils/quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function costEmoji(cost: number): string {
  return ["⚪", "💚", "💙", "💜", "🟠", "💎"][cost] ?? "⭐";
}

type IQType = "champion_to_item" | "item_to_champion" | "item_reason";

/** "Which item is ideal for [champion]?" */
function makeChampionToItem(
  champion: Champion,
  index: number,
  allItems: Item[],
  itemMap: Record<string, Item>
): QuizQuestion | null {
  if (!champion.idealItems || champion.idealItems.length === 0) return null;

  // Pick a random ideal item for this champion as the correct answer
  const idealEntry = champion.idealItems[Math.floor(Math.random() * champion.idealItems.length)];
  const correctItem = itemMap[idealEntry.itemId];
  if (!correctItem) return null;

  // Distractors: items NOT in this champion's ideal list
  const idealIds = new Set(champion.idealItems.map((i) => i.itemId));
  const distractors = shuffle(allItems.filter((it) => !idealIds.has(it.id)))
    .slice(0, 3)
    .map((it) => it.name);

  const term: QuizTerm = {
    emoji: costEmoji(champion.cost),
    category: "item_quiz",
    term: champion.name,
    detail: idealEntry.reason,
    image: champion.icon,
  };

  return {
    id: `itemquiz_c2i_${champion.id}_${index}`,
    type: "champion_to_item",
    prompt: `Which item is ideal for ${champion.name}?`,
    promptLabel: "Best item for this champion",
    correctAnswer: correctItem.name,
    options: shuffle([correctItem.name, ...distractors]),
    term,
    hint: idealEntry.reason,
  };
}

/** "Which champion benefits most from [item]?" */
function makeItemToChampion(
  item: Item,
  index: number,
  allChampions: Champion[]
): QuizQuestion | null {
  // Find champions that have this item as an ideal item
  const users = allChampions.filter(
    (c) => c.idealItems?.some((i) => i.itemId === item.id)
  );
  if (users.length === 0) return null;

  const correctChamp = users[Math.floor(Math.random() * users.length)];
  const reason = correctChamp.idealItems!.find((i) => i.itemId === item.id)!.reason;

  const distractors = shuffle(
    allChampions.filter((c) => !users.some((u) => u.id === c.id))
  )
    .slice(0, 3)
    .map((c) => c.name);

  const term: QuizTerm = {
    emoji: "⚔️",
    category: "item_quiz",
    term: item.name,
    detail: reason,
    image: item.icon,
  };

  return {
    id: `itemquiz_i2c_${item.id}_${index}`,
    type: "item_to_champion",
    prompt: `Which champion benefits most from ${item.name}?`,
    promptLabel: "Best champion for this item",
    correctAnswer: correctChamp.name,
    options: shuffle([correctChamp.name, ...distractors]),
    term,
    hint: reason,
  };
}

/** "Why is [item] ideal for [champion]?" (reason matching) */
function makeItemReason(
  champion: Champion,
  index: number,
  allChampions: Champion[],
  itemMap: Record<string, Item>
): QuizQuestion | null {
  if (!champion.idealItems || champion.idealItems.length === 0) return null;

  const idealEntry = champion.idealItems[Math.floor(Math.random() * champion.idealItems.length)];
  const correctItem = itemMap[idealEntry.itemId];
  if (!correctItem) return null;

  // Distractors: reasons from other champions' ideal items
  const otherReasons = shuffle(
    allChampions
      .filter((c) => c.id !== champion.id && c.idealItems && c.idealItems.length > 0)
      .flatMap((c) => c.idealItems!.map((i) => i.reason))
      .filter((r) => r !== idealEntry.reason)
  ).slice(0, 3);

  if (otherReasons.length < 3) return null;

  const term: QuizTerm = {
    emoji: costEmoji(champion.cost),
    category: "item_quiz",
    term: champion.name,
    detail: idealEntry.reason,
    image: champion.icon,
  };

  return {
    id: `itemquiz_reason_${champion.id}_${index}`,
    type: "item_reason",
    prompt: `Why is ${correctItem.name} ideal for ${champion.name}?`,
    promptLabel: "Match the reason",
    correctAnswer: idealEntry.reason,
    options: shuffle([idealEntry.reason, ...otherReasons]),
    term,
    hint: `${correctItem.name} — ${correctItem.passive.name}: ${correctItem.passive.description.slice(0, 80)}…`,
  };
}

const Q_TYPES: IQType[] = ["champion_to_item", "item_to_champion", "item_reason"];

export function buildItemQuiz(
  champions: Champion[],
  items: Item[],
  itemMap: Record<string, Item>,
  count: number | "all"
): QuizQuestion[] {
  const pool = shuffle(champions.filter((c) => c.idealItems && c.idealItems.length > 0));
  const itemPool = shuffle(items);

  const questions: QuizQuestion[] = [];
  let champIdx = 0;
  let itemIdx = 0;
  const maxAttempts = (count === "all" ? pool.length : (count as number)) * 3;

  for (let i = 0; i < maxAttempts && questions.length < (count === "all" ? pool.length : (count as number)); i++) {
    const type = Q_TYPES[i % Q_TYPES.length];
    let q: QuizQuestion | null = null;

    if (type === "champion_to_item") {
      const champ = pool[champIdx % pool.length];
      q = makeChampionToItem(champ, i, items, itemMap);
      champIdx++;
    } else if (type === "item_to_champion") {
      const item = itemPool[itemIdx % itemPool.length];
      q = makeItemToChampion(item, i, champions);
      itemIdx++;
    } else {
      const champ = pool[champIdx % pool.length];
      q = makeItemReason(champ, i, champions, itemMap);
      champIdx++;
    }

    if (q) questions.push(q);
  }

  return questions;
}
