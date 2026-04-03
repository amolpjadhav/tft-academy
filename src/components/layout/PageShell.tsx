import Link from "next/link";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import TFTLogo from "@/components/brand/TFTLogo";

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 bg-bg-surface border-b border-white/10 flex items-center gap-3 px-4 h-14">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <TFTLogo size={28} glow={false} />
          <span className="font-heading text-accent-gold text-sm tracking-wide">TFT School</span>
        </Link>
        <span className="text-white/20 text-lg">·</span>
        <span className="text-text-secondary text-sm truncate">{title}</span>
      </header>

      {/* Main content
          - Mobile:  top padding for fixed header + bottom padding for fixed nav
          - Desktop: left margin for sidebar, normal padding
      */}
      <main className="md:ml-56 min-h-screen pt-14 pb-20 md:pt-0 md:pb-0">
        {/* Page header (desktop only — mobile shows it in the top bar) */}
        <div className="hidden md:block px-6 lg:px-8 pt-8 pb-6 border-b border-white/5">
          <h1 className="font-heading text-2xl text-text-primary tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-secondary text-sm mt-1">{subtitle}</p>
          )}
        </div>

        {/* Mobile page subtitle */}
        {subtitle && (
          <div className="md:hidden px-4 pt-3 pb-1">
            <p className="text-text-muted text-xs">{subtitle}</p>
          </div>
        )}

        <div className="animate-page-in px-4 md:px-6 lg:px-8 py-4 md:py-6">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
