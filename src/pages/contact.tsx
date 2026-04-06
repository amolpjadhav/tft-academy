import Head from "next/head";
import PageShell from "@/components/layout/PageShell";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us — TFT School</title>
        <meta
          name="description"
          content="Get in touch with TFT School. Report errors, suggest features, give feedback, or ask questions about Teamfight Tactics."
        />
      </Head>
      <PageShell title="Contact Us" subtitle="We'd love to hear from you">
        <div className="max-w-xl mx-auto space-y-6">

          <div className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <p className="text-text-secondary text-sm leading-relaxed">
              TFT School is an independent fan project maintained by a small team of TFT enthusiasts. Whether you've found an error, have a feature request, or just want to say hi — we read every message.
            </p>
          </div>

          {/* Contact methods */}
          <div className="grid gap-4">
            {[
              {
                icon: "📧",
                title: "General Enquiries & Feedback",
                body: "Questions, suggestions, or anything else — reach us directly at",
                link: "clickfixdev8@gmail.com",
                href: "mailto:clickfixdev8@gmail.com",
              },
              {
                icon: "🐛",
                title: "Bug Reports & Data Errors",
                body: "Spotted a wrong stat, outdated ability, or broken feature? Email us and we'll fix it fast.",
                link: "clickfixdev8@gmail.com",
                href: "mailto:clickfixdev8@gmail.com",
              },
              {
                icon: "✍️",
                title: "Content Contributions",
                body: "Want to contribute a guide, tier list, or article? We welcome community writers.",
                link: "clickfixdev8@gmail.com",
                href: "mailto:clickfixdev8@gmail.com",
              },
            ].map(({ icon, title, body, link, href }) => (
              <div key={title} className="bg-bg-surface rounded-2xl border border-white/8 p-5 flex gap-4">
                <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <h3 className="text-text-primary font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed mb-2">{body}</p>
                  <a
                    href={href}
                    className="text-accent-gold text-sm font-medium hover:text-amber-300 underline transition-colors"
                  >
                    {link}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Response time */}
          <div className="bg-bg-surface rounded-2xl border border-white/8 p-5 flex gap-3 items-start">
            <span className="text-xl shrink-0">⏱️</span>
            <div>
              <h3 className="text-text-primary font-semibold text-sm mb-1">Response Time</h3>
              <p className="text-text-muted text-xs leading-relaxed">
                We typically respond within 24–48 hours. Data corrections are usually live within a day once verified. We're a small team, but we take accuracy seriously — TFT School is only useful if the information is correct.
              </p>
            </div>
          </div>

          {/* Riot disclaimer */}
          <p className="text-white/25 text-[11px] text-center leading-relaxed px-4 pb-2">
            TFT School is not affiliated with, endorsed by, or sponsored by Riot Games. All game content, champion names, and assets belong to Riot Games, Inc.
          </p>
        </div>
      </PageShell>
    </>
  );
}
