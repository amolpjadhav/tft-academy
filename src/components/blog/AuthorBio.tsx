interface AuthorBioProps {
  compact?: boolean;
}

const AUTHOR = {
  name: "Amol J.",
  role: "TFT Strategist & Site Editor",
  bio: "Diamond-ranked TFT player since Set 4. Amol has been playing and writing about Teamfight Tactics competitively since 2020. He built TFT School to give newer players the structured learning resource he wished existed when he started — one that explains the game clearly without assuming prior knowledge.",
  avatar: "AJ",
  social: {
    label: "TFT School Editor",
  },
};

export default function AuthorBio({ compact = false }: AuthorBioProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-accent-purple/30 border border-accent-purple/40 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-accent-purple-light">{AUTHOR.avatar}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-text-primary">{AUTHOR.name}</span>
          <span className="text-[10px] text-text-muted ml-1.5">{AUTHOR.role}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-white/8 rounded-2xl p-5 mt-8">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
        About the Author
      </p>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-accent-purple-light">{AUTHOR.avatar}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-text-primary font-semibold text-sm">{AUTHOR.name}</p>
          <p className="text-accent-gold text-[11px] mb-2">{AUTHOR.role}</p>
          <p className="text-text-muted text-xs leading-relaxed">{AUTHOR.bio}</p>
        </div>
      </div>
    </div>
  );
}
