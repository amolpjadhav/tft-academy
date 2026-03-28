import type { FilterCategory } from "@/hooks/useItemFilter";

const TABS: {
  id: FilterCategory;
  label: string;
  icon: string;
  color: string;
  desc: string;
}[] = [
  { id: "all",         label: "All",         icon: "⚔️",  color: "text-text-primary", desc: "All items" },
  { id: "ad_carry",    label: "AD Carry",    icon: "🎯",  color: "text-accent-gold",  desc: "Gunslingers, Snipers, Longshots" },
  { id: "ap_carry",    label: "AP Carry",    icon: "🔮",  color: "text-blue-400",     desc: "Arcanists, Mages" },
  { id: "melee_carry", label: "Melee Carry", icon: "⚡",  color: "text-red-400",      desc: "Slayers, Juggernauts" },
  { id: "tank",        label: "Tank",        icon: "🛡️",  color: "text-green-400",    desc: "Bruisers, Wardens, Defenders" },
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
