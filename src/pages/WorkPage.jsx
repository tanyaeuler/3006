import Botanical from '../components/ui/Botanical'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import ImageFrame from '../components/ui/ImageFrame'
import Section from '../components/ui/Section'
import { site } from '../data/site'
import { ventures } from '../data/ventures'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const accentText = {
  olive: 'text-olive',
  blush: 'text-brown',
  brown: 'text-brown',
}

const accentBullet = {
  olive: 'bg-olive',
  blush: 'bg-blush',
  brown: 'bg-brown',
}

export default function WorkPage() {
  useDocumentMeta({
    title: 'What I Do',
    description:
      'Artifex Marketing Studio, my4280.directory, Brandifex and Web Design Mentor — the four projects Tanya Euler runs, and what each one is for.',
  })

  return (
    <>
      {/* ------------------------------------------------------------ Page head */}
      <section className="relative overflow-hidden bg-blush-wash py-20 sm:py-24">
        <Botanical
          variant="branch"
          className="absolute -left-16 bottom-0 hidden h-48 w-80 scale-x-[-1] text-olive/20 lg:block"
        />

        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="rule" />
            <span className="eyebrow">What I do</span>
          </div>

          <h1 className="mt-7 text-4xl leading-tight sm:text-5xl">
            Four projects, each with a job to do.
          </h1>

          <p className="mt-8 leading-relaxed text-ink/80">
            They started as separate ideas and ended up as one practice: helping small businesses
            look, and be found, like the real thing. Here is what each one is and who it is for.
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------- Venture detail */}
      {ventures.map((venture, index) => {
        const flipped = index % 2 === 1
        const tone = index % 2 === 0 ? 'cream' : 'white'

        return (
          <Section key={venture.slug} tone={tone} id={venture.slug}>
            <div
              className={`grid items-center gap-14 lg:grid-cols-2 ${
                flipped ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="relative">
                <ImageFrame
                  src={venture.image}
                  alt={venture.imageAlt}
                  label={`${venture.name} image`}
                  ratio="4 / 3"
                  tone={venture.accent === 'olive' ? 'olive' : 'blush'}
                  className="shadow-card"
                />
                <span
                  className={`absolute -bottom-4 ${
                    flipped ? '-right-4' : '-left-4'
                  } -z-10 h-32 w-32 ${accentBullet[venture.accent] ?? 'bg-olive'} opacity-25`}
                  aria-hidden="true"
                />
              </div>

              <div>
                <span
                  className={`text-xs uppercase tracking-eyebrow ${
                    accentText[venture.accent] ?? 'text-olive'
                  }`}
                >
                  {venture.role}
                </span>

                <h2 className="mt-4 text-3xl sm:text-4xl">{venture.name}</h2>

                <p className="mt-2 text-xs uppercase tracking-eyebrow text-muted">
                  {venture.domain}
                </p>

                <p className="mt-7 leading-relaxed text-ink/80">{venture.description}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {venture.services.map((service) => (
                    <li key={service} className="flex items-start gap-3 text-sm text-ink/75">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 ${
                          accentBullet[venture.accent] ?? 'bg-olive'
                        }`}
                        aria-hidden="true"
                      />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button href={venture.href}>{venture.cta}</Button>
                </div>
              </div>
            </div>
          </Section>
        )
      })}

      {/* ------------------------------------------------------------------ CTA */}
      <section className="relative overflow-hidden bg-brown-dark py-20 text-on-deep sm:py-24">
        <Botanical
          variant="wreath"
          className="absolute -right-24 -top-20 h-96 w-96 text-blush/10"
        />

        <Container className="relative max-w-2xl text-center">
          <span className="eyebrow-on-deep">Not sure which one you need?</span>
          <h2 className="mt-5 text-3xl text-on-deep sm:text-4xl">
            Start with a conversation.
          </h2>
          <p className="mt-6 leading-relaxed text-on-deep-muted">
            Tell me what you are building and I will tell you honestly whether I am the right
            person for it — and if I am not, who is.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="onDeep">
              Get in touch
            </Button>
            <Button href={`mailto:${site.email}`} variant="ghostOnDeep">
              {site.email}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
