import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";

export interface GuidePost {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  set: string;
  featured?: boolean;
}

export const ALL_GUIDES: GuidePost[] = [
  {
    slug: "tft-beginners-guide",
    title: "TFT Beginner's Guide: How to Play Set 17 Space Gods",
    description: "New to TFT? Everything you need to know — how combat works, gold management, traits, items, and your first game checklist.",
    category: "Beginner",
    categoryColor: "text-sky-400 bg-sky-500/10 border-sky-500/25",
    date: "April 11, 2026",
    readTime: "9 min read",
    set: "Set 17",
    featured: true,
  },
  {
    slug: "tft-economy-guide",
    title: "TFT Economy Guide: Interest, Leveling & When to Spend",
    description: "Master TFT economy in Set 17. How interest gold works, win-streak vs loss-streak, and the exact stages to level up for maximum advantage.",
    category: "Economy",
    categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    date: "April 8, 2026",
    readTime: "7 min read",
    set: "Set 17",
    featured: true,
  },
  {
    slug: "tft-positioning-guide",
    title: "TFT Positioning Guide: Frontline, Backline & Counter-Positioning",
    description: "A well-positioned weaker board beats a poorly-positioned stronger one. Full guide to placement, carry protection, and scouting habits.",
    category: "Strategy",
    categoryColor: "text-teal-400 bg-teal-500/10 border-teal-500/25",
    date: "April 9, 2026",
    readTime: "6 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "tft-item-building-guide",
    title: "TFT Item Building Guide: Components, Slam vs Hold & Priority",
    description: "Which components to prioritize at carousel, when to slam items vs hold for a better build, and how to adapt when your target item is contested.",
    category: "Items",
    categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    date: "April 10, 2026",
    readTime: "7 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "tft-traits-guide-set17",
    title: "TFT Set 17 Traits Guide: Every Synergy Explained",
    description: "Complete guide to every trait in Set 17: Space Gods. Breakpoints, what each trait does, and which champions power them.",
    category: "Traits",
    categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    date: "April 10, 2026",
    readTime: "8 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "tft-augment-tier-list",
    title: "TFT Augment Tier List: Best Picks in Set 17",
    description: "Best Silver, Gold, and Prismatic augments ranked. Which ones to always take, which are context-dependent, and which traps to avoid.",
    category: "Augments",
    categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    date: "April 11, 2026",
    readTime: "7 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "how-to-play-flex-tft",
    title: "How to Play Flex: Reading the Lobby and Pivoting",
    description: "Stop forcing the same comp every game. Learn how to scout an open lane, identify when to pivot, and consistently finish top 4 as a flex player.",
    category: "Strategy",
    categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25",
    date: "April 12, 2026",
    readTime: "6 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "tft-carousel-strategy",
    title: "TFT Carousel Strategy: What to Pick and Why",
    description: "Component carousels, full-item carousels, when to take the champion instead of the item — a complete framework for every carousel round.",
    category: "Strategy",
    categoryColor: "text-violet-400 bg-violet-500/10 border-violet-500/25",
    date: "April 12, 2026",
    readTime: "5 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "tft-leveling-guide",
    title: "TFT Leveling Guide: When to Level Up Every Stage",
    description: "Exact leveling timelines for Set 17. When to push Level 6, 7, 8, and 9 — and how leveling decisions interact with your economy line.",
    category: "Economy",
    categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    date: "April 13, 2026",
    readTime: "6 min read",
    set: "Set 17",
    featured: false,
  },
  {
    slug: "lifting-competition-augment-guide",
    title: "Lifting Competition Augment: Full Strategy Guide",
    description: "Master the Lifting Competition quest augment — how to hit every HP threshold, when to pivot, and whether chasing the Impossible Lift is actually worth it.",
    category: "Augments",
    categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    date: "April 5, 2026",
    readTime: "6 min read",
    set: "Set 16",
    featured: false,
  },
];

export default function GuidesIndex() {
  const featured = ALL_GUIDES.filter((g) => g.featured);
  const rest = ALL_GUIDES.filter((g) => !g.featured);

  return (
    <>
      <Head>
        <title>TFT Blog & Strategy Articles — TFT School</title>
        <meta
          name="description"
          content="In-depth TFT strategy articles, augment breakdowns, economy tips, and comp guides. Learn how to climb in Teamfight Tactics with TFT School."
        />
      </Head>
      <PageShell
        title="Blog & Strategy"
        subtitle="Deep dives into augments, economy, comps, and mechanics"
      >
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Featured */}
          {featured.length > 0 && (
            <section>
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3">
                Featured
              </p>
              <div className="flex flex-col gap-4">
                {featured.map((g) => (
                  <GuideCard key={g.slug} guide={g} large />
                ))}
              </div>
            </section>
          )}

          {/* Ad unit */}
          <AdUnit slot="0234567890" format="auto" className="my-2" />

          {/* All guides */}
          {rest.length > 0 && (
            <section>
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3">
                All Guides
              </p>
              <div className="flex flex-col gap-3">
                {rest.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          )}
        </div>
      </PageShell>
    </>
  );
}

function GuideCard({ guide, large }: { guide: GuidePost; large?: boolean }) {
  return (
    <Link
      href={`/blog/${guide.slug}`}
      className={`group block bg-bg-surface rounded-2xl border border-white/8 hover:border-accent-gold/30 hover:bg-bg-elevated transition-all duration-200 hover:-translate-y-0.5 ${large ? "p-6" : "p-4"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${guide.categoryColor}`}>
              {guide.category}
            </span>
            <span className="text-[10px] text-text-muted/50 border border-white/8 px-2 py-0.5 rounded-full">
              {guide.set}
            </span>
          </div>
          <h2 className={`font-heading font-semibold text-text-primary group-hover:text-accent-gold transition-colors leading-snug ${large ? "text-lg mb-2" : "text-sm mb-1.5"}`}>
            {guide.title}
          </h2>
          <p className={`text-text-muted leading-relaxed ${large ? "text-sm" : "text-xs"}`}>
            {guide.description}
          </p>
        </div>
        <span className="text-accent-gold/0 group-hover:text-accent-gold/70 transition-colors text-lg shrink-0 mt-1">→</span>
      </div>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
        <span className="text-[10px] text-text-muted/50">{guide.date}</span>
        <span className="text-white/15 text-[10px]">·</span>
        <span className="text-[10px] text-text-muted/50">{guide.readTime}</span>
      </div>
    </Link>
  );
}
