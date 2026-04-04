import type { Champion, ChampionRole, ChampionType } from "@/types/champion";
import type { Item } from "@/types/item";
import type { Trait } from "@/types/trait";

// ── Constants ────────────────────────────────────────────────────────────────

const COST_BADGE: Record<number, string> = {
  1: "bg-neutral-500/30 text-neutral-300 border-neutral-500/40",
  2: "bg-green-600/30 text-green-300 border-green-500/40",
  3: "bg-blue-600/30 text-blue-300 border-blue-500/40",
  4: "bg-purple-600/30 text-purple-300 border-purple-500/40",
  5: "bg-amber-500/30 text-amber-200 border-amber-500/40",
};

const COST_STARS: Record<number, { stars: string; color: string }> = {
  1: { stars: "★☆☆☆☆", color: "text-neutral-400" },
  2: { stars: "★★☆☆☆", color: "text-green-400" },
  3: { stars: "★★★☆☆", color: "text-blue-400" },
  4: { stars: "★★★★☆", color: "text-purple-400" },
  5: { stars: "★★★★★", color: "text-amber-400" },
};

const TIER_COLOR: Record<string, string> = {
  S: "text-amber-300 border-amber-400/40 bg-amber-400/10",
  A: "text-violet-300 border-violet-400/40 bg-violet-400/10",
  B: "text-blue-300  border-blue-400/40  bg-blue-400/10",
  C: "text-slate-300 border-slate-400/40 bg-slate-400/10",
};

const CHAMP_TYPE_META: Record<ChampionType, { color: string; bg: string; border: string; icon: string }> = {
  "Magic Caster":      { color: "#c4b5fd", bg: "rgba(139,92,246,0.18)",  border: "rgba(139,92,246,0.4)",  icon: "✨" },
  "Magic Fighter":     { color: "#a5b4fc", bg: "rgba(99,102,241,0.18)",  border: "rgba(99,102,241,0.4)",  icon: "🔮" },
  "Magic Tank":        { color: "#67e8f9", bg: "rgba(6,182,212,0.18)",   border: "rgba(6,182,212,0.4)",   icon: "🧊" },
  "Magic Marksman":    { color: "#e879f9", bg: "rgba(217,70,239,0.18)",  border: "rgba(217,70,239,0.4)",  icon: "💫" },
  "Magic Assassin":    { color: "#f0abfc", bg: "rgba(168,85,247,0.18)",  border: "rgba(168,85,247,0.4)",  icon: "💜" },
  "Attack Caster":     { color: "#fdba74", bg: "rgba(249,115,22,0.18)",  border: "rgba(249,115,22,0.4)",  icon: "🔥" },
  "Attack Fighter":    { color: "#fca5a5", bg: "rgba(239,68,68,0.18)",   border: "rgba(239,68,68,0.4)",   icon: "⚔️" },
  "Attack Tank":       { color: "#94a3b8", bg: "rgba(100,116,139,0.18)", border: "rgba(100,116,139,0.4)", icon: "🛡️" },
  "Attack Marksman":   { color: "#fde047", bg: "rgba(234,179,8,0.18)",   border: "rgba(234,179,8,0.4)",   icon: "🏹" },
  "Attack Specialist": { color: "#6ee7b7", bg: "rgba(16,185,129,0.18)",  border: "rgba(16,185,129,0.4)",  icon: "🎯" },
  "Attack Assassin":   { color: "#fda4af", bg: "rgba(244,63,94,0.18)",   border: "rgba(244,63,94,0.4)",   icon: "🗡️" },
  "Hybrid Fighter":    { color: "#86efac", bg: "rgba(34,197,94,0.18)",   border: "rgba(34,197,94,0.4)",   icon: "⚡" },
};

