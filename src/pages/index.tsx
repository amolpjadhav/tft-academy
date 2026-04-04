import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import TFTLogo from "@/components/brand/TFTLogo";

// ── Hex background data (static so it never re-randomises) ───────────────────
const BG_HEXES = [
  { size: 64,  top: "6%",  left: "4%",  dur: 22, delay: 0,  gold: true  },
  { size: 40,  top: "14%", left: "82%", dur: 18, delay: 3,  gold: false },
  { size: 88,  top: "58%", left: "90%", dur: 30, delay: 7,  gold: true  },
  { size: 32,  top: "72%", left: "8%",  dur: 25, delay: 2,  gold: false },
  { size: 52,  top: "42%", left: "94%", dur: 20, delay: 10, gold: true  },
  { size: 36,  top: "86%", left: "54%", dur: 28, delay: 5,  gold: false },
  { size: 58,  top: "24%", left: "48%", dur: 35, delay: 15, gold: true  },
  { size: 26,  top: "52%", left: "1%",  dur: 22, delay: 8,  gold: false },
  { size: 48,  top: "91%", left: "24%", dur: 26, delay: 12, gold: true  },
  { size: 70,  top: "4%",  left: "64%", dur: 32, delay: 1,  gold: false },
  { size: 44,  top: "33%", left: "20%", dur: 24, delay: 6,  gold: true  },
  { size: 30,  top: "78%", left: "72%", dur: 20, delay: 9,  gold: false },
];

// ── Feature cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    href: "/flashcards",
    icon: "🃏",
    title: "Flashcards",
    description: "Flip through all champions and traits. Learn abilities, breakpoints, roles, and key stats interactively.",
    border: "border-violet-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(124,58,237,0.25)]",
    accent: "text-violet-400",
    tag: "New",
    tagColor: "bg-violet-500/20 text-violet-300",
  },
  {
    href: "/quiz",
    icon: "🧠",
    title: "Quiz Mode",
    description: "Test your TFT knowledge on champions, items, traits, and core mechanics.",
    border: "border-blue-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]",
    accent: "text-blue-400",
    tag: null,
    tagColor: "",
  },
  {
    href: "/items",
    icon: "⚔️",
    title: "Item Catalog",
    description: "Every item with stats, tier ratings, and role-specific build recommendations.",
    border: "border-amber-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]",
    accent: "text-amber-400",
    tag: null,
    tagColor: "",
  },
  {
    href: "/traits",
    icon: "🌟",
    title: "Traits Explorer",
    description: "Understand every trait, its breakpoints, and which champions power it.",
    border: "border-emerald-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]",
    accent: "text-emerald-400",
    tag: null,
    tagColor: "",
  },
  {
    href: "/combinator",
    icon: "🔨",
    title: "Item Combinator",
    description: "Combine basic components and instantly see every item recipe they create.",
    border: "border-orange-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(249,115,22,0.2)]",
    accent: "text-orange-400",
    tag: null,
    tagColor: "",
  },
  {
    href: "/team-builder",
    icon: "🏗️",
    title: "Team Builder",
    description: "Drag champions onto a hex board and watch trait synergies activate in real time.",
    border: "border-cyan-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(6,182,212,0.2)]",
    accent: "text-cyan-400",
    tag: "New",
    tagColor: "bg-cyan-500/20 text-cyan-300",
  },
  {
    href: "/glossary",
    icon: "📖",
    title: "TFT Glossary",
    description: "Every TFT term explained clearly — from economy basics to advanced mechanics.",
    border: "border-pink-500/30",
    glow: "group-hover:shadow-[0_0_24px_rgba(236,72,153,0.2)]",
    accent: "text-pink-400",
    tag: null,
    tagColor: "",
  },
];

const CYCLING_WORDS = ["Champions", "Items", "Traits", "Strategies", "Mechanics"];

// ── Inline SVG hexagon helper ─────────────────────────────────────────────────
function hexPoints(cx: number, cy: number, r: number, rotate = 30) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 + rotate) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

