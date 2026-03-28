import type { FilterCategory } from "@/hooks/useItemFilter";

const TABS: { id: FilterCategory; label: string; icon: string; color: string }[] = [
  { id: "all",   label: "All Items", icon: "⚔",  color: "text-text-primary" },
  { id: "carry", label: "Carry",     icon: "🎯",  color: "text-accent-gold" },
  { id: "mage",  label: "Mage",      icon: "🔮",  color: "text-blue-400" },
  { id: "tank",  label: "Tank",      icon: "🛡",   color: "text-green-400" },
];

interface CategoryTabsProps {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

export default function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 bg-bg-surface rounded-lg p-1 border border-white/5 overflow-x-auto scrollbar-none">
      {TABS.map(({ id, label, icon, color }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all shrink-0 ${
              isActive
                ? "bg-bg-elevated shadow text-text-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            <span className={isActive ? color : "opacity-60"}>{icon}</span>
            <span className={isActive ? color : ""}>{label}</span>
            <span className="text-xs text-text-muted tabular-nums">{counts[id]}</span>
          </button>
        );
      })}
    </div>
  );
}
