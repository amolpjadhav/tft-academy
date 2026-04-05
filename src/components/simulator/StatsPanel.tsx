import type { Champion, ComputedStats } from "@/types/champion";
import type { Tip } from "@/utils/simulator";
import { REF_STATS } from "@/utils/simulator";
import type { Item } from "@/types/item";
import type { StatDeltas } from "@/pages/simulator";

// ── Floating +X badge ──────────────────────────────────────────────────────

function FloatBadge({ value, animKey }: { value: string; animKey: number }) {
  return (
    <span
      key={animKey}
      className="animate-float-up absolute -top-0.5 right-0 text-green-400 text-[10px] font-black bg-green-950/80 border border-green-500/40 rounded-md px-1.5 py-0.5 leading-none z-10 whitespace-nowrap"
    >
      {value}
    </span>
  );
}

// ── Stat bar ───────────────────────────────────────────────────────────────

interface StatBarProps {
  label: string;
  sublabel?: string;
  base: number;
  bonus: number;
  max: number;
  unit?: string;
  decimals?: number;
  color?: string;
  floatValue?: string;
  deltaKey?: number;
}

function StatBar({
  label,
  sublabel,
  base,
  bonus,
  max,
  unit = "",
  decimals = 0,
  color = "bg-accent-gold",
  floatValue,
  deltaKey,
}: StatBarProps) {
  const baseWidth = Math.min((base / max) * 100, 100);
  const bonusWidth = Math.min((bonus / max) * 100, Math.max(0, 100 - baseWidth));
  const total =
    decimals > 0
      ? (base + bonus).toFixed(decimals)
      : Math.round(base + bonus).toLocaleString();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[11px] text-text-muted font-medium">{label}</span>
          {sublabel && (
            <span className="text-[9px] text-text-muted/60 ml-1">({sublabel})</span>
          )}
        </div>
        <div className="relative flex items-center gap-1">
          {floatValue && deltaKey !== undefined && (
            <FloatBadge value={floatValue} animKey={deltaKey} />
          )}
          <span className="text-xs font-bold text-text-primary tabular-nums">
            {total}{unit}
            {bonus > 0 && (
              <span className="text-accent-gold ml-1 text-[10px]">
                (+{decimals > 0 ? bonus.toFixed(decimals) : Math.round(bonus)}{unit})
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full flex">
          {base > 0 && (
            <div
              className="h-full bg-white/25 transition-all duration-500"
              style={{ width: `${baseWidth}%`, borderRadius: bonus > 0 ? "0" : "0 9999px 9999px 0" }}
            />
          )}
          {bonus > 0 && (
            <div
              className={`h-full ${color} rounded-r-full transition-all duration-500`}
              style={{ width: `${bonusWidth}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Passive-only row (%, no bar needed if base=0) ──────────────────────────

function PassiveStat({
  label,
  value,
  unit = "%",
  color,
  icon,
  hint,
  floatValue,
  deltaKey,
}: {
  label: string;
  value: number;
  unit?: string;
  color: string;
  icon: string;
  hint?: string;
  floatValue?: string;
  deltaKey?: number;
}) {
  const isEmpty = value <= 0;
  return (
    <div className="flex items-center justify-between py-1.5 border-t border-white/5">
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm shrink-0">{icon}</span>
        <div className="min-w-0">
          <span className="text-[11px] text-text-muted font-medium">{label}</span>
          {isEmpty && hint && (
            <p className="text-[9px] text-text-muted/50 leading-tight truncate">{hint}</p>
          )}
        </div>
      </div>
      <div className="relative flex items-center shrink-0 ml-2">
        {floatValue && deltaKey !== undefined && (
          <FloatBadge value={floatValue} animKey={deltaKey} />
        )}
        {isEmpty ? (
          <span className="text-xs text-text-muted/40 tabular-nums">—</span>
        ) : (
          <span className={`text-xs font-bold tabular-nums ${color}`}>
            {value}{unit}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Star compare table ─────────────────────────────────────────────────────

function StarCompareTable({
  rows,
  currentStar,
}: {
  rows: { label: string; values: [number, number, number]; unit?: string }[];
  currentStar: 1 | 2 | 3;
}) {
  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      <div className="grid grid-cols-4 bg-bg-elevated px-3 py-1.5">
        <span className="text-[10px] text-text-muted font-semibold">STAT</span>
        {(["1★", "2★", "3★"] as const).map((s, i) => (
          <span
            key={s}
            className={`text-[10px] text-center font-semibold ${
              i + 1 === currentStar ? "text-accent-gold" : "text-text-muted"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      {rows.map(({ label, values, unit }, idx) => (
        <div
          key={label}
          className={`grid grid-cols-4 px-3 py-2 ${
            idx % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"
          }`}
        >
          <span className="text-[11px] text-text-secondary">{label}</span>
          {values.map((v, i) => (
            <span
              key={i}
              className={`text-[11px] text-center tabular-nums font-medium transition-colors ${
                i + 1 === currentStar
                  ? "text-accent-gold"
                  : i === 2
                  ? "text-white/50"
                  : "text-text-secondary"
              }`}
            >
              {Number.isInteger(v) ? v.toLocaleString() : v.toFixed(2)}
              {unit}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

interface Props {
  champion: Champion;
  star: 1 | 2 | 3;
  stats: ComputedStats;
  slots: (string | null)[];
  tips: Tip[];
  recommendedItems: Item[];
  onRecommendItem: (item: Item) => void;
  deltas: StatDeltas;
  deltaKey: number;
}

export default function StatsPanel({
  champion,
  star,
  stats,
  tips,
  recommendedItems,
  onRecommendItem,
  deltas,
  deltaKey,
}: Props) {
  const starMult = [1, 1.8, 3.24][star - 1];
  const baseHP = Math.round(champion.stats.hp * starMult);
  const baseAD = Math.round(champion.stats.attackDamage * starMult);
  const starLabel = ["1★", "2★", "3★"][star - 1];

  return (
    <div className="flex flex-col gap-4">

      {/* ── All stats ── */}
      <div className="bg-bg-elevated rounded-2xl border border-white/8 p-4 flex flex-col gap-2.5">
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-0.5">
          Stats · {starLabel}
        </p>

        {/* Health */}
        <StatBar
          label="Health"
          base={baseHP} bonus={stats.hpBonus} max={REF_STATS.hp}
          color="bg-red-400"
          floatValue={deltas.hp ? `+${deltas.hp} HP` : undefined}
          deltaKey={deltaKey}
        />

        {/* Basic Attack Damage = base champion AD, no item bonus shown */}
        <StatBar
          label="Basic Attack Damage"
          sublabel="base only"
          base={baseAD} bonus={0} max={REF_STATS.ad}
          color="bg-yellow-500"
        />

        {/* Attack Damage = total (base + items) */}
        <StatBar
          label="Attack Damage"
          sublabel="with items"
          base={baseAD} bonus={stats.adBonus} max={REF_STATS.ad}
          color="bg-accent-gold"
          floatValue={deltas.ad ? `+${deltas.ad} AD` : undefined}
          deltaKey={deltaKey}
        />

        {/* Ability Power */}
        <StatBar
          label="Ability Power"
          base={0} bonus={stats.abilityPower} max={REF_STATS.ap}
          color="bg-blue-400"
          floatValue={deltas.ap ? `+${deltas.ap} AP` : undefined}
          deltaKey={deltaKey}
        />

        {/* Armor */}
        <StatBar
          label="Armor"
          base={champion.stats.armor} bonus={stats.armorBonus} max={REF_STATS.armor}
          color="bg-amber-400"
          floatValue={deltas.armor ? `+${deltas.armor} Armor` : undefined}
          deltaKey={deltaKey}
        />

        {/* Magic Resist */}
        <StatBar
          label="Magic Resist"
          base={champion.stats.magicResist} bonus={stats.mrBonus} max={REF_STATS.mr}
          color="bg-purple-400"
          floatValue={deltas.mr ? `+${deltas.mr} MR` : undefined}
          deltaKey={deltaKey}
        />

        {/* Attack Speed */}
        <StatBar
          label="Attack Speed"
          base={champion.stats.attackSpeed} bonus={stats.asBonus} max={REF_STATS.as}
          decimals={2} unit="x"
          color="bg-green-400"
          floatValue={deltas.as ? `+${deltas.as.toFixed(2)} AS` : undefined}
          deltaKey={deltaKey}
        />

        {/* Divider for %-based stats */}
        <div className="border-t border-white/8 mt-1 pt-1 flex flex-col gap-0">

          {/* Crit Chance */}
          <PassiveStat
            label="Crit Chance"
            value={stats.critChance}
            unit="%"
            color="text-orange-300"
            icon="🎯"
            hint="Equip Infinity Edge, Jeweled Gauntlet, or Last Whisper"
          />

          {/* Omnivamp */}
          <PassiveStat
            label="Omnivamp"
            value={stats.omnivamp}
            unit="%"
            color="text-red-300"
            icon="🩸"
            hint="Equip Bloodthirster or Hextech Gunblade"
            floatValue={deltas.omnivamp ? `+${deltas.omnivamp}% Vamp` : undefined}
            deltaKey={deltaKey}
          />

          {/* Durability */}
          <PassiveStat
            label="Durability"
            value={stats.durability}
            unit="%"
            color="text-sky-300"
            icon="🛡️"
            hint="Equip Steadfast Heart or Bramble Vest"
            floatValue={deltas.durability ? `+${deltas.durability}% DR` : undefined}
            deltaKey={deltaKey}
          />

          {/* Damage Amp */}
          <PassiveStat
            label="Damage Amp"
            value={stats.damageAmp}
            unit="%"
            color="text-rose-300"
            icon="⚡"
            hint="Equip Giant Slayer or Last Whisper"
            floatValue={deltas.damageAmp ? `+${deltas.damageAmp}% Amp` : undefined}
            deltaKey={deltaKey}
          />
        </div>

        {/* Range + Mana always visible */}
        <div className="border-t border-white/5 pt-2 flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-text-muted font-medium">Range</span>
            <span className="text-xs font-bold text-text-primary">
              {champion.stats.range} hex{champion.stats.range !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-text-muted font-medium">Mana</span>
            <span className="text-xs font-bold text-text-primary">
              {champion.stats.initialMana} / {stats.maxMana}
            </span>
          </div>
        </div>
      </div>

      {/* ── Star scaling table ── */}
      <div>
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-2">
          Star Scaling
        </p>
        <StarCompareTable
          currentStar={star}
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

      {/* ── Synergy tips ── */}
      {tips.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest">
            Synergy Tips
          </p>
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

      {/* ── Recommended items ── */}
      {recommendedItems.length > 0 && (
        <div>
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-2">
            Recommended Items
          </p>
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
                  <p className="text-xs font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-text-muted">{item.passive.name}</p>
                </div>
                <span
                  className={`text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded border ${
                    item.tier === "S"
                      ? "text-accent-gold border-accent-gold/40 bg-accent-gold/10"
                      : "text-text-muted border-white/10"
                  }`}
                >
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
