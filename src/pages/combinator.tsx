import { useState } from "react";
import type { GetStaticProps } from "next";
import type { Item, Component, ItemsData } from "@/types/item";
import PageShell from "@/components/layout/PageShell";
import CombinatorWidget from "@/components/combinator/Combinator";
import ItemModal from "@/components/detail/ItemModal";
import itemsData from "../../data/items.json";
import { useMemo } from "react";

interface Props {
  items: Item[];
  components: Component[];
}

export default function CombinatorPage({ items, components }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const componentMap = useMemo(
    () => Object.fromEntries(components.map((c) => [c.id, c])),
    [components]
  );

  return (
    <>
      <PageShell
        title="Item Combinator"
        subtitle="Select two components to discover what they build"
      >
        <div className="max-w-3xl">
          <CombinatorWidget
            components={components}
            items={items}
            onViewDetail={setSelectedItem}
          />
        </div>
      </PageShell>

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
