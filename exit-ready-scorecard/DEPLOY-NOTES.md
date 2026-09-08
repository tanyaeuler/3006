# Putting the prototype on their web server without it being found

## The thing to get right first

**Do not add this folder to robots.txt.** It is the obvious move and it is the wrong one,
for two reasons.

1. `robots.txt` is a public file. Anyone can read `micasabusinessadvisory.com.au/robots.txt`
   in a browser. Adding `Disallow: /exit-ready-scorecard/` publishes the exact URL you are
   trying to keep quiet. Competitors and bored people read robots.txt.
2. `Disallow` blocks crawling, not indexing. If Google is told not to crawl the folder, it
   cannot read the `noindex` instruction inside it. A URL that is blocked but linked from
   somewhere can still appear in results as a bare link. Blocking makes de-indexing harder,
   not easier.

The right approach is the opposite: let crawlers in, and have every response tell them
plainly not to index it.

## What to upload

Upload the whole folder. Which config file you need depends on the server:

| File | Use it when | Notes |
|---|---|---|
| `.htaccess` | Apache: cPanel, Plesk, most Australian shared hosting | Almost certainly this one |
| `web.config` | Windows / IIS hosting | Delete `.htaccess` if you use this |
| `_headers` | Netlify or Cloudflare Pages | Must sit at the site root, not in the subfolder |

Delete the two you do not need. If you are not sure which the server is, upload `.htaccess`
and `web.config` together: each is ignored by the server that does not use it.

**`.htaccess` starts with a dot, so it is hidden.** In cPanel File Manager turn on
Settings, Show Hidden Files before you upload, or it will look like it did not arrive. Some
FTP clients skip dotfiles by default too. Check it is there after uploading.

## The four layers, weakest to strongest

1. **`<meta name="robots" content="noindex, nofollow">`** is already in `index.html`. Nothing
   to do.
2. **`X-Robots-Tag` header** from the config file. Same instruction, sent on every file in the
   folder rather than only the HTML, and it works even if someone links straight to a file.
   This is the one that does the real work.
3. **An unguessable folder name.** The cheapest and most effective measure by a distance. Do
   not call it `/exit-ready-scorecard/`. Call it something nobody would type, for example
   `/er-4k9x2m/`. If you use `_headers`, update the path inside it to match.
4. **A password.** The only thing that actually stops a person who has the URL. Everything
   above is a polite request to robots. On cPanel it is Directory Privacy, point it at the
   folder, add one user. By hand on Apache:

   ```
   htpasswd -c /home/YOURACCOUNT/.htpasswd micasa
   ```

   Put that file above the web root so it cannot be downloaded, then uncomment the four
   `Auth` lines at the bottom of `.htaccess` and set `AuthUserFile` to its full path.

## What I would actually do

For two directors clicking through a prototype in a meeting and afterwards on their own:
unguessable folder name plus the `.htaccess`. That is enough, and it keeps the link to one
click with nothing to remember.

Add the password as well if you are emailing the link and you would mind it being forwarded.
For this firm, a password login is arguably on message rather than an obstacle: the whole
pitch is discretion.

## Also worth knowing

- The config also sends `Referrer-Policy: no-referrer` and `Cache-Control: private, no-store`,
  so the URL is not passed to any site a visitor clicks through to and the page is not held in
  proxy or CDN caches.
- `Options -Indexes` stops the server listing the folder contents if `index.html` is ever
  renamed or missing. A small number of locked down shared hosts refuse that directive and
  answer with a 500 error. If the folder throws a 500 straight after you upload `.htaccess`,
  delete that one line and everything else still works. It is the only line in the file that
  can do that.
- If the site runs WordPress, a real folder containing a real `index.html` is served directly
  and WordPress never sees the request, so there is no conflict with its rewrite rules.
- **Do not link to it from anywhere.** Not the site, not a newsletter, not LinkedIn. An
  unlinked page with a `noindex` header is not going to be found.
- The prototype still stores nothing and sends nothing. Putting it on a server does not change
  that: everything a visitor types stays in their browser tab and is gone on reload.

## Checking it worked

Once it is up, from a terminal:

```
curl -sI https://micasabusinessadvisory.com.au/YOUR-FOLDER/ | grep -i x-robots-tag
```

You should see the `X-Robots-Tag` line come back. If nothing comes back, the header is not
being applied: on Apache that usually means `mod_headers` is off, and the host can enable it.
