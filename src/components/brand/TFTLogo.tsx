/** Reusable TFT School hex logo — matches the landing page */

function hexPoints(cx: number, cy: number, r: number, rotate = 30) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 + rotate) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

interface TFTLogoProps {
  size?: number;
  /** Disable the glow-pulse animation (useful in compact headers) */
  glow?: boolean;
}

export default function TFTLogo({ size = 80, glow = true }: TFTLogoProps) {
  const cx = size / 2, cy = size / 2;
  const r1 = size / 2 - 2;
  const r2 = size / 2 - 10;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={glow ? "animate-glow-pulse" : undefined}
      aria-hidden
    >
      {/* Outer hex — gold */}
      <polygon
        points={hexPoints(cx, cy, r1)}
        fill="rgba(124,58,237,0.18)"
        stroke="rgba(245,158,11,0.85)"
        strokeWidth="1.8"
      />
      {/* Inner hex — purple dashed */}
      <polygon
        points={hexPoints(cx, cy, r2, 0)}
        fill="none"
        stroke="rgba(167,139,250,0.45)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      {/* Crossed swords */}
      <g transform={`translate(${cx},${cy})`}>
        <line
          x1={-size * 0.18} y1={size * 0.18}
          x2={size * 0.18}  y2={-size * 0.18}
          stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round"
        />
        <line
          x1={-size * 0.18} y1={-size * 0.18}
          x2={size * 0.18}  y2={size * 0.18}
          stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round"
        />
        {/* Centre gem */}
        <circle cx="0" cy="0" r={size * 0.06} fill="#f59e0b" opacity="0.9" />
        {/* Crossguards */}
        <line
          x1={-size * 0.10} y1={size * 0.10}
          x2={-size * 0.06} y2={size * 0.06}
          stroke="#a78bfa" strokeWidth="3.5" strokeLinecap="round"
        />
        <line
          x1={size * 0.06}  y1={-size * 0.06}
          x2={size * 0.10}  y2={-size * 0.10}
          stroke="#a78bfa" strokeWidth="3.5" strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
