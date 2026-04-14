import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function HowToPlayFlexTFT() {
  return (
    <>
      <Head>
        <title>How to Play Flex in TFT: Reading the Lobby & Pivoting — TFT School</title>
        <meta
          name="description"
          content="Learn how to play flex TFT in Set 17. How to read the lobby, identify open comps, pivot when contested, and consistently finish top 4 without forcing a specific comp."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-orange-400">Strategy</span>
            <span className="text-white/20">›</span>
            <span>Flex Play Guide</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-orange-400 bg-orange-500/10 border-orange-500/25">Strategy</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
              <span className="text-[10px] text-sky-400 border border-sky-500/25 bg-sky-500/8 px-2.5 py-1 rounded-full">Advanced</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              How to Play Flex: Reading the Lobby and Pivoting in Set 17
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Forcing the same comp every game is a Bronze habit. Top-4 players adapt to what the lobby gives them. Here is how to read an open lane and take it.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 12, 2026</span>
              <span className="text-white/15">·</span>
              <span>6 min read</span>

            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">What Flex Play Means</h2>
              <p className="mb-4">
                &quot;Playing flex&quot; means <strong className="text-text-primary">not deciding your final comp before the game starts</strong>. Instead of forcing a specific team composition every game, you let the shop, your augments, and what other players are doing guide your comp choice.
              </p>
              <p className="mb-4">
                The underlying principle: if 3 players in an 8-person lobby are all buying Caitlyn and competing for the same 3-cost units, the copies in the pool thin rapidly. A flex player who recognizes this at Stage 2 can pivot to an uncontested comp and consistently 2-star their units while those 3 players all finish with weak 1-star boards.
              </p>
              <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-200 leading-relaxed">
                <strong className="text-blue-300">Key concept:</strong> Being the only person on a comp in your lobby is worth more than playing the statistically best comp while being contested by two opponents.
              </div>
            </section>

            <AdUnit slot="7234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">How to Read the Lobby</h2>
              <p className="mb-4">
                Scouting is the foundation of flex play. Here is what to look for on every board you scout:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { signal: "Units on the board", read: "Immediately shows which trait they're building. 3+ Snipers = Sniper player. Heavy frontline + 1 backline carry = Bastion/Vanguard comp." },
                  { signal: "Items on units", read: "Rabadon's + JG = AP carry. IE + BT = AD carry. Warmog's + Sunfire = HP/tank augment comp. This tells you what 4-cost they're targeting." },
                  { signal: "Bench contents", read: "Champions on the bench reveal the player's plan. 3 copies of Caitlyn on bench = they are 3-starring Caitlyn. Avoid buying those units." },
                  { signal: "Level", read: "High level early = they spent gold and are going fast 8. Low level late = they are econ-ing or slow-rolling. Adjust your own leveling decisions accordingly." },
                ].map(({ signal, read }) => (
                  <div key={signal} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-gold font-bold text-xs shrink-0 mt-0.5 min-w-[100px]">{signal}</span>
                    <p className="text-text-muted text-xs leading-relaxed">{read}</p>
                  </div>
                ))}
              </div>
              <p>
                Scout at minimum once per stage. The best players scout every single planning phase — 30 seconds of reading 7 boards tells you almost everything you need to know about the lobby.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Identifying an Open Lane</h2>
              <p className="mb-4">
                An <strong className="text-text-primary">open lane</strong> is a comp that nobody else in the lobby is running. If you&apos;re the only Sniper player in the lobby, every Jinx and Caitlyn that appears in the shop is available to you — the pool feels infinite compared to a contested comp.
              </p>
              <p className="mb-4">Here is a quick framework for identifying open lanes:</p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-3 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Look For</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Open Signal</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Contested Signal</span>
                </div>
                {[
                  { look: "Your target 2/3-cost", open: "Appearing 3–4x in your shop each refresh", contested: "Rarely appearing, others have them on bench" },
                  { look: "Others' boards", open: "No one has units of that trait", contested: "2+ players running the same core units" },
                  { look: "Item components", open: "Shop offering components that match your build", contested: "Others grabbed the same components at carousel" },
                ].map((row, i) => (
                  <div key={row.look} className={`grid grid-cols-3 px-4 py-3 text-xs gap-2 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold">{row.look}</span>
                    <span className="text-emerald-300">{row.open}</span>
                    <span className="text-red-300">{row.contested}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">When and How to Pivot</h2>
              <p className="mb-4">
                A pivot is a mid-game change of direction. It is the highest-skill move in TFT when executed correctly — and the most costly mistake when executed wrong. Here is the decision tree:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    condition: "Pivot before Stage 3-1",
                    action: "Safe. You've invested almost nothing in units. Sell freely, take a different augment direction, and start fresh. Cost is minimal.",
                  },
                  {
                    condition: "Pivot at Stage 3-5 to 4-2",
                    action: "Moderate risk. Sell units that don't fit the new direction. Keep high-value, multi-trait units that work in both comps as transition pieces.",
                  },
                  {
                    condition: "Pivot at Stage 4-5 or later",
                    action: "High risk. Only justified if you are not finding your current comp's key units at all and you have 40+ gold to start the new comp from scratch.",
                  },
                ].map(({ condition, action }) => (
                  <div key={condition} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-purple shrink-0 mt-0.5">◈</span>
                    <div>
                      <p className="text-text-primary font-semibold text-xs mb-1">{condition}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                The key to a good pivot is <strong className="text-text-primary">transition units</strong> — champions that work in multiple comps. A unit that has two strong traits (e.g., both Bastion and Dark Star) is never a wasted buy, because they fit into multiple directions.
              </p>
            </section>

            <AdUnit slot="7234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Flex Play Rules</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Scout every stage. Know which comps are taken before you commit.",
                  "Being uncontested on a good comp beats being contested on the best comp.",
                  "Transition units (multi-trait champions) are the backbone of flex play — buy them even when you're undecided.",
                  "Pivot early (before 3-1) is low cost. Pivot at 4-5+ is high risk and requires 40+ gold to execute cleanly.",
                  "Let augment offers guide your direction — a strong trait augment at 2-1 is often the cleanest signal to commit to a comp.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/team-builder" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                🏗️ Plan Your Comp
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-positioning-guide", title: "TFT Positioning Guide: Frontline, Backline & Counter-Positioning", category: "Strategy", categoryColor: "text-teal-400 bg-teal-500/10 border-teal-500/25", readTime: "6 min read" },
            { href: "/blog/tft-traits-guide-set17", title: "TFT Set 17 Traits Guide: Every Synergy Explained", category: "Traits", categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", readTime: "8 min read" },
            { href: "/blog/tft-leveling-guide", title: "TFT Leveling Guide: When to Level Up Every Stage", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "6 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
