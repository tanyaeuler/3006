# Chaplin Screens: service area map

Interactive Leaflet map for chaplinscreens.com.au. One file: `service-area-map.html`.

## Embedding

- **WordPress block:** paste everything between `EMBED START` and `EMBED END` into a Custom HTML block.
- **iframe:** host the file and embed it. Links use `target="_top"`, so they open in the full window.

## Editing

All settings are in the `EDIT HERE` block at the top of the script:

- `SUBURBS[].url`: the suburb's service-area page, e.g. `https://www.chaplinscreens.com.au/<suburb>-security-screens/`. With a URL the suburb gets a full pin and a link. Left `null` it shows as a small blue dot with a smaller label beside it.
- `HEAD_OFFICE.lat/lng`: placed from the supplied image. Replace with the real address coordinates. `HEAD_OFFICE.note` is the line in its hover card.
- `SERVICE_AREA`: the dashed boundary.

## How it behaves

- **Fixed map.** No zoom or pan, so scrolling, swiping and pinching always act on the page. There is no scroll trap on any device and nothing to learn.
- **Hover card.** Hovering or focusing a pin or dot shows a card above it; pins hop once and stay raised.
- **Touch.** Tapping a pin shows the hop, then opens the page. Tapping a dot shows its card for a few seconds.
- **Arrival.** Pins drop in once when the map scrolls into view, rippling out from head office. Skipped under `prefers-reduced-motion`.
- **Labels.** Dot names sit under the dot, or above it when below is blocked. Pin labels prefer below. The head office label takes whichever side leaves the most suburb names visible. On a 320px-wide phone the four tightest suburbs show their names on tap instead.
- **Head office.** Yellow pin and label carry the Chaplin bowler hat, traced as an inline SVG (`hatPaths` in the script), so there is no image file to host.
- Tiles: Esri's keyless light-grey base, without labels. Leaflet 1.9.4 from unpkg with SRI hashes.
