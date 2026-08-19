import { useEffect, useRef, useState } from 'react'

const PATH = 'M -1785 170 Q -1603 -96, -1420 168 Q -837 -592, -253 168 Q -155 16, 0 0'
const PATH_LENGTH = 2226

/**
 * A ball bouncing along a dashed arc, rising to the right. The dashes are uncovered
 * as the ball passes over them, and the ball settles mid-flight at the top right.
 *
 * Runs when it scrolls into view. Honours prefers-reduced-motion by rendering the
 * finished graphic with no motion.
 *
 * The svg's origin (0,0) is the ball's landing point, which is what lets the ball
 * sit in the right place before any animation has been applied to it.
 */
export default function BouncingBall({
  color = '#4f4f4f',
  maxWidth = 900,
  duration = 2.4,
  hover = true,
  title = 'A ball bouncing along a dashed arc, rising to the right',
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
      <svg viewBox="-1811 -238 1837 435" role="img" aria-label={title} {...props}>
        <defs>
          <path id="bx-path" d={PATH} fill="none" />
          <mask id="bx-reveal">
            <use
              className="bx-sweep"
              href="#bx-path"
              stroke="#fff"
              strokeWidth="30"
              fill="none"
              strokeLinecap="butt"
              strokeDasharray={PATH_LENGTH}
              strokeDashoffset="0"
            />
          </mask>
        </defs>

        <g mask="url(#bx-reveal)">
          <use
            href="#bx-path"
            fill="none"
            stroke={color}
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeDasharray="22 17"
          />
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

/* The reveal and the motion share one set of keyframe stops — 25% and 77.08% are the
   two bounces. Retiming one without the other is what makes the dashes run ahead of
   the ball. */
const CSS_RULES = `
.bx-root { display: block; width: 100%; margin: 0 auto; line-height: 0; }
.bx-root svg { width: 100%; height: auto; overflow: visible; }
/* The animations are always applied and start out paused, so the held state before
   the run is the first keyframe — dashes hidden, ball at the start — rather than the
   finished graphic, which would flash complete and then jump back. */
.bx-sweep { animation: bx-reveal var(--bx-speed) both; }
.bx-ball {
  offset-path: path("${PATH}");
  offset-rotate: 0deg;
  animation: bx-travel var(--bx-speed) both;
}
.bx-squash, .bx-bob { transform-box: fill-box; transform-origin: 50% 50%; }
.bx-squash { animation: bx-squash var(--bx-speed) both; }
.bx-bob { animation: bx-bob 3s ease-in-out calc(var(--bx-speed) + 0.3s) infinite; }
.bx-root:not(.bx-running) .bx-sweep,
.bx-root:not(.bx-running) .bx-ball,
.bx-root:not(.bx-running) .bx-squash,
.bx-root:not(.bx-running) .bx-bob { animation-play-state: paused; }
@keyframes bx-reveal {
  0%     { stroke-dashoffset: 2226; animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  12.5%  { stroke-dashoffset: 1991; animation-timing-function: cubic-bezier(.65,0,.85,.45); }
  25%    { stroke-dashoffset: 1757; animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  51.04% { stroke-dashoffset: 1036; animation-timing-function: cubic-bezier(.65,0,.85,.45); }
  77.08% { stroke-dashoffset: 315;  animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  88.54% { stroke-dashoffset: 157;  animation-timing-function: cubic-bezier(.15,.55,.35,1); }
  100%   { stroke-dashoffset: 0; }
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
  .bx-sweep, .bx-ball, .bx-squash, .bx-bob { animation: none !important; }
  .bx-sweep { stroke-dashoffset: 0; }
  .bx-ball { offset-distance: 100%; }
}
`
