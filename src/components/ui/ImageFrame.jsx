const shapes = {
  circle: 'rounded-full',
  arch: 'rounded-t-[999px] rounded-b-lg',
  soft: 'rounded-lg',
  square: 'rounded-sm',
}

const tones = {
  olive: 'bg-olive-wash text-olive border-olive-light',
  blush: 'bg-blush-wash text-brown border-blush',
  deep: 'bg-brown-mid/20 text-blush border-blush/40',
}

/**
 * Image slot with a branded fallback.
 *
 * The placeholder is painted as a layer *underneath* the <img> rather than
 * swapped in on error. That way it shows through whenever the photo is
 * missing, still loading, or lazily deferred below the fold — no blank boxes
 * and no broken-image icons — and disappears the moment a real photo paints
 * over it. Drop a file in at `src` (see public/images/README.md) and it just
 * appears; no layout changes needed.
 */
export default function ImageFrame({
  src,
  alt = '',
  shape = 'soft',
  ratio = '4 / 5',
  label,
  className = '',
  imgClassName = '',
  tone = 'blush',
}) {
  return (
    <div
      className={`relative overflow-hidden ${shapes[shape] ?? shapes.soft} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed px-6 text-center ${
          tones[tone] ?? tones.blush
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.8" />
          <path d="m4 17 5-5 4 4 3-2 4 4" />
        </svg>
        <span className="text-[0.7rem] uppercase tracking-eyebrow">
          {label ?? alt ?? 'Image'}
        </span>
      </div>

      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`relative h-full w-full object-cover ${imgClassName}`}
          /* A failed load leaves an empty box; hiding it reveals the
             placeholder layer behind instead of a broken-image glyph. */
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
        />
      )}
    </div>
  )
}
