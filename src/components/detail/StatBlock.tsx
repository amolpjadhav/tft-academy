import type { ItemStats } from "@/types/item";

// Max value per stat across all items in Set 17 — used to normalise bar width
const STAT_MAX: Record<keyof ItemStats, number> = {
  ad:           50,
  ap:           80,
  attack_speed: 30,
  crit_chance:  35,
  damage_amp:   15,
  armor:        60,
  magic_resist: 50,
  hp:           800,
  mana:         30,
  omnivamp:     20,
  durability:   20,
};

const STAT_META: Record<keyof ItemStats, { label: string; color: string; trackColor: string; suffix: string }> = {
  ad:           { label: "Attack Damage",  color: "bg-orange-400",  trackColor: "bg-orange-400/15",  suffix: " AD" },
  ap:           { label: "Ability Power",  color: "bg-violet-400",  trackColor: "bg-violet-400/15",  suffix: " AP" },
  attack_speed: { label: "Attack Speed",   color: "bg-yellow-400",  trackColor: "bg-yellow-400/15",  suffix: "% AS" },
  crit_chance:  { label: "Crit Chance",    color: "bg-amber-400",   trackColor: "bg-amber-400/15",   suffix: "% Crit" },
  damage_amp:   { label: "Damage Amp",     color: "bg-red-400",     trackColor: "bg-red-400/15",     suffix: "% Amp" },
  armor:        { label: "Armor",          color: "bg-sky-400",     trackColor: "bg-sky-400/15",     suffix: " Armor" },
  magic_resist: { label: "Magic Resist",   color: "bg-blue-400",    trackColor: "bg-blue-400/15",    suffix: " MR" },
  hp:           { label: "Health",         color: "bg-emerald-400", trackColor: "bg-emerald-400/15", suffix: " HP" },
  mana:         { label: "Mana",           color: "bg-indigo-400",  trackColor: "bg-indigo-400/15",  suffix: " Mana" },
  omnivamp:     { label: "Omnivamp",       color: "bg-green-400",   trackColor: "bg-green-400/15",   suffix: "% Vamp" },
  durability:   { label: "Durability",     color: "bg-teal-400",    trackColor: "bg-teal-400/15",    suffix: "% Dur" },
};

interface StatBlockProps {
  stats: ItemStats;
}

export default function StatBlock({ stats }: StatBlockProps) {
  const entries = (Object.entries(stats) as [keyof ItemStats, number][]).filter(
    ([, v]) => v !== undefined && v !== 0
  );

  if (entries.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
        Stats
      </h3>
      <div className="space-y-2.5">
        {entries.map(([key, value]) => {
          const meta = STAT_META[key];
          const max  = STAT_MAX[key];
          const pct  = Math.min(100, Math.round((value / max) * 100));

          return (
            <div key={key} className="flex items-center gap-3">
              {/* Label */}
              <span className="text-[11px] text-text-muted w-24 shrink-0 leading-none">
                {meta.label}
              </span>

              {/* Bar track */}
              <div className={`flex-1 h-2 rounded-full ${meta.trackColor} overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${meta.color} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Value */}
              <span className="text-[11px] font-bold text-text-primary w-16 text-right shrink-0 leading-none tabular-nums">
                +{value}{meta.suffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
