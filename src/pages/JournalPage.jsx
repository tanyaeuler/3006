import { useMemo, useState } from 'react'

import PostCard from '../components/journal/PostCard'
import Botanical from '../components/ui/Botanical'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import { categories, sortedPosts } from '../data/posts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const filters = [
  { key: 'all', label: 'Everything' },
  ...Object.entries(categories).map(([key, value]) => ({ key, label: value.label })),
]

export default function JournalPage() {
  useDocumentMeta({
    title: 'Journal',
    description:
      'Personal reflections from Tanya Euler on faith in business, running a studio, and family life in South East Queensland.',
  })

  const [active, setActive] = useState('all')

  const visible = useMemo(
    () => (active === 'all' ? sortedPosts : sortedPosts.filter((p) => p.category === active)),
    [active],
  )

  const [lead, ...rest] = visible

  return (
    <>
      {/* ------------------------------------------------------------ Page head */}
      <section className="relative overflow-hidden bg-blush-wash py-20 sm:py-24">
        <Botanical
          variant="branch"
          className="absolute -right-16 -top-6 hidden h-40 w-64 text-olive/20 lg:block"
        />

        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="rule" />
            <span className="eyebrow">The journal</span>
          </div>

          <h1 className="mt-7 text-4xl leading-tight sm:text-5xl">
            Faith, business and family — thought through out loud.
          </h1>

          <p className="mt-8 leading-relaxed text-ink/80">
            Personal reflections rather than marketing advice. What it actually looks like to run
            a studio, raise a family and keep faith at the centre of both — including the parts I
            have not worked out yet.
          </p>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Filters */}
      <div className="sticky top-[73px] z-30 border-y border-line bg-cream/95 backdrop-blur">
        <Container className="flex flex-wrap gap-2 py-4">
          {filters.map((filter) => {
            const isActive = active === filter.key
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                aria-pressed={isActive}
                className={`px-5 py-2 text-xs uppercase tracking-eyebrow transition-colors ${
                  isActive
                    ? 'bg-olive text-cream'
                    : 'border border-line text-ink/65 hover:border-olive hover:text-olive'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </Container>
      </div>

      {/* ---------------------------------------------------------------- Posts */}
      <Section tone="cream">
        {visible.length === 0 ? (
          <p className="py-16 text-center text-muted">
            Nothing here yet — try another category.
          </p>
        ) : (
          <div className="space-y-8">
            <PostCard post={lead} featured />

            {rest.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  )
}
