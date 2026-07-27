import Botanical from '../ui/Botanical'
import ImageFrame from '../ui/ImageFrame'

const accents = {
  olive: {
    bar: 'bg-olive',
    role: 'text-olive',
    sprig: 'text-olive/20',
    hover: 'group-hover:border-olive',
  },
  blush: {
    bar: 'bg-blush',
    role: 'text-brown',
    sprig: 'text-blush/40',
    hover: 'group-hover:border-blush',
  },
  brown: {
    bar: 'bg-brown',
    role: 'text-brown',
    sprig: 'text-brown/20',
    hover: 'group-hover:border-brown',
  },
}

export default function VentureCard({ venture }) {
  const accent = accents[venture.accent] ?? accents.olive

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-line bg-raised transition-all duration-300 hover:shadow-lift ${accent.hover}`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${accent.bar}`} />

      <ImageFrame
        src={venture.image}
        alt={venture.imageAlt}
        label={`${venture.name} image`}
        shape="square"
        ratio="16 / 9"
        tone={venture.accent === 'olive' ? 'olive' : 'blush'}
      />

      <div className="relative flex flex-1 flex-col p-8">
        <Botanical
          variant="sprig"
          className={`absolute -right-4 top-4 h-24 w-16 ${accent.sprig}`}
        />

        <p className={`text-xs uppercase tracking-eyebrow ${accent.role}`}>{venture.role}</p>

        <h3 className="mt-3 text-2xl">{venture.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-eyebrow text-muted">{venture.domain}</p>

        <p className="mt-5 flex-1 text-sm leading-relaxed text-ink/80">{venture.summary}</p>

        <a
          href={venture.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-olive transition-colors hover:text-brown"
        >
          {venture.cta}
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
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  )
}
