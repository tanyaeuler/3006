# Exit Ready Scorecard: presenter notes

For Tanya. Not for the client.

## Before the meeting

Open `index.html` by double-clicking it. No server, no internet, no install. Works from a
Downloads folder, works on a plane. Nothing is stored and nothing is sent, so you can run it
as many times as you like and it always starts clean on reload.

Add `?demo=1` to the address to bring up the presenter bar, or click the faint **DEMO** circle
in the bottom right corner. The bar is dark, sits at the bottom, and is obviously a control
strip rather than part of the tool. Hide it with **Hide** before you hand the laptop over.

Useful direct links (paste after the file path):

| Link | Lands on |
|---|---|
| `?demo=1` | Screen 1, presenter bar open |
| `?fill=ready` | Result, 88, Market Ready |
| `?fill=nearly` | Result, 68, Nearly Ready |
| `?fill=notyet` | Result, 39, Not Yet Ready |
| `?fill=significant` | Result, 22, Significant Work Required |
| `?fill=nearly&adviser=1` | Straight into the adviser inbox view |
| `?screen=6` | The details screen |
| `?selftest=1` | Runs the band boundary checks, results in the browser console |

## Running it, about seven minutes

**1. Open cold on screen 1. Do not touch the demo bar yet.** Answer question one yourself,
out loud, as if you were the owner. Say: *"Ten questions, five areas, two per screen. Every
one is a single tap. Nobody has to type anything until the last screen."* Click through to
screen 2 so they see the progress bar move, then stop.

**2. Say the thing about the audience.** *"This is built for a 65 year old who is not
comfortable online and does not want anyone to know they are thinking about this. Big type,
big tap targets, no jargon, no login, no account. It works on a phone one-handed."* If you
have your phone, hand it over at this point with the file already open.

**3. Bring up the demo bar and hit Nearly Ready.** Say: *"Nobody sits through ten questions
in a meeting, so these four buttons fill it in for you. Different fictional business each
time."* Let the dial animate. Do not talk over it.

**4. Walk the result screen slowly, top to bottom.** The score, the band, the three sentences,
then the five bars. Point at the bars: *"This is the bit that matters. The number gets their
attention, the shape tells them where the problem is."* Then the two focus areas: *"We name
the two weakest and tell them what a buyer would make of that gap. It reads as a work list,
not a verdict. Nobody gets told their business is bad."*

**5. Run Significant Work Required.** This is the important one. Say: *"A 22 is your best
lead, not your worst. Look at the copy. It does not flatter them and it does not insult them.
It says the list is long and it needs a sequence, which is exactly what you sell."*

**6. Then the payoff: Show what the adviser receives.** Leave it on screen and stop talking
for a beat. Then: *"That is what lands in your inbox. Score, band, the two weak areas, every
answer, full contact details, and a routing tier that tells you what to do and by when. Tier A
gets a call in 48 hours. Tier V goes straight to a valuation enquiry, and note that this one
scored 68, so the routing is not driven by the score. It is a qualification system, not a quiz."*

**7. Close on Reset**, so it is back at screen 1 if they want to click through themselves.

## If a director pushes back

Every question, option, point value, threshold and paragraph of copy sits in one `CONFIG`
object at the top of `index.html`, above a line marked `END OF CONFIG`. Open the file in any
text editor, change the wording or a `min:` threshold, save, reload the browser. That is the
whole edit loop. You can do it in front of them.

- Threshold argument: `CONFIG.bands[n].min`.
- Question wording: `CONFIG.questions[n].text`.
- Tie-break order for the two weakest areas: the order of `CONFIG.dimensions`.
- Routing rules: `CONFIG.tiers`, evaluated top down, first match wins.

## Things to flag to them before they ask

- **The copy is draft.** The banner says so. It is written to be plausible, not signed off.
- **"Compare your result to similar businesses"** on the details screen implies a benchmark
  set. If they do not have one, that line has to change. Their call.
- **No numbers anywhere.** No statistics, no case studies, no track record claims, and no
  suggestion of what a business might be worth or what a sale might achieve. That is
  deliberate and it is not negotiable without advice.
- **The CTA says "nothing proceeds unless you ask it to", not "free".** If the twenty minutes
  is genuinely no cost, tell me and I will put it in.
- **The logo is a text placeholder** and the typeface is a system stack, because the brand
  files were not available. Colours are their navy, gold and light grey. Send me the logo
  file and the typeface and it takes ten minutes.

## What has been checked

- Band boundaries at 0, 29, 30, 54, 55, 79, 80 and 100 all land in the correct band, verified
  against the shipped code rather than a copy of it. All 100 possible scores resolve to
  exactly one band.
- All four fill buttons produce the intended score, band, routing tier and pair of weakest
  dimensions: 88 / Tier A, 68 / Tier V, 39 / Tier B, 22 / Tier C.
- Nine routing rule cases including every tier override.
- No network requests, no external files, no fonts fetched, no storage of any kind.
- Renders correctly from 305px wide up to a projector, and at 200 per cent zoom.
- No em-dashes, no emoji, Australian English throughout.
