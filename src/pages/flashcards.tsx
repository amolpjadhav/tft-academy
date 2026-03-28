import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

  // ── Swipe gesture state ───────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const didSwipe    = useRef(false);
  const [dragX, setDragX] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    didSwipe.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Only track horizontal drag if it's clearly more horizontal than vertical
    if (Math.abs(dx) > Math.abs(dy)) {
      setDragX(dx);
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    setDragX(0);

    const SWIPE_THRESHOLD = 60;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      didSwipe.current = true;
      if (dx < 0) next();   // swipe left → next card
      else         prev();  // swipe right → prev card
    }
  }, [next, prev]);

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
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: dragX
              ? `translateX(${dragX * 0.35}px) rotate(${dragX * 0.025}deg)`
              : "translateX(0) rotate(0deg)",
            transition: dragX ? "none" : "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
            // Show left/right edge fade based on drag direction
            opacity: dragX ? Math.max(0.6, 1 - Math.abs(dragX) / 400) : 1,
          }}
        >
          <ChampionFlashcard
            key={current.id}
            champion={current}
            isFlipped={isFlipped}
            onFlip={() => {
              if (!didSwipe.current) setIsFlipped((v) => !v);
            }}
          />

          {/* Swipe direction hint — fades in as user drags */}
          {dragX !== 0 && (
            <div
              className="absolute inset-0 pointer-events-none flex items-center rounded-2xl overflow-hidden"
              style={{ opacity: Math.min(1, Math.abs(dragX) / 80) }}
            >
              {dragX > 0 ? (
                <div className="ml-4 text-2xl font-bold text-emerald-400 bg-emerald-500/20 rounded-full w-12 h-12 flex items-center justify-center">
                  ←
                </div>
              ) : (
                <div className="ml-auto mr-4 text-2xl font-bold text-accent-purple-light bg-accent-purple/20 rounded-full w-12 h-12 flex items-center justify-center">
                  →
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-text-muted text-sm">
          No champions match the current filters.
        </div>
      )}

      {/* Hints */}
      <p className="md:hidden text-center text-text-muted text-xs mt-4">
        Swipe left / right to navigate &nbsp;·&nbsp; Tap to flip
      </p>
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
