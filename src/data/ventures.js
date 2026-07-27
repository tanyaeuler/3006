// The four ventures that make up the working side of the brand.
//
// `accent` picks which of the three brand colours leads on that venture's
// card, so the set reads as a family rather than four unrelated things.
// Allowed values: 'olive' | 'blush' | 'brown'.

export const ventures = [
  {
    slug: 'artifex',
    name: 'Artifex Marketing Studio',
    domain: 'artifexstudio.com.au',
    href: 'https://artifexstudio.com.au',
    accent: 'olive',
    role: 'The studio',
    summary:
      'Done-for-you brand design, websites and marketing strategy for small businesses and solo operators.',
    description:
      'Artifex is where most of my client work lives. Logo and brand identity, websites that are built to be found, print collateral, and the marketing strategy that holds it all together. It is a full-service studio for people who would rather be doing the thing they are good at than wrestling with their own website.',
    services: [
      'Brand identity & logo design',
      'Website design and build',
      'SEO and local search',
      'Print & marketing collateral',
    ],
    cta: 'Visit the studio',
    image: '/images/ventures/artifex.jpg',
    imageAlt: 'Brand identity work laid out on a desk',
  },
  {
    slug: 'my4280',
    name: 'my4280.directory',
    domain: 'my4280.directory',
    href: 'https://my4280.directory',
    accent: 'brown',
    role: 'The community project',
    summary:
      'A local business directory for the 4280 postcode — Jimboomba, Flagstone and the surrounding districts.',
    description:
      'This one is close to home, literally. 4280 is a fast-growing pocket of South East Queensland full of businesses run out of sheds, spare rooms and school-run gaps. my4280.directory exists so neighbours can find them without scrolling past three pages of ads for someone in another state.',
    services: [
      'Free and featured business listings',
      'Local-first search',
      'Community noticeboard',
      'Support for new and home-based businesses',
    ],
    cta: 'Browse the directory',
    image: '/images/ventures/my4280.jpg',
    imageAlt: 'Local shopfronts in the 4280 district',
  },
  {
    slug: 'brandifex',
    name: 'Brandifex',
    domain: 'brandifex.com',
    href: 'https://brandifex.com',
    accent: 'blush',
    role: 'The product line',
    summary:
      'Print-on-demand pieces — branded, faith-inspired and everyday designs, produced and shipped through Gelato.',
    description:
      'Brandifex is the making side of my brain with somewhere to go. Designs printed on demand and fulfilled through Gelato’s global network, which means things are produced close to whoever ordered them rather than shipped halfway around the world. Less waste, faster delivery, and no garage full of stock.',
    services: [
      'Original print & apparel designs',
      'Faith-inspired homewares and stationery',
      'Branded merchandise for small business',
      'On-demand production via Gelato',
    ],
    cta: 'Shop the range',
    image: '/images/ventures/brandifex.jpg',
    imageAlt: 'Print-on-demand products in brand colours',
  },
  {
    slug: 'webdesignmentor',
    name: 'Web Design Mentor',
    domain: 'webdesignmentor.com',
    href: 'https://webdesignmentor.com',
    accent: 'olive',
    role: 'The teaching',
    summary:
      'Mentoring for designers and business owners who want to build and run their own site properly.',
    description:
      'After twenty-five years of doing this, the questions people ask me have not changed much. Web Design Mentor is where I answer them once, properly — for designers finding their feet and for business owners who want to understand what they are paying for. Practical, unglamorous, and built on work that actually shipped.',
    services: [
      'One-to-one mentoring',
      'Design & build walkthroughs',
      'Portfolio and pricing guidance',
      'Resources for self-managing your site',
    ],
    cta: 'Learn with me',
    image: '/images/ventures/webdesignmentor.jpg',
    imageAlt: 'A mentoring session over a laptop',
  },
]

export function getVenture(slug) {
  return ventures.find((venture) => venture.slug === slug)
}
