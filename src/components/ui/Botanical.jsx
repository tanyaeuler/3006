// Decorative botanical line art, echoing the sprigs used across the live site.
// Purely ornamental, so it is hidden from assistive tech.

export default function Botanical({ className = '', variant = 'sprig', stroke }) {
  const common = {
    'aria-hidden': 'true',
    focusable: 'false',
    className: `pointer-events-none select-none ${className}`,
    fill: 'none',
    stroke: stroke ?? 'currentColor',
    strokeWidth: 1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  if (variant === 'branch') {
    return (
      <svg viewBox="0 0 220 120" {...common}>
        <path d="M4 108C48 106 92 92 128 68c22-15 40-34 52-52" />
        {[
          [30, 104, -28],
          [58, 98, -32],
          [86, 88, -38],
          [112, 74, -44],
          [136, 56, -50],
          [158, 34, -56],
        ].map(([x, y, angle], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
            <ellipse cx="0" cy="-11" rx="5.5" ry="11.5" />
            <ellipse cx="0" cy="11" rx="5.5" ry="11.5" transform="rotate(180)" />
          </g>
        ))}
      </svg>
    )
  }

  if (variant === 'wreath') {
    return (
      <svg viewBox="0 0 160 160" {...common}>
        <circle cx="80" cy="80" r="62" strokeDasharray="2 7" />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * 360
          return (
            <g key={i} transform={`rotate(${angle} 80 80) translate(80 18)`}>
              <ellipse cx="0" cy="0" rx="4.5" ry="10" />
            </g>
          )
        })}
      </svg>
    )
  }

  // Default: a single upward sprig.
  return (
    <svg viewBox="0 0 90 150" {...common}>
      <path d="M45 148C45 106 43 66 38 8" />
      {[
        [42, 124],
        [41, 104],
        [40, 84],
        [39, 64],
        [38, 44],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y}c-15 -3 -24 -12 -26 -24 14 1 23 9 26 24Z`} />
          <path d={`M${x} ${y - 8}c15 -3 24 -12 26 -24 -14 1 -23 9 -26 24Z`} />
        </g>
      ))}
    </svg>
  )
}
