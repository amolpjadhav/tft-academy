import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import type { GetStaticProps } from "next";
import type { Champion } from "@/types/champion";
import type { Trait } from "@/types/trait";
import PageShell from "@/components/layout/PageShell";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
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
const MIN_CELL = 50;
const MAX_CELL = 130;

const ROLE_META: Record<string, { label: string; full: string; bg: string; icon: string }> = {
  tank:        { label: "Tank",  full: "Tank — absorbs damage, protects the backline",          bg: "#1d4ed8", icon: "🛡️" },
  ad_carry:    { label: "ADC",   full: "ADC (Attack Damage Carry) — ranged physical damage",    bg: "#b45309", icon: "🏹" },
  ap_carry:    { label: "APC",   full: "APC (Ability Power Carry) — burst magic damage",        bg: "#7e22ce", icon: "✨" },
  melee_carry: { label: "Carry", full: "Carry — melee damage dealer, fights in the frontline",  bg: "#c2410c", icon: "⚔️" },
  support:     { label: "Sup",   full: "Support — heals, shields, or empowers teammates",       bg: "#15803d", icon: "💚" },
};

// Champion type → top-bar color (magic=purple, attack=amber, hybrid=green)
const CHAMP_TYPE_COLOR: Record<string, string> = {
  "Magic Caster":      "#a78bfa",
  "Magic Fighter":     "#818cf8",
  "Magic Tank":        "#22d3ee",
  "Magic Marksman":    "#e879f9",
  "Magic Assassin":    "#c084fc",
  "Attack Caster":     "#fb923c",
  "Attack Fighter":    "#f87171",
  "Attack Tank":       "#94a3b8",
  "Attack Marksman":   "#fbbf24",
  "Attack Specialist": "#34d399",
  "Attack Assassin":   "#fb7185",
  "Hybrid Fighter":    "#4ade80",
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

// Tier dot colors (hex values for inline style)
const TIER_DOT_COLOR: Record<number, string> = {
  1: "#b45309",
  2: "#94a3b8",
  3: "#facc15",
  4: "#c084fc",
};

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
  // Deduplicate by champion id — same champion on multiple hexes counts once
  const seen = new Set<string>();
  getPlaced(board).forEach((ch) => {
    if (seen.has(ch.id)) return;
    seen.add(ch.id);
    ch.traits.forEach((t) => { counts[t] = (counts[t] ?? 0) + 1; });
  });
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


// ── Team Composition ──────────────────────────────────────────────────────────
interface TeamComposition {
  physical:  number; // 0-100
  magic:     number;
  defense:   number;
  mobility:  number;
  sustain:   number;
}

const TYPE_WEIGHTS: Record<string, TeamComposition> = {
  "Attack Caster":      { physical: 1.5, magic: 0.5, defense: 0.2, mobility: 0.5, sustain: 0.2 },
  "Attack Fighter":     { physical: 1.5, magic: 0,   defense: 1,   mobility: 0.8, sustain: 0.5 },
  "Attack Tank":        { physical: 0.5, magic: 0,   defense: 2,   mobility: 0.2, sustain: 1.5 },
  "Attack Marksman":    { physical: 2,   magic: 0,   defense: 0.1, mobility: 1,   sustain: 0.1 },
  "Attack Specialist":  { physical: 1.5, magic: 0.3, defense: 0.2, mobility: 0.5, sustain: 0.2 },
  "Attack Assassin":    { physical: 2,   magic: 0,   defense: 0.1, mobility: 2,   sustain: 0.1 },
  "Magic Caster":       { physical: 0,   magic: 2,   defense: 0.2, mobility: 0.3, sustain: 0.3 },
  "Magic Fighter":      { physical: 0.3, magic: 1.5, defense: 1,   mobility: 0.8, sustain: 0.5 },
  "Magic Tank":         { physical: 0,   magic: 0.5, defense: 2,   mobility: 0.2, sustain: 2   },
  "Magic Marksman":     { physical: 0,   magic: 2,   defense: 0.1, mobility: 1,   sustain: 0.1 },
  "Magic Assassin":     { physical: 0,   magic: 2,   defense: 0.1, mobility: 2,   sustain: 0.1 },
  "Hybrid Fighter":     { physical: 1,   magic: 1,   defense: 0.8, mobility: 0.8, sustain: 0.5 },
};

const COMP_MAX = 12; // normalise: 6 top-tier contributors = 100%

function calcTeamComposition(board: BoardMap): TeamComposition {
  const totals: TeamComposition = { physical: 0, magic: 0, defense: 0, mobility: 0, sustain: 0 };
  const seen = new Set<string>();
  getPlaced(board).forEach((ch) => {
    if (seen.has(ch.id)) return;
    seen.add(ch.id);
    const w = ch.championType ? (TYPE_WEIGHTS[ch.championType] ?? null) : null;
    if (!w) {
      // Fallback: use raw stats to approximate
      const ad = ch.stats.attackDamage / 80;
      totals.physical += ad;
      totals.defense  += (ch.stats.hp / 800) * 2;
      totals.sustain  += ch.stats.hp / 1000;
    } else {
      (Object.keys(totals) as (keyof TeamComposition)[]).forEach((k) => {
        totals[k] += w[k];
      });
    }
  });
  return {
    physical: Math.min(100, Math.round((totals.physical / COMP_MAX) * 100)),
    magic:    Math.min(100, Math.round((totals.magic    / COMP_MAX) * 100)),
    defense:  Math.min(100, Math.round((totals.defense  / COMP_MAX) * 100)),
    mobility: Math.min(100, Math.round((totals.mobility / COMP_MAX) * 100)),
    sustain:  Math.min(100, Math.round((totals.sustain  / COMP_MAX) * 100)),
  };
}

// ── BoardCard — floating portrait card replacing the hex cell ──────────────────
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
  const costColor = champion ? (COST_RING[champion.cost]?.bg ?? "#525252") : undefined;
  const costText  = champion ? (COST_RING[champion.cost]?.text ?? "#fff") : undefined;
  const nameFontSize = Math.max(8, Math.round(cell * 0.115));
  const radius = Math.max(6, Math.round(cell * 0.1));

  return (
    <div
      data-hex-key={hexKey}
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
      style={{
        width: cell,
        height: Math.round(cell * 1.25), // taller than wide — portrait cards
        flexShrink: 0,
        borderRadius: radius,
        overflow: "hidden",
        transition: "transform 0.15s, box-shadow 0.15s",
        // glow on drag-over
        ...(isDragOver ? {
          boxShadow: "0 0 0 2px #8b5cf6, 0 0 20px rgba(139,92,246,0.5)",
          transform: "scale(1.04)",
        } : champion ? {
          boxShadow: `0 0 0 2px ${costColor}, 0 4px 16px rgba(0,0,0,0.5)`,
        } : {
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }),
      }}
    >
      {/* ── Empty slot ── */}
      {!champion && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-all"
          style={{
            background: isDragOver
              ? "rgba(99,102,241,0.25)"
              : "linear-gradient(160deg, #0d1b3e 0%, #0a1428 60%, #080e1f 100%)",
            border: isDragOver
              ? "1.5px dashed rgba(99,102,241,0.8)"
              : "1.5px solid rgba(59,91,180,0.25)",
            boxShadow: isDragOver ? "inset 0 0 16px rgba(99,102,241,0.2)" : "inset 0 1px 0 rgba(100,140,255,0.06)",
          }}
        >
          {isDragOver ? (
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(139,92,246,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#c4b5fd", fontSize: 14, lineHeight: 1 }}>+</span>
            </div>
          ) : (
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(59,91,180,0.4)", boxShadow: "0 0 6px rgba(99,102,241,0.3)" }} />
          )}
        </div>
      )}

      {/* ── Occupied card ── */}
      {champion && (
        <>
          {/* Portrait fills entire card */}
          <img
            src={champion.icon}
            alt={champion.name}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          />
          {/* Gradient overlay — stronger at bottom for readability */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.82) 100%)" }}
          />
          {/* Hover dim */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.25)" }} />

          {/* Champion type color bar — top edge */}
          {champion.championType && CHAMP_TYPE_COLOR[champion.championType] && (
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 3,
              background: CHAMP_TYPE_COLOR[champion.championType],
              zIndex: 3,
              opacity: 0.9,
            }} />
          )}

          {/* Cost dot — top-left */}
          <div
            style={{
              position: "absolute",
              top: 4, left: 5,
              width: Math.max(14, Math.round(cell * 0.18)),
              height: Math.max(14, Math.round(cell * 0.18)),
              borderRadius: "50%",
              background: costColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: Math.max(7, Math.round(cell * 0.1)),
              fontWeight: 900,
              color: costText,
              lineHeight: 1,
            }}
          >
            {champion.cost}
          </div>

          {/* Name + type — bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0, right: 0,
              padding: `4px 4px 5px`,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{
              fontSize: nameFontSize,
              fontWeight: 700,
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}>
              {champion.name}
            </div>
            {champion.championType && CHAMP_TYPE_COLOR[champion.championType] && cell >= 64 && (
              <div style={{
                fontSize: Math.max(7, Math.round(cell * 0.09)),
                fontWeight: 600,
                color: CHAMP_TYPE_COLOR[champion.championType],
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.3,
                opacity: 0.9,
              }}>
                {champion.championType}
              </div>
            )}
          </div>
        </>
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
  const costColor = COST_RING[champ.cost]?.bg ?? "#525252";

  return (
    <div
      draggable
      onDragStart={() => onDragStart(champ)}
      onClick={() => onClick(champ)}
      title={champ.championType ? `${champ.name} — ${champ.championType}` : champ.name}
      className={`relative cursor-pointer select-none transition-all group ${
        selected ? "scale-105" : ""
      }`}
      style={{ width: 52, height: 52 }}
    >
      {/* Cost ring border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          border: `3px solid ${costColor}`,
          zIndex: 2,
          pointerEvents: "none",
          boxSizing: "border-box",
          ...(selected ? { boxShadow: `0 0 8px ${costColor}` } : {}),
        }}
      />
      {/* Portrait */}
      <div className="absolute inset-0 rounded-lg overflow-hidden bg-bg-elevated">
        <img
          src={champ.icon}
          alt={champ.name}
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
        />
        {/* Champion type bar — top edge */}
        {champ.championType && CHAMP_TYPE_COLOR[champ.championType] && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 2.5,
            background: CHAMP_TYPE_COLOR[champ.championType],
            zIndex: 3, opacity: 0.9,
          }} />
        )}
        {/* Hover name overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-3 pb-0.5 px-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p
            style={{ fontSize: 7, lineHeight: 1.2, color: COST_RING[champ.cost]?.text ?? "#fff" }}
            className="text-center font-bold truncate"
          >
            {champ.name}
          </p>
        </div>
      </div>
      {/* On-board count badge */}
      {onBoard > 0 && (
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center z-10"
          style={{ background: "#f59e0b", color: "#0a0a12", fontSize: 9, fontWeight: 900 }}
        >
          {onBoard}
        </div>
      )}
    </div>
  );
}

