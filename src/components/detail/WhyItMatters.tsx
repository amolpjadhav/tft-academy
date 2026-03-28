interface WhyItMattersProps {
  explanation: string;
  bestOn: string[];
}

export default function WhyItMatters({ explanation, bestOn }: WhyItMattersProps) {
  return (
    <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-xl p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-accent-purple-light mb-2">
        Why It Matters
      </h3>
      <p className="text-text-primary text-sm leading-relaxed mb-3">{explanation}</p>
      <div>
        <p className="text-xs text-text-muted uppercase tracking-wider mb-1.5">Best on</p>
        <div className="flex flex-wrap gap-1.5">
          {bestOn.map((role) => (
            <span
              key={role}
              className="text-xs bg-accent-purple/20 text-accent-purple-light border border-accent-purple/30 px-2.5 py-0.5 rounded-full"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
