import { useState, useMemo } from "react";
import type { Item } from "@/types/item";
import type { FilterCategory } from "@/hooks/useItemFilter";

const TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ad_carry", label: "AD" },
  { id: "ap_carry", label: "AP" },
  { id: "melee_carry", label: "Melee" },
  { id: "tank", label: "Tank" },
];

interface Props {
  items: Item[];
  equippedIds: (string | null)[];
  slotIndex: number;
  onSelect: (item: Item | null) => void;
  onClose: () => void;
}

export default function ItemPickerModal({ items, equippedIds, slotIndex, onSelect, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<FilterCategory>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      const matchCat = cat === "all" || item.category === cat;
      const matchQuery = !q || item.name.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [items, query, cat]);

  const currentItemId = equippedIds[slotIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-bg-surface border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85dvh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
          <div>
            <h2 className="text-text-primary font-semibold text-sm">Select Item for Slot {slotIndex + 1}</h2>
            {currentItemId && (
              <p className="text-text-muted text-xs mt-0.5">
                Current: {items.find((i) => i.id === currentItemId)?.name}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentItemId && (
              <button
                onClick={() => onSelect(null)}
                className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded border border-red-400/30 hover:border-red-300/40 transition"
              >
                Remove
              </button>
            )}
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary text-lg leading-none transition p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items…"
            autoFocus
            className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 transition"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto scrollbar-none">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setCat(id)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                cat === id
                  ? "bg-bg-elevated text-text-primary shadow"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Item grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filtered.map((item) => {
              const isEquipped = equippedIds.includes(item.id);
              const isCurrentSlot = equippedIds[slotIndex] === item.id;
              const isOtherSlot = isEquipped && !isCurrentSlot;

              return (
                <button
                  key={item.id}
                  onClick={() => !isOtherSlot && onSelect(item)}
                  disabled={isOtherSlot}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                    isCurrentSlot
                      ? "border-accent-gold/70 bg-accent-gold/10"
                      : isOtherSlot
                      ? "border-white/5 opacity-40 cursor-not-allowed"
                      : "border-white/8 bg-bg-elevated hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-bg-surface">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary leading-snug truncate">{item.name}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      {Object.entries(item.stats)
                        .filter(([, v]) => v)
                        .map(([k, v]) => {
                          const labels: Record<string, string> = {
                            ad: "AD", ap: "AP", attack_speed: "AS", crit_chance: "Crit",
                            armor: "Armor", magic_resist: "MR", hp: "HP", mana: "Mana",
                          };
                          return `+${v}${k === "attack_speed" || k === "crit_chance" ? "%" : ""} ${labels[k] ?? k}`;
                        })
                        .slice(0, 2)
                        .join(" · ")}
                    </p>
                    {isCurrentSlot && (
                      <p className="text-[10px] text-accent-gold mt-0.5">Equipped</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-text-muted text-sm py-8">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}
