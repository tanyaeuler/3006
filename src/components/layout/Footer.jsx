import { Link } from 'react-router-dom'

import { nav, site } from '../../data/site'
import { ventures } from '../../data/ventures'
import Botanical from '../ui/Botanical'
import Container from '../ui/Container'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-brown-dark text-on-deep">
      <Botanical
        variant="branch"
        className="absolute -left-10 bottom-0 h-40 w-72 text-blush/15"
      />

      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-light tracking-[0.3em] text-on-deep">
              TANYA
            </p>
            <p className="font-display text-xl font-light tracking-[0.3em] text-blush">
              EULER
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-deep-muted">
              {site.tagline} Designing brands and websites from {site.location}.
            </p>
          </div>

          <div>
            <h2 className="eyebrow-on-deep">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-on-deep-muted transition-colors hover:text-blush"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow-on-deep">Projects</h2>
            <ul className="mt-5 space-y-3">
              {ventures.map((venture) => (
                <li key={venture.slug}>
                  <a
                    href={venture.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-on-deep-muted transition-colors hover:text-blush"
                  >
                    {venture.domain}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow-on-deep mt-8">Say hello</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block text-sm text-on-deep-muted transition-colors hover:text-blush"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-blush/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-on-deep-muted">
            © {year} {site.name}. All rights reserved.
          </p>

          <ul className="flex gap-6">
            {site.social.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-eyebrow text-on-deep-muted transition-colors hover:text-blush"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
