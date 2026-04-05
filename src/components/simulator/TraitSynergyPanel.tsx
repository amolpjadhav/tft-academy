import type { Champion } from "@/types/champion";
import { TRAIT_BONUS_TIERS, MECHANIC_TRAITS } from "@/utils/simulator";
import type { TraitBonusTier } from "@/utils/simulator";

interface Props {
  champion: Champion;
  traitOverrides: Record<string, TraitBonusTier | null>;
  onToggle: (trait: string, tier: TraitBonusTier | null) => void;
}

export default function TraitSynergyPanel({ champion, traitOverrides, onToggle }: Props) {
  const statTraits = champion.traits.filter((t) => TRAIT_BONUS_TIERS[t]);
  const mechanicTraits = champion.traits.filter((t) => !TRAIT_BONUS_TIERS[t] && !MECHANIC_TRAITS.has(t));
  const mechanicOnly = champion.traits.filter((t) => MECHANIC_TRAITS.has(t));

  return (
    <div className="bg-bg-surface rounded-2xl border border-white/8 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-purple-400 text-sm">◈</span>
        <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest">
          Trait Synergies
        </p>
        <span className="ml-auto text-[9px] text-text-muted/50 font-medium">simulate breakpoints</span>
      </div>

      {statTraits.length === 0 && (mechanicOnly.length > 0 || mechanicTraits.length > 0) ? (
        <p className="text-text-muted/50 text-xs italic">
          This champion&apos;s traits don&apos;t grant direct stat bonuses.
        </p>
      ) : null}

      {statTraits.length > 0 && (
        <div className="flex flex-col gap-3">
          {statTraits.map((trait) => {
            const tiers = TRAIT_BONUS_TIERS[trait];
            const activeTier = traitOverrides[trait] ?? null;

            return (
              <div key={trait} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-secondary">{trait}</span>
                  {activeTier ? (
                    <span className="text-[10px] text-accent-gold font-bold">{activeTier.effectLabel}</span>
                  ) : (
                    <span className="text-[10px] text-text-muted/40">inactive</span>
                  )}
                </div>
                <div className="flex gap-1 flex-wrap">
                  <button
                    onClick={() => onToggle(trait, null)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all font-medium ${
                      !activeTier
                        ? "bg-white/10 border-white/25 text-text-primary"
                        : "border-white/8 text-text-muted hover:text-text-secondary hover:border-white/15"
                    }`}
                  >
                    Off
                  </button>
                  {tiers.map((tier) => {
                    const isActive = activeTier?.label === tier.label;
                    const hasBonus = Object.keys(tier.bonus).length > 0;
                    return (
                      <button
                        key={tier.label}
                        onClick={() => onToggle(trait, isActive ? null : tier)}
                        title={tier.effectLabel}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all font-bold ${
                          isActive
                            ? "bg-accent-gold/15 border-accent-gold/50 text-accent-gold shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                            : hasBonus
                            ? "border-white/8 text-text-muted hover:text-text-secondary hover:border-accent-gold/25 hover:bg-accent-gold/5"
                            : "border-white/5 text-text-muted/40 hover:text-text-muted/60"
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mechanic traits section */}
      {(mechanicOnly.length > 0 || mechanicTraits.length > 0) && (
        <div className={`${statTraits.length > 0 ? "border-t border-white/8 mt-3 pt-3" : ""} flex flex-col gap-1`}>
          <p className="text-[9px] text-text-muted/50 font-semibold uppercase tracking-widest mb-1">
            Passive / Mechanic Traits
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[...mechanicOnly, ...mechanicTraits].map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-white/4 border border-white/8 text-text-muted/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
