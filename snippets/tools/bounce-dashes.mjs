/**
 * Generates the dash geometry and per-dash reveal timings for the bouncing ball
 * graphic, then splices the result into the files that use it.
 *
 *   node snippets/tools/bounce-dashes.mjs
 *
 * Each dash is its own element that appears once the ball has passed over it, so the
 * trail is laid down behind the ball with no mask involved. Masks were the previous
 * approach and they are fragile: animating stroke-dashoffset on a <use> inside a
 * <mask> is dropped by some renderers and sanitisers, and when that happens the whole
 * arc shows at once.
 *
 * Requires playwright for the SVG geometry APIs (path length, point at length).
 */
import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

/* The three flight segments. Split at the bounces so no dash spans a cusp. Quadratic
   curves are exact parabolas, which is why the arcs read as real bounces. */
export const SEGMENTS = [
  'M -1785 170 Q -1603 -96, -1420 168',
  'M -1420 168 Q -837 -592, -253 168',
  'M -253 168 Q -155 16, 0 0',
]
export const FULL_PATH =
  'M -1785 170 Q -1603 -96, -1420 168 Q -837 -592, -253 168 Q -155 16, 0 0'

const DASH = 22          // dash length in user units, at the reference proportions
const GAP = 17           // gap between dashes
const LAG = 6            // how far past a dash the ball is before that dash appears
const DURATION = 2.4     // seconds for the whole run

/* The ball's motion: keyTimes are fractions of DURATION, keyPoints fractions of path
   length, and each interval has its own easing — slow into an apex, quick into a
   bounce. The dash timings are derived from exactly this, which is what keeps the
   trail under the ball. */
export const KEY_TIMES = [0, 0.125, 0.25, 0.5104, 0.7708, 0.8854, 1]
export const KEY_POINTS = [0, 0.1053, 0.2105, 0.5345, 0.8585, 0.9293, 1]
const EASE_OUT = [0.15, 0.55, 0.35, 1]
const EASE_IN = [0.65, 0, 0.85, 0.45]
export const KEY_SPLINES = [EASE_OUT, EASE_IN, EASE_OUT, EASE_IN, EASE_OUT, EASE_OUT]

const bezier = (a, b, u) =>
  3 * a * u * (1 - u) ** 2 + 3 * b * u ** 2 * (1 - u) + u ** 3

/** Parameter u where the cubic bezier's y reaches `target`. */
function solveForY(y1, y2, target) {
  let lo = 0
  let hi = 1
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (bezier(y1, y2, mid) < target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** Time fraction at which the ball reaches `lengthFraction` of the path. */
function timeAtLength(lengthFraction) {
  const p = Math.max(0, Math.min(1, lengthFraction))
  let i = KEY_POINTS.findIndex((_, n) => n < KEY_POINTS.length - 1 && p <= KEY_POINTS[n + 1])
  if (i < 0) i = KEY_POINTS.length - 2
  const span = KEY_POINTS[i + 1] - KEY_POINTS[i]
  const f = span === 0 ? 0 : (p - KEY_POINTS[i]) / span
  const [x1, y1, x2, y2] = KEY_SPLINES[i]
  const u = solveForY(y1, y2, f)
  const eased = bezier(x1, x2, u)
  return KEY_TIMES[i] + eased * (KEY_TIMES[i + 1] - KEY_TIMES[i])
}

/** Dash geometry, measured in the browser so the arc lengths are exact. */
async function measure() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  const page = await browser.newPage()
  await page.setContent('<svg id="s" viewBox="-1811 -238 1837 435"></svg>')
  const data = await page.evaluate(
    ({ SEGMENTS, DASH, GAP }) => {
      const svg = document.getElementById('s')
      const make = (d) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        el.setAttribute('d', d)
        svg.appendChild(el)
        return el
      }
      const round = (n) => Math.round(n * 10) / 10
      const segs = SEGMENTS.map(make)
      const lengths = segs.map((el) => el.getTotalLength())
      const total = lengths.reduce((a, b) => a + b, 0)

      const dashes = []
      let travelled = 0
      segs.forEach((el, i) => {
        const L = lengths[i]
        /* Fit a whole number of dashes so every segment starts and ends flush with one,
           which puts a dash right at each bounce the way the reference does. */
        const count = Math.max(1, Math.round((L + GAP) / (DASH + GAP)))
        const unit = L / (count * DASH + (count - 1) * GAP)
        const dashLen = DASH * unit
        const step = (DASH + GAP) * unit

        for (let k = 0; k < count; k++) {
          const start = k * step
          const end = Math.min(start + dashLen, L)
          const p0 = el.getPointAtLength(start)
          const pm = el.getPointAtLength((start + end) / 2)
          const p1 = el.getPointAtLength(end)
          /* Quadratic through the midpoint, so a dash follows the curve instead of
             cutting across it: C = 2M - (P0 + P2) / 2 */
          const cx = 2 * pm.x - (p0.x + p1.x) / 2
          const cy = 2 * pm.y - (p0.y + p1.y) / 2
          dashes.push({
            d: `M ${round(p0.x)} ${round(p0.y)} Q ${round(cx)} ${round(cy)}, ${round(p1.x)} ${round(p1.y)}`,
            endLength: travelled + end,
          })
        }
        travelled += L
      })
      return { dashes, total, lengths }
    },
    { SEGMENTS, DASH, GAP },
  )
  await browser.close()
  return data
}

