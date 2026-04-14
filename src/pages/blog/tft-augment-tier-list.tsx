import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTAugmentTierList() {
  return (
    <>
      <Head>
        <title>TFT Augment Tier List Set 17: Best Silver, Gold & Prismatic Augments — TFT School</title>
        <meta
          name="description"
          content="The best TFT augments in Set 17 ranked by tier. Learn which Silver, Gold, and Prismatic augments to take, which to skip, and how to evaluate augments in-game."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-purple-400">Augments</span>
            <span className="text-white/20">›</span>
            <span>Augment Tier List</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-purple-400 bg-purple-500/10 border-purple-500/25">Augments</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Augment Tier List: Best Picks in Set 17
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Augments define your game plan more than almost any other variable. Here are the best Silver, Gold, and Prismatic augments to look for — and the traps to avoid.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 11, 2026</span>
              <span className="text-white/15">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">How Augments Work</h2>
              <p className="mb-4">
                Augments appear at three points during a game: <strong className="text-text-primary">Stage 2-1, Stage 3-2, and Stage 4-2</strong>. Each time, you choose one of three randomly offered augments. The tier of augments available scales with each round — Silver at 2-1, Gold at 3-2, and Prismatic at 4-2 (with the possibility of higher-tier augments appearing earlier).
              </p>
              <p className="mb-4">
                Augments fall into two broad categories:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { type: "Combat augments", desc: "Directly buff your units' stats, grant items, or give combat-phase abilities. The immediate impact is obvious — they make your board stronger right now." },
                  { type: "Quest/quest augments", desc: "Give you a goal (reach X HP, win Y fights, etc.) with a reward for completion. Require investment but provide asymmetric returns if you hit the thresholds. Examples: Lifting Competition, Gold Mining." },
                ].map(({ type, desc }) => (
                  <div key={type} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-purple shrink-0 mt-0.5">◈</span>
                    <div>
                      <p className="text-text-primary font-semibold text-xs mb-1">{type}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <AdUnit slot="5234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">S-Tier Augments (Take Every Time)</h2>
              <div className="space-y-3 mb-4">
                {[
                  { name: "Thrill of the Hunt I / II / III (Prismatic)", why: "Grants a free champion copy on kills. Accelerates 3-starring your key units dramatically, especially in reroll comps. The Prismatic version can 3-star a 4-cost by itself." },
                  { name: "Cybernetic Uplink (Gold)", why: "Provides free item components on a timer. Every free component is worth approximately 5 gold of economy while also directly improving your board. Hard to pass on any comp." },
                  { name: "Calculated Loss (Silver)", why: "Grants a powerful item based on how many HP you lose per round. Strong in loss-streak starts and gives a free item Anvil with minimal setup." },
                  { name: "Social Distancing (Gold)", why: "Isolated units deal significantly bonus damage. Naturally rewards good positioning and gives a large single-target damage boost to your carry with zero comp restriction." },
                  { name: "Tons of Stats (Silver/Gold/Prismatic)", why: "Gives every unit on your board flat stats. Higher tier versions give very large amounts. No condition, no restriction — pure power across every unit you field." },
                ].map(({ name, why }) => (
                  <div key={name} className="flex gap-3 bg-accent-gold/5 rounded-xl border border-accent-gold/20 p-4">
                    <span className="text-accent-gold shrink-0 mt-0.5 font-bold text-sm">S</span>
                    <div>
                      <p className="text-accent-gold font-semibold text-xs mb-1">{name}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">A-Tier Augments (Strong, Context-Dependent)</h2>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-2 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Augment</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">When It's Good</span>
                </div>
                {[
                  { name: "Preparation (Gold)", when: "When you have 2 components already built and a clear carry target in sight" },
                  { name: "Big Friend (Silver)", when: "Bruiser or tank-heavy comps. Scales harder the more HP units have" },
                  { name: "Featherweights (Gold)", when: "Low-cost reroll comps. Each 1 and 2-cost unit gains bonus AS and damage" },
                  { name: "Backfoot (Silver)", when: "Backline carry comps. Grants bonus AP/AD to units in the back two rows" },
                  { name: "Built Different (Gold)", when: "Playing unique units without full trait synergies active — which is common in flex comps" },
                  { name: "Portable Forge (Gold/Prismatic)", when: "Always — grants an Artifact item Anvil. Some Artifacts are game-winning in the right comp" },
                ].map((row, i) => (
                  <div key={row.name} className={`grid grid-cols-2 px-4 py-3 text-xs gap-3 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold text-emerald-300">{row.name}</span>
                    <span className="text-text-muted">{row.when}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Augments to Avoid (C/D Tier)</h2>
              <p className="mb-4">These augments look appealing but underperform in most games:</p>
              <div className="space-y-3 mb-4">
                {[
                  { name: "Meditation (Silver/Gold)", issue: "Grants mana regen over time, but the regen rate is too slow to meaningfully accelerate casts in the window fights actually happen." },
                  { name: "Tiny Titans (Silver)", issue: "Increases max HP instead of current HP. Doesn't prevent you dying faster, and you rarely reach the HP amounts needed for the bonus to matter." },
                  { name: "Any 2-cost-specific trait emblem you don't have units for", issue: "Trait emblems require the right champions in your pool. Taking an emblem for a trait you can't activate by Stage 4 is a wasted augment slot." },
                ].map(({ name, issue }) => (
                  <div key={name} className="flex gap-3 bg-red-500/5 rounded-xl border border-red-500/20 p-4">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                    <div>
                      <p className="text-red-300 font-semibold text-xs mb-1">{name}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{issue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <AdUnit slot="5234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Augment Decision Framework</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "S-tier augments (Thrill of the Hunt, Cybernetic Uplink) are almost always correct regardless of comp.",
                  "For quest augments, evaluate whether you can realistically complete 80% of the quest — if not, skip.",
                  "Trait emblems are only S-tier if you already have 2–3 units of that trait and a clear reason to push the breakpoint.",
                  "Economy augments (free gold, free components) are almost never wrong in the early rounds.",
                  "Avoid narrow augments (specific unit buffs) unless that unit is your planned 3-star reroll target.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/flashcards" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                🃏 Study with Flashcards
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/lifting-competition-augment-guide", title: "Lifting Competition Augment: Full Strategy Guide", category: "Augments", categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25", readTime: "6 min read" },
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/how-to-play-flex-tft", title: "How to Play Flex: Reading the Lobby and Pivoting", category: "Strategy", categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25", readTime: "6 min read" },
            { href: "/blog/tft-traits-guide-set17", title: "TFT Set 17 Traits Guide: Every Synergy Explained", category: "Traits", categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", readTime: "8 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
