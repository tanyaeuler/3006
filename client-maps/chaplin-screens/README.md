# Chaplin Screens: service area map

Interactive Leaflet map for chaplinscreens.com.au. One file: `service-area-map.html`.

## Embedding

- **WordPress block:** paste everything between `EMBED START` and `EMBED END` into a Custom HTML block.
- **iframe:** host the file and embed it. Links use `target="_top"`, so they open in the full window.

## Editing

All settings are in the `EDIT HERE` block at the top of the script:

- `SUBURBS[].url`: the suburb's service-area page, e.g. `https://www.chaplinscreens.com.au/<suburb>-security-screens/`. With a URL the suburb gets a full pin and a link. Left `null` it shows as a small blue dot with a smaller label beside it.
- `HEAD_OFFICE.lat/lng`: where the hat sits. Approximate on purpose (home based). `HEAD_OFFICE.note` is the line in its hover card.
- `SERVICE_AREA`: the dashed boundary.

## How it behaves

- **Fixed map.** No zoom or pan, so scrolling, swiping and pinching always act on the page. There is no scroll trap on any device and nothing to learn.
- **Hover card.** Hovering or focusing a pin or dot shows a card above it; pins hop once and stay raised.
- **Touch.** Tapping a pin shows the hop, then opens the page. Tapping a dot shows its card for a few seconds.
- **Arrival.** Pins drop in once when the map scrolls into view, rippling out from head office. Skipped under `prefers-reduced-motion`.
- **Labels.** Dot names sit under the dot, nudged left or right if a neighbour is in the way, and only go above when every spot below is blocked. The map tries a few placement orders and keeps the one that shows the most names, so all names fit at every width tested (320px up).
- **Home base.** A black Chaplin-style bowler (round crown, ribbon band, curled brim) marks where they're based, in place of a pin and label. It is drawn as inline SVG (`hatSvg` in the script), so there's no image file to host. Its position is deliberately approximate, as the business is home based.
- Tiles: Esri's keyless light-grey base, without labels. Leaflet 1.9.4 from unpkg with SRI hashes.
