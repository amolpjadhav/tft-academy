import { useState, useMemo } from "react";
import type { GetStaticProps } from "next";
import type { Item, Component, ItemsData } from "@/types/item";
import { useItemFilter } from "@/hooks/useItemFilter";
import type { FilterCategory } from "@/hooks/useItemFilter";
import PageShell from "@/components/layout/PageShell";
import SearchBar from "@/components/catalog/SearchBar";
import CategoryTabs from "@/components/catalog/CategoryTabs";
import ItemGrid from "@/components/catalog/ItemGrid";
import ItemModal from "@/components/detail/ItemModal";
import itemsData from "../../data/items.json";

interface Props {
  items: Item[];
  components: Component[];
}

export default function CatalogPage({ items, components }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { filtered, query, setQuery, category, setCategory } = useItemFilter(items);

  const componentMap = useMemo(
    () => Object.fromEntries(components.map((c) => [c.id, c])),
    [components]
  );

  const counts = useMemo(() => {
    const cats: FilterCategory[] = ["all", "ad_carry", "ap_carry", "melee_carry", "tank"];
    return Object.fromEntries(
      cats.map((cat) => [
        cat,
        cat === "all" ? items.length : items.filter((i) => i.category === cat).length,
      ])
    ) as Record<FilterCategory, number>;
  }, [items]);

  return (
    <>
      <PageShell
        title="Item Catalog"
        subtitle={`${filtered.length} of ${items.length} items · Set 16 · Lore & Legends`}
      >
        {/* Controls */}
        <div className="flex flex-col gap-3 mb-5">
          <SearchBar value={query} onChange={setQuery} />
          <div className="overflow-x-auto">
            <CategoryTabs active={category} onChange={setCategory} counts={counts} />
          </div>
        </div>

        {/* Grid */}
        <ItemGrid items={filtered} onSelect={setSelectedItem} />
      </PageShell>

      {/* Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          componentMap={componentMap}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = itemsData as ItemsData;
  return {
    props: {
      items: data.items,
      components: data.components,
    },
  };
};
