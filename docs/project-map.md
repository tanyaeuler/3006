# Asset inspection project map

`public/project-map.html` is a standalone interactive map of inspection
coverage, colour coded by project. It is a single self-contained page — drop it
on any static host (or open it straight from disk) and it works. Served through
this Vite app it lives at `/project-map.html` in both `npm run dev` and the
production build, because Vite copies `public/` through untouched.

## What's on the page

- **Colour-coded markers** for every plotted location, using the palette from
  the approved static draft (Ports NSW blue, Zig Zag Railway green, DEECA
  purple, and so on). Points are identified by their **project** on hover and
  on click — individual asset names are deliberately not published.
- **Projects panel** listing each project with its colour, marker count, and a
  toggle. Clicking a row shows/hides that project; the magnifier on the row
  zooms the map to that project's extent.
- **Popups** with the project name, the point's coordinates, a copy button and
  a Google Maps link.
- **ARTC corridor** drawn as a dashed overlay from the surveyed alignment, and
  toggleable.
- **Basemap switch** between a light street map (CARTO Positron) and satellite
  imagery (Esri World Imagery).
- **Shareable views** — panning, zooming, the basemap choice and the visible
  projects are all written to the URL hash, so a copied link reopens the same
  view.
- **Responsive layout** — on phones the projects panel collapses into a bottom
  sheet behind a "Projects" button.

## Scrolling and zoom gestures

The map does **not** zoom on a plain scroll. A trackpad two-finger swipe and a
mouse wheel produce the same `wheel` event, and letting the map consume it traps
the reader: scrolling down a page that embeds the map stops dead over it and
starts zooming instead. Those events are now kept away from the zoom handler and
scroll the page as normal.

Zooming still works through:

| Gesture | Works |
| --- | --- |
| Pinch on a trackpad | yes — arrives as a wheel event with `ctrlKey` set |
| Ctrl / ⌘ + scroll | yes — same event |
| Pinch on a touchscreen | yes — a touch gesture Leaflet handles separately |
| Double-click / double-tap | yes |
| The `+` / `−` buttons | yes |
| Plain scroll or mouse wheel | no, by design |

The trade-off is that plain **mouse-wheel** zoom goes too. A mouse wheel and a
trackpad two-finger swipe are indistinguishable to the browser, so one cannot be
kept without the other. The zoom buttons cover that case.

To go back to scroll-wheel zooming, delete the `document.addEventListener
('wheel', …)` block below `map.addControl(new BasemapControl())`.

Note that one-finger dragging on a touchscreen still pans the map rather than
scrolling the page — the same class of trap, on phones. Fixing that means
requiring two fingers to pan, which is a separate change.

## Files the page needs

Leaflet 1.9.4 is served from alongside the page rather than a CDN, so these
travel together — copying `project-map.html` on its own will leave you with an
unstyled, non-functioning page:

```
project-map.html
leaflet.css
leaflet.js
images/          (referenced by leaflet.css)
```

The vendored `leaflet.css` and `leaflet.js` are the unmodified 1.9.4 release
files and match the published SRI hashes
(`sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=` and
`sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=`). To upgrade Leaflet,
replace all four items from the matching release and update those hashes here.

There is no build step and no other dependency.

## Map tiles

Tiles are the one thing the page still fetches from a third party at runtime — a
slippy map has to pull imagery from a tile server as you pan and zoom. Both
layers use Esri services that need no API key:

| Layer | Service |
| --- | --- |
| Map (light) | `Canvas/World_Light_Gray_Base` + `Canvas/World_Light_Gray_Reference` |
| Satellite | `World_Imagery` |

The light style is two layers because Esri publishes the grey base and its place
labels separately; the labels ride on top via `zIndex`. It is only published to
zoom 16, so `maxNativeZoom: 16` lets Leaflet scale those tiles up past that
rather than showing blank squares.

**This used to be CARTO Positron.** CARTO retired anonymous access to their
basemaps, and their tiles started coming back stamped "API KEY REQUIRED" across
the whole map. If you would rather have Positron's exact look back, sign up for
a CARTO key and swap the `light` entry as shown in the comment above `basemaps`
in the page. Other no-key options if Esri ever does the same thing:

- `https://tile.openstreetmap.org/{z}/{x}/{y}.png` — standard OSM. Free and
  keyless, but it is a full-colour style rather than a quiet grey one, and the
  OSM Foundation's tile usage policy discourages heavy or commercial traffic.
- Self-hosted tiles, which removes the third-party dependency entirely.

Either way the change is confined to the `basemaps` object near the top of the
page script.

## Headline figures

Two numbers on the page are editorial rather than counted from the data,
because the markers are inspection locations, not one marker per structure:

- **`3,500+`** — the total under the title and beside "Projects". It lives in
  the `TOTAL_LABEL` constant at the top of the page script.
- **`approx. 2,500+ structures`** — shown beside ConnectSydney in place of its
  marker count. Notes like this come from `PROJECT_NOTES` in
  `tools/build_project_map.py`; a project with a note shows the note instead of
  a number.

Because the headline total counts structures while the toggles work on
projects, the panel tally switches units when you filter: it reads
"3,500+ assets" with everything on, and "6 of 9 projects" once something is
hidden.

## Updating the data

Both the markers and the corridor are embedded in the page between the
`MAP-DATA` markers. Regenerate them with:

```bash
pip install openpyxl
python3 tools/build_project_map.py tools/Asset_Locations.xlsx tools/ARTC_Coordinates.xlsx
```

- `Asset_Locations.xlsx` — one worksheet per project, columns
  `Resource Name | Latitude | Longitude`. Only the coordinates are carried onto
  the map; the names stay in the spreadsheet.
- `ARTC_Coordinates.xlsx` — one worksheet per continuous run of corridor,
  columns `Name | Longitude | Latitude` (note this is the reverse column order
  of the asset sheet). Each sheet becomes its own dashed polyline, which is
  what leaves the Sydney–Newcastle gap open, where there is no ARTC line. Adding
  another break in the corridor means adding another sheet.

New projects need a colour added to `PROJECT_COLOURS` in
`tools/build_project_map.py`; without one they fall back to neutral grey.

The script reports anything it skipped or repaired.

## Known data issues

- **DEECA** has a row (`Delegate River Tunnel Walk Upstream Viewing Platform
  (10930)` in the spreadsheet) whose latitude is `-373.77517`, which is not a
  real coordinate. The build script reads it as a misplaced decimal point and
  plots it at `-37.377517, 147.11388`; that point's popup carries a note saying
  so. Fix the value in the spreadsheet and re-run the script to clear the flag.
- Several points share exact coordinates (a structure and its viewing platform,
  for example). Those markers are fanned onto a ~28 m ring so each stays
  individually clickable; the popup always reports the original coordinates.