// Tier config for readable display
const TIER_CFG = [
  { label: "",          rowBg: "transparent",            border: "rgba(255,255,255,0.07)", nameColor: "rgba(255,255,255,0.35)", countBg: "rgba(255,255,255,0.08)", countText: "rgba(255,255,255,0.4)",  chipActiveBg: "rgba(255,255,255,0.1)",  chipActiveText: "#fff" },
  { label: "Bronze",    rowBg: "rgba(180,83,9,0.18)",     border: "#b45309",                nameColor: "#fdba74",               countBg: "#b45309",                countText: "#fff",                   chipActiveBg: "#b45309",                chipActiveText: "#fff" },
  { label: "Silver",    rowBg: "rgba(148,163,184,0.14)",  border: "#94a3b8",                nameColor: "#cbd5e1",               countBg: "#64748b",                countText: "#fff",                   chipActiveBg: "#64748b",                chipActiveText: "#fff" },
  { label: "Gold",      rowBg: "rgba(250,204,21,0.14)",   border: "#facc15",                nameColor: "#fde047",               countBg: "#ca8a04",                countText: "#fff",                   chipActiveBg: "#ca8a04",                chipActiveText: "#fff" },
  { label: "Prismatic", rowBg: "rgba(192,132,252,0.16)",  border: "#c084fc",                nameColor: "#e9d5ff",               countBg: "#9333ea",                countText: "#fff",                   chipActiveBg: "#9333ea",                chipActiveText: "#fff" },
];

