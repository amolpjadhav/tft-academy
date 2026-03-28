import { useState, useEffect, useCallback, useMemo } from "react";
import type { GetStaticProps } from "next";
import type { Champion, ChampionRole } from "@/types/champion";
import PageShell from "@/components/layout/PageShell";
import ChampionFlashcard from "@/components/flashcards/ChampionFlashcard";
import championsData from "../../data/champions.json";

interface Props {
  champions: Champion[];
}

type CostFilter = "all" | 1 | 2 | 3 | 4 | 5;
type RoleFilter = "all" | ChampionRole;

const ROLE_LABELS: Record<ChampionRole, string> = {
  ad_carry:    "AD Carry",
  ap_carry:    "AP Carry",
  melee_carry: "Melee Carry",
  tank:        "Tank",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsPage({ champions }: Props) {
  const [costFilter, setCostFilter] = useState<CostFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [isShuffled, setIsShuffled]   = useState(false);
  const [shuffleKey, setShuffleKey]   = useState(0);
  const [index, setIndex]     = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filtered + optionally shuffled list
  const filtered = useMemo(() => {
    let list = champions.filter((c) => {
      if (costFilter !== "all" && c.cost !== costFilter) return false;
      if (roleFilter !== "all" && c.role !== roleFilter) return false;
      return true;
    });
    return isShuffled ? shuffle(list) : list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champions, costFilter, roleFilter, isShuffled, shuffleKey]);

  // Reset index when filter changes
  useEffect(() => {
    setIndex(0);
    setIsFlipped(false);
  }, [filtered]);

  const current = filtered[index] ?? null;

  const goTo = useCallback((next: number) => {
    setIsFlipped(false);
    // Small delay so the flip resets before the card changes
    setTimeout(() => setIndex(next), 50);
  }, []);

  const prev = useCallback(() => {
    if (index > 0) goTo(index - 1);
  }, [index, goTo]);

  const next = useCallback(() => {
    if (index < filtered.length - 1) goTo(index + 1);
  }, [index, filtered.length, goTo]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled((v) => !v);
    setShuffleKey((k) => k + 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") { e.preventDefault(); setIsFlipped((v) => !v); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const filterBtnBase =
    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border";
  const filterActive =
    "bg-accent-purple/20 text-accent-purple-light border-accent-purple/40";
  const filterInactive =
    "bg-bg-surface text-text-secondary border-white/8 hover:bg-white/5 hover:text-text-primary";

  return (
    <PageShell
      title="Flashcards"
      subtitle="Learn every champion — tap a card to reveal details"
    >
      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="space-y-2 mb-6">
        {/* Cost filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Cost</span>
          {(["all", 1, 2, 3, 4, 5] as CostFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setCostFilter(c)}
              className={`${filterBtnBase} ${costFilter === c ? filterActive : filterInactive}`}
            >
              {c === "all" ? "All" : `${c}★`}
            </button>
          ))}
        </div>

        {/* Role filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-text-muted text-xs font-semibold uppercase tracking-wider w-10">Role</span>
          <button
            onClick={() => setRoleFilter("all")}
            className={`${filterBtnBase} ${roleFilter === "all" ? filterActive : filterInactive}`}
          >
            All
          </button>
          {(Object.keys(ROLE_LABELS) as ChampionRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`${filterBtnBase} ${roleFilter === r ? filterActive : filterInactive}`}
            >
              {ROLE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Navigation bar ───────────────────────────────────────────────── */}
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
            {filtered.length === 0 ? "–" : `${index + 1} / ${filtered.length}`}
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
          disabled={index >= filtered.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg-surface border border-white/8 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>

      {/* ── Card ─────────────────────────────────────────────────────────── */}
      {current ? (
        <ChampionFlashcard
          key={current.id}
          champion={current}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((v) => !v)}
        />
      ) : (
        <div className="flex items-center justify-center h-64 text-text-muted text-sm">
          No champions match the current filters.
        </div>
      )}

      {/* Keyboard hint — desktop only */}
      <p className="hidden md:block text-center text-text-muted text-xs mt-5">
        Keyboard: <kbd className="bg-bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[11px]">←</kbd>{" "}
        <kbd className="bg-bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[11px]">→</kbd> to navigate
        &nbsp;·&nbsp;
        <kbd className="bg-bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[11px]">Space</kbd> to flip
      </p>
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      champions: championsData as Champion[],
    },
  };
};
