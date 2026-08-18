import { useEffect, useRef, useState } from 'react'

/**
 * Hand-drawn squiggly arrow that travels right and curves up — designed to sit
 * at the bottom of a left-hand text column and point into the column of cards
 * on the right.
 *
 * The squiggle draws itself in when it scrolls into view, then keeps a gentle
 * drift going. Honours prefers-reduced-motion by rendering the finished arrow
 * with no motion at all.
 */
export default function SquigglyArrow({
  color = 'currentColor',
  width = 220,
  strokeWidth = 5,
  duration = 1.6,
  delay = 0.15,
  drift = true,
  flip = false,
  title = 'Arrow pointing to the list on the right',
  className = '',
  style = {},
  ...props
}) {
  const ref = useRef(null)
  // Without IntersectionObserver there is nothing to trigger the draw, so the
  // arrow starts out already drawn rather than never appearing.
  const [drawn, setDrawn] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const vars = {
    '--sa-duration': `${duration}s`,
    '--sa-delay': `${delay}s`,
    '--sa-head-delay': `${delay + duration * 0.82}s`,
    // The flip lives on the wrapper, not the svg: the drift keyframes animate the
    // svg's transform and a CSS animation overrides an inline transform.
    ...(flip ? { transform: 'scaleX(-1)' } : null),
    ...style,
  }

  return (
    <span
      ref={ref}
      className={`sa-root${drawn ? ' sa-drawn' : ''}${drift ? ' sa-drift' : ''} ${className}`}
      style={vars}
    >
      <style>{CSS_RULES}</style>
      <svg
        viewBox="0 0 220 120"
        width={width}
        height={(width * 120) / 220}
        role="img"
        aria-label={title}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path className="sa-tail" pathLength="100" d={TAIL} />
        <path className="sa-head" pathLength="100" d={HEAD} />
      </svg>
    </span>
  )
}

const TAIL =
  'M 6 97 C 26 74, 47 117, 68 93 S 106 68, 126 92 C 146 110, 158 86, 168 63 C 178 43, 187 31, 197 21'
const HEAD = 'M 177 28 L 197 21 L 191 41'

const CSS_RULES = `
.sa-root { display: inline-block; line-height: 0; }
.sa-root svg { overflow: visible; }
.sa-tail, .sa-head {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
.sa-drawn .sa-tail {
  animation: sa-draw var(--sa-duration) cubic-bezier(.65,.05,.36,1) var(--sa-delay) forwards;
}
.sa-drawn .sa-head {
  animation: sa-draw calc(var(--sa-duration) * 0.28) ease-out var(--sa-head-delay) forwards;
}
.sa-drift.sa-drawn svg {
  animation: sa-drift 3.2s ease-in-out calc(var(--sa-head-delay) + 0.4s) infinite;
}
@keyframes sa-draw { to { stroke-dashoffset: 0; } }
@keyframes sa-drift {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(6px, -6px); }
}
@media (prefers-reduced-motion: reduce) {
  .sa-tail, .sa-head { stroke-dashoffset: 0; animation: none !important; }
  .sa-drift.sa-drawn svg { animation: none !important; }
}
`
