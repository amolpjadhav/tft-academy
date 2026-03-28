import type { ItemStats } from "@/types/item";

const STAT_LABELS: Record<keyof ItemStats, (v: number) => string> = {
  ad: (v) => `+${v} AD`,
  ap: (v) => `+${v} AP`,
  attack_speed: (v) => `+${v}% AS`,
  crit_chance: (v) => `+${v}% Crit`,
  armor: (v) => `+${v} Armor`,
  magic_resist: (v) => `+${v} MR`,
  hp: (v) => `+${v} HP`,
  mana: (v) => `+${v} Mana`,
  omnivamp: (v) => `+${v}% Omnivamp`,
  durability: (v) => `+${v}% Durability`,
  damage_amp: (v) => `+${v}% Damage Amp`,
};

export function formatStats(stats: ItemStats): string[] {
  return (Object.entries(stats) as [keyof ItemStats, number][])
    .filter(([, v]) => v !== undefined && v !== 0)
    .map(([key, value]) => STAT_LABELS[key](value));
}