// ── TraitRow — trait header + always-visible champion pills ───────────────────
function TraitRow({
  at,
  traitChampions,
  boardCounts,
  onDragStart,
  onPoolClick,
}: {
  at: ActiveTrait;
  traitChampions: Champion[];
  boardCounts: Record<string, number>;
  onDragStart: (c: Champion) => void;
  onPoolClick: (c: Champion) => void;
}) {
  const { trait, count, nextBp, activeStyle } = at;
  const bps = [...trait.breakpoints].sort((a, b) => a.minUnits - b.minUnits);
  const cfg = TIER_CFG[activeStyle] ?? TIER_CFG[0];

  return (
    <div
      style={{
        borderRadius: 12,
        background: cfg.rowBg,
        borderLeft: `3px solid ${cfg.border}`,
        opacity: activeStyle === 0 ? 0.45 : 1,
        transition: "opacity 0.2s, background 0.2s",
        overflow: "hidden",
        padding: "10px 12px 10px 14px",
      }}
    >
      {/* ── Header row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        {/* Trait icon */}
        <div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,0.06)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={trait.icon}
            alt={trait.name}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Name + breakpoints */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: cfg.nameColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {trait.name}
            </span>
            {activeStyle > 0 && (
              <span style={{ fontSize: 10, fontWeight: 600, color: cfg.nameColor, opacity: 0.7, flexShrink: 0 }}>
                {cfg.label}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "nowrap" }}>
            {bps.map((bp, i) => {
              const activated = count >= bp.minUnits;
              const bpCfg = TIER_CFG[bp.style] ?? TIER_CFG[1];
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 11, fontWeight: 700,
                    padding: "2px 7px", borderRadius: 9999, lineHeight: 1.5, flexShrink: 0,
                    background: activated ? bpCfg.chipActiveBg : "rgba(255,255,255,0.06)",
                    color: activated ? bpCfg.chipActiveText : "rgba(255,255,255,0.3)",
                    border: activated ? "none" : "1px solid rgba(255,255,255,0.12)",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {bp.minUnits}
                </span>
              );
            })}
            {nextBp && (
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 2, whiteSpace: "nowrap" }}>
                +{nextBp.minUnits - count} more
              </span>
            )}
          </div>
        </div>

        {/* Count badge */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: cfg.countBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 900, color: cfg.countText,
        }}>
          {count}
        </div>
      </div>

      {/* ── Champion pills — horizontally scrollable ── */}
      <div style={{ display: "flex", flexWrap: "nowrap", gap: 5, overflowX: "auto", paddingBottom: 4, msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {traitChampions.map((champ) => {
          const onBoard  = boardCounts[champ.id] ?? 0;
          const costBg   = COST_RING[champ.cost]?.bg   ?? "#525252";
          const costText = COST_RING[champ.cost]?.text ?? "#fff";
          return (
            <div
              key={champ.id}
              draggable
              onDragStart={() => onDragStart(champ)}
              onClick={() => onPoolClick(champ)}
              title={`Add ${champ.name} to board`}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 8px 4px 5px",
                borderRadius: 7,
                cursor: "pointer",
                userSelect: "none",
                flexShrink: 0,
                background: onBoard > 0 ? `${costBg}30` : "rgba(255,255,255,0.05)",
                border: `1.5px solid ${onBoard > 0 ? costBg : "rgba(255,255,255,0.1)"}`,
                opacity: onBoard > 0 ? 0.65 : 1,
                transition: "background 0.15s, border-color 0.15s, opacity 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = `${costBg}40`;
                el.style.borderColor = costBg;
                el.style.opacity = "1";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = onBoard > 0 ? `${costBg}30` : "rgba(255,255,255,0.05)";
                el.style.borderColor = onBoard > 0 ? costBg : "rgba(255,255,255,0.1)";
                el.style.opacity = onBoard > 0 ? "0.65" : "1";
              }}
            >
              {/* Portrait */}
              <div style={{ width: 22, height: 22, borderRadius: 4, overflow: "hidden", flexShrink: 0, background: "#0a1428" }}>
                <img
                  src={champ.icon}
                  alt={champ.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                />
              </div>
              {/* Name */}
              <span style={{ fontSize: 12, fontWeight: 600, color: onBoard > 0 ? "rgba(255,255,255,0.5)" : "#fff", whiteSpace: "nowrap" }}>
                {champ.name}
              </span>
              {/* Cost badge */}
              <span style={{
                fontSize: 10, fontWeight: 800,
                padding: "1px 5px", borderRadius: 9999,
                background: costBg, color: costText,
                lineHeight: 1.5, flexShrink: 0,
              }}>
                {champ.cost}g
              </span>
              {/* On-board checkmark */}
              {onBoard > 0 && (
                <div style={{
                  position: "absolute", top: -4, right: -4,
                  width: 13, height: 13, borderRadius: "50%",
                  background: "#22c55e", color: "#000",
                  fontSize: 8, fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function TeamBuilderPage({ champions, traits }: Props) {
  const [board, setBoard] = useState<BoardMap>(makeBoard);
  const [traitFilter, setTraitFilter] = useState<TraitFilter>("all");
  const [costFilter, setCostFilter] = useState<number | "all">("all");
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
      const fromW = (w - (COLS - 1) * GAP) / COLS;
      // card height = cell * 1.25, rows have GAP between them
      const fromH = (h - (ROWS - 1) * GAP) / ROWS / 1.25;
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
      const computed = Math.floor((w - (COLS - 1) * GAP) / COLS);
      setMobileCell(Math.max(30, Math.min(56, computed)));
    };
    compute();
    const obs = new ResizeObserver(compute);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Touch drag handlers (board → board) ──────────────────────────────
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
  const teamComp = useMemo(() => calcTeamComposition(board), [board]);

  // Map champion name → full Champion object for the synergy panel
  const champByName = useMemo(() => {
    const m: Record<string, Champion> = {};
    champions.forEach((c) => { m[c.name] = c; });
    return m;
  }, [champions]);
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
      const matchCost = costFilter === "all" || c.cost === costFilter;
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.traits.some((t) => t.toLowerCase().includes(q));
      return matchTrait && matchCost && matchQ;
    });
  }, [champions, traitFilter, costFilter, query]);

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

  const powerNumColor =
    score >= 80 ? "#c084fc" :
    score >= 60 ? "#facc15" :
    score >= 40 ? "#60a5fa" :
    score > 0   ? "#94a3b8" : "rgba(255,255,255,0.3)";

  // ── Board grid render — floating portrait cards ───────────────────────────
  function renderHexGrid(cellSize: number, withTouch: boolean) {

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>

            {/* Cards */}
            <div style={{ display: "flex", gap: GAP }}>
              {Array.from({ length: COLS }, (_, c) => {
                const k = `${r}-${c}`;
                return (
                  <HexCell
                    key={k}
                    hexKey={k}
                    champion={board[k]}
                    cell={cellSize}
                    isDragOver={dragOverKey === k}
                    onDragStart={handleBoardDragStart}
                    onDragOver={setDragOverKey}
                    onDragLeave={() => setDragOverKey(null)}
                    onDrop={handleDrop}
                    onClick={handleHexClick}
                    onTouchStart={withTouch ? handleHexTouchStart : undefined}
                    onTouchMove={withTouch ? handleHexTouchMove : undefined}
                    onTouchEnd={withTouch ? handleHexTouchEnd : undefined}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Sidebar — fixed, always present on desktop */}
      <Sidebar />

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (lg+)
          Full-viewport command center — no PageShell header waste
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col md:ml-56"
        style={{
          height: "100vh",
          background: "linear-gradient(160deg, #080e1f 0%, #0a0f1e 50%, #06091a 100%)",
          overflow: "hidden",
        }}
      >
        {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-6 shrink-0 border-b"
          style={{
            height: 56,
            background: "rgba(10,10,18,0.95)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {/* Left: title */}
          <div className="flex items-baseline gap-3">
            <h1
              className="font-heading text-xl tracking-wide"
              style={{
                background: "linear-gradient(90deg, #f59e0b 0%, #fde68a 50%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
              }}
            >
              Team Builder
            </h1>
            <span className="text-[11px] text-white/30 font-medium">Set 17 · Space Gods</span>
          </div>

          {/* Center: unit count + synergy count */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
            >
              <span>{placed.length} / 9 units</span>
            </div>
            {activeSynCount > 0 && (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{activeSynCount} active synergies</span>
            )}
          </div>

          {/* Right: clear + selected champion indicator */}
          <div className="flex items-center gap-3">
            {selectedChamp && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  color: "#f59e0b",
                }}
              >
                <img src={selectedChamp.icon} className="w-4 h-4 rounded object-cover" alt="" draggable={false} />
                <span className="font-medium">{selectedChamp.name}</span>
                <span style={{ color: "rgba(245,158,11,0.5)", fontSize: 10 }}>— click a hex</span>
                <button
                  onClick={() => setSelectedChamp(null)}
                  className="ml-1 text-base leading-none opacity-60 hover:opacity-100"
                >×</button>
              </div>
            )}
            {placed.length > 0 && (
              <button
                onClick={clearBoard}
                className="text-xs font-medium px-4 py-1.5 rounded-lg transition"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── TEAM COMPOSITION STRIP ───────────────────────────────────────── */}
        <div
          className="shrink-0 hidden lg:block"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.25)",
            padding: "10px 20px",
          }}
        >
          {placed.length === 0 ? (
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1 }}>
              Add champions to the board to see team composition
            </p>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              {(
                [
                  { key: "physical" as const, label: "Physical",  icon: "⚔️",  color: "#f97316", track: "rgba(249,115,22,0.15)"  },
                  { key: "magic"    as const, label: "Magic",     icon: "✨",  color: "#a78bfa", track: "rgba(167,139,250,0.15)" },
                  { key: "defense"  as const, label: "Defense",   icon: "🛡️", color: "#22d3ee", track: "rgba(34,211,238,0.15)"  },
                  { key: "mobility" as const, label: "Mobility",  icon: "💨",  color: "#f87171", track: "rgba(248,113,113,0.15)" },
                  { key: "sustain"  as const, label: "Sustain",   icon: "❤️",  color: "#4ade80", track: "rgba(74,222,128,0.15)"  },
                ] as { key: keyof TeamComposition; label: string; icon: string; color: string; track: string }[]
              ).map(({ key, label, icon, color, track }) => {
                const pct = teamComp[key];
                return (
                  <div key={key} style={{ flex: 1, minWidth: 0 }}>
                    {/* Label row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}>
                        <span>{icon}</span>
                        <span style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: pct >= 60 ? color : "rgba(255,255,255,0.35)" }}>
                        {pct}%
                      </span>
                    </div>
                    {/* Bar */}
                    <div style={{ height: 6, borderRadius: 9999, background: track, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          borderRadius: 9999,
                          background: color,
                          transition: "width 0.4s ease",
                          opacity: pct === 0 ? 0 : 1,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── THREE-ZONE BODY ───────────────────────────────────────────────── */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* LEFT PANEL — Trait synergies */}
          <div
            className="shrink-0 flex flex-col"
            style={{
              width: 280,
              background: "rgba(255,255,255,0.02)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              height: "100%",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{ height: 48, borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                Synergies
              </span>
              {activeSynCount > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 9999, background: "rgba(139,92,246,0.25)", color: "#c084fc" }}>
                  {activeSynCount} active
                </span>
              )}
            </div>

            {/* Trait list — fills full remaining height, scrollable */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 6, minHeight: 0 }}>
              {activeTraits.length > 0 ? (
                activeTraits.map((at) => (
                  <TraitRow
                    key={at.trait.id}
                    at={at}
                    traitChampions={at.trait.champions.map(c => champByName[c.name]).filter(Boolean)}
                    boardCounts={boardCounts}
                    onDragStart={handlePoolDragStart}
                    onPoolClick={handlePoolClick}
                  />
                ))
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 13, textAlign: "center", padding: "0 16px", lineHeight: 1.6 }}>
                    Drop champions onto the board to see synergies
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CENTER — Board */}
          <div
            ref={boardAreaRef}
            className="flex-1 flex items-center justify-center min-w-0 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.01)" }}
          >
            {renderHexGrid(cell, false)}
          </div>

          {/* RIGHT PANEL — Champion pool (320px) */}
          <div
            className="shrink-0 flex flex-col overflow-hidden"
            style={{
              width: 320,
              background: "rgba(10,10,18,0.9)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Search + cost filters */}
            <div
              className="px-3 py-3 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Search input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search champions…"
                className="w-full px-4 py-2 text-sm text-text-primary placeholder:text-white/25 focus:outline-none transition"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 9999,
                  color: "#fff",
                  marginBottom: 10,
                }}
              />
              {/* Cost filter buttons */}
              <div className="flex gap-1.5">
                {(["all", 1, 2, 3, 4, 5] as (number | "all")[]).map((cost) => {
                  const active = costFilter === cost;
                  const bg = cost !== "all" ? COST_RING[cost as number]?.bg : undefined;
                  return (
                    <button
                      key={cost}
                      onClick={() => setCostFilter(cost)}
                      className="flex-1 text-[11px] font-bold py-1 rounded-full transition"
                      style={{
                        background: active
                          ? (bg ?? "rgba(139,92,246,0.4)")
                          : "rgba(255,255,255,0.05)",
                        color: active
                          ? (cost !== "all" ? (COST_RING[cost as number]?.text ?? "#fff") : "#fff")
                          : "rgba(255,255,255,0.4)",
                        border: active
                          ? "none"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {cost === "all" ? "All" : `${cost}g`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Count */}
            <div className="px-3 pt-2 pb-1 shrink-0">
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {filteredPool.length} champion{filteredPool.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Champion grid — scrollable, 5 cols of 52px squares */}
            <div className="flex-1 overflow-y-auto min-h-0 px-3 pb-3">
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(5, 52px)" }}
              >
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
                  <p
                    className="col-span-5 text-center text-xs py-8"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    No champions found
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  (< lg)
          Uses PageShell for mobile nav/header, stacked layout
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        <PageShell title="Team Builder" subtitle="Drag or click champions · Synergies update live">
          <div className="flex flex-col" style={{ minHeight: "calc(100vh - 8rem)" }}>

            {/* Power strip */}
            <div className="flex items-center gap-3 px-1 mb-3 shrink-0">
              <span className="text-xs text-text-muted">{placed.length}/9 units · {activeSynCount} synergies</span>
              {placed.length > 0 && (
                <button
                  onClick={clearBoard}
                  className="text-[11px] text-text-muted border border-white/8 rounded-lg px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Hex board — auto-scales to width, no horizontal scroll */}
            <div
              ref={mobileBoardRef}
              className="px-1 mb-3 shrink-0"
              style={{ background: "#0a0a12", borderRadius: 12, padding: "12px 8px" }}
            >
              {renderHexGrid(mobileCell, true)}
            </div>

            {/* Bottom sheet */}
            <div
              className="flex-1 flex flex-col min-h-0 rounded-t-2xl overflow-hidden"
              style={{
                background: "rgba(10,10,18,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
              }}
            >
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
                      {p === "pool" ? `Pool (${filteredPool.length})` : `Synergies (${activeSynCount})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sheet content */}
              {sheetOpen && (
                <div className="flex-1 overflow-y-auto min-h-0 px-3 pb-4">
                  {mobilePanel === "pool" ? (
                    <div className="flex flex-col gap-3">
                      {/* Search */}
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search champion…"
                        className="w-full px-4 py-2 text-sm placeholder:text-white/25 focus:outline-none"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 9999,
                          color: "#fff",
                        }}
                      />
                      {/* Cost filter */}
                      <div className="flex gap-1.5">
                        {(["all", 1, 2, 3, 4, 5] as (number | "all")[]).map((cost) => {
                          const active = costFilter === cost;
                          const bg = cost !== "all" ? COST_RING[cost as number]?.bg : undefined;
                          return (
                            <button
                              key={cost}
                              onClick={() => setCostFilter(cost)}
                              className="flex-1 text-[11px] font-bold py-1 rounded-full transition"
                              style={{
                                background: active
                                  ? (bg ?? "rgba(139,92,246,0.4)")
                                  : "rgba(255,255,255,0.05)",
                                color: active
                                  ? (cost !== "all" ? (COST_RING[cost as number]?.text ?? "#fff") : "#fff")
                                  : "rgba(255,255,255,0.4)",
                                border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {cost === "all" ? "All" : `${cost}g`}
                            </button>
                          );
                        })}
                      </div>
                      {/* Trait filter pills */}
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setTraitFilter("all")}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition ${
                            traitFilter === "all"
                              ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                              : "bg-white/5 border-white/8 text-text-muted"
                          }`}
                        >All Traits</button>
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
                      {/* Champion grid — compact portrait cards */}
                      <div
                        className="grid gap-2"
                        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
                      >
                        {filteredPool.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handlePoolClick(c)}
                            className="relative transition-all active:scale-95"
                            style={{ aspectRatio: "1", borderRadius: 8, overflow: "visible" }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: 8,
                                border: `3px solid ${COST_RING[c.cost]?.bg ?? "#525252"}`,
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={c.icon}
                                alt={c.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                              />
                            </div>
                            {boardCounts[c.id] ? (
                              <div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center z-10"
                                style={{ background: "#f59e0b", color: "#0a0a12", fontSize: 9, fontWeight: 900 }}
                              >
                                {boardCounts[c.id]}
                              </div>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Synergies */
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
                      {/* Power card */}
                      <div style={{ borderRadius: 12, padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", gap: 16 }}>
                        <div>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Power</p>
                          <p style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, color: powerNumColor }}>{score}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 9999, overflow: "hidden", marginBottom: 6 }}>
                            <div className={`h-full rounded-full transition-all duration-500 ${powerBarCls}`} style={{ width: `${score}%` }} />
                          </div>
                          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{powerLabel}</p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{placed.length} units</p>
                          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{activeSynCount} active</p>
                        </div>
                      </div>
                      {activeTraits.length > 0
                        ? activeTraits.map((at) => (
                            <TraitRow
                              key={at.trait.id}
                              at={at}
                              traitChampions={at.trait.champions.map(c => champByName[c.name]).filter(Boolean)}
                              boardCounts={boardCounts}
                              onDragStart={handlePoolDragStart}
                              onPoolClick={handlePoolClick}
                            />
                          ))
                        : <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13, padding: "32px 0" }}>Add champions to see synergies</p>
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </PageShell>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    champions: championsData as unknown as Champion[],
    traits: traitsData as Trait[],
  },
});
