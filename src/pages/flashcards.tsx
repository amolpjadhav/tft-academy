import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { GetStaticProps } from "next";
import type { Champion, ChampionRole } from "@/types/champion";
import type { Item, ItemsData, Component, ItemCategory, ItemTier } from "@/types/item";
import type { Trait } from "@/types/trait";
import PageShell from "@/components/layout/PageShell";
import ChampionFlashcard from "@/components/flashcards/ChampionFlashcard";
import { TRAIT_EXPLAINERS, TYPE_META } from "@/data/traitExplainers";
import championsData from "../../data/champions.json";
import itemsData from "../../data/items.json";
import traitsData from "../../data/traits.json";

interface Props {
  champions: Champion[];
  itemMap: Record<string, Item>;
  items: Item[];
  components: Component[];
  traits: Trait[];
}

type FlashcardTab  = "champions" | "traits" | "items";
type CostFilter    = "all" | 1 | 2 | 3 | 4 | 5;
type RoleFilter    = "all" | ChampionRole;
type TypeFilter    = "all" | "damage" | "magic" | "tank" | "economy" | "utility";
type UniqueFilter  = "all" | "multi" | "unique";
type CatFilter     = "all" | ItemCategory;
type TierFilter    = "all" | ItemTier;

const ROLE_LABELS: Record<ChampionRole, string> = {
  ad_carry:    "AD Carry",
  ap_carry:    "AP Carry",
  melee_carry: "Melee Carry",
  tank:        "Tank",
};

const COST_COLORS: Record<number, string> = {
  1: "bg-neutral-500/30 text-neutral-300 border-neutral-500/40",
  2: "bg-green-600/30 text-green-300 border-green-500/40",
  3: "bg-blue-600/30 text-blue-300 border-blue-500/40",
  4: "bg-purple-600/30 text-purple-300 border-purple-500/40",
  5: "bg-amber-500/30 text-amber-200 border-amber-500/40",
};

const CAT_LABELS: Record<ItemCategory, string> = {
  ad_carry:    "AD Carry",
  ap_carry:    "AP Carry",
  melee_carry: "Melee Carry",
  tank:        "Tank",
};

const TIER_STYLES: Record<ItemTier, { label: string; color: string; bg: string; border: string }> = {
  S: { label: "S", color: "text-amber-300",  bg: "bg-amber-400/10",  border: "border-amber-400/40" },
  A: { label: "A", color: "text-violet-300", bg: "bg-violet-400/10", border: "border-violet-400/40" },
  B: { label: "B", color: "text-blue-300",   bg: "bg-blue-400/10",   border: "border-blue-400/40" },
  C: { label: "C", color: "text-slate-300",  bg: "bg-slate-400/10",  border: "border-slate-400/40" },
};

const STAT_LABELS: Record<string, string> = {
  ad:           "Attack Damage",
  ap:           "Ability Power",
  attack_speed: "Attack Speed",
  crit_chance:  "Crit Chance",
  armor:        "Armor",
  magic_resist: "Magic Resist",
  hp:           "Health",
  mana:         "Mana",
  omnivamp:     "Omnivamp",
  durability:   "Damage Reduction",
  damage_amp:   "Damage Amp",
};

const STAT_SUFFIX: Record<string, string> = {
  attack_speed: "%", crit_chance: "%", omnivamp: "%",
  durability: "%", damage_amp: "%",
};

