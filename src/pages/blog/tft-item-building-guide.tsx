import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTItemBuildingGuide() {
  return (
    <>
      <Head>
        <title>TFT Item Building Guide: Components, Slam vs Hold & Priority — TFT School</title>
        <meta
          name="description"
          content="Learn how to build items in TFT Set 17. Which components to prioritize at carousel, when to slam items vs hold components, and how to build on a budget."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-amber-400">Items</span>
            <span className="text-white/20">›</span>
            <span>Item Building Guide</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-amber-400 bg-amber-500/10 border-amber-500/25">Items</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Item Building Guide: Components, Slam vs Hold & Priority
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Items win games. Knowing which components to pick, when to slam them, and how to adapt when your ideal build is contested is the difference between top 4 and 8th place.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 10, 2026</span>
              <span className="text-white/15">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Understanding Component Value</h2>
              <p className="mb-4">
                TFT has 9 basic component items, each combining with others to create completed items. The key insight is that <strong className="text-text-primary">not all components are equal</strong>. Some components are flexible and build into many powerful items; others are narrow and only work in specific comps.
              </p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-3 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Component</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Flexibility</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Best Builds Into</span>
                </div>
                {[
                  { comp: "B.F. Sword", flex: "S-tier", builds: "IE, BT, Deathblade, RFC" },
                  { comp: "Tear of Goddess", flex: "S-tier", builds: "Shojin, BIS for mana carries" },
                  { comp: "Needlessly Large Rod", flex: "A-tier", builds: "Rabadon's, JG, Morello" },
                  { comp: "Chain Vest", flex: "A-tier", builds: "Sunfire, Bramble, Gargoyle" },
                  { comp: "Giant's Belt", flex: "A-tier", builds: "Warmog's, Zeke's, Redemption" },
                  { comp: "Negatron Cloak", flex: "B-tier", builds: "Dragon's Claw, Quicksilver" },
                  { comp: "Sparring Gloves", flex: "B-tier", builds: "Thief's Gloves, Titan's Resolve" },
                  { comp: "Recurve Bow", flex: "B-tier", builds: "RFC, Runaan's, Rageblade" },
                  { comp: "Spatula", flex: "Situational", builds: "Trait emblems (very high value if right trait)" },
                ].map((row, i) => (
                  <div key={row.comp} className={`grid grid-cols-3 px-4 py-3 text-xs gap-2 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold text-text-primary">{row.comp}</span>
                    <span className={row.flex === "S-tier" ? "text-accent-gold font-semibold" : row.flex === "A-tier" ? "text-emerald-400" : "text-text-muted"}>{row.flex}</span>
                    <span className="text-text-muted text-[11px]">{row.builds}</span>
                  </div>
                ))}
              </div>
              <p>
                <strong className="text-text-primary">B.F. Sword and Tear of Goddess</strong> are the most valuable carousel components because they build into multiple S-tier items for almost every carry type. When in doubt, take these over narrower components.
              </p>
            </section>

            <AdUnit slot="3234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Slam vs Hold: When to Build Items Early</h2>
              <p className="mb-4">
                &quot;Slamming&quot; an item means combining two components into a completed item as soon as you have them, even if it&apos;s not ideal. &quot;Holding&quot; means keeping the components separate to wait for a better build target.
              </p>
              <p className="mb-4">
                <strong className="text-text-primary">Slam when:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li>You are struggling and losing HP faster than expected — a completed item on a 2-star unit can stabilize your board immediately.</li>
                <li>You have two components that both build into the same good item, and that item is BiS for your current best unit.</li>
                <li>It&apos;s Stage 3 and you still have two unbuilt components. Holding components on the bench costs you combat power during stages that matter most.</li>
                <li>A Spatula is involved — Emblems are almost always worth slamming to activate a powerful trait.</li>
              </ul>
              <p className="mb-4"><strong className="text-text-primary">Hold when:</strong></p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li>You are win-streaking and have HP to spare — holding for a better item on a better unit costs you nothing if you&apos;re winning rounds anyway.</li>
                <li>You have one component that builds into the exact BiS item for your intended 4-cost carry, and it&apos;s Stage 3-1 or earlier.</li>
                <li>Combining would create an item that has no good home on your current board.</li>
              </ul>
              <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200 leading-relaxed">
                <strong className="text-amber-300">Rule of thumb:</strong> Never end Stage 3 with more than 1 unbuilt component pair. The tempo loss from weak combat outweighs the upside of saving for a perfect item.
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">S-Tier Items in Set 17</h2>
              <p className="mb-4">These items are powerful in almost every situation and should be prioritized when you have the right components:</p>
              <div className="space-y-3 mb-4">
                {[
                  { item: "Infinity Edge", note: "Best AD carry item. Converts excess crit chance to crit damage. Core on almost all physical carries." },
                  { item: "Jeweled Gauntlet", note: "AP equivalent of IE. Allows ability crits. Paired with Rabadon's on any mage carry." },
                  { item: "Rabadon's Deathcap", note: "Massive AP amplifier. Best-in-slot second item on any AP carry after a mana or crit item." },
                  { item: "Blue Buff (Shojin)", note: "Grants mana on hit. Lets carries cast abilities back-to-back. Core for mana-hungry casters." },
                  { item: "Warmog's Armor", note: "Pure HP. Best frontline item in most metas. Especially strong in quest augment comps." },
                  { item: "Bramble Vest", note: "Counter to crit-heavy AD comps. Reflects damage on being attacked. Excellent on Bastion units." },
                ].map(({ item, note }) => (
                  <div key={item} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-gold font-bold text-xs shrink-0 mt-0.5 min-w-[130px]">{item}</span>
                    <p className="text-text-muted text-xs leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Building on a Budget (Makeshift Items)</h2>
              <p className="mb-4">
                Sometimes your components don&apos;t perfectly match your ideal build. Rather than leaving components on the bench or building suboptimal items, consider putting the components directly on a frontline unit as unfinished items. A lone B.F. Sword gives +10 AD and that&apos;s meaningful on a tank, even without combining it.
              </p>
              <p>
                Additionally, <strong className="text-text-primary">Thief&apos;s Gloves</strong> (two Sparring Gloves) is one of the best budget items in the game — it copies two random completed items every combat round. On a unit that already has one good item, Thief&apos;s Gloves effectively gives it two more random items and often performs well above expectation.
              </p>
            </section>

            <AdUnit slot="3234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Item Building Rules</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "B.F. Sword and Tear are the most flexible components. Take them at carousel when you don't know your comp yet.",
                  "Don't end Stage 3 with an unbuilt component pair. The tempo loss is too costly.",
                  "Slam when losing HP; hold when win-streaking and the target item is clear.",
                  "Spatulas are almost always worth slamming into an Emblem if it activates the right trait.",
                  "Thief's Gloves on a secondary carry is often the best use of two Sparring Gloves when your primary carry is already itemized.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/items" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ⚔️ Browse Item Catalog
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-carousel-strategy", title: "TFT Carousel Strategy: What to Pick and Why", category: "Strategy", categoryColor: "text-violet-400 bg-violet-500/10 border-violet-500/25", readTime: "5 min read" },
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-augment-tier-list", title: "TFT Augment Tier List: Best Picks in Set 17", category: "Augments", categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25", readTime: "7 min read" },
            { href: "/blog/tft-positioning-guide", title: "TFT Positioning Guide: Frontline, Backline & Counter-Positioning", category: "Strategy", categoryColor: "text-teal-400 bg-teal-500/10 border-teal-500/25", readTime: "6 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
