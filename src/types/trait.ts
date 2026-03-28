export type TraitType = "damage" | "magic" | "tank" | "economy" | "utility";

export interface TraitBreakpoint {
  minUnits: number;
  style: number; // 1=bronze, 2=silver, 3=gold, 4=chromatic/prismatic
}

export interface TraitChampion {
  name: string;
  cost: number;
}

export interface Trait {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: TraitType;
  breakpoints: TraitBreakpoint[];
  champions: TraitChampion[];
  championCount: number;
  isUnique: boolean;
}
