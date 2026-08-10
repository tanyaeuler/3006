#!/usr/bin/env python3
"""Regenerate the data embedded in public/project-map.html from the source
spreadsheets.

Usage:
    python3 tools/build_project_map.py tools/Asset_Locations.xlsx tools/ARTC_Coordinates.xlsx

Asset_Locations.xlsx: each worksheet is one project, with the header row
`Resource Name | Latitude | Longitude`. Only the coordinates are carried onto
the map — individual asset names are deliberately not published, so the page
shows the project name on hover and click instead.

ARTC_Coordinates.xlsx: each worksheet is one continuous run of the ARTC
corridor, with the header row `Name | Longitude | Latitude` (note the column
order is the reverse of the asset sheet). Sheets are drawn as separate dashed
lines, which is what keeps the gap between Sydney and Newcastle — where there
is no ARTC line — from being bridged.

Project display colours live in PROJECT_COLOURS below; a sheet with no entry
there falls back to a neutral grey, so add new projects to that map when the
spreadsheet gains sheets.

The script rewrites only the block between the MAP-DATA markers in
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

# Projects whose plotted points stand for many more structures than there are
# markers. The note replaces the marker count in the legend.
PROJECT_NOTES = {
    "ConnectSydney": "approx. 2,500+ structures",
}

# Australia's bounding box, used to catch data-entry errors.
LAT_RANGE = (-44.0, -9.0)
LON_RANGE = (112.0, 154.5)

START = "/* MAP-DATA:START */"
END = "/* MAP-DATA:END */"


def repair(lat):
    """Return (lat, note) with obvious decimal-point slips corrected.

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
    return lat, note


def read_projects(path):
    workbook = openpyxl.load_workbook(path, data_only=True)
    projects = []
    problems = []

    for sheet in workbook.worksheets:
        assets = []
        for row_number, row in enumerate(sheet.iter_rows(min_row=2, values_only=True), start=2):
            if not row or row[0] is None:
                continue
            label = str(row[0]).strip()
            try:
                lat = float(row[1])
                lon = float(row[2])
            except (TypeError, ValueError, IndexError):
                problems.append(f"{sheet.title} row {row_number}: unreadable coordinates for {label!r}")
                continue

            lat, note = repair(lat)
            if not (LAT_RANGE[0] <= lat <= LAT_RANGE[1] and LON_RANGE[0] <= lon <= LON_RANGE[1]):
                problems.append(f"{sheet.title} row {row_number}: {label!r} at {lat}, {lon} is outside Australia")
                continue
            if note:
                problems.append(f"{sheet.title} row {row_number}: {label!r} — {note}")

            asset = {"lat": round(lat, 6), "lng": round(lon, 6)}
            if note:
                asset["note"] = note
            assets.append(asset)

        if not assets:
            problems.append(f"{sheet.title}: no usable rows, sheet skipped")
            continue

        project = {
            "name": sheet.title,
            "colour": PROJECT_COLOURS.get(sheet.title, FALLBACK_COLOUR),
            "assets": assets,
        }
        if sheet.title in PROJECT_NOTES:
            project["note"] = PROJECT_NOTES[sheet.title]
        projects.append(project)

        if sheet.title not in PROJECT_COLOURS:
            problems.append(f"{sheet.title}: no colour defined, using fallback {FALLBACK_COLOUR}")

    return projects, problems


def read_corridors(path):
    """Read the ARTC alignment. One worksheet per continuous run of line."""
    workbook = openpyxl.load_workbook(path, data_only=True)
    corridors = []
    problems = []

    for sheet in workbook.worksheets:
        points = []
        for row_number, row in enumerate(sheet.iter_rows(min_row=2, values_only=True), start=2):
            if not row or row[0] is None:
                continue
            try:
                lon = float(row[1])
                lat = float(row[2])
            except (TypeError, ValueError, IndexError):
                problems.append(f"ARTC {sheet.title} row {row_number}: unreadable coordinates")
                continue
            if not (LAT_RANGE[0] <= lat <= LAT_RANGE[1] and LON_RANGE[0] <= lon <= LON_RANGE[1]):
                problems.append(f"ARTC {sheet.title} row {row_number}: {lat}, {lon} is outside Australia")
                continue
            points.append([round(lat, 6), round(lon, 6)])

        if len(points) < 2:
            problems.append(f"ARTC {sheet.title}: fewer than two usable points, sheet skipped")
            continue
        corridors.append({"name": sheet.title, "points": points})

    return corridors, problems


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    projects, problems = read_projects(sys.argv[1])
    corridors, corridor_problems = read_corridors(sys.argv[2])
    problems += corridor_problems

    page = pathlib.Path(__file__).resolve().parent.parent / "public" / "project-map.html"
    html = page.read_text(encoding="utf-8")
    if START not in html or END not in html:
        sys.exit(f"Could not find the MAP-DATA markers in {page}")

    block = (
        f"{START}\n"
        f"const PROJECTS = {json.dumps(projects, ensure_ascii=False, indent=2)};\n\n"
        f"const CORRIDORS = {json.dumps(corridors, ensure_ascii=False, indent=2)};\n"
        f"{END}"
    )
    head, rest = html.split(START, 1)
    _, tail = rest.split(END, 1)
    page.write_text(f"{head}{block}{tail}", encoding="utf-8")

    markers = sum(len(project["assets"]) for project in projects)
    vertices = sum(len(corridor["points"]) for corridor in corridors)
    print(f"Wrote {markers} markers across {len(projects)} projects to {page}")
    print(f"Wrote {len(corridors)} ARTC corridor segments ({vertices} points)")
    for problem in problems:
        print(f"  ! {problem}")


if __name__ == "__main__":
    main()
