// Bundle the built site into one self-contained HTML file.
//
// Used to produce a shareable preview link. Everything — CSS, JS, fonts, the
// favicon — is inlined, so the file works with no network access at all and
// can be hosted anywhere (or opened straight off disk).
//
//   VITE_HASH_ROUTER=1 npm run build && node scripts/build-preview.mjs
//
// Routing uses hashes in this build (#/journal) because a standalone file has
// no server to rewrite unmatched paths. The deployed site keeps clean URLs.

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const DIST = join(ROOT, 'dist')
const OUT = join(ROOT, 'preview', 'tanyaeuler-preview.html')

let html = await readFile(join(DIST, 'index.html'), 'utf8')

// ---- Inline the fonts as data URIs -----------------------------------------
const assets = await readdir(join(DIST, 'assets'))
const cssName = assets.find((f) => f.endsWith('.css'))
const jsName = assets.find((f) => f.endsWith('.js'))

let css = await readFile(join(DIST, 'assets', cssName), 'utf8')

const fontFiles = await readdir(join(DIST, 'fonts'))
for (const file of fontFiles) {
  if (!file.endsWith('.woff2')) continue
  const b64 = (await readFile(join(DIST, 'fonts', file))).toString('base64')
  css = css.replaceAll(`/fonts/${file}`, `data:font/woff2;base64,${b64}`)
}

const js = await readFile(join(DIST, 'assets', jsName), 'utf8')
const favicon = await readFile(join(DIST, 'favicon.svg'), 'utf8')

// ---- Rewrite the document ---------------------------------------------------
// Every replacement passes a *function*, so `$&`, `$'` and friends occurring
// naturally inside the minified bundle are inserted literally instead of being
// treated as substitution patterns (which silently splices the document into
// itself and corrupts the output).
const replacements = [
  // Drop the font preloads; the faces are embedded in the stylesheet now.
  [/\s*<link\s+rel="preload"[\s\S]*?\/>/g, () => ''],
  [
    new RegExp(`<link[^>]*rel="stylesheet"[^>]*href="/assets/${cssName}"[^>]*>`),
    () => `<style>\n${css}\n</style>`,
  ],
  [
    new RegExp(`<script[^>]*src="/assets/${jsName}"[^>]*></script>`),
    () => `<script type="module">\n${js}\n</script>`,
  ],
  [
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    () =>
      `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}" />`,
  ],
]

for (const [pattern, replacer] of replacements) {
  const before = html
  html = html.replace(pattern, replacer)
  if (html === before) {
    throw new Error(`build-preview: pattern did not match — ${pattern}`)
  }
}

// The document must not reference any root-relative asset once inlined.
// Only the markup outside the inlined bundle is checked; the bundle's own
// string literals are not document references.
const markup = html.slice(0, html.indexOf('<style>')) + html.slice(html.lastIndexOf('</script>'))
const dangling = [...markup.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1])
if (dangling.length) {
  throw new Error(`build-preview: unresolved references — ${[...new Set(dangling)].join(', ')}`)
}

await writeFile(OUT, html)
console.log(`standalone: ${OUT} (${(html.length / 1024).toFixed(0)} KB)`)

// ---- Fragment build ---------------------------------------------------------
// Some hosts (the Artifact viewer among them) supply their own
// <!doctype>/<html>/<head>/<body> skeleton and expect page *content* only.
// Emit a second file with the document scaffolding stripped.
const FRAGMENT = join(ROOT, 'preview', 'tanyaeuler-artifact.html')

const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? 'Tanya Euler'
const styleBlock = html.slice(html.indexOf('<style>'), html.indexOf('</style>') + 8)
const scriptBlock = html.slice(html.indexOf('<script type="module">'), html.lastIndexOf('</script>') + 9)

await writeFile(
  FRAGMENT,
  `<title>${title}</title>\n${styleBlock}\n<div id="root"></div>\n${scriptBlock}\n`,
)
console.log(`fragment:   ${FRAGMENT}`)
