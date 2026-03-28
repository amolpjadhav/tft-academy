import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { GetStaticProps } from "next";
import type { Champion } from "@/types/champion";
import type { ComputedStats } from "@/types/champion";
import type { Item, ItemsData } from "@/types/item";
import { computeStats, getSynergyTips, calcPowerScore } from "@/utils/simulator";
import PageShell from "@/components/layout/PageShell";
import ChampionPicker from "@/components/simulator/ChampionPicker";
import BuildPanel from "@/components/simulator/BuildPanel";
import StatsPanel from "@/components/simulator/StatsPanel";
import ItemPickerModal from "@/components/simulator/ItemPickerModal";
import championsData from "../../data/champions.json";
import itemsData from "../../data/items.json";

interface Props {
  champions: Champion[];
  items: Item[];
}

export type StatDeltas = {
  hp?: number;
  ad?: number;
  ap?: number;
  as?: number;
  armor?: number;
  mr?: number;
  omnivamp?: number;
  durability?: number;
  damageAmp?: number;
  score?: number;
};

type MobileTab = "pick" | "build" | "stats";

export default function SimulatorPage({ champions, items }: Props) {
  const [champion, setChampion] = useState<Champion | null>(null);
  const [star, setStar] = useState<1 | 2 | 3>(1);
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>("pick");

  // Delta tracking
  const prevStatsRef = useRef<ComputedStats | null>(null);
  const prevScoreRef = useRef<number>(0);
  const [deltas, setDeltas] = useState<StatDeltas>({});
  const [deltaKey, setDeltaKey] = useState(0);

  const equippedItems = useMemo(
    () => slots.map((id) => items.find((i) => i.id === id) ?? null),
    [slots, items]
  );

  const stats = useMemo(
    () => (champion ? computeStats(champion, star, slots, items) : null),
    [champion, star, slots, items]
  );

  const score = useMemo(
    () => (champion && stats ? calcPowerScore(stats, champion) : 0),
    [champion, stats]
  );

  // Compute deltas whenever stats/score change
  useEffect(() => {
    if (!stats) {
      prevStatsRef.current = null;
      prevScoreRef.current = 0;
      setDeltas({});
      return;
    }
    const prev = prevStatsRef.current;
    const prevScore = prevScoreRef.current;

    if (prev) {
      const d: StatDeltas = {};
      const hp = stats.hp - prev.hp;
      const ad = stats.attackDamage - prev.attackDamage;
      const ap = stats.abilityPower - prev.abilityPower;
      const as = Math.round((stats.attackSpeed - prev.attackSpeed) * 100) / 100;
      const armor = stats.armor - prev.armor;
      const mr = stats.magicResist - prev.magicResist;
      const omnivamp = stats.omnivamp - prev.omnivamp;
      const durability = stats.durability - prev.durability;
      const damageAmp = stats.damageAmp - prev.damageAmp;
      const sc = score - prevScore;

      if (hp > 0) d.hp = hp;
      if (ad > 0) d.ad = ad;
      if (ap > 0) d.ap = ap;
      if (as > 0) d.as = as;
      if (armor > 0) d.armor = armor;
      if (mr > 0) d.mr = mr;
      if (omnivamp > 0) d.omnivamp = omnivamp;
      if (durability > 0) d.durability = durability;
      if (damageAmp > 0) d.damageAmp = damageAmp;
      if (sc > 0) d.score = sc;

      if (Object.keys(d).length > 0) {
        setDeltas(d);
        setDeltaKey((k) => k + 1);
      }
    }

    prevStatsRef.current = stats;
    prevScoreRef.current = score;
  }, [stats, score]);

  const tips = useMemo(
    () => (champion ? getSynergyTips(champion, slots, items) : []),
    [champion, slots, items]
  );

  const recommendedItems = useMemo(() => {
    if (!champion) return [];
    const equipped = new Set(slots.filter(Boolean));
    return items
      .filter(
        (i) =>
          !equipped.has(i.id) &&
          (i.category === champion.role || i.category === "melee_carry")
      )
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 3);
  }, [champion, slots, items]);

  const handleSelectItem = useCallback(
    (item: Item | null) => {
      if (activeSlot === null) return;
      setSlots((prev) => {
        const next = [...prev];
        next[activeSlot] = item?.id ?? null;
        return next;
      });
      setActiveSlot(null);
      if (item) setMobileTab("build");
    },
    [activeSlot]
  );

  const handleSlotClick = useCallback((index: number) => {
    setActiveSlot(index);
  }, []);

  const handleSelectChampion = useCallback((c: Champion) => {
    setChampion(c);
    setStar(1);
    setSlots([null, null, null]);
    prevStatsRef.current = null;
    prevScoreRef.current = 0;
    setDeltas({});
    setMobileTab("build");
  }, []);

  const handleRecommendItem = useCallback(
    (item: Item) => {
      const emptyIdx = slots.findIndex((s) => s === null);
      if (emptyIdx === -1) return;
      setSlots((prev) => {
        const next = [...prev];
        next[emptyIdx] = item.id;
        return next;
      });
    },
    [slots]
  );

  const MOBILE_TABS: { id: MobileTab; label: string; icon: string }[] = [
    { id: "pick", label: "Champion", icon: "🎖️" },
    { id: "build", label: "Build", icon: "⚔️" },
    { id: "stats", label: "Stats", icon: "📊" },
  ];

  return (
    <>
      <PageShell
        title="Champion Simulator"
        subtitle="Pick a champion · equip items · see their power"
      >
        {/* Mobile tab switcher */}
        <div className="md:hidden flex mb-4 bg-bg-surface rounded-xl border border-white/8 p-1 gap-1">
          {MOBILE_TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setMobileTab(id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg text-[11px] font-medium transition-all ${
                mobileTab === id
                  ? "bg-bg-elevated text-text-primary shadow"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:items-start">
          {/* Left: Champion picker */}
          <div
            className={`${
              mobileTab === "pick" ? "flex" : "hidden md:flex"
            } flex-col md:w-64 lg:w-72 shrink-0 bg-bg-surface rounded-2xl border border-white/8 overflow-hidden`}
            style={{ height: "calc(100vh - 200px)", maxHeight: 680 }}
          >
            <div className="px-4 py-3 border-b border-white/8">
              <h3 className="text-text-primary font-semibold text-sm">Champions</h3>
              <p className="text-text-muted text-[11px]">Set 16 · {champions.length} champions</p>
            </div>
            <div className="flex-1 min-h-0">
              <ChampionPicker
                champions={champions}
                selectedId={champion?.id ?? null}
                onSelect={handleSelectChampion}
              />
            </div>
          </div>

          {/* Center: Build panel */}
          <div className={`${mobileTab === "build" ? "block" : "hidden md:block"} flex-1 min-w-0`}>
            {champion ? (
              <div className="bg-bg-surface rounded-2xl border border-white/8 p-4 md:p-6">
                <BuildPanel
                  champion={champion}
                  star={star}
                  onStarChange={setStar}
                  slots={slots}
                  equippedItems={equippedItems}
                  onSlotClick={handleSlotClick}
                  score={score}
                  scoreDelta={deltas.score}
                  deltaKey={deltaKey}
                />
              </div>
            ) : (
              <div className="bg-bg-surface rounded-2xl border border-white/8 p-8 flex flex-col items-center justify-center text-center min-h-72">
                <span className="text-5xl mb-4">🎖️</span>
                <h3 className="text-text-primary font-semibold text-lg mb-2">Pick a Champion</h3>
                <p className="text-text-muted text-sm max-w-xs">
                  Select a champion from the left panel to start building your simulator.
                </p>
                <button
                  className="mt-4 md:hidden text-accent-purple-light border border-accent-purple/30 px-4 py-2 rounded-lg text-sm hover:bg-accent-purple/10 transition"
                  onClick={() => setMobileTab("pick")}
                >
                  Choose Champion →
                </button>
              </div>
            )}
          </div>

          {/* Right: Stats panel */}
          <div className={`${mobileTab === "stats" ? "block" : "hidden md:block"} md:w-72 lg:w-80 shrink-0`}>
            {champion && stats ? (
              <StatsPanel
                champion={champion}
                star={star}
                stats={stats}
                slots={slots}
                tips={tips}
                recommendedItems={recommendedItems}
                onRecommendItem={handleRecommendItem}
                deltas={deltas}
                deltaKey={deltaKey}
              />
            ) : (
              <div className="bg-bg-surface rounded-2xl border border-white/8 p-6 flex flex-col items-center justify-center text-center min-h-48">
                <span className="text-3xl mb-3">📊</span>
                <p className="text-text-muted text-sm">Stats will appear after you pick a champion.</p>
              </div>
            )}
          </div>
        </div>
      </PageShell>

      {/* Item picker modal */}
      {activeSlot !== null && (
        <ItemPickerModal
          items={items}
          equippedIds={slots}
          slotIndex={activeSlot}
          onSelect={handleSelectItem}
          onClose={() => setActiveSlot(null)}
        />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = itemsData as ItemsData;
  return {
    props: {
      champions: championsData as Champion[],
      items: data.items,
    },
  };
};
