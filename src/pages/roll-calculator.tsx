import Head from "next/head";
import { useState, useMemo } from "react";
import PageShell from "@/components/layout/PageShell";
import {
  calcRollCDF,
  SHOP_ODDS,
  POOL_SIZE,
  CHAMPS_PER_TIER,
  pShop,
} from "@/utils/rollProbability";

// ─── constants ───────────────────────────────────────────────────────────────

const COST_COLOR: Record<number, { text: string; bar: string; bg: string; border: string }> = {
  1: { text: "text-neutral-300",  bar: "bg-neutral-400",  bg: "bg-neutral-500/15",  border: "border-neutral-500/30" },
  2: { text: "text-green-300",    bar: "bg-green-400",    bg: "bg-green-500/15",    border: "border-green-500/30" },
  3: { text: "text-blue-300",     bar: "bg-blue-400",     bg: "bg-blue-500/15",     border: "border-blue-500/30" },
  4: { text: "text-purple-300",   bar: "bg-purple-400",   bg: "bg-purple-500/15",   border: "border-purple-500/30" },
  5: { text: "text-amber-300",    bar: "bg-amber-400",    bg: "bg-amber-500/15",    border: "border-amber-500/30" },
};

const STAR_TARGET = [
  { label: "2★", copies: 3 },
  { label: "3★", copies: 9 },
];

// ─── sub-components ───────────────────────────────────────────────────────────

function Stepper({
  label, value, min, max, onChange,
}: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm font-bold disabled:opacity-30 hover:bg-white/10 transition-colors flex items-center justify-center"
        >−</button>
        <span className="text-sm font-bold text-text-primary w-5 text-center tabular-nums">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm font-bold disabled:opacity-30 hover:bg-white/10 transition-colors flex items-center justify-center"
        >+</button>
      </div>
    </div>
  );
}

