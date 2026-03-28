import type { Champion } from "@/types/champion";
import type { Item } from "@/types/item";
import { COST_TEXT, STAR_HP_MULT, STAR_AD_MULT, getPowerTier } from "@/utils/simulator";

const STAR_GLOW: Record<1 | 2 | 3, string> = {
  1: "shadow-[0_0_24px_rgba(120,120,140,0.4)]",
  2: "shadow-[0_0_28px_rgba(192,192,210,0.55)]",
  3: "shadow-[0_0_36px_rgba(200,160,50,0.75)]",
};

const STAR_BORDER: Record<1 | 2 | 3, string> = {
  1: "border-white/20",
  2: "border-white/40",
  3: "border-accent-gold/60",
};

const TIER_BADGE: Record<string, string> = {
  S: "bg-accent-gold/80 text-black",
  A: "bg-purple-500/80 text-white",
  B: "bg-blue-500/80 text-white",
  C: "bg-white/20 text-white",
};

interface Props {
  champion: Champion;
  star: 1 | 2 | 3;
  onStarChange: (s: 1 | 2 | 3) => void;
  slots: (string | null)[];
  equippedItems: (Item | null)[];
  onSlotClick: (index: number) => void;
  score: number;
  scoreDelta?: number;
  deltaKey: number;
}

