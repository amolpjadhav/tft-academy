import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About TFT School — Your TFT Learning Companion</title>
        <meta
          name="description"
          content="TFT School is a free learning platform for Teamfight Tactics players. Learn champions, items, traits, and strategies with flashcards, quizzes, and interactive tools."
        />
      </Head>
      <PageShell title="About TFT School" subtitle="Who we are and why we built this">
        <article className="max-w-2xl mx-auto prose-custom space-y-8">

          {/* Intro */}
          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">
              What is TFT School?
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              TFT School is a free, community-built learning companion for <strong className="text-text-primary">Teamfight Tactics (TFT)</strong> — the auto-battler strategy game by Riot Games. Whether you just played your first game and have no idea what's happening, or you're a seasoned player looking to sharpen your knowledge of Set 17: Space Gods, TFT School is built for you.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              TFT can feel overwhelming at first. There are 60 champions, dozens of items, 30+ traits, and a whole vocabulary of terms like "econ", "reroll", "capping", and "augments" that beginners have never heard of. We built TFT School to remove that barrier and make learning the game genuinely enjoyable.
            </p>
          </section>

          {/* What we offer */}
          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-4">
              What Can You Learn Here?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "🃏",
                  title: "Champion Flashcards",
                  body: "Flip through every champion in Set 17: Space Gods. Each card shows their ability explained in plain English (no jargon), a beginner-friendly breakdown of what they actually do in a fight, their ideal items with reasons why, and key stats. We even explain unique mechanics like Meeps, the Groove, Anima Weapons, and the Realm of the Gods system.",
                },
                {
                  icon: "🧠",
                  title: "Quiz Mode",
                  body: "Test your knowledge with two quiz modes: a Champions Quiz covering abilities, roles, costs, and traits; and a Glossary Quiz covering core TFT mechanics and terminology. Quizzes are randomized, scored, and include streaks to keep you engaged.",
                },
                {
                  icon: "⚔️",
                  title: "Item Catalog",
                  body: "Browse all completed items in Set 17, filtered by role (AD Carry, AP Carry, Melee Carry, Tank). Each item shows its stats, its passive ability explained clearly, why it matters in the current meta, and which champion archetypes benefit most.",
                },
                {
                  icon: "🔨",
                  title: "Item Combinator",
                  body: "Not sure what two components combine into? The Combinator lets you pick any two basic components and instantly see every possible completed item you can craft — no memorization required.",
                },
                {
                  icon: "🎮",
                  title: "Champion Simulator",
                  body: "Equip any champion with up to three items and see their exact stats in real time — HP, attack damage, ability power, attack speed, crit chance, and more. Great for planning item builds before a game.",
                },
                {
                  icon: "🌟",
                  title: "Traits Explorer",
                  body: "Learn what every trait does, how many champions you need for each breakpoint, and which champions activate each one. Understanding traits is the key to building powerful team compositions.",
                },
                {
                  icon: "📖",
                  title: "TFT Glossary",
                  body: "Over 100 TFT terms explained clearly — from basic concepts like \"Gold\" and \"Leveling\" to advanced mechanics like \"Soft Reroll\", \"Capping\", and \"Loss Streaking\". Each entry has a simple definition, a detailed explanation, and a real in-game example.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <h3 className="text-text-primary text-sm font-semibold mb-1">{title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">
              Who Is TFT School For?
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              TFT School is designed for <strong className="text-text-primary">players of all experience levels</strong>, but we especially focus on making the game accessible to beginners. If you've ever watched a friend play TFT and felt lost, or if you've played a few games and still don't understand why you keep losing, this site is for you.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              We write every explanation as if the reader is encountering TFT for the first time. Champion abilities are described in plain language first, then given technical detail for players who want to go deeper. Glossary terms always include real in-game examples. Nothing is assumed.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              That said, experienced players will also find value here. The item simulator and combinator tools save time during game preparation, and the quiz mode is a great way to test whether you actually know the champion roster as well as you think you do.
            </p>
          </section>

          {/* About the set */}
          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">
              About TFT Set 17: Space Gods
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              All content on TFT School is current for <strong className="text-text-primary">Set 17: Space Gods</strong>. This set brings 60 champions from across the League of Legends universe grouped into cosmic-themed traits like Dark Star, Space Groove, Stargazer, Meeple, N.O.V.A., and more — plus class traits like Bastion, Challenger, Rogue, Sniper, and Vanguard.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Set 17 introduces the <strong className="text-text-primary">Realm of the Gods</strong> mechanic — each game you choose between 9 powerful god patrons (Ahri, Aurelion Sol, Ekko, Evelynn, Kayle, Soraka, Thresh, Varus, and Yasuo) who grant unique blessings and loot throughout the match. Choosing the same god twice makes them your Favoured God. Other highlights include transforming Mecha units, the Groove system, Meeplords, and unique 5-cost legends like Zed, Bard, and Fiora.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              We aim to keep all data accurate to the latest patch. If you spot an error or outdated information, please reach out.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">
              Contact &amp; Feedback
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              TFT School is an independent fan project and is not affiliated with, endorsed, or sponsored by Riot Games. All champion names, images, and game content are the intellectual property of Riot Games.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              For feedback, bug reports, or questions, please reach out at{" "}
              <a
                href="mailto:hello@tftschool.com"
                className="text-accent-gold hover:text-accent-gold-light underline transition-colors"
              >
                hello@tftschool.com
              </a>
              . We read every message and genuinely appreciate hearing from players.
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center pb-4">
            <Link
              href="/flashcards"
              className="inline-flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-glow hover:-translate-y-0.5"
            >
              🃏 Start with Flashcards
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            >
              📖 Read the Beginner's Guide
            </Link>
          </div>

        </article>
      </PageShell>
    </>
  );
}
