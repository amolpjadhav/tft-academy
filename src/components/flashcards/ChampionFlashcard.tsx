import type { Champion, ChampionRole, ChampionType } from "@/types/champion";
import type { Item } from "@/types/item";

const TIER_COLOR: Record<string, string> = {
  S: "text-amber-300 border-amber-400/40 bg-amber-400/10",
  A: "text-violet-300 border-violet-400/40 bg-violet-400/10",
  B: "text-blue-300  border-blue-400/40  bg-blue-400/10",
  C: "text-slate-300 border-slate-400/40 bg-slate-400/10",
};

// ── Utility helpers ──────────────────────────────────────────────────────────

const COST_STARS: Record<number, { stars: string; color: string }> = {
  1: { stars: "★☆☆☆☆", color: "text-neutral-400" },
  2: { stars: "★★☆☆☆", color: "text-green-400" },
  3: { stars: "★★★☆☆", color: "text-blue-400" },
  4: { stars: "★★★★☆", color: "text-purple-400" },
  5: { stars: "★★★★★", color: "text-amber-400" },
};

const COST_BADGE: Record<number, string> = {
  1: "bg-neutral-500/30 text-neutral-300 border-neutral-500/40",
  2: "bg-green-600/30 text-green-300 border-green-500/40",
  3: "bg-blue-600/30 text-blue-300 border-blue-500/40",
  4: "bg-purple-600/30 text-purple-300 border-purple-500/40",
  5: "bg-amber-500/30 text-amber-200 border-amber-500/40",
};

const ROLE_META: Record<ChampionRole, { label: string; color: string }> = {
  ad_carry:    { label: "AD Carry",    color: "text-amber-300 bg-amber-500/20 border-amber-500/30" },
  ap_carry:    { label: "AP Carry",    color: "text-violet-300 bg-violet-500/20 border-violet-500/30" },
  melee_carry: { label: "Melee Carry", color: "text-orange-300 bg-orange-500/20 border-orange-500/30" },
  tank:        { label: "Tank",        color: "text-teal-300 bg-teal-500/20 border-teal-500/30" },
};

// Champion type display config
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

interface AbilityInfo {
  typeLabel: string;
  typeEmoji: string;
  typeColor: string;
  cleanDescription: string;
  beginnerSummary: string;
}

