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

Leaflet 1.9.4 is loaded from unpkg with subresource-integrity hashes; there is
no build step and no other dependency.

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
