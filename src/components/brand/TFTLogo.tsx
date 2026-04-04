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
  /** Hero mode — richer animations for landing page */
  hero?: boolean;
}

export default function TFTLogo({ size = 80, glow = true, hero = false }: TFTLogoProps) {
  const cx = size / 2, cy = size / 2;
  const r1 = size / 2 - 2;
  const r2 = size / 2 - 10;
  const gemR = size * 0.06;

  // Orbit particle positions (6 dots equally spaced on a ring)
  const orbitR = r1 + size * 0.06;
  const orbitDots = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180;
    return { x: cx + orbitR * Math.cos(a), y: cy + orbitR * Math.sin(a) };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size * (hero ? 1.18 : 1)} ${size * (hero ? 1.18 : 1)}`}
      style={hero ? { overflow: "visible" } : undefined}
      className={glow && !hero ? "animate-glow-pulse" : undefined}
      aria-hidden
    >
      {hero && (
        <defs>
          <filter id="tft-sword-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={size * 0.04} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tft-gem-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={size * 0.07} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* Orbit particles — hero only, large sizes only */}
      {hero && size >= 64 && orbitDots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={size * 0.022} fill="#f59e0b" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="3s"
            begin={`${i * 0.5}s`}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Outer hex — gold, spins clockwise in hero mode */}
      <g>
        <polygon
          points={hexPoints(cx, cy, r1)}
          fill="rgba(124,58,237,0.18)"
          stroke="rgba(245,158,11,0.85)"
          strokeWidth="1.8"
        />
        {hero && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur="20s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* Inner hex — purple dashed, counter-spins in hero mode */}
      <g>
        <polygon
          points={hexPoints(cx, cy, r2, 0)}
          fill="none"
          stroke="rgba(167,139,250,0.45)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        {hero && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`-360 ${cx} ${cy}`}
            dur="14s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* Crossed swords */}
      <g
        transform={`translate(${cx},${cy})`}
        filter={hero ? "url(#tft-sword-glow)" : undefined}
      >
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

        {/* Centre gem — pulses in hero mode */}
        <circle
          cx="0" cy="0"
          r={gemR}
          fill="#f59e0b"
          opacity="0.9"
          filter={hero ? "url(#tft-gem-glow)" : undefined}
        >
          {hero && (
            <>
              <animate
                attributeName="r"
                values={`${gemR};${gemR * 1.55};${gemR};${gemR * 1.35};${gemR}`}
                dur="2.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;1;0.7;1;0.9"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

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
