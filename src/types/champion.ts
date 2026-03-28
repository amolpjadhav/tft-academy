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

export interface Champion {
  id: string;
  name: string;
  cost: 1 | 2 | 3 | 4 | 5;
  traits: string[];
  role: ChampionRole;
  icon: string;
  splashIcon: string;
  stats: ChampionStats;
  ability: {
    name: string;
    description: string;
  };
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
  // Item bonus deltas (for bar visualization)
  hpBonus: number;
  adBonus: number;
  apBonus: number;
  asBonus: number;
  armorBonus: number;
  mrBonus: number;
}
