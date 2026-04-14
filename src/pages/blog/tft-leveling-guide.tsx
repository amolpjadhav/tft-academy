import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTLevelingGuide() {
  return (
    <>
      <Head>
        <title>TFT Leveling Guide: When to Level Up Every Stage — TFT School</title>
        <meta
          name="description"
          content="Exact TFT leveling timelines for Set 17. When to push Level 6, 7, 8, and 9. How leveling interacts with your economy and which comps want to fast-level vs slow-roll."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-blue-400">Economy</span>
            <span className="text-white/20">›</span>
            <span>Leveling Guide</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/25">Economy</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Leveling Guide: When to Level Up Every Stage
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Leveling at the wrong time is one of the most common high-elo mistakes. Here are the exact timelines, costs, and decision points for every level from 4 to 9.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 13, 2026</span>
              <span className="text-white/15">·</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Why Leveling Matters</h2>
              <p className="mb-4">
                Your level determines two things: <strong className="text-text-primary">how many units you can field</strong> and <strong className="text-text-primary">the odds of seeing higher-cost champions in your shop</strong>.
              </p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-3 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Level</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Units on Board</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">4-cost Odds</span>
                </div>
                {[
                  { level: "5", units: "5", odds: "1%" },
                  { level: "6", units: "6", odds: "5%" },
                  { level: "7", units: "7", odds: "15%" },
                  { level: "8", units: "8", odds: "25%" },
                  { level: "9", units: "9", odds: "30%" },
                  { level: "10", units: "10", odds: "30%" },
                ].map((row, i) => (
                  <div key={row.level} className={`grid grid-cols-3 px-4 py-3 text-xs ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold">Level {row.level}</span>
                    <span>{row.units} units</span>
                    <span className={row.level === "8" || row.level === "9" ? "text-accent-gold font-semibold" : ""}>{row.odds}</span>
                  </div>
                ))}
              </div>
              <p>
                The jump from Level 7 to Level 8 is the biggest single-level improvement in 4-cost odds (15% → 25%). This is why <strong className="text-text-primary">reaching Level 8 early is the standard win-condition</strong> for most comps in Set 17.
              </p>
            </section>

            <AdUnit slot="9234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Exact Leveling Timelines</h2>
              <div className="space-y-3 mb-4">
                {[
                  {
                    timing: "Level 4 — Always at Stage 2-1",
                    detail: "Cost: 4 XP (you have this naturally from Stage 1). Field 4 units instead of 3. This is completely free — there is no reason to skip it. Every new player who doesn't do this is giving away a free unit slot.",
                    color: "border-emerald-500/20 bg-emerald-500/5",
                    label: "ALWAYS",
                    labelColor: "text-emerald-400",
                  },
                  {
                    timing: "Level 5 — Stage 2-3 to 3-1",
                    detail: "Cost: 8 XP. If win-streaking, level at 2-3 or 2-5 to maintain pressure. If loss-streaking or econ-ing, delay to 3-1 to maximize interest income first.",
                    color: "border-blue-500/20 bg-blue-500/5",
                    label: "SITUATIONAL",
                    labelColor: "text-blue-400",
                  },
                  {
                    timing: "Level 6 — Stage 3-2 (standard)",
                    detail: "Cost: 12 XP. Opens access to 3-cost champions at higher odds. Delaying past 3-5 means fielding 5 units when your opponents have 6, which is a significant power gap.",
                    color: "border-blue-500/20 bg-blue-500/5",
                    label: "STANDARD",
                    labelColor: "text-blue-400",
                  },
                  {
                    timing: "Level 7 — Stage 3-5 to 4-2",
                    detail: "Cost: 20 XP. Contested timing. Win-streakers push 7 at 3-5 for early access to 4-costs. Loss-streakers and econ players wait until 4-1 or 4-2 to maximize gold saved before rolling.",
                    color: "border-amber-500/20 bg-amber-500/5",
                    label: "TIMING MATTERS",
                    labelColor: "text-amber-400",
                  },
                  {
                    timing: "Level 8 — Stage 4-5 to 5-1",
                    detail: "Cost: 36 XP. The most important level in the game. Standard timing is 4-5 with 50 gold saved. This is when you open-roll for 4-costs and find your main carry 2-star.",
                    color: "border-accent-gold/20 bg-accent-gold/5",
                    label: "CRITICAL",
                    labelColor: "text-accent-gold",
                  },
                  {
                    timing: "Level 9 — Stage 5-3 or later",
                    detail: "Cost: 48 XP. Only viable if you have 60+ HP and your comp specifically wants 5-cost units. Most comps stabilize at Level 8 and never need 9.",
                    color: "border-purple-500/20 bg-purple-500/5",
                    label: "ADVANCED",
                    labelColor: "text-purple-400",
                  },
                ].map(({ timing, detail, color, label, labelColor }) => (
                  <div key={timing} className={`rounded-xl border p-4 ${color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-text-primary font-semibold text-xs">{timing}</p>
                      <span className={`text-[10px] font-bold ${labelColor}`}>{label}</span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Leveling by Economy Line</h2>
              <p className="mb-4">Your leveling timeline must match your economy strategy:</p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-3 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Line</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Level 7</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Level 8</span>
                </div>
                {[
                  { line: "Fast 8", l7: "4-1 (save gold for 8)", l8: "4-5 with 50g banked" },
                  { line: "Win-streak", l7: "3-5 (maintain pressure)", l8: "4-2 with 30g, roll down" },
                  { line: "Slow Roll", l7: "Stay at 6–7, hold level", l8: "Only if 3-stars are secured" },
                  { line: "Hyper Roll", l7: "Never (stay at 4–5)", l8: "Never (board power from 3-stars)" },
                ].map((row, i) => (
                  <div key={row.line} className={`grid grid-cols-3 px-4 py-3 text-xs gap-2 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold text-text-primary">{row.line}</span>
                    <span className="text-text-muted">{row.l7}</span>
                    <span className="text-text-muted">{row.l8}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">The Level 8 Roll-Down Technique</h2>
              <p className="mb-4">
                The most common high-elo play is the <strong className="text-text-primary">Level 8 roll-down</strong>: save gold through Stages 2–4, hit Level 8 at Stage 4-5 or 5-1 with 50 gold, then spend down to 30 gold or less rolling for 4-cost 2-stars.
              </p>
              <p className="mb-4">The sequence looks like this:</p>
              <div className="space-y-2 mb-4">
                {[
                  "End Stage 4-4 with 50+ gold and enough XP to hit Level 8.",
                  "Hit Level 8 immediately at the start of Stage 4-5.",
                  "Roll until you find your key 4-cost carries at 2-star, or until you hit 20–30 gold.",
                  "Stabilize your board and stop rolling. Let interest rebuild above 30 gold.",
                  "If you still need key units, do a second smaller roll-down at Stage 5-1.",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start bg-bg-elevated/40 rounded-lg px-3 py-2">
                    <span className="text-accent-gold font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                    <p className="text-text-muted text-xs">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <AdUnit slot="9234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Leveling Rules</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Level 4 at Stage 2-1: always, it's free.",
                  "Level 6 at Stage 3-2: standard timing, don't delay past 3-5.",
                  "Level 8 is the most important level — standard Fast 8 timing is 4-5 with 50g banked.",
                  "Slow Roll comps hold at Level 6 or 7. Never Level 8 before hitting 3-star key units.",
                  "Level 9 is rarely necessary unless you need a specific 5-cost to win the game.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/blog/tft-economy-guide" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                📖 Full Economy Guide
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-carousel-strategy", title: "TFT Carousel Strategy: What to Pick and Why", category: "Strategy", categoryColor: "text-violet-400 bg-violet-500/10 border-violet-500/25", readTime: "5 min read" },
            { href: "/blog/how-to-play-flex-tft", title: "How to Play Flex: Reading the Lobby and Pivoting", category: "Strategy", categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25", readTime: "6 min read" },
            { href: "/blog/tft-augment-tier-list", title: "TFT Augment Tier List: Best Picks in Set 17", category: "Augments", categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25", readTime: "7 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
