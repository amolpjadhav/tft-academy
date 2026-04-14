import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedArticles from "@/components/blog/RelatedArticles";

export default function TFTTraitsGuideSet17() {
  return (
    <>
      <Head>
        <title>TFT Set 17 Traits Guide: Space Gods Origins & Classes — TFT School</title>
        <meta
          name="description"
          content="Complete guide to every trait in TFT Set 17: Space Gods. Learn breakpoints, what each trait does, and which champions power them for maximum synergy."
        />
      </Head>
      <PageShell title="" subtitle="">
        <article className="max-w-2xl mx-auto">

          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-6">
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span className="text-white/20">›</span>
            <span className="text-emerald-400">Traits</span>
            <span className="text-white/20">›</span>
            <span>Set 17 Traits Guide</span>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/25">Traits</span>
              <span className="text-[10px] text-text-muted/50 border border-white/8 px-2.5 py-1 rounded-full">Set 17 · Space Gods</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary font-bold leading-tight mb-3">
              TFT Set 17 Traits Guide: Every Synergy Explained
            </h1>
            <p className="text-text-secondary text-base leading-relaxed">
              Set 17: Space Gods brings a full roster of origins and classes. Here is what every trait does, its breakpoints, and which champions you need to activate it.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[11px] text-text-muted/50 flex-wrap">
              <AuthorBio compact />
              <span className="text-white/15">·</span>
              <span>April 10, 2026</span>
              <span className="text-white/15">·</span>
              <span>8 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-secondary text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">How Traits Work</h2>
              <p className="mb-4">
                Traits are activated when you field a certain number of champions sharing that trait. Each trait has multiple <strong className="text-text-primary">breakpoints</strong> — the minimum number of units needed to unlock each level of the bonus. Higher breakpoints give stronger bonuses.
              </p>
              <p className="mb-4">
                Traits are split into two categories:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { type: "Origins (gold icon)", desc: "Tied to a champion's backstory or faction. Examples: Dark Star, N.O.V.A., Timebreaker. Origins tend to give powerful team-wide or synergy bonuses." },
                  { type: "Classes (silver icon)", desc: "Tied to a champion's combat role. Examples: Bastion, Brawler, Sniper, Vanguard. Classes give direct combat stat bonuses to the relevant units." },
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

            <AdUnit slot="4234567890" format="auto" className="my-2" />

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">S-Tier Traits to Build Around</h2>
              <div className="space-y-4">
                {[
                  {
                    trait: "Dark Star",
                    type: "Origin",
                    breakpoints: "3 / 5 / 7 / 10",
                    summary: "Dark Star units gain stacking AD and AP on kills and assists. At high breakpoints, this creates a snowball effect where eliminating one unit powers up the entire team for the rest of the fight. Dark Star 7 is one of the strongest vertical traits in Set 17.",
                    tip: "Works best with a primary carry that can secure the first kill quickly. Position them to hit weakened units.",
                  },
                  {
                    trait: "N.O.V.A.",
                    type: "Origin",
                    breakpoints: "2 / 4 / 6",
                    summary: "N.O.V.A. units empower each other based on proximity at the start of combat. The closer your N.O.V.A. units are positioned together, the stronger the bonus. This is a unique positioning-dependent trait that rewards intentional board design.",
                    tip: "Stack your N.O.V.A. units in a tight formation at combat start. Don't spread them for positioning reasons or you lose the trait value.",
                  },
                  {
                    trait: "Bastion",
                    type: "Class",
                    breakpoints: "2 / 4 / 6 / 8",
                    summary: "Bastion units gain flat Armor and Magic Resistance, making them difficult to burst down on either damage type. Bastion 4 is a common frontline combo, and Bastion 6 creates near-unkillable tanks that buy enormous time for your backline.",
                    tip: "Stack resistances from items on your Bastion units — the multiplicative scaling of flat MR and armor is very strong.",
                  },
                  {
                    trait: "Vanguard",
                    type: "Class",
                    breakpoints: "2 / 4 / 6",
                    summary: "Vanguard units project shields to adjacent allies at the start of combat. Higher breakpoints increase both the shield value and the radius. Vanguard 4 is a cornerstone trait for almost any physical-carry composition.",
                    tip: "Position your Vanguards centrally so their shields reach multiple units. Two Vanguards in opposite corners shield very few allies.",
                  },
                  {
                    trait: "Sniper",
                    type: "Class",
                    breakpoints: "2 / 4 / 6",
                    summary: "Sniper units deal bonus damage for each hex of distance between them and their target. The bonus scales per hex, meaning a Sniper at maximum range deals significantly more damage than one in melee range.",
                    tip: "Place Snipers in your back row with the clearest possible firing lane. Never put them in Row 1 or 2 — you lose almost all of the trait value.",
                  },
                ].map(({ trait, type, breakpoints, summary, tip }) => (
                  <div key={trait} className="bg-bg-surface rounded-2xl border border-white/8 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated/50 border-b border-white/6">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-text-primary font-bold">{trait}</span>
                        <span className="text-[10px] px-1.5 py-px rounded"
                          style={{
                            background: type === "Origin" ? "rgba(245,158,11,0.12)" : "rgba(139,92,246,0.12)",
                            color: type === "Origin" ? "#f59e0b" : "#a78bfa",
                          }}>
                          {type}
                        </span>
                      </div>
                      <span className="text-[11px] text-text-muted font-mono">{breakpoints}</span>
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      <p className="text-xs text-text-secondary leading-relaxed">{summary}</p>
                      <div className="flex gap-2 pt-1">
                        <span className="text-accent-gold text-[10px] shrink-0">✦</span>
                        <p className="text-[11px] text-text-muted leading-relaxed">{tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl text-accent-gold mb-4">Splashing Traits vs. Going Vertical</h2>
              <p className="mb-4">
                A <strong className="text-text-primary">vertical</strong> is when you build a full 7 or higher units of one trait. It gives maximum bonus but restricts your champion pool. A <strong className="text-text-primary">splash</strong> is picking up 2–3 units of a trait for a minor bonus while primarily running a different trait.
              </p>
              <p className="mb-4">
                In Set 17, the most powerful strategy is usually to <strong className="text-text-primary">find one strong vertical origin and splash two strong classes</strong>. For example: Dark Star 5 + Bastion 4 + Vanguard 2. This gives you a scaling damage origin, a durable frontline, and shield protection — all from 11 units or fewer.
              </p>
              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-200 leading-relaxed">
                <strong className="text-emerald-300">Flex tip:</strong> Use the Traits Explorer to identify which traits your strongest 2-cost units double-dip into. Champions that contribute to two strong traits are gold in a flex composition.
              </div>
            </section>

            <AdUnit slot="4234567891" format="auto" className="my-2" />

            <section className="bg-bg-surface rounded-2xl border border-white/8 p-5">
              <h2 className="font-heading text-base text-accent-gold mb-3">TL;DR — Traits in Set 17</h2>
              <ul className="space-y-2 text-xs text-text-muted">
                {[
                  "Traits unlock at breakpoints. More units = higher breakpoint = stronger bonus.",
                  "Origins (gold icon) give faction-wide bonuses. Classes (silver icon) give combat stats to those units.",
                  "S-tier damage trait: Dark Star. Stack it to 5 or 7 for a late-game snowball carry.",
                  "Bastion + Vanguard is the standard frontline combination in most comps.",
                  "N.O.V.A. is positioning-dependent — cluster those units at the start of combat.",
                  "Splashing 2-3 units of a class trait on an origin vertical is usually better than running two weaker verticals.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold shrink-0">✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/traits" className="flex-1 flex items-center justify-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                🌟 Explore All Traits
              </Link>
              <Link href="/blog" className="flex-1 flex items-center justify-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-center">
                ← Back to Blog
              </Link>
            </section>

          </div>

          <AuthorBio />

          <RelatedArticles posts={[
            { href: "/blog/tft-beginners-guide", title: "TFT Beginner's Guide: How to Play Set 17", category: "Beginner", categoryColor: "text-sky-400 bg-sky-500/10 border-sky-500/25", readTime: "9 min read" },
            { href: "/blog/tft-positioning-guide", title: "TFT Positioning Guide: Frontline, Backline & Counter-Positioning", category: "Strategy", categoryColor: "text-teal-400 bg-teal-500/10 border-teal-500/25", readTime: "6 min read" },
            { href: "/blog/how-to-play-flex-tft", title: "How to Play Flex: Reading the Lobby and Pivoting", category: "Strategy", categoryColor: "text-orange-400 bg-orange-500/10 border-orange-500/25", readTime: "6 min read" },
            { href: "/blog/tft-augment-tier-list", title: "TFT Augment Tier List: Best Picks in Set 17", category: "Augments", categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25", readTime: "7 min read" },
          ]} />

        </article>
      </PageShell>
    </>
  );
}
