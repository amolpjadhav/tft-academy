import { useState, useMemo } from "react";
import type { Champion } from "@/types/champion";
import { COST_COLORS, COST_TEXT } from "@/utils/simulator";

interface Props {
  champions: Champion[];
  selectedId: string | null;
  onSelect: (c: Champion) => void;
}

const COST_TABS = [0, 1, 2, 3, 4, 5] as const;

const COST_ACTIVE_STYLE: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "border-neutral-400/50 bg-neutral-500/15",
  2: "border-green-500/50  bg-green-600/15",
  3: "border-blue-400/50   bg-blue-500/15",
  4: "border-purple-400/50 bg-purple-600/15",
  5: "border-amber-400/50  bg-amber-500/15",
};

export default function ChampionPicker({ champions, selectedId, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [cost, setCost] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return champions.filter((c) => {
      const matchCost = cost === 0 || c.cost === cost;
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.traits.some((t) => t.toLowerCase().includes(q));
      return matchCost && matchQuery;
    });
  }, [champions, query, cost]);

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Search */}
      <div className="p-3 border-b border-white/5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search champion or trait…"
            className="w-full bg-bg-base/60 border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 transition"
          />
        </div>
      </div>

      {/* Cost filter tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-white/5">
        {COST_TABS.map((c) => (
          <button
            key={c}
            onClick={() => setCost(c)}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
              cost === c
                ? c === 0
                  ? "bg-white/10 border-white/20 text-text-primary"
                  : `${COST_ACTIVE_STYLE[c as 1 | 2 | 3 | 4 | 5]} border`
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
            style={cost === c && c !== 0 ? { color: COST_COLORS[c as 1 | 2 | 3 | 4 | 5] } : undefined}
          >
            {c === 0 ? "All" : `${c}g`}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-3 py-1.5 border-b border-white/5">
        <p className="text-[10px] text-text-muted">{filtered.length} champions</p>
      </div>

      {/* Champion grid */}
      <div className="flex-1 overflow-y-auto p-2.5">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((champ) => {
            const active = champ.id === selectedId;
            const costColor = COST_TEXT[champ.cost];
            return (
              <button
                key={champ.id}
                onClick={() => onSelect(champ)}
                title={`${champ.name} — ${champ.traits.join(", ")}`}
                className={`relative flex flex-col items-center gap-1.5 p-1.5 rounded-xl border transition-all duration-150 group overflow-hidden ${
                  active
                    ? "border-accent-gold/70 bg-accent-gold/10 shadow-[0_0_16px_rgba(245,158,11,0.2)]"
                    : "border-white/8 bg-bg-elevated hover:border-white/25 hover:bg-white/6"
                }`}
              >
                {/* Portrait */}
                <div className="w-full rounded-lg overflow-hidden bg-bg-surface" style={{ aspectRatio: "1" }}>
                  <img
                    src={champ.icon}
                    alt={champ.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${active ? "scale-105" : "group-hover:scale-105"}`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                </div>

                {/* Cost badge */}
                <span
                  className={`absolute top-2 right-2 text-[9px] font-black leading-none px-1.5 py-0.5 rounded-full bg-bg-base/85 ${costColor}`}
                >
                  {champ.cost}
                </span>

                {/* Active indicator */}
                {active && (
                  <div className="absolute top-2 left-2">
                    <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                  </div>
                )}

                {/* Name */}
                <span className={`text-[10px] leading-tight text-center w-full px-0.5 font-medium transition-colors truncate ${active ? "text-accent-gold" : "text-text-secondary group-hover:text-text-primary"}`}>
                  {champ.name}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-3xl mb-2">🔍</span>
            <p className="text-text-muted text-sm">No champions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
