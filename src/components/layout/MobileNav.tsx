import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_ITEMS } from "./Sidebar";

/** Fixed bottom navigation bar — mobile only (hidden on md+) */
export default function MobileNav() {
  const { pathname } = useRouter();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-surface border-t border-white/10 flex">
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-center transition-colors ${
              active
                ? "text-accent-purple-light"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <span className="text-xl leading-none">{icon}</span>
            <span className="text-[10px] font-medium leading-none">{label}</span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-accent-purple rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
