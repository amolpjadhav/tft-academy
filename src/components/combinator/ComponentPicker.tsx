import type { Component } from "@/types/item";
import { formatStats } from "@/utils/formatStats";

interface ComponentPickerProps {
  components: Component[];
  selected: Component | null;
  onSelect: (c: Component) => void;
  label: string;
}

export default function ComponentPicker({
  components,
  selected,
  onSelect,
  label,
}: ComponentPickerProps) {
  return (
    <div className="flex-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {components.map((c) => {
          const active = selected?.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c)}
              className={`text-left rounded-lg border p-3 transition-all text-sm ${
                active
                  ? "bg-accent-purple/20 border-accent-purple/60 text-text-primary shadow-glow"
                  : "bg-bg-surface border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary hover:bg-bg-elevated"
              }`}
            >
              <div className="font-medium leading-snug mb-1">{c.name}</div>
              <div className="text-xs text-text-muted">
                {formatStats(c.stats).join(" · ")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