const ROLE_META: Record<ChampionRole, { label: string; color: string }> = {
  ad_carry:    { label: "AD Carry",    color: "text-amber-300 bg-amber-500/20 border-amber-500/30" },
  ap_carry:    { label: "AP Carry",    color: "text-violet-300 bg-violet-500/20 border-violet-500/30" },
  melee_carry: { label: "Melee Carry", color: "text-orange-300 bg-orange-500/20 border-orange-500/30" },
  tank:        { label: "Tank",        color: "text-teal-300 bg-teal-500/20 border-teal-500/30" },
};

// Detect CC type for ability badge
function abilityBadge(desc: string): { label: string; emoji: string; color: string } {
  const d = desc.toLowerCase();
  if (/\bstun\b/.test(d) || /knock[\s-]?up|knockup/.test(d))
    return { label: "Crowd Control", emoji: "⚡", color: "text-yellow-300 bg-yellow-500/20 border-yellow-500/30" };
  if (/\broot\b/.test(d))
    return { label: "Root", emoji: "🌿", color: "text-green-300 bg-green-500/20 border-green-500/30" };
  if (/\bcharm\b|\bfear\b|\btaunt\b/.test(d))
    return { label: "Crowd Control", emoji: "⚡", color: "text-yellow-300 bg-yellow-500/20 border-yellow-500/30" };
  if (/\bslow\b|\bchill\b/.test(d))
    return { label: "Slow", emoji: "❄️", color: "text-blue-300 bg-blue-500/20 border-blue-500/30" };
  if (/\bshield\b/.test(d) && /\bdamage\b/.test(d))
    return { label: "Shield + Damage", emoji: "🛡️", color: "text-cyan-300 bg-cyan-500/20 border-cyan-500/30" };
  if (/\bshield\b/.test(d))
    return { label: "Shield", emoji: "🛡️", color: "text-cyan-300 bg-cyan-500/20 border-cyan-500/30" };
  if (/\bheal(s|ed|ing)?\b/.test(d) && /\bdamage\b/.test(d))
    return { label: "Heal + Damage", emoji: "💚", color: "text-emerald-300 bg-emerald-500/20 border-emerald-500/30" };
  if (/\bheal(s|ed|ing)?\b/.test(d))
    return { label: "Healing", emoji: "❤️", color: "text-red-300 bg-red-500/20 border-red-500/30" };
  if (/\bdash\b|\bleap\b|\bjump\b/.test(d) && /\bdamage\b/.test(d))
    return { label: "Dash + Damage", emoji: "🌀", color: "text-orange-300 bg-orange-500/20 border-orange-500/30" };
  if (/\bdamage\b/.test(d))
    return { label: "Damage", emoji: "💥", color: "text-red-400 bg-red-500/20 border-red-500/30" };
  return { label: "Special", emoji: "✨", color: "text-purple-300 bg-purple-500/20 border-purple-500/30" };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">
      {label}
    </p>
  );
}

