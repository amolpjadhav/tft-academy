import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import type { GetStaticProps } from "next";
import type { Champion } from "@/types/champion";
import type { Trait } from "@/types/trait";
import PageShell from "@/components/layout/PageShell";
import championsData from "../../data/champions.json";
import traitsData from "../../data/traits.json";

// ── Types ──────────────────────────────────────────────────────────────────────
type BoardMap = Record<string, Champion | null>;
type TraitFilter = "all" | string;
type MobilePanel = "pool" | "synergies";

interface ActiveTrait {
  trait: Trait;
  count: number;
  activeBp: Trait["breakpoints"][0] | null;
  nextBp: Trait["breakpoints"][0] | null;
  activeStyle: number;
}

interface Props {
  champions: Champion[];
  traits: Trait[];
}

// ── Constants ──────────────────────────────────────────────────────────────────
const ROWS = 4;
const COLS = 7;
const GAP = 5;
const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const MIN_CELL = 50;
const MAX_CELL = 130;

const ROLE_META: Record<string, { label: string; full: string; bg: string; icon: string }> = {
  tank:        { label: "Tank",  full: "Tank — absorbs damage, protects the backline",          bg: "#1d4ed8", icon: "🛡️" },
  ad_carry:    { label: "ADC",   full: "ADC (Attack Damage Carry) — ranged physical damage",    bg: "#b45309", icon: "🏹" },
  ap_carry:    { label: "APC",   full: "APC (Ability Power Carry) — burst magic damage",        bg: "#7e22ce", icon: "✨" },
  melee_carry: { label: "Carry", full: "Carry — melee damage dealer, fights in the frontline",  bg: "#c2410c", icon: "⚔️" },
  support:     { label: "Sup",   full: "Support — heals, shields, or empowers teammates",       bg: "#15803d", icon: "💚" },
};

const COST_RING: Record<number, { bg: string; text: string }> = {
  1: { bg: "#525252", text: "#f5f5f5" },
  2: { bg: "#15803d", text: "#dcfce7" },
  3: { bg: "#1d4ed8", text: "#dbeafe" },
  4: { bg: "#7e22ce", text: "#f3e8ff" },
  5: { bg: "#b45309", text: "#fef3c7" },
};


const TIER = [
  { label: "",          barCls: "bg-white/10",    textCls: "text-text-muted" },
  { label: "Bronze",    barCls: "bg-amber-700",   textCls: "text-amber-500" },
  { label: "Silver",    barCls: "bg-slate-400",   textCls: "text-slate-300" },
  { label: "Gold",      barCls: "bg-yellow-400",  textCls: "text-yellow-300" },
  { label: "Prismatic", barCls: "bg-purple-400",  textCls: "text-purple-300" },
];

// ── Utilities ──────────────────────────────────────────────────────────────────
function makeBoard(): BoardMap {
  const b: BoardMap = {};
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      b[`${r}-${c}`] = null;
  return b;
}

function getPlaced(board: BoardMap): Champion[] {
  return Object.values(board).filter((c): c is Champion => c !== null);
}

function calcActiveTraits(board: BoardMap, traits: Trait[]): ActiveTrait[] {
  const counts: Record<string, number> = {};
  getPlaced(board).forEach((ch) =>
    ch.traits.forEach((t) => { counts[t] = (counts[t] ?? 0) + 1; })
  );
  return Object.entries(counts)
    .map(([name, count]) => {
      const trait = traits.find((t) => t.name === name);
      if (!trait) return null;
      const sorted = [...trait.breakpoints].sort((a, b) => a.minUnits - b.minUnits);
      const activeBp = [...sorted].reverse().find((bp) => count >= bp.minUnits) ?? null;
      const nextBp = sorted.find((bp) => bp.minUnits > count) ?? null;
      return { trait, count, activeBp, nextBp, activeStyle: activeBp?.style ?? 0 };
    })
    .filter((x): x is ActiveTrait => x !== null)
    .sort((a, b) => b.activeStyle - a.activeStyle || b.count - a.count);
}

/**
 * Team Power (0–100)
 *
 * Synergy score  (max 80 pts):
 *   Sort active traits best-first. Each trait contributes its tier weight
 *   with 0.72× diminishing returns per subsequent trait, so having many
 *   weak Bronze traits doesn't overshadow a single strong Gold/Prismatic one.
 *   Tier weights: Bronze 12 · Silver 26 · Gold 52 · Prismatic 88
 *
 * Size bonus  (max 20 pts):
 *   +2.3 per champion placed — rewards filling out the board.
 *
 * Small-team penalty:
 *   Score scales down linearly below 5 units to prevent 1-champ Prismatic = 100.
 */
