import type { Component } from "@/types/item";

interface RecipePillsProps {
  components: [Component | undefined, Component | undefined];
  itemName: string;
}

export default function RecipePills({ components, itemName }: RecipePillsProps) {
  const [a, b] = components;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
        Recipe
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        <ComponentPill component={a} />
        <span className="text-text-muted text-sm font-bold">+</span>
        <ComponentPill component={b} />
        <span className="text-text-muted text-sm font-bold">=</span>
        <span className="text-sm font-semibold text-accent-gold bg-accent-gold/10 border border-accent-gold/30 px-3 py-1 rounded-full">
          {itemName}
        </span>
      </div>
    </div>
  );
}

function ComponentPill({ component }: { component: Component | undefined }) {
  if (!component) return null;
  return (
    <span className="flex items-center gap-1.5 text-sm text-text-primary bg-bg-elevated border border-white/10 px-2 py-1 rounded-full">
      <img
        src={component.icon}
        alt={component.name}
        width={20}
        height={20}
        className="w-5 h-5 rounded object-cover"
      />
      {component.name}
    </span>
  );
}