const { dashes, total, lengths } = await measure()

/* Reveal each dash once the ball has travelled past its far end, plus a little, so it
   surfaces from behind the ball rather than popping out at its centre. */
const timed = dashes.map(({ d, endLength }) => {
  const reveal = timeAtLength((endLength + LAG) / total)
  return { d, reveal: Math.min(0.999, Math.max(0.0005, reveal)) }
})

const round4 = (n) => +n.toFixed(4)

/* ---- emit ---- */

const svgDashes = timed
  .map(({ d, reveal }) => {
    const r = round4(reveal)
    const fade = round4(Math.min(0.9995, reveal + 0.006))
    return `      <path d="${d}" opacity="1">
        <animate attributeName="opacity" values="0; 0; 1; 1"
                 keyTimes="0; ${r}; ${fade}; 1" dur="${DURATION}s" begin="0s" fill="freeze" />
      </path>`
  })
  .join('\n')

/* --bx-at is a unitless fraction of the run, not a time: CSS calc() cannot multiply
   two times together, and a fraction also rescales correctly when --bx-speed changes. */
const htmlDashes = timed
  .map(({ d, reveal }) => `      <path class="bx-dash" style="--bx-at: ${round4(reveal)}" d="${d}" />`)
  .join('\n')

const jsDashes = timed
  .map(({ d, reveal }) => `  { d: '${d}', at: ${round4(reveal)} },`)
  .join('\n')

function splice(file, generated, marker = 'dashes') {
  const path = join(ROOT, file)
  const source = readFileSync(path, 'utf8')
  const open = new RegExp(`([ \\t]*(?:<!--|/\\*) ${marker}:start (?:-->|\\*/)\\n)`)
  const close = new RegExp(`([ \\t]*(?:<!--|/\\*) ${marker}:end (?:-->|\\*/))`)
  const a = source.match(open)
  const b = source.match(close)
  if (!a || !b) throw new Error(`${file}: missing ${marker}:start / ${marker}:end markers`)
  const head = source.slice(0, source.indexOf(a[1]) + a[1].length)
  const tail = source.slice(source.indexOf(b[1]))
  writeFileSync(path, `${head}${generated}\n${tail}`)
  console.log(`spliced ${timed.length} dashes into ${file}`)
}

splice('snippets/bouncing-ball.svg', svgDashes)
splice('snippets/bouncing-ball.html', htmlDashes)
splice('snippets/bouncing-ball-preview.html', htmlDashes)

/* ---- looping variant, for use as a CSS background image ----

   A background image cannot be scroll-triggered: its animation timeline starts when the
   browser rasterises the image, so on a long page the run is over before a visitor
   scrolls to it, and they arrive to the finished arc. Looping is the only fix available
   from inside the file — whenever someone arrives, the cycle comes round again. */
const CYCLE = 4.4                      // seconds: the RUN, then a rest, then repeat
const RUN = DURATION / CYCLE           // fraction of the cycle spent bouncing
const at = (seconds) => round4(seconds / CYCLE)

