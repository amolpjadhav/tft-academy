import Link from "next/link";
import { useRouter } from "next/router";

export const NAV_ITEMS = [
  { href: "/items",      label: "Items",      icon: "⚔️" },
  { href: "/combinator", label: "Combinator", icon: "🔨" },
  { href: "/simulator",  label: "Simulator",  icon: "🎮" },
  { href: "/traits",     label: "Traits",     icon: "🌟" },
  { href: "/glossary",   label: "Glossary",   icon: "📖" },
  { href: "/quiz",       label: "Quiz",       icon: "🧠" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
];

/** Desktop-only fixed left sidebar (hidden on mobile) */
export default function Sidebar() {
  const { pathname } = useRouter();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-56 bg-bg-surface border-r border-white/5 flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5">
        <span className="font-heading text-accent-gold text-lg leading-tight tracking-wide">
          TFT School
        </span>
        <p className="text-text-muted text-xs mt-0.5">Set 16 · Lore &amp; Legends</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-accent-purple/20 text-accent-purple-light shadow-glow"
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/5">
        <p className="text-text-muted text-xs">Set 16 · Patch 16.7b</p>
      </div>
    </aside>
  );
}
