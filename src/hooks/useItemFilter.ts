import { useMemo, useState } from "react";
import type { Item, ItemCategory } from "@/types/item";

export type FilterCategory = ItemCategory | "all";

export function useItemFilter(items: Item[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      const matchesCategory =
        category === "all" || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.includes(q) ||
        Object.entries(item.stats).some(([key]) => key.includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  return { filtered, query, setQuery, category, setCategory };
}