function StatRow({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm leading-none w-5 text-center shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-text-muted leading-none">{label}</p>
        <p className={`text-xs font-bold mt-0.5 ${highlight ? "text-accent-gold" : "text-text-primary"}`}>{value}</p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

interface Props {
  champion: Champion;
  isFlipped: boolean;
  onFlip: () => void;
  itemMap: Record<string, Item>;
  traitMap?: Record<string, Trait>;
}

export default function ChampionFlashcard({ champion, isFlipped, onFlip, itemMap, traitMap = {} }: Props) {
  const { stars, color: starColor } = COST_STARS[champion.cost];
  const costBadge = COST_BADGE[champion.cost];
  const typeMeta  = champion.championType ? CHAMP_TYPE_META[champion.championType] : null;
  const roleMeta  = ROLE_META[champion.role];
  const badge     = abilityBadge(champion.ability.description);

  return (
    <div
      className="flashcard-scene w-full max-w-sm mx-auto cursor-pointer select-none"
      style={{ height: 540 }}
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? "Click to see front" : "Click to reveal details"}
    >
      <div className={`flashcard-inner w-full h-full rounded-2xl shadow-2xl ${isFlipped ? "is-flipped" : ""}`}>

        {/* ══ FRONT ═══════════════════════════════════════════════════════════ */}
        <div className="flashcard-face rounded-2xl overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src={champion.splashIcon}
              alt={champion.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-black/10" />

            {/* Cost badge — top right */}
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${costBadge}`}>
                {champion.cost}-cost
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
              {/* Traits */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {champion.traits.map((t) => (
                  <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                    {t}
                  </span>
                ))}
              </div>

              {/* Champion type */}
              {typeMeta && champion.championType && (
                <div className="mb-2">
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 9999, background: typeMeta.bg, color: typeMeta.color, border: `1px solid ${typeMeta.border}`, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {typeMeta.icon} {champion.championType}
                  </span>
                </div>
              )}

              <h2 className="font-heading text-3xl text-white tracking-wide leading-tight">{champion.name}</h2>
              <p className={`text-sm font-mono mt-1 ${starColor}`}>{stars}</p>
              <p className="text-white/35 text-xs mt-3 text-center">Tap to see ability · stats · traits</p>
            </div>
          </div>
        </div>

        {/* ══ BACK ════════════════════════════════════════════════════════════ */}
        <div className="flashcard-face flashcard-face--back rounded-2xl bg-bg-elevated border border-white/10 overflow-hidden flex flex-col">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-bg-surface/60 shrink-0">
            <img src={champion.icon} alt={champion.name} className="w-11 h-11 rounded-xl border border-white/15 object-cover flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-base text-text-primary leading-tight truncate">{champion.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${costBadge}`}>
                  {champion.cost}g
                </span>
                {typeMeta && champion.championType ? (
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 9999, background: typeMeta.bg, color: typeMeta.color, border: `1px solid ${typeMeta.border}`, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    {typeMeta.icon} {champion.championType}
                  </span>
                ) : (
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${roleMeta.color}`}>
                    {roleMeta.label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tab strip */}
          <div className="flex shrink-0 border-b border-white/8 bg-bg-surface/40">
            {(["ability", "stats", "traits"] as const).map((tab) => (
              <button
                key={tab}
                className="flex-1 text-[11px] font-semibold py-2 capitalize transition-colors"
                style={{ color: "rgba(255,255,255,0.5)", cursor: "default" }}
              >
                {tab === "ability" ? "⚡ Ability" : tab === "stats" ? "📊 Stats" : "🌟 Traits"}
              </button>
            ))}
          </div>

          {/* Scrollable content — three sections stacked */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 space-y-4">

            {/* ── ABILITY ─────────────────────────────────────────────── */}
            <div>
              <SectionHeader label="⚡ Ability" />
              <div className="bg-bg-surface rounded-xl p-3 border border-white/8">
                {/* Name + badge */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-accent-gold font-bold text-sm">{champion.ability.name}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ml-2 ${badge.color}`}>
                    {badge.emoji} {badge.label}
                  </span>
                </div>

                {/* Description — preserve newlines */}
                {champion.ability.description.split("\n\n").map((para, i) => (
                  <p key={i} className={`text-text-secondary text-xs leading-relaxed ${i > 0 ? "mt-2" : ""}`}>
                    {para}
                  </p>
                ))}

                {/* Scaling breakdown */}
                {champion.ability.scalingNotes && champion.ability.scalingNotes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/8 space-y-1.5">
                    {champion.ability.scalingNotes.map((row, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[11px] font-semibold text-text-secondary">{row.label}</span>
                          {row.formula && (
                            <span className="text-[10px] text-accent-gold/80 ml-1.5">{row.formula}</span>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-text-muted shrink-0">{row.values}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── STATS ───────────────────────────────────────────────── */}
            <div>
              <SectionHeader label="📊 Base Stats" />
              <div className="bg-bg-surface rounded-xl p-3 border border-white/8">
                {champion.starValues && (
                  <p className="text-[9px] text-text-muted mb-2 tracking-wider">VALUES SHOWN AS 1★ / 2★ / 3★</p>
                )}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  <StatRow icon="⚔️" label="Attack Damage"
                    value={champion.starValues?.attackDamage ?? `${champion.stats.attackDamage}`} />
                  <StatRow icon="⚡" label="Attack Speed"
                    value={`${champion.stats.attackSpeed}`} />
                  <StatRow icon="🛡️" label="Armor"
                    value={`${champion.stats.armor}`} />
                  <StatRow icon="🔮" label="Magic Resist"
                    value={`${champion.stats.magicResist}`} />
                  <StatRow icon="❤️" label="Health"
                    value={champion.starValues?.hp ?? `${champion.stats.hp}`} />
                  <StatRow icon="🎯" label="Range"
                    value={champion.stats.range === 1 ? "Melee (1)" : `${champion.stats.range} hexes`} />
                  {champion.starValues?.dps && (
                    <StatRow icon="💥" label="DPS"
                      value={champion.starValues.dps} />
                  )}
                  <StatRow icon="🔵" label="Mana"
                    value={`${champion.stats.initialMana} / ${champion.stats.maxMana}`} />
                </div>
              </div>
            </div>

            {/* ── TRAITS ──────────────────────────────────────────────── */}
            <div>
              <SectionHeader label="🌟 Traits" />
              <div className="space-y-2">
                {champion.traits.map((traitName) => {
                  const trait = traitMap[traitName];
                  return (
                    <div key={traitName} className="bg-bg-surface rounded-xl border border-white/8 overflow-hidden">
                      {/* Trait header */}
                      <div className="flex items-center gap-2.5 px-3 py-2.5">
                        {trait?.icon && (
                          <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={trait.icon} alt={traitName} className="w-6 h-6 object-contain"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                          </div>
                        )}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm font-bold text-text-primary">{traitName}</span>
                          {trait && (
                            <span className="text-[10px] px-1.5 py-px rounded capitalize shrink-0"
                              style={{
                                background: trait.category === "origin" ? "rgba(245,158,11,0.12)" : "rgba(139,92,246,0.12)",
                                color: trait.category === "origin" ? "#f59e0b" : "#a78bfa",
                              }}>
                              {trait.category}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Full description — each line/paragraph rendered */}
                      {trait?.description && (
                        <div className="px-3 pb-3 space-y-1.5 border-t border-white/6 pt-2.5">
                          {trait.description.split("\n").map((line, li) => {
                            if (!line.trim()) return null;
                            const isBullet  = line.startsWith("•");
                            const isBreak   = /^\(\d+\)/.test(line);
                            return (
                              <p key={li}
                                className={`leading-relaxed ${
                                  isBullet ? "text-[11px] text-text-muted pl-2" :
                                  isBreak  ? "text-[11px] font-semibold text-accent-gold/90" :
                                             "text-[11px] text-text-secondary"
                                }`}
                              >
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RECOMMENDED ITEMS ───────────────────────────────────── */}
            {champion.idealItems && champion.idealItems.length > 0 && (
              <div>
                <SectionHeader label="🏆 Recommended Items" />
                <div className="space-y-2">
                  {champion.idealItems.map(({ itemId, reason }) => {
                    const item = itemMap[itemId];
                    if (!item) return null;
                    return (
                      <div key={itemId} className="flex items-center gap-2.5 bg-bg-surface rounded-xl p-2.5 border border-white/8">
                        <div className="relative shrink-0">
                          <img src={item.icon} alt={item.name} className="w-9 h-9 rounded-lg border border-white/15 object-cover" />
                          <span className={`absolute -top-1 -right-1 text-[9px] font-bold px-1 rounded border leading-none py-px ${TIER_COLOR[item.tier] ?? TIER_COLOR.B}`}>
                            {item.tier}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-text-primary text-xs font-semibold leading-tight truncate">{item.name}</p>
                          <p className="text-text-muted text-[10px] leading-relaxed mt-0.5">{reason}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-white/8 text-center shrink-0">
            <p className="text-white/25 text-[11px]">Scroll for more · Tap to flip back</p>
          </div>
        </div>

      </div>
    </div>
  );
}