function calcPower(activeTraits: ActiveTrait[], champCount: number): number {
  const activated = activeTraits.filter((t) => t.activeStyle > 0);
  if (activated.length === 0 || champCount === 0) return 0;

  const TIER_W = [0, 12, 26, 52, 88];
  const sorted = [...activated].sort((a, b) => b.activeStyle - a.activeStyle);

  let synPts = 0;
  sorted.forEach((t, i) => {
    synPts += TIER_W[t.activeStyle] * Math.pow(0.72, i);
  });
  synPts = Math.min(80, synPts);

  const sizePts = Math.min(20, champCount * 2.3);
  const teamScale = Math.min(1, champCount / 5);

  return Math.min(100, Math.round((synPts + sizePts) * teamScale));
}

// ── HexCell ────────────────────────────────────────────────────────────────────
function HexCell({
  hexKey, champion, cell, isDragOver,
  onDragStart, onDragOver, onDragLeave, onDrop, onClick,
  onTouchStart, onTouchMove, onTouchEnd,
}: {
  hexKey: string;
  champion: Champion | null;
  cell: number;
  isDragOver: boolean;
  onDragStart: (k: string, c: Champion) => void;
  onDragOver: (k: string) => void;
  onDragLeave: () => void;
  onDrop: (k: string) => void;
  onClick: (k: string) => void;
  onTouchStart?: (k: string, c: Champion, e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}) {
  const fontSize = Math.max(8, Math.round(cell * 0.135));
  const badgePad = Math.max(1, Math.round(cell * 0.04));

  return (
    <div
      data-hex-key={hexKey}
      style={{ width: cell, height: cell, flexShrink: 0 }}
      draggable={!!champion}
      onDragStart={() => champion && onDragStart(hexKey, champion)}
      onDragOver={(e) => { e.preventDefault(); onDragOver(hexKey); }}
      onDragLeave={onDragLeave}
      onDrop={(e) => { e.preventDefault(); onDrop(hexKey); }}
      onClick={() => onClick(hexKey)}
      onTouchStart={champion && onTouchStart ? (e) => onTouchStart(hexKey, champion, e) : undefined}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative cursor-pointer select-none group"
    >
      {/* Base hex */}
      <div
        style={{ clipPath: HEX_CLIP }}
        className={`absolute inset-0 transition-colors duration-100 ${
          isDragOver
            ? "bg-accent-purple/60"
            : champion
            ? "bg-bg-elevated"
            : "bg-white/[0.05] group-hover:bg-white/[0.10]"
        }`}
      />

      {/* Champion image */}
      {champion && (
        <div style={{ clipPath: HEX_CLIP }} className="absolute inset-0 overflow-hidden">
          <img
            src={champion.icon}
            alt={champion.name}
            className="w-full h-full object-cover"
            draggable={false}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
      )}

      {/* Cost badge */}
      {champion && (
        <div
          style={{
            position: "absolute",
            bottom: Math.round(cell * 0.08),
            left: "50%",
            transform: "translateX(-50%)",
            background: COST_RING[champion.cost]?.bg,
            color: COST_RING[champion.cost]?.text,
            fontSize,
            fontWeight: 900,
            padding: `${badgePad}px ${badgePad * 3}px`,
            borderRadius: 9999,
            lineHeight: 1.4,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {champion.cost}g
        </div>
      )}

      {/* Role badge */}
      {champion && (() => {
        const role = ROLE_META[champion.role];
        const fs = Math.max(7, Math.round(cell * 0.095));
        return role ? (
          <div
            style={{
              position: "absolute",
              top: Math.round(cell * 0.06),
              left: "50%",
              transform: "translateX(-50%)",
              background: role.bg,
              color: "#fff",
              fontSize: fs,
              fontWeight: 700,
              padding: `1px ${Math.round(fs * 0.55)}px`,
              borderRadius: 9999,
              pointerEvents: "none",
              zIndex: 10,
              whiteSpace: "nowrap",
            }}
          >
            {role.label}
          </div>
        ) : null;
      })()}

      {/* Empty dot */}
      {!champion && !isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
      )}

      {/* Tooltip (desktop hover only) */}
      {champion && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-bg-surface border border-white/10 text-text-primary rounded-md px-2 py-0.5 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          {champion.name}
        </div>
      )}
    </div>
  );
}

// ── PoolCard ───────────────────────────────────────────────────────────────────
function PoolCard({
  champ, onBoard, selected,
  onDragStart, onClick,
}: {
  champ: Champion;
  onBoard: number;
  selected: boolean;
  onDragStart: (c: Champion) => void;
  onClick: (c: Champion) => void;
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(champ)}
      onClick={() => onClick(champ)}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all select-none ${
        selected
          ? "bg-accent-gold/20 ring-1 ring-accent-gold shadow-[0_0_12px_rgba(245,158,11,0.2)]"
          : "bg-bg-elevated hover:bg-white/8"
      } ${onBoard > 0 ? "opacity-50" : ""}`}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-bg-surface shrink-0">
        <img
          src={champ.icon}
          alt={champ.name}
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
        />
      </div>
      <span className="text-xs text-text-primary font-semibold text-center leading-snug w-full break-words">
        {champ.name}
      </span>
      <div className="flex gap-1 flex-wrap justify-center">
        {champ.traits.slice(0, 2).map((t) => (
          <span key={t} className="text-[9px] text-text-muted bg-white/5 rounded-md px-1.5 py-0.5 leading-tight">{t}</span>
        ))}
      </div>
      {/* Cost */}
      <div
        style={{ background: COST_RING[champ.cost]?.bg, color: COST_RING[champ.cost]?.text }}
        className="absolute top-2 left-2 text-[9px] font-black px-1.5 py-0.5 rounded-full leading-tight"
      >
        {champ.cost}g
      </div>
      {/* On-board badge */}
      {onBoard > 0 && (
        <div className="absolute top-2 right-2 bg-accent-gold text-bg-base text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
          {onBoard}
        </div>
      )}
    </div>
  );
}

// ── TraitRow ───────────────────────────────────────────────────────────────────
function TraitRow({ at }: { at: ActiveTrait }) {
  const { trait, count, nextBp, activeStyle } = at;
  const tier = TIER[activeStyle];
  const bps = [...trait.breakpoints].sort((a, b) => a.minUnits - b.minUnits);

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
        activeStyle > 0
          ? "bg-bg-elevated border border-white/8"
          : "bg-white/[0.02] border border-white/4 opacity-50"
      }`}
    >
      <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden bg-bg-surface flex items-center justify-center">
        <img
          src={trait.icon}
          alt={trait.name}
          className="w-full h-full object-contain p-0.5"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[12px] font-semibold text-text-primary truncate">{trait.name}</span>
          {activeStyle > 0 && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/5 ${tier.textCls}`}>
              {tier.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          {bps.map((bp, i) => (
            <span
              key={i}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded border leading-none transition-colors ${
                count >= bp.minUnits
                  ? `${TIER[bp.style].barCls} text-bg-base border-transparent`
                  : "bg-white/5 text-text-muted border-white/8"
              }`}
            >
              {bp.minUnits}
            </span>
          ))}
          {nextBp && (
            <span className="text-[10px] text-text-muted ml-1 opacity-70">+{nextBp.minUnits - count}</span>
          )}
        </div>
      </div>

      <span className={`text-base font-black shrink-0 ${tier.textCls}`}>{count}</span>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function TeamBuilderPage({ champions, traits }: Props) {
  const [board, setBoard] = useState<BoardMap>(makeBoard);
  const [traitFilter, setTraitFilter] = useState<TraitFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("pool");
  const [sheetOpen, setSheetOpen] = useState(true);
  const [cell, setCell] = useState(72);
  const [mobileCell, setMobileCell] = useState(44);

  // Board area ref — ResizeObserver scales hexes to fill available space
  const boardAreaRef = useRef<HTMLDivElement>(null);
  const mobileBoardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<
    | { from: "pool"; champ: Champion }
    | { from: "board"; key: string; champ: Champion }
    | null
  >(null);
  // Touch drag state
  const touchDragRef = useRef<{ fromKey: string; champ: Champion } | null>(null);

  useEffect(() => {
    const el = boardAreaRef.current;
    if (!el) return;
    const compute = () => {
      const pad = 48;
      const w = el.clientWidth - pad;
      const h = el.clientHeight - pad;
      const fromW = (w - 6.5 * GAP) / 7.5;
      const fromH = (h - 3 * GAP) / 4;
      const computed = Math.floor(Math.min(fromW, fromH));
      setCell(Math.max(MIN_CELL, Math.min(MAX_CELL, computed)));
    };
    compute();
    const obs = new ResizeObserver(compute);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Mobile board sizing
  useEffect(() => {
    const el = mobileBoardRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth - 16;
      const computed = Math.floor((w - 6.5 * GAP) / 7.5);
      setMobileCell(Math.max(36, Math.min(60, computed)));
    };
    compute();
    const obs = new ResizeObserver(compute);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Touch drag handlers (board → board) ──────────────────────────────────
  const handleHexTouchStart = useCallback((key: string, champ: Champion, e: React.TouchEvent) => {
    e.preventDefault();
    touchDragRef.current = { fromKey: key, champ };
  }, []);

  const handleHexTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchDragRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const hexKey = el?.closest("[data-hex-key]")?.getAttribute("data-hex-key") ?? null;
    setDragOverKey(hexKey);
  }, []);

  const handleHexTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const drag = touchDragRef.current;
    touchDragRef.current = null;
    const targetKey = dragOverKey;
    setDragOverKey(null);
    if (!drag || !targetKey || targetKey === drag.fromKey) return;
    setBoard((prev) => {
      const next = { ...prev };
      const tmp = prev[targetKey];
      next[targetKey] = prev[drag.fromKey];
      next[drag.fromKey] = tmp;
      return next;
    });
  }, [dragOverKey]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const placed = useMemo(() => getPlaced(board), [board]);

  const boardCounts = useMemo(() => {
    const m: Record<string, number> = {};
    placed.forEach((c) => { m[c.id] = (m[c.id] ?? 0) + 1; });
    return m;
  }, [placed]);

  const activeTraits = useMemo(() => calcActiveTraits(board, traits), [board, traits]);
  const score = useMemo(() => calcPower(activeTraits, placed.length), [activeTraits, placed.length]);
  const totalCost = placed.reduce((s, c) => s + c.cost, 0);
  const activeSynCount = activeTraits.filter((t) => t.activeStyle > 0).length;

  // All unique trait names, sorted — derived from champions so it matches pool data
  const allTraitNames = useMemo(() => {
    const s = new Set<string>();
    champions.forEach((c) => c.traits.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [champions]);

  const filteredPool = useMemo(() => {
    const q = query.toLowerCase();
    return champions.filter((c) => {
      const matchTrait = traitFilter === "all" || c.traits.includes(traitFilter);
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.traits.some((t) => t.toLowerCase().includes(q));
      return matchTrait && matchQ;
    });
  }, [champions, traitFilter, query]);

  // Board pixel dimensions
  const boardW = COLS * cell + (COLS - 1) * GAP + Math.ceil((cell + GAP) / 2);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handlePoolDragStart = useCallback((champ: Champion) => {
    dragRef.current = { from: "pool", champ };
    setSelectedChamp(null);
  }, []);

  const handleBoardDragStart = useCallback((key: string, champ: Champion) => {
    dragRef.current = { from: "board", key, champ };
  }, []);

  const handleDrop = useCallback((targetKey: string) => {
    setDragOverKey(null);
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    setBoard((prev) => {
      const next = { ...prev };
      if (drag.from === "pool") {
        next[targetKey] = drag.champ;
      } else {
        const tmp = prev[targetKey];
        next[targetKey] = prev[drag.key];
        next[drag.key] = tmp;
      }
      return next;
    });
  }, []);

  const handleHexClick = useCallback((key: string) => {
    if (selectedChamp) {
      setBoard((prev) => ({ ...prev, [key]: selectedChamp }));
      setSelectedChamp(null);
    } else if (board[key]) {
      setBoard((prev) => ({ ...prev, [key]: null }));
    }
  }, [selectedChamp, board]);

  const handlePoolClick = useCallback((champ: Champion) => {
    // Place on first empty hex, row by row
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const k = `${r}-${c}`;
        if (!board[k]) {
          setBoard((prev) => ({ ...prev, [k]: champ }));
          return;
        }
      }
    }
    // Board full — fall back to selection so user can click a specific hex to swap
    setSelectedChamp((prev) => prev?.id === champ.id ? null : champ);
  }, [board]);

  const clearBoard = useCallback(() => {
    setBoard(makeBoard());
    setSelectedChamp(null);
  }, []);

  // ── Power display ──────────────────────────────────────────────────────────
  const powerLabel =
    score >= 80 ? "🔥 Incredible" :
    score >= 60 ? "⚡ Strong" :
    score >= 40 ? "📈 Taking shape" :
    score > 0   ? "🌱 Keep building" : "Drop champions onto the board";

  const powerBarCls =
    score >= 80 ? "bg-purple-400" :
    score >= 60 ? "bg-yellow-400" :
    score >= 40 ? "bg-blue-400" : "bg-white/20";

  // ── Pool panel ────────────────────────────────────────────────────────────
  const poolPanel = (
    <div className="flex flex-col gap-3 h-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search champion…"
        className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/40 transition shrink-0"
      />

      {/* Trait filter */}
      <div className="shrink-0">
        <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest mb-2 px-0.5">Filter by Trait</p>
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
          <button
            onClick={() => setTraitFilter("all")}
            className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition ${
              traitFilter === "all"
                ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                : "bg-white/5 border-white/8 text-text-muted hover:border-white/15 hover:text-text-secondary"
            }`}
          >
            All
          </button>
          {allTraitNames.map((t) => (
            <button
              key={t}
              onClick={() => setTraitFilter(traitFilter === t ? "all" : t)}
              className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition ${
                traitFilter === t
                  ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                  : "bg-white/5 border-white/8 text-text-muted hover:border-white/15 hover:text-text-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[11px] text-text-muted shrink-0 px-0.5">
        {filteredPool.length} champion{filteredPool.length !== 1 ? "s" : ""}
        {traitFilter !== "all" && <span className="text-accent-purple-light ml-1">· {traitFilter}</span>}
      </p>

      {/* Champion grid — scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-4 gap-3">
          {filteredPool.map((c) => (
            <PoolCard
              key={c.id}
              champ={c}
              onBoard={boardCounts[c.id] ?? 0}
              selected={selectedChamp?.id === c.id}
              onDragStart={handlePoolDragStart}
              onClick={handlePoolClick}
            />
          ))}
          {filteredPool.length === 0 && (
            <p className="col-span-4 text-center text-text-muted text-sm py-8">No champions found</p>
          )}
        </div>
      </div>
    </div>
  );

  // ── Synergy panel ──────────────────────────────────────────────────────────
  const synPanel = (
    <div className="flex flex-col gap-3 h-full">
      {/* Power card */}
      <div className="bg-bg-elevated rounded-xl border border-white/8 p-4 shrink-0">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[9px] text-text-muted font-semibold uppercase tracking-widest">Team Power</p>
            <p className="text-4xl font-black text-text-primary leading-none mt-1">{score}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted">{placed.length} units · {totalCost}g</p>
            <p className="text-xs text-text-secondary mt-0.5">{activeSynCount} active syn.</p>
          </div>
        </div>
        <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${powerBarCls}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-[11px] text-text-muted">{powerLabel}</p>
      </div>

      {/* Synergies — scrollable */}
      {activeTraits.length > 0 ? (
        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto min-h-0">
          <p className="text-[9px] text-text-muted font-semibold uppercase tracking-widest px-0.5 shrink-0">
            Synergies ({activeSynCount} active)
          </p>
          {activeTraits.map((at) => (
            <TraitRow key={at.trait.id} at={at} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-muted text-sm text-center">Add champions to see synergies</p>
        </div>
      )}
    </div>
  );

  return (
    <PageShell title="Team Builder" subtitle="Drag or click champions · Synergies update live">

      {/* ── Desktop: three-column full-height layout ─────────────────────── */}
      <div
        className="hidden lg:flex gap-0 -mx-6 lg:-mx-8 -mt-6 overflow-hidden"
        style={{ height: "calc(100vh - 9.5rem)" }}
      >
        {/* Pool */}
        <div className="w-[520px] shrink-0 border-r border-white/5 flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 shrink-0">
            <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest">Champion Pool</p>
          </div>
          <div className="flex-1 overflow-hidden px-4 py-4 min-h-0">
            {poolPanel}
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Board header */}
          <div className="px-6 py-3 border-b border-white/5 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest">Board</p>
                <p className="text-sm text-text-secondary mt-0.5 font-medium">{placed.length} / 9 units</p>
              </div>
              <div className="flex items-center gap-3">
                {selectedChamp && (
                  <div className="flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/20 rounded-xl px-3 py-2 text-sm text-accent-gold">
                    <img src={selectedChamp.icon} className="w-5 h-5 rounded-full object-cover" alt="" draggable={false} />
                    <span className="font-medium">{selectedChamp.name}</span>
                    <span className="text-accent-gold/60 text-xs">— click a hex to place</span>
                    <button onClick={() => setSelectedChamp(null)} className="text-accent-gold/50 hover:text-accent-gold ml-1 text-lg leading-none">×</button>
                  </div>
                )}
                {placed.length > 0 && (
                  <button onClick={clearBoard} className="text-sm text-text-muted hover:text-text-secondary border border-white/8 rounded-xl px-4 py-2 hover:bg-white/5 transition">
                    Clear
                  </button>
                )}
              </div>
            </div>
            {/* Role legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(ROLE_META).map(([, r]) => (
                <span key={r.label} className="flex items-center gap-1 text-[10px] text-text-muted">
                  <span
                    style={{ background: r.bg }}
                    className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight"
                  >
                    {r.label}
                  </span>
                  {r.full}
                </span>
              ))}
            </div>
          </div>

          {/* Hex grid area — fills all remaining space */}
          <div
            ref={boardAreaRef}
            className="flex-1 flex items-center justify-center overflow-hidden"
          >
            <div style={{ width: boardW, flexShrink: 0 }}>
              {Array.from({ length: ROWS }, (_, r) => (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    gap: GAP,
                    marginLeft: r % 2 === 1 ? (cell + GAP) / 2 : 0,
                    marginBottom: r < ROWS - 1 ? GAP : 0,
                  }}
                >
                  {Array.from({ length: COLS }, (_, c) => {
                    const k = `${r}-${c}`;
                    return (
                      <HexCell
                        key={k}
                        hexKey={k}
                        champion={board[k]}
                        cell={cell}
                        isDragOver={dragOverKey === k}
                        onDragStart={handleBoardDragStart}
                        onDragOver={setDragOverKey}
                        onDragLeave={() => setDragOverKey(null)}
                        onDrop={handleDrop}
                        onClick={handleHexClick}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-3 text-[11px] text-text-muted opacity-50 shrink-0">
            Drag from pool · click to select then click hex · click champion to remove
          </div>
        </div>

        {/* Synergies */}
        <div className="w-80 shrink-0 border-l border-white/5 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden px-4 py-4 min-h-0">
            {synPanel}
          </div>
        </div>
      </div>

      {/* ── Mobile layout ─────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col" style={{ minHeight: "calc(100vh - 8rem)" }}>

        {/* Power strip */}
        <div className="flex items-center gap-3 px-1 mb-3 shrink-0">
          <div className="flex-1 h-2.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${powerBarCls}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className={`text-base font-black tabular-nums ${
            score >= 80 ? "text-purple-300" : score >= 60 ? "text-yellow-300" : score >= 40 ? "text-blue-300" : "text-text-muted"
          }`}>{score}</span>
          <span className="text-xs text-text-muted">{placed.length}/9 · {activeSynCount} syn</span>
          {placed.length > 0 && (
            <button onClick={clearBoard} className="text-[11px] text-text-muted border border-white/8 rounded-lg px-2 py-1">
              Clear
            </button>
          )}
        </div>

        {/* Hex board — auto-scales to width, no horizontal scroll */}
        <div ref={mobileBoardRef} className="px-1 mb-3 shrink-0">
          {(() => {
            const mBoardW = COLS * mobileCell + (COLS - 1) * GAP + Math.ceil((mobileCell + GAP) / 2);
            return (
              <div style={{ width: mBoardW, margin: "0 auto" }}>
                {Array.from({ length: ROWS }, (_, r) => (
                  <div
                    key={r}
                    style={{
                      display: "flex",
                      gap: GAP,
                      marginLeft: r % 2 === 1 ? (mobileCell + GAP) / 2 : 0,
                      marginBottom: r < ROWS - 1 ? GAP : 0,
                    }}
                  >
                    {Array.from({ length: COLS }, (_, c) => {
                      const k = `${r}-${c}`;
                      return (
                        <HexCell
                          key={k}
                          hexKey={k}
                          champion={board[k]}
                          cell={mobileCell}
                          isDragOver={dragOverKey === k}
                          onDragStart={handleBoardDragStart}
                          onDragOver={setDragOverKey}
                          onDragLeave={() => setDragOverKey(null)}
                          onDrop={handleDrop}
                          onClick={handleHexClick}
                          onTouchStart={handleHexTouchStart}
                          onTouchMove={handleHexTouchMove}
                          onTouchEnd={handleHexTouchEnd}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Bottom sheet */}
        <div className="flex-1 flex flex-col min-h-0 bg-bg-surface rounded-t-2xl border-t border-x border-white/8 overflow-hidden">
          {/* Sheet handle + tabs */}
          <div className="shrink-0">
            <div className="flex justify-center pt-2.5 pb-1">
              <button
                onClick={() => setSheetOpen(v => !v)}
                className="w-10 h-1 bg-white/20 rounded-full"
              />
            </div>
            <div className="flex gap-1 px-3 pb-2">
              {(["pool", "synergies"] as MobilePanel[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setMobilePanel(p); setSheetOpen(true); }}
                  className={`flex-1 text-xs font-semibold py-2 rounded-xl transition ${
                    mobilePanel === p && sheetOpen
                      ? "bg-bg-elevated text-text-primary"
                      : "text-text-muted"
                  }`}
                >
                  {p === "pool" ? `🎯 Pool (${filteredPool.length})` : `⚡ Synergies (${activeSynCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Sheet content */}
          {sheetOpen && (
            <div className="flex-1 overflow-y-auto min-h-0 px-3 pb-4">
              {mobilePanel === "pool" ? (
                <div className="flex flex-col gap-3">
                  {/* Search + trait filter */}
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search champion…"
                    className="w-full bg-bg-elevated border border-white/10 rounded-xl px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/40"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setTraitFilter("all")}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition ${
                        traitFilter === "all"
                          ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                          : "bg-white/5 border-white/8 text-text-muted"
                      }`}
                    >All</button>
                    {allTraitNames.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTraitFilter(traitFilter === t ? "all" : t)}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition ${
                          traitFilter === t
                            ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                            : "bg-white/5 border-white/8 text-text-muted"
                        }`}
                      >{t}</button>
                    ))}
                  </div>
                  {/* 3-col compact cards — bigger touch targets */}
                  <div className="grid grid-cols-3 gap-2">
                    {filteredPool.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handlePoolClick(c)}
                        className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all ${
                          boardCounts[c.id] ? "opacity-50 bg-white/4" : "bg-bg-elevated active:scale-95"
                        }`}
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-bg-surface">
                          <img src={c.icon} alt={c.name} className="w-full h-full object-cover"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }} />
                        </div>
                        <span className="text-[11px] text-text-primary font-semibold text-center leading-tight break-words w-full">{c.name}</span>
                        <div className="flex flex-wrap gap-0.5 justify-center">
                          {c.traits.slice(0, 2).map((t) => (
                            <span key={t} className="text-[8px] text-text-muted bg-white/5 rounded px-1">{t}</span>
                          ))}
                        </div>
                        {/* Cost pip */}
                        <div
                          style={{ background: COST_RING[c.cost]?.bg, color: COST_RING[c.cost]?.text }}
                          className="absolute top-2 left-2 text-[9px] font-black px-1.5 rounded-full leading-tight"
                        >{c.cost}g</div>
                        {boardCounts[c.id] ? (
                          <div className="absolute top-2 right-2 bg-accent-gold text-bg-base text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                            {boardCounts[c.id]}
                          </div>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Synergies */
                <div className="flex flex-col gap-2.5 pt-1">
                  {/* Compact power card */}
                  <div className="bg-bg-elevated rounded-xl border border-white/8 px-4 py-3 flex items-center gap-4">
                    <div>
                      <p className="text-[9px] text-text-muted uppercase tracking-widest">Power</p>
                      <p className="text-3xl font-black text-text-primary leading-none">{score}</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-1.5">
                        <div className={`h-full rounded-full transition-all duration-500 ${powerBarCls}`} style={{ width: `${score}%` }} />
                      </div>
                      <p className="text-[11px] text-text-muted">{powerLabel}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-text-muted">{placed.length} units</p>
                      <p className="text-xs text-text-secondary">{activeSynCount} syn.</p>
                    </div>
                  </div>
                  {activeTraits.length > 0
                    ? activeTraits.map((at) => <TraitRow key={at.trait.id} at={at} />)
                    : <p className="text-center text-text-muted text-sm py-8">Add champions to see synergies</p>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    champions: championsData as unknown as Champion[],
    traits: traitsData as Trait[],
  },
});
