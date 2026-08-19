import { useEffect, useRef, useState } from 'react'
import { DASHES, DURATION } from './bounceDashes.js'

const BALL_PATH =
  'M -1785 170 Q -1603 -96, -1420 168 Q -837 -592, -253 168 Q -155 16, 0 0'

/**
 * A ball bouncing along an arc, leaving a dashed trail behind it. Each dash appears
 * only once the ball has passed over it, so the trail is laid down rather than
 * uncovered — no mask is involved, which is what earlier versions got wrong.
 *
 * Runs when it scrolls into view. Honours prefers-reduced-motion by rendering the
 * finished graphic with no motion.
 *
 * The dash geometry and per-dash timings in bounceDashes.js are generated alongside
 * the ball's motion by snippets/tools/bounce-dashes.mjs. Retiming the ball here puts
 * the trail out of step; change that script and re-run it instead.
 */
export default function BouncingBall({
  color = '#4f4f4f',
  maxWidth = 900,
  duration = DURATION,
  hover = true,
  title = 'A ball bouncing along an arc, leaving a dashed trail behind it',
  className = '',
  style = {},
  ...props
}) {
  const ref = useRef(null)
  // With no IntersectionObserver there is nothing to start the run, so it begins
  // straight away rather than never playing.
  const [running, setRunning] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRunning(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`bx-root${running ? ' bx-running' : ''} ${className}`}
      style={{ '--bx-speed': `${duration}s`, maxWidth, ...style }}
    >
      <style>{CSS_RULES}</style>
      {/* The origin (0,0) is the ball's landing point, which is what lets the ball sit
          in the right place before any animation has been applied to it. */}
      <svg viewBox="-1811 -238 1837 435" role="img" aria-label={title} {...props}>
        <g fill="none" stroke={color} strokeWidth="7.5" strokeLinecap="round">
          {DASHES.map(({ d, at }, i) => (
            <path key={i} className="bx-dash" style={{ '--bx-at': at }} d={d} />
          ))}
        </g>

        {/* One transform per level: motion, then the resting hover, then the squash. */}
        <g className="bx-ball">
          <g className={hover ? 'bx-bob' : undefined}>
            <g className="bx-squash">
              <circle r="21" fill={color} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

const CSS_RULES = `
.bx-root { display: block; width: 100%; margin: 0 auto; line-height: 0; }
.bx-root svg { width: 100%; height: auto; overflow: visible; }

/* The animations are always applied and start out paused, so the held state before the
   run is the first keyframe — trail hidden, ball at the start — rather than the finished
   graphic, which would flash complete and then jump back.

   Each dash carries its own --bx-at: how far through the run the ball passes it, as a
   fraction, so the trail rescales with the duration. A 1ms duration makes a dash appear
   rather than fade, which is what a dropped trail does. */
.bx-dash { animation: bx-appear 1ms linear calc(var(--bx-at) * var(--bx-speed)) both; }
.bx-ball {
  offset-path: path("${BALL_PATH}");
  offset-rotate: 0deg;
  animation: bx-travel var(--bx-speed) both;
}
.bx-squash, .bx-bob { transform-box: fill-box; transform-origin: 50% 50%; }
.bx-squash { animation: bx-squash var(--bx-speed) both; }
.bx-bob { animation: bx-bob 3s ease-in-out calc(var(--bx-speed) + 0.3s) infinite; }
.bx-root:not(.bx-running) .bx-dash,
.bx-root:not(.bx-running) .bx-ball,
.bx-root:not(.bx-running) .bx-squash,
.bx-root:not(.bx-running) .bx-bob { animation-play-state: paused; }

@keyframes bx-appear {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes bx-travel {
  0%     { offset-distance: 0%;     animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  12.5%  { offset-distance: 10.53%; animation-timing-function: cubic-bezier(.65,0,.85,.45); }
  25%    { offset-distance: 21.05%; animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  51.04% { offset-distance: 53.45%; animation-timing-function: cubic-bezier(.65,0,.85,.45); }
  77.08% { offset-distance: 85.85%; animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  88.54% { offset-distance: 92.93%; animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  100%   { offset-distance: 100%; }
}
/* 25% and 77.08% of the run are the two bounces. */
@keyframes bx-squash {
  0%, 22.5%, 29%, 74.5%, 81%, 100% { transform: scale(1, 1); }
  25%, 77.08%                      { transform: scale(1.28, 0.74); }
}
@keyframes bx-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-7px); }
}
/* Whenever motion is unwanted, the finished graphic stands in for it. */
@media (prefers-reduced-motion: reduce) {
  .bx-dash, .bx-ball, .bx-squash, .bx-bob { animation: none !important; }
  .bx-dash { opacity: 1; }
  .bx-ball { offset-distance: 100%; }
}
`
