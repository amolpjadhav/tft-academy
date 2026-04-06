import Head from "next/head";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";

export interface GuidePost {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  set: string;
  featured?: boolean;
}

export const ALL_GUIDES: GuidePost[] = [
  {
    slug: "lifting-competition-augment-guide",
    title: "Lifting Competition Augment: Full Strategy Guide",
    description: "Master the Lifting Competition quest augment — how to hit every HP threshold, when to pivot, and whether chasing the Impossible Lift is actually worth it.",
    category: "Augments",
    categoryColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    date: "April 5, 2026",
    readTime: "6 min read",
    set: "Set 16",
    featured: true,
  },
];

export default function GuidesIndex() {
  const featured = ALL_GUIDES.filter((g) => g.featured);
  const rest = ALL_GUIDES.filter((g) => !g.featured);

  return (
    <>
      <Head>
        <title>TFT Blog & Strategy Articles — TFT School</title>
        <meta
          name="description"
          content="In-depth TFT strategy articles, augment breakdowns, economy tips, and comp guides. Learn how to climb in Teamfight Tactics with TFT School."
        />
      </Head>
      <PageShell
        title="Blog & Strategy"
        subtitle="Deep dives into augments, economy, comps, and mechanics"
      >
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Featured */}
          {featured.length > 0 && (
            <section>
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3">
                Featured
              </p>
              <div className="flex flex-col gap-4">
                {featured.map((g) => (
                  <GuideCard key={g.slug} guide={g} large />
                ))}
              </div>
            </section>
          )}

          {/* All guides */}
          {rest.length > 0 && (
            <section>
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-widest mb-3">
                All Guides
              </p>
              <div className="flex flex-col gap-3">
                {rest.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state / coming soon */}
          {ALL_GUIDES.length < 5 && (
            <div className="bg-bg-surface rounded-2xl border border-white/8 p-6 text-center">
              <p className="text-text-muted text-sm mb-1">More articles coming soon</p>
              <p className="text-text-muted/50 text-xs">
                Economy guide, itemization deep-dive, positioning fundamentals, and more — in progress.
              </p>
            </div>
          )}
        </div>
      </PageShell>
    </>
  );
}

function GuideCard({ guide, large }: { guide: GuidePost; large?: boolean }) {
  return (
    <Link
      href={`/blog/${guide.slug}`}
      className={`group block bg-bg-surface rounded-2xl border border-white/8 hover:border-accent-gold/30 hover:bg-bg-elevated transition-all duration-200 hover:-translate-y-0.5 ${large ? "p-6" : "p-4"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${guide.categoryColor}`}>
              {guide.category}
            </span>
            <span className="text-[10px] text-text-muted/50 border border-white/8 px-2 py-0.5 rounded-full">
              {guide.set}
            </span>
          </div>
          <h2 className={`font-heading font-semibold text-text-primary group-hover:text-accent-gold transition-colors leading-snug ${large ? "text-lg mb-2" : "text-sm mb-1.5"}`}>
            {guide.title}
          </h2>
          <p className={`text-text-muted leading-relaxed ${large ? "text-sm" : "text-xs"}`}>
            {guide.description}
          </p>
        </div>
        <span className="text-accent-gold/0 group-hover:text-accent-gold/70 transition-colors text-lg shrink-0 mt-1">→</span>
      </div>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
        <span className="text-[10px] text-text-muted/50">{guide.date}</span>
        <span className="text-white/15 text-[10px]">·</span>
        <span className="text-[10px] text-text-muted/50">{guide.readTime}</span>
      </div>
    </Link>
  );
}
