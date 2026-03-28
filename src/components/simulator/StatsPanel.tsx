import type { Champion } from "@/types/champion";
import type { ComputedStats } from "@/types/champion";
import type { Tip } from "@/utils/simulator";
import { calcPowerScore, getPowerTier, REF_STATS } from "@/utils/simulator";
import type { Item } from "@/types/item";

interface StatBarProps {
  label: string;
  base: number;
  bonus: number;
  max: number;
  unit?: string;
  decimals?: number;
}

function StatBar({ label, base, bonus, max, unit = "", decimals = 0 }: StatBarProps) {
  const baseWidth = Math.min((base / max) * 100, 100);
  const bonusWidth = Math.min((bonus / max) * 100, 100 - baseWidth);
  const total = decimals > 0 ? (base + bonus).toFixed(decimals) : Math.round(base + bonus).toLocaleString();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-text-muted font-medium">{label}</span>
        <span className="text-xs font-bold text-text-primary tabular-nums">
          {total}{unit}
          {bonus > 0 && (
            <span className="text-accent-gold ml-1 text-[10px]">
              (+{decimals > 0 ? bonus.toFixed(decimals) : Math.round(bonus)}{unit})
            </span>
          )}
        </span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full flex">
          <div
            className="h-full bg-white/30 rounded-l-full transition-all duration-500"
            style={{ width: `${baseWidth}%` }}
          />
          {bonus > 0 && (
            <div
              className="h-full bg-accent-gold rounded-r-full transition-all duration-500"
              style={{ width: `${bonusWidth}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface StarCompareRow {
  label: string;
  values: [number, number, number];
  unit?: string;
}

function StarCompareTable({ rows }: { rows: StarCompareRow[] }) {
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      <div className="grid grid-cols-4 bg-bg-elevated px-3 py-1.5">
        <span className="text-[10px] text-text-muted font-semibold">STAT</span>
        {["1★", "2★", "3★"].map((s) => (
          <span key={s} className="text-[10px] text-text-muted text-center font-semibold">{s}</span>
        ))}
      </div>
      {rows.map(({ label, values, unit }, idx) => (
        <div
          key={label}
          className={`grid grid-cols-4 px-3 py-2 ${idx % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"}`}
        >
          <span className="text-[11px] text-text-secondary">{label}</span>
          {values.map((v, i) => (
            <span
              key={i}
              className={`text-[11px] text-center tabular-nums font-medium ${
                i === 2 ? "text-accent-gold" : i === 1 ? "text-white/80" : "text-text-secondary"
              }`}
            >
              {Number.isInteger(v) ? v.toLocaleString() : v.toFixed(2)}{unit}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

interface Props {
  champion: Champion;
  star: 1 | 2 | 3;
  stats: ComputedStats;
  slots: (string | null)[];
  tips: Tip[];
  recommendedItems: Item[];
  onRecommendItem: (item: Item) => void;
}

export default function StatsPanel({ champion, star, stats, tips, recommendedItems, onRecommendItem }: Props) {
  const score = calcPowerScore(stats, champion);
  const tier = getPowerTier(score);

  const baseHP = Math.round(champion.stats.hp * [1, 1.8, 3.24][star - 1]);
  const baseAD = Math.round(champion.stats.attackDamage * [1, 1.8, 3.24][star - 1]);

  const powerBarWidth = `${score}%`;
  const powerGradient =
    score >= 88
      ? "from-amber-400 to-yellow-300"
      : score >= 72
      ? "from-green-500 to-emerald-400"
      : score >= 55
      ? "from-blue-500 to-blue-400"
      : score >= 38
      ? "from-yellow-500 to-amber-400"
      : "from-orange-500 to-red-400";

  return (
    <div className="flex flex-col gap-4">
      {/* Power meter */}
      <div className="bg-bg-elevated rounded-2xl border border-white/8 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest">Power Level</p>
            <p className={`text-lg font-black leading-tight mt-0.5 ${tier.color}`}>
              {tier.emoji} {tier.label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-text-primary tabular-nums">{score}</p>
            <p className="text-text-muted text-[10px]">/ 100</p>
          </div>
        </div>

        {/* Power bar */}
        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full bg-gradient-to-r ${powerGradient} rounded-full transition-all duration-700`}
            style={{ width: powerBarWidth }}
          />
        </div>

        <p className="text-text-muted text-[11px] leading-relaxed">{tier.description}</p>
      </div>

      {/* Stat bars */}
      <div className="bg-bg-elevated rounded-2xl border border-white/8 p-4 flex flex-col gap-3">
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-1">Stats at {["1★","2★","3★"][star-1]}</p>

        <StatBar label="Health" base={baseHP} bonus={stats.hpBonus} max={REF_STATS.hp} />
        <StatBar label="Attack Damage" base={baseAD} bonus={stats.adBonus} max={REF_STATS.ad} />
        <StatBar label="Ability Power" base={0} bonus={stats.abilityPower} max={REF_STATS.ap} />
        <StatBar
          label="Attack Speed"
          base={champion.stats.attackSpeed}
          bonus={stats.asBonus}
          max={REF_STATS.as}
          decimals={2}
        />
        <StatBar label="Armor" base={champion.stats.armor} bonus={stats.armorBonus} max={REF_STATS.armor} />
        <StatBar label="Magic Resist" base={champion.stats.magicResist} bonus={stats.mrBonus} max={REF_STATS.mr} />

        {stats.critChance > 0 && (
          <div className="flex justify-between items-center pt-1 border-t border-white/5">
            <span className="text-[11px] text-text-muted font-medium">Crit Chance</span>
            <span className="text-xs font-bold text-accent-gold">{stats.critChance}%</span>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-white/5 pt-1">
          <span className="text-[11px] text-text-muted font-medium">Range</span>
          <span className="text-xs font-bold text-text-primary">{champion.stats.range} hex{champion.stats.range !== 1 ? "es" : ""}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-text-muted font-medium">Mana</span>
          <span className="text-xs font-bold text-text-primary">
            {champion.stats.initialMana} / {stats.maxMana}
          </span>
        </div>
      </div>

      {/* Star comparison table */}
      <div>
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-2">Star Scaling</p>
        <StarCompareTable
          rows={[
            {
              label: "HP",
              values: [
                Math.round(champion.stats.hp),
                Math.round(champion.stats.hp * 1.8),
                Math.round(champion.stats.hp * 3.24),
              ],
            },
            {
              label: "AD",
              values: [
                Math.round(champion.stats.attackDamage),
                Math.round(champion.stats.attackDamage * 1.8),
                Math.round(champion.stats.attackDamage * 3.24),
              ],
            },
            {
              label: "AS",
              values: [champion.stats.attackSpeed, champion.stats.attackSpeed, champion.stats.attackSpeed],
              unit: "x",
            },
            {
              label: "Armor",
              values: [champion.stats.armor, champion.stats.armor, champion.stats.armor],
            },
            {
              label: "MR",
              values: [champion.stats.magicResist, champion.stats.magicResist, champion.stats.magicResist],
            },
          ]}
        />
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest">Synergy Tips</p>
          {tips.map((tip, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 p-3 rounded-xl text-xs leading-snug border ${
                tip.type === "good"
                  ? "bg-green-500/8 border-green-500/20 text-green-300"
                  : tip.type === "warn"
                  ? "bg-amber-500/8 border-amber-500/20 text-amber-300"
                  : "bg-white/5 border-white/10 text-text-secondary"
              }`}
            >
              <span className="shrink-0 mt-0.5">
                {tip.type === "good" ? "✓" : tip.type === "warn" ? "⚠" : "💡"}
              </span>
              {tip.message}
            </div>
          ))}
        </div>
      )}

      {/* Recommended items */}
      {recommendedItems.length > 0 && (
        <div>
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-2">Recommended Items</p>
          <div className="flex flex-col gap-2">
            {recommendedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onRecommendItem(item)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/8 bg-bg-elevated hover:border-accent-gold/30 hover:bg-accent-gold/5 transition-all group text-left"
              >
                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-bg-surface">
                  <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-text-primary group-hover:text-accent-gold transition-colors">{item.name}</p>
                  <p className="text-[10px] text-text-muted">{item.passive.name}</p>
                </div>
                <span className={`text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded border ${
                  item.tier === "S" ? "text-accent-gold border-accent-gold/40 bg-accent-gold/10" : "text-text-muted border-white/10"
                }`}>
                  {item.tier}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
