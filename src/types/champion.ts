import type { ItemCategory } from "./item";

export type ChampionRole = ItemCategory; // ad_carry | ap_carry | melee_carry | tank

export interface ChampionStats {
  hp: number;
  maxMana: number;
  initialMana: number;
  armor: number;
  magicResist: number;
  attackSpeed: number;
  attackDamage: number;
  range: number;
}

export interface IdealItem {
  itemId: string;
  reason: string;
}

export interface BeginnerTip {
  nickname: string;
  unlockTip: string;
  kidExplain: string;
}

export type ChampionType =
  | "Magic Caster"
  | "Magic Fighter"
  | "Magic Tank"
  | "Magic Marksman"
  | "Magic Assassin"
  | "Attack Caster"
  | "Attack Fighter"
  | "Attack Tank"
  | "Attack Marksman"
  | "Attack Specialist"
  | "Attack Assassin"
  | "Hybrid Fighter";

/** Star-level scaling values shown as "1★/2★/3★" strings */
export interface StarValues {
  hp?: string;           // e.g. "700/1260/2268"
  attackDamage?: string; // e.g. "50/75/113"
  dps?: string;          // e.g. "30/45/68"
}

export interface Champion {
  id: string;
  name: string;
  cost: 1 | 2 | 3 | 4 | 5;
  traits: string[];
  role: ChampionRole;
  championType?: ChampionType;
  icon: string;
  splashIcon: string;
  stats: ChampionStats;
  /** Per-star scaling for display — overrides base stats in flashcard when present */
  starValues?: StarValues;
  ability: {
    name: string;
    description: string;
    /** Optional per-stat scaling rows shown below the description */
    scalingNotes?: { label: string; values: string; formula?: string }[];
  };
  beginnerTip?: BeginnerTip | null;
  idealItems?: IdealItem[];
}

export interface ComputedStats {
  hp: number;
  attackDamage: number;
  abilityPower: number;
  attackSpeed: number;
  armor: number;
  magicResist: number;
  critChance: number;
  maxMana: number;
  omnivamp: number;
  durability: number;
  damageAmp: number;
  // Item bonus deltas (for bar visualization)
  hpBonus: number;
  adBonus: number;
  apBonus: number;
  asBonus: number;
  armorBonus: number;
  mrBonus: number;
  omnivampBonus: number;
  durabilityBonus: number;
  damageAmpBonus: number;
}
