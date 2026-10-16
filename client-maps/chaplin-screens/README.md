# Chaplin Screens: service area map

Interactive Leaflet map for chaplinscreens.com.au. One file: `service-area-map.html`.

## Embedding

- **WordPress block:** paste everything between `EMBED START` and `EMBED END` into a Custom HTML block.
- **iframe:** host the file and embed it. Links use `target="_top"`, so they open in the full window.

## Editing

All settings are in the `EDIT HERE` block at the top of the script:

- `SUBURBS[].url`: the suburb's service-area page. Pattern: `https://www.chaplinscreens.com.au/<suburb>-security-screens/`. Leave `null` and the pin shows but is not clickable.
- `HEAD_OFFICE.lat/lng`: placed from the supplied image. Replace with the real address coordinates.
- `PLACES`: area names with no pin. `SERVICE_AREA`: the dashed boundary.

## Gesture behaviour (the scroll-trap fixes)

| Gesture | Result |
| --- | --- |
| Two-finger trackpad swipe / mouse wheel | Scrolls the page, never the map |
| Trackpad pinch, Ctrl/Cmd + scroll | Zooms the map (desktop Safari pinch included) |
| One finger on a phone | Scrolls the page; sideways swipe shows "Use two fingers" |
| Two fingers on a phone | Pinch-zooms and pans the map |
| Double-click / double-tap, +/- buttons | Zoom |
| Mouse drag | Pans the map |

Trade-off: plain mouse-wheel zoom is off. A mouse wheel and a trackpad swipe are the same browser event, so one cannot be kept without the other.

## Other behaviour

- Pins bounce on hover and keyboard focus; on touch they bounce briefly before navigating. Motion is off under `prefers-reduced-motion`.
- Labels pick the clear side of each pin (below, right, left, above). If none is clear they hide until hovered or the map is zoomed in.
- Tiles are Esri's keyless light-grey basemap. Leaflet 1.9.4 loads from unpkg with SRI hashes.
