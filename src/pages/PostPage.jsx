import { Link, Navigate, useParams } from 'react-router-dom'

import PostCard from '../components/journal/PostCard'
import Prose from '../components/journal/Prose'
import Botanical from '../components/ui/Botanical'
import Container from '../components/ui/Container'
import ImageFrame from '../components/ui/ImageFrame'
import Section, { SectionHeading } from '../components/ui/Section'
import { categories, formatDate, getPost, sortedPosts } from '../data/posts'
import { site } from '../data/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function PostPage() {
  const { slug } = useParams()
  const post = getPost(slug)

  useDocumentMeta({
    title: post?.title ?? 'Journal',
    description: post?.excerpt,
  })

  if (!post) {
    return <Navigate to="/journal" replace />
  }

  const category = categories[post.category]
  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      {/* ------------------------------------------------------------ Post head */}
      <section className="relative overflow-hidden bg-blush-wash py-16 sm:py-20">
        <Botanical
          variant="sprig"
          className="absolute -left-2 bottom-0 hidden h-48 w-24 text-olive/15 lg:block"
        />

        <Container className="relative max-w-3xl">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-olive transition-colors hover:text-brown"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back to the journal
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="bg-olive px-3 py-1 text-[0.65rem] uppercase tracking-eyebrow text-cream">
              {category?.label ?? 'Journal'}
            </span>
            <time dateTime={post.date} className="text-xs text-muted">
              {formatDate(post.date)}
            </time>
            <span className="text-xs text-muted">· {post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>

          <p className="mt-6 text-lg leading-relaxed text-ink/75">{post.excerpt}</p>
        </Container>
      </section>

      {/* ----------------------------------------------------------- Post cover */}
      <Container className="max-w-4xl">
        <ImageFrame
          src={post.cover}
          alt={post.coverAlt ?? ''}
          label="Post cover image"
          ratio="16 / 9"
          tone="blush"
          className="-mt-10 shadow-card"
        />
      </Container>

      {/* ---------------------------------------------------------- Post body */}
      <article className="bg-cream py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Prose markdown={post.body} className="mx-auto" />

          <div className="mx-auto mt-16 max-w-measure border-t border-line pt-10">
            <div className="flex flex-wrap items-center gap-5">
              <ImageFrame
                src="/images/tanya-avatar.jpg"
                alt=""
                label="TE"
                shape="circle"
                ratio="1 / 1"
                tone="olive"
                className="w-16 shrink-0"
              />
              <div>
                <p className="font-display text-lg">{site.name}</p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                  {site.role} in {site.location}. Writing about faith, business and family at{' '}
                  {site.domain}.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* ------------------------------------------------------ Related reading */}
      {related.length > 0 && (
        <Section tone="blush">
          <SectionHeading eyebrow="Keep reading" title="More from the journal." />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
