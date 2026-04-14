import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function LiftingCompetitionGuide() {
  return (
    <>
      <Head>
        <title>Lifting Competition Augment Guide — TFT Set 16 | TFT School</title>
        <meta
          name="description"
          content="Full strategy guide for the Lifting Competition quest augment in TFT Set 16: Lore & Legends. Learn the HP thresholds, optimal item choices, mid-game pivots, and whether the Impossible Lift is worth chasing."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-purple-400">Augments</span>
            <span className="text-white/20">›</span>
            <span>Lifting Competition</span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-purple-400 bg-purple-500/10 border-purple-500/25">Augments</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 16 · Lore & Legends</span>
              <span className="text-[10px] text-amber-400 border border-amber-500/25 bg-amber-500/8 px-2.5 py-1 rounded-full">Gold Tier</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              Lifting Competition: The Complete Augment Guide
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              How to hit every HP threshold, when to pivot away from Bruisers, and whether the Impossible Lift is a win condition or a trap.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 5, 2026</span>
              <span className="text-white/15">·</span>
              <span>6 min read</span>
            </div>
          </header>

          {/* Body */}
          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            {/* Intro */}
            <section>
              <p className="mb-4">
                In <strong className="text-text-primary">TFT Set 16: Lore &amp; Legends</strong>, the <strong className="text-text-primary">Lifting Competition</strong> is a Gold-tier quest augment that rewards you for stacking massive amounts of Health across your Bruiser units. On the surface it looks like a "go Bruiser vertical" augment — but in practice, it plays much more like a <em>tempo-into-transition</em> tool. The players who understand that distinction are the ones consistently finishing in the top three.
              </p>
              <p>
                This guide breaks down exactly how the augment works, how to play each phase of the game, and when it actually makes sense to swing for the Impossible Lift versus cashing out early and riding the gold to a stronger endgame.
              </p>
            </section>

            {/* How it works */}
            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">How Lifting Competition Works</h2>
              <p className="mb-4">
                When you take Lifting Competition, you <strong className="text-text-primary">immediately receive a Shen and a Sion</strong> — two Bruiser units — giving you an instant four-unit Bruiser opener if you pair them with two other Bruisers from the shop.
              </p>
              <p className="mb-4">
                At the start of each planning phase, the game totals the <strong className="text-text-primary">combined maximum Health of every unique Bruiser on your board</strong>. If that number exceeds the current lift threshold, you receive a reward and the next threshold activates. There are four tiers in total:
              </p>

              {/* Threshold table */}
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-3 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Lift</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">HP Threshold</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Reward</span>
                </div>
                {[
                  { lift: "1st Lift", hp: "~8,000 HP",  reward: "2 components + 4 gold" },
                  { lift: "2nd Lift", hp: "~16,000 HP", reward: "2 components + 8 gold" },
                  { lift: "3rd Lift", hp: "~26,000 HP", reward: "2 components + 16 gold" },
                  { lift: "Impossible Lift", hp: "~34,000–36,000 HP", reward: "Radiant item + Golden Remover" },
                ].map((row, i) => (
                  <div key={row.lift} className={`grid grid-cols-3 px-4 py-3 text-xs ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} ${row.lift === "Impossible Lift" ? "text-accent-gold border-t border-accent-gold/20" : "text-text-secondary"}`}>
                    <span className="font-semibold">{row.lift}</span>
                    <span className="tabular-nums">{row.hp}</span>
                    <span>{row.reward}</span>
                  </div>
                ))}
              </div>

              <p>
                The first three lifts are the bread and butter. They collectively give you roughly <strong className="text-text-primary">28 gold and 6 components</strong>, which is enough to accelerate to Level 8 faster than most lobbies can react. The Impossible Lift is genuinely transformative — a Radiant item alone can win you the game — but it requires a very specific late-game board state to actually achieve.
              </p>
            </section>

            {/* Early game */}
            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Early Game: Stage 2-1 to 3-2</h2>
              <p className="mb-4">
                <strong className="text-text-primary">Take this augment at 2-1.</strong> The earlier you begin accumulating Bruisers, the faster you tick through the first two lifts and start snowballing. Taking it at 3-2 is not wrong if the lobby forces it, but you give up one full check cycle and typically miss the first threshold reward in a timely window.
              </p>
              <p className="mb-4">
                Your immediate goal is fielding four unique Bruisers. Shen and Sion are already in your hand. Round out the roster with any two Bruisers available in the shop — <strong className="text-text-primary">Blitzcrank, Briar, Darius, and Mundo</strong> are all low-cost options that appear frequently in Stage 2.
              </p>
              <p className="mb-4">
                Item priority in the early game is flat HP above almost everything else:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li><strong className="text-text-secondary">Warmog's Armor</strong> — the single best item for the quest. +500 HP plus a strong passive for sustained fights.</li>
                <li><strong className="text-text-secondary">Redemption</strong> — +300 HP plus team healing. Excellent early.</li>
                <li><strong className="text-text-secondary">Sunfire Cape</strong> — +400 HP with a useful burn aura on tanks.</li>
                <li><strong className="text-text-secondary">Gargoyle Stoneplate</strong> — no flat HP, but scales defensively in big fights. Lower priority for the quest.</li>
              </ul>
              <p>
                Every 1,000 HP you add to your Bruisers gets you measurably closer to the next threshold. Components like Giant's Belt and Chain Vest that build into HP-granting items should be prioritized in your carousel choices throughout Stages 2 and 3.
              </p>
            </section>

            {/* Ad unit */}
            <AdUnit slot="0134567890" format="auto" className="my-2" />

            {/* Mid game */}
            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Mid-Game: The Tempo Pivot</h2>
              <p className="mb-4">
                Here is where most players make the critical mistake: <strong className="text-text-primary">they commit fully to the Bruiser vertical in the mid-game because it feels thematic</strong>. In high-elo play, the first three rewards are used to accelerate away from Bruisers, not deepen the commitment.
              </p>
              <p className="mb-4">
                By Stage 4, the ideal line looks like this: you've banked the three lift rewards (roughly 28 gold + components), you're sitting on a healthy HP total from your items, and you use that gold advantage to <strong className="text-text-primary">level faster and 2-star your 4-cost carries</strong> before the rest of the lobby can. Your Bruisers remain in the lineup as frontline — they don't go anywhere — but they stop being the centerpiece of the board.
              </p>
              <p className="mb-3">The two most reliable mid-game transition targets:</p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    title: "Bruiser + AP Duo (Ryze / Volibear / LeBlanc line)",
                    body: "Bruisers provide durable frontline while a 2-star Ryze or LeBlanc handles the carry damage. The extra gold from early lifts lets you hit Level 8 at Stage 4-5, well ahead of the curve.",
                  },
                  {
                    title: "Bruiser into Legendary Board",
                    body: "If the lobby is slow and you've been winning consistently, the gold advantage can push you to Level 9 for Aurelion Sol or other 5-costs. Keep your Bruisers as the defensive backbone.",
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

            {/* Impossible lift */}
            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">The Impossible Lift: Worth It?</h2>
              <p className="mb-4">
                The 34,000–36,000 HP target for the final reward sounds absurd, and it mostly is — which is why it's called the Impossible Lift. Reaching it requires a board that looks very different from a normal Stage 5 composition:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-text-muted mb-4">
                <li>Multiple <strong className="text-text-secondary">3-star Bruisers</strong> (3-star Volibear and Sylas are the most achievable targets)</li>
                <li><strong className="text-text-secondary">Bruiser Emblem</strong> on a naturally high-HP unit like a 2-star 5-cost</li>
                <li><strong className="text-text-secondary">Anima Visage</strong> or <strong className="text-text-secondary">Warmog's Armor</strong> stacked on multiple frontline units</li>
                <li>Supporting augments like <strong className="text-text-secondary">Big Friend</strong> or <strong className="text-text-secondary">Ixtal Sunshards</strong> to push raw HP further</li>
              </ul>
              <p className="mb-4">
                The Radiant item payout is undeniably strong — a Radiant Warmog's or Radiant Bloodthirster can single-handedly carry a game. But chasing the Impossible Lift means staying Bruiser-heavy until Stage 5-6, which sacrifices the tempo advantage that makes this augment worth taking in the first place.
              </p>
              <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200 leading-relaxed">
                <strong className="text-amber-300">When is the Impossible Lift worth it?</strong> Only if you naturally hit 3-star Bruisers from a contested reroll line, or if you pick up a Bruiser Emblem from an augment or Anvil. Do not chase it intentionally by sacrificing gold. Let it happen organically — if it doesn't, the first three lifts still gave you a significant lead.
              </div>
            </section>

            {/* Summary table */}
            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Phase-by-Phase Cheat Sheet</h2>
              <div className="rounded-xl border border-white/8 overflow-hidden">
                <div className="grid grid-cols-2 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Phase</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Action</span>
                </div>
                {[
                  { phase: "Stage 2 (Early)", action: "Field 4 unique Bruisers with Shen + Sion. Slam HP items (Warmog's, Redemption) immediately." },
                  { phase: "Stage 3 (Mid-early)", action: "Hit 1st and 2nd lift thresholds. Bank gold. Don't level aggressively yet." },
                  { phase: "Stage 4 (Mid)", action: "Use lift rewards to reach Level 8. Transition into AP carry or dual-carry board. Keep Bruisers as frontline." },
                  { phase: "Stage 5 (Late)", action: "Hit 3rd lift if not already done. Push Level 9 for Legendaries, or 3-star key Bruisers if organically close to Impossible Lift." },
                ].map((row, i) => (
                  <div key={row.phase} className={`grid grid-cols-2 px-4 py-3 text-xs gap-4 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"}`}>
                    <span className="font-semibold text-text-secondary">{row.phase}</span>
                    <span className="text-text-muted">{row.action}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Ad unit */}
            <AdUnit slot="0134567891" format="auto" className="my-2" />

            {/* TL;DR */}
            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Take at 2-1. Field four Bruisers immediately using the free Shen + Sion.",
                  "Prioritize flat HP items (Warmog's, Redemption) to hit thresholds faster.",
                  "The first three lifts (28 gold + 6 components) are the real prize — use them to level ahead of the lobby.",
                  "Transition into an AP carry or Legendary board at Stage 4. Bruisers become frontline support, not the win condition.",
                  "Only chase the Impossible Lift if 3-star Bruisers happen naturally. Never sacrifice gold to force it.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/simulator"
                className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center"
              >
                🧪 Try the Champion Simulator
              </Link>
              <Link
                href="/blog"
                className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center"
              >
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-augment-tier-list", title: "TFT Augment Tier List: Best Picks in Set 17", category: "Augments", categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25", readTime: "7 min read" },
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-item-building-guide", title: "TFT Item Building Guide: Components, Slam vs Hold", category: "Items", categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", readTime: "7 min read" },
            { href: "/blog/tft-traits-guide-set17", title: "TFT Set 17 Traits Guide: Every Synergy Explained", category: "Traits", categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", readTime: "8 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
