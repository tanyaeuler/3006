# Putting the bouncing ball on the site (Divi)

## Why the background image showed the finished arc

An SVG's animation timeline starts when the browser loads and rasterises the image — not
when the image scrolls into view. As a CSS background image, nothing outside the file can
reach in to hold it back, so on a long page the 2.4s run is spent while the visitor is
still reading the top of the page. They scroll down and arrive to the completed arc.

Reproduced in Chromium: with the graphic below the fold and five seconds spent at the top
of the page first, the run is over on arrival. It is not a fault in the file, and no
version of the file can fix it while it is a background image. Pick one of the three
routes below instead.

## Option 1 — Code module (recommended)

Runs once, when the graphic is actually in view.

1. Add a **Code** module where you want the graphic.
2. Paste the whole contents of `bouncing-ball.html` into it — the markup, the styles and
   the script together. Divi's Code module keeps all three; its Text module does not.
3. Colour and size: edit the values at the top of the pasted styles.
   - `--bx-color` — line and ball colour (also update the two `#4f4f4f` attributes in the
     markup, which are the fallback if the styles ever get stripped)
   - `--bx-max-width` — how wide it is allowed to get
   - `--bx-speed` — how long the run takes

### Making it sit behind content, like a background

Give the Code module a CSS class under **Advanced → CSS ID & Classes → CSS Class**, say
`hs-bounce`, then add this under **Divi → Theme Options → Custom CSS**:

```css
.hs-bounce {
  position: absolute;
  inset: auto 0 0 0;      /* bottom of the section — change to suit */
  z-index: 0;
  pointer-events: none;   /* clicks pass through to the content above */
}
.hs-bounce .bounce-arc { margin: 0; }

/* The section holding it needs to be a positioning context. Add the class
   hs-bounce-section to that section under Advanced → CSS ID & Classes. */
.hs-bounce-section { position: relative; overflow: hidden; }
.hs-bounce-section .et_pb_row { position: relative; z-index: 1; }
```

## Option 2 — keep it as a background image

Use `bouncing-ball-loop.svg` instead of `bouncing-ball.svg`. It repeats every 4.4 seconds
— 2.4s bouncing, then a rest — so whenever a visitor arrives there is another run coming.

Set the background to **Fit** (not Cover) and repeat to **No Repeat**, or the arc gets
cropped or tiled.

Trade-offs, so they are not a surprise: it loops rather than running once, it cannot wait
until it is in view, and a looping background near text is more distracting than a
one-shot. To change the cycle length, edit `CYCLE` in `tools/bounce-dashes.mjs` and re-run
it — the dash timings are derived from it.

## Option 3 — Image module

Add `bouncing-ball.svg` through a normal **Image** module. It runs once, on page load,
which is fine if the graphic sits above the fold and no good if it doesn't.

## If nothing animates at all

- Confirm the file is being served as `image/svg+xml`, not downloaded or served as text.
- Open the SVG's URL directly in a browser tab. If it animates there, the file is fine and
  the problem is how the page is using it. If it doesn't, the upload or the server is
  mangling it — check for a plugin that "optimises" or sanitises SVGs, which usually
  strips the `animate` elements.
- The graphic honours `prefers-reduced-motion`: with that turned on in the operating
  system, the HTML version deliberately shows the finished arc and never moves.

## Regenerating

`bouncing-ball.svg`, `bouncing-ball-loop.svg`, `bouncing-ball.html`, the preview page and
the React component's data all come from one generator, because the dash reveal times have
to match the ball's easing exactly:

```
node tools/bounce-dashes.mjs      # from the snippets directory
```

Retiming the ball by hand puts the trail out of step with it. Change the values in the
generator instead.
