import type { Champion, ComputedStats } from "@/types/champion";
import type { Item } from "@/types/item";

export const STAR_HP_MULT: Record<1 | 2 | 3, number> = { 1: 1, 2: 1.8, 3: 3.24 };
export const STAR_AD_MULT: Record<1 | 2 | 3, number> = { 1: 1, 2: 1.8, 3: 3.24 };

// ── Trait stat bonuses ──────────────────────────────────────────────────────
export interface TraitStatBonus {
  hp?: number;            // flat HP
  hpPct?: number;         // % of base star-scaled HP (e.g. Brawler)
  armor?: number;         // flat Armor
  magicResist?: number;   // flat MR
  adPct?: number;         // % of base star-scaled AD (e.g. Marauder, Rogue)
  ap?: number;            // flat AP
  apPct?: number;         // % bonus applied to existing AP from items
  attackSpeedPct?: number;// additive % AS (e.g. 15 = +15%)
  critChance?: number;    // flat crit %
  omnivamp?: number;      // flat omnivamp %
  durability?: number;    // flat damage reduction %
  damageAmp?: number;     // flat damage amp %
}

// Per-trait, per-breakpoint bonuses keyed by trait name → breakpoint display label
export interface TraitBonusTier {
  minUnits: number;
  label: string;         // e.g. "(2)" or "(4)"
  effectLabel: string;   // short human-readable e.g. "+20% HP"
  bonus: TraitStatBonus;
}

// Traits with quantifiable per-champion stat bonuses
// Only include traits where the bonus applies directly to the individual champion's stats
export const TRAIT_BONUS_TIERS: Record<string, TraitBonusTier[]> = {
  "Bastion": [
    { minUnits: 2, label: "(2)", effectLabel: "+16 Armor & MR",  bonus: { armor: 16, magicResist: 16 } },
    { minUnits: 4, label: "(4)", effectLabel: "+40 Armor & MR",  bonus: { armor: 40, magicResist: 40 } },
    { minUnits: 6, label: "(6)", effectLabel: "+60 Armor & MR",  bonus: { armor: 60, magicResist: 60 } },
  ],
  "Brawler": [
    { minUnits: 2, label: "(2)", effectLabel: "+20% HP",  bonus: { hpPct: 20 } },
    { minUnits: 4, label: "(4)", effectLabel: "+40% HP",  bonus: { hpPct: 40 } },
    { minUnits: 6, label: "(6)", effectLabel: "+60% HP",  bonus: { hpPct: 60 } },
  ],
  "Challenger": [
    { minUnits: 2, label: "(2)", effectLabel: "+15% AS",  bonus: { attackSpeedPct: 15 } },
    { minUnits: 3, label: "(3)", effectLabel: "+22% AS",  bonus: { attackSpeedPct: 22 } },
    { minUnits: 4, label: "(4)", effectLabel: "+30% AS",  bonus: { attackSpeedPct: 30 } },
    { minUnits: 5, label: "(5)", effectLabel: "+40% AS",  bonus: { attackSpeedPct: 40 } },
  ],
  "Dark Star": [
    { minUnits: 4, label: "(4)", effectLabel: "+33% AD & AP", bonus: { adPct: 33, apPct: 33 } },
    { minUnits: 6, label: "(6)", effectLabel: "+33% AD & AP + Supermassive", bonus: { adPct: 33, apPct: 33 } },
  ],
  "Fateweaver": [
    { minUnits: 4, label: "(4)", effectLabel: "+20% Crit", bonus: { critChance: 20 } },
  ],
  "Marauder": [
    { minUnits: 2, label: "(2)", effectLabel: "+20% AD · 5% Vamp",  bonus: { adPct: 20, omnivamp: 5 } },
    { minUnits: 4, label: "(4)", effectLabel: "+35% AD · 7% Vamp",  bonus: { adPct: 35, omnivamp: 7 } },
    { minUnits: 6, label: "(6)", effectLabel: "+50% AD · 10% Vamp", bonus: { adPct: 50, omnivamp: 10 } },
  ],
  "Meeple": [
    { minUnits: 3,  label: "(3)",  effectLabel: "+100 HP",  bonus: { hp: 100 } },
    { minUnits: 5,  label: "(5)",  effectLabel: "+300 HP",  bonus: { hp: 300 } },
    { minUnits: 7,  label: "(7)",  effectLabel: "+300 HP",  bonus: { hp: 300 } },
    { minUnits: 10, label: "(10)", effectLabel: "+500 HP",  bonus: { hp: 500 } },
  ],
  "Rogue": [
    { minUnits: 2, label: "(2)", effectLabel: "+15% AD & AP", bonus: { adPct: 15, apPct: 15 } },
    { minUnits: 3, label: "(3)", effectLabel: "+30% AD & AP", bonus: { adPct: 30, apPct: 30 } },
    { minUnits: 4, label: "(4)", effectLabel: "+45% AD & AP", bonus: { adPct: 45, apPct: 45 } },
    { minUnits: 5, label: "(5)", effectLabel: "+60% AD & AP", bonus: { adPct: 60, apPct: 60 } },
  ],
  "Sniper": [
    { minUnits: 2, label: "(2)", effectLabel: "+18% Damage Amp", bonus: { damageAmp: 18 } },
    { minUnits: 3, label: "(3)", effectLabel: "+24% Damage Amp", bonus: { damageAmp: 24 } },
    { minUnits: 4, label: "(4)", effectLabel: "+28% Damage Amp", bonus: { damageAmp: 28 } },
  ],
  "N.O.V.A.": [
    { minUnits: 2, label: "(2)", effectLabel: "Power surge (champion-specific)",  bonus: {} },
    { minUnits: 5, label: "(5)", effectLabel: "Striker selector",                 bonus: {} },
  ],
  "Timebreaker": [
    { minUnits: 3, label: "(3)", effectLabel: "+15% AS (team)",    bonus: { attackSpeedPct: 15 } },
    { minUnits: 4, label: "(4)", effectLabel: "+15% AS +50% extra", bonus: { attackSpeedPct: 65 } },
  ],
  "Vanguard": [
    { minUnits: 2, label: "(2)", effectLabel: "16% HP Shield",      bonus: {} },
    { minUnits: 4, label: "(4)", effectLabel: "30% HP Shield",      bonus: {} },
    { minUnits: 6, label: "(6)", effectLabel: "40% HP Shield +10% DR", bonus: { durability: 10 } },
  ],
};

