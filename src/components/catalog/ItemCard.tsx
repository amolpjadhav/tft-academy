import type { Item } from "@/types/item";
import { formatStats } from "@/utils/formatStats";

const TIER_COLORS: Record<string, string> = {
  S: "bg-accent-gold/20 text-accent-gold border-accent-gold/40",
  A: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  B: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  C: "bg-white/10 text-text-secondary border-white/20",
};

const CATEGORY_ACCENT: Record<string, string> = {
  ad_carry:    "border-accent-gold/30 hover:border-accent-gold/60",
  ap_carry:    "border-blue-500/30 hover:border-blue-500/60",
  melee_carry: "border-red-500/30 hover:border-red-500/60",
  tank:        "border-green-500/30 hover:border-green-500/60",
};

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const statLabels = formatStats(item.stats).slice(0, 3);

  return (
    <button
      onClick={() => onClick(item)}
      className={`group relative w-full text-left bg-bg-surface rounded-xl border transition-all duration-200 p-4 hover:bg-bg-elevated hover:shadow-glow hover:-translate-y-0.5 ${CATEGORY_ACCENT[item.category]}`}
    >
      {/* Tier badge */}
      <span
        className={`absolute top-3 right-3 text-xs font-bold px-1.5 py-0.5 rounded border ${TIER_COLORS[item.tier]}`}
      >
        {item.tier}
      </span>

      {/* Item icon */}
      <div className="w-14 h-14 rounded-lg bg-bg-elevated border border-white/10 flex items-center justify-center mb-3 overflow-hidden group-hover:border-white/20 transition">
        <img
          src={item.icon}
          alt={item.name}
          width={56}
          height={56}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-text-primary leading-snug pr-6 mb-2">
        {item.name}
      </p>

      {/* Stat tags */}
      <div className="flex flex-wrap gap-1">
        {statLabels.map((stat) => (
          <span
            key={stat}
            className="text-xs bg-white/5 text-text-secondary px-2 py-0.5 rounded-full border border-white/5"
          >
            {stat}
          </span>
        ))}
      </div>
    </button>
  );
}