// ── Floating background hex ───────────────────────────────────────────────────
function FloatingHex({
  size, top, left, dur, delay, gold,
}: {
  size: number; top: string; left: string; dur: number; delay: number; gold: boolean;
}) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 1;
  const stroke = gold ? "rgba(245,158,11,0.5)" : "rgba(124,58,237,0.5)";
  const fill   = gold ? "rgba(245,158,11,0.04)" : "rgba(124,58,237,0.04)";
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="animate-hex-float absolute pointer-events-none"
      style={{
        top,
        left,
        animationDuration: `${dur}s`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <polygon points={hexPoints(cx, cy, r)} fill={fill} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [wordIdx, setWordIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setWordIdx((v) => (v + 1) % CYCLING_WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Head>
        <title>TFT School — Master Teamfight Tactics</title>
        <meta
          name="description"
          content="The ultimate learning companion for TFT Set 17. Flashcards, quizzes, item catalog, champion simulator, and more."
        />
      </Head>

      <div className="relative min-h-screen bg-bg-base text-text-primary overflow-hidden flex flex-col">

        {/* ── Floating hex background ─────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          {BG_HEXES.map((h, i) => (
            <FloatingHex key={i} {...h} />
          ))}
          {/* Radial glow spots */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-gold/4 blur-3xl" />
        </div>

        {/* ── Top bar ────────────────────────────────────────────────── */}
        <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
          <div className="flex items-center gap-3">
            <TFTLogo size={36} hero />
            <div>
              <span className="font-heading text-accent-gold text-base tracking-widest leading-none">
                TFT SCHOOL
              </span>
              <p className="text-text-muted text-[10px] tracking-wider">SET 17 · SPACE GODS</p>
            </div>
          </div>
          <Link
            href="/flashcards"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-text-secondary border border-white/10 rounded-lg px-4 py-2 hover:bg-white/5 hover:text-text-primary transition-colors"
          >
            Enter App →
          </Link>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-12 md:py-16">

          {/* Logo lockup */}
          <div
            className="flex flex-col items-center gap-4 mb-8"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease" }}
          >
            <TFTLogo size={96} hero />

            <div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-accent-gold to-amber-600 leading-none">
                TFT SCHOOL
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-px w-12 bg-accent-gold/30" />
                <span className="text-text-muted text-xs tracking-[0.25em] font-medium uppercase">
                  Set 17 · Space Gods
                </span>
                <div className="h-px w-12 bg-accent-gold/30" />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div
            className="mb-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed">
              Master every{" "}
              <span
                key={wordIdx}
                className="animate-word-in inline-block text-accent-gold font-semibold font-heading"
              >
                {CYCLING_WORDS[wordIdx]}
              </span>
            </p>
            <p className="text-text-muted text-sm md:text-base mt-2 max-w-md mx-auto">
              The ultimate learning companion for Teamfight Tactics — from your very first game to ranked glory.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center gap-3 mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            }}
          >
            <Link
              href="/flashcards"
              className="inline-flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/80 text-white font-semibold px-6 py-3 rounded-xl shadow-glow transition-all hover:shadow-[0_0_32px_rgba(124,58,237,0.5)] hover:-translate-y-0.5"
            >
              🃏 Start with Flashcards
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-bg-surface hover:bg-bg-elevated border border-white/10 text-text-primary font-medium px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
            >
              🧠 Take a Quiz
            </Link>
          </div>

          {/* Stat pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease 0.6s",
            }}
          >
            {[
              { label: "Champions", value: "100" },
              { label: "Learning Modules", value: "7" },
              { label: "Current Set", value: "16" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-bg-surface/80 border border-white/8 rounded-full px-4 py-1.5"
              >
                <span className="font-heading text-accent-gold text-sm font-semibold">{value}</span>
                <span className="text-text-muted text-xs">{label}</span>
              </div>
            ))}
          </div>

          {/* ── Feature grid ───────────────────────────────────────────── */}
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, fi) => (
              <Link
                key={f.href}
                href={f.href}
                className={`animate-card-in card-hover group relative flex flex-col gap-2 bg-bg-surface/80 border ${f.border} rounded-2xl p-5 text-left hover:bg-bg-elevated transition-all duration-300 hover:-translate-y-1 ${f.glow} overflow-hidden`}
                style={{ animationDelay: `${fi * 80}ms` }}
              >
                {/* Scan shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/4 to-transparent"
                    style={{ animation: "scan-line 1.2s ease-in-out" }}
                  />
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-2xl leading-none">{f.icon}</span>
                  {f.tag && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  )}
                </div>

                <h3 className={`font-heading text-sm font-semibold tracking-wide ${f.accent}`}>
                  {f.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">{f.description}</p>

                <div className={`flex items-center gap-1 text-xs font-medium mt-auto pt-1 ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Open <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <footer className="relative z-10 text-center py-8 border-t border-white/5 space-y-3 px-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/about" className="text-text-muted text-xs hover:text-text-secondary transition-colors">About</Link>
            <span className="text-white/15 text-xs">·</span>
            <Link href="/guide" className="text-text-muted text-xs hover:text-text-secondary transition-colors">Beginner's Guide</Link>
            <span className="text-white/15 text-xs">·</span>
            <Link href="/privacy" className="text-text-muted text-xs hover:text-text-secondary transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-text-muted text-xs tracking-wider">
            TFT SCHOOL &nbsp;·&nbsp; Set 17 · Patch 17.1
          </p>
          <p className="text-white/25 text-[10px] leading-relaxed max-w-xl mx-auto">
            © 2026 TFT SCHOOL. TFT School isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </p>
        </footer>
      </div>
    </>
  );
}
