import PostCard from '../components/journal/PostCard'
import Botanical from '../components/ui/Botanical'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import ImageFrame from '../components/ui/ImageFrame'
import Section, { SectionHeading } from '../components/ui/Section'
import { sortedPosts } from '../data/posts'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const convictions = [
  {
    title: 'Honest numbers',
    body: 'A quote that I would be glad to start on Monday, given to a stranger and a friend alike. If I want to be generous, I name it rather than hiding it inside the invoice.',
  },
  {
    title: 'Promises I can keep',
    body: 'I would rather lose a project than win it on a timeline I know is fiction. Saying no early is a kindness; saying yes and disappearing is not.',
  },
  {
    title: 'A day that ends',
    body: 'The laptop closes at 3pm most days. Not because the work does not matter, but because the people it is meant to serve are also at my dinner table.',
  },
  {
    title: 'Telling the truth about the work',
    body: 'Design that makes something look like more than it is helps nobody. The job is to close the gap between what a business is and how it appears — in that direction.',
  },
]

export default function FaithPage() {
  useDocumentMeta({
    title: 'Faith',
    description:
      'Not a Christian business — a Christian who runs a business. How faith shapes pricing, promises, boundaries and the work itself.',
  })

  const faithPosts = sortedPosts.filter((post) => post.category === 'faith').slice(0, 2)

  return (
    <>
      {/* ------------------------------------------------------------ Page head */}
      <section className="relative overflow-hidden bg-brown-dark py-20 text-on-deep sm:py-28">
        <Botanical
          variant="wreath"
          className="absolute -right-16 -top-12 h-80 w-80 text-blush/10"
        />
        <Botanical
          variant="sprig"
          className="absolute -left-4 bottom-0 h-56 w-28 text-blush/10"
        />

        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-blush/60" />
            <span className="eyebrow-on-deep">Faith</span>
          </div>

          <h1 className="mt-7 text-4xl leading-tight text-on-deep sm:text-5xl">
            The part that came first.
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-on-deep-muted">
            I do not run a Christian business. I am a Christian who runs a business — which is a
            different thing, and a considerably harder one.
          </p>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Essay */}
      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-measure">
            <p className="text-lg leading-relaxed text-ink/85">
              For a long time I kept these two things in separate rooms. Faith was Sunday and the
              quiet parts of the week. Work was invoices, deadlines and whether the logo was
              working at 16 pixels. I did not think either one had much to say to the other.
            </p>

            <p className="mt-6 leading-[1.85] text-ink/85">
              What changed my mind was not a sermon. It was noticing that every difficult decision
              in my business — what to charge, what to promise, when to stop — was already a
              decision about character, whether or not I was willing to call it that.
            </p>

            <h2 className="mt-12 text-2xl sm:text-3xl">Where it actually shows up</h2>

            <p className="mt-6 leading-[1.85] text-ink/85">
              Not in a fish symbol in the footer. Not in scripture on the invoice. It shows up in
              places nobody sees: the quote I did not shade downward to avoid a hard conversation,
              the scope creep I named on the Tuesday instead of resenting for six weeks, the
              client I referred elsewhere because the work was not mine to do well.
            </p>

            <blockquote className="my-10 border-l-2 border-blush bg-blush-wash/60 py-6 pl-7 pr-6">
              <p className="font-display text-lg font-light italic leading-relaxed text-brown">
                “Whatever you do, work at it with all your heart, as working for the Lord, not for
                human masters.”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-eyebrow text-olive">
                Colossians 3:23
              </footer>
            </blockquote>

            <p className="leading-[1.85] text-ink/85">
              I have read that verse most of my life as being about effort. Lately I read it as
              being about audience — who the work is actually addressed to. It changes what
              “finished” means, and it makes the two-millimetre decisions feel less absurd.
            </p>

            <h2 className="mt-12 text-2xl sm:text-3xl">What this is not</h2>

            <p className="mt-6 leading-[1.85] text-ink/85">
              This page is not a filter on who I work with. I have designed for people of every
              belief and none, and I would be a poor designer if my convictions arrived in
              somebody else’s brand uninvited. Your logo is yours.
            </p>

            <p className="mt-6 leading-[1.85] text-ink/85">
              It is here because this is a personal site, and leaving out the thing that decides
              how I run the rest of it would make the whole thing slightly dishonest.
            </p>
          </div>

          <aside className="lg:pt-4">
            <ImageFrame
              src="/images/faith.jpg"
              alt="An open Bible and a notebook"
              label="Faith image"
              shape="arch"
              ratio="3 / 4"
              tone="olive"
              className="shadow-card"
            />
          </aside>
        </div>
      </Section>

      {/* --------------------------------------------------------- Convictions */}
      <Section tone="blush">
        <SectionHeading
          eyebrow="In practice"
          title="Four things it costs me."
          lead="Convictions that never cost anything are not convictions. These ones do."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {convictions.map((item) => (
            <div key={item.title} className="border-t-2 border-olive-light bg-raised p-8">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- Related posts */}
      {faithPosts.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="From the journal"
            title="Thinking it through out loud."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {faithPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-12">
            <Button to="/journal" variant="outline">
              Read the journal
            </Button>
          </div>
        </Section>
      )}
    </>
  )
}