function analyzeAbility(ability: { name: string; description: string }): AbilityInfo {
  const desc = ability.description;
  const lower = desc.toLowerCase();

  // Strip star-level scaling numbers like "325/455/650 (AP)" or "300%/300%/350%"
  const cleanDescription = desc
    .replace(/\d+(?:\/\d+)+\s*%?\s*(?:\([A-Z]+\))?/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const hasDamage = /\bdamage\b/.test(lower);
  const hasShield = /\bshield\b/.test(lower);
  const hasHeal   = /\bheal/.test(lower);
  const hasStun   = /\bstun\b/.test(lower);
  const hasKnock  = /\bknock/.test(lower);
  const hasCharm  = /\bcharm\b/.test(lower);
  const hasFear   = /\bfear\b/.test(lower);
  const hasSlow   = /\bslow\b|\bchill\b/.test(lower);
  const hasLeap   = /\bleap\b|\bdash\b|\bjump\b/.test(lower);
  const hasInvis  = /\binvisib|\bstealth\b/.test(lower);
  const hasSummon = /\bsummon\b/.test(lower);
  const hasBuff   = /attack speed|attack damage/i.test(desc) && !hasDamage;

  // Build plain-English effect list
  const effects: string[] = [];
  if (hasLeap)   effects.push("leaps to a target");
  if (hasInvis)  effects.push("becomes invisible");
  if (hasSummon) effects.push("summons an ally");
  if (hasDamage) {
    if (/all enemies|nearby enemies|enemies around|enemies within/.test(lower)) {
      effects.push("deals damage to multiple enemies");
    } else {
      effects.push("deals damage to a target");
    }
  }
  if (hasShield) effects.push("gains a protective shield");
  if (hasHeal)   effects.push("heals");
  if (hasStun)   effects.push("stuns enemies");
  if (hasKnock)  effects.push("knocks back enemies");
  if (hasCharm)  effects.push("charms an enemy");
  if (hasFear)   effects.push("causes fear");
  if (hasSlow)   effects.push("slows enemies");
  if (hasBuff)   effects.push("gains a combat buff");

  const beginnerSummary =
    effects.length > 0
      ? effects[0].charAt(0).toUpperCase() + effects[0].slice(1) +
        (effects.length > 1 ? " and " + effects.slice(1).join(", ") : "")
      : "Activates a powerful special ability";

  // Primary type badge
  let typeLabel = "Special";
  let typeEmoji = "✨";
  let typeColor = "text-purple-300 bg-purple-500/20 border-purple-500/30";

  if (hasStun || hasKnock || hasCharm || hasFear) {
    typeLabel = "Crowd Control"; typeEmoji = "⚡";
    typeColor = "text-yellow-300 bg-yellow-500/20 border-yellow-500/30";
  } else if (hasSlow) {
    typeLabel = "Slow / Chill"; typeEmoji = "❄️";
    typeColor = "text-blue-300 bg-blue-500/20 border-blue-500/30";
  } else if (hasShield && hasDamage) {
    typeLabel = "Shield + Damage"; typeEmoji = "🛡️";
    typeColor = "text-cyan-300 bg-cyan-500/20 border-cyan-500/30";
  } else if (hasShield) {
    typeLabel = "Shield"; typeEmoji = "🛡️";
    typeColor = "text-cyan-300 bg-cyan-500/20 border-cyan-500/30";
  } else if (hasHeal) {
    typeLabel = "Healing"; typeEmoji = "❤️";
    typeColor = "text-red-300 bg-red-500/20 border-red-500/30";
  } else if (hasLeap && hasDamage) {
    typeLabel = "Dash + Damage"; typeEmoji = "🌀";
    typeColor = "text-orange-300 bg-orange-500/20 border-orange-500/30";
  } else if (hasDamage) {
    typeLabel = "Damage"; typeEmoji = "💥";
    typeColor = "text-red-400 bg-red-500/20 border-red-500/30";
  } else if (hasBuff) {
    typeLabel = "Buff"; typeEmoji = "⚡";
    typeColor = "text-green-300 bg-green-500/20 border-green-500/30";
  } else if (hasSummon) {
    typeLabel = "Summon"; typeEmoji = "🔮";
    typeColor = "text-purple-300 bg-purple-500/20 border-purple-500/30";
  }

  return { typeLabel, typeEmoji, typeColor, cleanDescription, beginnerSummary };
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  champion: Champion;
  isFlipped: boolean;
  onFlip: () => void;
  itemMap: Record<string, Item>;
}

export default function ChampionFlashcard({ champion, isFlipped, onFlip, itemMap }: Props) {
  const { stars, color: starColor } = COST_STARS[champion.cost];
  const costBadge  = COST_BADGE[champion.cost];
  const roleMeta   = ROLE_META[champion.role];
  const typeMeta   = champion.championType ? CHAMP_TYPE_META[champion.championType] : null;
  const ability    = analyzeAbility(champion.ability);

  return (
    <div
      className="flashcard-scene w-full max-w-sm mx-auto cursor-pointer select-none"
      style={{ height: 520 }}
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? "Click to see front" : "Click to reveal details"}
    >
      <div className={`flashcard-inner w-full h-full rounded-2xl shadow-2xl ${isFlipped ? "is-flipped" : ""}`}>

        {/* ── FRONT ─────────────────────────────────────────────────────── */}
        <div className="flashcard-face rounded-2xl overflow-hidden">
          {/* Splash art */}
          <div className="relative w-full h-full">
            <img
              src={champion.splashIcon}
              alt={champion.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

            {/* Cost badge — top right */}
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${costBadge}`}>
                {champion.cost}-cost
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10">
              {/* Traits */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {champion.traits.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Champion type pill */}
              {typeMeta && champion.championType && (
                <div className="mb-2">
                  <span
                    style={{
                      fontSize: 11, fontWeight: 600,
                      padding: "2px 9px", borderRadius: 9999,
                      background: typeMeta.bg,
                      color: typeMeta.color,
                      border: `1px solid ${typeMeta.border}`,
                      display: "inline-flex", alignItems: "center", gap: 4,
                    }}
                  >
                    {typeMeta.icon} {champion.championType}
                  </span>
                </div>
              )}

              {/* Name */}
              <h2 className="font-heading text-3xl text-white tracking-wide leading-tight">
                {champion.name}
              </h2>
              {champion.beginnerTip && (
                <p className="text-accent-gold/80 text-xs font-medium mt-0.5">
                  {champion.beginnerTip.nickname}
                </p>
              )}

              {/* Stars */}
              <p className={`text-sm font-mono mt-1 ${starColor}`}>{stars}</p>

              {/* Hint */}
              <p className="text-white/40 text-xs mt-3 text-center">Tap to reveal details</p>
            </div>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────────────── */}
        <div className="flashcard-face flashcard-face--back rounded-2xl bg-bg-elevated border border-white/10 overflow-hidden flex flex-col">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-bg-surface/60">
            <img
              src={champion.icon}
              alt={champion.name}
              className="w-12 h-12 rounded-xl border border-white/15 object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h3 className="font-heading text-lg text-text-primary leading-tight truncate">
                {champion.name}
              </h3>
              {champion.beginnerTip && (
                <p className="text-accent-gold text-[11px] font-medium truncate">
                  {champion.beginnerTip.nickname}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${costBadge}`}>
                  {champion.cost}-cost
                </span>
                {typeMeta && champion.championType ? (
                  <span
                    style={{
                      fontSize: 11, fontWeight: 600,
                      padding: "2px 8px", borderRadius: 9999,
                      background: typeMeta.bg,
                      color: typeMeta.color,
                      border: `1px solid ${typeMeta.border}`,
                      display: "inline-flex", alignItems: "center", gap: 3,
                    }}
                  >
                    {typeMeta.icon} {champion.championType}
                  </span>
                ) : (
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${roleMeta.color}`}>
                    {roleMeta.label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 space-y-3">

            {/* Beginner explain — the fun kid-friendly description */}
            {champion.beginnerTip && (
              <div className="bg-accent-gold/8 border border-accent-gold/20 rounded-xl p-3">
                <p className="text-[10px] text-accent-gold uppercase tracking-wider font-semibold mb-1">
                  🧒 Explained Simply
                </p>
                <p className="text-text-primary text-xs leading-relaxed">
                  {champion.beginnerTip.kidExplain}
                </p>
              </div>
            )}

            {/* Unlock tip */}
            {champion.beginnerTip && (
              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-3 py-2 flex gap-2">
                <span className="text-sm shrink-0">💡</span>
                <div>
                  <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold mb-0.5">
                    Beginner Tip
                  </p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {champion.beginnerTip.unlockTip}
                  </p>
                </div>
              </div>
            )}

            {/* Ability section */}
            <div className="bg-bg-surface rounded-xl p-3 border border-white/8">
              {/* Ability type badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${ability.typeColor}`}>
                  {ability.typeEmoji} {ability.typeLabel}
                </span>
                <span className="text-text-muted text-[11px]">Ability</span>
              </div>

              {/* Ability name */}
              <p className="text-accent-gold font-semibold text-sm mb-1">
                {champion.ability.name}
              </p>

              {/* Full description (numbers stripped) */}
              <p className="text-text-secondary text-xs leading-relaxed">
                {ability.cleanDescription}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-bg-surface rounded-xl p-3 border border-white/8">
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2">
                Key Stats
              </p>
              <div className="grid grid-cols-2 gap-2">
                <StatRow icon="❤️" label="Health" value={`${champion.stats.hp}`} />
                <StatRow icon="🔵" label="Mana" value={`${champion.stats.initialMana} / ${champion.stats.maxMana}`} />
                <StatRow icon="⚔️" label="Attack Dmg" value={`${champion.stats.attackDamage}`} />
                <StatRow icon="⚡" label="Atk Speed" value={`${champion.stats.attackSpeed}`} />
                <StatRow icon="🛡️" label="Armor" value={`${champion.stats.armor}`} />
                <StatRow icon="🎯" label="Range" value={champion.stats.range === 1 ? "Melee" : `${champion.stats.range} hexes`} />
              </div>
            </div>

            {/* Ideal Items */}
            {champion.idealItems && champion.idealItems.length > 0 && (
              <div className="bg-bg-surface rounded-xl p-3 border border-white/8">
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2">
                  🏆 Ideal Items
                </p>
                <div className="space-y-2.5">
                  {champion.idealItems.map(({ itemId, reason }) => {
                    const item = itemMap[itemId];
                    if (!item) return null;
                    return (
                      <div key={itemId} className="flex gap-2.5">
                        {/* Icon */}
                        <div className="relative shrink-0">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg border border-white/15 object-cover"
                          />
                          <span
                            className={`absolute -top-1 -right-1 text-[9px] font-bold px-1 rounded border leading-none py-px ${TIER_COLOR[item.tier] ?? TIER_COLOR.B}`}
                          >
                            {item.tier}
                          </span>
                        </div>
                        {/* Name + reason */}
                        <div className="min-w-0">
                          <p className="text-text-primary text-xs font-semibold leading-tight truncate">
                            {item.name}
                          </p>
                          <p className="text-text-muted text-[10px] leading-relaxed mt-0.5">
                            {reason}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Traits */}
            <div className="bg-bg-surface rounded-xl p-3 border border-white/8">
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2">
                Traits
              </p>
              <div className="flex flex-wrap gap-1.5">
                {champion.traits.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple-light border border-accent-purple/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-white/8 text-center">
            <p className="text-white/30 text-[11px]">Tap to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm leading-none">{icon}</span>
      <div>
        <p className="text-[10px] text-text-muted leading-none">{label}</p>
        <p className="text-text-primary text-xs font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  );
}