function ProbBar({
  label, pct, color, sublabel,
}: { label: string; pct: number; color: string; sublabel?: string }) {
  const display = pct < 0.5 ? "<1%" : `${Math.round(pct)}%`;
  const barPct  = Math.max(2, pct);
  return (
    <div>
      <div className="flex items-end justify-between mb-1.5">
        <span className="text-xs text-text-muted">{label}</span>
        <div className="text-right">
          <span className={`text-xl font-bold tabular-nums ${pct >= 80 ? "text-accent-gold" : pct >= 50 ? "text-emerald-400" : pct >= 20 ? "text-blue-400" : "text-text-muted"}`}>
            {display}
          </span>
          {sublabel && <p className="text-[10px] text-text-muted/60 leading-none mt-0.5">{sublabel}</p>}
        </div>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${barPct}%` }}
        />
      </div>
    </div>
  );
}

/** SVG probability curve — shows how P(hit) grows as gold increases */
function ProbCurve({
  cdf2star, cdf3star, goldBudget, maxGold,
}: { cdf2star: number[]; cdf3star: number[]; goldBudget: number; maxGold: number }) {
  const W = 600; const H = 180;
  const PAD = { top: 12, right: 16, bottom: 32, left: 40 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const xOf = (gold: number) => PAD.left + (gold / maxGold) * innerW;
  const yOf = (p: number)    => PAD.top  + (1 - p) * innerH;

  const toPath = (cdf: number[]) => {
    const step = maxGold / (cdf.length - 1);
    return cdf.map((p, i) => `${i === 0 ? "M" : "L"} ${xOf(i * step).toFixed(1)} ${yOf(p).toFixed(1)}`).join(" ");
  };

  // Gridlines at 25 / 50 / 75 / 90%
  const grids = [0.25, 0.5, 0.75, 0.9];
  // Tick marks at 0 10 20 ... maxGold
  const xTicks = Array.from({ length: Math.floor(maxGold / 10) + 1 }, (_, i) => i * 10);

  const budgetX = xOf(Math.min(goldBudget, maxGold));
  const p2 = cdf2star[Math.min(Math.floor(goldBudget / 2), cdf2star.length - 1)] ?? 0;
  const p3 = cdf3star[Math.min(Math.floor(goldBudget / 2), cdf3star.length - 1)] ?? 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      aria-label="Roll probability curve"
    >
      {/* Grid lines */}
      {grids.map((g) => (
        <g key={g}>
          <line
            x1={PAD.left} x2={W - PAD.right}
            y1={yOf(g)}    y2={yOf(g)}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4"
          />
          <text x={PAD.left - 4} y={yOf(g) + 4} textAnchor="end"
            fontSize="9" fill="rgba(255,255,255,0.3)">
            {g * 100}%
          </text>
        </g>
      ))}

      {/* X axis ticks */}
      {xTicks.filter(t => t > 0).map((t) => (
        <text key={t} x={xOf(t)} y={H - 4} textAnchor="middle"
          fontSize="9" fill="rgba(255,255,255,0.3)">
          {t}g
        </text>
      ))}

      {/* 2★ area fill */}
      <path
        d={`${toPath(cdf2star)} L ${xOf(maxGold)} ${yOf(0)} L ${xOf(0)} ${yOf(0)} Z`}
        fill="rgba(52,211,153,0.06)"
      />
      {/* 3★ area fill */}
      <path
        d={`${toPath(cdf3star)} L ${xOf(maxGold)} ${yOf(0)} L ${xOf(0)} ${yOf(0)} Z`}
        fill="rgba(167,139,250,0.06)"
      />

      {/* 2★ curve */}
      <path d={toPath(cdf2star)} fill="none" stroke="rgba(52,211,153,0.85)" strokeWidth="2" strokeLinejoin="round" />
      {/* 3★ curve */}
      <path d={toPath(cdf3star)} fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="2" strokeLinejoin="round" />

      {/* Budget vertical line */}
      <line
        x1={budgetX} x2={budgetX}
        y1={PAD.top}  y2={H - PAD.bottom}
        stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeDasharray="4 3"
      />

      {/* Dots at intersection */}
      {p2 > 0.01 && (
        <circle cx={budgetX} cy={yOf(p2)} r="4" fill="rgb(52,211,153)" />
      )}
      {p3 > 0.01 && (
        <circle cx={budgetX} cy={yOf(p3)} r="4" fill="rgb(167,139,250)" />
      )}

      {/* Legend */}
      <g>
        <line x1={PAD.left} x2={PAD.left + 14} y1={PAD.top + 6} y2={PAD.top + 6} stroke="rgba(52,211,153,0.85)" strokeWidth="2" />
        <text x={PAD.left + 18} y={PAD.top + 10} fontSize="10" fill="rgba(52,211,153,0.85)">2★</text>
        <line x1={PAD.left + 40} x2={PAD.left + 54} y1={PAD.top + 6} y2={PAD.top + 6} stroke="rgba(167,139,250,0.85)" strokeWidth="2" />
        <text x={PAD.left + 58} y={PAD.top + 10} fontSize="10" fill="rgba(167,139,250,0.85)">3★</text>
        <line x1={PAD.left + 80} x2={PAD.left + 92} y1={PAD.top + 6} y2={PAD.top + 6} stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={PAD.left + 96} y={PAD.top + 10} fontSize="10" fill="rgba(245,158,11,0.7)">Your gold</text>
      </g>
    </svg>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function RollCalculator() {
  const [cost,    setCost]    = useState(3);
  const [level,   setLevel]   = useState(8);
  const [owned,   setOwned]   = useState(0);
  const [out,     setOut]     = useState(0);
  const [gold,    setGold]    = useState(40);

  const costColor = COST_COLOR[cost];
  const poolSize  = POOL_SIZE[cost];
  const maxOwnable = poolSize - 1; // can't own all copies

  // Clamp owned so it never exceeds available copies
  const safeOwned = Math.min(owned, poolSize - out - 1);
  const safeOut   = Math.min(out, poolSize - 1);

  const result2star = useMemo(
    () => calcRollCDF(cost, level, safeOwned, safeOut, 3, gold, 100),
    [cost, level, safeOwned, safeOut, gold]
  );
  const result3star = useMemo(
    () => calcRollCDF(cost, level, safeOwned, safeOut, 9, gold, 100),
    [cost, level, safeOwned, safeOut, gold]
  );

  // P(single shop) for the info row
  const copiesRemaining = poolSize - safeOwned - safeOut;
  const pOneShop = pShop(cost, level, copiesRemaining);

  const fmt = (p: number | null) =>
    p === null ? "unlikely at max gold" : `${p}g`;

  return (
    <>
      <Head>
        <title>TFT Roll Probability Calculator — TFT School</title>
        <meta
          name="description"
          content="Calculate the exact probability of hitting a 2★ or 3★ champion in TFT Set 17. Enter your level, gold, and pool state to see your odds."
        />
      </Head>
      <PageShell
        title="Roll Probability Calculator"
        subtitle="What are the odds of hitting your champion?"
      >
        <div className="max-w-2xl mx-auto space-y-5">

          {/* ── Inputs ─────────────────────────────────────────────────── */}
          <section className="bg-bg-surface border border-white/8 rounded-2xl p-5 space-y-5">

            {/* Champion cost */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
                Champion Cost
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCost(c); setOwned(0); setOut(0); }}
                    className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${
                      cost === c
                        ? `${COST_COLOR[c].bg} ${COST_COLOR[c].border} ${COST_COLOR[c].text}`
                        : "bg-white/3 border-white/8 text-text-muted hover:bg-white/6"
                    }`}
                  >
                    {c}g
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
                Your Level
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {[4, 5, 6, 7, 8, 9, 10].map((l) => {
                  const odds = SHOP_ODDS[l][cost - 1];
                  const disabled = odds === 0;
                  return (
                    <button
                      key={l}
                      onClick={() => !disabled && setLevel(l)}
                      disabled={disabled}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-1 ${
                        level === l
                          ? `${costColor.bg} ${costColor.border} ${costColor.text}`
                          : "bg-white/3 border-white/8 text-text-muted hover:bg-white/6"
                      }`}
                    >
                      <div>Lv.{l}</div>
                      <div className="text-[9px] font-normal opacity-70 mt-0.5">
                        {disabled ? "—" : `${(odds * 100).toFixed(0)}%`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Owned / Out */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-elevated rounded-xl border border-white/6 px-4 py-3 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Copies Owned
                </p>
                <Stepper
                  label="In your hand"
                  value={owned}
                  min={0}
                  max={Math.min(8, poolSize - safeOut - 1)}
                  onChange={setOwned}
                />
              </div>
              <div className="bg-bg-elevated rounded-xl border border-white/6 px-4 py-3 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Copies Out
                </p>
                <Stepper
                  label="Other players"
                  value={out}
                  min={0}
                  max={Math.min(poolSize - safeOwned - 1, 14)}
                  onChange={setOut}
                />
              </div>
            </div>

            {/* Pool info */}
            <div className="flex items-center justify-between text-[11px] text-text-muted bg-bg-elevated/50 rounded-xl px-4 py-2.5">
              <span>Pool size: <strong className="text-text-primary">{poolSize} copies</strong> · {CHAMPS_PER_TIER[cost]} champions</span>
              <span>Available: <strong className={copiesRemaining <= 2 ? "text-red-400" : "text-emerald-400"}>{copiesRemaining}</strong> left</span>
            </div>

            {/* Gold slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  Gold to Roll
                </p>
                <span className={`text-lg font-bold tabular-nums ${costColor.text}`}>
                  {gold}g
                </span>
              </div>
              <input
                type="range"
                min={2} max={100} step={2}
                value={gold}
                onChange={(e) => setGold(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-text-muted/50 mt-1">
                <span>2g</span>
                <span>25g</span>
                <span>50g</span>
                <span>75g</span>
                <span>100g</span>
              </div>
            </div>
          </section>

          {/* ── Results ────────────────────────────────────────────────── */}
          <section className="bg-bg-surface border border-white/8 rounded-2xl p-5 space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Probability with {gold}g
            </p>

            <ProbBar
              label="Hit 2★ (3 copies)"
              pct={result2star.pAtBudget * 100}
              color="bg-emerald-400"
              sublabel={`50% at ${fmt(result2star.p50Gold)} · 80% at ${fmt(result2star.p80Gold)}`}
            />
            <ProbBar
              label="Hit 3★ (9 copies)"
              pct={result3star.pAtBudget * 100}
              color="bg-violet-400"
              sublabel={`50% at ${fmt(result3star.p50Gold)} · 80% at ${fmt(result3star.p80Gold)}`}
            />

            {/* Per-shop odds breakdown */}
            <div className="pt-2 border-t border-white/6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
                Per Shop Breakdown
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "See in 1 shop",
                    value: `${(pOneShop * 100).toFixed(1)}%`,
                    sub: "per refresh",
                  },
                  {
                    label: "Expected rolls",
                    value: pOneShop > 0 ? `~${(1 / pOneShop).toFixed(1)}` : "∞",
                    sub: "to see once",
                  },
                  {
                    label: "Expected gold",
                    value: pOneShop > 0 ? `~${(2 / pOneShop).toFixed(0)}g` : "∞",
                    sub: "to see once",
                  },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-bg-elevated rounded-xl border border-white/6 px-3 py-2.5 text-center">
                    <p className={`text-sm font-bold tabular-nums ${costColor.text}`}>{value}</p>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-tight">{label}</p>
                    <p className="text-[9px] text-text-muted/50">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Probability Curve ──────────────────────────────────────── */}
          <section className="bg-bg-surface border border-white/8 rounded-2xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
              Probability Curve
            </p>
            <ProbCurve
              cdf2star={result2star.cdf}
              cdf3star={result3star.cdf}
              goldBudget={gold}
              maxGold={100}
            />
            <p className="text-[10px] text-text-muted/50 text-center mt-2">
              Gold spent rolling (x) vs. cumulative probability of hitting target (y). Gold line = your current budget.
            </p>
          </section>

          {/* ── Milestone table ────────────────────────────────────────── */}
          <section className="bg-bg-surface border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Gold Required to Hit
              </p>
            </div>
            <div className="grid grid-cols-5 px-5 py-2 bg-bg-elevated/40 text-[10px] text-text-muted font-semibold uppercase tracking-wider">
              <span>Target</span>
              <span className="text-center">25%</span>
              <span className="text-center">50%</span>
              <span className="text-center">80%</span>
              <span className="text-center">95%</span>
            </div>
            {STAR_TARGET.map(({ label, copies }) => {
              const res = label === "2★" ? result2star : result3star;
              const milestones = [0.25, 0.5, 0.8, 0.95].map((t) => {
                const idx = res.cdf.findIndex((v) => v >= t);
                return idx === -1 ? "—" : `${idx * 2}g`;
              });
              return (
                <div key={label} className={`grid grid-cols-5 px-5 py-3 text-sm border-t border-white/5 ${label === "2★" ? "text-emerald-300" : "text-violet-300"}`}>
                  <span className="font-bold">{label}</span>
                  {milestones.map((m, i) => (
                    <span key={i} className="text-center font-mono text-xs tabular-nums text-text-secondary">{m}</span>
                  ))}
                </div>
              );
            })}
          </section>

          {/* Disclaimer */}
          <p className="text-[10px] text-text-muted/40 text-center pb-2 leading-relaxed">
            Calculations use Set 17 exact pool sizes (1-cost: 308 · 2-cost: 260 · 3-cost: 221 · 4-cost: 130 · 5-cost: 90).
            Probabilities are approximate — assumes other champions in the tier have normal distribution in the pool.
          </p>

        </div>
      </PageShell>
    </>
  );
}
