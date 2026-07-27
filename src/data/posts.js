// ---------------------------------------------------------------------------
// Journal posts.
//
// ⚠️  STARTER DRAFTS — these five posts were written to give the Journal real
// shape, pacing and typography to sit on. They are in a plausible first-person
// voice but they are NOT Tanya's words and contain no real events. Rewrite or
// replace them before the site goes live.
//
// Adding a post: append an object below. `body` is markdown — the renderer in
// src/lib/markdown.js supports headings (##, ###), paragraphs, bullet and
// numbered lists, blockquotes, **bold**, *italic*, and [links](url).
//
// `date` is ISO (YYYY-MM-DD) and drives ordering. `cover` is optional; when
// omitted the post falls back to a typographic card.
// ---------------------------------------------------------------------------

export const categories = {
  faith: { label: 'Faith', accent: 'olive' },
  business: { label: 'In Business', accent: 'brown' },
  family: { label: 'Family', accent: 'blush' },
}

export const posts = [
  {
    slug: 'the-quiet-hour-before-the-inbox',
    title: 'The quiet hour before the inbox',
    date: '2026-07-14',
    category: 'faith',
    readingMinutes: 4,
    excerpt:
      'For years I started the day inside other people’s urgency. Changing the first hour changed everything that came after it.',
    cover: '/images/journal/quiet-hour.jpg',
    coverAlt: 'A mug and open notebook on a kitchen table in early light',
    body: `For years my day began the same way. Phone off the charger, thumb on the mail icon, and before my feet had properly hit the floor I was inside somebody else's urgency. A client had emailed at 11pm. A form had come through overnight. Something had broken.

By the time I sat down at my desk I had already been reacting for an hour, and I would spend the rest of the day trying to catch up to a version of myself who had started without me.

## What actually changed

I would like to tell you I had a moment of great spiritual clarity. What actually happened was more ordinary: I got tired. Tired enough to try the thing people had been suggesting for years, which was simply to not do that.

The first hour is now unremarkable and I protect it fiercely. Coffee. A chapter. A notebook that has no client names in it. Some mornings I pray properly. Some mornings I mostly stare out the window at the gum trees and think about nothing useful at all.

> The work is not less demanding. I am just no longer meeting it out of breath.

## The part nobody warns you about

Protecting that hour cost me something. It meant a handful of people learned that I do not reply at 6am, and one or two of them did not love that. Early on I would apologise for it, which rather defeated the point.

I have stopped apologising. Not out of stubbornness, but because I have come to believe that the person who shows up at 9am having had an hour of quiet is markedly better at the actual job than the one who has been firefighting since dawn. My clients get the better one. That seems like a fair trade.

## If you want to try it

A few things that made it stick, none of them clever:

- The phone charges in the kitchen, not the bedroom. This is 90% of it.
- One hour is negotiable; the *shape* of it is not. Same chair, same order, every day.
- Do not make it productive. The moment I started using that hour to plan the week, it stopped being quiet and became work with better lighting.
- Start with fifteen minutes if an hour feels absurd. It did to me too.

The inbox will still be there. It is remarkably patient, the inbox. It has waited this long.`,
  },
  {
    slug: 'pricing-is-a-character-question',
    title: 'Pricing is a character question',
    date: '2026-06-22',
    category: 'business',
    readingMinutes: 6,
    excerpt:
      'Every underpriced quote I have ever sent was a decision about who I was, dressed up as a decision about numbers.',
    cover: '/images/journal/pricing.jpg',
    coverAlt: 'A quote document and calculator on a desk',
    body: `I have been quoting design work for twenty-five years and I still feel something in my chest when I press send on a number.

For a long time I thought that feeling was a maths problem. If I could just find the right formula — hours times rate, plus a margin, minus a bit because they seem nice — the feeling would go away. It never did, because it was never a maths problem.

## The quote is a statement about you

When I underquoted, and I underquoted for years, I told myself I was being generous. Helping someone starting out. Being reasonable.

That was not honest. What I was actually doing was buying my way out of a difficult conversation. A low number is much easier to defend than a fair one. Nobody asks you to justify cheap.

The trouble is that the person who pays for that comfort is not me. It is my family, when I take on three projects to cover what two should have. It is the client, who gets a designer quietly resenting the scope by week six. And it is the next designer they hire, who now has to explain why their number is double.

## What fair looks like

I have landed on a few tests. None of them are clever, all of them are uncomfortable:

1. **Would I be glad to start this on Monday?** If the number makes the work feel like a chore before it has begun, it is wrong.
2. **Can I say it out loud without softening it?** If I catch myself adding *"but I could probably do it for..."* before they have even responded, I did not believe the number.
3. **Does it survive the thing going slightly wrong?** Every project has a week that disappears. A fair price has that week already in it.
4. **Would I quote a stranger the same?** The discount I give to people I like is real money my family does not see.

## On being generous properly

I do still discount. I do work for free, sometimes, for people and causes I care about. But I have stopped disguising it.

Generosity that is named is a gift. Generosity that is hidden inside a quote is just an underpriced invoice, and it does not feel like grace to anyone — least of all to me at 11pm on a Thursday.

> If you want to be generous, be generous on purpose. Write the real number, then decide what you want to give away.

That change alone has done more for how I feel about this business than any productivity system I have ever tried.`,
  },
  {
    slug: 'what-the-school-run-taught-me-about-scope',
    title: 'What the school run taught me about scope',
    date: '2026-05-30',
    category: 'family',
    readingMinutes: 4,
    excerpt:
      'You cannot negotiate with 3pm. It turns out that is the most useful project management tool I own.',
    cover: '/images/journal/school-run.jpg',
    coverAlt: 'A car window view of a suburban street in the afternoon',
    body: `There is a particular kind of clarity that arrives at 2:40 in the afternoon.

It does not matter how the morning went, what is still open in the browser, or how close the thing is to being finished. At 2:40 I close the laptop, because 3pm does not move and there is no version of this job that is worth being the last car in the pickup line.

## A deadline you cannot argue with

Most deadlines in this industry are soft. "End of week" means Monday. "Urgent" means Wednesday. We all know it, and we all quietly plan around it.

The school run is not like that. It is the only genuinely immovable object in my week, and having one immovable object in the week turns out to be enormously clarifying. Work expands to fill the time available — but only if the time available is vague.

Since the day stopped being open-ended, a few things happened on their own:

- I got much faster at deciding what actually mattered in a given afternoon.
- I stopped starting things at 2:15 that needed ninety minutes.
- I began quoting timelines I could actually keep, because I finally knew how many real hours were in my week rather than how many I liked to imagine.

## Scope is just this, repeated

Every difficult project I have been part of failed the same way. Not through one enormous bad decision, but through a hundred small ones made because the boundary was fuzzy and it seemed easier to say yes than to explain.

"Could you just also..." is not a scope problem when the answer is no. It is only a problem when the answer is *maybe, if I skip dinner*.

> A boundary that other people can see is a kindness. A boundary that only exists in your head is a resentment waiting to happen.

## The honest bit

I do not always get this right. There are weeks where the laptop comes back open at 8pm and the boundary was a nice idea I had on Monday. Some seasons genuinely require it, and I have made peace with that.

But the default matters. If the default is that the work stops, then the exceptions stay exceptions. If the default is that the work continues until it is finished, there is no natural end to it — and a business with no natural end will happily take the whole family with it.

3pm is not an interruption to the work. It is the thing that keeps the work the right size.`,
  },
  {
    slug: 'building-for-your-own-postcode',
    title: 'Building something for your own postcode',
    date: '2026-04-18',
    category: 'business',
    readingMinutes: 5,
    excerpt:
      'Why I built a directory for 4280 instead of something that could scale to anywhere.',
    cover: '/images/journal/postcode.jpg',
    coverAlt: 'A country road heading into a growing suburb',
    body: `Every piece of business advice I have absorbed over twenty-five years points the same direction: build the thing that scales. Do not limit yourself to a place. The internet is global, so think global.

I built a business directory for a single postcode.

## The case for small

4280 covers Jimboomba, Flagstone and a spread of districts either side. It is one of the faster-growing corners of South East Queensland, and it is full of businesses that do not really exist online — the mobile mechanic, the cake decorator, the bookkeeper working from the front room while the baby naps.

If you search for any of them, you will scroll past a page of paid results for franchises in other states before you find someone eight minutes down the road. That is not a technology problem. That is just what happens when the people ranking the results have never been here.

So my4280.directory is deliberately, stubbornly local. It cannot scale to anywhere, because being from somewhere is the entire point.

## What it turns out you get

Things I did not expect:

- **Verification is easy.** I can tell whether a business is real because I have probably driven past it.
- **The listings are better.** People write differently when they know their neighbours will read it.
- **It is useful immediately.** A directory of ten businesses in your suburb beats a directory of ten thousand somewhere else.

## The thing underneath it

I think there is something worth defending in the idea that a place should be able to see itself. Not as a market segment, but as a set of actual people who make and fix and bake things within a few kilometres of each other.

> Small businesses in a growing area are not competing with each other nearly as much as they think. They are competing with the assumption that you have to go into the city for anything decent.

It will never be the venture that makes the most money. It is comfortably the one I am most glad to have built.`,
  },
  {
    slug: 'the-work-of-your-hands',
    title: 'The work of your hands',
    date: '2026-03-09',
    category: 'faith',
    readingMinutes: 5,
    excerpt:
      'On making things for a living, and the long argument about whether that counts as anything much.',
    cover: '/images/journal/hands.jpg',
    coverAlt: 'Hands sketching a logo concept on paper',
    body: `There is a question I circled for most of my thirties without ever asking it out loud: does any of this matter?

Not the family. Not the faith. Those were never in question. I mean the work — the logos, the websites, the hours spent nudging letterforms two pixels to the left so a small business in Queensland looks like it knows what it is doing.

It is hard to make that sound significant at a dinner party.

## The false hierarchy

Somewhere along the way I picked up the idea that there were two tiers of work. There was the meaningful kind — caring, teaching, serving, the things you would describe as a calling. And then there was everything else, which you did to fund the first kind.

Design was firmly in the second tier. Useful, well paid, and essentially decorative.

I no longer think that is true, and the thing that changed my mind was not a sermon. It was watching what happens to a person when their business finally looks like the thing they know it to be.

## What a brand actually does for someone

I have sat across the table from a woman who had been running a genuinely excellent business for six years out of a spare room and could not get anyone to take her seriously, because everything she handed them looked apologetic.

Six weeks later she had a brand that matched the work. Nothing about her skill had changed. Everything about how she carried herself had.

> Making something look like what it is — that is not decoration. That is telling the truth about it.

That is the part I had missed. Good design is not making things pretty. It is closing the gap between what something is and what it appears to be. There is something quietly moral in that, and once I saw it I could not unsee it.

## Where I have landed

I do not think my work is a sermon. I am not smuggling anything into anyone's logo, and I would be suspicious of a designer who was.

What I think is simpler. I get to spend my days helping people tell the truth about the thing they have built, usually people who could not afford someone to do that for them a generation ago. I get to do it from a house in Flagstone, in hours that let me pick my kids up. And I get to be honest about the price, the timeline and what I cannot do.

That will do. That is, I have come to think, a perfectly good way to spend the work of your hands.`,
  },
]

// Newest first — the order every listing on the site uses.
export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
)

export function getPost(slug) {
  return posts.find((post) => post.slug === slug)
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
