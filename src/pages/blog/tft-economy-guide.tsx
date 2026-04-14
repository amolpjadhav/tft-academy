import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTEconomyGuide() {
  return (
    <>
      <Head>
        <title>TFT Economy Guide: Interest, Leveling & When to Spend — TFT School</title>
        <meta
          name="description"
          content="Master TFT economy in Set 17. Learn how interest gold works, when to win-streak vs loss-streak, and the exact stages to level up for maximum advantage."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-blue-400">Economy</span>
            <span className="text-white/20">›</span>
            <span>Economy Guide</span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/25">Economy</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Economy Guide: Interest, Leveling & When to Spend
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Gold management separates Diamond from Gold. Here is exactly how interest works, when to streak, and the leveling timelines that high-elo players use every game.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 8, 2026</span>
              <span className="text-white/15">·</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">How Interest Gold Works</h2>
              <p className="mb-4">
                At the start of every round, TFT pays you <strong className="text-text-primary">1 gold for every 10 gold you have saved</strong>, up to a maximum of 5 gold at 50+ gold. This passive income is called <em>interest</em>, and it is the single most powerful lever in the game.
              </p>
              <p className="mb-4">
                Players who understand interest treat their gold like a bank balance, not a resource to drain every round. The compounding effect means that a player sitting at 50 gold earns <strong className="text-text-primary">5 bonus gold per round</strong> — equivalent to winning a streak bonus — without doing anything at all.
              </p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-2 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Gold Saved</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Interest Earned</span>
                </div>
                {[
                  { saved: "0 – 9",  interest: "0 gold" },
                  { saved: "10 – 19", interest: "1 gold" },
                  { saved: "20 – 29", interest: "2 gold" },
                  { saved: "30 – 39", interest: "3 gold" },
                  { saved: "40 – 49", interest: "4 gold" },
                  { saved: "50+",     interest: "5 gold (max)" },
                ].map((row, i) => (
                  <div key={row.saved} className={`grid grid-cols-2 px-4 py-3 text-xs ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} ${row.saved === "50+" ? "text-accent-gold font-semibold border-t border-accent-gold/20" : "text-text-secondary"}`}>
                    <span>{row.saved}</span>
                    <span>{row.interest}</span>
                  </div>
                ))}
              </div>
              <p>
                The key insight: <strong className="text-text-primary">always try to sit at 10, 20, 30, 40, or 50 gold</strong> at the end of your shopping phase. Spending down to 19 gold instead of holding at 20 costs you 1 interest gold the next round — and that compounds over 30+ rounds into a meaningful deficit.
              </p>
            </section>

            {/* Ad unit */}
            <AdUnit slot="1234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Streak Bonuses: Win-streak vs Loss-streak</h2>
              <p className="mb-4">
                In addition to interest, TFT rewards consecutive wins or losses with <strong className="text-text-primary">streak gold bonuses</strong>. Streaks of 2 or more give +1 gold per round. Streaks of 5+ give +3 gold per round on top of your base income.
              </p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-2 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Streak Length</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Bonus Gold</span>
                </div>
                {[
                  { streak: "0 – 1 (no streak)", bonus: "+0 gold" },
                  { streak: "2 – 3", bonus: "+1 gold" },
                  { streak: "4", bonus: "+2 gold" },
                  { streak: "5+", bonus: "+3 gold" },
                ].map((row, i) => (
                  <div key={row.streak} className={`grid grid-cols-2 px-4 py-3 text-xs ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span>{row.streak}</span>
                    <span className="font-semibold text-accent-gold">{row.bonus}</span>
                  </div>
                ))}
              </div>
              <p className="mb-4">
                <strong className="text-text-primary">Win-streaking</strong> is the strongest early-game line: build a powerful Stage 2 board, win consistently, and collect both interest and streak bonuses. This lets you roll or level aggressively in Stage 3 while others are still building up their economy.
              </p>
              <p>
                <strong className="text-text-primary">Loss-streaking</strong> is the deliberate alternative: intentionally keep a weak board to lose rounds, collect the loss-streak gold bonus, and save HP for a stronger late-game board. This is high-risk — you need enough HP to survive 8–10 consecutive losses in Stages 2–3 — but the gold advantage can be enormous when executed correctly.
              </p>
              <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4 text-xs text-red-200 leading-relaxed mt-4">
                <strong className="text-red-300">Common mistake:</strong> Players try to loss-streak but panic and spend gold to win a round, breaking the streak and losing both the HP and the economy advantage. Commit fully to the streak or don&apos;t start one.
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">When to Level Up</h2>
              <p className="mb-4">
                Leveling up costs gold and costs XP, and the decision of when to level is one of the most skill-expressive choices in TFT. Here are the standard timelines used in high-elo play:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { level: "Level 4 (Stage 2-1)", action: "Always level to 4 at the start of Stage 2-1. Cost: 4 XP. This is free — you have enough natural XP from Stage 1. Failing to do this is a beginner mistake." },
                  { level: "Level 5 (Stage 2-5 or 3-1)", action: "Level to 5 to access stronger units. If win-streaking, level at 2-5 to maintain pressure. If loss-streaking or eco-ing, delay to 3-1." },
                  { level: "Level 6 (Stage 3-2)", action: "Standard timing. Unlocks 4-cost unit pool. Delaying past 3-5 significantly weakens your mid-game board." },
                  { level: "Level 7 (Stage 4-1)", action: "Contested timing — some players push 7 early at 3-5 to hit 4-costs faster, others wait for 4-1 to maximize economy first." },
                  { level: "Level 8 (Stage 4-5 to 5-1)", action: "Stabilize at 8 for your primary comp. This is where most games are decided. Rolling heavily at 8 is the standard win-condition line." },
                  { level: "Level 9 (Stage 5-3+)", action: "Only viable if you are healthy (60+ HP) and have a 3-cost or 4-cost reroll comp that wants Legendary units for support." },
                ].map(({ level, action }) => (
                  <div key={level} className="flex gap-3 bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <span className="text-accent-gold font-bold text-xs shrink-0 mt-0.5 min-w-[60px]">{level}</span>
                    <p className="text-text-muted text-xs leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Slow Roll vs Fast 8 vs Hyper Roll</h2>
              <p className="mb-4">Three distinct economy lines define most TFT strategies:</p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    title: "Fast 8 (most common)",
                    body: "Save gold through Stages 2–4, hit Level 8 at Stage 4-5 or 5-1 with 50+ gold, then open-roll for 4-cost and 5-cost carries. Best when your comp relies on 4-cost 2-stars.",
                  },
                  {
                    title: "Slow Roll (3-cost reroll)",
                    body: "Hold at Level 6 or 7. Spend excess gold (above 50) every round to 3-star key 3-cost units. Examples: Tristana reroll, Zed reroll. Requires low competition for those units.",
                  },
                  {
                    title: "Hyper Roll (1 or 2-cost reroll)",
                    body: "Hard-commit to 3-starring 1 or 2-cost units as fast as possible. Hold at Level 4 or 5. Very strong in early game but falls off if the board doesn't scale.",
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

            {/* Ad unit */}
            <AdUnit slot="1234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Economy Rules</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Always end your shopping phase at a gold breakpoint (10, 20, 30, 40, 50).",
                  "Max interest is 5 gold/round at 50+ gold — treat this as a mandatory passive income floor.",
                  "Streak bonuses stack with interest; maintaining a 5-streak adds 3 free gold per round.",
                  "Level to 4 for free at 2-1. Standard Level 6 is 3-2. Standard Level 8 is 4-5.",
                  "Choose one economy line (Fast 8, Slow Roll, or Hyper Roll) and commit — mixing them loses gold to neither strategy.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/quiz" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                🧠 Test Your Knowledge
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-leveling-guide", title: "TFT Leveling Guide: When to Level Up Every Stage", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "6 min read" },
            { href: "/blog/how-to-play-flex-tft", title: "How to Play Flex: Reading the Lobby and Pivoting", category: "Strategy", categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25", readTime: "6 min read" },
            { href: "/blog/tft-augment-tier-list", title: "TFT Augment Tier List: Best Picks in Set 17", category: "Augments", categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25", readTime: "7 min read" },
            { href: "/blog/tft-carousel-strategy", title: "TFT Carousel Strategy: What to Pick and Why", category: "Strategy", categoryColor: "text-violet-400 bg-violet-500/10 border-violet-500/25", readTime: "5 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
