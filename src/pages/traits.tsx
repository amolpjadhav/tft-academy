import { useState, useMemo } from "react";
import type { GetStaticProps } from "next";
import type { Trait } from "@/types/trait";
import { TRAIT_EXPLAINERS } from "@/data/traitExplainers";
import PageShell from "@/components/layout/PageShell";
import traitsData from "../../data/traits.json";

interface Props {
  traits: Trait[];
}

type CategoryFilter = "all" | "origin" | "class" | "unique";

const STYLE_COLORS = ["", "text-amber-700", "text-slate-300", "text-yellow-300", "text-purple-300"];
const STYLE_BG = ["", "bg-amber-800/30", "bg-slate-500/20", "bg-yellow-500/20", "bg-purple-500/20"];
const STYLE_LABEL = ["", "Bronze", "Silver", "Gold", "Prismatic"];

// Shared icon component used in both the strip and the cards
function TraitIconDisplay({ trait }: { trait: Trait }) {
  const [errored, setErrored] = useState(false);
  const fallback = trait.isUnique ? "⭐" : trait.category === "origin" ? "🌌" : "⚔️";
  if (!trait.icon || errored) return <span className="text-xl">{fallback}</span>;
  return (
    <img
      src={trait.icon}
      alt={trait.name}
      className="w-full h-full object-contain p-0.5"
      onError={() => setErrored(true)}
    />
  );
}

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

  const categoryBadge =
    trait.isUnique
      ? { label: "Unique", cls: "bg-accent-purple/15 text-accent-purple-light border-accent-purple/25" }
      : trait.category === "origin"
      ? { label: "Origin", cls: "bg-sky-500/15 text-sky-300 border-sky-500/25" }
      : { label: "Class", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" };

  return (
    <div
      className={`card-hover bg-bg-surface rounded-2xl border border-white/8 overflow-hidden transition-all duration-200 ${
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
          <TraitIconDisplay trait={trait} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-text-primary font-semibold text-sm leading-tight">{trait.name}</h3>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${categoryBadge.cls}`}>
              {categoryBadge.label}
            </span>
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
                      {bp.effect ? (
                        <p className="text-text-muted text-[10px] max-w-[120px] leading-tight mt-0.5">{bp.effect}</p>
                      ) : (
                        <p className="text-text-muted text-[10px]">units</p>
                      )}
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

const CATEGORY_TABS: { id: CategoryFilter; label: string; desc: string }[] = [
  { id: "all", label: "All", desc: "" },
  { id: "origin", label: "Origins", desc: "Thematic groups" },
  { id: "class", label: "Classes", desc: "Combat roles" },
  { id: "unique", label: "Unique", desc: "1-champion traits" },
];

export default function TraitsPage({ traits }: Props) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const originCount = traits.filter((t) => !t.isUnique && t.category === "origin").length;
  const classCount = traits.filter((t) => !t.isUnique && t.category === "class").length;
  const uniqueCount = traits.filter((t) => t.isUnique).length;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return traits.filter((t) => {
      let matchCat = true;
      if (categoryFilter === "unique") matchCat = t.isUnique;
      else if (categoryFilter === "origin") matchCat = !t.isUnique && t.category === "origin";
      else if (categoryFilter === "class") matchCat = !t.isUnique && t.category === "class";

      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.champions.some((c) => c.name.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  }, [traits, query, categoryFilter]);

  const counts: Record<CategoryFilter, number> = {
    all: traits.length,
    origin: originCount,
    class: classCount,
    unique: uniqueCount,
  };

  return (
    <PageShell
      title="Set 17 Traits"
      subtitle={`${filtered.length} of ${traits.length} traits · Lore & Legends`}
    >
      {/* Intro banner */}
      <div className="bg-accent-purple/8 border border-accent-purple/15 rounded-2xl p-4 mb-5">
        <h2 className="text-text-primary font-semibold text-sm mb-1">What are Traits?</h2>
        <p className="text-text-secondary text-xs leading-relaxed">
          Field multiple champions sharing the same <span className="text-sky-300 font-medium">Origin</span> or{" "}
          <span className="text-emerald-300 font-medium">Class</span> to unlock bonuses.
          <span className="text-accent-purple-light ml-1 font-medium">Unique</span> traits belong to a single 5-cost champion and are always active.
          Stack thresholds for stronger effects —{" "}
          <span className="text-accent-gold font-medium">Bronze → Silver → Gold → Prismatic.</span>
        </p>
      </div>

      {/* Trait icon strip — click to jump to trait */}
      <div className="mb-5">
        <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest mb-2.5 px-0.5">All Traits</p>
        <div className="flex flex-wrap gap-2">
          {traits.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setQuery(t.name);
                setCategoryFilter("all");
              }}
              title={t.name}
              className="group flex flex-col items-center gap-1.5 p-2 rounded-xl bg-bg-surface border border-white/6 hover:border-white/15 hover:bg-bg-elevated transition-all w-16"
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-bg-elevated border border-white/8 flex items-center justify-center shrink-0">
                <TraitIconDisplay trait={t} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700 }} className="text-text-secondary group-hover:text-text-primary leading-tight text-center line-clamp-2 w-full transition-colors">
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search trait or champion…"
          className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 transition"
        />

        {/* Category tabs */}
        <div className="grid grid-cols-4 gap-1 bg-bg-surface rounded-xl p-1 border border-white/5">
          {CATEGORY_TABS.map(({ id, label, desc }) => {
            const active = categoryFilter === id;
            const badgeColor =
              id === "origin" ? "text-sky-300" :
              id === "class" ? "text-emerald-300" :
              id === "unique" ? "text-accent-purple-light" :
              "text-text-muted";
            return (
              <button
                key={id}
                onClick={() => setCategoryFilter(id)}
                className={`flex flex-col items-center px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-bg-elevated shadow text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                <span className={active ? "text-text-primary" : badgeColor}>
                  {label}
                </span>
                {id !== "all" && (
                  <span className={`text-[10px] font-normal mt-0.5 ${active ? "text-text-muted" : "text-text-muted/60"}`}>
                    {counts[id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category description */}
        {categoryFilter === "all" && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-sky-500/8 border border-sky-500/20 rounded-xl p-3">
              <p className="text-sky-300 text-[11px] font-semibold mb-1">Origins</p>
              <p className="text-text-muted text-[10px] leading-relaxed">Where your champions come from — their lore, faction, or world. Stack them to unlock powerful themed bonuses.</p>
            </div>
            <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
              <p className="text-emerald-300 text-[11px] font-semibold mb-1">Classes</p>
              <p className="text-text-muted text-[10px] leading-relaxed">What your champions do in battle — their combat role. Mix classes to build a well-rounded team.</p>
            </div>
            <div className="bg-accent-purple/8 border border-accent-purple/20 rounded-xl p-3">
              <p className="text-accent-purple-light text-[11px] font-semibold mb-1">Unique</p>
              <p className="text-text-muted text-[10px] leading-relaxed">Special traits tied to one champion only. Always active when that champion is on your board.</p>
            </div>
          </div>
        )}
        {categoryFilter === "origin" && (
          <div className="bg-sky-500/8 border border-sky-500/20 rounded-xl p-3">
            <p className="text-sky-300 text-[11px] font-semibold mb-1">What are Origins?</p>
            <p className="text-text-muted text-[10px] leading-relaxed">Origins represent where a champion comes from — their faction, world, or lore group. For example, all Meeple champions are Astronauts, and all Dark Star champions are tied to the same cosmic theme. You don't choose an Origin; it's baked into the champion. Put enough of them together and you unlock the trait bonus.</p>
          </div>
        )}
        {categoryFilter === "class" && (
          <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-emerald-300 text-[11px] font-semibold mb-1">What are Classes?</p>
            <p className="text-text-muted text-[10px] leading-relaxed">Classes define what role a champion plays in combat — tanks soak damage (Bastion, Vanguard, Brawler), carries deal it (Sniper, Rogue, Challenger), and supports empower the team (Channeler, Shepherd). A champion can have one Origin and one Class, so building both at once is how strong compositions come together.</p>
          </div>
        )}
        {categoryFilter === "unique" && (
          <div className="bg-accent-purple/8 border border-accent-purple/20 rounded-xl p-3">
            <p className="text-accent-purple-light text-[11px] font-semibold mb-1">What are Unique traits?</p>
            <p className="text-text-muted text-[10px] leading-relaxed">Unique traits belong to a single champion and activate the moment you field them — no stacking required. They're usually reserved for powerful 5-cost champions and give your team a distinct edge. You can only have one copy of each unique champion, so these traits can't be doubled up.</p>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-2">
        {filtered.map((trait, i) => (
          <div key={trait.id} className="animate-card-in" style={{ animationDelay: `${i * 35}ms` }}>
            <TraitCard trait={trait} />
          </div>
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
