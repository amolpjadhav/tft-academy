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
  ability: {
    name: string;
    description: string;
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