const STYLE_LABEL = ["", "Bronze", "Silver", "Gold", "Prismatic"];
const STYLE_COLOR = ["", "text-amber-700", "text-slate-300", "text-yellow-300", "text-purple-300"];
const STYLE_BG    = ["", "bg-amber-800/30", "bg-slate-500/20", "bg-yellow-500/20", "bg-purple-500/20"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Item icon with error fallback ─────────────────────────────────────────────
function ItemIcon({ src, name, className }: { src: string; name: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) return <span className="text-3xl">⚔️</span>;
  return <img src={src} alt={name} className={className} onError={() => setErrored(true)} />;
}

// ── Item flashcard ─────────────────────────────────────────────────────────────
function ItemFlashcard({ item, componentMap, isFlipped, onFlip }: {
  item: Item;
  componentMap: Record<string, Component>;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const tier = TIER_STYLES[item.tier];
  const catLabel = CAT_LABELS[item.category] ?? item.category;
  const [compA, compB] = item.components.map((id) => componentMap[id]);

  const statEntries = Object.entries(item.stats).filter(([, v]) => v !== undefined && v !== 0);

  return (
    <div
      className="flashcard-scene w-full cursor-pointer select-none"
      style={{ height: "480px" }}
      onClick={onFlip}
    >
      <div className={`flashcard-inner w-full h-full ${isFlipped ? "is-flipped" : ""}`}>

        {/* ── FRONT ─────────────────────────────────────────────────── */}
        <div className="flashcard-face rounded-2xl overflow-hidden bg-bg-surface border border-white/10">
          <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-5">

            {/* Tier badge */}
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.color} ${tier.bg} ${tier.border}`}>
              {tier.label}-Tier
            </span>

            {/* Icon */}
            <div className="w-24 h-24 rounded-2xl bg-bg-elevated border border-white/10 flex items-center justify-center overflow-hidden">
              <ItemIcon src={item.icon} name={item.name} className="w-16 h-16 object-contain" />
            </div>

            {/* Name */}
            <h2 className="font-heading text-3xl text-accent-gold tracking-wide text-center">
              {item.name}
            </h2>

            {/* Category */}
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">
              {catLabel}
            </span>

            {/* Components */}
            <div className="flex items-center gap-3">
              {[compA, compB].map((comp, i) =>
                comp ? (
                  <div key={i} className="flex items-center gap-1.5 bg-bg-elevated border border-white/10 rounded-xl px-3 py-1.5">
                    <ItemIcon src={comp.icon} name={comp.name} className="w-5 h-5 object-contain" />
                    <span className="text-xs text-text-secondary">{comp.name}</span>
                  </div>
                ) : null
              )}
            </div>

            <p className="text-text-muted text-xs mt-1">Tap to reveal passive & details</p>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────────── */}
        <div className="flashcard-face flashcard-face--back rounded-2xl overflow-hidden bg-bg-surface border border-white/10 overflow-y-auto">
          <div className="p-5 space-y-4">

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-white/10 flex items-center justify-center shrink-0">
                <ItemIcon src={item.icon} name={item.name} className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-accent-gold">{item.name}</h3>
                <span className={`text-xs font-semibold ${tier.color}`}>{tier.label}-Tier · {catLabel}</span>
              </div>
            </div>

            {/* Passive */}
            <div className="bg-accent-gold/8 border border-accent-gold/20 rounded-xl p-3 space-y-1">
              <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
                ⚡ {item.passive.name}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">{item.passive.description}</p>
            </div>

            {/* Why it matters */}
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-3">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">💡 Why it matters</p>
              <p className="text-text-secondary text-sm leading-relaxed">{item.why_it_matters}</p>
            </div>

            {/* Stats */}
            {statEntries.length > 0 && (
              <div className="bg-bg-elevated rounded-xl p-3 space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Stats</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {statEntries.map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-text-muted">{STAT_LABELS[key] ?? key}</span>
                      <span className="text-text-primary font-semibold">+{val}{STAT_SUFFIX[key] ?? ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best on */}
            {item.best_on.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Best on</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.best_on.map((label) => (
                    <span key={label} className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Trait icon with proper emoji fallback ──────────────────────────────────────
function TraitIcon({ src, name, fallback, className }: {
  src: string; name: string; fallback: string; className?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return <span className="text-4xl leading-none">{fallback}</span>;
  }
  return (
    <img
      src={src}
      alt={name}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

function TraitIconSmall({ src, name, fallback, className }: {
  src: string; name: string; fallback: string; className?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return <span className="text-xl leading-none">{fallback}</span>;
  }
  return (
    <img
      src={src}
      alt={name}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

// ── Trait flashcard component ──────────────────────────────────────────────────
function TraitFlashcard({ trait, isFlipped, onFlip }: {
  trait: Trait;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const explainer = TRAIT_EXPLAINERS[trait.name];
  const typeMeta  = TYPE_META[trait.type];
  const iconFallback = typeMeta?.icon ?? "⭐";

  return (
    <div
      className="flashcard-scene w-full cursor-pointer select-none"
      style={{ height: "480px" }}
      onClick={onFlip}
    >
      <div className={`flashcard-inner w-full h-full ${isFlipped ? "is-flipped" : ""}`}>

        {/* ── FRONT ──────────────────────────────────────────────────── */}
        <div className="flashcard-face rounded-2xl overflow-hidden bg-bg-surface border border-white/10">
          <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-6">

            {/* Type badge */}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${typeMeta?.color ?? "text-text-muted"} bg-white/5 border-white/10`}>
              {typeMeta?.icon} {typeMeta?.label ?? trait.type}
            </span>

            {/* Icon */}
            <div className="w-24 h-24 rounded-2xl bg-bg-elevated border border-white/10 flex items-center justify-center overflow-hidden">
              <TraitIcon
                src={trait.icon}
                name={trait.name}
                fallback={iconFallback}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Name */}
            <div className="text-center">
              <h2 className="font-heading text-3xl text-accent-gold tracking-wide">
                {trait.name}
              </h2>
              {trait.isUnique && (
                <span className="text-xs text-text-muted mt-1 inline-block">Unique · 1 champion</span>
              )}
            </div>

            {/* Breakpoints preview */}
            {!trait.isUnique && (
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {trait.breakpoints.map((bp) => (
                  <span
                    key={bp.minUnits}
                    className={`text-sm font-bold px-3 py-1 rounded-lg border ${STYLE_COLOR[bp.style] ?? "text-text-muted"} ${STYLE_BG[bp.style] ?? ""} border-white/10`}
                  >
                    {bp.minUnits} → {STYLE_LABEL[bp.style]}
                  </span>
                ))}
              </div>
            )}

            {/* Champion count */}
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <span>🏆</span>
              <span>{trait.championCount} champion{trait.championCount !== 1 ? "s" : ""}</span>
            </div>

            <p className="text-text-muted text-xs mt-2">Tap to reveal details</p>
          </div>
        </div>

        {/* ── BACK ───────────────────────────────────────────────────── */}
        <div className="flashcard-face flashcard-face--back rounded-2xl overflow-hidden bg-bg-surface border border-white/10 overflow-y-auto">
          <div className="p-5 space-y-4">

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-white/10 flex items-center justify-center shrink-0">
                <TraitIconSmall
                  src={trait.icon}
                  name={trait.name}
                  fallback={iconFallback}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading text-lg text-accent-gold">{trait.name}</h3>
                <span className={`text-xs ${typeMeta?.color ?? "text-text-muted"}`}>
                  {typeMeta?.icon} {typeMeta?.label}
                  {trait.isUnique ? " · Unique" : ""}
                </span>
              </div>
            </div>

            {/* Beginner explanation */}
            {explainer ? (
              <div className="bg-accent-gold/8 border border-accent-gold/20 rounded-xl p-3 space-y-2">
                <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider">🧒 What it does</p>
                <p className="text-text-secondary text-sm leading-relaxed">{explainer.beginner}</p>
              </div>
            ) : (
              <div className="bg-bg-elevated rounded-xl p-3">
                <p className="text-text-secondary text-sm leading-relaxed">{trait.description}</p>
              </div>
            )}

            {/* Tip */}
            {explainer?.tip && (
              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">💡 Pro Tip</p>
                <p className="text-text-secondary text-sm leading-relaxed">{explainer.tip}</p>
              </div>
            )}

            {/* Breakpoints */}
            {!trait.isUnique && (
              <div className="bg-bg-elevated rounded-xl p-3 space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Breakpoints</p>
                <div className="flex flex-wrap gap-2">
                  {trait.breakpoints.map((bp) => (
                    <span
                      key={bp.minUnits}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${STYLE_COLOR[bp.style] ?? "text-text-muted"} ${STYLE_BG[bp.style] ?? ""} border-white/10`}
                    >
                      ({bp.minUnits}) {STYLE_LABEL[bp.style]}{bp.effect ? ` — ${bp.effect}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Champions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Champions</p>
              <div className="flex flex-wrap gap-1.5">
                {trait.champions.map((c) => (
                  <span
                    key={c.name}
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${COST_COLORS[c.cost] ?? "bg-white/5 text-text-muted border-white/10"}`}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function FlashcardsPage({ champions, itemMap, items, components, traits }: Props) {
  const [tab, setTab] = useState<FlashcardTab>("champions");

  // ── Champion state ───────────────────────────────────────────────────────────
  const [costFilter, setCostFilter] = useState<CostFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [champShuffled, setChampShuffled] = useState(false);
  const [champShuffleKey, setChampShuffleKey] = useState(0);
  const [champIndex, setChampIndex]   = useState(0);
  const [champFlipped, setChampFlipped] = useState(false);

  // ── Item state ───────────────────────────────────────────────────────────────
  const [catFilter, setCatFilter]     = useState<CatFilter>("all");
  const [tierFilter, setTierFilter]   = useState<TierFilter>("all");
  const [itemShuffled, setItemShuffled] = useState(false);
  const [itemShuffleKey, setItemShuffleKey] = useState(0);
  const [itemIndex, setItemIndex]     = useState(0);
  const [itemFlipped, setItemFlipped] = useState(false);

  // Component lookup map
  const componentMap = useMemo(
    () => Object.fromEntries(components.map((c) => [c.id, c])),
    [components]
  );

  // ── Trait state ──────────────────────────────────────────────────────────────
  const [typeFilter, setTypeFilter]     = useState<TypeFilter>("all");
  const [uniqueFilter, setUniqueFilter] = useState<UniqueFilter>("all");
  const [traitShuffled, setTraitShuffled] = useState(false);
  const [traitShuffleKey, setTraitShuffleKey] = useState(0);
  const [traitIndex, setTraitIndex]   = useState(0);
  const [traitFlipped, setTraitFlipped] = useState(false);

  // ── Shared swipe state ───────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const didSwipe    = useRef(false);
  const [dragX, setDragX] = useState(0);

  // ── Champion filtered list ───────────────────────────────────────────────────
  const filteredChampions = useMemo(() => {
    let list = champions.filter((c) => {
      if (costFilter !== "all" && c.cost !== costFilter) return false;
      if (roleFilter !== "all" && c.role !== roleFilter) return false;
      return true;
    });
    return champShuffled ? shuffle(list) : list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champions, costFilter, roleFilter, champShuffled, champShuffleKey]);

  // ── Item filtered list ───────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    let list = items.filter((it) => {
      if (catFilter !== "all" && it.category !== catFilter) return false;
      if (tierFilter !== "all" && it.tier !== tierFilter) return false;
      return true;
    });
    return itemShuffled ? shuffle(list) : list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, catFilter, tierFilter, itemShuffled, itemShuffleKey]);

  // ── Trait filtered list ──────────────────────────────────────────────────────
  const filteredTraits = useMemo(() => {
    let list = traits.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (uniqueFilter === "unique" && !t.isUnique) return false;
      if (uniqueFilter === "multi"  && t.isUnique)  return false;
      return true;
    });
    return traitShuffled ? shuffle(list) : list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traits, typeFilter, uniqueFilter, traitShuffled, traitShuffleKey]);

  // Reset index when filters change
  useEffect(() => { setChampIndex(0); setChampFlipped(false); }, [filteredChampions]);
  useEffect(() => { setTraitIndex(0); setTraitFlipped(false); }, [filteredTraits]);
  useEffect(() => { setItemIndex(0); setItemFlipped(false); }, [filteredItems]);

  const currentChamp = filteredChampions[champIndex] ?? null;
  const currentTrait = filteredTraits[traitIndex]    ?? null;
  const currentItem  = filteredItems[itemIndex]      ?? null;

  // ── Navigation helpers ───────────────────────────────────────────────────────
  const goToChamp = useCallback((n: number) => {
    setChampFlipped(false);
    setTimeout(() => setChampIndex(n), 50);
  }, []);
  const prevChamp = useCallback(() => { if (champIndex > 0) goToChamp(champIndex - 1); }, [champIndex, goToChamp]);
  const nextChamp = useCallback(() => { if (champIndex < filteredChampions.length - 1) goToChamp(champIndex + 1); }, [champIndex, filteredChampions.length, goToChamp]);

  const goToTrait = useCallback((n: number) => {
    setTraitFlipped(false);
    setTimeout(() => setTraitIndex(n), 50);
  }, []);
  const prevTrait = useCallback(() => { if (traitIndex > 0) goToTrait(traitIndex - 1); }, [traitIndex, goToTrait]);
  const nextTrait = useCallback(() => { if (traitIndex < filteredTraits.length - 1) goToTrait(traitIndex + 1); }, [traitIndex, filteredTraits.length, goToTrait]);

  const goToItem = useCallback((n: number) => {
    setItemFlipped(false);
    setTimeout(() => setItemIndex(n), 50);
  }, []);
  const prevItem = useCallback(() => { if (itemIndex > 0) goToItem(itemIndex - 1); }, [itemIndex, goToItem]);
  const nextItem = useCallback(() => { if (itemIndex < filteredItems.length - 1) goToItem(itemIndex + 1); }, [itemIndex, filteredItems.length, goToItem]);

  const prev = tab === "champions" ? prevChamp : tab === "traits" ? prevTrait : prevItem;
  const next = tab === "champions" ? nextChamp : tab === "traits" ? nextTrait : nextItem;
  const index       = tab === "champions" ? champIndex : tab === "traits" ? traitIndex : itemIndex;
  const filteredLen = tab === "champions" ? filteredChampions.length : tab === "traits" ? filteredTraits.length : filteredItems.length;
  const isShuffled  = tab === "champions" ? champShuffled : tab === "traits" ? traitShuffled : itemShuffled;

  const toggleShuffle = useCallback(() => {
    if (tab === "champions") { setChampShuffled((v) => !v); setChampShuffleKey((k) => k + 1); }
    else if (tab === "traits") { setTraitShuffled((v) => !v); setTraitShuffleKey((k) => k + 1); }
    else                     { setItemShuffled((v) => !v);  setItemShuffleKey((k) => k + 1); }
  }, [tab]);

  // ── Touch swipe ──────────────────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    didSwipe.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy)) setDragX(dx);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    setDragX(0);
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      didSwipe.current = true;
      dx < 0 ? next() : prev();
    }
  }, [next, prev]);

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") {
        e.preventDefault();
        if (tab === "champions") setChampFlipped((v) => !v);
        else if (tab === "traits") setTraitFlipped((v) => !v);
        else setItemFlipped((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, tab]);

  const filterBtnBase  = "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border";
  const filterActive   = "bg-accent-purple/20 text-accent-purple-light border-accent-purple/40";
  const filterInactive = "bg-bg-surface text-text-secondary border-white/8 hover:bg-white/5 hover:text-text-primary";

  const allTypeFilters: { id: TypeFilter; label: string; icon: string }[] = [
    { id: "all",     label: "All",     icon: "⚡" },
    { id: "damage",  label: "Damage",  icon: "⚔️" },
    { id: "magic",   label: "Magic",   icon: "✨" },
    { id: "tank",    label: "Tank",    icon: "🛡️" },
    { id: "economy", label: "Economy", icon: "💰" },
    { id: "utility", label: "Utility", icon: "⚙️" },
  ];

  return (
    <PageShell
      title="Flashcards"
      subtitle={
        tab === "champions" ? "Learn every champion — tap a card to reveal details"
        : tab === "traits"  ? "Learn every trait — tap a card to reveal details"
        :                     "Learn every item — tap a card to reveal details"
      }
    >
      {/* ── Tab switcher ───────────────────────────────────────────────────── */}
      <div className="flex gap-2 mb-6 p-1 bg-bg-surface border border-white/8 rounded-xl">
        <button
          onClick={() => setTab("champions")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "champions"
              ? "bg-accent-purple/20 text-accent-purple-light border border-accent-purple/30"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          🏆 Champions
        </button>
        <button
          onClick={() => setTab("traits")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "traits"
              ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          🌟 Traits
        </button>
        <button
          onClick={() => setTab("items")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
            tab === "items"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          ⚔️ Items
        </button>
      </div>

      {/* ── Champion filters ────────────────────────────────────────────────── */}
      {tab === "champions" && (
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Cost</span>
            {(["all", 1, 2, 3, 4, 5] as CostFilter[]).map((c) => (
              <button key={c} onClick={() => setCostFilter(c)} className={`${filterBtnBase} ${costFilter === c ? filterActive : filterInactive}`}>
                {c === "all" ? "All" : `${c}★`}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Role</span>
            <button onClick={() => setRoleFilter("all")} className={`${filterBtnBase} ${roleFilter === "all" ? filterActive : filterInactive}`}>All</button>
            {(Object.keys(ROLE_LABELS) as ChampionRole[]).map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`${filterBtnBase} ${roleFilter === r ? filterActive : filterInactive}`}>
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Trait filters ───────────────────────────────────────────────────── */}
      {tab === "traits" && (
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Type</span>
            {allTypeFilters.map(({ id, label, icon }) => (
              <button key={id} onClick={() => setTypeFilter(id)} className={`${filterBtnBase} ${typeFilter === id ? filterActive : filterInactive}`}>
                {icon} {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Kind</span>
            {([["all", "All"], ["multi", "Multi-unit"], ["unique", "Unique"]] as [UniqueFilter, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setUniqueFilter(id as UniqueFilter)} className={`${filterBtnBase} ${uniqueFilter === id ? filterActive : filterInactive}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Item filters ────────────────────────────────────────────────────── */}
      {tab === "items" && (
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Role</span>
            <button onClick={() => setCatFilter("all")} className={`${filterBtnBase} ${catFilter === "all" ? filterActive : filterInactive}`}>All</button>
            {(Object.entries(CAT_LABELS) as [ItemCategory, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setCatFilter(id)} className={`${filterBtnBase} ${catFilter === id ? filterActive : filterInactive}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Tier</span>
            <button onClick={() => setTierFilter("all")} className={`${filterBtnBase} ${tierFilter === "all" ? filterActive : filterInactive}`}>All</button>
            {(["S", "A", "B", "C"] as ItemTier[]).map((t) => (
              <button key={t} onClick={() => setTierFilter(t)} className={`${filterBtnBase} ${tierFilter === t ? `${TIER_STYLES[t].color} ${TIER_STYLES[t].bg} ${TIER_STYLES[t].border}` : filterInactive}`}>
                {t}-Tier
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Navigation bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg-surface border border-white/8 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>

        <div className="flex flex-col items-center gap-1">
          <p className="text-text-primary text-sm font-semibold">
            {filteredLen === 0 ? "–" : `${index + 1} / ${filteredLen}`}
          </p>
          <button
            onClick={toggleShuffle}
            className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-colors ${
              isShuffled
                ? "bg-accent-gold/20 text-accent-gold border-accent-gold/40"
                : "bg-bg-surface text-text-muted border-white/8 hover:text-text-secondary"
            }`}
          >
            {isShuffled ? "🔀 Shuffled" : "🔀 Shuffle"}
          </button>
        </div>

        <button
          onClick={next}
          disabled={index >= filteredLen - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg-surface border border-white/8 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>

      {/* ── Card area ───────────────────────────────────────────────────────── */}
      {tab === "champions" && (
        currentChamp ? (
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: dragX ? `translateX(${dragX * 0.35}px) rotate(${dragX * 0.025}deg)` : "translateX(0) rotate(0deg)",
              transition: dragX ? "none" : "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
              opacity: dragX ? Math.max(0.6, 1 - Math.abs(dragX) / 400) : 1,
            }}
          >
            <ChampionFlashcard
              key={currentChamp.id}
              champion={currentChamp}
              isFlipped={champFlipped}
              onFlip={() => { if (!didSwipe.current) setChampFlipped((v) => !v); }}
              itemMap={itemMap}
            />
            {dragX !== 0 && (
              <div className="absolute inset-0 pointer-events-none flex items-center rounded-2xl overflow-hidden" style={{ opacity: Math.min(1, Math.abs(dragX) / 80) }}>
                {dragX > 0 ? (
                  <div className="ml-4 text-2xl font-bold text-emerald-400 bg-emerald-500/20 rounded-full w-12 h-12 flex items-center justify-center">←</div>
                ) : (
                  <div className="ml-auto mr-4 text-2xl font-bold text-accent-purple-light bg-accent-purple/20 rounded-full w-12 h-12 flex items-center justify-center">→</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-text-muted text-sm">No champions match the current filters.</div>
        )
      )}

      {tab === "traits" && (
        currentTrait ? (
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: dragX ? `translateX(${dragX * 0.35}px) rotate(${dragX * 0.025}deg)` : "translateX(0) rotate(0deg)",
              transition: dragX ? "none" : "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
              opacity: dragX ? Math.max(0.6, 1 - Math.abs(dragX) / 400) : 1,
            }}
          >
            <TraitFlashcard
              key={currentTrait.id}
              trait={currentTrait}
              isFlipped={traitFlipped}
              onFlip={() => { if (!didSwipe.current) setTraitFlipped((v) => !v); }}
            />
            {dragX !== 0 && (
              <div className="absolute inset-0 pointer-events-none flex items-center rounded-2xl overflow-hidden" style={{ opacity: Math.min(1, Math.abs(dragX) / 80) }}>
                {dragX > 0 ? (
                  <div className="ml-4 text-2xl font-bold text-emerald-400 bg-emerald-500/20 rounded-full w-12 h-12 flex items-center justify-center">←</div>
                ) : (
                  <div className="ml-auto mr-4 text-2xl font-bold text-accent-purple-light bg-accent-purple/20 rounded-full w-12 h-12 flex items-center justify-center">→</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-text-muted text-sm">No traits match the current filters.</div>
        )
      )}

      {tab === "items" && (
        currentItem ? (
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: dragX ? `translateX(${dragX * 0.35}px) rotate(${dragX * 0.025}deg)` : "translateX(0) rotate(0deg)",
              transition: dragX ? "none" : "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
              opacity: dragX ? Math.max(0.6, 1 - Math.abs(dragX) / 400) : 1,
            }}
          >
            <ItemFlashcard
              key={currentItem.id}
              item={currentItem}
              componentMap={componentMap}
              isFlipped={itemFlipped}
              onFlip={() => { if (!didSwipe.current) setItemFlipped((v) => !v); }}
            />
            {dragX !== 0 && (
              <div className="absolute inset-0 pointer-events-none flex items-center rounded-2xl overflow-hidden" style={{ opacity: Math.min(1, Math.abs(dragX) / 80) }}>
                {dragX > 0 ? (
                  <div className="ml-4 text-2xl font-bold text-emerald-400 bg-emerald-500/20 rounded-full w-12 h-12 flex items-center justify-center">←</div>
                ) : (
                  <div className="ml-auto mr-4 text-2xl font-bold text-accent-purple-light bg-accent-purple/20 rounded-full w-12 h-12 flex items-center justify-center">→</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-text-muted text-sm">No items match the current filters.</div>
        )
      )}

      {/* Keyboard/swipe hints */}
      <p className="md:hidden text-center text-text-muted text-xs mt-4">
        Swipe left / right to navigate &nbsp;·&nbsp; Tap to flip
      </p>
      <p className="hidden md:block text-center text-text-muted text-xs mt-5">
        Keyboard:{" "}
        <kbd className="bg-bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[11px]">←</kbd>{" "}
        <kbd className="bg-bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[11px]">→</kbd>{" "}
        to navigate &nbsp;·&nbsp;
        <kbd className="bg-bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[11px]">Space</kbd> to flip
      </p>
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = itemsData as ItemsData;
  const itemMap = Object.fromEntries(data.items.map((item) => [item.id, item]));
  return {
    props: {
      champions: championsData as Champion[],
      itemMap,
      items: data.items,
      components: data.components,
      traits: traitsData as Trait[],
    },
  };
};
