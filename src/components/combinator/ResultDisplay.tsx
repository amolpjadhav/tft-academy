import type { Item } from "@/types/item";
import { formatStats } from "@/utils/formatStats";

interface ResultDisplayProps {
  item: Item | null;
  hasSelection: boolean;
  onViewDetail: (item: Item) => void;
}

export default function ResultDisplay({ item, hasSelection, onViewDetail }: ResultDisplayProps) {
  if (!hasSelection) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed border-white/10 rounded-2xl">
        <span className="text-3xl mb-2">🔨</span>
        <p className="text-text-muted text-sm">Select two components to combine</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed border-red-500/20 rounded-2xl bg-red-500/5">
        <span className="text-3xl mb-2">❌</span>
        <p className="text-red-400 text-sm font-medium">No item found</p>
        <p className="text-text-muted text-xs mt-1">
          This combination doesn&apos;t craft a completed item.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-accent-gold/30 bg-accent-gold/5 rounded-2xl p-5 animate-slide-up">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
        Result
      </p>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-bg-elevated border border-accent-gold/20 overflow-hidden">
          <img
            src={item.icon}
            alt={item.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary font-semibold text-lg">{item.name}</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {formatStats(item.stats).map((s) => (
              <span
                key={s}
                className="text-xs bg-accent-gold/10 text-accent-gold border border-accent-gold/20 px-2 py-0.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => onViewDetail(item)}
        className="mt-4 w-full bg-accent-purple/20 hover:bg-accent-purple/30 border border-accent-purple/40 text-accent-purple-light text-sm font-medium py-2 rounded-lg transition"
      >
        View Full Details →
      </button>
    </div>
  );
}
