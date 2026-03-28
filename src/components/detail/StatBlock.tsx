import type { ItemStats } from "@/types/item";
import { formatStats } from "@/utils/formatStats";

interface StatBlockProps {
  stats: ItemStats;
}

export default function StatBlock({ stats }: StatBlockProps) {
  const labels = formatStats(stats);

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
        Stats
      </h3>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <span
            key={label}
            className="text-sm font-semibold bg-accent-gold/10 text-accent-gold border border-accent-gold/30 px-3 py-1 rounded-full"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
