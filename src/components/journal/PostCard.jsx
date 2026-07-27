import { Link } from 'react-router-dom'

import { categories, formatDate } from '../../data/posts'
import ImageFrame from '../ui/ImageFrame'

const badgeTones = {
  olive: 'bg-olive-wash text-olive',
  brown: 'bg-blush-wash text-brown',
  blush: 'bg-blush/40 text-brown-dark',
}

export default function PostCard({ post, featured = false }) {
  const category = categories[post.category]
  const badge = badgeTones[category?.accent] ?? badgeTones.olive

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border border-line bg-raised transition-all duration-300 hover:shadow-lift ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      <Link
        to={`/journal/${post.slug}`}
        className={`block shrink-0 ${featured ? 'md:w-1/2' : ''}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ImageFrame
          src={post.cover}
          alt=""
          label="Post cover"
          shape="square"
          ratio={featured ? '4 / 3' : '3 / 2'}
          tone="blush"
          className="h-full"
        />
      </Link>

      <div className={`flex flex-1 flex-col p-8 ${featured ? 'md:p-10' : ''}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 text-[0.65rem] uppercase tracking-eyebrow ${badge}`}>
            {category?.label ?? 'Journal'}
          </span>
          <time dateTime={post.date} className="text-xs text-muted">
            {formatDate(post.date)}
          </time>
        </div>

        <h3 className={`mt-4 ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          <Link to={`/journal/${post.slug}`} className="transition-colors hover:text-brown">
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">{post.excerpt}</p>

        <div className="mt-7 flex items-center justify-between">
          <Link
            to={`/journal/${post.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-olive transition-colors hover:text-brown"
          >
            Read the post
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <span className="text-xs text-muted">{post.readingMinutes} min read</span>
        </div>
      </div>
    </article>
  )
}