// Set of traits that have no direct per-champion stat bonus (mechanic/economy traits)
export const MECHANIC_TRAITS = new Set([
  "Anima", "Arbiter", "Primordian", "Psionic",
  "Replicator", "Shepherd", "Stargazer", "Space Groove",
  "Dark Star", "Timebreaker", "Fateweaver",
]);

export const STAR_LABELS: Record<1 | 2 | 3, string> = {
  1: "1★",
  2: "2★",
  3: "3★",
};

export function computeStats(
  champion: Champion,
  star: 1 | 2 | 3,
  slotIds: (string | null)[],
  allItems: Item[],
  activeTraitBonuses?: TraitStatBonus[]
): ComputedStats {
  const baseHP = Math.round(champion.stats.hp * STAR_HP_MULT[star]);
  const baseAD = Math.round(champion.stats.attackDamage * STAR_AD_MULT[star]);

  let hpBonus = 0;
  let adBonus = 0;
  let apBonus = 0;
  let asBonus = 0;
  let armorBonus = 0;
  let mrBonus = 0;
  let critBonus = 0;
  let manaBonus = 0;
  let omnivampBonus = 0;
  let durabilityBonus = 0;
  let damageAmpBonus = 0;

  for (const id of slotIds) {
    if (!id) continue;
    const item = allItems.find((i) => i.id === id);
    if (!item) continue;
    const s = item.stats;
    hpBonus += s.hp ?? 0;
    adBonus += s.ad ?? 0;
    apBonus += s.ap ?? 0;
    asBonus += s.attack_speed ?? 0;
    armorBonus += s.armor ?? 0;
    mrBonus += s.magic_resist ?? 0;
    critBonus += s.crit_chance ?? 0;
    manaBonus += s.mana ?? 0;
    omnivampBonus += s.omnivamp ?? 0;
    durabilityBonus += s.durability ?? 0;
    damageAmpBonus += s.damage_amp ?? 0;
  }

  // Apply trait bonuses after items so apPct multiplies the item AP
  if (activeTraitBonuses && activeTraitBonuses.length > 0) {
    const itemApBonus = apBonus; // snapshot before trait flat AP
    for (const b of activeTraitBonuses) {
      if (b.hp)             hpBonus     += b.hp;
      if (b.hpPct)          hpBonus     += Math.round(baseHP * b.hpPct / 100);
      if (b.armor)          armorBonus  += b.armor;
      if (b.magicResist)    mrBonus     += b.magicResist;
      if (b.adPct)          adBonus     += Math.round(baseAD * b.adPct / 100);
      if (b.ap)             apBonus     += b.ap;
      if (b.apPct)          apBonus     += Math.round(itemApBonus * b.apPct / 100);
      if (b.attackSpeedPct) asBonus     += b.attackSpeedPct;
      if (b.critChance)     critBonus   += b.critChance;
      if (b.omnivamp)       omnivampBonus   += b.omnivamp;
      if (b.durability)     durabilityBonus += b.durability;
      if (b.damageAmp)      damageAmpBonus  += b.damageAmp;
    }
  }

  const totalAS = Math.min(champion.stats.attackSpeed + asBonus / 100, 5.0);

  return {
    hp: baseHP + hpBonus,
    attackDamage: baseAD + adBonus,
    abilityPower: apBonus,
    attackSpeed: Math.round(totalAS * 100) / 100,
    armor: champion.stats.armor + armorBonus,
    magicResist: champion.stats.magicResist + mrBonus,
    critChance: Math.min(critBonus, 100),
    maxMana: champion.stats.maxMana + manaBonus,
    omnivamp: omnivampBonus,
    durability: durabilityBonus,
    damageAmp: damageAmpBonus,
    hpBonus,
    adBonus,
    apBonus,
    asBonus: Math.round(asBonus / 100 * 100) / 100,
    armorBonus,
    mrBonus,
    omnivampBonus,
    durabilityBonus,
    damageAmpBonus,
  };
}

