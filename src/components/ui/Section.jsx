import Container from './Container'

const tones = {
  cream: 'bg-cream text-ink',
  blush: 'bg-blush-wash text-ink',
  olive: 'bg-olive-wash text-ink',
  deep: 'bg-brown-dark text-on-deep',
  white: 'bg-raised text-ink',
}

export default function Section({
  tone = 'cream',
  className = '',
  containerClassName = '',
  id,
  children,
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-28 ${tones[tone] ?? tones.cream} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

/** Eyebrow + heading + optional lead paragraph, used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  onDeep = false,
  className = '',
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} gap-4 ${className}`}>
      {eyebrow && (
        <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} gap-3`}>
          <span className={onDeep ? 'eyebrow-on-deep' : 'eyebrow'}>{eyebrow}</span>
          <span className={`rule ${onDeep ? 'bg-blush/60' : ''}`} />
        </div>
      )}

      <h2
        className={`max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem] ${
          onDeep ? 'text-on-deep' : ''
        }`}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`max-w-2xl text-base sm:text-lg ${
            onDeep ? 'text-on-deep-muted' : 'text-muted'
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
