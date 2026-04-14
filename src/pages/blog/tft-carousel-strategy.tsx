import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTCarouselStrategy() {
  return (
    <>
      <Head>
        <title>TFT Carousel Strategy: What to Take and When — TFT School</title>
        <meta
          name="description"
          content="Master TFT carousel rounds in Set 17. Learn which components to prioritize, how to navigate shared carousels, what to look for in full item carousels, and when to take a champion over an item."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-violet-400">Strategy</span>
            <span className="text-white/20">›</span>
            <span>Carousel Strategy</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-violet-400 bg-violet-500/10 border-violet-500/25">Strategy</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Carousel Strategy: What to Pick and Why
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              The carousel is one of the most impactful moments in each stage — a free item that shapes the rest of your game. Here is how to make the right pick every time.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 12, 2026</span>
              <span className="text-white/15">·</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">How the Carousel Works</h2>
              <p className="mb-4">
                At the end of each stage (after Stage 1, 2, 3, 4, 5...), all players enter a shared carousel round. Champions circle on a hex ring, each carrying an item. When the timer ends, players are released to run toward a champion and claim it — <strong className="text-text-primary">one champion and its item per player</strong>.
              </p>
              <p className="mb-4">
                <strong className="text-text-primary">Pick order is based on current HP</strong>: the player with the lowest HP picks first (a catch-up mechanic). If players are tied in HP, pick order is randomized. This means the player who is losing gets first choice of the carousel, which is intentional game design to prevent runaway leaders.
              </p>
              <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200 leading-relaxed">
                <strong className="text-amber-300">Important:</strong> You receive both the champion AND the item it carries. Even if you don&apos;t want the champion, you can immediately sell it for gold (or keep it for traits) and keep the item.
              </div>
            </section>

            <AdUnit slot="8234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Component Carousel: What to Prioritize</h2>
              <p className="mb-4">
                The first carousel (after Stage 1) is a <strong className="text-text-primary">component carousel</strong> — every champion carries a basic item component. This is often the most impactful carousel of the game because components determine your item direction for the next 3 stages.
              </p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-2 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Situation</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Best Pick</span>
                </div>
                {[
                  { sit: "No comp decided yet", pick: "B.F. Sword or Tear of Goddess — most flexible components in the game" },
                  { sit: "AP comp planned", pick: "Needlessly Large Rod or Tear of Goddess for Rabadon's or Shojin" },
                  { sit: "AD carry comp planned", pick: "B.F. Sword for IE or Bloodthirster" },
                  { sit: "Tank/frontline need", pick: "Giant's Belt for Warmog's or Chain Vest for Bramble" },
                  { sit: "Spatula is available", pick: "Almost always worth taking — builds into a trait emblem" },
                ].map((row, i) => (
                  <div key={row.sit} className={`grid grid-cols-2 px-4 py-3 text-xs gap-3 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="text-text-muted">{row.sit}</span>
                    <span className="font-semibold text-accent-gold">{row.pick}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Full-Item Carousels</h2>
              <p className="mb-4">
                Later carousels (after Stage 2 and Stage 4) often feature <strong className="text-text-primary">completed items</strong> on champions. This changes the decision framework significantly — you&apos;re now comparing full items by their value to your current board.
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    title: "Go for BiS items first",
                    body: "If the perfect item for your main carry is on the carousel, go for it even if another player is contesting. A single optimal item on your carry is worth more than a mediocre item you get uncontested.",
                  },
                  {
                    title: "Prioritize rare item components over common full items",
                    body: "A full item built from common components (e.g., Chain Vest + Chain Vest = Bramble Vest) is available in many carousels. A rare Tear-based item appearing early is a higher priority even if Bramble would technically be better for your board.",
                  },
                  {
                    title: "Don't be greedy on Spatula carousels",
                    body: "When a Spatula appears on a full-item carousel, the emblems present are usually very strong. Evaluate whether the emblem fits your comp — if it does, prioritize it over any standard item on the carousel.",
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-purple shrink-0 mt-0.5">◈</span>
                    <div>
                      <p className="text-text-primary font-semibold text-xs mb-1">{title}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">When to Take the Champion, Not the Item</h2>
              <p className="mb-4">
                Sometimes the champion carrying the item matters more than the item itself. Cases where you should prioritize the champion:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li>The champion is your <strong className="text-text-secondary">3-star reroll target</strong> and you need one more copy — even if the item is suboptimal.</li>
                <li>The champion activates a trait breakpoint that significantly upgrades your board.</li>
                <li>The champion is a <strong className="text-text-secondary">5-cost</strong> and you can field it immediately.</li>
                <li>The item on the champion is also good for that champion specifically (a natural pairing).</li>
              </ul>
              <p>
                In all other situations, prioritize the item. You can always sell a champion and keep the item — you can&apos;t remove an item without a remover.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Carousel Navigation</h2>
              <p className="mb-4">
                Being first on the carousel doesn&apos;t guarantee you get your target. Here are movement tips:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li><strong className="text-text-secondary">Move to the inner hex of the ring</strong> where the champions circle, not the outer edge. You can intercept a champion mid-rotation if you&apos;re positioned correctly.</li>
                <li>Identify your target champion <strong className="text-text-secondary">before the carousel opens</strong> — don&apos;t spend time reading item tooltips during the navigation phase.</li>
                <li>If another player is moving toward your target, cut the angle and intercept — don&apos;t give up on a contested pick unless they are clearly closer.</li>
              </ul>
              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-200 leading-relaxed">
                <strong className="text-emerald-300">Second-pick tip:</strong> If you&apos;re not first on the carousel, immediately identify what the first pick will take and pivot to your next-best option. Planning ahead while watching the carousel start prevents hesitation that costs you your second choice.
              </div>
            </section>

            <AdUnit slot="8234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Carousel Rules</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "First carousel: B.F. Sword and Tear of Goddess are the safest flex picks if you don't have a clear comp direction.",
                  "Spatula is almost always worth taking — emblems are high-value especially early in the game.",
                  "You can sell the champion and keep the item. Never reject a good item just because you don't want the unit.",
                  "Lowest HP player picks first — losing is partially compensated by carousel priority.",
                  "Identify your target before the carousel opens. Don't read tooltips during navigation.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/combinator" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                🔨 Item Combinator
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-item-building-guide", title: "TFT Item Building Guide: Components, Slam vs Hold", category: "Items", categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", readTime: "7 min read" },
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-leveling-guide", title: "TFT Leveling Guide: When to Level Up Every Stage", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "6 min read" },
            { href: "/blog/how-to-play-flex-tft", title: "How to Play Flex: Reading the Lobby and Pivoting", category: "Strategy", categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25", readTime: "6 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
