import Botanical from '../components/ui/Botanical'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'That page does not exist.',
  })

  return (
    <section className="relative overflow-hidden bg-cream py-28">
      <Botanical
        variant="wreath"
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 text-blush/25"
      />

      <Container className="relative max-w-xl text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-6 text-4xl sm:text-5xl">This page has wandered off.</h1>
        <p className="mt-6 leading-relaxed text-ink/75">
          The link may be old, or I may have moved something. Either way, let’s get you back to
          somewhere useful.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/">Back home</Button>
          <Button to="/journal" variant="outline">
            Read the journal
          </Button>
        </div>
      </Container>
    </section>
  )
}
