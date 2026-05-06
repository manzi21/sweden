// components/shared/SverigeLogo.tsx
// Server-safe logo — pure SVG, no React hooks

export function SverigeLogo({ size = 36, showText = true }: { size?: number; showText?: boolean }) {
  const h = size;
  const w = showText ? size * 5.2 : size;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${showText ? 208 : 40} 40`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sverige TV"
    >
      <defs>
        <linearGradient id="lgCrown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#9A7830" />
        </linearGradient>
        <linearGradient id="lgShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a1830" />
          <stop offset="100%" stopColor="#5c0e1c" />
        </linearGradient>
        <filter id="lgGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z"
        fill="url(#lgShield)"
        stroke="#7c1326"
        strokeWidth="0.8"
      />
      <path
        d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z"
        fill="none"
        stroke="url(#lgCrown)"
        strokeWidth="1.2"
        filter="url(#lgGlow)"
      />
      <g filter="url(#lgGlow)">
        <path
          d="M 8 28 L 8 20 L 12 20 L 12 14 L 16 20 L 20 10 L 24 20 L 28 14 L 28 20 L 32 20 L 32 28 Z"
          fill="url(#lgCrown)"
        />
        <circle cx="20" cy="9" r="2.2" fill="#E8C97A" />
        <circle cx="12" cy="13.5" r="1.6" fill="#C9A84C" />
        <circle cx="28" cy="13.5" r="1.6" fill="#C9A84C" />
        <ellipse cx="16" cy="23" rx="3" ry="1.2" fill="rgba(255,220,120,0.18)" />
      </g>
      {showText && (
        <>
          <text
            x="50"
            y="19"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
            fontWeight="800"
            fontSize="13"
            letterSpacing="2.5"
            fill="#f5f0f5"
          >
            SVERIGE
          </text>
          <line
            x1="50"
            y1="23"
            x2="205"
            y2="23"
            stroke="url(#lgCrown)"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <text
            x="50"
            y="35"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
            fontWeight="900"
            fontSize="11"
            letterSpacing="6"
            fill="url(#lgCrown)"
          >
            TV
          </text>
        </>
      )}
    </svg>
  );
}
