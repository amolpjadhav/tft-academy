import type { Champion } from "@/types/champion";
import type { Item } from "@/types/item";
import { COST_TEXT, STAR_HP_MULT, STAR_AD_MULT } from "@/utils/simulator";

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

interface Props {
  champion: Champion;
  star: 1 | 2 | 3;
  onStarChange: (s: 1 | 2 | 3) => void;
  slots: (string | null)[];
  equippedItems: (Item | null)[];
  onSlotClick: (index: number) => void;
}

export default function BuildPanel({ champion, star, onStarChange, slots, equippedItems, onSlotClick }: Props) {
  const costColor = COST_TEXT[champion.cost];

  const scaledHP = Math.round(champion.stats.hp * STAR_HP_MULT[star]);
  const scaledAD = Math.round(champion.stats.attackDamage * STAR_AD_MULT[star]);

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

      {/* Quick stat summary at current star */}
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
        <p className="text-text-muted text-xs mb-2 font-medium">ITEMS</p>
        <div className="flex gap-3 justify-center">
          {[0, 1, 2].map((i) => {
            const item = equippedItems[i];
            return (
              <button
                key={i}
                onClick={() => onSlotClick(i)}
                className={`relative w-16 h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden group ${
                  item
                    ? "border-white/30 hover:border-white/50 bg-bg-elevated"
                    : "border-dashed border-white/20 hover:border-white/40 bg-bg-elevated/50"
                }`}
              >
                {item ? (
                  <>
                    <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                    </div>
                    {/* Tier badge */}
                    <span
                      className={`absolute top-0.5 right-0.5 text-[9px] font-bold px-1 rounded leading-none py-0.5 ${
                        item.tier === "S"
                          ? "bg-accent-gold/80 text-black"
                          : item.tier === "A"
                          ? "bg-purple-500/80 text-white"
                          : item.tier === "B"
                          ? "bg-blue-500/80 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {item.tier}
                    </span>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted text-xl group-hover:text-text-secondary transition-colors">
                    +
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {equippedItems.some(Boolean) && (
          <p className="text-center text-text-muted text-[11px] mt-2">
            Click an item to change it
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
