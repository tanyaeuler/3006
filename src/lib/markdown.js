// A deliberately small markdown parser for journal posts.
//
// It covers exactly what the Journal needs — headings, paragraphs, bullet and
// numbered lists, blockquotes, and inline bold/italic/links — and nothing more.
// Keeping it in-house avoids pulling a parser plus a sanitiser into the bundle
// for five posts of first-party content.
//
// Output is a list of block descriptors; src/components/journal/Prose.jsx turns
// them into elements. Nothing is ever injected as raw HTML.

const HEADING = /^(#{2,4})\s+(.*)$/
const BULLET = /^[-*]\s+(.*)$/
const NUMBERED = /^\d+\.\s+(.*)$/
const QUOTE = /^>\s?(.*)$/

/**
 * Split inline markdown into styled runs.
 * Handles **bold**, *italic* and [text](href), including nesting-free overlap.
 */
export function parseInline(text) {
  const pattern = /(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g
  const runs = []
  let lastIndex = 0
  let match

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }

    const token = match[0]

    if (token.startsWith('**')) {
      runs.push({ type: 'strong', value: token.slice(2, -2) })
    } else if (token.startsWith('[')) {
      const split = token.indexOf('](')
      runs.push({
        type: 'link',
        value: token.slice(1, split),
        href: token.slice(split + 2, -1),
      })
    } else {
      runs.push({ type: 'em', value: token.slice(1, -1) })
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    runs.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return runs
}

/** Parse a markdown string into an array of block descriptors. */
export function parseMarkdown(source) {
  const blocks = []
  const lines = source.split('\n')

  let paragraph = []
  let list = null // { type: 'bullet' | 'numbered', items: [] }
  let quote = []

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', content: paragraph.join(' ') })
      paragraph = []
    }
  }

  function flushList() {
    if (list) {
      blocks.push({ type: 'list', ordered: list.type === 'numbered', items: list.items })
      list = null
    }
  }

  function flushQuote() {
    if (quote.length) {
      blocks.push({ type: 'quote', content: quote.join(' ') })
      quote = []
    }
  }

  function flushAll() {
    flushParagraph()
    flushList()
    flushQuote()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushAll()
      continue
    }

    const heading = line.match(HEADING)
    if (heading) {
      flushAll()
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        content: heading[2],
      })
      continue
    }

    const quoted = line.match(QUOTE)
    if (quoted) {
      flushParagraph()
      flushList()
      quote.push(quoted[1])
      continue
    }

    const bullet = line.match(BULLET)
    if (bullet) {
      flushParagraph()
      flushQuote()
      if (!list || list.type !== 'bullet') {
        flushList()
        list = { type: 'bullet', items: [] }
      }
      list.items.push(bullet[1])
      continue
    }

    const numbered = line.match(NUMBERED)
    if (numbered) {
      flushParagraph()
      flushQuote()
      if (!list || list.type !== 'numbered') {
        flushList()
        list = { type: 'numbered', items: [] }
      }
      list.items.push(numbered[1])
      continue
    }

    // Anything else continues the current paragraph.
    flushList()
    flushQuote()
    paragraph.push(line)
  }

  flushAll()
  return blocks
}
