import { useState } from 'react'

import Botanical from '../components/ui/Botanical'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import { site } from '../data/site'
import { ventures } from '../data/ventures'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const enquiryTypes = [
  'Brand or website project (Artifex)',
  'A listing on my4280.directory',
  'Brandifex / print-on-demand',
  'Mentoring (Web Design Mentor)',
  'Something else',
]

const fieldClass =
  'w-full border border-line bg-raised px-4 py-3 text-sm text-ink transition-colors placeholder:text-muted/70 focus:border-olive focus:outline-none'

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact',
    description:
      'Get in touch with Tanya Euler about brand and website design, a directory listing, print-on-demand or mentoring.',
  })

  const [form, setForm] = useState({
    name: '',
    email: '',
    enquiry: enquiryTypes[0],
    message: '',
  })

  function update(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  // No backend is wired up yet, so the form composes an email instead. Swap
  // this for a POST to a form service (Formspree, Netlify Forms, etc.) when
  // one is chosen — the markup already carries proper name attributes.
  function handleSubmit(event) {
    event.preventDefault()
    const subject = encodeURIComponent(`Website enquiry — ${form.enquiry}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nEnquiry: ${form.enquiry}\n\n${form.message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      {/* ------------------------------------------------------------ Page head */}
      <section className="relative overflow-hidden bg-blush-wash py-20 sm:py-24">
        <Botanical
          variant="branch"
          className="absolute -right-14 top-2 hidden h-44 w-72 text-olive/20 lg:block"
        />

        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="rule" />
            <span className="eyebrow">Contact</span>
          </div>

          <h1 className="mt-7 text-4xl leading-tight sm:text-5xl">Let’s talk.</h1>

          <p className="mt-8 leading-relaxed text-ink/80">
            Tell me what you are building. If I am the right person for it I will say so, and if I
            am not I will point you at someone who is.
          </p>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Form + info */}
      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="eyebrow mb-3 block">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  className={fieldClass}
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="eyebrow mb-3 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  className={fieldClass}
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry" className="eyebrow mb-3 block">
                What is it about?
              </label>
              <select
                id="enquiry"
                name="enquiry"
                value={form.enquiry}
                onChange={update('enquiry')}
                className={fieldClass}
              >
                {enquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="eyebrow mb-3 block">
                Tell me a bit more
              </label>
              <textarea
                id="message"
                name="message"
                rows={7}
                required
                value={form.message}
                onChange={update('message')}
                className={`${fieldClass} resize-y`}
                placeholder="What are you building, and where are you stuck?"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-sm bg-olive px-7 py-3 text-xs font-medium uppercase tracking-eyebrow text-cream transition-colors hover:bg-olive-dark"
            >
              Send enquiry
            </button>

            <p className="text-xs leading-relaxed text-muted">
              This opens your email client with the message ready to send. Prefer to write
              directly? Use{' '}
              <a href={`mailto:${site.email}`} className="link-underline text-olive">
                {site.email}
              </a>
              .
            </p>
          </form>

          <aside className="space-y-10">
            <div className="border-t-2 border-olive bg-raised p-8">
              <h2 className="text-xl">Direct</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="link-underline text-olive">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Based in</dt>
                  <dd className="mt-1 text-ink/80">{site.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Working hours</dt>
                  <dd className="mt-1 text-ink/80">
                    Mon–Fri, 9am–3pm AEST. I answer email in the morning.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t-2 border-blush bg-raised p-8">
              <h2 className="text-xl">Go direct to a project</h2>
              <ul className="mt-6 space-y-4">
                {ventures.map((venture) => (
                  <li key={venture.slug}>
                    <a
                      href={venture.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="text-ink/80 transition-colors group-hover:text-olive">
                        {venture.name}
                      </span>
                      <span className="text-xs text-muted">{venture.domain}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t-2 border-brown bg-raised p-8">
              <h2 className="text-xl">Elsewhere</h2>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {site.social.map((profile) => (
                  <li key={profile.label}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-eyebrow text-olive transition-colors hover:text-brown"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
