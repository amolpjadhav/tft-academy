import { useState, useMemo } from "react";
import type { GetStaticProps } from "next";
import type { Trait } from "@/types/trait";
import { TRAIT_EXPLAINERS, TYPE_META } from "@/data/traitExplainers";
import PageShell from "@/components/layout/PageShell";
import traitsData from "../../data/traits.json";

interface Props {
  traits: Trait[];
}

type TypeFilter = "all" | "damage" | "magic" | "tank" | "economy" | "utility";
type UniqueFilter = "all" | "multi" | "unique";

const STYLE_COLORS = ["", "text-amber-700", "text-slate-300", "text-yellow-300", "text-purple-300"];
const STYLE_BG = ["", "bg-amber-800/30", "bg-slate-500/20", "bg-yellow-500/20", "bg-purple-500/20"];
const STYLE_LABEL = ["", "Bronze", "Silver", "Gold", "Prismatic"];

const COST_COLORS: Record<number, string> = {
  1: "bg-neutral-500/30 text-neutral-300",
  2: "bg-green-600/30 text-green-300",
  3: "bg-blue-600/30 text-blue-300",
  4: "bg-purple-600/30 text-purple-300",
  5: "bg-amber-500/30 text-amber-200",
};

function TraitCard({ trait }: { trait: Trait }) {
  const [expanded, setExpanded] = useState(false);
  const explainer = TRAIT_EXPLAINERS[trait.name];
  const typeMeta = TYPE_META[trait.type];

  return (
    <div
      className={`bg-bg-surface rounded-2xl border border-white/8 overflow-hidden transition-all duration-200 ${
        expanded ? "border-white/15" : "hover:border-white/12"
      }`}
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        {/* Trait icon */}
        <div className="w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-bg-elevated border border-white/10 flex items-center justify-center">
          {trait.icon ? (
            <img
              src={trait.icon}
              alt={trait.name}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-lg">{typeMeta?.icon ?? "⚡"}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-text-primary font-semibold text-sm leading-tight">{trait.name}</h3>
            {trait.isUnique && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple-light border border-accent-purple/25 font-medium">
                Unique
              </span>
            )}
            {typeMeta && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/8 font-medium ${typeMeta.color}`}>
                {typeMeta.icon} {typeMeta.label}
              </span>
            )}
          </div>

          {/* Breakpoints */}
          {trait.breakpoints.length > 0 && (
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {trait.breakpoints.map((bp, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white/5 ${STYLE_BG[bp.style]} ${STYLE_COLORS[bp.style]}`}
                >
                  {bp.minUnits}
                </span>
              ))}
              <span className="text-[10px] text-text-muted self-center">
                champion{trait.breakpoints[0]?.minUnits === 1 ? "" : "s"} needed
              </span>
            </div>
          )}

          {/* Beginner summary */}
          {explainer && (
            <p className="text-text-secondary text-xs leading-relaxed mt-1.5 line-clamp-2">
              {explainer.beginner}
            </p>
          )}
        </div>

        {/* Expand chevron */}
        <span className={`text-text-muted text-sm shrink-0 mt-1 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-white/5 pt-4">
          {/* CDragon description */}
          <div className="bg-bg-elevated rounded-xl p-3 border border-white/5">
            <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest mb-1.5">Official Description</p>
            <p className="text-text-secondary text-xs leading-relaxed">{trait.description}</p>
          </div>

          {/* Breakpoint table */}
          {trait.breakpoints.length > 1 && (
            <div>
              <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest mb-2">Activation Thresholds</p>
              <div className="flex gap-2 flex-wrap">
                {trait.breakpoints.map((bp, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 ${STYLE_BG[bp.style]}`}
                  >
                    <span className={`text-base font-black ${STYLE_COLORS[bp.style]}`}>{bp.minUnits}</span>
                    <div>
                      <p className={`text-[10px] font-bold leading-none ${STYLE_COLORS[bp.style]}`}>
                        {STYLE_LABEL[bp.style]}
                      </p>
                      <p className="text-text-muted text-[10px]">units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Beginner tip */}
          {explainer?.tip && (
            <div className="flex items-start gap-2 bg-accent-gold/5 border border-accent-gold/15 rounded-xl p-3">
              <span className="text-accent-gold text-sm shrink-0">💡</span>
              <p className="text-text-secondary text-xs leading-relaxed">{explainer.tip}</p>
            </div>
          )}

          {/* Champions */}
          {trait.champions.length > 0 && (
            <div>
              <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest mb-2">
                Champions ({trait.championCount})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {trait.champions.map((c) => (
                  <span
                    key={c.name}
                    className={`text-[11px] px-2 py-1 rounded-lg font-medium border border-white/5 ${
                      COST_COLORS[c.cost] ?? "bg-white/5 text-text-secondary"
                    }`}
                  >
                    {c.name}
                    <span className="ml-1 opacity-60 text-[10px]">{c.cost}g</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TYPE_TABS: { id: TypeFilter; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🎯" },
  { id: "damage", label: "Damage", icon: "⚔️" },
  { id: "magic", label: "Magic", icon: "🔮" },
  { id: "tank", label: "Tank", icon: "🛡️" },
  { id: "economy", label: "Economy", icon: "💰" },
  { id: "utility", label: "Utility", icon: "⚡" },
];

export default function TraitsPage({ traits }: Props) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [uniqueFilter, setUniqueFilter] = useState<UniqueFilter>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return traits.filter((t) => {
      const matchType = typeFilter === "all" || t.type === typeFilter;
      const matchUnique =
        uniqueFilter === "all" ||
        (uniqueFilter === "unique" ? t.isUnique : !t.isUnique);
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.champions.some((c) => c.name.toLowerCase().includes(q));
      return matchType && matchUnique && matchQuery;
    });
  }, [traits, query, typeFilter, uniqueFilter]);

  const multiCount = traits.filter((t) => !t.isUnique).length;
  const uniqueCount = traits.filter((t) => t.isUnique).length;

  return (
    <PageShell
      title="Set 16 Traits"
      subtitle={`${filtered.length} of ${traits.length} traits · Lore & Legends`}
    >
      {/* Intro banner */}
      <div className="bg-accent-purple/8 border border-accent-purple/15 rounded-2xl p-4 mb-5">
        <h2 className="text-text-primary font-semibold text-sm mb-1">What are Traits?</h2>
        <p className="text-text-secondary text-xs leading-relaxed">
          Traits activate when you field enough champions sharing the same origin or class.
          Each trait gives your team a unique bonus — from dealing more damage to generating gold.
          The more champions you have in a trait, the stronger the bonus gets.
          <span className="text-accent-gold ml-1 font-medium">
            Bronze → Silver → Gold → Prismatic.
          </span>
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search trait or champion…"
          className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 transition"
        />

        {/* Type tabs */}
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-1 bg-bg-surface rounded-xl p-1 border border-white/5 w-max min-w-full">
            {TYPE_TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setTypeFilter(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  typeFilter === id
                    ? "bg-bg-elevated shadow text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Multi / Unique toggle */}
        <div className="flex gap-2">
          {(
            [
              { id: "all", label: `All (${traits.length})` },
              { id: "multi", label: `Multi-Champion (${multiCount})` },
              { id: "unique", label: `Unique (${uniqueCount})` },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setUniqueFilter(id)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                uniqueFilter === id
                  ? "bg-bg-elevated border-white/20 text-text-primary"
                  : "border-white/8 text-text-muted hover:text-text-secondary hover:border-white/15"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-2">
        {filtered.map((trait) => (
          <TraitCard key={trait.id} trait={trait} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-text-muted text-sm py-12">No traits found</p>
        )}
      </div>
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { traits: traitsData as Trait[] },
  };
};
