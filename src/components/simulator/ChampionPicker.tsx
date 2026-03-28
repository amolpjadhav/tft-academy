import { useState, useMemo } from "react";
import type { Champion } from "@/types/champion";
import { COST_COLORS, COST_TEXT } from "@/utils/simulator";

interface Props {
  champions: Champion[];
  selectedId: string | null;
  onSelect: (c: Champion) => void;
}

const COST_TABS = [0, 1, 2, 3, 4, 5] as const;

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
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search champion or trait…"
          className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 transition"
        />
      </div>

      {/* Cost filter */}
      <div className="flex gap-1 px-3 py-2 border-b border-white/5 overflow-x-auto scrollbar-none">
        {COST_TABS.map((c) => (
          <button
            key={c}
            onClick={() => setCost(c)}
            className={`shrink-0 px-2.5 py-1 rounded text-xs font-bold transition-all ${
              cost === c
                ? "bg-bg-elevated text-text-primary shadow"
                : "text-text-muted hover:text-text-secondary"
            }`}
            style={cost === c && c !== 0 ? { color: COST_COLORS[c as 1 | 2 | 3 | 4 | 5] } : undefined}
          >
            {c === 0 ? "All" : `${c}★`}
          </button>
        ))}
        <span className="ml-auto shrink-0 text-xs text-text-muted self-center">
          {filtered.length}
        </span>
      </div>

      {/* Champion grid */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
          {filtered.map((champ) => {
            const active = champ.id === selectedId;
            const costColor = COST_TEXT[champ.cost];
            return (
              <button
                key={champ.id}
                onClick={() => onSelect(champ)}
                title={`${champ.name} (${champ.cost}★) — ${champ.traits.join(", ")}`}
                className={`relative flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all duration-150 group ${
                  active
                    ? "border-accent-gold/70 bg-accent-gold/10 shadow-glow"
                    : "border-white/8 bg-bg-elevated hover:border-white/20 hover:bg-white/5"
                }`}
              >
                {/* Portrait */}
                <div className="w-full aspect-square rounded-md overflow-hidden bg-bg-surface">
                  <img
                    src={champ.icon}
                    alt={champ.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                </div>

                {/* Cost badge */}
                <span
                  className={`absolute top-1 right-1 text-[9px] font-black leading-none px-1 py-0.5 rounded bg-bg-base/80 ${costColor}`}
                >
                  {champ.cost}
                </span>

                {/* Name */}
                <span className="text-[9px] text-text-secondary leading-tight text-center truncate w-full px-0.5 group-hover:text-text-primary transition-colors">
                  {champ.name}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-muted text-sm py-8">No champions found</p>
        )}
      </div>
    </div>
  );
}
