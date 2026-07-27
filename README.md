# tanyaeuler.com

Personal brand site for Tanya Euler — brand and web designer in Flagstone,
South East Queensland. It pulls the separate ventures into one place and gives
the journal (reflections on faith, business and family) a home.

Built with React 19, Vite and Tailwind. No backend, no database — everything
is static and deploys to any host that can serve a SPA.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, the three convictions, the four ventures, faith, latest journal posts |
| `/about` | Story, timeline, the A.C.E. model, life off the clock |
| `/work` | Each venture in detail, alternating layout |
| `/faith` | The personal faith page |
| `/journal` | Post index with category filtering |
| `/journal/:slug` | Individual post |
| `/contact` | Enquiry form and direct links to each venture |

Anything else renders a 404 page.

## Editing content

Content is data, not markup — you should not need to touch a component to
change what the site says.

- **`src/data/site.js`** — name, tagline, email, location, social links, and
  the main navigation.
- **`src/data/ventures.js`** — the four projects (Artifex, my4280, Brandifex,
  Web Design Mentor): copy, service lists, links and which brand colour leads
  on each card.
- **`src/data/posts.js`** — journal posts. Append an object to add one; `body`
  is markdown.

> ⚠️ **The five journal posts are starter drafts.** They were written to give
> the Journal real shape and typography to sit on, in a plausible first-person
> voice. They are not Tanya's words and describe no real events. Rewrite or
> replace them before launch.

### Markdown supported in posts

Headings (`##`, `###`), paragraphs, bullet and numbered lists, blockquotes,
`**bold**`, `*italic*` and `[links](url)`. Parsed by `src/lib/markdown.js` and
rendered by `src/components/journal/Prose.jsx` — nothing is injected as raw
HTML, so posts cannot introduce script.

## Brand

Colours and type live in **one file**: `src/styles/theme.css`. Every colour
used anywhere resolves back to a variable there, and `tailwind.config.js` maps
those variables onto utility classes. Changing the palette means editing that
one block.

| Token | Value |
|---|---|
| Olive | `#6F7B44` |
| Blush | `#DDB09C` |
| Brown | `#806038` |
| Type | Poppins (loaded from Google Fonts in `index.html`) |

Everything else — the cream page background, the deep brown feature bands, the
hairline borders — is a tint or shade derived from those three, so the palette
stays coherent if you adjust one.

## Images

No photography has been supplied yet, so every image slot renders a branded
placeholder at the correct aspect ratio. **`public/images/README.md`** lists
every slot, its path and its suggested export size. Drop a file in at the
documented path and it appears — no code changes, no layout shift.

The placeholder is painted *behind* the `<img>` rather than swapped in on
error, so a missing, slow or lazily-deferred photo shows the placeholder
instead of a blank box, and a real photo simply covers it.

## Notes for deployment

- `public/_redirects` gives Netlify the SPA fallback. On other hosts, rewrite
  all unmatched paths to `/index.html` (Vercel: `rewrites`; Apache:
  `.htaccess`; Nginx: `try_files $uri /index.html`).
- The contact form has no backend. It composes a `mailto:` so it works from
  day one; swap `handleSubmit` in `src/pages/ContactPage.jsx` for a POST to
  Formspree, Netlify Forms or similar when you pick one. The fields already
  carry proper `name` attributes.
- Social links in `src/data/site.js` are best guesses — check them before
  launch.
