import { useRef, useEffect, useState } from "react";
import type { Champion } from "@/types/champion";
import type { Item } from "@/types/item";
import { COST_TEXT, STAR_HP_MULT } from "@/utils/simulator";

// Star-level colour tokens
const STAR_PALETTE: Record<1 | 2 | 3, { border: string; glow: string; ring: string; bg: string }> = {
  1: {
    border: "border-white/20",
    glow:   "rgba(180,180,200,0.25)",
    ring:   "rgba(180,180,200,0.5)",
    bg:     "bg-white/5",
  },
  2: {
    border: "border-sky-400/50",
    glow:   "rgba(56,189,248,0.3)",
    ring:   "rgba(56,189,248,0.7)",
    bg:     "bg-sky-500/10",
  },
  3: {
    border: "border-accent-gold/70",
    glow:   "rgba(245,158,11,0.4)",
    ring:   "rgba(245,158,11,0.9)",
    bg:     "bg-accent-gold/10",
  },
};

const TIER_BADGE: Record<string, string> = {
  S: "bg-accent-gold/80 text-black",
  A: "bg-purple-500/80 text-white",
  B: "bg-blue-500/80 text-white",
  C: "bg-white/20 text-white",
};

// Floating particles behind the portrait
const PARTICLES = [
  { size: 4, top: "12%", left: "8%",  dur: 4.2, delay: 0,   dx: 14 },
  { size: 3, top: "28%", left: "88%", dur: 5.1, delay: 1.2, dx: -10 },
  { size: 5, top: "60%", left: "6%",  dur: 3.8, delay: 0.6, dx: 18 },
  { size: 3, top: "72%", left: "92%", dur: 4.6, delay: 2.0, dx: -8 },
  { size: 4, top: "45%", left: "50%", dur: 5.5, delay: 1.8, dx: 6  },
  { size: 2, top: "18%", left: "70%", dur: 3.5, delay: 0.3, dx: -12 },
];

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
}: Props) {
  const palette = STAR_PALETTE[star];
  const costColor = COST_TEXT[champion.cost];
  const [enterKey, setEnterKey] = useState(0);
  const prevIdRef = useRef<string>("");

  useEffect(() => {
    if (prevIdRef.current !== champion.id) {
      prevIdRef.current = champion.id;
      setEnterKey((k) => k + 1);
    }
  }, [champion.id]);

  return (
    <div className="flex flex-col gap-5">

      {/* ── Hero Portrait ───────────────────────────────────────────── */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5", maxHeight: 440 }}>

        {/* Atmospheric background glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 80%, ${palette.glow} 0%, transparent 70%)`,
            transition: "background 0.6s ease",
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
                background: palette.ring,
                animation: `particle-drift ${p.dur}s ${p.delay}s ease-in-out infinite`,
                ["--dx" as string]: `${p.dx}px`,
              }}
            />
          ))}
        </div>

        {/* Splash image */}
        <div
          key={`portrait-${enterKey}`}
          className="animate-champ-enter absolute inset-0 z-20"
        >
          <img
            src={champion.splashIcon || champion.icon}
            alt={champion.name}
            className="w-full h-full object-cover object-top animate-champ-float"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              if (img.src !== champion.icon) img.src = champion.icon;
            }}
          />
        </div>

        {/* Gradient overlay — bottom fade for text */}
        <div
          className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
          style={{
            height: "65%",
            background: "linear-gradient(to top, rgba(15,15,26,0.97) 0%, rgba(15,15,26,0.7) 50%, transparent 100%)",
          }}
        />

        {/* Animated border ring */}
        <div
          className={`absolute inset-0 z-30 rounded-2xl pointer-events-none border-2 ${palette.border}`}
          style={{ transition: "border-color 0.5s ease", boxShadow: `inset 0 0 40px ${palette.glow}` }}
        />

        {/* Corner cost badge */}
        <div className="absolute top-3 left-3 z-40">
          <span
            className={`text-xs font-black px-2.5 py-1 rounded-full bg-bg-base/80 backdrop-blur-sm border border-white/10 ${costColor}`}
          >
            {champion.cost}G
          </span>
        </div>

        {/* Champion type badge — top right */}
        {champion.championType && (
          <div className="absolute top-3 right-3 z-40">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-bg-base/80 backdrop-blur-sm border border-white/10 text-text-secondary">
              {champion.championType}
            </span>
          </div>
        )}

        {/* Name + traits — bottom overlay */}
        <div className="absolute bottom-0 inset-x-0 z-40 p-4 pb-5">
          <h2 className="font-heading font-bold text-3xl text-white leading-none tracking-wide drop-shadow-lg mb-2">
            {champion.name}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {champion.traits.map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Star selector ─────────────────────────────────────────── */}
      <div className="flex gap-2.5 justify-center">
        {([1, 2, 3] as const).map((s) => {
          const active = star === s;
          const pal = STAR_PALETTE[s];
          return (
            <button
              key={s}
              onClick={() => onStarChange(s)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-all duration-300 ${
                active
                  ? `${pal.bg} ${pal.border}`
                  : "border-white/8 hover:border-white/20 hover:bg-white/4"
              }`}
              style={active ? { boxShadow: `0 0 20px ${pal.glow}` } : undefined}
            >
              <span className={`text-lg leading-none font-bold ${active ? (s === 3 ? "text-accent-gold" : s === 2 ? "text-sky-300" : "text-white") : "text-white/30"}`}>
                {"★".repeat(s)}{"☆".repeat(3 - s)}
              </span>
              <span className={`text-[10px] font-semibold ${active ? "text-text-secondary" : "text-text-muted/50"}`}>
                {Math.round(champion.stats.hp * STAR_HP_MULT[s]).toLocaleString()} HP
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Item slots ────────────────────────────────────────────── */}
      <div>
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3 text-center">
          Items · {equippedItems.filter(Boolean).length}/3 equipped
        </p>
        <div className="flex gap-3 justify-center">
          {[0, 1, 2].map((i) => {
            const item = equippedItems[i];
            return (
              <button
                key={`${i}-${item?.id ?? "empty"}`}
                onClick={() => onSlotClick(i)}
                className={`relative w-20 h-20 rounded-2xl border-2 transition-all duration-200 overflow-hidden group ${
                  item
                    ? "border-white/30 hover:border-white/50 bg-bg-elevated animate-pop-in shadow-lg"
                    : "border-dashed border-white/15 hover:border-accent-gold/50 bg-bg-elevated/40 hover:bg-accent-gold/5"
                }`}
              >
                {item ? (
                  <>
                    <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                    </div>
                    <span className={`absolute top-1 right-1 text-[9px] font-bold px-1 rounded leading-none py-0.5 ${TIER_BADGE[item.tier] ?? TIER_BADGE.C}`}>
                      {item.tier}
                    </span>
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[8px] text-center py-0.5 leading-tight opacity-0 group-hover:opacity-100 transition-opacity truncate px-0.5">
                      {item.name}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-text-muted group-hover:text-accent-gold/70 transition-colors gap-1">
                    <span className="text-2xl leading-none">+</span>
                    <span className="text-[9px] leading-none">Slot {i + 1}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Item stat pills */}
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
                      <span key={`${item!.id}-${k}`} className={`text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/5 border border-white/8 ${m.color}`}>
                        {m.label}
                      </span>
                    );
                  })
              )
              .filter(Boolean)}
          </div>
        )}
      </div>

      {/* ── Ability ───────────────────────────────────────────────── */}
      <div className="bg-bg-elevated/80 rounded-2xl border border-white/8 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-400">✦</span>
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest">Ability</p>
          {champion.stats.initialMana !== undefined && (
            <span className="ml-auto text-[10px] text-sky-400 font-bold">
              {champion.stats.initialMana}/{champion.stats.maxMana} mana
            </span>
          )}
        </div>
        <p className="text-accent-purple-light text-sm font-semibold mb-1.5">
          {champion.ability.name}
        </p>
        <p className="text-text-secondary text-xs leading-relaxed line-clamp-4">
          {champion.ability.description}
        </p>
      </div>
    </div>
  );
}