// Reference maximums for bar scaling
const REF = {
  hp: 4500,
  ad: 350,
  ap: 250,
  as: 2.4,
  armor: 200,
  mr: 200,
};

export function calcPowerScore(stats: ComputedStats, champion: Champion): number {
  const hpScore   = Math.min(stats.hp / REF.hp, 1) * 22;
  const adScore   = Math.min(stats.attackDamage / REF.ad, 1) * 22;
  const apScore   = Math.min(stats.abilityPower / REF.ap, 1) * 15;
  const asScore   = Math.min((stats.attackSpeed - 0.5) / (REF.as - 0.5), 1) * 15;
  const defScore  = Math.min((stats.armor + stats.magicResist) / (REF.armor + REF.mr), 1) * 16;
  const critScore = Math.min(stats.critChance / 100, 1) * 10;

  const raw = hpScore + adScore + apScore + asScore + defScore + critScore;

  // Role synergy bonus (up to 10 pts) — reward items matching champion role
  let synergy = 0;
  if (champion.role === "ad_carry" && stats.attackDamage > 80) synergy += 5;
  if (champion.role === "ap_carry" && stats.abilityPower > 60) synergy += 5;
  if (champion.role === "tank" && stats.armor + stats.magicResist > 80) synergy += 5;
  if (champion.role === "melee_carry" && (stats.attackDamage > 80 || stats.abilityPower > 60)) synergy += 5;
  if (stats.critChance >= 35 && (champion.role === "ad_carry" || champion.role === "melee_carry")) synergy += 5;

  return Math.min(Math.round(raw + synergy), 100);
}

export interface PowerTier {
  label: string;
  color: string;
  bgColor: string;
  description: string;
  emoji: string;
}

export function getPowerTier(score: number): PowerTier {
  if (score >= 88) return { label: "WIN CONDITION", color: "text-accent-gold", bgColor: "bg-accent-gold", description: "Fully powered. This unit will carry your game.", emoji: "👑" };
  if (score >= 72) return { label: "CARRY", color: "text-green-400", bgColor: "bg-green-500", description: "Strong enough to decide fights. Good item synergy.", emoji: "🚀" };
  if (score >= 55) return { label: "STRONG", color: "text-blue-400", bgColor: "bg-blue-500", description: "Solid stats. A real threat on the board.", emoji: "💪" };
  if (score >= 38) return { label: "AVERAGE", color: "text-yellow-400", bgColor: "bg-yellow-500", description: "Getting there. Add more items or star up.", emoji: "⚡" };
  if (score >= 20) return { label: "WEAK", color: "text-orange-400", bgColor: "bg-orange-500", description: "Needs items and stars to be effective.", emoji: "🌱" };
  return { label: "UNEQUIPPED", color: "text-text-muted", bgColor: "bg-white/20", description: "Pick a champion and add items to see their power.", emoji: "🎯" };
}

