// ─────────────────────────────────────────────────────────────────────────────
// TFT Roll Probability Engine — Set 17 data
// ─────────────────────────────────────────────────────────────────────────────

/** Shop odds per level: index 0 = 1-cost … index 4 = 5-cost */
export const SHOP_ODDS: Record<number, readonly number[]> = {
  4:  [0.55, 0.30, 0.15, 0.00, 0.00],
  5:  [0.45, 0.33, 0.20, 0.02, 0.00],
  6:  [0.30, 0.40, 0.25, 0.05, 0.00],
  7:  [0.19, 0.30, 0.35, 0.15, 0.01],
  8:  [0.18, 0.25, 0.32, 0.22, 0.03],
  9:  [0.10, 0.15, 0.30, 0.30, 0.15],
  10: [0.05, 0.10, 0.20, 0.40, 0.25],
};

/** Copies per champion per cost tier */
export const POOL_SIZE: Record<number, number> = {
  1: 22, 2: 20, 3: 17, 4: 10, 5: 9,
};

/** Number of unique champions per cost tier in Set 17 (exact) */
export const CHAMPS_PER_TIER: Record<number, number> = {
  1: 14, 2: 13, 3: 13, 4: 13, 5: 10,
};

/** Total copies in the shared pool for each cost tier */
export const TOTAL_IN_TIER: Record<number, number> = {
  1: 14 * 22, // 308
  2: 13 * 20, // 260
  3: 13 * 17, // 221
  4: 13 * 10, // 130
  5: 10 * 9,  // 90
};

/**
 * Probability of seeing ≥1 copy of the target champion in a single 5-slot shop.
 * Uses the independent-slot approximation (slight overestimate, standard in TFT tools).
 */
export function pShop(
  cost: number,
  level: number,
  copiesRemaining: number
): number {
  if (copiesRemaining <= 0) return 0;
  const tierOdds = SHOP_ODDS[level]?.[cost - 1] ?? 0;
  if (tierOdds === 0) return 0;
  const pSlot = tierOdds * (copiesRemaining / TOTAL_IN_TIER[cost]);
  return 1 - Math.pow(1 - pSlot, 5);
}

export interface RollResult {
  /** cdf[i] = P(hit target within i rolls), where each roll costs 2 gold */
  cdf: number[];
  p50Gold: number | null;
  p80Gold: number | null;
  p95Gold: number | null;
  /** P(hit target) with exactly `goldBudget` gold */
  pAtBudget: number;
}

/**
 * Compute the cumulative probability of collecting `target` total copies of
 * a champion, given current ownership and lobby state.
 *
 * @param cost        1–5
 * @param level       4–10
 * @param owned       copies currently in your hand (0–8)
 * @param out         copies in other players' hands (0–10)
 * @param target      total copies needed (3 for 2★, 9 for 3★)
 * @param goldBudget  how much gold you plan to spend rolling
 * @param maxGold     ceiling for the CDF array (default 100)
 */
export function calcRollCDF(
  cost: number,
  level: number,
  owned: number,
  out: number,
  target: number,
  goldBudget: number,
  maxGold = 100
): RollResult {
  const need = Math.max(0, target - owned);
  const maxRolls = Math.floor(maxGold / 2);

  // dp[c] = probability of having found exactly c extra copies so far (c < need)
  // Once c >= need the player has succeeded (absorbing state)
  const dp = new Array<number>(need + 1).fill(0);
  dp[0] = 1.0;

  const cdf: number[] = [0]; // index 0 ↔ 0 gold spent

  for (let roll = 1; roll <= maxRolls; roll++) {
    // Iterate from high to low so transitions don't double-count
    for (let c = Math.min(need - 1, dp.length - 2); c >= 0; c--) {
      if (dp[c] < 1e-12) continue;
      const remInPool = POOL_SIZE[cost] - owned - out - c;
      const p = pShop(cost, level, Math.max(0, remInPool));
      const moved = dp[c] * p;
      dp[c + 1] += moved;
      dp[c] -= moved;
    }
    cdf.push(Math.min(1, dp[need]));
  }

  const findGold = (threshold: number): number | null => {
    const idx = cdf.findIndex((v) => v >= threshold);
    return idx === -1 ? null : idx * 2;
  };

  const budgetIdx = Math.min(Math.floor(goldBudget / 2), cdf.length - 1);

  return {
    cdf,
    p50Gold: findGold(0.5),
    p80Gold: findGold(0.8),
    p95Gold: findGold(0.95),
    pAtBudget: cdf[budgetIdx] ?? 0,
  };
}
