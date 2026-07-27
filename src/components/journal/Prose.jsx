import { Fragment, useMemo } from 'react'

import { parseInline, parseMarkdown } from '../../lib/markdown'

function Inline({ text }) {
  const runs = useMemo(() => parseInline(text), [text])

  return runs.map((run, i) => {
    if (run.type === 'strong') {
      return (
        <strong key={i} className="font-medium text-ink">
          {run.value}
        </strong>
      )
    }
    if (run.type === 'em') {
      return (
        <em key={i} className="italic">
          {run.value}
        </em>
      )
    }
    if (run.type === 'link') {
      const external = /^https?:\/\//.test(run.href)
      return (
        <a
          key={i}
          href={run.href}
          className="link-underline text-olive"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {run.value}
        </a>
      )
    }
    return <Fragment key={i}>{run.value}</Fragment>
  })
}

/** Renders parsed markdown blocks with the site's long-form typography. */
export default function Prose({ markdown, className = '' }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown])

  return (
    <div className={`max-w-measure ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          const Tag = `h${block.level}`
          const size =
            block.level === 2 ? 'text-2xl sm:text-3xl' : block.level === 3 ? 'text-xl' : 'text-lg'
          return (
            <Tag key={i} className={`mt-12 first:mt-0 ${size}`}>
              <Inline text={block.content} />
            </Tag>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="my-10 border-l-2 border-blush bg-blush-wash/60 py-6 pl-7 pr-6"
            >
              <p className="font-display text-lg font-light italic leading-relaxed text-brown">
                <Inline text={block.content} />
              </p>
            </blockquote>
          )
        }

        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul'
          return (
            <Tag
              key={i}
              className={`mt-6 space-y-3 pl-6 text-ink/85 ${
                block.ordered ? 'list-decimal marker:text-olive' : 'list-disc marker:text-blush'
              }`}
            >
              {block.items.map((item, j) => (
                <li key={j} className="pl-1 leading-relaxed">
                  <Inline text={item} />
                </li>
              ))}
            </Tag>
          )
        }

        return (
          <p key={i} className="mt-6 leading-[1.85] text-ink/85 first:mt-0">
            <Inline text={block.content} />
          </p>
        )
      })}
    </div>
  )
}
