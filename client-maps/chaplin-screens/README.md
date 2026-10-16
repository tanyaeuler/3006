# Chaplin Screens: service area map

Interactive Leaflet map for chaplinscreens.com.au. One file: `service-area-map.html`.

## Embedding

- **WordPress block:** paste everything between `EMBED START` and `EMBED END` into a Custom HTML block.
- **iframe:** host the file and embed it. Links use `target="_top"`, so they open in the full window.

## Editing

All settings are in the `EDIT HERE` block at the top of the script:

- `SUBURBS[].url`: the suburb's service-area page, e.g. `https://www.chaplinscreens.com.au/<suburb>-security-screens/`. With a URL the suburb gets a full pin, a label and a linked button. Left `null` it shows as a small dot (name in the hover card) and a plain button.
- `HEAD_OFFICE.lat/lng`: placed from the supplied image. Replace with the real address coordinates. `HEAD_OFFICE.note` is the line in its hover card.
- `ALSO_SERVICING`: names in the "Also servicing" line under the buttons.
- `SERVICE_AREA`: the dashed boundary.

## How it behaves

- **Fixed map.** No zoom or pan, so scrolling, swiping and pinching always act on the page. There is no scroll trap on any device and nothing to learn.
- **Hover card.** Hovering or focusing a pin, dot or suburb button shows a card above the marker; the pin hops once and stays raised. Pin and button highlight together.
- **Touch.** Tapping a linked pin shows the hop, then opens the page. Tapping a dot or unlinked button shows its card for a few seconds.
- **Arrival.** Pins drop in once when the map scrolls into view, rippling out from head office. Skipped under `prefers-reduced-motion`.
- **Labels.** Each label takes the clear side of its pin (below, right, left, above).
- Tiles: Esri's keyless light-grey base, without labels. Leaflet 1.9.4 from unpkg with SRI hashes.
