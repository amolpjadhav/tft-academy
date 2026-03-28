import type { Item } from "@/types/item";
import ItemCard from "./ItemCard";

interface ItemGridProps {
  items: Item[];
  onSelect: (item: Item) => void;
}

export default function ItemGrid({ items, onSelect }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-4xl mb-4">🔍</span>
        <p className="text-text-secondary text-sm">No items match your search.</p>
        <p className="text-text-muted text-xs mt-1">Try a different name or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onClick={onSelect} />
      ))}
    </div>
  );
}
