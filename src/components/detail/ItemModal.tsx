import { useEffect } from "react";
import type { Item, Component } from "@/types/item";
import StatBlock from "./StatBlock";
import WhyItMatters from "./WhyItMatters";
import RecipePills from "./RecipePills";

const TIER_LABEL: Record<string, string> = {
  S: "S-Tier · Must-build",
  A: "A-Tier · Strong pick",
  B: "B-Tier · Situational",
  C: "C-Tier · Niche",
};

const PRIORITY_COLOR = (p: number) =>
  p >= 9 ? "text-accent-gold" : p >= 7 ? "text-purple-300" : "text-blue-300";

interface ItemModalProps {
  item: Item;
  componentMap: Record<string, Component>;
  onClose: () => void;
}

export default function ItemModal({ item, componentMap, onClose }: ItemModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const recipeComponents: [Component | undefined, Component | undefined] = [
    componentMap[item.components[0]],
    componentMap[item.components[1]],
  ];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Panel — full-width sheet on mobile, centered card on sm+ */}
      <div
        className="relative w-full sm:max-w-lg bg-bg-surface border border-white/10 sm:rounded-2xl rounded-t-2xl shadow-2xl animate-slide-up overflow-hidden max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-5 md:p-6 border-b border-white/5 shrink-0">
          {/* Item icon */}
          <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-bg-elevated border border-white/10 overflow-hidden">
            <img
              src={item.icon}
              alt={item.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-heading text-xl text-text-primary tracking-wide truncate">
                {item.name}
              </h2>
            </div>
            <p className="text-text-muted text-xs">{TIER_LABEL[item.tier]}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-text-muted">Priority</span>
              <span className={`text-xs font-bold ml-1 ${PRIORITY_COLOR(item.priority)}`}>
                {"★".repeat(Math.round(item.priority / 2))}
              </span>
              <span className="text-xs text-text-muted">({item.priority}/10)</span>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-text-muted hover:text-text-primary transition text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="p-5 md:p-6 space-y-5 overflow-y-auto">
          <StatBlock stats={item.stats} />
          <RecipePills components={recipeComponents} itemName={item.name} />

          {/* Passive */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
              Passive — {item.passive.name}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {item.passive.description}
            </p>
          </div>

          <WhyItMatters explanation={item.why_it_matters} bestOn={item.best_on} />
        </div>
      </div>
    </div>
  );
}
