import { Link } from 'react-router-dom'

/**
 * Wordmark lockup. Swap the markup here for an <img> once the real logo file
 * is supplied (public/images/brand/logo.svg) — nothing else references it.
 */
export default function Logo({ onDeep = false, className = '' }) {
  return (
    <Link
      to="/"
      className={`group inline-flex flex-col leading-none ${className}`}
      aria-label="Tanya Euler — home"
    >
      <span
        className={`font-display text-lg font-light tracking-[0.3em] transition-colors ${
          onDeep ? 'text-on-deep group-hover:text-blush' : 'text-olive group-hover:text-brown'
        }`}
      >
        TANYA
      </span>
      <span
        className={`font-display text-lg font-light tracking-[0.3em] transition-colors ${
          onDeep ? 'text-blush' : 'text-brown group-hover:text-olive'
        }`}
      >
        EULER
      </span>
    </Link>
  )
}
