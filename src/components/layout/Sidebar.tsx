import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import TFTLogo from "@/components/brand/TFTLogo";

export const NAV_ITEMS = [
  { href: "/items",            label: "Items",            icon: "⚔️" },
  { href: "/combinator",       label: "Combinator",       icon: "🔨" },
  { href: "/team-builder",     label: "Team Builder",     icon: "🏗️" },
  { href: "/traits",           label: "Traits",           icon: "🌟" },
  { href: "/glossary",         label: "Glossary",         icon: "📖" },
  { href: "/quiz",             label: "Quiz",             icon: "🧠" },
  { href: "/flashcards",       label: "Flashcards",       icon: "🃏" },
];

// Drifting star particle — pure CSS, no deps
function StarParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-white animate-star pointer-events-none"
      style={style}
    />
  );
}

const STARS = [
  { width: 2, height: 2, left: "12%",  top: "80%", animationDuration: "7s",  animationDelay: "0s"   },
  { width: 1, height: 1, left: "55%",  top: "70%", animationDuration: "9s",  animationDelay: "1.5s" },
  { width: 2, height: 2, left: "80%",  top: "85%", animationDuration: "6s",  animationDelay: "3s"   },
  { width: 1, height: 1, left: "30%",  top: "90%", animationDuration: "11s", animationDelay: "0.8s" },
  { width: 2, height: 2, left: "68%",  top: "75%", animationDuration: "8s",  animationDelay: "4s"   },
  { width: 1, height: 1, left: "44%",  top: "88%", animationDuration: "10s", animationDelay: "2.2s" },
  { width: 2, height: 2, left: "20%",  top: "60%", animationDuration: "13s", animationDelay: "1s"   },
  { width: 1, height: 1, left: "88%",  top: "65%", animationDuration: "7.5s",animationDelay: "5s"   },
];

export default function Sidebar() {
  const { pathname } = useRouter();
  const prevPath = useRef(pathname);

  // Re-trigger nav animation on route change
  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-56 flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f0f1a 0%, #13112a 60%, #0d0d1f 100%)",
        borderRight: "1px solid rgba(139, 92, 246, 0.12)",
      }}
    >
      {/* Drifting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map((s, i) => (
          <StarParticle key={i} style={s} />
        ))}
        {/* Radial glow behind active items area */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "30%",
            height: "40%",
            background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="relative flex items-center gap-3 px-5 py-4 group shrink-0"
        style={{ borderBottom: "1px solid rgba(139, 92, 246, 0.1)" }}
      >
        {/* Logo glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <TFTLogo size={36} glow={false} />
        </div>
        <div className="relative">
          <span className="animate-logo-shimmer font-heading text-base leading-tight tracking-wide block">
            TFT School
          </span>
          <p className="text-[10px] mt-0.5 text-white/30">Set 17 · Space Gods</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="relative flex-1 px-3 py-4 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map(({ href, label, icon }, i) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="animate-nav-item group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                animationDelay: `${i * 55}ms`,
                color: active ? "#c4b5fd" : "rgba(255,255,255,0.55)",
                background: active
                  ? "linear-gradient(90deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 100%)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                }
              }}
            >
              {/* Active left bar */}
              {active && (
                <span
                  className="animate-indicator absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full"
                  style={{
                    height: "60%",
                    background: "linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)",
                    boxShadow: "0 0 8px rgba(167,139,250,0.8)",
                  }}
                />
              )}

              {/* Active glow backdrop */}
              {active && (
                <span className="animate-nav-glow absolute inset-0 rounded-xl pointer-events-none" />
              )}

              {/* Icon */}
              <span className="nav-icon relative z-10 text-base transition-transform duration-200 inline-block">
                {icon}
              </span>

              {/* Label */}
              <span className="relative z-10">{label}</span>

              {/* Hover shimmer sweep */}
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden transition-opacity duration-300"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
                }}
              />
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="relative px-5 py-4 space-y-2"
        style={{ borderTop: "1px solid rgba(139, 92, 246, 0.1)" }}
      >
        <div className="flex gap-3 flex-wrap">
          <Link href="/about"   className="text-white/25 text-[10px] hover:text-white/60 transition-colors">About</Link>
          <Link href="/guide"   className="text-white/25 text-[10px] hover:text-white/60 transition-colors">Guide</Link>
          <Link href="/privacy" className="text-white/25 text-[10px] hover:text-white/60 transition-colors">Privacy</Link>
        </div>
        <p className="text-white/20 text-xs">Set 17 · Patch 17.1</p>
      </div>
    </aside>
  );
}
