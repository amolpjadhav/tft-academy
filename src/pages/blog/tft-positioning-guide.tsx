import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTPositioningGuide() {
  return (
    <>
      <Head>
        <title>TFT Positioning Guide: Frontline, Backline & Counter-Positioning — TFT School</title>
        <meta
          name="description"
          content="Learn how to position your TFT board correctly. Frontline placement, protecting your carries, and counter-positioning against Assassins and AOE comps in Set 17."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-teal-400">Strategy</span>
            <span className="text-white/20">›</span>
            <span>Positioning Guide</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-teal-400 bg-teal-500/10 border-teal-500/25">Strategy</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Positioning Guide: Frontline, Backline & Counter-Positioning
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              A well-positioned board with weaker units will beat a poorly-positioned board with stronger ones. Here is everything you need to know about placement in Set 17.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 9, 2026</span>
              <span className="text-white/15">·</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">The Basic Board Layout</h2>
              <p className="mb-4">
                The TFT board has <strong className="text-text-primary">4 rows of hexes</strong>. Units fight on the front two rows of your half. The standard positioning logic is straightforward: <strong className="text-text-primary">tanks go front, carries go back</strong>.
              </p>
              <p className="mb-4">
                But &quot;tanks front, carries back&quot; is just the starting point. True high-elo positioning accounts for the enemy board, the specific abilities in play, and where the battle will actually resolve. Here is how to think about each row:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { row: "Row 1 (frontmost)", role: "Primary tanks and frontline. Your tankiest units with CC or aggro-drawing abilities go here. They absorb the initial burst and buy time for carries." },
                  { row: "Row 2", role: "Secondary frontline. Bruisers, flex carries (melee DPS), or units with short-range abilities. Also where you put fragile tanks that can't survive Row 1." },
                  { row: "Row 3", role: "Primary backline carries. Your main damage dealer goes here. Keep them spread out — don't cluster two carries on adjacent hexes where AOE hits both." },
                  { row: "Row 4 (backmost)", role: "Reserved for units with very long range or units that need maximum protection. Also used for utility units like healers." },
                ].map(({ row, role }) => (
                  <div key={row} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-gold font-bold text-xs shrink-0 mt-0.5 min-w-[80px]">{row}</span>
                    <p className="text-text-muted text-xs leading-relaxed">{role}</p>
                  </div>
                ))}
              </div>
            </section>

            <AdUnit slot="2234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Protecting Your Carry</h2>
              <p className="mb-4">
                Your carry is the unit that wins the fight if it stays alive. It is also the priority target for every Assassin, Sniper, and targeted spell in the enemy comp. Protecting it is not just about putting two tanks in front — it requires understanding <em>how</em> enemies will reach your backline.
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    title: "Corner positioning (vs. Assassins)",
                    body: "Assassins jump to the farthest unit, which is usually your carry. Move your carry to a corner hex and place a tanky unit in the opposite corner. Assassins will jump to the decoy unit instead.",
                  },
                  {
                    title: "Spread positioning (vs. AOE)",
                    body: "AOE abilities hit multiple units in a radius. Never cluster your backline. Space your carries 2+ hexes apart so a single Syndra, Brand, or Aurelion Sol ability cannot hit both.",
                  },
                  {
                    title: "Diagonal offset (general protection)",
                    body: "Place your main carry diagonally offset from your tanks, not directly behind them. Many abilities fire in straight lines — a diagonal offset makes your carry harder to chain-target.",
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
              <h2 className="font-heading text-xl text-accent-gold mb-4">Counter-Positioning Common Threats</h2>
              <p className="mb-4">
                After you understand your own board&apos;s needs, look at the enemy board and adjust. Here are the most common threats and how to counter each:
              </p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-3 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Threat</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">What It Does</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Counter</span>
                </div>
                {[
                  { threat: "Assassins", does: "Jump to farthest/isolated unit", counter: "Corner carry or clump frontline to bait jumps" },
                  { threat: "AOE Mages", does: "Hit largest cluster of units", counter: "Spread board wide, no adjacent carries" },
                  { threat: "Snipers", does: "Target farthest-back unit", counter: "Move carry to front rows or use a decoy unit in the back corner" },
                  { threat: "Engage (Malphite, Zac)", does: "Knock up/stun a cluster", counter: "Spread units so the AOE engage hits 2 units, not 5" },
                  { threat: "Shred comps", does: "Reduce armor/MR quickly", counter: "Stack one resist type heavily; split items rather than stacking the same resist" },
                ].map((row, i) => (
                  <div key={row.threat} className={`grid grid-cols-3 px-4 py-3 text-xs gap-2 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold text-text-primary">{row.threat}</span>
                    <span className="text-text-muted">{row.does}</span>
                    <span className="text-emerald-300">{row.counter}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">The Scouting Habit</h2>
              <p className="mb-4">
                You cannot counter-position without knowing what you are up against. <strong className="text-text-primary">Scout every player at least once per stage</strong> by clicking through boards during the planning phase. Specifically look for:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li>Which player you will fight next (shown in the combat preview)</li>
                <li>Whether they run Assassins (reposition your carry immediately)</li>
                <li>Who is strongest overall (avoid fighting them by positioning away from their ghost)</li>
                <li>What your neighbors are doing (who is contesting your units or items)</li>
              </ul>
              <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-200 leading-relaxed">
                <strong className="text-blue-300">Pro tip:</strong> You can see the ghost of the player you will fight next during the planning phase. Adjust your positioning for that specific ghost every round — not for an imaginary average opponent.
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Set 17 Specific Notes</h2>
              <p className="mb-4">
                Set 17: Space Gods introduces several mechanics that change positioning compared to earlier sets:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li><strong className="text-text-secondary">Dark Star units</strong> gain stacking damage on kill — keep them in a position where they can clean up weakened enemies quickly, not isolated in a corner.</li>
                <li><strong className="text-text-secondary">N.O.V.A. trait</strong> buffs units at the start of combat based on positioning — read the trait effect and place your N.O.V.A. carrier accordingly.</li>
                <li><strong className="text-text-secondary">Sniper trait</strong> grants bonus damage for every hex between the Sniper and its target — maximize this by placing Snipers in the back row with a clear firing lane.</li>
                <li><strong className="text-text-secondary">Vanguard units</strong> project shields to adjacent units — cluster your frontline around your Vanguards to maximize the shield coverage.</li>
              </ul>
            </section>

            <AdUnit slot="2234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Positioning Rules</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Tanks front, carries back. Space your carries — never cluster two carries on adjacent hexes.",
                  "Move your carry to a corner when facing Assassins. They jump to the farthest isolated unit.",
                  "Scout the player you fight next every round and adjust your positioning for their specific board.",
                  "Spread your board vs. AOE comps. Stack your board vs. Assassin comps.",
                  "Sniper trait: back row, clear lanes. Vanguard: cluster frontline for maximum shield coverage.",
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
                🏗️ Open Team Builder
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/how-to-play-flex-tft", title: "How to Play Flex: Reading the Lobby and Pivoting", category: "Strategy", categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25", readTime: "6 min read" },
            { href: "/blog/tft-traits-guide-set17", title: "TFT Set 17 Traits Guide: Every Synergy Explained", category: "Traits", categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", readTime: "8 min read" },
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-item-building-guide", title: "TFT Item Building Guide: Components, Slam vs Hold & Priority", category: "Items", categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", readTime: "7 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
