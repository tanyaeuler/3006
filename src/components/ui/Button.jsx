import { Link } from 'react-router-dom'

// The live site uses a solid olive rectangle with light, wide-tracked type.
const base =
  'inline-flex items-center justify-center gap-2 px-7 py-3 text-xs uppercase tracking-eyebrow font-medium transition-colors duration-200 rounded-sm'

const variants = {
  primary: 'bg-olive text-cream hover:bg-olive-dark',
  outline: 'border border-olive text-olive hover:bg-olive hover:text-cream',
  blush: 'bg-blush text-brown-dark hover:bg-blush-light',
  onDeep: 'bg-blush text-brown-dark hover:bg-cream',
  ghostOnDeep:
    'border border-blush/60 text-on-deep hover:bg-blush hover:text-brown-dark hover:border-blush',
}

/**
 * Renders a react-router <Link> for internal `to`, an <a> for external `href`,
 * and a <button> otherwise — so callers never have to think about it.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
