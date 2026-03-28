import { useState, useMemo } from "react";
import PageShell from "@/components/layout/PageShell";
import { GLOSSARY, CATEGORY_META } from "@/data/glossary";
import type { GlossaryCategory, GlossaryTerm } from "@/data/glossary";

type FilterCat = GlossaryCategory | "all";

const TABS: { id: FilterCat; label: string; emoji: string }[] = [
  { id: "all",       label: "All",       emoji: "📖" },
  { id: "stats",     label: "Stats",     emoji: "📊" },
  { id: "mechanics", label: "Mechanics", emoji: "⚙️" },
  { id: "roles",     label: "Roles",     emoji: "🎭" },
  { id: "economy",   label: "Economy",   emoji: "💰" },
  { id: "tft",       label: "TFT Basics",emoji: "🎮" },
];

export default function GlossaryPage() {
  const [query, setQuery]     = useState("");
  const [category, setCategory] = useState<FilterCat>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return GLOSSARY.filter((t) => {
      const matchesCat = category === "all" || t.category === category;
      const matchesQ =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.simple.toLowerCase().includes(q) ||
        t.detail.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category]);

  // Group alphabetically
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(term);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <PageShell
      title="Glossary"
      subtitle={`${filtered.length} of ${GLOSSARY.length} terms · explained like you're 10`}
    >
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-text-muted pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms…"
            className="w-full bg-bg-elevated border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-purple/60 focus:ring-1 focus:ring-accent-purple/40 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary transition"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 bg-bg-surface rounded-lg p-1 border border-white/5 overflow-x-auto scrollbar-none">
          {TABS.map(({ id, label, emoji }) => {
            const count = id === "all"
              ? GLOSSARY.length
              : GLOSSARY.filter((t) => t.category === id).length;
            return (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all shrink-0 ${
                  category === id
                    ? "bg-bg-elevated shadow text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
                <span className="text-xs text-text-muted tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-4xl mb-4">🤔</span>
          <p className="text-text-secondary text-sm">No terms match your search.</p>
          <p className="text-text-muted text-xs mt-1">Try a different word.</p>
        </div>
      )}

      {/* Term list — grouped by first letter */}
      <div className="space-y-8">
        {grouped.map(([letter, terms]) => (
          <section key={letter}>
            {/* Letter divider */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-heading text-accent-gold text-xl w-7 shrink-0">
                {letter}
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="space-y-2">
              {terms.map((term) => {
                const isOpen = expanded === term.id;
                const meta = CATEGORY_META[term.category];
                return (
                  <div
                    key={term.id}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-accent-purple/30 bg-bg-elevated"
                        : "border-white/5 bg-bg-surface hover:border-white/10 hover:bg-bg-elevated/50"
                    }`}
                  >
                    {/* Header row — always visible */}
                    <button
                      className="w-full flex items-center gap-4 px-5 py-4 text-left"
                      onClick={() => setExpanded(isOpen ? null : term.id)}
                    >
                      {/* Emoji */}
                      <span className="text-2xl w-9 shrink-0 text-center">{term.emoji}</span>

                      {/* Term + simple definition */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-text-primary text-sm">
                            {term.term}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${meta.color}`}
                          >
                            {meta.label}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm mt-0.5 leading-snug">
                          {term.simple}
                        </p>
                      </div>

                      {/* Chevron */}
                      <span
                        className={`text-text-muted text-xs transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 ml-13 border-t border-white/5">
                        <div className="pl-13 space-y-4 pt-4" style={{ paddingLeft: "3.25rem" }}>
                          {/* Full explanation */}
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
                              What it means
                            </p>
                            <p className="text-text-primary text-sm leading-relaxed">
                              {term.detail}
                            </p>
                          </div>

                          {/* Example */}
                          <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-lg px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-accent-purple-light mb-1.5">
                              📝 In-game example
                            </p>
                            <p className="text-text-primary text-sm leading-relaxed">
                              {term.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
