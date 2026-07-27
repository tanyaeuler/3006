import { Link } from 'react-router-dom'

import PostCard from '../components/journal/PostCard'
import Botanical from '../components/ui/Botanical'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import ImageFrame from '../components/ui/ImageFrame'
import Section, { SectionHeading } from '../components/ui/Section'
import VentureCard from '../components/ventures/VentureCard'
import { sortedPosts } from '../data/posts'
import { site } from '../data/site'
import { ventures } from '../data/ventures'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const pillars = [
  {
    title: 'Design that tells the truth',
    body: 'A brand should look like what the business actually is. Most of my work is closing that gap for people who have outgrown the version of themselves their website still shows.',
  },
  {
    title: 'Built where I live',
    body: 'Flagstone, Jimboomba, and the 4280 districts around them. Local work for local people, and a directory to make them easier to find.',
  },
  {
    title: 'Faith at the centre',
    body: 'Not as a marketing angle. As the thing that decides how I price, how I speak to clients, and when I close the laptop.',
  },
]

export default function HomePage() {
  useDocumentMeta({
    title: null,
    description:
      'Tanya Euler — brand and web designer in Flagstone, Queensland. Artifex Marketing Studio, my4280.directory, Brandifex and Web Design Mentor, plus reflections on faith, business and family.',
  })

  const featured = sortedPosts.slice(0, 3)

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-cream">
        <Botanical
          variant="branch"
          className="absolute -right-16 top-4 hidden h-56 w-96 text-blush/40 lg:block"
        />
        <Botanical
          variant="sprig"
          className="absolute -left-6 bottom-0 hidden h-64 w-32 text-olive/15 lg:block"
        />

        <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <div className="flex items-center gap-4">
              <span className="rule" />
              <span className="eyebrow">{site.role} · {site.location}</span>
            </div>

            <h1 className="mt-7 text-4xl leading-[1.15] sm:text-5xl lg:text-[3.5rem]">
              Brand, business
              <br />
              and a life of{' '}
              <span className="relative whitespace-nowrap text-brown">
                faith
                <span className="absolute inset-x-0 -bottom-1 h-2 bg-blush/50" aria-hidden="true" />
              </span>
              .
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              {site.intro}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/work">See what I do</Button>
              <Button to="/journal" variant="outline">
                Read the journal
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <Botanical
              variant="wreath"
              className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] text-olive/20"
            />
            <ImageFrame
              src="/images/tanya-portrait.jpg"
              alt="Portrait of Tanya Euler"
              label="Portrait of Tanya"
              shape="circle"
              ratio="1 / 1"
              tone="blush"
              className="relative shadow-card"
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Pillars */}
      <Section tone="blush">
        <SectionHeading
          eyebrow="What holds it together"
          title="Four projects, one set of convictions."
          lead="Artifex, my4280, Brandifex and Web Design Mentor look like separate businesses. They run on the same three ideas."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="relative pl-14">
              <span
                className="absolute left-0 top-0 font-display text-4xl font-light text-blush"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <h3 className="text-xl">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Ventures */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="The work"
          title="Where you will find me."
          lead="Four projects, each doing a different job — client work, community, product and teaching."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {ventures.map((venture) => (
            <VentureCard key={venture.slug} venture={venture} />
          ))}
        </div>

        <div className="mt-12">
          <Button to="/work" variant="outline">
            More about each project
          </Button>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- Faith */}
      <section className="relative overflow-hidden bg-brown-dark py-20 text-on-deep sm:py-28">
        <Botanical
          variant="wreath"
          className="absolute -right-20 -top-16 h-96 w-96 text-blush/10"
        />

        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-4">
              <span className="block h-px w-12 bg-blush/60" />
              <span className="eyebrow-on-deep">Faith</span>
            </div>

            <h2 className="mt-7 max-w-lg text-3xl text-on-deep sm:text-4xl">
              The part that came first.
            </h2>

            <p className="mt-7 max-w-xl leading-relaxed text-on-deep-muted">
              I do not run a Christian business. I am a Christian who runs a business, which
              turns out to be a different thing and a much harder one. It shows up in the
              unglamorous places — what I charge, what I promise, whether I answer the phone at
              dinner.
            </p>

            <p className="mt-5 max-w-xl leading-relaxed text-on-deep-muted">
              The journal is where I think that through honestly, including the parts I have not
              worked out yet.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/faith" variant="onDeep">
                Read more
              </Button>
              <Button to="/journal" variant="ghostOnDeep">
                Latest reflections
              </Button>
            </div>
          </div>

          <figure className="relative mx-auto max-w-md border-l-2 border-blush/50 pl-8">
            <blockquote className="font-display text-xl font-light italic leading-relaxed text-on-deep sm:text-2xl">
              “Commit to the Lord whatever you do, and he will establish your plans.”
            </blockquote>
            <figcaption className="mt-5 text-xs uppercase tracking-eyebrow text-blush">
              Proverbs 16:3
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Journal */}
      <Section tone="cream">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The journal"
            title="Reflections on faith, business and family."
          />
          <Link
            to="/journal"
            className="text-xs uppercase tracking-eyebrow text-olive transition-colors hover:text-brown"
          >
            All posts →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ CTA */}
      <Section tone="blush" className="text-center">
        <Botanical
          variant="sprig"
          className="absolute -left-4 top-8 hidden h-40 w-24 text-olive/15 sm:block"
        />
        <Botanical
          variant="sprig"
          className="absolute -right-4 bottom-8 hidden h-40 w-24 scale-x-[-1] text-olive/15 sm:block"
        />

        <div className="relative mx-auto max-w-2xl">
          <span className="eyebrow">Let’s talk</span>
          <h2 className="mt-5 text-3xl sm:text-4xl">
            Ready to make your business look like what it actually is?
          </h2>
          <p className="mt-6 leading-relaxed text-ink/75">
            Whether you need a brand from scratch, a website that finally works, or someone to
            teach you how to run your own — start with a conversation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/contact">Get in touch</Button>
            <Button href={`mailto:${site.email}`} variant="outline">
              Email me directly
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
