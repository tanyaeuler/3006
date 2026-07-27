import Botanical from '../components/ui/Botanical'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import ImageFrame from '../components/ui/ImageFrame'
import Section, { SectionHeading } from '../components/ui/Section'
import { site } from '../data/site'
import { useDocumentMeta } from '../lib/useDocumentMeta'

// The A.C.E. model as used across the Artifex / Flourish material.
const framework = [
  {
    letter: 'A',
    title: 'Create Authority',
    body: 'Embed your expertise in a brand that looks like it belongs to someone who knows what they are doing — because you do.',
  },
  {
    letter: 'C',
    title: 'Amplify Conversions',
    body: 'Turn attention into enquiries with a site that guides people to the one thing you actually want them to do.',
  },
  {
    letter: 'E',
    title: 'Optimise Engagement',
    body: 'Keep it alive with content, maintenance and the unglamorous upkeep that stops a good site going stale.',
  },
]

const timeline = [
  {
    period: 'The start',
    title: 'Twenty-five years ago, with a scalpel and a lightbox',
    body: 'I came up through print — graphic design, brand identity, and the kind of production work where a mistake cost you a plate change. It taught me to care about the two millimetres nobody consciously notices.',
  },
  {
    period: 'The shift',
    title: 'From print to pixels, without losing the craft',
    body: 'The web arrived and a lot of design got worse before it got better. I moved across, kept the typographic discipline, and learned to build the thing as well as draw it.',
  },
  {
    period: 'Now',
    title: 'A studio, a directory, a product line and a classroom',
    body: 'Artifex Marketing Studio is the core. Around it sit my4280.directory, Brandifex and Web Design Mentor — each one an answer to a question clients kept asking me.',
  },
]

export default function AboutPage() {
  useDocumentMeta({
    title: 'About',
    description:
      'Tanya Euler — twenty-five years in brand, print and web design, working from Flagstone in South East Queensland. The story behind Artifex, my4280, Brandifex and Web Design Mentor.',
  })

  return (
    <>
      {/* ------------------------------------------------------------ Page head */}
      <section className="relative overflow-hidden bg-cream">
        <Botanical
          variant="branch"
          className="absolute -right-12 top-6 hidden h-48 w-80 text-blush/35 lg:block"
        />

        <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div className="relative mx-auto w-full max-w-sm">
            <ImageFrame
              src="/images/tanya-about.jpg"
              alt="Tanya Euler at work in the studio"
              label="Portrait — studio"
              shape="arch"
              ratio="3 / 4"
              tone="olive"
              className="shadow-card"
            />
            <span
              className="absolute -bottom-5 -left-5 -z-10 h-40 w-40 bg-blush/40"
              aria-hidden="true"
            />
          </div>

          <div>
            <div className="flex items-center gap-4">
              <span className="rule" />
              <span className="eyebrow">About</span>
            </div>

            <h1 className="mt-7 text-4xl leading-tight sm:text-5xl">
              Hello — I’m Tanya.
            </h1>

            <p className="mt-8 leading-relaxed text-ink/80">
              I am a brand and web designer with twenty-five years behind me, working from a
              house in {site.location}. I have designed logos on paper and websites on deadline,
              and I have learned that the two jobs are the same job: making something look like
              what it truly is.
            </p>

            <p className="mt-5 leading-relaxed text-ink/80">
              Most of my clients are women who have left a professional career to build their own
              thing. They know their field cold. What they usually do not have is a brand that
              says so, and the confidence gap between those two facts is what I spend my days
              closing.
            </p>

            <p className="mt-5 leading-relaxed text-ink/80">
              Outside the studio I am a wife and a mum, and a Christian — which is less a section
              of my life than the frame the rest of it sits in.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/work">What I do</Button>
              <Button to="/faith" variant="outline">
                What I believe
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Timeline */}
      <Section tone="blush">
        <SectionHeading
          eyebrow="The long version"
          title="How I got here."
          lead="Twenty-five years is a lot of ground. Roughly, it went like this."
        />

        <div className="mt-16 space-y-12">
          {timeline.map((entry, i) => (
            <div
              key={entry.title}
              className="grid gap-4 border-t border-olive-light/50 pt-8 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <div>
                <span className="eyebrow">{entry.period}</span>
                <p className="mt-2 font-display text-3xl font-light text-blush">0{i + 1}</p>
              </div>
              <div>
                <h3 className="text-xl">{entry.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{entry.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Framework */}
      <section className="relative overflow-hidden bg-brown-dark py-20 text-on-deep sm:py-28">
        <Botanical
          variant="wreath"
          className="absolute -bottom-10 -left-24 h-96 w-96 text-blush/10"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow="How I work"
            title="The A.C.E. model."
            lead="Every brand and website project I run moves through the same three stages. It keeps the work honest and the scope visible."
            align="center"
            onDeep
            className="mx-auto"
          />

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {framework.map((stage) => (
              <div key={stage.letter} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-blush/50">
                  <span className="font-display text-3xl font-light text-blush">
                    {stage.letter}
                  </span>
                </div>
                <h3 className="mt-6 text-xl text-on-deep">{stage.title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-on-deep-muted">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-16 max-w-xl text-center text-xs uppercase leading-loose tracking-eyebrow text-blush">
            Done-for-you brand design and marketing strategies
            <br />
            for people stepping into their time to shine.
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Off-clock */}
      <Section tone="cream">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Off the clock"
              title="The rest of it."
              lead="Because a personal site that only lists services is not really a personal site."
            />

            <ul className="mt-10 space-y-5">
              {[
                'Church, family, and a dinner table that gets used.',
                'A garden I am slowly winning against.',
                'Long-running arguments about typefaces that nobody else finds interesting.',
                'The 4280 community, which I am invested in well beyond the directory.',
              ].map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-blush" aria-hidden="true" />
                  <span className="leading-relaxed text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <ImageFrame
              src="/images/about-1.jpg"
              alt="Design work in progress"
              label="Studio detail"
              ratio="3 / 4"
              tone="blush"
            />
            <ImageFrame
              src="/images/about-2.jpg"
              alt="The Flagstone district"
              label="Home ground"
              ratio="3 / 4"
              tone="olive"
              className="mt-10"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
