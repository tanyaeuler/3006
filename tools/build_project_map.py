#!/usr/bin/env python3
"""Regenerate the asset data embedded in public/project-map.html from the
Asset_Locations spreadsheet.

Usage:
    python3 tools/build_project_map.py path/to/Asset_Locations.xlsx

Each worksheet in the workbook is treated as one project. Sheets must have the
header row `Resource Name | Latitude | Longitude` (extra columns are ignored).
Project display colours live in PROJECT_COLOURS below; a sheet with no entry
there falls back to a neutral grey, so add new projects to that map when the
spreadsheet gains sheets.

The script rewrites only the block between the ASSET-DATA markers in
public/project-map.html and leaves the rest of the page untouched.
"""

import json
import pathlib
import sys

import openpyxl

# Colours match the "Projects" key in the approved static draft.
PROJECT_COLOURS = {
    "Ports NSW": "#1B6DE0",
    "Zig Zag Railway": "#1B6E3B",
    "DEECA": "#6A1BB5",
    "Bundaberg Shire Council": "#E01B33",
    "Transport Heritage NSW": "#7A4A32",
    "ConnectSydney": "#16B8E8",
    "Wingecarribee Shire Council": "#F2559B",
    "Murray River": "#8B8D93",
    "Brickmakers Dr": "#F5A623",
}
FALLBACK_COLOUR = "#64748B"

# Australia's bounding box, used to catch data-entry errors.
LAT_RANGE = (-44.0, -9.0)
LON_RANGE = (112.0, 154.5)

START = "/* ASSET-DATA:START */"
END = "/* ASSET-DATA:END */"


def repair(lat, lon):
    """Return (lat, lon, note) with obvious decimal-point slips corrected.

    A latitude such as -373.77517 is out of range everywhere on earth; shifting
    the point one place left yields -37.377517, which lands in Victoria. We only
    apply the shift when it moves the value into the Australian bounding box,
    and we always report it so the page can flag the marker.
    """
    note = None
    for _ in range(3):
        if LAT_RANGE[0] <= lat <= LAT_RANGE[1]:
            break
        shifted = lat / 10.0
        if LAT_RANGE[0] <= shifted <= LAT_RANGE[1]:
            note = f"Latitude corrected from {lat:g} (decimal point appears misplaced in the source data)."
            lat = shifted
            break
        lat = shifted
    return lat, lon, note


def read_workbook(path):
    workbook = openpyxl.load_workbook(path, data_only=True)
    projects = []
    problems = []

    for sheet in workbook.worksheets:
        assets = []
        for row_number, row in enumerate(sheet.iter_rows(min_row=2, values_only=True), start=2):
            if not row or row[0] is None:
                continue
            name = str(row[0]).strip()
            try:
                lat = float(row[1])
                lon = float(row[2])
            except (TypeError, ValueError, IndexError):
                problems.append(f"{sheet.title} row {row_number}: unreadable coordinates for {name!r}")
                continue

            lat, lon, note = repair(lat, lon)
            in_range = LAT_RANGE[0] <= lat <= LAT_RANGE[1] and LON_RANGE[0] <= lon <= LON_RANGE[1]
            if not in_range:
                problems.append(f"{sheet.title} row {row_number}: {name!r} at {lat}, {lon} is outside Australia")
                continue
            if note:
                problems.append(f"{sheet.title} row {row_number}: {name!r} — {note}")

            asset = {"n": name, "lat": round(lat, 6), "lng": round(lon, 6)}
            if note:
                asset["note"] = note
            assets.append(asset)

        if not assets:
            problems.append(f"{sheet.title}: no usable rows, sheet skipped")
            continue

        projects.append(
            {
                "name": sheet.title,
                "colour": PROJECT_COLOURS.get(sheet.title, FALLBACK_COLOUR),
                "assets": assets,
            }
        )
        if sheet.title not in PROJECT_COLOURS:
            problems.append(f"{sheet.title}: no colour defined, using fallback {FALLBACK_COLOUR}")

    return projects, problems


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)

    projects, problems = read_workbook(sys.argv[1])
    page = pathlib.Path(__file__).resolve().parent.parent / "public" / "project-map.html"
    html = page.read_text(encoding="utf-8")

    if START not in html or END not in html:
        sys.exit(f"Could not find the ASSET-DATA markers in {page}")

    body = json.dumps(projects, ensure_ascii=False, indent=2)
    head, rest = html.split(START, 1)
    _, tail = rest.split(END, 1)
    page.write_text(f"{head}{START}\nconst PROJECTS = {body};\n{END}{tail}", encoding="utf-8")

    total = sum(len(project["assets"]) for project in projects)
    print(f"Wrote {total} assets across {len(projects)} projects to {page}")
    for problem in problems:
        print(f"  ! {problem}")


if __name__ == "__main__":
    main()
