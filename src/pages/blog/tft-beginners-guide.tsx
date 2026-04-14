import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTBeginnersGuide() {
  return (
    <>
      <Head>
        <title>TFT Beginner's Guide: How to Play Teamfight Tactics Set 17 — TFT School</title>
        <meta
          name="description"
          content="New to TFT? This beginner's guide covers everything you need to know: how combat works, gold management, champions, items, and traits in Set 17: Space Gods."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-sky-400">Beginner</span>
            <span className="text-white/20">›</span>
            <span>Beginner&apos;s Guide</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-sky-400 bg-sky-500/10 border-sky-500/25">Beginner</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
              <span className="text-[10px] text-emerald-400 border border-emerald-500/25 bg-emerald-500/8 px-2.5 py-1 rounded-full">Start Here</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Beginner&apos;s Guide: How to Play Set 17 Space Gods
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Teamfight Tactics is a deep auto-battler with a lot of systems. This guide explains all of them from scratch so you can start your first game with a real understanding of what&apos;s happening.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 11, 2026</span>
              <span className="text-white/15">·</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">What Is Teamfight Tactics?</h2>
              <p className="mb-4">
                Teamfight Tactics (TFT) is an <strong className="text-text-primary">auto-battler</strong> game built on League of Legends. Eight players share a lobby. Each player builds a board of champions that fight automatically every round. The last player standing wins.
              </p>
              <p className="mb-4">
                Unlike traditional strategy games, you don&apos;t control your champions during combat — the battle plays out on its own. Your job is to make the <strong className="text-text-primary">right decisions between rounds</strong>: which champions to buy, where to place them, which items to build, and when to level up.
              </p>
              <p>
                Each game takes 30–45 minutes. You play against 7 opponents, but you only face one at a time. Winning rounds is good, but survival is what matters — you are eliminated when you run out of HP.
              </p>
            </section>

            <AdUnit slot="6234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">The Basic Structure of a TFT Game</h2>
              <p className="mb-4">A TFT game is divided into stages and rounds:</p>
              <div className="rounded-xl border border-white/8 overflow-hidden my-5">
                <div className="grid grid-cols-2 bg-bg-elevated px-4 py-2.5">
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Stage</span>
                  <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">What Happens</span>
                </div>
                {[
                  { stage: "Stage 1", what: "PvE rounds. You fight creeps, not players. Free items and gold." },
                  { stage: "Stage 2", what: "First PvP combat. Players fight each other. Carousel round for items." },
                  { stage: "Stage 3", what: "Mid-game. Economy decisions and leveling up are critical here." },
                  { stage: "Stage 4", what: "Strong boards form. 4-cost units start dominating. Rolling for 2-stars." },
                  { stage: "Stage 5+", what: "Late game. 5-cost units. Lobbies thin out as players are eliminated." },
                ].map((row, i) => (
                  <div key={row.stage} className={`grid grid-cols-2 px-4 py-3 text-xs gap-2 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-elevated/30"} text-text-secondary`}>
                    <span className="font-semibold text-text-primary">{row.stage}</span>
                    <span className="text-text-muted">{row.what}</span>
                  </div>
                ))}
              </div>
              <p>
                At the end of each stage, there is a <strong className="text-text-primary">Carousel round</strong> where all players walk toward a ring of champions and items, and each player picks one. Higher-placed players pick later in the carousel (a catch-up mechanic).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Champions, Stars, and the Shop</h2>
              <p className="mb-4">
                Champions are the units you put on your board. Each champion has a <strong className="text-text-primary">gold cost</strong> (1–5g) that determines how powerful it is. Higher-cost champions are rarer and stronger.
              </p>
              <p className="mb-4">
                Champions have star levels (1★, 2★, 3★). Buying <strong className="text-text-primary">three copies of the same champion</strong> at 1★ upgrades them to a 2★, which has roughly double the stats. Three 2★ copies create a 3★, which is very powerful and rare.
              </p>
              <p className="mb-4">
                The <strong className="text-text-primary">shop</strong> refreshes automatically each round and shows 5 random champions. You can also manually refresh it for 2 gold to see new options. Knowing when to refresh vs. save is a key skill.
              </p>
              <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-200 leading-relaxed">
                <strong className="text-blue-300">New player tip:</strong> You share the champion pool with all 7 opponents. If multiple players are buying the same champion, the copies available decrease quickly. Watch what others are buying.
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Traits and Synergies</h2>
              <p className="mb-4">
                Every champion belongs to one or more <strong className="text-text-primary">traits</strong>. Fielding multiple champions with the same trait activates a <strong className="text-text-primary">synergy bonus</strong> that gives all units of that trait a permanent combat buff.
              </p>
              <p className="mb-4">
                For example, fielding 4 Bastion-trait units activates a bonus that gives all Bastion units extra Armor and Magic Resistance, making them much harder to kill.
              </p>
              <p>
                Building your board around 1–2 strong trait combinations is the standard way to create a powerful comp. Beginners should focus on activating at least one 4-unit trait breakpoint before adding diversity.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Items</h2>
              <p className="mb-4">
                Items are earned from carousel rounds, PvE stages, and augments. Each item is made from <strong className="text-text-primary">two components combined</strong>. There are 9 basic components and they combine into different finished items depending on the recipe.
              </p>
              <p className="mb-4">
                Items are placed on champions and stay there for the rest of the game (unless a remover is available). Each champion can hold a maximum of <strong className="text-text-primary">3 items</strong>.
              </p>
              <p>
                As a beginner, focus on putting your best items on your strongest carry unit. A well-itemized carry is far more important than having mediocre items spread across your whole board.
              </p>
            </section>

            <AdUnit slot="6234567891" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">7 Mistakes Every New TFT Player Makes</h2>
              <div className="space-y-3">
                {[
                  { mistake: "Spending all gold every round", fix: "Hold gold at interest breakpoints (10, 20, 30...). Passive interest income is one of the most powerful economic forces in the game." },
                  { mistake: "Not leveling at Stage 2-1", fix: "Leveling to 4 at 2-1 is free XP. Always do it. Skipping this is leaving free power on the table." },
                  { mistake: "Putting all carries in the center", fix: "AOE abilities will hit your entire team. Spread your board. Keep your main carry in a corner or at least isolated." },
                  { mistake: "Not scouting other boards", fix: "You can see every enemy board during planning phase. Click through them every stage to understand the meta of your lobby." },
                  { mistake: "Building items on bench units", fix: "Items built on a unit on the bench don't contribute to your fights. Move the unit onto the board or wait to build the item." },
                  { mistake: "Forcing a comp regardless of the shop", fix: "TFT rewards players who adapt to what the shop offers. If you're not finding your target units, pivot to a different comp." },
                  { mistake: "Ignoring HP until it's too late", fix: "Check your HP after every combat. If you're below 50 HP in Stage 3, you need to stabilize immediately — not in two rounds." },
                ].map(({ mistake, fix }, i) => (
                  <div key={i} className="bg-bg-elevated/60 rounded-xl border border-white/8 p-4">
                    <p className="text-red-300 font-semibold text-xs mb-1">✗ {mistake}</p>
                    <p className="text-text-muted text-xs leading-relaxed">→ {fix}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">Your First Game Checklist</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Level to 4 at Stage 2-1 (it's free).",
                  "Pick up items from PvE rounds and equip them immediately — don't leave items on the bench.",
                  "Look for 2 or more units that share a trait and build around that combination.",
                  "Hold gold at round numbers (10, 20, 30) to earn interest.",
                  "Check other players' boards once per stage — know what you're up against.",
                  "Don't panic-spend gold when you're losing. Stay calm and build toward your plan.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/flashcards" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                🃏 Learn Champions
              </Link>
              <Link href="/glossary" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                📖 TFT Glossary
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-economy-guide", title: "TFT Economy Guide: Interest, Leveling & When to Spend", category: "Economy", categoryColor: "text-blue-400 bg-blue-500/10 border-blue-500/25", readTime: "7 min read" },
            { href: "/blog/tft-traits-guide-set17", title: "TFT Set 17 Traits Guide: Every Synergy Explained", category: "Traits", categoryColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", readTime: "8 min read" },
            { href: "/blog/tft-item-building-guide", title: "TFT Item Building Guide: Components, Slam vs Hold", category: "Items", categoryColor: "text-amber-400 bg-amber-500/10 border-amber-500/25", readTime: "7 min read" },
            { href: "/blog/tft-positioning-guide", title: "TFT Positioning Guide: Frontline, Backline & Counter-Positioning", category: "Strategy", categoryColor: "text-teal-400 bg-teal-500/10 border-teal-500/25", readTime: "6 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
