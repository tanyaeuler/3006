# Image slots

Every image on the site renders a labelled placeholder until a real file
exists at the path below. Drop a file in at the listed path and it appears —
no code changes, no layout shifts. If a file is missing or fails to load, the
placeholder comes back rather than showing a broken image.

Export as JPG (photos) or SVG/PNG (logos, flat art). Aim for under ~300 KB per
image; anything over 2000px wide is wasted on this layout.

## Portraits

| Path | Used on | Aspect | Suggested export |
|---|---|---|---|
| `/images/tanya-portrait.jpg` | Home hero (circular crop) | 1:1 | 1200 × 1200 |
| `/images/tanya-about.jpg` | About hero (arch crop) | 3:4 | 1200 × 1600 |
| `/images/tanya-avatar.jpg` | Post author byline | 1:1 | 300 × 300 |

The home hero is masked to a circle, so keep the face centred with a little
breathing room. The About portrait is masked to an arch (rounded top), so avoid
important detail in the top corners.

## Ventures

| Path | Aspect | Notes |
|---|---|---|
| `/images/ventures/artifex.jpg` | 16:9 card, 4:3 on the Work page | 1600 × 1200 covers both |
| `/images/ventures/my4280.jpg` | as above | |
| `/images/ventures/brandifex.jpg` | as above | |
| `/images/ventures/webdesignmentor.jpg` | as above | |

Both crops are taken from the same file, so keep the subject away from the
extreme top and bottom edges.

## Journal covers

| Path | Aspect | Suggested export |
|---|---|---|
| `/images/journal/quiet-hour.jpg` | 16:9 | 1600 × 900 |
| `/images/journal/pricing.jpg` | 16:9 | 1600 × 900 |
| `/images/journal/school-run.jpg` | 16:9 | 1600 × 900 |
| `/images/journal/postcode.jpg` | 16:9 | 1600 × 900 |
| `/images/journal/hands.jpg` | 16:9 | 1600 × 900 |

Cover paths are set per post in `src/data/posts.js`. A post with no `cover`
falls back to a typographic card, which is a perfectly good option.

## Other

| Path | Used on | Aspect |
|---|---|---|
| `/images/faith.jpg` | Faith page (arch crop) | 3:4 |
| `/images/about-1.jpg` | About — "off the clock" | 3:4 |
| `/images/about-2.jpg` | About — "off the clock" | 3:4 |
| `/images/og-default.jpg` | Social share card | 1200 × 630 |

## Logo

The header currently renders a typographic `TANYA EULER` lockup in Poppins.
To use the real logo file instead, drop it at `/images/brand/logo.svg` and
swap the markup in `src/components/layout/Logo.jsx` — nothing else in the
codebase references it.