const loopDashes = timed
  .map(({ d, reveal }) => {
    const r = round4(reveal * RUN)
    const fade = round4(Math.min(RUN, reveal * RUN + 0.004))
    return `      <path d="${d}" opacity="1">
        <animate attributeName="opacity" values="0; 0; 1; 1"
                 keyTimes="0; ${r}; ${fade}; 1" dur="${CYCLE}s" repeatCount="indefinite" />
      </path>`
  })
  .join('\n')

/* Both squashes are baked into one cycle-long animation rather than a list of begin
   times, so the whole graphic repeats on a single clock. */
const squashKeyTimes = [0, at(0.54), at(0.6), at(0.66), at(1.79), at(1.85), at(1.91), 1]
const squashValues = ['1 1', '1 1', '1.28 0.74', '1 1', '1 1', '1.28 0.74', '1 1', '1 1']

const loopSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="-1811 -238 1837 435" width="1837" height="435"
     role="img" aria-label="A ball bouncing along an arc, leaving a dashed trail behind it">
  <title>Bouncing ball leaving a dashed trail (looping)</title>
  <!--
    GENERATED by snippets/tools/bounce-dashes.mjs — edit that, not this.

    The looping variant, for a CSS background image. A background image cannot be held
    until it scrolls into view: the animation timeline starts when the browser rasterises
    the image, so on a long page the run finishes before a visitor reaches it and they see
    the finished arc. This version repeats every ${CYCLE}s — ${DURATION}s bouncing, the rest at
    rest — so there is always another run coming.

    Prefer snippets/bouncing-ball.html in a code block if you can: it waits until the
    graphic is in view and then runs once, which reads better than a loop.

    Colour: change the two #4f4f4f values.  Cycle length: CYCLE in the generator.
  -->
  <defs>
    <path id="ba-path" fill="none"
          d="${FULL_PATH}" />
  </defs>

  <g fill="none" stroke="#4f4f4f" stroke-width="7.5" stroke-linecap="round">
${loopDashes}
  </g>

  <!-- The origin (0,0) is the ball's landing point: animateMotion is post-multiplied onto
       the transform attribute rather than replacing it, so a ball positioned by a
       transform would end up doubly offset. -->
  <g>
    <animateMotion dur="${CYCLE}s" repeatCount="indefinite" rotate="0" calcMode="spline"
                   keyPoints="${KEY_POINTS.map((p) => p).join('; ')}; 1"
                   keyTimes="${KEY_TIMES.map((t) => round4(t * RUN)).join('; ')}; 1"
                   keySplines="${KEY_SPLINES.map((k) => k.join(' ')).join(';\n                               ')};
                               0 0 1 1">
      <mpath xlink:href="#ba-path" href="#ba-path" />
    </animateMotion>

    <g>
      <animateTransform attributeName="transform" type="scale"
                        values="${squashValues.join('; ')}"
                        keyTimes="${squashKeyTimes.join('; ')}"
                        dur="${CYCLE}s" repeatCount="indefinite" />
      <circle r="21" fill="#4f4f4f" />
    </g>
  </g>
</svg>
`

writeFileSync(join(ROOT, 'snippets/bouncing-ball-loop.svg'), loopSvg)
console.log('wrote snippets/bouncing-ball-loop.svg')

writeFileSync(
  join(ROOT, 'src/components/ui/bounceDashes.js'),
  `/* Generated by snippets/tools/bounce-dashes.mjs — do not edit by hand.
   Each entry is one dash of the trail and the moment, in seconds, the ball has
   passed far enough for it to appear. */
export const DURATION = ${DURATION}

export const DASHES = [
${jsDashes}
]
`,
)
console.log('wrote src/components/ui/bounceDashes.js')

console.log(
  `\ntotal length ${total.toFixed(1)}  segments ${lengths.map((l) => l.toFixed(1)).join(' / ')}`,
)
console.log(
  `dash reveal times: ${timed.slice(0, 3).map((t) => (t.reveal * DURATION).toFixed(2)).join('s, ')}s … ` +
    `${timed.slice(-2).map((t) => (t.reveal * DURATION).toFixed(2)).join('s, ')}s`,
)
