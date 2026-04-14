import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";

export default function DisclaimerPage() {
  return (
    <>
      <Head>
        <title>Disclaimer — TFT School</title>
        <meta
          name="description"
          content="TFT School disclaimer. This site is an independent fan project and is not affiliated with or endorsed by Riot Games. All game content belongs to Riot Games."
        />
      </Head>
      <PageShell title="Disclaimer" subtitle="Legal notice and content disclosure">
        <article className="max-w-2xl mx-auto space-y-6">

          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">Fan Site Disclaimer</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              TFT School (<strong className="text-text-primary">tftschool.com</strong>) is an independent fan-made educational website. It is <strong className="text-text-primary">not endorsed by, affiliated with, or sponsored by Riot Games, Inc.</strong> in any way.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Teamfight Tactics, League of Legends, and all related champion names, images, icons, and game mechanics are the intellectual property of <strong className="text-text-primary">Riot Games, Inc.</strong> All game content, imagery, and data referenced on this site belongs to Riot Games and is used for educational, commentary, and informational purposes under fair use principles.
            </p>
          </section>

          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">Accuracy of Information</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              TFT School strives to keep all game data, champion statistics, item information, and strategy content accurate and up to date with the current TFT patch. However, Teamfight Tactics is a live game that receives frequent balance updates. Information may become outdated between patches.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Always verify critical game information against the official Riot Games patch notes. TFT School is not responsible for decisions made in-game based on information found on this site.
            </p>
          </section>

          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">Advertising Disclosure</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              TFT School displays advertisements through <strong className="text-text-primary">Google AdSense</strong> to help support the cost of maintaining this free resource. These are clearly identifiable as ads and are served automatically by Google based on site content and visitor interest.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              TFT School does not accept sponsored posts, paid reviews, or affiliate partnerships. All editorial content — guides, strategies, tier lists, and tool data — is independent and not influenced by advertisers.
            </p>
          </section>

          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">External Links</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              TFT School may link to third-party websites including Riot Games official pages, the TFT wiki, and other community resources. We are not responsible for the content, privacy practices, or accuracy of any external websites. Links are provided as references and do not constitute endorsement.
            </p>
          </section>

          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">User-Generated Content</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              TFT School does not currently accept user-generated content or comments. All editorial content is written by the TFT School team. If you have a correction or suggestion, please contact us at{" "}
              <a href="mailto:clickfixdev8@gmail.com" className="text-accent-gold underline hover:text-accent-gold-light">
                clickfixdev8@gmail.com
              </a>.
            </p>
          </section>

          <section className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <h2 className="font-heading text-xl text-accent-gold tracking-wide mb-3">No Professional Advice</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              All content on TFT School is intended for entertainment and educational purposes only. Game strategy recommendations are opinions based on the author&apos;s experience and analysis of the current meta. Results in-game will vary based on individual skill, lobby conditions, and game variance. TFT School makes no guarantees of rank improvement or placement outcomes.
            </p>
          </section>

          <div className="flex flex-wrap gap-3 justify-center pb-4">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-bg-elevated border border-white/10 text-text-primary font-medium px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            >
              About TFT School
            </Link>
          </div>

        </article>
      </PageShell>
    </>
  );
}
