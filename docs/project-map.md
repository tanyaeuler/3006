# Asset inspection project map

`public/project-map.html` is a standalone interactive map of every inspected
asset, colour coded by project. It is a single self-contained page — drop it on
any static host (or open it straight from disk) and it works. Served through
this Vite app it lives at `/project-map.html` in both `npm run dev` and the
production build, because Vite copies `public/` through untouched.

## What's on the page

- **Colour-coded markers** for all 311 assets, using the palette from the
  approved static draft (Ports NSW blue, Zig Zag Railway green, DEECA purple,
  and so on).
- **Projects panel** listing each project with its colour, asset count, and a
  toggle. Clicking a row shows/hides that project; the magnifier on the row
  zooms the map to that project's extent.
- **Search** across asset and project names, with results that fly to the
  marker and open its popup.
- **Popups** with the asset name, its project, exact coordinates, a copy button
  and a Google Maps link. Hovering a marker shows the asset name as a tooltip.
- **Basemap switch** between a light street map (CARTO Positron) and satellite
  imagery (Esri World Imagery).
- **ARTC corridor** dashed overlay, matching the draft's legend, toggleable.
- **Shareable views** — panning, zooming, the basemap choice and the visible
  projects are all written to the URL hash, so a copied link reopens the same
  view.
- **Responsive layout** — on phones the projects panel collapses into a bottom
  sheet behind a "Projects" button.

Leaflet 1.9.4 is loaded from unpkg with subresource-integrity hashes; there is
no build step and no other dependency.

## Updating the asset data

The asset list is embedded in the page between the `ASSET-DATA` markers.
Regenerate it from a new spreadsheet with:

```bash
pip install openpyxl
python3 tools/build_project_map.py tools/Asset_Locations.xlsx
```

The script treats each worksheet as one project and expects the columns
`Resource Name | Latitude | Longitude`. It rewrites only the data block and
reports anything it had to skip or repair.

New projects need a colour added to `PROJECT_COLOURS` in
`tools/build_project_map.py`; without one they fall back to neutral grey.

## Known data issues

- **`Delegate River Tunnel Walk Upstream Viewing Platform (10930)` (DEECA)** has
  a latitude of `-373.77517` in the spreadsheet, which is not a real
  coordinate. The build script reads it as a misplaced decimal point and plots
  it at `-37.377517, 147.11388`; the marker's popup carries a note saying so.
  Fix the value in the spreadsheet and re-run the script to clear the flag.
- The **ARTC corridor** is an indicative alignment drawn through rail-served
  centres between the Murray and Brisbane. No corridor geometry was supplied
  with the asset data, so it is schematic context only. Replace the `CORRIDOR`
  array in the page with a real alignment when one is available.
- Several assets share exact coordinates (a structure and its viewing platform,
  for example). Those markers are fanned onto a ~28 m ring so each stays
  individually clickable; the popup always reports the original coordinates.
