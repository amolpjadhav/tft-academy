export type ItemCategory = "carry" | "mage" | "tank";
export type ItemTier = "S" | "A" | "B" | "C";

export interface ItemStats {
  ad?: number;
  ap?: number;
  attack_speed?: number;
  crit_chance?: number;
  armor?: number;
  magic_resist?: number;
  hp?: number;
  mana?: number;
}

export interface ItemPassive {
  name: string;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  icon: string;
  category: ItemCategory;
  tier: ItemTier;
  components: [string, string];
  stats: ItemStats;
  passive: ItemPassive;
  why_it_matters: string;
  best_on: string[];
  priority: number;
}

export interface Component {
  id: string;
  name: string;
  icon: string;
  stats: ItemStats;
}

export interface ItemsData {
  _meta: { set: number; version: string; notes: string };
  components: Component[];
  items: Item[];
}
