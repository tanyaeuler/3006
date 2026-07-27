import { useEffect } from 'react'

import { site } from '../data/site'

function setMeta(selector, attr, value) {
  let tag = document.head.querySelector(selector)
  if (!tag) return () => {}

  const previous = tag.getAttribute(attr)
  tag.setAttribute(attr, value)
  return () => tag.setAttribute(attr, previous ?? '')
}

/**
 * Keep <title> and the description/OG tags in step with the current route.
 * A tiny stand-in for a head manager — enough for a site this size.
 */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
    const previousTitle = document.title
    document.title = fullTitle

    const restore = [
      setMeta('meta[property="og:title"]', 'content', fullTitle),
      description && setMeta('meta[name="description"]', 'content', description),
      description && setMeta('meta[property="og:description"]', 'content', description),
    ].filter(Boolean)

    return () => {
      document.title = previousTitle
      restore.forEach((undo) => undo())
    }
  }, [title, description])
}
