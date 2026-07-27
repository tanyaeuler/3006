import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { nav } from '../../data/site'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Logo from './Logo'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes — including on browser
  // back/forward. Adjusting state during render is React's recommended
  // alternative to an effect for deriving state from a prop change.
  const [menuPath, setMenuPath] = useState(location.pathname)
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `text-xs uppercase tracking-eyebrow transition-colors ${
      isActive ? 'text-brown' : 'text-ink/70 hover:text-olive'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'bg-cream/95 shadow-card backdrop-blur' : 'bg-cream'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-olive focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-eyebrow focus:text-cream"
      >
        Skip to content
      </a>

      <Container className="flex items-center justify-between py-5">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact">Work with me</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center text-olive lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            {open ? (
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `border-b border-line/70 py-4 text-sm uppercase tracking-eyebrow ${
                    isActive ? 'text-brown' : 'text-ink/75'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mt-6 self-start">
              Work with me
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
