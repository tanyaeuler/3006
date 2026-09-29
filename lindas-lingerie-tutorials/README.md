# Linda's Lingerie: tutorials page

A single static page that replaces the LearnDash site at `tutorials.lindaslingerie.com.au`.
It has no dependencies other than Google Fonts.

## Filling in the video links

In `index.html`, each lesson is one `<li>`. Replace `href="#"` with that lesson's Vimeo URL.
Any lesson still set to `#` shows greyed out with "link pending", so gaps are easy to spot.

## Deploying on cPanel

1. **File Manager:** create a folder, for example `public_html/tutorials/`, and upload `index.html` into it.
2. **Directory Privacy:** select that folder, tick "Password protect this directory", give it a name
   (this is shown in the login prompt), save, then create a user and password.
   Everyone shares one login, so pick a password you are happy to hand out.
3. **Test** in a private browser window: it should ask for the password and then load the page.

## Retiring the old subdomain

After LearnDash/WordPress is removed from `tutorials.lindaslingerie.com.au`, put this `.htaccess`
in the subdomain's document root so old bookmarks land on the new page:

```apache
RewriteEngine On
RewriteRule ^ https://lindaslingerie.com.au/tutorials/ [R=301,L]
```

## Vimeo

The videos are "Unlisted", so anyone who has a link can watch it. The cPanel password protects the list, not the videos themselves.
This was an accepted trade-off because the site owner is semi-retiring and does not need tight access control.