export default function BuildPanel({
  champion,
  star,
  onStarChange,
  equippedItems,
  onSlotClick,
  score,
  scoreDelta,
  deltaKey,
}: Props) {
  const costColor = COST_TEXT[champion.cost];
  const scaledHP = Math.round(champion.stats.hp * STAR_HP_MULT[star]);
  const scaledAD = Math.round(champion.stats.attackDamage * STAR_AD_MULT[star]);
  const tier = getPowerTier(score);

  const scoreRingColor =
    score >= 88 ? "#F59E0B"
    : score >= 72 ? "#10B981"
    : score >= 55 ? "#3B82F6"
    : score >= 38 ? "#EAB308"
    : "#6B7280";

  const RADIUS = 22;
  const CIRC = 2 * Math.PI * RADIUS;
  const dash = (score / 100) * CIRC;

  return (
    <div className="flex flex-col gap-4">
      {/* Champion portrait + info */}
      <div className="relative flex flex-col items-center gap-3">
        {/* Splash image */}
        <div
          className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 ${STAR_BORDER[star]} ${STAR_GLOW[star]} transition-all duration-300`}
        >
          <img
            src={champion.splashIcon || champion.icon}
            alt={champion.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (img.src !== champion.icon) img.src = champion.icon;
            }}
          />
          {/* Cost badge */}
          <span
            className={`absolute bottom-2 left-2 text-xs font-black px-2 py-0.5 rounded-full bg-bg-base/80 ${costColor}`}
          >
            {champion.cost}G
          </span>

          {/* Mini power ring overlay — bottom right of portrait */}
          <div className="absolute bottom-1.5 right-1.5">
            <div className="relative">
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r={RADIUS} fill="rgba(0,0,0,0.55)" />
                <circle
                  cx="26"
                  cy="26"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="4.5"
                />
                <circle
                  cx="26"
                  cy="26"
                  r={RADIUS}
                  fill="none"
                  stroke={scoreRingColor}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${CIRC}`}
                  transform="rotate(-90 26 26)"
                  style={{
                    transition: "stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1), stroke 0.5s",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-xs font-black leading-none tabular-nums"
                  style={{ color: scoreRingColor }}
                >
                  {score}
                </span>
                <span className="text-[7px] text-white/40 leading-none">PWR</span>
              </div>
            </div>
            {/* Score delta popup */}
            {scoreDelta && (
              <div
                key={`sdelta-${deltaKey}`}
                className="animate-float-up absolute -top-3 -right-1 bg-green-500 text-white text-[9px] font-black rounded-full px-1 py-0.5 leading-none whitespace-nowrap"
              >
                +{scoreDelta}
              </div>
            )}
          </div>
        </div>

        {/* Name + traits */}
        <div className="text-center">
          <h2 className="text-text-primary font-heading font-bold text-xl leading-tight">
            {champion.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-1 mt-1.5">
            {champion.traits.map((t) => (
              <span
                key={t}
                className="text-[11px] bg-white/8 text-text-secondary px-2 py-0.5 rounded-full border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
          {/* Tier label below name */}
          {score > 0 && (
            <p className={`text-xs font-bold mt-1.5 ${tier.color}`}>
              {tier.emoji} {tier.label}
            </p>
          )}
        </div>
      </div>

      {/* Star selector */}
      <div className="flex justify-center gap-2">
        {([1, 2, 3] as const).map((s) => (
          <button
            key={s}
            onClick={() => onStarChange(s)}
            className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 ${
              star === s
                ? s === 3
                  ? "bg-accent-gold/15 border-accent-gold/60 text-accent-gold shadow-glow"
                  : s === 2
                  ? "bg-white/10 border-white/40 text-white"
                  : "bg-white/5 border-white/20 text-text-primary"
                : "border-white/8 text-text-muted hover:border-white/20 hover:text-text-secondary"
            }`}
          >
            <span className="text-base">{"★".repeat(s)}</span>
            <span className="text-[10px] font-medium opacity-70">
              {Math.round(champion.stats.hp * STAR_HP_MULT[s]).toLocaleString()} HP
            </span>
          </button>
        ))}
      </div>

      {/* Quick base stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "HP", value: scaledHP.toLocaleString() },
          { label: "AD", value: scaledAD.toString() },
          { label: "AS", value: champion.stats.attackSpeed.toFixed(2) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-bg-elevated rounded-lg p-2 text-center border border-white/5">
            <p className="text-text-muted text-[10px]">{label}</p>
            <p className="text-text-primary text-sm font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Item slots */}
      <div>
        <p className="text-text-muted text-xs mb-2 font-medium uppercase tracking-wide">
          Items {equippedItems.filter(Boolean).length > 0 && `· ${equippedItems.filter(Boolean).length}/3 equipped`}
        </p>
        <div className="flex gap-3 justify-center">
          {[0, 1, 2].map((i) => {
            const item = equippedItems[i];
            return (
              <button
                key={`${i}-${item?.id ?? "empty"}`}
                onClick={() => onSlotClick(i)}
                className={`relative w-16 h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden group ${
                  item
                    ? "border-white/30 hover:border-white/50 bg-bg-elevated animate-pop-in"
                    : "border-dashed border-white/20 hover:border-accent-gold/40 bg-bg-elevated/50 hover:bg-accent-gold/5"
                }`}
              >
                {item ? (
                  <>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <span className="text-white text-base opacity-0 group-hover:opacity-100 transition-opacity">
                        ✕
                      </span>
                    </div>
                    {/* Tier badge */}
                    <span
                      className={`absolute top-0.5 right-0.5 text-[9px] font-bold px-1 rounded leading-none py-0.5 ${
                        TIER_BADGE[item.tier] ?? TIER_BADGE.C
                      }`}
                    >
                      {item.tier}
                    </span>
                    {/* Item name tooltip on hover */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[8px] text-center py-0.5 leading-tight opacity-0 group-hover:opacity-100 transition-opacity truncate px-0.5">
                      {item.name}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-text-muted group-hover:text-accent-gold/60 transition-colors gap-0.5">
                    <span className="text-xl leading-none">+</span>
                    <span className="text-[8px] leading-none">Slot {i + 1}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Equipped item stat summary row */}
        {equippedItems.some(Boolean) && (
          <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
            {equippedItems
              .filter(Boolean)
              .flatMap((item) =>
                Object.entries(item!.stats)
                  .filter(([, v]) => v)
                  .map(([k, v]) => {
                    const labels: Record<string, { label: string; color: string }> = {
                      ad:           { label: `+${v} AD`,     color: "text-yellow-400" },
                      ap:           { label: `+${v} AP`,     color: "text-blue-400"   },
                      attack_speed: { label: `+${v}% AS`,    color: "text-green-400"  },
                      crit_chance:  { label: `+${v}% Crit`,  color: "text-orange-400" },
                      armor:        { label: `+${v} Armor`,  color: "text-amber-300"  },
                      magic_resist: { label: `+${v} MR`,     color: "text-purple-400" },
                      hp:           { label: `+${v} HP`,     color: "text-red-400"    },
                      mana:         { label: `+${v} Mana`,   color: "text-sky-400"    },
                    };
                    const m = labels[k];
                    if (!m) return null;
                    return (
                      <span
                        key={`${item!.id}-${k}`}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/5 border border-white/8 ${m.color}`}
                      >
                        {m.label}
                      </span>
                    );
                  })
              )
              .filter(Boolean)}
          </div>
        )}

        {!equippedItems.some(Boolean) && (
          <p className="text-center text-text-muted text-[11px] mt-2">
            Click a slot to equip items
          </p>
        )}
      </div>

      {/* Ability */}
      <div className="bg-bg-elevated rounded-xl border border-white/8 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-purple-400 text-xs">✦</span>
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wide">Ability</p>
        </div>
        <p className="text-accent-purple-light text-sm font-semibold leading-snug mb-1">
          {champion.ability.name || "—"}
        </p>
        <p className="text-text-secondary text-xs leading-relaxed line-clamp-4">
          {champion.ability.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
