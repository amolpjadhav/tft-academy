import Sidebar from "./Sidebar";

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Sidebar />
      <main className="ml-56 min-h-screen">
        <header className="px-8 pt-8 pb-6 border-b border-white/5">
          <h1 className="font-heading text-2xl text-text-primary tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-secondary text-sm mt-1">{subtitle}</p>
          )}
        </header>
        <div className="px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