export type TipType = "good" | "warn" | "info";
export interface Tip { type: TipType; message: string }

export function getSynergyTips(champion: Champion, slots: (string | null)[], allItems: Item[]): Tip[] {
  const items = slots.map((id) => allItems.find((i) => i.id === id)).filter(Boolean) as Item[];
  const tips: Tip[] = [];

  const hasAD = items.some((i) => (i.stats.ad ?? 0) > 0);
  const hasAP = items.some((i) => (i.stats.ap ?? 0) > 0);
  const hasTank = items.some((i) => (i.stats.hp ?? 0) > 100 || (i.stats.armor ?? 0) > 0 || (i.stats.magic_resist ?? 0) > 0);
  const hasCrit = items.some((i) => (i.stats.crit_chance ?? 0) > 0);
  const hasAS = items.some((i) => (i.stats.attack_speed ?? 0) > 0);
  const filledSlots = items.length;

  if (filledSlots === 0) {
    tips.push({ type: "info", message: "Click an item slot to equip items and see how they power up this champion." });
    return tips;
  }

  // Role-specific tips
  if (champion.role === "ad_carry") {
    if (hasAD) tips.push({ type: "good", message: "AD items ✓ — scaling with this carry's attack damage." });
    else tips.push({ type: "warn", message: "No AD items — try Infinity Edge, Deathblade, or Giant Slayer." });
    if (hasCrit) tips.push({ type: "good", message: "Crit ✓ — make sure to also equip Infinity Edge so abilities can crit." });
    if (hasAP && !hasAD) tips.push({ type: "warn", message: "AP items on an AD carry — AP won't benefit this champion much." });
  }

  if (champion.role === "ap_carry") {
    if (hasAP) tips.push({ type: "good", message: "AP items ✓ — amplifying this mage's ability damage." });
    else tips.push({ type: "warn", message: "No AP items — try Rabadon's Deathcap, Jeweled Gauntlet, or Blue Buff." });
    if (hasCrit && hasAP) tips.push({ type: "good", message: "Jeweled Gauntlet + crit ✓ — abilities can now critically strike!" });
    if (hasAD && !hasAP) tips.push({ type: "warn", message: "AD items on an AP carry — consider swapping for Ability Power items." });
  }

  if (champion.role === "melee_carry") {
    if (hasAD || hasAP) tips.push({ type: "good", message: "Damage items ✓ — this melee carry scales with both AD and AP." });
    if (!hasAD && !hasAP) tips.push({ type: "warn", message: "No damage items — melee carries need AD or AP to deal damage." });
    if (hasTank) tips.push({ type: "good", message: "Survivability ✓ — helps this frontline carry stay alive longer." });
  }

  if (champion.role === "tank") {
    if (hasTank) tips.push({ type: "good", message: "Tank items ✓ — great for maximum durability." });
    else tips.push({ type: "warn", message: "No defensive items — tanks should run HP, Armor, and MR items." });
    if (hasAD || hasAP) tips.push({ type: "info", message: "Damage items on a tank can work, but they get less value from them." });
  }

  // Universal tips
  if (filledSlots < 3) {
    tips.push({ type: "info", message: `${3 - filledSlots} item slot${3 - filledSlots > 1 ? "s" : ""} still empty — full 3 items makes a big difference.` });
  }

  if (filledSlots === 3 && !hasTank && champion.role !== "tank") {
    tips.push({ type: "info", message: "Full damage build — consider one survivability item if you keep dying." });
  }

  return tips;
}

export const COST_COLORS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "#9B9B9B",
  2: "#2AAA5C",
  3: "#4A90D9",
  4: "#9B59B6",
  5: "#C89B3C",
};

export const COST_BG: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "bg-neutral-500/20 border-neutral-500/40",
  2: "bg-green-600/20 border-green-500/40",
  3: "bg-blue-600/20 border-blue-500/40",
  4: "bg-purple-600/20 border-purple-500/40",
  5: "bg-amber-500/20 border-amber-400/40",
};

export const COST_TEXT: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "text-neutral-400",
  2: "text-green-400",
  3: "text-blue-400",
  4: "text-purple-400",
  5: "text-amber-300",
};

export const REF_STATS = REF;
