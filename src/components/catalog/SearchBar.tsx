interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute inset-y-0 left-3 flex items-center text-text-muted pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search items or stats…"
        className="w-full bg-bg-elevated border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-purple/60 focus:ring-1 focus:ring-accent-purple/40 transition"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary transition"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
