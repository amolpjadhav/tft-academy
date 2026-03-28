import { useState } from "react";
import type { Component, Item } from "@/types/item";
import ComponentPicker from "./ComponentPicker";
import ResultDisplay from "./ResultDisplay";

interface CombinatorProps {
  components: Component[];
  items: Item[];
  onViewDetail: (item: Item) => void;
}

export default function Combinator({ components, items, onViewDetail }: CombinatorProps) {
  const [slotA, setSlotA] = useState<Component | null>(null);
  const [slotB, setSlotB] = useState<Component | null>(null);

  const result: Item | null =
    slotA && slotB
      ? items.find(
          (item) =>
            (item.components[0] === slotA.id && item.components[1] === slotB.id) ||
            (item.components[0] === slotB.id && item.components[1] === slotA.id)
        ) ?? null
      : null;

  const hasSelection = slotA !== null && slotB !== null;

  function reset() {
    setSlotA(null);
    setSlotB(null);
  }

  return (
    <div className="space-y-8">
      {/* Pickers */}
      <div className="flex gap-6">
        <ComponentPicker
          components={components}
          selected={slotA}
          onSelect={setSlotA}
          label="Component 1"
        />
        <div className="flex items-center self-center mt-8 text-2xl text-text-muted font-bold">
          +
        </div>
        <ComponentPicker
          components={components}
          selected={slotB}
          onSelect={setSlotB}
          label="Component 2"
        />
      </div>

      {/* Result */}
      <ResultDisplay
        item={result}
        hasSelection={hasSelection}
        onViewDetail={onViewDetail}
      />

      {/* Reset */}
      {(slotA || slotB) && (
        <button
          onClick={reset}
          className="text-sm text-text-muted hover:text-text-secondary transition underline underline-offset-2"
        >
          Reset slots
        </button>
      )}
    </div>
  );
}
